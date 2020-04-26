var express = require('express');
var faceOperations = require('../db/controller/FaceOperations');

var router = express.Router();


/* Idea: only the amount will be saved on the face repository, there will be a matching with name and the specified amount,
*  hence why name and amount are unique. Then in frontend we match db amount with image given.
*/

/* face routes */

router.get('/', async function(req, res, next) {
  try {
    var allFaces = await faceOperations.getFaces();
    res.send(allFaces);
  } catch(e) {
    res.status(403).send({ message: e.message });
    console.log(e);
}
  
  
});

router.post('/', async function(req, res, next) {
  try { 
    let name = null;
    let amount = null;
    if (req.body.name) {
      name = req.body.name.toString();
    }
    if (req.body.amount) {
      amount = parseInt(req.body.amount);
    }
    if (!name || !amount) {
      throw new Error('No Face or Amount given');
    }
    var newFace = await faceOperations.postFaces(name, amount);
    console.log(newFace);
    console.log(JSON.stringify(newFace));
    res.send(newFace);

  } catch (e) {
    res.status(403).send({ message: e.message });
  }
});



module.exports = router;