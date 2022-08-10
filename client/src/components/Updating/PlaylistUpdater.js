import PlaylistSelector from "./PlaylistSelector";

function addPlaylist() {

}

export default function PlaylistUpdater() {
  return (
    <div className="playlist-opeartions">
      <div className="operations-title">
        <h2>Update Playlists</h2>
      </div>
      <div className="operations-flex">
        <PlaylistSelector onClick={addPlaylist}/>
       {/* <ArtistSelector onClick={addArtist} />
        <ArtistList artists={artistList} onClick={removeArtist} />*/}
      </div>
    </div>
  );
}
