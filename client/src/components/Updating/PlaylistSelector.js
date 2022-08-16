import { useRef, useContext, useState } from "react";
import { UserContext } from "../../App";
import SearchResultPlaylist from "./SearchResultPlaylist";

export default function PlaylistSelector(props) {
  const playlistInputRef = useRef();
  const UserContextValues = useContext(UserContext);
  const playlists = UserContextValues.playlists;
  const [matchingPlaylists, setMatchingPlaylists] = useState(
    Array.from(playlists).map(([key, value]) => ({
      id: key,
      artist_id: value.artist_id,
      img: value.img,
      name: value.name,
    }))
  );

  function createPlaylist(event) {
    event.preventDefault();
    setMatchingPlaylists([]);
    const enteredPlaylist = playlistInputRef.current.value;
    if (enteredPlaylist.length === 0) {
      setMatchingPlaylists(
        Array.from(playlists).map(([id, value]) => ({
          id: id,
          name: value.name,
          img: value.img,
          artist_id: value.artist_id,
        }))
      );
    } else {
      for (let [id, value] of playlists.entries()) {
        if (
          value.name.toUpperCase().substring(0, enteredPlaylist.length) ===
          enteredPlaylist.toUpperCase()
        ) {
          setMatchingPlaylists((prevArray) => [
            ...prevArray,
            { id: id, name: value.name, img: value.img, artist_id: value.artist_id },
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
        onClick={createPlaylist}
      >
        <label htmlFor="searchbar">Select Playlists: </label>
        <input type="text" className="searchbar" ref={playlistInputRef}></input>
        <button>Enter</button>
      </form>
      <ul className="search-list">
        {matchingPlaylists.map((playlist) => {
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
    </div>
  );
}
