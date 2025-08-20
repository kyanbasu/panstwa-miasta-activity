import { io, Socket } from "socket.io-client";
import type { User } from "../../backend/src/types";
import { runningLocally } from "./constants";
import { handleConnection } from "./socketHandlers/connectionHandler";

const socketURL = window.location.href
  .split("/")
  .slice(0, 3)
  .join("/")
  .replace("https", "wss");

const socketOptions = {
  path: "/socket.io/",
  transports: ["polling", "websocket", "webtransport"],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: Infinity,
  forceNew: true,
  auth: { token: "", user: {} },
};

export var socket: Socket;

export function setupSocket(user: User, token: string) {
  socketOptions.auth.user = user;
  if (!runningLocally) socketOptions.auth.token = token;

  socket = io(socketURL, socketOptions);

  handleConnection(socket);
}
