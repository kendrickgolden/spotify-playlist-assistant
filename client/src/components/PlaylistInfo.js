import React from "react";
import { Navigate } from "react-router-dom";

export default function PlaylistInfo({ code }) {
/*  if (code) {
    return <Navigate to="/create" />;
  }*/
  return (
    <div className="playlist-info">
      <p>Sign-In to Spotify to access website features</p>
    </div>
  );
}
