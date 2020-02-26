var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var async = require('express-async-await');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var counterObj = await fetch('http://localhost:8080/counter/get')
  .then(res => {return res.json()});

  res.header("Access-Control-Allow-Origin", "*");
  res.render('index', { points: counterObj.points, level: counterObj.nextLevel});
});

module.exports = router;
