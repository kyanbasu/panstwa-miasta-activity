import type { GameLobby, User } from "./types";

const users: Record<string, User> = {};
const lobby: Record<string, GameLobby> = {};

export function createLobby(id: string) {
  lobby[id] = {
    categories: [],
    users: [],
  };
}
