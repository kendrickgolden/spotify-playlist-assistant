export default function SearchResultPlaylist(props) {
    function addPlaylist() {
      props.onClick();
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
  