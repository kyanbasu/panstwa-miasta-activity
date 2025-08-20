import config from "./backend/src/config";

import { Server as BunEngine } from "@socket.io/bun-engine";
import { serve } from "bun";
import { Server as SocketIOServer } from "socket.io";
import Router from "./backend/src/Router";
import { registerConnectionHandlers } from "./backend/src/sockets";
import index from "./frontend/index.html";
import type { DiscordUser, User } from "./backend/src/types";

const runningLocally = true;

const io = new SocketIOServer({
  transports: ["polling", "websocket", "webtransport"],
  cors: { origin: ["discordsays.com", "localhost"] },
});

const engine = new BunEngine({
  path: "/socket.io/",
  pingTimeout: 60000, //default 20s
  pingInterval: 25000, //default 25s
});

// User authentication
io.use(async (socket, next) => {
  if (runningLocally) {
    const user = socket.handshake.auth?.user as User;
    if (user) {
      socket.data.user = user;
      return next();
    }
    return next(Error("failed auth"));
  }

  const token = socket.handshake.auth?.token;
  if (!token) return next(Error("no token"));

  const resp = await fetch("https://discord.com/api/users/@me", {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!resp.ok) return next(Error("failed auth"));
  const user = (await resp.json()) as DiscordUser;
  socket.data.user = {
    id: user.id,
    name: user.global_name,
    avatar: user.avatar,
    answers: {},
    score: 0
  } as User;
  return next();
});

io.bind(engine);

io.on("connection", (socket) => registerConnectionHandlers(socket));

const handler = engine.handler();

Router.get("/socket.io/*", (req, server) => handler.fetch(req, server));
Router.get("/", index);

serve({
  port: config.serverPort,
  routes: Router.getRoutes(),
  websocket: handler.websocket,
  idleTimeout: 120,
});

console.log(`Server running at http://localhost:${config.serverPort}`);
