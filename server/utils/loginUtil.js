'use strict';

const _         = require('lodash'),
      request   = require('request'); 

module.exports = function() {

  return {
    login: function(options) {

      return new Promise((resolve, reject) => {

        const headers = {
          'Content-Type': 'application/json'
        }

        const requestParams = {
          url: options.url || '/',
          time: true,
          headers,
          method: options.method,
          body: JSON.stringify(Object.assign({}, options.data, {json: true}))
        };

        request(requestParams, (error, response, body) => {
          if (!error) {
            // This gets trigerred when the service doesnot fail (time out)
            resolve({
              data: body,
              status: {
                code: response.statusCode,
                message: `${options.url} Success`
              }
            });
          } else {
            // This gets trigerred when the service fails.
            reject({
              data: body,
              status: {
                code: response.statusCode,
                message: `${options.url} Failed`
              }
            });
          }
        });
      });
    }
  }
}