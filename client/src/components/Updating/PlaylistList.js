import Playlist from "./Playlist";
import { useState } from "react";

export default function PlaylistList(props) {
  const [loading, setLoading] = useState(false);

  function updatePlaylists() {
    if (props.playlists.length === 0) {
      return;
    }

    const playlist_ids = JSON.stringify(
      props.playlists.map((playlist) => playlist.id)
    );
    props.setPlaylists([]);
    setLoading(true);

    fetch(
      `/api/playlists/update/update?playlists=${playlist_ids}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.error(`Could not create playlists: ${error}`);
      });
  }

  return (
    <div className="queue-container">
      {console.log(props.playlists)}
      <ul className="queue-list">
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
      <button className="playlist-btn" onClick={updatePlaylists}>
        {loading ? <div className="loader"></div> : <div>UPDATE PLAYLISTS</div>}
      </button>
    </div>
  );
}
