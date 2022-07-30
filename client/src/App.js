import React from "react";
import LoginButton from "./components/LoginButton";
import PlaylistCreator from "./components/PlaylistCreator";

function App() {
  return (
    <>
      <header>
        <h1>Spotify Playlist Assistant</h1>
          <LoginButton />
        <hr id="header-line"></hr>
      </header>
      <div id="main-page">
        <div id="playlist-operations">
          <PlaylistCreator />
        </div>
      </div>
    </>
  );
}

export default App;
