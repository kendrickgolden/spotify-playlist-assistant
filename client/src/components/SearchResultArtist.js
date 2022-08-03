export default function SearchResultArtist(props) {

  /*function addArtist() {
    props.setArtistList((prevArray) => [...prevArray, { name: props.name }]);
  }*/
  
  return (
    <li id="artist">
      <div id="artist-pic" className="artist-grid-box">
        {" "}
      </div>
      <div id="artist-name" className="artist-grid-box">
        {props.name}{" "}
      </div>
      <div id="artist-options" className="artist-grid-box">
      </div>
    </li>
  );
}
