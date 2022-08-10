var express = require('express');
const callbackRouter = require('../routes/callback');
const fetch = require('node-fetch');
const User = require('../models/user');


async function get_playlists() {
    console.log("C");
    const user_id = callbackRouter.user_id;
    return new Promise(async resolve =>  {
       User.findOne({id: user_id}, async (error,data) => {
            if(error){
                console.log("Could not find playlists:" + error);
            } else {
                exports.playlist_obj = data.playlists;
            }  
        });
        resolve();
    });
    
}


exports.get_playlists = get_playlists;
