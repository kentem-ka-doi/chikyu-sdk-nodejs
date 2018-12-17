var Chikyu = require('../core');
const axios = require('axios');


Chikyu.request = {
    invoke: function(apiClass, apiPath, apiData, headers) {
        if (!headers) {
            headers = {
                'Content-Type': 'application/json'
            };
        }
        const url = Chikyu.request.buildUrl(apiClass, apiPath, true);
        return axios.post(url, JSON.stringify(apiData), {
                    headers: headers
                }).then((res) => {
                    const data = res.data;
                    return new Promise(function(resolve, reject) {
                        try {
                            if (!('has_error' in data) || data.has_error) {
                                reject(new Error(data.message));
                            } else {
                                resolve(data.data);
                            }
                        } catch (e) {
                            reject(e);
                        }
                });
        });
    },
    buildUrl: function(apiClass, apiPath, withHost) {
        if (withHost !== false) {
            withHost = true;
        }

        if (apiPath.indexOf('/') === 0) {
            apiPath = apiPath.substr(1);
        }

        const envName = Chikyu.config.envName();
        let path = '';
        if (envName) {
            path = '/' + Chikyu.config.envName() + '/api/v2/' + apiClass + '/' + apiPath;
        } else {
            path = '/api/v2/' + apiClass + '/' + apiPath;
        }

        if (withHost) {
            return Chikyu.config.protocol() + '://' + Chikyu.config.host() + path;
        } else {
            return path;
        }
    }
};


module.exports = Chikyu;
