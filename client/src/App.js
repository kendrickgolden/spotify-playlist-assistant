import { createContext, useState} from "react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import PlaylistCreator from "./components/Creating/PlaylistCreator";
import PlaylistUpdater from "./components/Updating/PlaylistUpdater"

const params = new URLSearchParams(window.location.search);
const params_code = params.get("code");
export const UserContext = createContext();

function App() {
  const [code, setCode] = useState(params_code);
  const [artists, setArtists] = useState(new Map());
  const [playlists, setPlaylists] = useState([]);
  const value = { artists, setArtists, playlists, setPlaylists };
  
  return (
    <>
      <UserContext.Provider value={value}>
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
          {console.log(artists)}
          {console.log(playlists)}
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
