const express = require('express');
const router = express.Router();
const request = require('request');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const User = require('../models/user');

/* Authorization code taken from Spotify API Authorization Code Flow Guide: https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js*/
router.get('/', function(req, res, next) {
    var code = req.query.code || null;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: "http://localhost:3000/callback/",
        grant_type: 'authorization_code',
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
              
          exports.token = access_token;
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          request.get(options, function(error, response, body) {
            //console.log(body);
            exports.user_id = body.id;
            User.findOne({ 'id' : body.id}, function(err, existing_user) {
              if (err) return handleError(err);
              if(existing_user===null){
                User.create({id: body.id, playlists : []});
              } else {
               // console.log("test");
              }

            });

          });
  
          res.redirect(`/#?access_token=${access_token}&refresh_token=${refresh_token}`);
        } else {
          res.redirect('/#?error=invalid_token');
        }
      });

      
});




function userCreate(id, playlists, cb) {
  userdetail = {first_name:first_name , family_name: family_name }
  
  var user = new User(userdetail);
       
  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New User: ' + user);
    users.push(user)
    cb(null, user)
  }  );
}

exports.router = router;
