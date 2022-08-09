import { useContext, useEffect } from "react";
import { ArtistMapContext } from "../../contexts/ArtistMap";

export default function LoginHook(code) {
  const { artistMap, setArtistMap } = useContext(ArtistMapContext);

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
      .then((data) => setArtistMap(new Map(Object.entries(data))))
      .catch((error) => {
        console.error(`Could not get liked songs: ${error}`);
      });
  }, [code]);
}
