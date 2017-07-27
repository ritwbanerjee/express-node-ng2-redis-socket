'use strict';
// modules =================================================
const path = require('path');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// set our port
var port = process.env.PORT || 4000;
require('./server/express.js')(app, io, server);

server.listen(port, ()=> {                 
  console.log('App running on Port:  ' + port);
});
exports = module.exports = app;
