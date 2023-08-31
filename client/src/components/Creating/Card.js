import { useState } from "react";

export default function Card({ id, name, img, onClick, type, artist_id }) {
  const [itemExists] = useState(true);

  //change to make playlists add and delete
  function addItem() {
    if (type !== "selected-results") {
      onClick(id, name, img, artist_id);
    }
  }

  function removeItem() {
    onClick(id);
  }

  return itemExists ? (
    <li className="card test" onClick={addItem}>
      {img === "" || img === "-" ? (
        <div className="img-filler">No image available</div>
      ) : (
        <img src={img} alt={type} draggable="false"></img>
      )}{" "}
      <div className="card-name">{name} </div>
      {type === "selected-results" && (
        <button id="remove-btn" onClick={removeItem}></button>
      )}
    </li>
  ) : null;
}
