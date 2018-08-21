'use strict';
const indy = require('../../index');

exports.request = function(message) {
    return indy.credentials.acceptRequest(message.origin, message.message);
};

exports.credential = function(message) {
    return indy.credentials.acceptCredential(message.origin, message.message);
};
