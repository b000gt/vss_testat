var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:message', function(req, res, next) {
  var obj = {
    originalMessage: req.params.message,
    newMessage: req.params.message.toUpperCase()
  }
  res.send(obj);
});

router.get('/', function (req, res, next) {
  res.send("Hello Backend");
});

module.exports = router;
