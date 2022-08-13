export default function SearchResultPlaylist(props) {
    function addPlaylist() {
      props.onClick(props.id, props.name, props.artist_id);
    }
  
    return (
        <li className="card" onClick={addPlaylist}>
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
  