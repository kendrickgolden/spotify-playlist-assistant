var express = require('express');
const callbackRouter = require('../routes/callback');
const fetch = require('node-fetch');
let artist_map_server = new Map();
let artist_map_client = new Map();

async function get_liked_songs() {

    const token = callbackRouter.token;
   
    //gets all of a user's liked tracks
    return new Promise(async (resolve,reject) =>  {
        let offset = 0;
        let total_songs = 1;

        while(offset < total_songs) {
          //  console.log("A");
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
                .then(data => total_songs = createArtistMap(data))
                .catch(error => {
                    console.error(`Could not get liked songs: ${error}`);
                    reject();
                });
                offset+=50;
        }
        console.log("B");
        const artist_map_client_obj = Object.fromEntries(artist_map_client);
        exports.artist_map = artist_map_server;
        exports.artist_map_client = artist_map_client_obj;
        resolve();
    });
};

 //Creates map of form:  {artist: ["track1_uri,track2_uri,..."]}
 function createArtistMap(songs) {
    for(var i = 0; i < songs.items.length; i++) {
        var current_track = songs.items[i].track;
        for(var artist of current_track.artists) {
            if(!artist_map_server.has(artist.id)) {
                let map_value_server = {
                    artist_name: artist.name,
                    tracklist: []
                };

                let map_value_client = {
                    name: artist.name,
                    img: ""
                };


                map_value_server.tracklist.push(current_track.uri);
                artist_map_server.set(artist.id, map_value_server);
                artist_map_client.set(artist.id, map_value_client)
            } else {
                let map_value_server = artist_map_server.get(artist.id);
                map_value_server.tracklist.push(current_track.uri);
            } 
        }
    }
    
    return songs.total;
}

exports.get_liked_songs = get_liked_songs;


