import type { Socket } from "socket.io";
import { handleConnection } from "./socketHandlers/connectionHandler";

export const registerConnectionHandlers = (socket: Socket) => {
  handleConnection(socket);
};
