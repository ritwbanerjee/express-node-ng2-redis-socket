module.exports = function(app, socket, req, res) {

  // Require all Sockets
  require('./socket/login.js')(app, socket, req, res);
  require('./socket/initialTry.js')(app, socket, req, res);

  socket.once('disconnect', function() {
    console.log('Socket Disconnected');
  });
};
