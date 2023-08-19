import { createContext, useState } from "react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Nav from "./components/Nav";
import PlaylistInfo from "./components/PlaylistInfo";
import PlaylistCreator from "./components/Creating/PlaylistCreator";
import PlaylistUpdater from "./components/Updating/PlaylistUpdater";
import { Route, Routes, Link } from "react-router-dom";

const params = new URLSearchParams(window.location.search);
const params_code = params.get("code");
export const UserContext = createContext();

function App() {
  const [code, setCode] = useState(params_code);
  const [artists, setArtists] = useState(new Map());
  const [playlists, setPlaylists] = useState(new Map());
  const value = { artists, setArtists, playlists, setPlaylists };

  return (
    <>
      <UserContext.Provider value={value}>
        <header>
          <Link to='/' id="home-link">
          <h1>Spotify Playlist Assistant</h1>
          </Link>
          {code ? (
            <LogoutButton code={code} onClick={setCode} />
          ) : (
            <LoginButton />
          )}
          <hr id="header-line"></hr>
        </header>
        <div id="main-page">
          {code ? <Nav/> : <div className='playlist-si'><p>Sign-In to access playlist features</p></div>}
            <Routes>
              <Route path="/" element={<PlaylistInfo/>}/>
              <Route path="/create" element={<PlaylistCreator />}/>
              <Route path="/update" element={<PlaylistUpdater />}/>
            </Routes>  
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
