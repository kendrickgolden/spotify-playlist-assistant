import Artist from "./Artist";
import { useState } from "react";

export default function ArtistList(props) {
  const [loading, setLoading] = useState(false);

  function createPlaylists() {
    if (props.artists.length === 0) {
      return;
    }

    const artist_ids = JSON.stringify(props.artists.map((artist) => artist.id));
    props.setArtists([]);
    setLoading(true);
    fetch(
      `/api/playlists/create/from_artists?artists=${artist_ids}`,
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
      <ul className="queue-list">
        {props.artists.map((artist) => {
          return (
            <Artist
              key={artist.id}
              id={artist.id}
              name={artist.name}
              img={artist.img}
              onClick={props.onClick}
            />
          );
        })}
      </ul>

      <button className="playlist-btn" onClick={createPlaylists}>
        {loading ? <div className="loader"></div> : <div>CREATE PLAYLISTS</div>}
      </button>
    </div>
  );
}
