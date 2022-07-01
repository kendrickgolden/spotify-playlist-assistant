var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    const redirect_uri = "http://localhost:3000/callback/"
    const scope = 'user-library-read playlist-modify-private playlist-modify-public';

    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${scope}&redirect_uri=${redirect_uri}`);

});

module.exports = router;
