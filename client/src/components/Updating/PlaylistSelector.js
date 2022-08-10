import React from 'react'

export default function PlaylistSelector() {
    return (
        <div>
         {/*} <form className="selector" onKeyUp={createArtist} onSubmit={createArtist}>*/}
            <form className='selector'>
            <label htmlFor="searchbar">Select Playlists: </label>
            {/*<input type="text" className="searchbar" ref={artistInputRef}></input>*/}
            <input type="text" className="searchbar" ></input>
            <button>Enter</button>
          </form>
          <ul className="search-list">
           {/*} {matchingArtists.map((artist) => {
              return (
                <SearchResultArtist
                  key={artist.id}
                  id={artist.id}
                  name={artist.name}
                  img={artistMap.get(artist.id).img}
                  onClick={props.onClick}
                />
              );
            })}*/}
          </ul>
        </div>
      );
}
