import Playlist from "./Playlist";
import { useState } from "react";

export default function PlaylistList(props) {
  return (
    <div className="queue-container">
      {console.log(props.playlists)}
      <ul className="result-list">
        {props.playlists.map((playlist) => {
          return (
            <Playlist
              key={playlist.id}
              id={playlist.id}
              name={playlist.name}
              img={playlist.img}
              onClick={props.onClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
