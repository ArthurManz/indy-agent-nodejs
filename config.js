"use strict";

const config = {
  // Change to your endpoint did's endpoint
  endpointDidEndpoint: process.env.PUBLIC_DID_ENDPOINT,

  // IP Address of the running ledger
  testPoolIp: process.env.TEST_POOL_IP || "127.0.0.1",

  // the port to run the agent server on
  port: process.env.PORT || 3000,

  // Optional: Give your wallet a unique name
  walletName: `${process.env.INDY_AGENT_USERNAME || "alice"}_wallet`,

  // Optional: Give your pool config a unique name
  poolName: process.env.INDY_AGENT_POOL_NAME || "pool1",

  // This information is used to issue your "Government ID"
  userInformation: {
    name: process.env.INDY_AGENT_NAME || "Alice Garcia",
    email: process.env.INDY_AGENT_EMAIL || "alice@faber.edu",
    tax_id: process.env.INDY_AGENT_TAX_ID || "123-45-6789",
    username: process.env.INDY_AGENT_USERNAME || "alice",
    password: process.env.INDY_AGENT_PASSWORD || "123"
  },

  sessionSecret:
    "YUYFDISYFSIUOFYERTEWRTEWTWETRNNNMNJHKHFASDdyfiudayDAYIUSDFYASIOFOOASIUDFYEREAHLSKJFE57894502354354HJKAFDDFS"
};

module.exports = config;
