import { useContext } from "react";
import SearchResultArtist from "./SearchResultArtist";
import { UserContext } from "../../App";

export default function ArtistSelector({ matchingArtists, onClick, sC, setSC }) {
  const UserContextValues = useContext(UserContext);
  const artists = UserContextValues.artists;

  return (
    <div className="queue-container" id="selection">
      {artists.size === 0 ? (
        <ul className="result-list">
          <div className="loader list-loader"></div>
        </ul>
      ) : (
        <>
          {sC > 0 && (
            <button
              className="arrow"
              id="left-arrow"
              onClick={() => setSC(sC - 1)}
            ></button>
          )}
          {(sC + 1) * 5 < matchingArtists.length && (
            <button
              className="arrow"
              id="right-arrow"
              onClick={() => setSC(sC + 1)}
            ></button>
          )}
          <ul
            className="result-list"
            style={{ transform: "translateX(-" + sC * 100 + "%)" }}
          >
            {matchingArtists.map((artist) => {
              return (
                <SearchResultArtist
                  key={artist.id}
                  id={artist.id}
                  name={artist.name}
                  img={artists.get(artist.id).img}
                  onClick={onClick}
                />
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
