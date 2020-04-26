const express = require('express');
const clickOperations = require('../db/controller/ClickOperations');
const router = express.Router();


router.get('/', async function(req, res, next) {
  try {
    const allClicks = await clickOperations.getClicks();
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
    const newClicks = await clickOperations.updateClicks(amount);
    res.send(newClicks);

  } catch(e) {
    res.status(403).send({ message: e.message });
    console.log(e);
  }
});

module.exports = router;