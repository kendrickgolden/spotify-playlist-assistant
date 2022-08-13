import Playlist from "./Playlist";

export default function PlaylistList(props) {
    function updatePlaylists() {
       
      }

  return (
    <div className="queue-container">
      <ul className="queue-list">
        {props.playlists.map((playlist) => {
          return (
            <Playlist
              key={playlist.id}
              id={playlist.id}
              name={playlist.name}
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
