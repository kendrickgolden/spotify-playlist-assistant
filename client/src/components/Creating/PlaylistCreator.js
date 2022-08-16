import ArtistSelector from "./ArtistSelector";
import ArtistList from "./ArtistList";
import { useState } from "react";

export default function Functions() {
  const [artistList, setArtistList] = useState([]);

  function addArtist(name, id, img) {
    function containsArtists(artist) {
      if (artist.id === id) {
        return true;
      }
    }
    if (!artistList.some(containsArtists)) {
      setArtistList((prevArray) => [
        ...prevArray,
        { name: name, id: id, img: img },
      ]);
    }
  }

  function removeArtist(id) {
    setArtistList((prevArray) =>
      prevArray.filter((artist) => artist.id !== id)
    );
    console.log(id);
    console.log(artistList);
  }

  return (
    <div className="playlist-opeartions">
      <div className="operations-title">
        <h2>Create Playlists</h2>
      </div>
      <div className="operations-flex">
        <ArtistSelector onClick={addArtist} />
        <ArtistList artists={artistList} setArtists={setArtistList} onClick={removeArtist} />
      </div>
    </div>
  );
}
