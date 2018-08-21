'use strict';
const models = require('./models');
const defaultStore = require('./defaultStore');
const externalStore = require('./externalStore');

function setUp(givenStore) {
    // Check if given External Store is Valid
    if (givenStore && externalStore.isValidExternalStore(givenStore)) return givenStore;
    // Initialize and export default store
    return Object.assign(exports, defaultStore.setUpDefaultStore());
}

exports.models = models;
exports.StoreModule = externalStore.StoreModule;
exports.setUp = setUp;
