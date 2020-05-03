var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const _ = require('lodash');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var typeorm = require('typeorm');
var EntitySchema = typeorm.EntitySchema;

var indexRouter = require('./routes/index');
var faceRouter = require('./routes/faces');
var clickRouter = require('./routes/clicks');


typeorm.createConnection({
  type: "postgres",
  host: "postgres",   //localhost
  port: 5432,
  username: "vss_user",
  password: "123456789",
  database: "happyface",
  synchronize: true,
  entities: [
    new EntitySchema(require("./db/entity/Face")),
    new EntitySchema(require("./db/entity/Clicks"))
  ]
}).then(console.log('Done Loading things')).catch(function(error) {
  console.log("Database Connection Error: ", error);
});


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/faces', faceRouter);
app.use('/clicks', clickRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send('error');
});

module.exports = app;
