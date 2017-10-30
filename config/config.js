//defining default path and environment
var express = require('express');
var app = express();
var path = require('path'), 
rootPath = path.normalize(__dirname + '/..'), 
env = process.env.NODE_ENV || 'development';

//define web server configuration
var config = { 
    development: { 
    root: rootPath, 
    app: { name: 'Test' }, 
    port: 5000, 
    db: 'mongodb://127.0.0.1/exam-dev'
}, 

};
module.exports = config[env];