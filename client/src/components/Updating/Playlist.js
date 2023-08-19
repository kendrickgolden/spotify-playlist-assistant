import { useState } from "react";

export default function Playlist(props) {
  const [playlistExists, ] = useState(true);

  function deletePlaylist() {
    props.onClick(props.id);
  }

  return playlistExists ? (
    <li className="card">
      <div className="card-pic">
      {props.img === "" || props.img === "-" ? null : (
            <img src={props.img} alt="playlist"></img>
          )}{" "}
      </div>
      <div className="card-name">{props.name} </div>
        <button id="remove-btn" onClick={deletePlaylist}>
        </button>
    </li>
  ) : null;
}
