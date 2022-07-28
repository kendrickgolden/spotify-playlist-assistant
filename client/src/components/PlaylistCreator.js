import React from "react";
import Artist from "./Artist";

export default function Functions() {
  return (
    <div id="create-playlists">
      <div id ="create-playlists-title"><h2>Create Playlists</h2></div>
      <div id="create-playlists-flex">
        <div id="artist-selector">
          <h4>Select Artists</h4>
        <input type="text"></input>
        </div>
        <div id="selected-artist-box">
        <Artist name="ABC"/>
        </div>
      </div>
    </div>
  );
}
