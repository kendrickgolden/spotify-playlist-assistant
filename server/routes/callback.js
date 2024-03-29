const express = require("express");
const router = express.Router();
const request = require("request");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const User = require("../models/user");
let access_token = "";
let refresh_token = "";
const get_liked_songs = require("../helpers/get_liked_songs");
const get_playlists = require('../helpers/get_playlists')


/* Authorization code taken from Spotify API Authorization Code Flow Guide: https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js*/
router.get("/", async function (req, res) {
  const code = req.query.code || null;
  const redirect_uri = req.query.redirect_uri || null;

  console.log(redirect_uri); 
  let fetchPromise = fetch(
    `https://accounts.spotify.com/api/token/?grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
    {
      method: "POST",
      headers: {
        "Authorization":
          "Basic " +
          new Buffer(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64"),
          "Content-type" : "application/x-www-form-urlencoded"
      },
      json: true,
    }
  );

  await fetchPromise
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => getTokens(data))
    .then(() => console.log("success"))
    .catch((error) => {
      console.error(`Could not get access token 123: ${error}`);
    }); 


    //console.log("test2");
    await get_liked_songs.get_liked_songs();
   // console.log("test3");
    await get_playlists.get_playlists();
    //console.log("test4");

    res.json({artists : get_liked_songs.artist_map_client, playlists: get_playlists.playlist_obj})
   
  });
  
function getTokens(body) {
  access_token = body.access_token,
  refresh_token = body.refresh_token;
  exports.token = access_token;

  var options = {
    url: 'https://api.spotify.com/v1/me',
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };

  //If user is not already in database, add them
  request.get(options, function(error, response, body) {
    exports.user_id = body.id;
    User.findOne({ 'id' : body.id}, function(err, existing_user) {
      if (err) return handleError(err);
      if(existing_user===null){
        User.create({id: body.id, playlists : []});
      } 

    });

  });

}

exports.router = router;
