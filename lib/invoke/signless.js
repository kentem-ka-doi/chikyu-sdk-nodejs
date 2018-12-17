const crypto = require('crypto');
var Chikyu = require('../core');

Chikyu.signless = {
    invoke: function(apiPath, data) {
        if (!Chikyu.session.hasSession()) {
            throw Error('セッションが存在しません');
        }

        const d = new Date();
        const s = (i) => { return (i < 10) ? '0' + i : '' + i; };
        const salt = s(d.getUTCFullYear()) + s((d.getUTCMonth() + 1)) + s(d.getUTCDate()) + 'T' +
                    s(d.getUTCHours()) + s(d.getUTCMinutes()) + s(d.getUTCSeconds()) + 'Z';

        const params = {
            'session_id': Chikyu.session.data.sessionId,
            'identity_id': Chikyu.session.data.identityId,
            'salt': salt,
            'data': data
        };

        const authText = salt + '&' + JSON.stringify(params) + '&' + Chikyu.session.data.sessionSecretKey;
        const authKey  = crypto.createHash('sha256').update(authText).digest('hex');

        if (Chikyu.config.mode() === 'local' || Chikyu.config.mode() === 'docker') {
            params['identity_id'] = Chikyu.session.data.identityId;
        }

        const headers = {
            'X-API-KEY': Chikyu.session.data.apiKey,
            'X-AUTH-KEY': authKey,
            'Content-Type': 'application/json'
        };
        return Chikyu.request.invoke("signless", apiPath, params, headers);
    }
};

module.exports = Chikyu;
