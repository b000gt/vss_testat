var typeorm = require('typeorm');
var face = require('../entity/Face');

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


module.exports.getFaces = getFaces;