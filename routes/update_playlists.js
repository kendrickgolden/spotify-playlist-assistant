let express = require('express');
let router = express.Router();
const callbackRouter = require('./callback');
const fetch = require('node-fetch');
const User = require('../models/user');
const { map, reject } = require('async');

router.get('/',function(req, res, next) {
    //TODO: Scan liked songs for artist in saved playlists and update
    const token = callbackRouter.token;
    const user_id = callbackRouter.user_id;
    let artist_map = new Map();

    updateSongs();

    async function updateSongs(){
        await getPlaylists();

        //TODO: create arrays of songs to be added, and then add in groups
        await updateMap();
        
        //updatePlaylists();
        console.log(artist_map);
    }

    function getPlaylists() {
       // return new Promise((res, rej) => {
            //console.log("D");
            return new Promise (resolve => User.findOne({id: user_id}, async (error,data) => {
                if(error){
                    console.log("Could not find playlists:" + error);
                } else {
                    for(let playlist of data.playlists) {
                        let playlist_obj = JSON.parse(playlist);
                        let map_value = {playlist_id: playlist_obj.id, tracklist: [], new_tracks: []};
                        artist_map.set(playlist_obj.artist_id,map_value);

                        await getPlaylistSongs(map_value);
                    //  console.log(artist_map);
                    //console.log("A");
                    }
                } 
                resolve();
        }));
        }


    async function getPlaylistSongs(map_value) {
        let playlist_id = map_value.playlist_id;
        let tracklist = map_value.tracklist;
        let offset = 0;
        let total_songs = 1;
        while(offset < total_songs) {
           // console.log("A");
            let fetchPromise = fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=total,items(track.id)&limit=50&offset=${offset}`, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + token}
            });

            await fetchPromise
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => createSongArray(data, tracklist))
                .then(data => total_songs = data)
                .then(offset+=50)
                .catch(error => {
                    console.error(`Could not get playlist songs: ${error}`);
                });
                offset+=50;
        }
    }

    
    function createSongArray(data, tracklist){
        let song_array = data.items.map(x => x.track.id);
        for(song of song_array) {
            //console.log(song);
            tracklist.push(song);
        }
        //tracklist = song_array;
        return data.total;
    }
  
     function updateMap() {
       return new Promise(async resolve =>  {
        let offset = 0;
        let total_songs = 1;

        while(offset < total_songs) {
            //console.log("b")
            let fetchPromise = fetch(`https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + token}
            });

            await fetchPromise
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => addNewSongs(data))
                .then(data => total_songs = data)
                .then(offset+=50)
                //.then(console.log("testt"))
                .catch(error => {
                    console.error(`Could not get liked_songs: ${error}`);
                });
 
            }
           // console.log("o: " + offset)
          //  console.log("t: " + total_songs)
            resolve();
        });
    }

     function addNewSongs(data) {
        for(let i = 0; i < data.items.length; i++) {
            let current_track = data.items[i].track;
            for(let artist of current_track.artists) {
                if(artist_map.has(artist.id) && !artist_map.get(artist.id).tracklist.includes(current_track.id)) {
                    artist_map.get(artist.id).new_tracks.push(current_track.id);
                } 
            }
        }
        //console.log("total: " + data.total);
        return data.total;
    }

  
     /*        const playlists = await User.where('id').equals(user_id).select("playlists").then(query => {
            console.log(JSON.stringify(query.playlists));
        });
      //  for(let playlist of playlists.playlist) {
        //    console.log("playlist: " + playlist);
         //   let playlist_obj = JSON.parse(playlist);
        //    console.log("OBJ: " + playlist_obj);
           // artist_map.set(playlist_obj.artist_id,playlist_obj.id);
      //  }
    }*/

     /*   const playlists = await User.where('id').equals(user_id).select("playlists").exec((error,query) => {
            if(error){
                console.log(error);
            } else {
                console.log(query[0].playlists);
            }
            
               for(let playlist of playlists.playlist) {
                    console.log("playlist: " + playlist);
                    let playlist_obj = JSON.parse(playlist);
                    console.log("OBJ: " + playlist_obj);
                    artist_map.set(playlist_obj.artist_id,playlist_obj.id);
                }
        });
    }*/

     //gets all of a user's liked tracks
  /*   async function getLikedTracks(){
        while(offset < total_songs) {
            let fetchPromise = fetch(`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + token}
            });

            await fetchPromise
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => createArtistMap(data))
                .catch(error => {
                    console.error(`Could not get liked_songs: ${error}`);
                });
                offset+=50;
        }
    }


    //Creates map of form artist: ["track1_uri,track2_uri,..."]
    function createArtistMap(data) {
        for(let i = 0; i < data.items.length; i++) {
            let current_track = data.items[i].track;
            for(let artist of current_track.artists) {
                if(artist_map.has(artist.id)) {
                    let new_tracklist = [];
                    new_tracklist.push(current_track.uri);
                    artist_map.set(artist.name,new_tracklist);
                } else {
                    let exisiting_tracklist = artist_map.get(artist.name);
                    exisiting_tracklist.push(current_track.uri);
                    artist_map.set(artist.name,exisiting_tracklist);
                }
            }
        }
        console.log("total: " + data.total);
        total_songs = data.total;
    }


    async function updatePlaylists(songs){
        const playlists = await User.where('id').equals(callbackRouter.user_id).select("playlists");
        for(playlist of playlists) {      
            let fetchPromise = fetch(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, {
                    method: 'POST',
                    headers: { 'Authorization' : 'Bearer ' + token},
                    body: JSON.stringify({"uris" : value})
                });

                await fetchPromise
                .then(response => {
                    if (!response.ok) {
                        console.log(response);
                        throw new Error(`HTTP error: ${response} ` );
                    }
                    return response.json();
                })
                .then(data => console.log("success"))
                .catch(error => {
                    console.error(`Could not add songs to playlist: ${error}`);
                });
        }
    }*/

});
module.exports = router;