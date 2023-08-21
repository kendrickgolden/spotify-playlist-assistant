import { useContext, useState } from "react";
import SearchResultArtist from "./SearchResultArtist";
import { UserContext } from "../../App";
import SearchBar from "./Playlist Modification Tools/SearchBar";

export default function ArtistSelector(props) {
  const UserContextValues = useContext(UserContext);
  const artists = UserContextValues.artists;
  const [matchingArtists, setMatchingArtists] = useState([]);

  return (
    <div className="queue-container">
      <SearchBar
        setMatching={setMatchingArtists}
        list={artists}
        category={"artist"}
      />
      {artists.size === 0 ? (
        <ul className="result-list">
          <div className="loader list-loader"></div>
        </ul>
      ) : (
        <ul className="result-list">
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
      )}
    </div>
  );
}
