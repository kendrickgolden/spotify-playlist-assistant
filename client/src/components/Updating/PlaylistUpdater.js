import PlaylistSelector from "./PlaylistSelector";
import PlaylistList from "./PlaylistList";
import { useState } from "react";

export default function PlaylistUpdater() {
  const [playlistList, setPlaylistList] = useState([]);

  function addPlaylist(id, name, img, artist_id) {
    
    function containsPlaylists(playlist) {
      if (playlist.id === id) {
        console.log(id);
        return true;
      }
    }

    if (!playlistList.some(containsPlaylists)) {
      setPlaylistList((prevArray) => [
        ...prevArray,
        { id: id, name: name, img: img, artist_id: artist_id },
      ]);
    }
  }

  function removePlaylist(id) {
    setPlaylistList((prevArray) =>
      prevArray.filter((playlist) => playlist.id !== id)
    );
  }

  return (
    <div className="playlist-opeartions">
      <div className="operations-title">
        <h2>Update Playlists</h2>
      </div>
      <div className="operations-flex">
        <PlaylistSelector onClick={addPlaylist} />
        <PlaylistList playlists={playlistList} setPlaylists={setPlaylistList}onClick={removePlaylist} />
      </div>
    </div>
  );
}
