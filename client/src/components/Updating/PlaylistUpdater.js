import PlaylistSelector from "./PlaylistSelector";
import PlaylistList from "./PlaylistList";
import { useState, useContext } from "react";
import { UserContext } from "../../App";
import SearchBar from "../Creating/Playlist Modification Tools/SearchBar";
import UpdatePlaylistBtn from "../Creating/Playlist Modification Tools/UpdatePlaylistBtn";

export default function PlaylistUpdater() {
  const UserContextValues = useContext(UserContext);
  const [playlistList, setPlaylistList] = useState([]);
  const playlists = UserContextValues.playlists;

  const [matchingPlaylists, setMatchingPlaylists] = useState(
    Array.from(playlists).map(([key, value]) => ({
      id: key,
      artist_id: value.artist_id,
      img: value.img,
      name: value.name,
    }))
  );

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
    <div className="playlist-operations">
      <SearchBar
        setMatching={setMatchingPlaylists}
        list={playlists}
        category={"playlist"}
      />
      <UpdatePlaylistBtn
        playlists={playlistList}
        setPlaylists={setPlaylistList}
        onClick={removePlaylist}
      />
      <PlaylistSelector
        onClick={addPlaylist}
        matchingPlaylists={matchingPlaylists}
      />
      <PlaylistList
        playlists={playlistList}
        setPlaylists={setPlaylistList}
        onClick={removePlaylist}
      />
    </div>
  );
}
