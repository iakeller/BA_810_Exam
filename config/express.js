//load required modules
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var glob = require('glob');


module.exports = function (app, config) {
 
//connect to the db with mongoose
console.log("Loading Mongoose functionality");
mongoose.Promise = require('bluebird');
mongoose.connect(config.db, {useMongoClient: true});
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
  });
  mongoose.set('debug', true);
  mongoose.connection.once('open', function callback() {
  console.log("Mongoose connected to the database");
  });

app.use(function (req, res, next) {
    console.log('Request from ' + req.connection.remoteAddress, 'info');
    next();
  });

//use body parser to parse data for port use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

  //load models
var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

var controllers = glob.sync(config.root + '/app/controllers/*.js');
controllers.forEach(function (controller) {
  require(controller);
});

require('../app/controllers/test')(app, config);

//create error handlers 404 and 500
app.use(function (req, res, next) {
  console.log('Request from ' + req.connection.remoteAddress);
  next();
  });
  app.use(express.static(config.root + '/public'));
  app.use(function (req, res) {
  res.type('text/plan');
  res.status(404);
  res.send('404 Not Found');
  });
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('text/plan');
  res.status(500);
  res.send('500 Sever Error');
  });
console.log("Starting application");
};
