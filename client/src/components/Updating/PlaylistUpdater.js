import SearchResults from "../Creating/SearchResults";
import { useState, useContext } from "react";
import { UserContext } from "../../App";
import SearchBar from "../Creating/Playlist Modification Tools/SearchBar";
import PlaylistBtn from "../Creating/Playlist Modification Tools/PlaylistBtn";

export default function PlaylistUpdater() {
  const UserContextValues = useContext(UserContext);

  //list of selected playlists
  const [playlistList, setPlaylistList] = useState([]);

  const playlists = UserContextValues.playlists;
  const [playlistScrollCounter, setPlaylistScrollCounter] = useState(0);
  const [selectedPlaylistScrollCounter, setSelectedPlaylistScrollCounter] =
    useState(0);

  const [matchingPlaylists, setMatchingPlaylists] = useState(
    Array.from(playlists).map(([key, value]) => ({
      id: key,
      name: value.name,
      img: value.img,
      artist_id: value.artist_id
    }))
  );

  function addPlaylist(id, name, img, artist_id) {
    function containsPlaylists(playlist) {
      if (playlist.id === id) {
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
      <PlaylistBtn
        selected={playlistList}
        setSelected={setPlaylistList}
        type={"update"}
      />
      <SearchResults
        matchingResults={matchingPlaylists}
        onClick={addPlaylist}
        sC={playlistScrollCounter}
        setSC={setPlaylistScrollCounter}
        userData={playlists}
        type={"playlist"}
        type2={"search-results"}
      />
      <SearchResults
        matchingResults={playlistList}
        onClick={removePlaylist}
        sC={selectedPlaylistScrollCounter}
        setSC={setSelectedPlaylistScrollCounter}
        userData={playlists}
        type={"playlist"}
        type2={"selected-results"}
      />
    </div>
  );
}
