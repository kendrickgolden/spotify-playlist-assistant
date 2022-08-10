import { useState} from "react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import PlaylistCreator from "./components/Creating/PlaylistCreator";
import PlaylistUpdater from "./components/Updating/PlaylistUpdater"
import { ArtistMapContext } from "./components/contexts/ArtistMap";

const params = new URLSearchParams(window.location.search);
const params_code = params.get("code");

function App() {
  const [artistMap, setArtistMap] = useState(new Map());
  const value = { artistMap, setArtistMap };
  const [code, setCode] = useState(params_code);

  return (
    <>
      <ArtistMapContext.Provider value={value}>
        <header>
          <h1>Spotify Playlist Assistant</h1>
          {code ? <LogoutButton code={code} onClick={setCode}/> : <LoginButton />}
          <hr id="header-line"></hr>
        </header>
        <div id="main-page">
          <div id="playlist-operations-flex">
            <PlaylistCreator />
            <PlaylistUpdater />
          </div>
          {console.log(artistMap)}
        </div>
      </ArtistMapContext.Provider>
    </>
  );
}

export default App;
