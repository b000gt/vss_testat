const express = require('express');
const faceOperations = require('../db/controller/FaceOperations');

const router = express.Router();


/* Idea: only the amount will be saved on the face repository, there will be a matching with name and the specified amount,
*  hence why name and amount are unique. Then in frontend we match db amount with image given.
*/

/* face routes */

router.get('/', async function(req, res, next) {
  try {
    const allFaces = await faceOperations.getFaces();
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
    let price = null;
    let file = null;
    console.log(req.body);
    console.log(req.files);

    if (req.body.name) {
      name = req.body.name.toString();
    }
    if (req.body.amount) {
      amount = parseInt(req.body.amount);
    }
    if (req.body.price) {
      price = parseInt(req.body.price);
    }
    if (req.files.file){
      file = req.files.file;
    }
    if (!name || !amount || !price || !req.files) {
      throw new Error('No Face, Price or Amount given');
    }
    if (!file.mimetype.toString().includes('image')) {
      throw new Error('Wrong File Type');
    }
    if (price < 0) {
      throw new Error('Negative numbers are not allowed');
    }
    const newFace = await faceOperations.postFaces(name, amount, price);
    file.mv('./frontend/images/' + name);
    res.send(newFace);

  } catch (e) {
    res.status(403).send({ message: e.message });
  }
});



module.exports = router;