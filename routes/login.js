var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const code = 'code';
    const redirect_uri = "http://localhost:3000/callback/"
  
    res.redirect(`https://accounts.spotify.com/authorize?response_type=${code}&client_id=${process.env.CLIENT_ID}&redirect_uri=${redirect_uri}`);
});

module.exports = router;
