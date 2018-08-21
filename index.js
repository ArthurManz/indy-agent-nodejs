'use strict';
exports.wallet = require('./src/wallet');
exports.connections = require('./src/connections');
exports.credentials = require('./src/credentials');
exports.crypto = require('./src/crypto');
exports.did = require('./src/did');
exports.handler = require('./src/handler');
exports.issuer = require('./src/issuer');
exports.messages = require('./src/messages');
exports.pairwise = require('./src/pairwise');
exports.pool = require('./src/pool');
exports.proofs = require('./src/proofs');
exports.utils = require('./src/utils');

let store = require('./src/store');
let config = require('./config');


exports.setupAgent = async function(externalConfig, externalStore, genesisPoolTransactions) {
    // Rewrite config values if external configuration is given
    if (externalConfig) config = Object.assign({}, config, externalConfig);
    store = store.setUp(externalStore);
    console.log(store);
    await exports.pool.setup(config, genesisPoolTransactions);
    await exports.wallet.setup(config);
    // TODO: FIXME: Depending on the environment maybe we can not self-onboard trust-anchor impersonating steward
    let endpointDid = await exports.did.getEndpointDid(config); // Creates it if it doesn't exist
    await exports.pool.setEndpointForDid(endpointDid, config.endpointDidEndpoint);
    return Promise.resolve();
};

exports.models = store.models;
exports.store = store;
