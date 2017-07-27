/**
 * @function login
 * @param data - all necessary payloads wrapped into 1 data object
 */

'use strict';
const urls          = require('../apiConfig.js'),
      loginUtils    = require('../utils/loginUtil.js')(),
      jwtDecode     = require('jwt-decode'),
      _             = require('lodash'),
      request       = require('request');  

module.exports = function() {

    return {
        login:  function(data) {
            // call api utils with the necessary data to make the actual API call
            var userResponse;

            const payload = {
                'url'       :   urls.api.loginUrl,
                'method'    :   'POST',
                'data'      :   {
                    'username'  :   data.username,
                    'password'  :   data.password
                }
            };

            return new Promise((resolve, reject) => {
                loginUtils.login(payload).then((response) => {
                    userResponse = response; // To be used in the catch block if login is invalid
                    const user = jwtDecode(JSON.parse(response.data).token)
                    const data = {
                        id: user.user_id,
                        username: user.username,
                        email: user.email,
                        status: {
                            code: response.status.code,
                            message: response.status.message
                        }
                    }
                    resolve({
                        data,
                        token: JSON.parse(response.data).token                        
                    });
                }).catch((err) => {
                    reject({
                        data: err,
                        status: {
                            code: userResponse.status.code,
                            message: userResponse.data
                        }
                    });
                });
            });
        }
    }
};
