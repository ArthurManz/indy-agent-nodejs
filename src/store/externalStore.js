'use strict';

// Class that needs to be extended to define your own storage, see default store implementation
class StoreModule {
    constructor(getAll, clear, write, get, deleteItem) {
        this.getAll = getAll;
        this.clear = clear;
        this.write = write;
        this.get = get;
        this.delete = deleteItem;
    }

    isValid() {
        return (
            typeof this.getAll === 'function' &&
            typeof this.clear === 'function' &&
            typeof this.write === 'function' &&
            typeof this.get === 'function' &&
            typeof this.delete === 'function'
        );
    }
}

function isValidExternalStore(externalStore) {
    if (isValidStore(externalStore)) {
        console.log('Found valid external store. Switching to your store module...');
        return true;
    } else {
        console.error('External Store is invalid, switching to default store');
        return false;
    }
}

function isValidStore(externalStore) {
    return (
        typeof externalStore === 'object' &&
        externalStore.messages instanceof StoreModule &&
        externalStore.messages.isValid() &&
        externalStore.pendingRelationships instanceof StoreModule &&
        externalStore.pendingRelationships.isValid() &&
        externalStore.pendingCredentialOffers instanceof StoreModule &&
        externalStore.pendingCredentialOffers.isValid() &&
        externalStore.pendingCredentialRequests instanceof StoreModule &&
        externalStore.pendingCredentialRequests.isValid() &&
        externalStore.pendingProofRequests instanceof StoreModule &&
        externalStore.pendingProofRequests.isValid()
    );
}

exports.isValidExternalStore = isValidExternalStore;
exports.StoreModule = StoreModule;
