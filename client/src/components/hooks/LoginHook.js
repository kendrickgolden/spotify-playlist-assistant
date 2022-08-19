import { useContext, useEffect } from "react";
import { UserContext } from "../../App";

export default function LoginHook(code) {
  const UserContextValues = useContext(UserContext);
  const setArtists = UserContextValues.setArtists;
  const setPlaylists = UserContextValues.setPlaylists;
  const redirect_uri = window.location;
  const path = new URL('/callback', window.location.href);

  window.history.pushState({}, null, "/");
  useEffect(() => {
    fetch(`/api/callback/?code=${code}&redirect_uri=${redirect_uri}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.playlists);
        console.log(data.artists);
        setArtists(new Map(Object.entries(data.artists)));
        setPlaylists(new Map(Object.entries(data.playlists)));
      })
      .catch((error) => {
        console.error(`Could not get liked songs: ${error}`);
      });
  }, [code]);
}
