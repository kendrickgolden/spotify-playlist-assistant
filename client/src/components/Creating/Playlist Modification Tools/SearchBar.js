import { useRef } from "react";

export default function SearchBar({setMatching, setArtistartistScrollCounter, list, category}) {
  const inputRef = useRef();

  function updateMap(data) {
    let tempMap = new Map(Object.entries(data));
    let newMatchingResults = [];
    for (let [id, img] of tempMap) {
      list.get(id).img = img;
      let name = list.get(id).name;
      newMatchingResults.push({ name: name, id: id, img: img });
    }
    console.log(newMatchingResults);
    setMatching(newMatchingResults);
  }

  function create(event) {
    event.preventDefault();
    setMatching([]);
    setArtistartistScrollCounter(0);
    const enteredTerm = inputRef.current.value;
    let count = 0;
    let current_string = "";
    if (category === "artist") {
      if (enteredTerm.length > 0) {
        for (let [id, value] of list.entries()) {
          if (
            value.name.toUpperCase().substring(0, enteredTerm.length) ===
            enteredTerm.toUpperCase()
          ) {
            if (value.img === "") {
              count++;
              current_string = current_string.concat(id, ",");
            }
            setMatching((prevArray) => [
              ...prevArray,
              { name: value.name, id: id },
            ]);
          }
        }

        if (count > 0) {
          console.log(current_string);
          fetch(
            `/api/${category}s/images?${category}_ids=${current_string}`,
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
    } else if (category === "playlist") {
      if (enteredTerm.length === 0) {
        setMatching(
          Array.from(list).map(([id, value]) => ({
            id: id,
            name: value.name,
            img: value.img,
            artist_id: value.artist_id,
          }))
        );
      } else {
        for (let [id, value] of list.entries()) {
          if (
            value.name.toUpperCase().substring(0, enteredTerm.length) ===
            enteredTerm.toUpperCase()
          ) {
            setMatching((prevArray) => [
              ...prevArray,
              {
                id: id,
                name: value.name,
                img: value.img,
                artist_id: value.artist_id,
              },
            ]);
          }
        }
      }
    }
  }

  return (
    <form className="selector" onKeyUp={create} onSubmit={create}>
      <label htmlFor="searchbar">Search {category}s: </label>
      <div className="searchbar-container">
        <div className="magnifying-glass">
          <div className="mg-circle"></div> <div className="mg-handle"></div>
        </div>
        <input type="text" className="searchbar" ref={inputRef}></input>
      </div>
    </form>
  );
}
