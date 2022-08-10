var express = require('express');
const callbackRouter = require('../routes/callback');
const fetch = require('node-fetch');
const User = require('../models/user');


async function get_playlists() {
    
    const user_id = callbackRouter.user_id;
    return new Promise(async (resolve, reject) =>  {
        User.findOne({id: user_id}, (error,data) => {
            if(error){
                console.log("Could not find playlists:" + error);
                reject();
            } else {
                const playlists_parsed = data.playlists.map((s) => JSON.parse(s));
                const playlists_map = new Map(playlists_parsed.map(obj => [obj.id, {artist_id: obj.artist_id, name: obj.name}]));
                const playlist_obj = Object.fromEntries(playlists_map);
                exports.playlist_obj = playlist_obj;
                console.log(playlists_map);
                //console.dir(typeof data.playlists[0]);
                //console.log(playlists_obj);
                resolve();
            }  
        });
        console.log("C"); 
    });
    
}


exports.get_playlists = get_playlists;
