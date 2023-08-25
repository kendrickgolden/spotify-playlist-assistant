import Artist from "./Artist";

export default function ArtistList({ artists, onClick, sC, setSC }) {
  return (
    <div className="queue-container" id="queue">
      {sC > 0 && (
        <button
          className="arrow"
          id="left-arrow"
          onClick={() => setSC(sC - 1)}
        ></button>
      )}
      {(sC + 1) * 5 < artists.length && (
        <button
          className="arrow"
          id="right-arrow"
          onClick={() => setSC(sC + 1)}
        ></button>
      )}
      <ul className="result-list" style={{ transform: "translateX(-" + sC * 100 + "%)" }}>
        {artists.map((artist) => {
          return (
            <Artist
              key={artist.id}
              id={artist.id}
              name={artist.name}
              img={artist.img}
              onClick={onClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
