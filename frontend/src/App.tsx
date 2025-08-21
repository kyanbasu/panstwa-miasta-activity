import React, { type JSX, useEffect, useState } from "react";
import { setupSocket, socket } from "./sockets";
import type { User } from "../../backend/src/types";

export default function App(): JSX.Element {
  const [lobbyName, setLobbyName] = useState("unknown");

  const [page, setPage] = useState<"loading" | "lobby" | "game">("loading");

  const testUser: User = {
    id: "1234567890",
    name: "testuser",
    avatar: "0",
    answers: {},
    score: 0,
  };

  const [user, setUser] = useState(testUser);

  useEffect(() => {
    setupSocket(testUser, "1234567890");

    socket.once("authenticated", (_user: User) => {
      setUser(_user);
      console.log("Authenticated with server as " + user.id);
      setPage("lobby");
    });
  }, []);

  return (
    <div className="app-root">
      <h1 className="inline">Lobby: </h1>
      <h1 className="inline">{lobbyName}</h1>
      <h1></h1>

      {page === "loading" ? <h2>loading</h2> : <h2>hi {user.name}</h2>}
    </div>
  );
}
