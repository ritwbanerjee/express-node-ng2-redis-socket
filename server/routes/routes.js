// app/routes.js
'use strict';

module.exports = function(app) {

  app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });
};