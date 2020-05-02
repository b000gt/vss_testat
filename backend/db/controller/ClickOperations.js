const typeorm = require('typeorm');
const fs = require('fs');
const SEMESTER_COUNT = 1; // since our application only ever allows 1 clicks repository per semester, we leave a constat value here


async function getClicks() {
    const clicksRepository = typeorm.getConnection().getRepository("total_clicks");
    const clicks = await clicksRepository.findOne({id: SEMESTER_COUNT});
    return clicks;
}


async function updateClicks(newAmount) {
    const newClicks = await typeorm.getConnection()
        .createQueryBuilder()
        .update("total_clicks")
        .set({amount: () => "amount + " + newAmount})
        .where("id = :id", {id: SEMESTER_COUNT})
        .execute();
    const totalClicks = getClicks();
    fs.appendFile('textprotocol.txt', '[' + new Date().toUTCString() + '] Overwrite click counter, \n', (err) => {
        if (err) throw err;
    });
    return totalClicks;   
}
module.exports.getClicks = getClicks;
module.exports.updateClicks = updateClicks;