import { useState } from "react";

export default function UpdatePlaylistBtn() {
  const [loading, setLoading] = useState(false);

  function updatePlaylists(props) {
    if (props.playlists.length === 0) {
      return;
    }

    const playlist_ids = JSON.stringify(
      props.playlists.map((playlist) => playlist.id)
    );
    props.setPlaylists([]);
    setLoading(true);

    fetch(`/api/playlists/update/update?playlists=${playlist_ids}`, {
      method: "GET",
    })
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
    <button className="playlist-btn" onClick={updatePlaylists}>
      {loading ? <div className="loader"></div> : <div>UPDATE PLAYLISTS</div>}
    </button>
  );
}
