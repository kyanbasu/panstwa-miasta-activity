import type { Socket } from "socket.io";

export function handleConnection(socket: Socket) {
  console.log("client connected:", socket.id, socket.data.user.name);
  socket.emit("authenticated", { id: socket.data.user.id });

  socket.on("disconnect", (reason) => {
    console.log("disconnect", socket.id, reason);
  });
}
