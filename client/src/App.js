import { createContext, useState } from "react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Nav from "./components/Nav";
import PlaylistInfo from "./components/PlaylistInfo";
import MainPageCreate from "./components/Creating/MainPageCreate";
import MainPageUpdate from "./components/Creating/MainPageUpdate";
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
          <Link to="/" id="home-link">
            <h1>Spotify Playlist Assistant</h1>
          </Link>
          {code ? (
            <LogoutButton code={code} onClick={setCode} id='main-login'/>
          ) : (
            <LoginButton id='main-login'/>
          )}
          <hr id="header-line"></hr>
        </header>
        <div id="sidebar">
          {code ? null : (
            <div id="sidebar-lock">
              {" "}
              <LoginButton id='sidebar-login'/>{" "}
            </div>
          )}
          <Nav />
        </div>
        <div id="main-page">
          <Routes>
            <Route path="/" element={<PlaylistInfo code={code} />} />
            <Route path="/create" element={<MainPageCreate />} />
            {/*TODO: Figure out how to re-render MainPage element */}
            <Route path="/update" element={<MainPageUpdate />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
