import PlaylistSelector from "./PlaylistSelector";


export default function PlaylistUpdater() {
  return (
    <div className="playlist-opeartions">
      <div className="operations-title">
        <h2>Create Playlists</h2>
      </div>
      <div className="operations-flex">
        <PlaylistSelector/>
       {/* <ArtistSelector onClick={addArtist} />
        <ArtistList artists={artistList} onClick={removeArtist} />*/}
      </div>
    </div>
  );
}
