import { useState } from "react";

export default function Artist(props) {
  const [artistExists, setArtistExists] = useState(true);

  function deleteArtist() {
    setArtistExists(false);
  }
  return artistExists ? (
    <li id="artist">
      <div id="artist-pic" className="artist-grid-box">
        {" "}
      </div>
      <div id="artist-name" className="artist-grid-box">
        {props.name}{" "}
      </div>
      <div id="artist-options" className="artist-grid-box">
        <button id="remove-btn" onClick={deleteArtist}>
          <div id="white-line"></div>
        </button>
      </div>
    </li>
  ) : null;
}
