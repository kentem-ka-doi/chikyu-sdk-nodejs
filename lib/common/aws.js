var AWS = require('aws-sdk');
var Chikyu = require('../core');

Chikyu.aws = {
    getCredentials: function(cognitoToken) {
        const sts = new AWS.STS({region: Chikyu.config.awsRegion()});
        return sts.assumeRoleWithWebIdentity({
            RoleArn: Chikyu.config.awsRoleArn(),
            RoleSessionName: Chikyu.config.awsApiGwServiceName(),
            WebIdentityToken: cognitoToken,
            DurationSeconds: 43200
        }).promise();
    }
};

module.exports = Chikyu;
