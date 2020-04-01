var typeorm = require('typeorm');
var Clicks = require('../entity/Clicks');
const SEMESTER_COUNT = {id: 1};

/* since our application only ever allows 1 clicks repository per semester, we leave a constat value here*/
async function getClicks() {
    try {
        var clicksRepository = typeorm.getConnection().getRepository("total_clicks");
        var clicks = await clicksRepository.findOne(SEMESTER_COUNT);
        console.log(clicks);
        return clicks;
    } catch(e) {
        console.log("Error: ", e);
        return undefined;
    }    
}


async function updateClicks(newAmount) {
    console.log(newAmount);
    try {
        await typeorm.getConnection()
        .createQueryBuilder()
        .update("total_clicks")
        .set({amount: () => "amount + " + newAmount})
        .where("id = 1")
        .execute();      
    }
    catch(e){
        console.log("Error occured", e);
    }
}
module.exports.getClicks = getClicks;
module.exports.updateClicks = updateClicks;