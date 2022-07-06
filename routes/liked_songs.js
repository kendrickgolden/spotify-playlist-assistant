var express = require('express');
var router = express.Router();
const callbackRouter = require('./callback');
const fetch = require('node-fetch');
const minValue = 25;
const User = require('../models/user');

router.get('/',function(req, res, next) {
    const token = callbackRouter.token;
    const user_id = callbackRouter.user_id;
    const limit = 50;
    var offset = 0;
    var total_songs = 1;
    var artist_map = new Map();

    likedSongsMain();

    //creates artist playlists populated with all liked tracks where artists is listed as a creator
    async function likedSongsMain(){
        await getLikedTracks();
        await create_playlists();
    }

    //gets all of a user's liked tracks
    async function getLikedTracks(){
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
                if(!artist_map.has(artist.name)) {
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
        total_songs = data.total;
    }
        
   //  creates playlist for each artist of user's liked songs
    async function create_playlists(){
        for(var [key, value] of artist_map.entries()) {
            if(value.length >= minValue) {        
                var fetchPromise = fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                    method: 'POST',
                    headers: { 'Authorization' : 'Bearer ' + token},
                    body: JSON.stringify({"name" : "Artist Playlist: " + key})
                    
                });

                await fetchPromise
                    .then(response => {
                        if (!response.ok) {
                            console.log(response);
                            throw new Error(`HTTP error: ${response} ` );
                        }
                        return response.json();
                    })
                    .then(data => addSongs(data, value))
                    .catch(error => {
                        console.error(`Could not create artist playlists: ${error}`);
                    });
            }
        }
    }

    //populate artist playlist with songs
    async function addSongs(data, value) {
        var playlist_id = data.id;
        const user = await User.findOne({id : callbackRouter.user_id});
        user.playlists.push(data.id);
        user.save();

        var fetchPromise = fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
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
    
});

module.exports = router;