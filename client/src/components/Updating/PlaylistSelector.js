import { useRef, useContext, useState } from "react";
import { UserContext } from "../../App";
import SearchResultPlaylist from "./SearchResultPlaylist";

export default function PlaylistSelector(props) {
  const playlistInputRef = useRef();
  const UserContextValues = useContext(UserContext);
  const playlists = UserContextValues.playlists;
  const [matchingPlaylists, setMatchingPlaylists] = useState(
    Array.from(playlists).map(([key, value]) => ({
      playlist_id: key,
      artist_id: value.artist_id,
      name: value.name,
    }))
  );

  console.log(
    Array.from(playlists).map(([key, value]) => ({
      playlist_id: key,
      artist_id: value.artist_id,
      name: value.name,
    }))
  );

  function createPlaylist(event) {
    event.preventDefault();
    setMatchingPlaylists([]);
    const enteredPlaylist = playlistInputRef.current.value;
    if (enteredPlaylist.length === 0) {
      setMatchingPlaylists(
        Array.from(playlists).map(([key, value]) => ({
          playlist_id: key,
          artist_id: value.artist_id,
          name: value.name,
        }))
      );
    } else {
      for (let [id, value] of playlists.entries()) {
        if (
          value.toUpperCase().substring(0, enteredPlaylist.length) ===
          enteredPlaylist.toUpperCase()
        ) {
          setMatchingPlaylists((prevArray) => [
            ...prevArray,
            { playlist_id: id, artist_id: value },
          ]);
        }
      }
    }
  }

  return (
    <div>
      <form
        className="selector"
        onKeyUp={createPlaylist}
        onSubmit={createPlaylist}
      >
        <label htmlFor="searchbar">Select Playlists: </label>
        <input type="text" className="searchbar" ref={playlistInputRef}></input>
        <button>Enter</button>
      </form>
      <ul className="search-list">
        {matchingPlaylists.map((playlist) => {
          return (
            <SearchResultPlaylist
              key={playlist.playlist_id}
              playlist_id={playlist.playlist_id}
              artist_id={playlist.artist_id}
              name={playlist.name}
              onClick={props.onClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
