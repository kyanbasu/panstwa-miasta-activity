import type { Socket } from "socket.io";

export function handleConnection(socket: Socket) {
  console.log("client connected:", socket.id, socket.data.user.name);
  socket.emit("authenticated", socket.data.user);

  socket.on("disconnect", (reason) => {
    console.log("disconnect", socket.id, reason);
  });
}
