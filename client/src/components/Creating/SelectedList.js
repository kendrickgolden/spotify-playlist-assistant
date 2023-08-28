import Card from "./Card";

export default function selectedList({ selectedList, onClick, sC, setSC }) {
  return (
    <div className="results-container" id="queue">
      {sC > 0 && (
        <button
          className="arrow"
          id="left-arrow"
          onClick={() => setSC(sC - 1)}
        ></button>
      )}
      {(sC + 1) * 5 < selectedList.length && (
        <button
          className="arrow"
          id="right-arrow"
          onClick={() => setSC(sC + 1)}
        ></button>
      )}
      <ul className="results-list" style={{ transform: "translateX(-" + sC * 100 + "%)" }}>
        {selectedList.map((artist) => {
          return (
            <Card
              key={artist.id}
              id={artist.id}
              name={artist.name}
              img={artist.img}
              onClick={onClick}
              type={"artist"}
            />
          );
        })}
      </ul>
    </div>
  );
}
