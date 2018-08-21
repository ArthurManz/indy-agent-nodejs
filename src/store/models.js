'use strict';
const uuid = require('uuid');

class Record {
    constructor() {
        this.id = uuid();
        this.timestamp = new Date();
    }
}

exports.Relationships = class Relationships extends Record {
    constructor(myNewDid, theirEndpointDid, nonce) {
        super();
        this.myNewDid = myNewDid;
        this.theirEndpointDid = theirEndpointDid;
        this.nonce = nonce;
    }
};

exports.Messages = class Messages extends Record {
    constructor(did, message) {
        super();
        this.did = did;
        this.message = message;
    }
};

exports.CredentialOffers = class CredentialOffers extends Record {
    constructor(credOffer) {
        super();
        this.offer = credOffer;
    }
};

exports.CredentialRequests = class CredentialRequests extends Record {
    constructor(credRequestJson, credRequestMetadataJson) {
        super();
        this.credRequestJson = credRequestJson;
        this.credRequestMetadataJson = credRequestMetadataJson;
    }
};

exports.ProofRequests = class ProofRequests extends Record {
    constructor(proofRequest) {
        super();
        this.proofRequest = proofRequest;
    }
};


