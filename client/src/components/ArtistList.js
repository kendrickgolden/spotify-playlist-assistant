import Artist from "./Artist";

export default function ArtistList(props) {
  function createPlaylists() {    
    const artist_ids = JSON.stringify(props.artists.map(artist => artist.id));
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
    <div id="artist-list-container">
      <ul id="artist-list">
        {/*TODO: change to artist.id*/}
        {props.artists.map((artist) => {
          return <Artist name={artist.name} id={artist.id} key={artist.name} onClick={props.onClick}/>;
        })}
      </ul>
      <button id="create-playlist-btn" onClick={createPlaylists}>
        CREATE PLAYLISTS
      </button>
    </div>
  );
}
