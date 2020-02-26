var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var async = require('express-async-await');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var messages = await fetch('http://localhost:8080/hello-frontend')
  .then(res => {return res.json()});
  res.send(messages.newMessage);
});

router.get('/:message', async function (req, res, next) {
  var messages = await fetch('http://localhost:8080/' + req.params.message)
    .then(res => { return res.json() });
  res.send(messages.newMessage);
});

module.exports = router;
