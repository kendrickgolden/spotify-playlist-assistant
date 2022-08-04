import Artist from "./Artist";

export default function ArtistList(props) {
  function createPlaylists() {
    const artists_obj = Object.fromEntries(props.artists);
    const artists_json = JSON.stringify(artists_obj);
    console.log(typeof artists_json);
    fetch(
      `http://localhost:5000/playlists/create/from_artists?artists=hello`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        console.log(response);
        return response.json();
      })
      .catch((error) => {
        console.error(`Could not create playlists: ${error}`);
      });
  }

  return (
    <div id="artist-list-container">
      <ul id="artist-list">
        {/*TODO: change to artist.id*/}
        {props.artists.map((artist) => {
          return <Artist name={artist.name} key={artist.name} />;
        })}
      </ul>
      <button id="create-playlist-btn" onClick={createPlaylists}>
        CREATE PLAYLISTS
      </button>
    </div>
  );
}
