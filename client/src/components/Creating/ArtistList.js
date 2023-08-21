import Artist from "./Artist";

export default function ArtistList(props) {
  
  return (
    <div className="queue-container" id='queue'>
      <ul className="result-list">
        {props.artists.map((artist) => {
          return (
            <Artist
              key={artist.id}
              id={artist.id}
              name={artist.name}
              img={artist.img}
              onClick={props.onClick}
            />
          );
        })}
      </ul> 
    </div>
  );
}
