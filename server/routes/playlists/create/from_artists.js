const express = require('express');
const router = express.Router();
const callbackRouter = require('../../callback');
const fetch = require('node-fetch');
const get_liked_songs = require('../../../helpers/get_liked_songs');
const User = require('../../../models/user');
const Playlist = require("../../../models/playlist");
const { response } = require('express');

//  creates playlist for each artist of user's liked songs
router.get('/',async function(req, res) {

    const full_artist_map = get_liked_songs.artist_map;
    const artists = req.query.artists || null;
    const artist_map = new Map(Array.from(full_artist_map).filter(([key, value]) => (artists.includes(key))));
    const token = callbackRouter.token;
    const user_id = callbackRouter.user_id;
    
    //for each submitted artist create playlist
    for(let [artist_id, value] of artist_map.entries()) {
        let tracklist = value.tracklist.map(x => "spotify:track:" + x);
        var fetchPromise = fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
            method: 'POST',
            headers: { 'Authorization' : 'Bearer ' + token},
            body: JSON.stringify({"name" : "Artist Playlist: " + value.artist_name})
            
        });

        let playlist;


        await fetchPromise
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    throw new Error(`HTTP error: ${response} ` );
                }
                return response.json();
            })
            .then(data => playlist = data)
            .catch(error => {
                console.error(`Could not create artist playlists: ${error}`);
            });

            
            
            await addSongs(playlist, tracklist);
            await getImage(playlist)
            .then(data => updateDatabase(playlist, artist_id, data))
            .catch(error => {
                console.error(`Could not populate and save playlist: ${error}`);
        });

    }

    res.json("test");


    //populate artist playlist with songs
    async function addSongs(playlist, tracklist){
        return new Promise(async (resolve, reject) => {
            let tracklist_segment = [];
            while(tracklist.length != 0){
                if(tracklist.length < 100) {
                    tracklist_segment = tracklist.splice(0,tracklist.length);
                } else {
                    tracklist_segment = tracklist.splice(0,100);
                }
                let fetchPromise = fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks?`, {
                            method: 'POST',
                            headers: { 'Authorization' : 'Bearer ' + token},
                            body: JSON.stringify({"uris" : tracklist_segment})
                        });
                await fetchPromise
                    .then(response => {
                        if (!response.ok) {
                            console.log(response);
                            reject();
                            throw new Error(`HTTP error: ${response} ` );
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error(`Could not add songs to playlist: ${error}`);
                    });
            }
            resolve();
        });
    }

    //Updates mongoDB user playlists
    async function updateDatabase(playlist, artist_id, playlist_img) {
        const user = await User.findOne({id : callbackRouter.user_id}); 

        //TODO: When creating multi-artist playlits make artist_id an array
        const MongoPlaylist =  await Playlist.create({id: playlist.id, name: playlist.name, image: playlist_img[0].url, artist_ids: [artist_id]});

        user.playlists.push(MongoPlaylist);
        await user.save();

    }

    async function getImage(playlist) {
        return new Promise (async (resolve, reject) => {
            let fetchPromise = fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/images`, {
                            method: 'GET',
                            headers: { 'Authorization' : 'Bearer ' + token}              
                        });

            await fetchPromise
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    reject();
                    throw new Error(`HTTP error: ${response} ` );
                }
                console.log("B");
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => {
                console.error(`Could not get playlist image: ${error}`);
            });          
        });
    }

});


module.exports = router;