import { useRef } from "react";

export default function SearchBar(props) {
  const inputRef = useRef();

  function updateMap(data) {
    let tempMap = new Map(Object.entries(data));
    let newMatchingResults = [];
    for (let [id, img] of tempMap) {
      props.list.get(id).img = img;
      let name = props.list.get(id).name;
      newMatchingResults.push({ name: name, id: id, img: img });
    }
    console.log(newMatchingResults);
    props.setMatching(newMatchingResults);
  }

  function create(event) {
    event.preventDefault();
    props.setMatching([]);
    const enteredTerm = inputRef.current.value;
    let count = 0;
    let current_string = "";
    if (props.category === "artist") {
      if (enteredTerm.length > 0) {
        for (let [id, value] of props.list.entries()) {
          if (
            value.name.toUpperCase().substring(0, enteredTerm.length) ===
            enteredTerm.toUpperCase()
          ) {
            if (value.img === "") {
              count++;
              current_string = current_string.concat(id, ",");
            }
            props.setMatching((prevArray) => [
              ...prevArray,
              { name: value.name, id: id },
            ]);
          }
        }

        if (count > 0) {
          console.log(current_string);
          fetch(
            `/api/${props.category}s/images?${props.category}_ids=${current_string}`,
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
    } else if (props.category === "playlist") {
      if (enteredTerm.length === 0) {
        props.setMatching(
          Array.from(props.list).map(([id, value]) => ({
            id: id,
            name: value.name,
            img: value.img,
            artist_id: value.artist_id,
          }))
        );
      } else {
        for (let [id, value] of props.list.entries()) {
          if (
            value.name.toUpperCase().substring(0, enteredTerm.length) ===
            enteredTerm.toUpperCase()
          ) {
            props.setMatching((prevArray) => [
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
      <label htmlFor="searchbar">Search {props.category}s: </label>
      <div className="searchbar-container">
        <div className="magnifying-glass">
          <div className="mg-circle"></div> <div className="mg-handle"></div>
        </div>
        <input type="text" className="searchbar" ref={inputRef}></input>
      </div>
    </form>
  );
}
