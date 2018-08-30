var Chikyu = require('../core');

Chikyu.setApiKeys = function(apiKey, authKey) {
    Chikyu.apiKey.apiKey = apiKey;
    Chikyu.apiKey.authKey = authKey;
};

Chikyu.public = {
    invoke: function(apiPath, data) {
        return Chikyu.request.invoke('public', apiPath, {'data': data},[
            ['Content-Type', 'application/json'],
            ['X-Api-Key', Chikyu.apiKey.apiKey],
            ['X-Auth-Key', Chikyu.apiKey.authKey]
        ]);
    }
};

module.exports = Chikyu;
