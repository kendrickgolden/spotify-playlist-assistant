import { useEffect, useState } from "react";
import {createContext} from 'react'

export const ArtistMapContext = createContext();

export default function LoginHook(code, {children}) {

  const [artistMap, setArtistMap] = useState();

  window.history.pushState({}, null, "/");
  useEffect(() => {
    fetch(`http://localhost:5000/callback/?code=${code}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setArtistMap(data))
      .catch((error) => {
        console.error(`Could not get liked songs: ${error}`);
      });
  }, [code]);

  return(
    <ArtistMapContext.Provider value={artistMap}>{children}</ArtistMapContext.Provider>
);
}
