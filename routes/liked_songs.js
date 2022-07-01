var express = require('express');
var router = express.Router();
var request = require('request');
const callbackRouter = require('./callback');
const fetch = require('node-fetch');

router.get('/',function(req, res, next) {
    const token = callbackRouter.token;
    const user_id = callbackRouter.user_id;
    const limit = 50;
    var offset = 0;
    var total_songs = 1;
    var artist_list = [];


    function updateTotal(data) {
        //console.log(data);
        for(var i = 0; i < data.items.length; i++) {
            var current_track = data.items[i].track;
            //console.log(current_track);
            for(var artist of current_track.artists) {
                if(!artist_list.includes(artist.name)) {
                    //console.log(artist.name);
                    artist_list.push(artist.name);
                }
            }
        }
        total_songs = data.total;
    }

    async function temp_func(){
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
                .then(data => updateTotal(data))
                .catch(error => {
                    console.error(`Could not get liked_songs: ${error}`);
                });

                //console.log(total_songs);
                offset+=50;
        }
    }

    //returns list of user's liked songs
    async function iterate_liked_songs(){
        //console.log(user_id);
        await temp_func();
        //console.log(artist_list);
        create_playlists();

    }

    /*  creates playlist for each artist of user's liked songs
        TODO: create option to choose minimum number of songs (set default to (5)?)
    */
    async function create_playlists(){
        artist_list.sort((a,b) => a.localeCompare(b));
        //console.log(artist_list);
        for(var artist of artist_list) {
            console.log(artist);
            var fetchPromise = fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                method: 'POST',
                headers: { 'Authorization' : 'Bearer ' + token},
                body: JSON.stringify({"name" : artist})
                
            });

             await fetchPromise
                .then(response => {
                    if (!response.ok) {
                        console.log(response);
                        throw new Error(`HTTP error: ${response} ` );
                    }
                    return response.json();
                })
                .then(data => console.log(data))
                .catch(error => {
                    console.error(`Could not create artist playlists: ${error}`);
                });
                //console.log("success");
        }
    }


    iterate_liked_songs();

});



module.exports = router;