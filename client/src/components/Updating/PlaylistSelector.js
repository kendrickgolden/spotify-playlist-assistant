import { useContext, useState } from "react";
import { UserContext } from "../../App";
import SearchResultPlaylist from "./SearchResultPlaylist";
import SearchBar from "../Creating/Playlist Modification Tools/SearchBar";

export default function PlaylistSelector(props) {
  const UserContextValues = useContext(UserContext);
  const playlists = UserContextValues.playlists;
  const [matchingPlaylists, setMatchingPlaylists] = useState(
    Array.from(playlists).map(([key, value]) => ({
      id: key,
      artist_id: value.artist_id,
      img: value.img,
      name: value.name,
    }))
  );

  return (
    <div className="queue-container">
      {console.log(playlists.size)}
      <SearchBar
        setMatching={setMatchingPlaylists}
        list={playlists}
        category={"playlist"}
      />
      {playlists.size === 0 ? (
        <ul className="result-list">
          <div className="loader list-loader"></div>
        </ul>
      ) : (
        <ul className="result-list">
          {matchingPlaylists.map((playlist) => {
            return (
              <SearchResultPlaylist
                key={playlist.id}
                id={playlist.id}
                artist_id={playlist.artist_id}
                name={playlist.name}
                img={playlist.img}
                onClick={props.onClick}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
