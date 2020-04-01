var typeorm = require('typeorm');

async function getFaces() {
    try {
        var faceRepository = typeorm.getConnection().getRepository("face");
        var faces = await faceRepository.find();
        console.log(faces);
        return faces;
    } catch(e) {
        console.log("Error: ", e);
        return undefined;
    }    
}

/*
* wants obj {key: value} to save into db, make sure it has the same attributes as a Face entity
*/
async function postFaces(obj) {
    
    const faceRepository = typeorm.getConnection().getRepository("face");

    const newFace = faceRepository.create();
    newFace.name = obj.name;
    newFace.amount = obj.amount;
    faceRepository.save(newFace).then(function(savedPost) {
        return 200;
    }).catch(function(error) {
        console.log("Error: ", error);
        return error;
    });
}

module.exports.getFaces = getFaces;
module.exports.postFaces = postFaces;