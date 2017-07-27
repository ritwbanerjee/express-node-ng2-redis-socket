'use strict';

const _         = require('lodash'),
      request   = require('request'); 

module.exports = function() {

  return {
    makeApiRequest: function(options) {

      return new Promise((resolve, reject) => {
        const requestParams = {
          url: options.url || '/',
          time: true,
          headers,
          method: options.method,
          body: JSON.stringify(Object.assign({}, options.data, {json: true}))
        };

        request(requestParams, (error, response, body) => {
          if (!error) {
            resolve({
              data: body,
              status: {
                code: 200,
                message: `${options.url} Success`
              }
            });
          } else {
            reject({
              data: body,
              status: {
                code: 400,
                message: `${options.url} Failed`
              }
            });
          }
        });
      });
    }
  }
}