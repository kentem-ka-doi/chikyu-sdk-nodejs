var Chikyu = require('../core');

Chikyu.open = {
    invoke: function(apiPath, data) {
        return Chikyu.request.invoke('open', apiPath, {'data': data});
    }
};

module.exports = Chikyu;
