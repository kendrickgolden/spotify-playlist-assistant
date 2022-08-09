import ArtistList from "./ArtistList";
import ArtistSelector from "./ArtistSelector";
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
      setArtistList((prevArray) => [...prevArray, { name: name, id: id, img: img }]);
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
    <div id="create-playlists">
      <div id="create-playlists-title">
        <h2>Create Playlists</h2>
      </div>
      <div id="create-playlists-flex">
        <ArtistSelector onClick={addArtist} />
        <ArtistList artists={artistList} onClick={removeArtist} />
      </div>
    </div>
  );
}
