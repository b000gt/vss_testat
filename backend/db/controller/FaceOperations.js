var typeorm = require('typeorm');

async function getFaces() {
    var faceRepository = typeorm.getConnection().getRepository("face");
    var faces = await faceRepository.find();
    console.log(faces);
    if(faces.length <= 0) {
        throw new Error('No faces found');
    }
    return faces;
}

async function getSingleFaceByName(faceName) {
    
} 

/*
* faceName = String, faceAmount = int
*/
async function postFaces(faceName, faceAmount) {
    
    const faceRepository = typeorm.getConnection().getRepository("face");

    const newFace = faceRepository.create();
    newFace.name = faceName;
    newFace.amount = faceAmount;
    return await faceRepository.save(newFace);
}

module.exports.getFaces = getFaces;
module.exports.postFaces = postFaces;