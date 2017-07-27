'use strict';
const path = require('path');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../config/webpack.dev.js');
const express = require('express');

module.exports = function(app) {
  // Starts webpack
  if (process.env.NODE_ENV !== 'production') {
    console.log('Development mode');
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));  
  } else {
      console.log('Production Mode');
      app.use(express.static(__dirname + '../dist'));
      app.get('*', function response(req, res) {
          res.sendFile(path.join(__dirname, 'dist/index.html'));
      });
  }
}