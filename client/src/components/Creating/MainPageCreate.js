import SearchResults from "./SearchResults";
import { useState, useContext } from "react";
import { UserContext } from "../../App";
import PlaylistBtn from "./Playlist Modification Tools/PlaylistBtn";
import SearchBar from "./Playlist Modification Tools/SearchBar";

export default function MainPage() {
  //list of search results
  const [matchingResults, setMatchingResults] = useState([]);
  //list of selected items
  const [selectedList, setSelectedList] = useState([]);

  const UserContextValues = useContext(UserContext);
  const list = UserContextValues.artists;

  const [resultsScrollCounter, setResultsScrollCounter] = useState(0);
  const [selectedScrollCounter, setSelectedScrollCounter] = useState(0);

  function addItem(id, name, img) {
    function containsItem(item) {
      if (item.id === id) {
        return true;
      }
    }
    if (!selectedList.some(containsItem) && img !== "") {
        setSelectedList((prevArray) => [
          ...prevArray,
          { id: id, name: name, img: img },
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
        category={"artist"}
      />

      <PlaylistBtn
        selected={selectedList}
        setSelected={setSelectedList}
        type={"create"}
      />
      {matchingResults.length > 0 && (
        <div id="result-info">
          {resultsScrollCounter * 5 + 1} -{" "}
          {Math.min((resultsScrollCounter + 1) * 5, matchingResults.length)} of{" "}
          {matchingResults.length} results
        </div>
      )}

      <div id="queue-info">{selectedList.length} playlists to be created</div>
      <SearchResults
        matchingResults={matchingResults}
        onClick={addItem}
        sC={resultsScrollCounter}
        setSC={setResultsScrollCounter}
        userData={list}
        type={"artist"}
        type2={"search-results"}
      />

      <SearchResults
        matchingResults={selectedList}
        onClick={removeItem}
        sC={selectedScrollCounter}
        setSC={setSelectedScrollCounter}
        userData={list}
        type={"artist"}
        type2={"selected-results"}
      />
    </div>
  );
}
