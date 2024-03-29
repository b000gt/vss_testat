const express = require('express');
const router = express.Router();

router.get('/counter/increase/:amount', function(req, res, next) {
  global.pc.increase(req.params.amount);
  res.header("Access-Control-Allow-Origin", "*");
  res.send({ points: pc.getCounter()});
});
router.get('/counter', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send({ points: pc.getCounter()});
});

router.get('/clickables', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send({ clickables: clickableCollection});
});
router.get('/clickables/add/:modifier', function(req, res, next) {
  clickableCollection.push(new Clickable(req.params.modifier));
  res.header("Access-Control-Allow-Origin", "*");
  res.send({ clickables: clickableCollection});
});
router.get('/', function(req, res, next){
  res.send("Hello from :" + req.app.settings.port);
});

module.exports = router;

class PointCounter{
  constructor() {
    this.Points = 0;
  }
  getCounter(){
    return this.Points;
  }
  increase(amount){
    this.Points = parseInt(amount) + this.Points;
  }
}

class Clickable{
  constructor(modifier) {
    this.Modifier = parseInt(modifier);
  }
  getModifier(){
    return this.Modifier;
  }

}
global.pc = new PointCounter();
global.clickableCollection = [new Clickable(1)];