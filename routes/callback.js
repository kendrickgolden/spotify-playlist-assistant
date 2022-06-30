const express = require('express');
const router = express.Router();
const request = require('request');
const fetch = require('node-fetch');

/* Authorization code taken from Spotify API Authorization Code Flow Guide: https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js*/
router.get('/', function(req, res, next) {
    var code = req.query.code || null;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: "http://localhost:3000/callback/",
        grant_type: 'authorization_code',
        scope: 'user-library-read playlist-modify-private'
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
          console.log('access token:', access_token);
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          request.get(options, function(error, response, body) {
            console.log(body);
          });
  
          res.redirect(`/#?access_token=${access_token}&refresh_token=${refresh_token}`);
        } else {
          res.redirect('/#?error=invalid_token');
        }
      });

      
});



exports.router = router;
