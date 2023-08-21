import { useContext, useState } from "react";
import SearchResultArtist from "./SearchResultArtist";
import { UserContext } from "../../App";

export default function ArtistSelector(props) {
  const UserContextValues = useContext(UserContext);
  const artists = UserContextValues.artists;

  return (
    <div className="queue-container" id="selection">
      {artists.size === 0 ? (
        <ul className="result-list">
          <div className="loader list-loader"></div>
        </ul>
      ) : (
        <ul className="result-list">
          {props.matchingArtists.map((artist) => {
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
