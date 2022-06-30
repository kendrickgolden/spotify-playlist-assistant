var express = require('express');
var router = express.Router();
var request = require('request');
const callbackRouter = require('./callback');
const fetch = require('node-fetch');

router.get('/',function(req, res, next) {
    const token = callbackRouter.token;
    const limit = 50;
    var offset = 0;

    const fetchPromise = fetch(`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    console.log('access token ls:', token);
    fetchPromise
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => {
            console.error(`Could not get liked_songs: ${error}`);
    });
});

module.exports = router;