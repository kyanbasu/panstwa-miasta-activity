import type { Socket } from "socket.io-client";

export function handleConnection(socket: Socket) {
  socket.on("disconnect", (reason, details) => {
    console.log("disconnected, reason: ", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err);
  });

  socket.io.on("reconnect_attempt", (num) => {
    console.log(`Reconnection attempt #${num}`);
    console.log(`Reconnecting...`);
  });

  socket.io.on("reconnect", () => {
    console.log("Reconnected");
    //resync();
  });

  // Optional retry limit or fallback logic in reconnect_failed
  socket.io.on("reconnect_failed", () => {
    console.error("Reconnect unsuccessful, prompt for manual reload");
  });

  socket.on("connect", () => {
    console.log("Connected");

    socket.io.engine.on("upgrade", (transport) => {
      console.log(`transport upgraded to ${transport.name}`);
    });
  });
}
