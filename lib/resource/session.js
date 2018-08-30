var Chikyu = require('../core');

Chikyu.session.login = function(tokenName, loginToken, secretToken, duration) {
    Chikyu.session.data = {};
    return Chikyu.open.invoke('/session/login', {
        token_name: tokenName,
        login_token: loginToken,
        login_secret_token: secretToken,
        duration: duration
    }).then(function(data) {
        Chikyu.session.data.sessionId = data.session_id;
        Chikyu.session.data.identityId = data.cognito_identity_id;
        Chikyu.session.data.apiKey = data.api_key;
        Chikyu.session.data.user = data.user;
        Chikyu.session.data.offset = 0;
        return Chikyu.aws.getCredentials(data.cognito_token);
    }).then(function(data) {
        Chikyu.session.data.credentials = data.Credentials;
        return new Promise((resolve, reject) => {
            resolve(Chikyu.session.data);
        });
    }).catch(function(err) {
        throw err;
    });
};

Chikyu.session.hasSession = function() {
    return Chikyu.session != null && Chikyu.session.data.sessionId &&
        Chikyu.session.data.identityId && Chikyu.session.data.credentials != null
};

Chikyu.session.sessionToMap = function() {
    if (!this.hasSession()) {
        return null;
    }

    return {
        'sessionId': Chikyu.session.data.sessionId,
        'identityId': Chikyu.session.data.identityId,
        'apiKey': Chikyu.session.data.apiKey,
        'offset': Chikyu.session.data.offset,
        'credentials': Chikyu.session.data.credentials,
        'user': {
            'userId': Chikyu.session.data.user.userId
        }
    }
};

Chikyu.session.mapToSession = function(sessionMap) {
    Chikyu.session.data = {};
    Chikyu.session.data.sessionId = sessionMap['sessionId'];
    Chikyu.session.data.user = sessionMap['user'];
    Chikyu.session.data.identityId = sessionMap['identityId'];
    Chikyu.session.data.apiKey = sessionMap['apiKey'];
    Chikyu.session.data.offset = sessionMap['offset'];
    Chikyu.session.data.credentials = sessionMap['credentials'];
};

Chikyu.session.sessionToJson = function() {
    var item = this.sessionToMap();
    if (item) {
        return JSON.stringify(item);
    }
};

Chikyu.session.sessionFromJson = function(json) {
    var item = JSON.parse(json);
    this.mapToSession(item);
};

Chikyu.session.changeOrgan = function(targetOrganId) {
    return this.invoke.secure('/session/organ/change', {
        'target_organ_id': targetOrganId
    }).then(function(data) {
        Chikyu.session.data.apiKey = data['api_key'];
        Chikyu.session.data.user = data['user'];
        return new Promise((resolve, reject) => {
           resolve();
        });
    }).catch(function(err) {
        throw err;
    });
};

Chikyu.session.logout = function() {
    return Chikyu.secure.invoke('/session/logout', {});
};


module.exports = Chikyu;
