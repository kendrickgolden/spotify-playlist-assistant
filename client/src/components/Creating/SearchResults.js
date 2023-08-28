import Card from "./Card";

export default function SearchResults({
  matchingResults,
  onClick,
  sC,
  setSC,
  userData,
  type,
  type2,
}) {
  return (
    <div className="results-container" id={type2}>
      {userData.size === 0 ? (
        <ul className="results-list">
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
          {(sC + 1) * 5 < matchingResults.length && (
            <button
              className="arrow"
              id="right-arrow"
              onClick={() => setSC(sC + 1)}
            ></button>
          )}
          <ul
            className="results-list"
            style={{ transform: "translateX(-" + sC * 100 + "%)" }}
          >
            {matchingResults.map((result) => {
              return (
                <>
                  {type === "artist" ? (
                    <Card
                      key={result.id}
                      id={result.id}
                      name={result.name}
                      img={userData.get(result.id).img}
                      onClick={onClick}
                      type={type2}
                    />
                  ) : (
                    <Card
                      key={result.id}
                      id={result.id}
                      name={result.name}
                      img={result.img}
                      onClick={onClick}
                      type={type2}
                      artist_id={result.artist_id}
                    />
                  )}
                </>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
