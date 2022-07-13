let express = require('express');
let router = express.Router();
const callbackRouter = require('./callback');
const fetch = require('node-fetch');
const User = require('../models/user');
const { map, reject } = require('async');

router.get('/',function(req, res, next) {
    const token = callbackRouter.token;
    const user_id = callbackRouter.user_id;
    let artist_map = new Map();

    updateSongs();

    async function updateSongs(){
        await getPlaylists();
        await updateMap(); 
        await updatePlaylists();
        console.log("done");
    }

    function getPlaylists() {
            return new Promise (resolve => User.findOne({id: user_id}, async (error,data) => {
                if(error){
                    console.log("Could not find playlists:" + error);
                } else {
                    for(let playlist of data.playlists) {
                        let playlist_obj = JSON.parse(playlist);
                        let map_value = {playlist_id: playlist_obj.id, tracklist: [], new_tracks: []};
                        artist_map.set(playlist_obj.artist_id,map_value);

                        await getPlaylistSongs(map_value);
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
        }
    }

    
    function createSongArray(data, tracklist){
        let song_array = data.items.map(x => x.track.id);
        for(song of song_array) {
            tracklist.push(song);
        }
        return data.total;
    }
  
     function updateMap() {
       return new Promise(async resolve =>  {
        let offset = 0;
        let total_songs = 1;

        while(offset < total_songs) {
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
                .catch(error => {
                    console.error(`Could not get liked_songs: ${error}`);
                });
 
            }
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
        return data.total;
    }

    async function updatePlaylists(){
        return new Promise(async resolve =>  {
            for(value of artist_map.values()){
                if(!value.new_tracks.length==0) {
                    console.log("a");
                    let playlist_id = value.playlist_id;
                    let track_uris = value.new_tracks.map(x => "spotify:track:" + x);
                    console.log(track_uris);
                    console.log(typeof track_uris);

                    let fetchPromise = fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
                        method: 'POST',
                        headers: { 'Authorization' : 'Bearer ' + token},
                        body: JSON.stringify({"uris" : track_uris})
                    });

                    await fetchPromise
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error: ${response} ` );
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error(`Could not add songs to playlist: ${error}`);
                    });
                }
            }
            resolve();
        });
    }
});

module.exports = router;