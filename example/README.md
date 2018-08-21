# NodeJS implementation of the indy-agent

## Quick start guide

### Running using docker-compose:
```bash
npm i
docker build -t indy-agentjs .
# Running the pool and agents
docker-compose up --build
# Shut down:
docker-compose down -v
```

* Then go to http://localhost:3000 login as alice 123
* Then go to http://localhost:3001 login as bob 123

> Now you can try to send a connection request between them by copying the 
endpoint DID and from the other agent sending a connection request to it.

### Running manually from Indy SDK test pool docker:
* `git clone https://github.com/hyperledger/indy-sdk.git` and follow 
[the instructions](https://github.com/hyperledger/indy-sdk/tree/master/doc) 
to build libindy for your system.
* Make sure the indy-sdk node module can access the built library by 
following [these instructions](https://www.npmjs.com/package/indy-sdk#installing).
* Make sure you have a running ledger by running these commands inside of the 
indy-sdk repository.

```
docker build -f ci/indy-pool.dockerfile -t indy_pool .
docker run -itd -p 9701-9708:9701-9708 indy_pool
```

* Then run the following commands to start the agent

```
git clone https://github.com/hyperledger/indy-agent.git
cd indy-agent/nodejs
npm install # This will fail if libindy is not accessible
npm start # Starts the node.js express server
```
* Then go to http://localhost:3000

## Agent Configuration
The agent can be configured using the following environment variables, 
or the values can be edited directly in `config.js`

```
# The following variables are set in .env, if you are using docker-compose 
you don't need to modify it

TEST_POOL_IP=172.17.0.100
DOCKERHOST=127.0.0.1

INDY_AGENT_PORT=7000
INDY_AGENT_NAME=Alice
INDY_AGENT_EMAIL=alice@faber.edu
INDY_AGENT_PASSWORD=123
INDY_AGENT_USERNAME=alice
INDY_AGENT_PUBLIC_DID_ENDPOINT=${DOCKERHOST}:3000
```

Where PUBLIC_DID_ENDPOINT refers to the host and port your agent is 
running at, and the TEST_POOL_IP refers to the ip address of the running ledger.
