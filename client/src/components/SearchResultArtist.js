export default function SearchResultArtist(props) {
  function addArtist() {
    props.onClick(props.name, props.id);
  }

  return (
    <li id="artist" onClick={addArtist}>
      <div id="artist-pic" className="artist-grid-box">
        {" "}
      </div>
      <div id="artist-name" className="artist-grid-box">
        {props.name}{" "}
      </div>
      <div id="artist-options" className="artist-grid-box"></div>
    </li>
  );
}