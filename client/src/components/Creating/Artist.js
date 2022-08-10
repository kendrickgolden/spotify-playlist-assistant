import { useState } from "react";

export default function Artist(props) {
  const [artistExists, setArtistExists] = useState(true);

  function deleteArtist() {
    props.onClick(props.id);
  }

  return artistExists ? (
    <li className="card">
      <div className="card-pic card-grid-box">
        {props.img === "" || props.img === "-" ? null : (
          <img src={props.img}></img>
        )}{" "}
      </div>
      <div className="card-name card-grid-box">{props.name} </div>
      <div className="card-options card-grid-box">
        <button id="remove-btn" onClick={deleteArtist}>
          <div id="white-line"></div>
        </button>
      </div>
    </li>
  ) : null;
}
