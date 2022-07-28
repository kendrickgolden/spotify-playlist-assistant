import React from "react";
import SignInButton from "./components/SignInButton";
import PlaylistCreator from "./components/PlaylistCreator";

function App() {
  return (
    <>
      <header>
        <h1>Spotify Playlist Assistant</h1>
          <SignInButton />
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
