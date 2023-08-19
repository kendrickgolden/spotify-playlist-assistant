export default function SearchResultPlaylist(props) {
    function addPlaylist() {
      props.onClick(props.id, props.name, props.img, props.artist_id);
    }
  
    return (
        <li className="card" onClick={addPlaylist}>
        <div className="card-pic">
          {props.img === "" || props.img === "-" ? null : (
            <img src={props.img} alt="artist profile pic"></img>
          )}{" "}
        </div>
        <div className="card-name">{props.name}  </div>
      </li>
    );
  }
  