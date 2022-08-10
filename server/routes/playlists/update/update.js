let express = require('express');
let router = express.Router();
const callbackRouter = require('./callback');
const fetch = require('node-fetch');
const User = require('../models/user');
const createFromArtistRouter = require('.../helpers/get_liked_songs');
const { artist_map } = require('../../../helpers/get_liked_songs');

router.get('/', async function(req, res) {
    
    const req_playlists = req.query.playlists;
    let temp_map = new Map();
    const artist_map = createFromArtistRouter.artist_map;

    await getPlaylists(req_playlists);
    await addNewSongs(); 
    await updatePlaylists();
   
});

function getPlaylists(req_playlists) {
    return new Promise (resolve => User.findOne({id: user_id}, async (error,data) => {
        if(error){
            console.log("Could not find playlists:" + error);
        } else {
            for(let playlist of data.playlists) {
                if(req_playlists.contains(playlist)) {
                let playlist_obj = JSON.parse(playlist);
                let map_value = {playlist_id: playlist_obj.id, tracklist: [], new_tracks: []};
                temp_map.set(playlist_obj.artist_id,map_value);

                await getPlaylistSongs(map_value);
                }
            }
        } 
        resolve();
    }));
}

 async function getPlaylistSongs(map_value) {
    let playlist_id = map_value.playlist_id;
    let tracklist = map_value.tracklist;
    let offset = 0;
    let total_songs = 1;
    while(offset < total_songs) {
        let fetchPromise = fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=total,items(track.id)&limit=50&offset=${offset}`, {
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
            .then(data => createSongArray(data, tracklist))
            .then(data => total_songs = data)
            .then(offset+=50)
            .catch(error => {
                console.error(`Could not get playlist songs: ${error}`);
            });
    }
}


function createSongArray(data, tracklist){
    let song_array = data.items.map(x => x.track.id);
    for(song of song_array) {
        tracklist.push(song);
    }
    return data.total;
}

    function addNewSongs() {
        for([id, value] of artist_map) {
            if(temp_map.get(id)){
                let tracklist = value.tracklist;
                for(track of tracklist) {
                    if(!temp_map.get(id).tracklist.includes(track)) {
                        temp_map.get(id).new_tracks.push(track);
                    } 
                }
            }
        }
    }

    async function updatePlaylists(){
        return new Promise(async resolve =>  {
            for(value of temp_map.values()){
                if(!value.new_tracks.length==0) {
                    let playlist_id = value.playlist_id;
                    let track_uris = value.new_tracks.map(x => "spotify:track:" + x);
                    let track_uris_segment = [];
                    while(track_uris.length != 0){
                        if(track_uris.length < 100) {
                            track_uris_segment = track_uris.splice(0,track_uris.length);
                        } else {
                            track_uris_segment = track_uris.splice(0,100);
                        }
                        let fetchPromise = fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?position=0`, {
                            method: 'POST',
                            headers: { 'Authorization' : 'Bearer ' + token},
                            body: JSON.stringify({"uris" : track_uris_segment})
                        });
    
                        await fetchPromise
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error: ${response} ` );
                            }
                            return response.json();
                        })
                        .catch(error => {
                            console.error(`Could not add songs to playlist: ${error}`);
                        });
                    }
                }
            }
            resolve();
        });
    }
 

module.exports = router;