import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import SignInButton from "./components/SignInButton";
import PlaylistCreator from "./components/PlaylistCreator";
import PlaylistUpdater from "./components/PlaylistUpdater";

function App() {
  return (
    <>
      <header>
        <h1>Spotify Playlist Assistant</h1>
        <div id="sign-in-btn">
        <SignInButton />
        </div>
      </header>
      <div id="test">
        <ul id="playlist-operations">
        <PlaylistCreator />
        <PlaylistUpdater />
        </ul>
      </div>
    </>
  );
}

export default App;
