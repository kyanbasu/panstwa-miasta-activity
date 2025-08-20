export type Config = {
  serverPort: number;
};

export type DiscordUser = {
  id: string; // discord id
  avatar: string; // discord avatar
  global_name: string; // discord global name
};

export type User = {
  id: string; // discord id
  name: string; // discord global name
  avatar: string; // discord avatar
  roomID?: string; // guildId/channelId
  answers: Record<string, string>; // category -> answer
  score: number;
};

export type GameLobby = {
  categories: string[];
  users: string[];
};
