var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/counter/:action', function(req, res, next) {
  switch(req.params.action){
    case 'increase':
      pc.Points += pc.getNextLevel();
      break;
    case 'decrease':
      pc.Points -= pc.getNextLevel();
      break;
    default:
      break;
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.send({ points: pc.getCounter(), nextLevel: pc.getNextLevel()});
});

module.exports = router;

class PointCounter{
  constructor() {
    this.Points = 0;
  }
  getNextLevel(){
    let tmpPoins = this.Points;
    let levelCounter = 1;
    while (tmpPoins > 10){
      tmpPoins /= 10;
      levelCounter ++;
    }
    return levelCounter;
  }
  getCounter(){
    return this.Points;
  }
}
global.pc = new PointCounter();