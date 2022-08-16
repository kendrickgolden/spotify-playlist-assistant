let express = require('express');
let router = express.Router();
const callbackRouter = require('../../callback');
const fetch = require('node-fetch');
const User = require('../../../models/user');
//const createFromArtistRouter = require('.../helpers/get_liked_songs');
const get_liked_songs = require('../../../helpers/get_liked_songs');
let temp_map = new Map();


router.get('/', async function(req, res) {
    const artist_map = get_liked_songs.artist_map;
    const req_playlists = req.query.playlists || null;
    const user_id = callbackRouter.user_id;
    const token = callbackRouter.token;

    await getPlaylists(req_playlists);
    addNewSongs(artist_map); 
    await updatePlaylists();
    res.json("test");

    function getPlaylists(req_playlists) {
        return new Promise ((resolve,reject) => User.findOne({id: user_id}).populate('playlists').exec(async (error,data) => {
            if(error){
                console.log("Could not find playlists:" + error);
                reject();
            } else {
                for(let playlist of data.playlists) {                    
                    if(req_playlists.includes(playlist.id)) {   
                        let map_value = {playlist_id: playlist.id, tracklist: [], new_tracks: []};
                        //TODO: Make artist ID take full array
                        temp_map.set(playlist.artist_ids[0],map_value);
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
    
    function addNewSongs(artist_map) {
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
                        console.log(track_uris_segment);
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
});



 




   
 

module.exports = router;