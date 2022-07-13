var express = require('express');
var router = express.Router();
const callbackRouter = require('./callback');
const fetch = require('node-fetch');
const User = require('../models/user');

router.get('/',function(req, res, next) {
    const token = callbackRouter.token;
    const user_id = callbackRouter.user_id;
    const minValue = 50;
    var artist_map = new Map();

    likedSongsMain();

    //creates artist playlists populated with all liked tracks where artists is listed as a creator
    async function likedSongsMain(){
        await getLikedTracks();
        await create_playlists();
    }

    //gets all of a user's liked tracks
    async function getLikedTracks(){
        return new Promise(async resolve =>  {
            let offset = 0;
            let total_songs = 1;

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
                    .then(data => createArtistMap(data))
                    .then(data => total_songs = data)
                    .then(offset+=50)
                    .catch(error => {
                        console.error(`Could not get liked_songs: ${error}`);
                    });
            }
            resolve();
        });
    }


    //Creates map of form artist: ["track1_uri,track2_uri,..."]
    function createArtistMap(songs) {
        for(var i = 0; i < songs.items.length; i++) {
            var current_track = songs.items[i].track;
            for(var artist of current_track.artists) {
                if(!artist_map.has(artist.id)) {
                    var map_value = {
                        artist_name: artist.name,
                        tracklist: []
                    };
                    map_value.tracklist.push(current_track.uri);
                    artist_map.set(artist.id,map_value);
                } else {
                    var map_value = artist_map.get(artist.id);
                    map_value.tracklist.push(current_track.uri);
                    //artist_map.set(artist.name,exisiting_tracklist);
                }
            }
        }
        return songs.total;
    }
        
   //  creates playlist for each artist of user's liked songs
    async function create_playlists(){
        for(var [artist_id, value] of artist_map.entries()) {
            var tracklist = value.tracklist;
            if(tracklist.length >= minValue) {        
                var fetchPromise = fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                    method: 'POST',
                    headers: { 'Authorization' : 'Bearer ' + token},
                    body: JSON.stringify({"name" : "Artist Playlist: " + value.artist_name})
                    
                });

                await fetchPromise
                    .then(response => {
                        if (!response.ok) {
                            console.log(response);
                            throw new Error(`HTTP error: ${response} ` );
                        }
                        return response.json();
                    })
                    .then(data => addSongs(data, artist_id, tracklist))
                    .catch(error => {
                        console.error(`Could not create artist playlists: ${error}`);
                    });
            }
        }
    }

    //populate artist playlist with songs
    async function addSongs(playlist, artist_id, tracklist){
        let tracklist_segment = [];
        while(tracklist.length != 0){
            if(tracklist.length < 100) {
                tracklist_segment = tracklist.splice(0,tracklist.length);
            } else {
                tracklist_segment = tracklist.splice(0,100);
            }
            var fetchPromise = fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks?`, {
                        method: 'POST',
                        headers: { 'Authorization' : 'Bearer ' + token},
                        body: JSON.stringify({"uris" : tracklist_segment})
                    });

            await fetchPromise
                .then(response => {
                    if (!response.ok) {
                        console.log(response);
                        throw new Error(`HTTP error: ${response} ` );
                    }
                    return response.json();
                })
                .then(data => updateDatabase(playlist, artist_id))
                .catch(error => {
                    console.error(`Could not add songs to playlist: ${error}`);
                });
        }
    }

    //populate artist playlist with songs
 /*   async function addSongs(playlist, artist_id, tracklist) {
        return new Promise(async resolve =>  {
            var fetchPromise = fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
                        method: 'POST',
                        headers: { 'Authorization' : 'Bearer ' + token},
                        body: JSON.stringify({"uris" : tracklist})
                    });

            await fetchPromise
                .then(response => {
                    if (!response.ok) {
                        console.log(response);
                        throw new Error(`HTTP error: ${response} ` );
                    }
                    return response.json();
                })
                .then(data => updateDatabase(playlist, artist_id))
                .catch(error => {
                    console.error(`Could not add songs to playlist: ${error}`);
                });
            resolve();
        });
    }*/

    async function updateDatabase(playlist, artist_id) {
        const user = await User.findOne({id : callbackRouter.user_id});
        var playlist ={
            id: playlist.id,
            artist_id: artist_id
        };
        user.playlists.push(JSON.stringify(playlist));
        await user.save();
    }
    
});

module.exports = router;