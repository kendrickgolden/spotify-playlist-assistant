import Artist from "./Artist";

export default function ArtistList(props) {
  function createPlaylists() {
    const artist_ids = JSON.stringify(props.artists.map((artist) => artist.id));
    fetch(
      `http://localhost:5000/playlists/create/from_artists?artists=${artist_ids}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error(`Could not create playlists: ${error}`);
      });
  }

  return (
    <div className="queue-container">
      <ul className="queue-list">
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
      <button className="playlist-btn" onClick={createPlaylists}>
        CREATE PLAYLISTS
      </button>
    </div>
  );
}
