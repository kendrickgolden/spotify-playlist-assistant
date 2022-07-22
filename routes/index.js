const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'index' });
  //console.log('sent list of items');
  res.json()
});

module.exports = router;
