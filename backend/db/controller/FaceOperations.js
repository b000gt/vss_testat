const typeorm = require('typeorm');
const fs = require('fs');
const clickOperations = require('./ClickOperations');

async function getFaces() {
    const faceRepository = typeorm.getConnection().getRepository("face");
    const faces = await faceRepository.find();
    console.log(faces);
    if(faces.length <= 0) {
        throw new Error('No faces found');
    }
    return faces;
}

/*
* faceName = String, faceAmount = int
*/
async function postFaces(faceName, faceAmount, price) {
    
    const faceRepository = typeorm.getConnection().getRepository("face");
    const totalClicks = clickOperations.getClicks();
    if (totalClicks < price) {
        throw new Error('Not enough clicks to buy face');
    }
    const newFace = faceRepository.create();
    newFace.name = faceName;
    newFace.amount = faceAmount;
    const result = await faceRepository.save(newFace);
    fs.appendFile('textprotocol.txt', '[' + new Date().toUTCString() + '] Add new face ' + faceName + ' with value ' + faceAmount + ', \n', (err) => {
        if (err) throw err;
    });
    await clickOperations.updateClicks(-price);
    fs.appendFile('textprotocol.txt', '[' + new Date().toUTCString() + '] Subtracted from total clicks, \n', (err) => {
        if (err) throw err;
    });
    return result;

}

module.exports.getFaces = getFaces;
module.exports.postFaces = postFaces;