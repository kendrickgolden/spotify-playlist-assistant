var express = require('express');
var router = express.Router();
var request = require('request');
const callbackRouter = require('./callback');
const fetch = require('node-fetch');

router.get('/',function(req, res, next) {
    const token = callbackRouter.token;
    const limit = 50;
    var offset = 0;
    var total_songs = 1;



    function updateTotal(data) {
        console.log(data);
        total_songs = data.total;
    }

    //returns list of user's liked songs
    async function iterate_liked_songs(){
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

    iterate_liked_songs();
});



module.exports = router;