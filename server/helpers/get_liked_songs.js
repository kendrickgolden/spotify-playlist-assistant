var express = require('express');
const callbackRouter = require('../routes/callback');
const fetch = require('node-fetch');
let artist_map_server = new Map();
let artist_map_client = new Map();

async function get_liked_songs(req, res, next) {

    const token = callbackRouter.token;
    const user_id = callbackRouter.user_id;
    //gets all of a user's liked tracks
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
                    console.error(`Could not get liked songs: ${error}`);
                });
        }
        resolve();
        const artist_map_client_obj = Object.fromEntries(artist_map_client);
        //console.log(artist_map_client);
        res.json(artist_map_client_obj);
        exports.artist_map = artist_map_server;
        
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

                //let map_value_client = artist.name;

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

/*async function getArtistImages() {
    const token = callbackRouter.token;
    console.log("B");
    for([key, value] of artist_map_client) {
        var fetchPromise = fetch(`https://api.spotify.com/v1/artists?id=${key}`, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + token}
            });
    }

    await fetchPromise
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => addImage(artist_map_client,key,data))
                .catch(error => {
                    console.error(`Could not get artist image: ${error}`);
                });
}

function addImage(artist_map_client,key,data) {
    console.log("C"")
    artist_map_client.get(key).artist_img = data.images.url;
}*/
/*function getArtistImages(artist_map_client){
    return new Promise(async resolve =>  {
       
        artist_map_client.forEach((value, key) =>
        
        )
        while(offset < total_songs) {
            var fetchPromise = fetch(`https://api.spotify.com/v1/artists?limit=50&offset=${offset}`, {
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
                    console.error(`Could not get liked songs: ${error}`);
                });
        }
        resolve();
        const artist_map_client_obj = Object.fromEntries(artist_map_client);
       // console.log(artist_map_client);
        res.json(artist_map_client_obj);
        exports.artist_map = artist_map_server;
        
    });


//}*/
exports.get_liked_songs = get_liked_songs;


