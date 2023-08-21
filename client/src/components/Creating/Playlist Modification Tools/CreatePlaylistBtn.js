import {useState} from 'react'

export default function CreatePlaylistBtn(props) {
    const [loading, setLoading] = useState(false);

    function createPlaylists() {
        //console.log(type);
        console.log(props.artists.length);
        if (props.artists.length === 0) {
          return;
        }
    
    
        const artist_ids = JSON.stringify(props.artists.map((artist) => artist.id));
        props.setArtists([]);
        setLoading(true);
        fetch(
          `/api/playlists/create/from_artists?artists=${artist_ids}`,
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
          .then(() => setLoading(false))
          .catch((error) => {
            console.error(`Could not create playlists: ${error}`);
          });
      }

  return (
    <button type='button' className="playlist-btn" onClick={createPlaylists}>
        {loading ? <div className="loader"></div> : <div>CREATE PLAYLISTS</div>}
  </button>
  )
}
