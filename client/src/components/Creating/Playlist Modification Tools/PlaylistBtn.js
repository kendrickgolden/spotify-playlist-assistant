import { useState } from "react";

export default function PlaylistBtn({ selected, setSelected, type }) {
  const [loading, setLoading] = useState(false);

  function modifyPlaylists() {
    console.log("test123");
    if (selected.length === 0) {
      return;
    }

    const ids = JSON.stringify(selected.map((element) => element.id));
    setSelected([]);
    setLoading(true);
    let fetch_address;
    if(type==='create') {
      fetch_address=`/api/playlists/create/from_artists?artists=${ids}`;
    } else {
      fetch_address=`/api/playlists/update/update?playlists=${ids}`;
    }
    fetch(fetch_address, {
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
        console.error(`Could not ${type} playlists: ${error}`);
      });
  }

  return (
    <button type="button" className="playlist-btn" onClick={modifyPlaylists}>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div> {type === "create" ? "CREATE" : "UPDATE"} PLAYLISTS</div>
      )}
    </button>
  );
}
