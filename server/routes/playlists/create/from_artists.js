const express = require('express');
const router = express.Router();
const callbackRouter = require('../../callback');
const fetch = require('node-fetch');
const get_liked_songs = require('../../../helpers/get_liked_songs');
const User = require('../../../models/user');
const Playlist = require("../../../models/playlist");

//  creates playlist for each artist of user's liked songs
router.get('/',async function(req, res) {

    const full_artist_map = get_liked_songs.artist_map;
    const artists = req.query.artists || null;
    const artist_map = new Map(Array.from(full_artist_map).filter(([key, value]) => (artists.includes(key))));
    const token = callbackRouter.token;
    const user_id = callbackRouter.user_id;

    console.log(artist_map);

    res.json("test");

    //for each submitted artist create playlist
    for(let [artist_id, value] of artist_map.entries()) {
        let tracklist = value.tracklist;
        console.log(tracklist);
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

//Updates mongoDB user playlists
async function updateDatabase(playlist, artist_id) {
    const user = await User.findOne({id : callbackRouter.user_id}); 

    //TODO: When creating multi-artist playlits make artist_id an array
    const MongoPlaylist =  await Playlist.create({id: playlist.id, name: playlist.name, artist_ids: [artist_id]});
 //  console.log(typeof MongoPlaylist);
   //console.dir(MongoPlaylist); 
   //console.log(MongoPlaylist._doc.id)


    user.playlists.push(MongoPlaylist);
    await user.save();

}

});

module.exports = router;