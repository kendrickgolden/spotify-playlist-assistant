import React from "react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import PlaylistCreator from "./components/PlaylistCreator";
//import { ArtistMapProvider } from "./components";

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

function App() {
  return (
    <>
      <header>
        <h1>Spotify Playlist Assistant</h1>
        {code ? <LogoutButton code={code} /> : <LoginButton />}
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
