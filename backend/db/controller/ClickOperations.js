var typeorm = require('typeorm');
const SEMESTER_COUNT = 1; // since our application only ever allows 1 clicks repository per semester, we leave a constat value here


async function getClicks() {
    var clicksRepository = typeorm.getConnection().getRepository("total_clicks");
    var clicks = await clicksRepository.findOne({id: SEMESTER_COUNT});
    console.log(clicks);
    return clicks;
}


async function updateClicks(newAmount) {
    console.log(newAmount);
    var newClicks = await typeorm.getConnection()
        .createQueryBuilder()
        .update("total_clicks")
        .set({amount: () => "amount + " + newAmount})
        .where("id = :id", {id: SEMESTER_COUNT})
        .execute();
    newClicks = getClicks();
    return newClicks;   
}
module.exports.getClicks = getClicks;
module.exports.updateClicks = updateClicks;