'use strict';
const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();
const store = require('../store');
const StoreModule = store.StoreModule;
const storeFileName = (process.env.INDY_AGENT_USERNAME || 'agent') + '_store.json';
const storePath = path.join(homedir, '/.indy_client/', storeFileName);

describe('store', function() {
    describe('messages', () => {
        beforeAll(() => {
            store.setUp();
        });
        beforeEach(function() {
            store.messages.clear();
        });

        afterEach(function() {
            store.messages.clear();
        });

        it('messages.getAll() should create file and return empty array, be persistent', function() {
            expect(store.messages.getAll() === []);
            store.messages.write({ some: 'message' });
            store.messages.write({ another: 'message' });
            let expected = [{ some: 'message' }, { another: 'message' }];
            expect(store.messages.getAll() === expected);
            expect(JSON.parse(fs.readFileSync(storePath)) === expected);
            store.messages.clear();
            expect(store.messages.getAll() === []);
        });

        it('messages.get(id) should get the right message', function() {
            let record = new store.models.Messages(10, 'Hello');
            store.messages.write(record);
            store.messages.write(new store.models.Messages(20, 'Hello'));
            expect(store.messages.get(record.id) === record);
        });

        it('message.delete(id) should delete the right message', function() {
            let all = [new store.models.Messages(20, 'Hello'), new store.models.Messages(10, 'Hello')];
            store.messages.write(all[0]);
            store.messages.write(all[1]);
            store.messages.delete(all[0].id);
            expect(store.messages.getAll().length === 1);
            expect(store.messages.getAll()[0] === all[1]);
        });
    });

    describe('external-store', function() {
        it('Given a valid external store isValidExternalStore method should return true', function() {
            expect(store.setUp(validStore) === validStore);
        });

        it('Given a invalid external store, missing one module, isValidExternalStore method should return false', function() {
            expect(store.setUp(inValidStoreMissingModule) !== validStore);
        });

        it('Given a invalid external store, with one invalid module, isValidExternalStore method should return false', function() {
            expect(store.setUp(inValidStoreInvalidModule) !== validStore);
        });
    });
});

class ValidModule extends StoreModule {
    constructor() {
        super();
        this.getAll = getAll;
        this.clear = clear;
        this.write = write;
        this.get = get;
        this.delete = deleteItem;

        function getAll() {}
        function clear() {}
        function write() {}
        function get() {}
        function deleteItem() {}
    }
}

class InvalidValidModule extends StoreModule {
    constructor() {
        super();
        this.getAll = getAll;
        this.write = write;
        this.delete = deleteItem;

        function getAll() {}
        function write() {}
        function deleteItem() {}
    }
}

const validStore = {
    messages: new ValidModule(),
    pendingRelationships: new ValidModule(),
    pendingCredentialOffers: new ValidModule(),
    pendingCredentialRequests: new ValidModule(),
    pendingProofRequests: new ValidModule()
};

const inValidStoreMissingModule = {
    pendingRelationships: new ValidModule(),
    pendingCredentialOffers: new ValidModule(),
    pendingCredentialRequests: new ValidModule(),
    pendingProofRequests: new ValidModule()
};

const inValidStoreInvalidModule = {
    messages: new InvalidValidModule(),
    pendingRelationships: new ValidModule(),
    pendingCredentialOffers: new ValidModule(),
    pendingCredentialRequests: new ValidModule(),
    pendingProofRequests: new ValidModule()
};
