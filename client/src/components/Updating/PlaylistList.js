import Playlist from "./Playlist";

export default function PlaylistList(props) {
  function updatePlaylists() {
    const playlist_ids = JSON.stringify(
      props.playlists.map((playlist) => playlist.id)
    );
    props.setPlaylists([]);
    fetch(
      `http://localhost:5000/playlists/update/update?playlists=${playlist_ids}`,
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
      .catch((error) => {
        console.error(`Could not create playlists: ${error}`);
      });
  }

  return (
    <div className="queue-container">
      {console.log(props.playlists)}
      <ul className="queue-list">
        {props.playlists.map((playlist) => {
          return (
            <Playlist
              key={playlist.id}
              id={playlist.id}
              name={playlist.name}
              img={playlist.img}
              onClick={props.onClick}
            />
          );
        })}
      </ul>
      <button className="playlist-btn" onClick={updatePlaylists}>
        UPDATE PLAYLISTS
      </button>
    </div>
  );
}
