import { useState } from "react";

export default function Artist(props) {
  const [artistExists, ] = useState(true);

  function deleteArtist() {
    props.onClick(props.id);
  }

  return artistExists ? (
    <li className="card">
      <div className="card-pic">
        {props.img === "" || props.img === "-" ? null : (
          <img src={props.img} alt="playlist"></img>
        )}{" "}
      </div>
      <div className="card-name">{props.name} </div>
        <button id="remove-btn" onClick={deleteArtist}>
        </button>
    </li>
  ) : null;
}
