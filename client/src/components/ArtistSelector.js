import { useRef, useContext, useState } from "react";
import SearchResultArtist from "./SearchResultArtist";
import { ArtistMapContext } from "../contexts/ArtistMap";

export default function ArtistSelector(props) {
  const artistInputRef = useRef();
  const { artistMap, setArtistMap } = useContext(ArtistMapContext);
  const [matchingArtists, setMatchingArtists] = useState([]);

  function createArtist(event) {
    event.preventDefault();
    setMatchingArtists([]);
    const enteredArtist = artistInputRef.current.value;

    if (enteredArtist.length > 0) {
      for (let artist of artistMap.values()) {
        if (
          artist.toUpperCase().substring(0, enteredArtist.length) ===
          enteredArtist.toUpperCase()
        ) {
          setMatchingArtists((prevArray) => [...prevArray, { name: artist }]);
          //props.onClick(enteredArtist);
        } else if (enteredArtist === "clear") {
        }
      }
    }
  }

  return (
    <div>
      <form id="artist-selector" onKeyUp={createArtist} onSubmit={createArtist}>
        <label htmlFor="artist-searchbar">Select Artists: </label>
        <input type="text" id="artist-searchbar" ref={artistInputRef}></input>
        <button>Enter</button>
      </form>
      <ul id="artist-search-list">
        {matchingArtists.map((artist) => {
          return <SearchResultArtist name={artist.name} key={artist.name} onClick={props.onClick}/>;
        })}
      </ul>
    </div>
  );
}
