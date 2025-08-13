import React, { type JSX, useEffect, useState } from "react";

export default function App(): JSX.Element {
  const [lobbyName, setLobbyName] = useState("unknown");

  return (
    <div className="app-root">
      <h1 className="inline">Lobby: </h1>
      <h1 className="inline">{lobbyName}</h1>
      <h1></h1>

      <h2>hello</h2>
    </div>
  );
}
