module.exports = function(app, socket, req, res) {
    const tryModel = require('../model/try')();
    const loginModel = require('../model/login')();

  socket.on('api:try', () => {
    socket.emit('api:try', {
      data: req.session.user
    })
  });
};
