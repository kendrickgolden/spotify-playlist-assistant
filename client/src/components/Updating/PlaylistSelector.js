import { useContext, useState } from "react";
import { UserContext } from "../../App";
import SearchResultPlaylist from "./SearchResultPlaylist";

export default function PlaylistSelector(props) {
  const UserContextValues = useContext(UserContext);
  const playlists = UserContextValues.playlists;

  return (
    <div className="queue-container">
      {playlists.size === 0 ? (
        <ul className="result-list">
          <div className="loader list-loader"></div>
        </ul>
      ) : (
        <ul className="result-list">
          {props.matchingPlaylists.map((playlist) => {
            return (
              <SearchResultPlaylist
                key={playlist.id}
                id={playlist.id}
                artist_id={playlist.artist_id}
                name={playlist.name}
                img={playlist.img}
                onClick={props.onClick}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
