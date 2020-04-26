var express = require('express');
var clickOperations = require('../db/controller/ClickOperations');
var router = express.Router();


router.get('/', async function(req, res, next) {
  try {
    var allClicks = await clickOperations.getClicks();
    res.send(allClicks);
  } catch (e) {
    res.status(403).send({ message: e.message });
    console.log(e);
  }
});

router.put('/', async function(req, res, next) {
  try {
    let amount = null;
    if (req.body.amount) {
      amount = parseInt(req.body.amount);
    }
    if (!amount) {
      throw new Error('No amount given');
    }
    var newClicks = await clickOperations.updateClicks(amount);
    res.send(newClicks);

  } catch(e) {
    res.status(403).send({ message: e.message });
    console.log(e);
  }
});

module.exports = router;