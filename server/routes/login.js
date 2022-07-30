const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

    const redirect_uri = "http://localhost:5000/callback/";
    const scope = 'user-library-read playlist-modify-private playlist-modify-public';

    res.status(301).redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${scope}&redirect_uri=${redirect_uri}`);
    //res.redirect("http://localhost:5000/test");
});

module.exports = router;
