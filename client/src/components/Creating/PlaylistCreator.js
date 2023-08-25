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
  const [artistScrollCounter, setArtistartistScrollCounter] = useState(0);
  const [playlistScrollCounter, setPlaylistScrollCounter] = useState(0);

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
    if(((artistList.length -1) % 5 === 0 ) && (playlistScrollCounter * 5 + 1 >= artistList.length) && playlistScrollCounter!=0) {
      setPlaylistScrollCounter(playlistScrollCounter - 1);
    }
  }

  return (
    <div className="playlist-operations">
      <SearchBar
        setMatching={setMatchingArtists}
        setArtistartistScrollCounter={setArtistartistScrollCounter}
        list={artists}
        category={"artist"}
      />
      <CreatePlaylistBtn
        artists={artistList}
        setArtists={setArtistList}
        onClick={removeArtist}
      />
      {matchingArtists.length > 0 && (
        <div id="result-info">
          {artistScrollCounter * 5 + 1} -{" "}
          {Math.min((artistScrollCounter + 1) * 5, matchingArtists.length)} of{" "}
          {matchingArtists.length} results
        </div>
      )}
      <div id="queue-info">{artistList.length} playlists to be created</div>
      <ArtistSelector
        onClick={addArtist}
        matchingArtists={matchingArtists}
        sC={artistScrollCounter}
        setSC={setArtistartistScrollCounter}
      />
      <ArtistList artists={artistList} onClick={removeArtist} sC={playlistScrollCounter} setSC={setPlaylistScrollCounter}/>
    </div>
  );
}
