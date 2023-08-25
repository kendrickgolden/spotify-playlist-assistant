export default function SearchResultArtist(props) {
  function addArtist() {
    props.onClick(props.name, props.id, props.img);
  }

  return (
    <li className="card" onClick={addArtist}>
        {props.img === "" || props.img === "-" ? <div className="img-filler"></div> : (
          <img src={props.img} alt="artist profile pic" draggable="false"></img>
        )}{" "}
      <div className="card-name">{props.name} </div>
    </li>
  );
}
