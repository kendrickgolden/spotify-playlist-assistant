import ArtistSelector from "./ArtistSelector";
import ArtistList from "./ArtistList";
import { useState, useContext } from "react";
import { UserContext } from "../../App";
import CreatePlaylistBtn from "./Playlist Modification Tools/CreatePlaylistBtn";
import SearchBar from "./Playlist Modification Tools/SearchBar";

export default function Functions() {
  const UserContextValues = useContext(UserContext);
  const [artistList, setArtistList] = useState([]);
  const [matchingArtists, setMatchingArtists] = useState([]);
  const artists = UserContextValues.artists;

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
    <div className="playlist-operations">
      <SearchBar
        setMatching={setMatchingArtists}
        list={artists}
        category={"artist"}
      />
      <CreatePlaylistBtn
        artists={artistList}
        setArtists={setArtistList}
        onClick={removeArtist}
      />
      <ArtistSelector onClick={addArtist} matchingArtists={matchingArtists} />
      <ArtistList artists={artistList} onClick={removeArtist} />
    </div>
  );
}
