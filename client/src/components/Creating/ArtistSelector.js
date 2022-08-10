import { useRef, useContext, useState } from "react";
import SearchResultArtist from "./SearchResultArtist";
import { UserContext } from "../../App";

export default function ArtistSelector(props) {
  const artistInputRef = useRef();
  const UserContextValues = useContext(UserContext);
  const artists = UserContextValues.artists;
  const [matchingArtists, setMatchingArtists] = useState([]);

  function updateMap(data) {
    let tempMap = new Map(Object.entries(data));
    let newMatchingArtist = [];
    for (let [id, img] of tempMap) {
      artists.get(id).img = img;
      let name = artists.get(id).name;
      newMatchingArtist.push({ name: name, id: id, img: img });
    }
    console.log(newMatchingArtist);
    setMatchingArtists(newMatchingArtist);
  }

  function createArtist(event) {
    event.preventDefault();
    setMatchingArtists([]);
    const enteredArtist = artistInputRef.current.value;
    let count = 0;
    let current_string = "";
    if (enteredArtist.length > 0) {
      for (let [id, value] of artists.entries()) {
        if (
          value.name.toUpperCase().substring(0, enteredArtist.length) ===
          enteredArtist.toUpperCase()
        ) {
          if (value.img === "") {
            count++;
            current_string = current_string.concat(id, ",");
          }
          setMatchingArtists((prevArray) => [
            ...prevArray,
            { name: value.name, id: id },
          ]);
        }
      }

      if (count > 0) {
        console.log(current_string);
        fetch(
          `http://localhost:5000/artists/images?artist_ids=${current_string}`,
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
          .then((data) => updateMap(data))
          .catch((error) => {
            console.error(`Could not create playlists: ${error}`);
          });
      }
    }
  }

  return (
    <div>
      <form className="selector" onKeyUp={createArtist} onSubmit={createArtist}>
        <label htmlFor="searchbar">Select Artists: </label>
        <input type="text" className="searchbar" ref={artistInputRef}></input>
        <button>Enter</button>
      </form>
      <ul className="search-list">
        {matchingArtists.map((artist) => {
          return (
            <SearchResultArtist
              key={artist.id}
              id={artist.id}
              name={artist.name}
              img={artists.get(artist.id).img}
              onClick={props.onClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
