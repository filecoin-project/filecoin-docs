---
title: Step 5 - Connecting frontend with blockchain
description: This article describes how to connect meme marketplace frontend with blockchain.
---

# Step 5 - Connecting React app with a local blockchain

Take a look at the following files:

- [marketplace/src/pages/Login/index.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/pages/Login/index.js): The Login page connects the react app with the Metamask plugin.
- [marketplace/src/utils/blockchain/index.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/utils/blockchain/index.js): The blockchain utils file:
  - Includes code for connecting the react app with the local blockchain and interacting with the deployed smart contract.
  - Uses Metamask plugin and [web3.js](https://web3js.readthedocs.io/) library to send transactions and calls to the blockchain network.

## Step 5a - Connecting with Metamask

[web3.js](https://web3js.readthedocs.io/) is a collection of libraries that allow you to interact with a local or remote ethereum node using HTTP, IPC, or WebSocket.

You can install web3.js by running the following command:

```bash
npm i web3
```

The Metamask plugin injects `ethereum` object in the browser page, which can be used by web3.js to access Metamask plugin functionality.

In [marketplace/src/pages/Login/index.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/pages/Login/index.js), we check if `window.ethereum` is available (in case the Metamask plugin is installed). If not, then we alert the user to install the Metamask plugin. If Metamask plugin is available:

- Set `window.web3 = new Web3(window.ethereum)` (using `window.ethereum` as a provider object). `window.web3` can be used to access Metamask plugin functionality.
- Call `loginAndCreateBucket` function, which will be explored in Step 6.

```jsx
const loadWeb3 = async loginAndCreateBucket => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
    loginAndCreateBucket()
  } else {
    window.alert(
      'Metamask not detected! Install Metamask plugin to proceed: https://metamask.io/download.html'
    )
  }
}
```

## Step 5b - Connecting to blockchain

In [marketplace/src/utils/blockchain/index.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/utils/blockchain/index.js) we use:

- `window.web3` which was set in the [Login page](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/pages/Login/index.js#L39). This will be used to send transactions to the Metamask plugin.
- `web3 = new Web3(new Web3.providers.HttpProvider(NETWORK_URL))` which is used for accessing some functions supported by newer versions of web3.js. Here `NETWORK_URL` is the RPC endpoint from `ganache-cli` from [Step 1](./step-1-blockchain-and-contracts-setup.md).

::: tip
Metamask provider injects a deprecated version of web3.js (`0.20.7`). To use currently supported version of web3.js (`0.1.x`) for accessing functions like `encodeABI`, `decodeParameters` we initialize a new web3 object `web3 = new Web3(new Web3.providers.HttpProvider(NETWORK_URL))`.
:::

```js
const Web3 = require('web3')
const contract = require('./contract')
const metamask = window.web3

const NETWORK_URL = 'http://127.0.0.1:8545'
const web3 = new Web3(new Web3.providers.HttpProvider(NETWORK_URL))
```

The frontend is now connected with the blockchain.

## Step 5c - Connecting to and the deployed smart contract

In [marketplace/src/utils/blockchain/index.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/utils/blockchain/index.js#L8) import the `contract` object from `marketplace/src/utils/blockchain/contract.js` initialize the contract object `MemeMarketplace` using `new web3.eth.Contract` constructor which takes the following parameters:

- `contract.abi`: In Ethereum, the [ABI Specification](https://solidity.readthedocs.io/en/develop/abi-spec.html) is a way to encode the interface of a smart contract in a way that your user interface can make sense of. The ABI contains all the details of the contract methods in an array.
- `contract.address`: The address of the deployed contract.
- Other optional parameters:
  - `from`: The account address from which the transaction will be signed.

```js
const MemeMarketplace = new web3.eth.Contract(contract.abi, contract.address, {
  from: metamask.eth.accounts[0]
})
```

In [marketplace/src/utils/blockchain/contract.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/utils/blockchain/contract.js#L453), replace the `contract_address_here` string with the contract address that you saved after truffle contract deployment in [Step 1](./step-1-blockchain-and-contracts-setup.md).

The frontend is now connected with the deployed contract.

## Step 5d - Sending transaction to register memes on blockchain

In [marketplace/src/utils/blockchain/index.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/utils/blockchain/index.js#L13) the `awardMemeToken` is used to register NFT token for a meme.

```js
export const awardMemeToken = (address, tokenMetadata, callback) => {
  let data = MemeMarketplace.methods
    .awardMemeToken(address, tokenMetadata)
    .encodeABI()

  metamask.eth.sendTransaction(
    {
      from: metamask.eth.accounts[0],
      to: contract.address,
      data: data
    },
    function (receipt) {
      callback(null, receipt)
    }
  )
}
```

We access the contract's `awardMemeToken` function using `MemeMarketplace.methods.awardMemeToken`, which takes 2 parameters:

- `address`: The address of the owner of the NFT token.
- `tokenMetadata`: Token details like name, price, and the CID of the meme.

The `data` is a hex string that contains information about the function to be called and it's parameters.

The `metamask.eth.sendTransaction` method is used to send a transaction to be signed and deployed by the Metamask plugin. It is provided with the following parameters:

- `from`: The account address from which the transaction will be signed.
- `to`: The account to which the transaction is sent to. In this case it the contract's address.
- `data`: The hex string containing information about the function to be called and it's parameters.
- a callback method that returns `receipt` containing the details about the transaction that was sent.

::: tip
Metamask manages the keys securely for the app user and can be used to sign any data using on behalf of the user.
:::

On calling the `sendTransaction` method, the Metamask plugin will pop up and ask for the user's consent to sign and send the transaction to the blockchain on the user's behalf.

The `callback` method passed in `awardMemeToken` is used to capture the `receipt`.

## Step 5e: Sending calls to fetch meme details form the blockchain

In [marketplace/src/utils/blockchain/index.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/utils/blockchain/index.js#L57), you will find 3 functions to fetch token related details from the deployed contract:

- `getTokenOwner`: This fetches the owner (address) of a `tokenId`. Each NFT token has a `tokenId` that is used to uniquely identify an NFT token. The hex string `data` contains info about the method to be called (`ownerOf`) and the parameter `tokenId`.
  The `web3.eth.call` method sends a call:

  - to the `contract.address`
  - from the `metamask.eth.accounts[0]` (the imported account in Metamask plugin)
  - and returns a promise which resolves to `receipt` object. The `logs` array in the `receipt` object has hex string named `data`, which contains the `address` of the token owner (decoded using `web3.eth.abi.decodeParameters`).

- `getTokenMetadata`: This fetches the metadata (name, price, CID) related to the meme NFT token. The hex string `data` contains info about the method to be called (`tokenURI`) and the parameter `tokenId`.
  The `web3.eth.call` method sends a call:

  - to the `contract.address`
  - from the `metamask.eth.accounts[0]` (the imported account in Metamask plugin)
  - and returns a promise which resolves to `receipt` object. The `logs` array in the `receipt` object has hex string named `data`, which contains the metadata string (decoded using `web3.eth.abi.decodeParameters`).

- `getTotalSupply`: This fetches the total number of meme NFTs registered on the contract. The hex string `data` contains info about the method to be called (`totalSupply`).
  The `web3.eth.call` method sends a call:
  - to the `contract.address`
  - from the `metamask.eth.accounts[0]` (the imported account in Metamask plugin)
  - and returns a promise which resolves to `receipt` object. The `logs` array in the `receipt` object has hex string named `data`, which contains the [unsigned integer](https://solidity.readthedocs.io/en/v0.5.3/types.html#integers) representing the number of registered NFTs (decoded using `web3.eth.abi.decodeParameters`).

::: tip
A call is different from a transaction. A call only involves in querying the state of the contract, where as the transaction can change the state of the contract.
:::

```js
export const getTokenOwner = tokenId => {
  return new Promise((resolve, reject) => {
    let data = MemeMarketplace.methods.ownerOf(tokenId).encodeABI()

    web3.eth
      .call({
        from: metamask.eth.accounts[0],
        to: contract.address,
        data: data
      })
      .then(receipt => {
        let res = web3.eth.abi.decodeParameters(['address'], receipt)
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const getTokenMetadata = tokenId => {
  return new Promise((resolve, reject) => {
    let data = MemeMarketplace.methods.tokenURI(tokenId).encodeABI()

    web3.eth
      .call({
        from: metamask.eth.accounts[0],
        to: contract.address,
        data: data
      })
      .then(receipt => {
        let res = web3.eth.abi.decodeParameters(['string'], receipt)
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const getTotalSupply = () => {
  return new Promise((resolve, reject) => {
    let data = MemeMarketplace.methods.totalSupply().encodeABI()

    web3.eth
      .call({
        from: metamask.eth.accounts[0],
        to: contract.address,
        data: data
      })
      .then(receipt => {
        let res = web3.eth.abi.decodeParameters(['uint256'], receipt)
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
```

Now the Textile hub and local blockchain are connected and the app is up and running with users on the system.
