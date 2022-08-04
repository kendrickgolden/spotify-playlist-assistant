var express = require('express');
var router = express.Router();
//const callbackRouter = require('./callback');
const fetch = require('node-fetch');
//const User = require('../models/user');

//  creates playlist for each artist of user's liked songs
router.get('/',function(req, res, next) {

    var ar = req.query.artists || null;
    //JSON.parse(artists);
   // const f = ar.charAt

    console.log(ar);

    res.send();
   // let fitered_artist_map = artist_map.filter();
    //FIX
   // const artist_map = req.body;

    //const token = callbackRouter.token;
    /*for(let [artist_id, value] of artist_map.entries()) {
        let tracklist = value.tracklist;
        //if(tracklist.length >= paramMinValue) {    
        if((paramMinValBool && tracklist.length >= paramMinVal) || (paramArtistsBool)) {    
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

//TODO: Prevent adding to database twice for playlists with >100 songs
async function updateDatabase(playlist, artist_id) {
    const user = await User.findOne({id : callbackRouter.user_id}); 
    var playlist ={
        id: playlist.id,
        artist_id: artist_id
    };
    playlist_string = JSON.stringify(playlist);
    if(!user.playlists.includes(playlist_string)) {
        user.playlists.push(JSON.stringify(playlist));
        await user.save();
    }
}*/

});

module.exports = router;