import { useRef } from "react";
import ArtistList from "./ArtistList";

export default function ArtistSelector(props) {
  const artistInputRef = useRef();

  function createArtist(event) {
    event.preventDefault();

    const enteredArtist = artistInputRef.current.value;

    const artistData = {name: enteredArtist};
    
    props.onClick(enteredArtist);
  }

  return (
    <form id="artist-selector" onSubmit={createArtist}>
      <label htmlFor="artist-searchbar">Select Artists: </label>
      <input type="text" id="artist-searchbar" ref={artistInputRef}></input>
      <button>Enter</button>
    </form>
  );
}
