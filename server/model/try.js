'use strict';
module.exports = function() {
  const _ = require('lodash');

  const request = require('request');
  // Dummy Promise Data
  return new Promise((resolve, reject)=> {
    const url = 'http://petstore.swagger.io/v2/swagger.json';
    const headers = {
      'Content-Type': 'application/json'
    };
    const requestParams = {
      url: url,
      time: true,
      headers,
      method: 'GET'
    };

    // Request to the URL
    request(requestParams, (error, response, body) => {
      if (!error) {
        const data = _.get(response, 'body');
        resolve(JSON.parse(data));
      } else {
        reject(error, body);
      }
    });
  });
};
