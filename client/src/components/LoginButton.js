import React from "react";

export default function LoginButton({ id }) {
  const client_id = "e1adb4658a2e48c99de92234a1396eeb";
  const scope =
    "user-library-read playlist-modify-private playlist-modify-public";
  const redirect_uri = window.location + 'create/';
  console.log(redirect_uri);

  //TODO: Implement state as query parameter
  return (
    <div className="login-btn" id={id}>
      <a
        href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&response_type=code&show_dialog=true`}
      >
        SIGN IN
      </a>
    </div>
  );
}
