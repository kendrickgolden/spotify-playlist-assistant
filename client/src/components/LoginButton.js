import React from "react";

export default function LoginButton() {
  /*function LoginHandler() {
    const scope = 'user-library-read playlist-modify-private playlist-modify-public';
    const redirect_uri = "http://localhost:5000/callback/";
    const CLIENT_ID = "e1adb4658a2e48c99de92234a1396eeb";

    const fetchPromise = fetch(`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${scope}&redirect_uri=${redirect_uri}`, {
      method: "GET",
    });

    fetchPromise
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => console.log(data));
  }*/

  return (
    <a href="https://accounts.spotify.com/authorize?response_type=code&client_id=e1adb4658a2e48c99de92234a1396eeb&scope=user-top-read&redirect_uri=http://localhost:5000/callback/">
      <button>
        <div id="sign-in-btn">Login</div>
      </button>
    </a>
  );
}
