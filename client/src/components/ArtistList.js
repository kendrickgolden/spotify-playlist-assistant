import Artist from './Artist';

export default function ArtistList(props) {
    
  return (
    <ul id="artist-list">
    {/*TODO: change to artist.id*/}
    {props.artists.map((artist) => {
      return (
            <Artist name={artist.name} key={artist.name}/>
      );
    })}
  </ul>
  );
}
