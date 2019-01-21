var Chikyu = require('../core');


Chikyu.token = {
    create: function(tokenName, email, password, duration) {
        return Chikyu.open.invoke('/session/token/create', {
            'token_name': tokenName,
            'email': email,
            'password': password,
            'duration': duration
        });
    },
    renew: function(tokenName, loginToken, loginSecretToken) {
        return Chikyu.open.invoke('/session/token/renew', {
            'token_name': tokenName,
            'login_token': loginToken,
            'login_secret_token': loginSecretToken
        });
    },
    revoke: function(tokenName, loginToken, loginSecretToken) {
        return Chikyu.secure.invoke('/session/token/revoke', {
            'token_name': tokenName,
            'login_token': loginToken,
            'login_secret_token': loginSecretToken
        });
    }
};


module.exports = Chikyu;
