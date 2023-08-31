import SearchResults from "./SearchResults";
import { useState, useContext } from "react";
import { UserContext } from "../../App";
import PlaylistBtn from "./Playlist Modification Tools/PlaylistBtn";
import SearchBar from "./Playlist Modification Tools/SearchBar";

export default function MainPageUpdate() {
  const UserContextValues = useContext(UserContext);
  const list = UserContextValues.playlists;

  //list of search results
  const [matchingResults, setMatchingResults] = useState(
    Array.from(list).map(([key, value]) => ({
      id: key,
      name: value.name,
      img: value.img,
      artist_id: value.artist_id,
    }))
  );
  //list of selected items
  const [selectedList, setSelectedList] = useState([]);



  const [resultsScrollCounter, setResultsScrollCounter] = useState(0);
  const [selectedScrollCounter, setSelectedScrollCounter] = useState(0);

  function addItem(id, name, img, supporting_id) {
    function containsItem(item) {
      if (item.id === id) {
        return true;
      }
    }
    if (!selectedList.some(containsItem) && img !== "") {
        setSelectedList((prevArray) => [
          ...prevArray,
          { id: id, name: name, img: img, artist_id: supporting_id },
        ]);
    }
  }

  function removeItem(id) {
    setSelectedList((prevArray) => prevArray.filter((item) => item.id !== id));
    if (
      (selectedList.length - 1) % 5 === 0 &&
      selectedScrollCounter * 5 + 1 >= selectedList.length &&
      selectedScrollCounter !== 0
    ) {
      setSelectedScrollCounter(selectedScrollCounter - 1);
    }
  }

  return (
    <div className="playlist-operations">
      <SearchBar
        setMatching={setMatchingResults}
        setResultsScrollCounter={setResultsScrollCounter}
        list={list}
        category={"playlist"}
      />

      <PlaylistBtn
        selected={selectedList}
        setSelected={setSelectedList}
        type={"update"}
      />
      {matchingResults.length > 0 && (
        <div id="result-info" className="info">
          {resultsScrollCounter * 5 + 1} -{" "}
          {Math.min((resultsScrollCounter + 1) * 5, matchingResults.length)} of{" "}
          {matchingResults.length} result{matchingResults.length != 1 && 's'}
        </div>
      )}

      <div id="queue-info" className="info">{selectedList.length} playlist{selectedList.length != 1 && 's'} to be updated</div>
      <SearchResults
        matchingResults={matchingResults}
        onClick={addItem}
        sC={resultsScrollCounter}
        setSC={setResultsScrollCounter}
        userData={list}
        type={"playlist"}
        type2={"search-results"}
      />

      <SearchResults
        matchingResults={selectedList}
        onClick={removeItem}
        sC={selectedScrollCounter}
        setSC={setSelectedScrollCounter}
        userData={list}
        type={"playlist"}
        type2={"selected-results"}
      />
    </div>
  );
}
