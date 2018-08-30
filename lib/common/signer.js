const crypto = require('crypto');
var Chikyu = require('../core');

const POST = "POST";
const AWS4 = "AWS4";
const AWS4_HMAC_SHA256 = "AWS4-HMAC-SHA256";
const AWS4_REQUEST = "aws4_request";

const getAuthorizationHeader = function(path, payload, headers, currentDate, currentTime, chikyu) {
    const headerNames = getHeaderNamesToSign(headers);
    const canonicalUrl = getCanonicalUrl(path, payload, headerNames, headers);

    const serviceDescription = getServiceDescription(currentDate, chikyu);
    const textToSign = getTextToSign(canonicalUrl, serviceDescription, currentTime, currentDate);

    const signature = getSignature(textToSign, currentDate, chikyu);

    return createAuthorizationHeader(
        headerNames, serviceDescription, signature, currentTime, chikyu
    );
};

const getHeaderNamesToSign = function(headers)  {
    var res = "";
    var idx = 0;
    headers.forEach(function(item) {
        if (idx++ > 0) {
            res += ';';
        }
        res += item[0];
    });
    return res;
};

const getCanonicalUrl = function(path, payload, headerNames, headers) {
    var res = POST + "\n";
    res += path + "\n\n";

    headers.forEach(function(item) {
        res += item[0] + ":" + item[1] + "\n";
    });
    res += "\n";

    res += headerNames + "\n";
    res += getSha256(payload);

    return res;
};

const getServiceDescription = function(currentDate, c) {
    return currentDate + "/" +
        c.config.awsRegion() + "/" +
        c.config.awsApiGwServiceName() + "/" +
        AWS4_REQUEST;
};

const getTextToSign = function(canonicalUrl, serviceDescription, currentTime, currentDate) {
    return AWS4_HMAC_SHA256 + "\n" +
        currentTime + "\n" +
        serviceDescription + "\n" +
        getSha256(canonicalUrl);
};

const getSignature = function(textToSign, currentDate, c) {
    const key = getSignatureKey(c.session.data.credentials.SecretAccessKey, currentDate, c);
    return getHmacSha256(key, textToSign);
};

const getSignatureKey = function(key, currentDate, c) {
    const secret1 = AWS4 + key;
    const secret2 = getHmacSha256(secret1, currentDate, true);
    const secret3 = getHmacSha256(secret2, c.config.awsRegion(), true);
    const secret4 = getHmacSha256(secret3, c.config.awsApiGwServiceName(), true);
    return getHmacSha256(secret4, AWS4_REQUEST, true);
};

const createAuthorizationHeader = function(headerNames, serviceDescription, signature, currentTime, c) {
    return AWS4_HMAC_SHA256 + " " +
        "Credential=" + c.session.data.credentials.AccessKeyId + "/" + serviceDescription + "," +
        "SignedHeaders=" + headerNames + "," +
        "Signature=" + signature;
};

const getNow = function(c) {
    return new Date().getTime() + c.session.data.offset;
};

const getCurrentTime = function(now, withTime) {
    if (withTime !== false) {
        withTime = true;
    }

    const d = new Date();
    d.setTime(now);

    var s = function(i) {
        if (i < 10) {
            return '0' + i;
        } else {
            return '' + i;
        }
    };

    if (withTime) {
        return s(d.getUTCFullYear()) + s((d.getUTCMonth() + 1)) + s(d.getUTCDate()) + 'T' +
            s(d.getUTCHours()) + s(d.getUTCMinutes()) + s(d.getUTCSeconds()) + 'Z';
    } else {
        return s(d.getUTCFullYear()) + s((d.getUTCMonth() + 1)) + s(d.getUTCDate());
    }
};

const getSha256 = function(text) {
    return crypto.createHash('sha256').update(text).digest('hex');
};

const getHmacSha256 = function(key, text, isRaw) {
    const d = crypto.createHmac('sha256', key).update(text);
    if (isRaw) {
        return d.digest('array');
    } else {
        return d.digest('hex');
    }
};


Chikyu.signer = {
    getSignedHeaders: function(path, payload) {

        const now = getNow(Chikyu);
        const currentTime = getCurrentTime(now);
        const currentDate = getCurrentTime(now, false);

        var headers = [];
        headers.push(['content-type', 'application/json']);
        headers.push(['host', Chikyu.config.host()]);
        headers.push(['x-amz-date', currentTime]);
        headers.push(['x-amz-security-token', Chikyu.session.data.credentials.SessionToken]);
        headers.push(['x-api-key', Chikyu.session.data.apiKey]);

        const authorization =
            getAuthorizationHeader(path, payload, headers, currentDate, currentTime, Chikyu);

        headers.push(['Authorization', authorization]);

        var r = {};
        headers.forEach((i) => {
           r[i[0]] = i[1];
        });
        return r;
    }
};

module.exports = Chikyu;
