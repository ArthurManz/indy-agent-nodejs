'use strict';
const fs = require('fs');
const homedir = require('os').homedir();
const path = require('path');
const models = require('./models');
const StoreModule = require('./externalStore').StoreModule;
const BASE = JSON.stringify({
    pendingMessages: [],
    pendingRelationships: [],
    pendingCredentialOffers: [],
    pendingCredentialRequests: [],
    pendingProofRequests: []
});

let store = {};
let storePath = '';

class DefaultStoreModule extends StoreModule {
    constructor(storeModule, Model) {
        super();
        this.storeModule = storeModule;
        this.Model = Model;
        this.getAll = getAll;
        this.clear = clear;
        this.write = write;
        this.get = get;
        this.delete = deleteItem;

        function getAll() {
            return initExecute(() => this.storeModule);
        }

        function clear() {
            return initExecuteSync(() => (this.storeModule = []));
        }

        function write(...parameters) {
            const record = new this.Model(...parameters);
            console.log(record);
            initExecuteSync(() => this.storeModule.push(record));
            return record.id;
        }

        function get(id) {
            return findById(this.storeModule, id);
        }

        function deleteItem(id) {
            return deleteById(this.storeModule, id);
        }
    }
}

function setUpDefaultStore() {
    const storeFileName = (process.env.INDY_AGENT_USERNAME || 'agent') + '_store.json';
    storePath = path.join(homedir, '/.indy_client/', storeFileName);
    init();
    return {
        messages: new DefaultStoreModule(store.pendingMessages, models.Messages),
        pendingRelationships: new DefaultStoreModule(store.pendingRelationships, models.Relationships),
        pendingCredentialOffers: new DefaultStoreModule(store.pendingCredentialOffers, models.CredentialOffers),
        pendingCredentialRequests: new DefaultStoreModule(store.pendingCredentialRequests, models.CredentialRequests),
        pendingProofRequests: new DefaultStoreModule(store.pendingProofRequests, models.ProofRequests)
    };
}

// Default Store Functions
function init() {
    if (!store.pendingMessages) {
        console.log('Initializing Store Module');
        if (!fs.existsSync(storePath)) {
            console.log(`Store file does not exist. Generating one at ${storePath}`);
            fs.writeFileSync(storePath, BASE);
        }
        console.log(`Parsing Store at ${storePath}`);
        store = JSON.parse(fs.readFileSync(storePath));
    }
}

function syncChanges() {
    fs.writeFileSync(storePath, JSON.stringify(store));
}

function findById(storeModule, id) {
    return initExecute(id => {
        for (let record of storeModule) {
            if (record.id === id) {
                return record;
            }
        }
        return null;
    }, id);
}

function deleteById(storeModule, id) {
    return initExecuteSync(id => {
        for (let i = 0; i < storeModule.length; i++) {
            if (storeModule[i].id === id) {
                storeModule.splice(i, 1);
            }
        }
    }, id);
}

function initExecuteSync(action, ...parameters) {
    const res = initExecute(action, ...parameters);
    syncChanges();
    return res;
}

function initExecute(action, ...parameters) {
    init();
    return action(...parameters);
}

exports.setUpDefaultStore = setUpDefaultStore;
