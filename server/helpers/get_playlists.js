var express = require('express');
const callbackRouter = require('../routes/callback');
const fetch = require('node-fetch');
const User = require('../models/user');


async function get_playlists() {
    
    const user_id = callbackRouter.user_id;
    return new Promise(async (resolve, reject) =>  {
        User.findOne({id: user_id}).populate("playlists").exec((error,data) => {
            if(error){
                console.log("Could not find playlists:" + error);
                reject();
            } else {
                let playlist_map = new Map();
                for(const [key,value] of Object.entries(data.playlists)) {
                    playlist_map.set(value.id, {name: value.name, img: value.image, artist_ids: value.artist_ids});
                }

                const playlist_map_obj = Object.fromEntries(playlist_map);
                exports.playlist_obj = playlist_map_obj;
                resolve();
            }  
        });

        
    });
    
}


exports.get_playlists = get_playlists;
