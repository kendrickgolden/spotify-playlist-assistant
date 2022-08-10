export default function SearchResultArtist(props) {
  function addArtist() {
    props.onClick(props.name, props.id, props.img);
  }

  return (
    <li className="card" onClick={addArtist}>
      <div className="card-pic card-grid-box">
        {props.img === "" || props.img === "-" ? null : (
          <img src={props.img}></img>
        )}{" "}
      </div>
      <div className="card-name card-grid-box">{props.name} </div>
      <div className="card-options card-grid-box"></div>
    </li>
  );
}
