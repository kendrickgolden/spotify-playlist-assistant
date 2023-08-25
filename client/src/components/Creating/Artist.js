import { useState } from "react";

export default function Artist(props) {
  const [artistExists, ] = useState(true);

  function deleteArtist() {
    props.onClick(props.id);
  }

  return artistExists ? (
    <li className="card">
        {props.img === "" || props.img === "-" ? <div className="img-filler">No image available</div> : (
          <img src={props.img} alt="playlist"></img>
        )}{" "}
      <div className="card-name">{props.name} </div>
        <button id="remove-btn" onClick={deleteArtist}>
        </button>
    </li>
  ) : null;
}
