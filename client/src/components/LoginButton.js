import React from "react";

export default function LoginButton() {
  const client_id = "e1adb4658a2e48c99de92234a1396eeb";
  const scope =
    "user-library-read playlist-modify-private playlist-modify-public";
  const redirect_uri = "http://localhost:3000/";

  //TODO: Implement state as query parameter
  return (
    <a
      href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&response_type=code&show_dialog=true`}
    >
      <button>
        <div id="sign-IO-btn">Login</div>
      </button>
    </a>
  );
}
