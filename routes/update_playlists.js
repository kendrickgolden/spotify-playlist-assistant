var express = require('express');
var router = express.Router();
const callbackRouter = require('./callback');
const fetch = require('node-fetch');
const User = require('../models/user');
const { map, reject } = require('async');

router.get('/',function(req, res, next) {
    //TODO: Scan liked songs for artist in saved playlists and update
    const token = callbackRouter.token;
    const user_id = callbackRouter.user_id;
    //const limit = 50;
   // var offset = 0;
   // var total_songs = 1;
    var artist_map = new Map();

    updateSongs();

    async function updateSongs(){
        await getPlaylists();
        //console.log(artist_map);
        //await updatePlaylists();
    }

    async function getPlaylists() {
       // return new Promise((res, rej) => {
            console.log("D");
            return new Promise (resolve => User.findOne({id: user_id}, async (error,data) => {
                if(error){
                    console.log("Could not find playlists:" + error);
                } else {
                    for(var playlist of data.playlists) {
                        var playlist_obj = JSON.parse(playlist);
                        var map_value = {playlist_id: playlist_obj.id, tracklist: []};
                        await getPlaylistSongs(map_value);
                        artist_map.set(playlist_obj.artist_id,map_value);
                    //  console.log(artist_map);
                    console.log("A");
                    }
                } 
                resolve();
        }));
        }


    async function getPlaylistSongs(map_value) {
        var playlist_id = map_value.playlist_id;
        var tracklist = map_value.tracklist;
        var offset = 0;
        var total_songs = 1;
        while(offset < total_songs) {
           // console.log("A");
            var fetchPromise = fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=total,items(track.id)&limit=50&offset=${offset}`, {
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
                .catch(error => {
                    console.error(`Could not get playlist songs: ${error}`);
                });
                offset+=50;
        }
    }

    
    async function createSongArray(data, tracklist){
        var song_array = data.items.map(x => x.track.id);
        tracklist.push(song_array);
        total_songs = data.total;
    }
  
    async function updatePlaylists() {
        while(offset < total_songs) {
            var fetchPromise = fetch(`https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`, {
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
                .catch(error => {
                    console.error(`Could not get liked_songs: ${error}`);
                });
                offset+=50;
        }
    }

    //TODO: add new songs
    async function addNewsongs() {
        for(var i = 0; i < data.items.length; i++) {
            var current_track = data.items[i].track;
            for(var artist of current_track.artists) {
                if(artist_map.has(artist.id)) {
                    

                    var current_tracklist = artist_map.get(artist.id)
                    var new_tracklist = [];
                    new_tracklist.push(current_track.uri);
                    artist_map.set(artist.name,new_tracklist);
                } 
            }
        }
        console.log("total: " + data.total);
        total_songs = data.total;
    }
  
     /*        const playlists = await User.where('id').equals(user_id).select("playlists").then(query => {
            console.log(JSON.stringify(query.playlists));
        });
      //  for(var playlist of playlists.playlist) {
        //    console.log("playlist: " + playlist);
         //   var playlist_obj = JSON.parse(playlist);
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
            
               for(var playlist of playlists.playlist) {
                    console.log("playlist: " + playlist);
                    var playlist_obj = JSON.parse(playlist);
                    console.log("OBJ: " + playlist_obj);
                    artist_map.set(playlist_obj.artist_id,playlist_obj.id);
                }
        });
    }*/

     //gets all of a user's liked tracks
  /*   async function getLikedTracks(){
        while(offset < total_songs) {
            var fetchPromise = fetch(`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`, {
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
        for(var i = 0; i < data.items.length; i++) {
            var current_track = data.items[i].track;
            for(var artist of current_track.artists) {
                if(artist_map.has(artist.id)) {
                    var new_tracklist = [];
                    new_tracklist.push(current_track.uri);
                    artist_map.set(artist.name,new_tracklist);
                } else {
                    var exisiting_tracklist = artist_map.get(artist.name);
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
            var fetchPromise = fetch(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, {
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