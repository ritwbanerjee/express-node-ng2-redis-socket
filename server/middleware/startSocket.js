'use strict';
module.exports = function(app, io) {
  
  app.get('/', (req, res, next) => {
    // Set up socket io
    io.once('connection', (socket)=> {
      require('../socket')(app, socket, req, res);
    });
    next();
  });
}