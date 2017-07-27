module.exports = function(app, socket, req, res) {
  const loginModel  = require('../model/login')(),
        _           = require('lodash');

  // Socket signature for login
  socket.on('api:login', (data) => {
    loginModel.login(data).then((response) => {
      req.user = response;
      req.session.user = response;
      req.session.save();

      socket.emit('api:login', {
        data: response.data
      });
    }).catch((err) => {
      socket.emit('api:login', {
        data: err
      });
    });
  });

  // Socket signature to get user data from 'req' - check if the user is logged in
  socket.on('api:isLoggedIn', () => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('Session Id: ', req.sessionID);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    if(_.get(req, 'session.user')) {
      socket.emit('api:isLoggedIn', {
        data: req.session.user.data,
        status: {
          code: 200
        }
      });
    } else {
      socket.emit('api:isLoggedIn', {
        data: 'Not logged In',
        status: {
          code: 401
        }
      });
    }
    
  });

  // Socket signature for logout
  socket.on('api:logout', (data) => {
    req.session.destroy();
    socket.emit('api:logout', {
      data: {
        status: {
          code: 200
        },
        message: 'Logout successful'
      }
    });
  });
};
