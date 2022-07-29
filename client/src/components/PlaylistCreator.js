import ArtistList from "./ArtistList";
import ArtistSelector from "./ArtistSelector";
import { useState } from "react";

//TEMP DATA:
const TEMP_DATA = [
  { name: "Tyler, the Creator" },
  { name: "Lil Uzi Vert" },
  { name: "Kanye West" },
  { name: "Playboi Carti" },
  { name: "Juice WRLD" },
];

export default function Functions() {
  const [artistList, setArtistList] = useState(TEMP_DATA);

  function addArtist(artist){
    setArtistList(artistList.push({ name: artist }));
    console.log(artistList);
  }

  return (
    <div id="create-playlists">
      <div id="create-playlists-title">
        <h2>Create Playlists</h2>
      </div>
      <div id="create-playlists-flex">
        <ArtistSelector onClick={addArtist}/>
        <ArtistList artists={TEMP_DATA} />
      </div>
    </div>
  );
}
