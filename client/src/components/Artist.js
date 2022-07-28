import React from 'react'

export default function Artist(props) {
  function removeArtist() {

  }

  return (
    <div id="artist">
      <div id="artist-pic" className="artist-grid-box"> </div>
      <div id="artist-name" className="artist-grid-box">{props.name} </div>
      <div id="artist-options" className="artist-grid-box">
        <button id="remove-btn" onClick={removeArtist}>
          <div id="white-line"></div>
        </button>
      </div>
      </div>
  )
}
