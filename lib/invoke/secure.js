var Chikyu = require('../core');

Chikyu.secure = {
    invoke: function(apiPath, data) {
        if (!Chikyu.session.hasSession()) {
            throw Error('セッションが存在しません');
        }

        const path = Chikyu.request.buildUrl("secure", apiPath, false);
        const params = {
            'session_id': Chikyu.session.data.sessionId,
            'data': data
        };

        if (Chikyu.config.mode() === 'local' || Chikyu.config.mode() === 'docker') {
            params['identity_id'] = Chikyu.session.data.identityId;
        }

        const signedHeaders = Chikyu.signer.getSignedHeaders(path, JSON.stringify(params));
        return Chikyu.request.invoke("secure", apiPath, params, signedHeaders);
    }
};

module.exports = Chikyu;
