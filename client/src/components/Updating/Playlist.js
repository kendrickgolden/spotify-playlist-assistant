import { useState } from "react";

export default function Playlist(props) {
  const [playlistExists, setPlaylistExists] = useState(true);

  function deletePlaylist() {
    props.onClick(props.id);
  }

  return playlistExists ? (
    <li className="card">
      <div className="card-pic card-grid-box">
       {/*} {props.img === "" || props.img === "-" ? null : (
          <img src={props.img}></img>
       )}{" "}*/}
      </div>
      <div className="card-name card-grid-box">{props.name} </div>
      <div className="card-options card-grid-box">
        <button id="remove-btn" onClick={deletePlaylist}>
          <div id="white-line"></div>
        </button>
      </div>
    </li>
  ) : null;
}
