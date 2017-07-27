/**
 * Created By: Ritwik Banerjee
 * Imports: sessionConfig - Express session maintained in redisClient
 * startSocket - Starts socket on route '/'
 * startWebpack - Starts webpack
 * routes - has the node routes
 */

'use strict';

module.exports = function(app, io, server) {

  var express = require('express');
  var bodyParser = require('body-parser');
  var methodOverride = require('method-override');

  // set the static files location /public/img will be /img for users
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/dist'));

  // parse application/vnd.api+json as json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  
  // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
  app.use(methodOverride('X-HTTP-Method-Override'));

  // Redis
  const redis = require('./utils/redis.js')(app);
  app.set('redis', redis);

  // Start Socket
  require('./middleware/startSocket')(app, io);
  
  // Get all the middleware stuff going
  require('./middleware/sessionConfig.js')(app);
  
  // Start Webpack
  require('./webpack/startWebpack.js')(app);

  // routes ==================================================
  require('./routes/routes')(app); // configure our routes

  require('../config/webpack.dev.js');
}