/**
 * Created By : Ritwik Banerjee
 * Purpose: Created the express session and stores it in redis-client
 */

'use strict';
module.exports = function(app) {
  const cookieParser  = require('cookie-parser'),
        session       = require('express-session'),
        uuid          = require('uuid');

  // Sets up Express Session
  app.use(cookieParser('irelief'));
  let redis = app.get('redis');
  app.use(session({
    name: 'irelief',
    secret: 'irelief',
    store: redis.sessionStore,
    cookie: {
      cookieName: 'xyz',
      expires: false,
      httpOnly: false,
      secret: 'irelief',
      secure: false,
      maxAge: 360000000
     },
     genid: function(req) {
      return uuid.v4();
    },
    saveUninitialized: true,
    resave: false,
    rolling: true
  }));
}

