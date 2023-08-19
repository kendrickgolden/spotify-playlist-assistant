export default function SearchResultArtist(props) {
  function addArtist() {
    props.onClick(props.name, props.id, props.img);
  }

  return (
    <li className="card" onClick={addArtist}>
      <div className="card-pic">
        {props.img === "" || props.img === "-" ? null : (
          <img src={props.img} alt="artist profile pic"></img>
        )}{" "}
      </div>
      <div className="card-name">{props.name} </div>
    </li>
  );
}
