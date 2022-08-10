import { useContext, useEffect } from "react";
import { ArtistMapContext } from "../contexts/ArtistMap";

export default function LoginHook(code) {
  const { artistMap, setArtistMap } = useContext(ArtistMapContext);

  function setUserData(data){

  }
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
      .then((data) => console.log(data))
      //.then((data) => setArtistMap(new Map(Object.entries(data.artists))))
      .catch((error) => {
        console.error(`Could not get liked songs: ${error}`);
      });
  }, [code]);
}
