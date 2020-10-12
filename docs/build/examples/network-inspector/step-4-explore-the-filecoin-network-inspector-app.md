---
title: Step 4 - Explore the Filecoin Network Inspector App
description: This article describes the major sections of the Network Inspector App and how they interact with lotus and go-ipfs nodes.
---

# Step 4: Explore the Filecoin Network Inspector App

This section provides an overview of the pages in the Filecoin Network Inspector App:

- **Chain**: Blockchain explorer for viewing Filecoin blocks.
- **Miners**: Displays the miners in the network.
- **Markets**: Fetch your wallet address and balance, store files, monitor storage and retrieval deals, and fetch data from the network.
- **Deals**: Monitor storage deals on the local network.

## Step 4a: Import the lotus client

You can look at [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js) to understand how data is captured from the lotus node.

1. In [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js#L3), import the lotus client.

```jsx
import { getClient } from '../../utils/lotus'
const client = getClient()
```

All pages in the application will make use of the client API for various types of chain data.

## Step 4b: Chain Page

The Chain page is a simple chain explorer that displays the JSON information contained in Filecoin blocks. Look at:

- [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js) to understand how data is captured from the lotus node
- [src/pages/Chain/index.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/pages/Chain/index.js) to see how the data is displayed in the application UI

1. **Create a method to get Filecoin blocks:** In [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js#L36), create a method called `getChainStats`, which uses `client.chainNotify` and a callback function to listen for any changes in chain state. Each change is a new block containing information, such as block number (height), block CID, miner, parent block CID, messages contained in the block, and much more. You can read more about Filecoin data structures, including blocks, in the [Filecoin spec](https://filecoin-project.github.io/specs/#systems__filecoin_blockchain__struct).

```jsx
export const getChainStats = () => async dispatch => {
  client.chainNotify(changes => {
    dispatch({
      type: types.GET_CHAIN_STATS,
      payload: changes
    })
  })
}
```

2. **Create a method to get the most recent Filecoin block:** In [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js#L191), create a method called `getChainHead`, which uses `client.chainHead` to retrieve only the most recent block, rather than the entire chain.

```jsx
export const getChainHead = () => async dispatch => {
  const chainHead = await client.chainHead()
  dispatch({
    type: types.GET_CHAIN_HEAD,
    payload: chainHead
  })
}
```

3. **Display the chain data in the UI:** In [src/pages/Chain/index.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/pages/Chain/index.js), use the `getChainStats` method you created to display the chain information on the Chain page.

```jsx
import React from 'react'
import { connect } from 'react-redux'
import { getChainStats } from '../../redux/actions/lotus'
import { Link } from 'react-router-dom'
import FilecoinGIF from '../../assets/filecoin.gif'
import ReactJson from 'react-json-view'

function Chain(props) {
  const { chain, getChainStats } = props
  if (chain.length === 0) {
    getChainStats()
  }
  return (
    <div style={{ margin: '18px' }}>
      <h1>Chain Explorer</h1>
      <div>
        {chain.length === 0 ? (
          <center>
            <img src={FilecoinGIF} />
          </center>
        ) : (
          chain.map((block, index) => (
            <div key={index} className="card" style={{ width: '52rem' }}>
              <div className="card-body">
                <h5 className="card-title">
                  Block {block[0].Val.Blocks[0].Height}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {block[0].Val.Cids[0]['/']}
                </h6>
                <p className="card-text">
                  <b>TimeStamp: </b> {block[0].Val.Blocks[0].Timestamp} <br />
                  <b>Parent Block: </b> {
                    block[0].Val.Blocks[0].Parents[0]['/']
                  } <br />
                  <b>ParentWeight: </b> {block[0].Val.Blocks[0].ParentWeight}{' '}
                  <br />
                  <b>Miner: </b>
                  <Link
                    to={`/miner/${block[0].Val.Blocks[0].Miner}`}
                    className="card-link">
                    {block[0].Val.Blocks[0].Miner}
                  </Link>
                </p>
                <br />
                <ReactJson src={block} collapsed={true} name="Block JSON" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  chain: state.app.chain
})

const mapDispatchToProps = dispatch => ({
  getChainStats: () => dispatch(getChainStats())
})

export default connect(mapStateToProps, mapDispatchToProps)(Chain)
```

## Step 4b: Miners Page

The Miners page displays information about the active miners in the connected Filecoin network. The local devnet you are running contains only a single miner (with miner ID `t01000`), while [public networks](https://docs.filecoin.io/build/start-building/interacting-with-the-network/) will contain many more miners. Look at:

- [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js) to understand how data is captured from the lotus node.
- [src/pages/Miners/index.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/pages/Miners/index.js) to see how data about all miners is displayed in the application UI.
- [src/pages/Miner/index.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/pages/Miner/index.js) to see how data about a single miner is displayed in the application UI (not covered in this tutorial, since there is only one miner on the current network).

1. **Create a method to list all miners:** In [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js#L177), create a method called `stateListMiners`, which uses `client.stateListMiners` and `client.stateMinerPower` from the lotus API. The `client.stateListMiners` function displays each miner’s ID and its power in the current network. Mining power is a reflection of the proven storage capacity of the miner based on their activity in the network over time.

```jsx
export const stateListMiners = () => async dispatch => {
  let result = await client.stateListMiners([])
  result = result.map(async miner => {
    let minerPow = await client.stateMinerPower(miner, [])
    return { name: miner, power: minerPow }
  })
  Promise.all(result).then(values => {
    dispatch({
      type: types.STATE_LIST_MINERS,
      payload: values
    })
  })
}
```

2. **Display the mining data in the UI:** In [src/pages/Miners/index.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/pages/Miners/index.js), use the `stateListMiners` method you created to display information about Filecoin miners on the Miners page.

```jsx
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { stateListMiners } from '../../redux/actions/lotus'
import FilecoinGIF from '../../assets/filecoin.gif'
import ReactJson from 'react-json-view'

function Miners(props) {
  const { miner, stateListMiners } = props
  if (Object.keys(miner).length === 0) {
    stateListMiners()
  }

  return (
    <Fragment>
      <h1>Miner Stats</h1>
      {miner.minerList ? (
        miner.minerList.map((miner, index) => (
          <div key={index} className="card" style={{ width: '42rem' }}>
            <div className="card-body">
              <h5 className="card-title">Name: {miner.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Miner Details</h6>
              <ReactJson src={miner} collapsed={true} name="Miner Details" />
            </div>
          </div>
        ))
      ) : (
        <img src={FilecoinGIF} />
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  miner: state.app.miner
})

const mapDispatchToProps = dispatch => ({
  stateListMiners: () => dispatch(stateListMiners())
})

export default connect(mapStateToProps, mapDispatchToProps)(Miners)
```

## Step 4c: Markets Page

The Markets page allows you to store files directly through the UI. It also allows you to see information on your wallet balance and status of recent deals.

![Market Page of the Network Inspector application](./images/market-page.png)

The Markets page contains the following functions:

- Fetch your wallet address and corresponding balance.
- Store files on the public IPFS and Filecoin networks.
- Monitor storage deal status.
- Fetch data from the Filecoin Network.
- Monitor your retrieval deal status.

Look at:

- [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js) to understand how data is captured from the lotus node
- [src/pages/Market/index.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/702255e6add860843d33bbd8373c5db8e3ad40ac/src/pages/Market/index.js) to see how Markets page functionality is displayed in the UI

The following instructions illustrate how to perform these functions.

### Markets Page: Your Balance

The filecoin token (FIL) is the medium of exchange for storage on the Filecoin network. When you spin up [lotus-devnet](https://github.com/filecoin-shipyard/lotus-devnet) (and thus a local lotus node), your lotus node’s default wallet is seeded with a 500,000 FIL balance for testing on the devnet. FIL can be used to transact with other Filecoin network participants.

1. **Install a Filecoin unit conversion library:** In the core lotus API, most methods concerning balances return values in attoFIL (where 1 FIL = 10^18 attoFIL). To display the balance in FIL, install and import the [filecoin-number library](https://github.com/openworklabs/filecoin-number) using [NPM](https://www.npmjs.com/package/@openworklabs/filecoin-number) (`@openworklabs/filecoin-number`).

```bash
npm i @openworklabs/filecoin-number
```

2. **Get your wallet information:** In [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js), create a command called `getWalletDetails`.

`getWalletDetails` retrieves your wallet address using `nodeClient.walletDefaultAddress`, which returns the default wallet address associated with your node.

`getWalletDetails` retrieves your wallet’s balance using `nodeClient.walletBalance`. Ordinarily, this function returns the balance in attoFIL. We use the `toFIL` function to convert the balance to FIL units.

```
import { FilecoinNumber } from "@openworklabs/filecoin-number";
```

```jsx
export const getWalletDetails = () => async dispatch => {
  const nodeClient = getClient({ nodeNumber: 0, nodeOrMiner: 'node' })
  const defaultWalletAddress = await nodeClient.walletDefaultAddress()
  const balance = await nodeClient.walletBalance(defaultWalletAddress)
  const filBalance = new FilecoinNumber(balance, 'attofil')
  dispatch({
    type: types.GET_WALLET_DETAILS,
    payload: {
      address: defaultWalletAddress,
      balance: filBalance.toFil()
    }
  })
}
```

The wallet balance on this page will update as you create deals and pay for storage.

3. **Display your wallet information in the UI:** In [src/pages/Market/index.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/local/src/pages/Market/index.js#L50), use `getWalletDetails` to display your wallet address and balance.

```jsx
;<h3>Your Balance</h3>
{
  /* <button onClick={getWalletDetails}>Refresh Balance</button> */
}
{
  wallet ? (
    <div>
      <b>Wallet Address: </b> {wallet.address} <br />
      <b>Balance: </b> {wallet.balance} {' FIL'}
    </div>
  ) : (
    <span>Loading...</span>
  )
}
```

### Markets Page: Store File on Filecoin Network

Look at:

- [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js) to understand how data is captured from the lotus node
- [src/pages/Market/index.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/702255e6add860843d33bbd8373c5db8e3ad40ac/src/pages/Market/index.js) to see how Markets page functionality is displayed in the UI

::: tip
Remember that the devnet is a local network that has been configured to work with small sectors. Only store small files (under 2KiB) on the local devnet.
:::

There are two main ways to store a file on the Filecoin network:

- Importing a local file into the lotus node for storage, then make a storage deal
- Make a storage deal for data that is stored in IPFS. This is the process used in the sample application.

To make a storage deal for data that is stored in IPFS:

- First store the file on the public IPFS network.
- This will return a CID for the file.
- Using the IPFS & lotus integration, create a Filecoin storage deal for the file using the same CID.

1. **Setup IPFS API client:** In [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js#L4), import the ipfs object returned by the `js-ipfs-http-client` in the [src/utils/ipfs.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/local/src/utils/ipfs.js#L3) file.

```js
import { ipfs } from '../../utils/ipfs'
```

2. **Create a method to upload the file to Filecoin:** In [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js#L59), create a method called `uploadToFilecoin`.

```jsx
export const uploadToFilecoin = payload => async dispatch => {
  // Adding file to IPFS
  const nodeClient = getClient({ nodeNumber: 0, nodeOrMiner: 'node' })

  for await (const result of ipfs.add(payload.fileBuffer)) {
    // Creating a Storage Deal with a Miner
    const dataRef = {
      Data: {
        TransferType: 'graphsync',
        Root: {
          '/': result.path
        },
        PieceCid: null,
        PieceSize: 0
      },
      Wallet: payload.defaultWalletAddress,
      Miner: payload.targetMiner,
      EpochPrice: payload.epochPrice,
      MinBlocksDuration: 300
    }

    const deal = await nodeClient.clientStartDeal(dataRef)

    document.getElementById('uploadToFilecoin').innerText =
      'Upload to Filecoin Network'

    dispatch({
      type: types.ADD_DATA_TO_FILECOIN,
      payload: {
        id: deal['/'],
        cid: result.path
      }
    })
  }
}
```

In this method, notice that you:

- Store the file on the public IPFS network with the `ipfs.add` function. The function returns an async iterable that yields objects describing the added data.
- Use a `for await` function to iterate over the data you added using `ipfs.add`, creating a `dataRef` object.
- Specify Filecoin storage deal parameters in the `dataRef` object, such as:
  - 1. `Data` : Information related to the data you want to store.
    - a) `TransferType`: The protocol used to transfer data to the miner
    - b) `Root`: The cid to store in a deal or retrieve
    - c) `PieceCid`: Optional
    - d) `PieceSize`: Optional
  - 2. `Wallet`: Address of the wallet which will be charged for the storage deal. This is your default address.
  - 3. `Miner`: ID of the preferred miner for storing the data.
  - 4. `EpochPrice`: Price (in attoFIL) per block/epoch (currently one epoch is 25 seconds) that you are willing to pay to store the data.
  - 5. `MinBlocksDuration`: The minimum duration for the storage deal, in block time.
- Make a storage deal on the Filecoin network using the `nodeClient.clientStartDeal` function with the `dataRef` object.

3. **Display file storage information in the UI:** In [src/pages/Market/index.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/local/src/pages/Market/index.js#L62), use `uploadToFilecoin` to trigger the file storage workflow for storage on IPFS and Filecoin.

```jsx
<h3>Store File on Filecoin Network</h3>
<input type="file" id="fileToUpload"></input>
<button
  id="uploadToFilecoin"
  onClick={() => {
    const file = document.getElementById("fileToUpload").files[0];
    var arrayBuffer, uint8Array;
    var fileReader = new FileReader();
    fileReader.onload = function () {
      arrayBuffer = this.result;
      uint8Array = new Uint8Array(arrayBuffer);
      uploadToFilecoin({
        fileBuffer: uint8Array,
        defaultWalletAddress: wallet.address,
        targetMiner: miner.minerList ? miner.minerList[0].name : "t01000",
        epochPrice: "2500",
      });
      document.getElementById("uploadToFilecoin").innerText =
        "Sending Deal...";
    };
    fileReader.readAsArrayBuffer(file);
  }}
>
  Upload to Filecoin Network
</button>
```

::: tip
Note that the local devnet has only 1 (fake) miner that can store your data -- as we saw in the Miners page. Therefore, by default, you choose that miner in this example. On testnet and mainnet, there will be thousands of available miners. When creating your app, you will need to provide your users with a way to select miners to store their data. You might choose to provide selection criteria such as cost, replication factor, geographical location, miner uptime, and reputation.
:::

::: tip
Once you have started a storage deal, notice that your wallet balance is slightly reduced. This is to pay both for the gas cost of the message that goes on-chain and to pay for the actual cost of storage. To check your wallet balance at regular intervals, use the `setInterval` function with `getWalletDetails`.
:::

### Markets Page: Deal Status

Look at:

- [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js) to understand how data is captured from the lotus node
- [src/pages/Market/index.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/702255e6add860843d33bbd8373c5db8e3ad40ac/src/pages/Market/index.js) to see how Markets page functionality is displayed in the UI

1. **Create a method to list all deals for your node:** In [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js#L94), create a method called `getClientDeals`. Use the `nodeClient.clientListDeals` function to return the `clientDeals` array of all storage deals made through your lotus node (i.e. `nodeNumber: 0`).

```jsx
export const getClientDeals = () => async dispatch => {
  const nodeClient = getClient({ nodeNumber: 0, nodeOrMiner: 'node' })
  let clientDeals = await nodeClient.clientListDeals()
  clientDeals = clientDeals.map(deal => {
    let color
    switch (deal.State) {
      case 6:
        color = 'green'
        break
      case 22:
        color = 'red'
        break
      default:
        color = 'grey'
        break
    }
    return { ...deal, stateName: dealStateNames[deal.State], color: color }
  })
  dispatch({
    type: types.GET_CLIENT_DEALS,
    payload: clientDeals.sort(dynamicsort('DealID'))
  })
}
```

Once the storage deal has been triggered, it goes through various stages (listed in [src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/redux/actions/lotus.js#L7)):

```js
const dealStateNames = [
  // go-fil-markets/storagemarket/types.go
  'Unknown', // 0
  'ProposalNotFound', // 1
  'ProposalRejected', // 2
  'ProposalAccepted', // 3
  'Staged', // 4
  'Sealing', // 5
  'Active', // 6
  'Failing', // 7
  'NotFound', // 8
  // Internal
  'FundsEnsured', // 9 Deposited funds as neccesary to create a deal, ready to move forward
  'WaitingForDataRequest', // 10 Client is waiting for a request for the deal data
  'Validating', // 11 Verifying that deal parameters are good
  'AcceptWait', // 12 Deciding whether or not to accept the deal
  'Transferring', // 13 Moving data
  'WaitingForData', // 14 Manual transfer
  'VerifyData', // 15 Verify transferred data - generate CAR / piece data
  'EnsureProviderFunds', // 16 Ensuring that provider collateral is sufficient
  'EnsureClientFunds', // 17 Ensuring that client funds are sufficient
  'ProviderFunding', // 18 Waiting for funds to appear in Provider balance
  'ClientFunding', // 19 Waiting for funds to appear in Client balance
  'Publish', // 20 Publishing deal to chain
  'Publishing', // 21 Waiting for deal to appear on chain
  'Error', // 22 deal failed with an unexpected error
  'Completed' // 23 on provider side, indicates deal is active and info for retrieval is recorded
]
```

The `getClientDeals` function contains a switch case that determines the color of the state text in the UI according to the value of `deal.State` (`Active` = green, `Error` = red, all other states are grey). To poll deal state at regular intervals, use the `setInterval` function with `getClientDeals`.

If the deal is successful, the button will show an "Active" deal state (`deal.State = 6`) and the button text will show up green. Note that the request takes some time to execute (a few minutes in the case of devnet, and as long as several hours in the case of testnet and mainnet).

2. **Display deal state information in the UI:** In [src/pages/Market/index.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/702255e6add860843d33bbd8373c5db8e3ad40ac/src/pages/Market/index.js#L87), use the `deals` object to display information from `getClientDeals`.

```jsx
;<h3>Deal Status</h3>
{
  market.length !== 0 ? (
    deals.map((deal, index) => {
      if (recentProposalCIDs.includes(deal.ProposalCid['/'])) {
        return (
          <div key={index} className="card" style={{ width: '48rem' }}>
            <div className="card-body">
              <h5 className="card-title">DealID: {deal.DealID}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Status: <font color={deal.color}>{deal.stateName}</font>
              </h6>
              <div className="card-text">
                {deal.Message.length !== 0 ? (
                  <p>
                    <font color="red">
                      <b>Error: {deal.Message}</b>
                    </font>
                  </p>
                ) : null}
                <p>
                  <b>CID: </b>
                  <a
                    href={`https://ipfs.io/ipfs/${
                      proposalCidToCID[deal.ProposalCid['/']]
                    }`}
                    target="_blank">
                    {proposalCidToCID[deal.ProposalCid['/']]}
                  </a>
                </p>
                <p>
                  <b>Piece CID: </b>
                  {deal.PieceCID['/']}
                </p>
                <p>
                  <b>Duration: </b>
                  {deal.Duration}
                </p>
                <p>
                  <b>Price Per Epoch: </b>
                  {deal.PricePerEpoch}
                </p>
                <p>
                  <b>Provider: </b>
                  <Link to={`/miner/${deal.Provider}`}>{deal.Provider}</Link>
                </p>
                <p>
                  <b>File Size: </b>
                  {deal.Size}
                </p>
              </div>
              <ReactJson src={deal} collapsed={true} name="Deal Details" />
            </div>
          </div>
        )
      }
    })
  ) : (
    <p>
      No Recent Deals. Upload something to Filecoin Network to see sweet-sweet
      deals :)
    </p>
  )
}
```

And voila! A successful deal.

![When a deal has been successfully made, the application shows the deal information in the "Deal Status" section.](./images/active-deal.png)

## Markets Page: Fetching Data

Look at:

- [filecoin-network-inspector/local/src/pages/Market/index.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/local/src/pages/Market/index.js): To understand how the UI works.
- [filecoin-network-inspector/src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/local/src/redux/actions/lotus.js): To understand how to create and execute a retrieval deal.

1. **Fetching Data from the IPFS Network**: In [filecoin-network-inspector/src/pages/Market/index.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/local/src/pages/Market/index.js#L111), a link redirects the user to the HTTP gateway, which fetches the CID (`proposalCidToCID[deal.ProposalCid['/']]`) data from the go-ipfs IPFS node.

```jsx
<a
  href={`http://localhost:8080/ipfs/${proposalCidToCID[deal.ProposalCid['/']]}`}
  target="_blank">
  {proposalCidToCID[deal.ProposalCid['/']]}
</a>
```

::: tip
There is no fee for retrieving data from IPFS.
:::

2. **Fetching data from the Filecoin Network**

To fetch data from Filecoin, you must create a retrieval deal with a node. It’s best to create a deal with a node that is storing the file, but you can create the retrieval deal with any Lotus node. Usually you will first scan the nodes to find the best one for making the deal, but that is unnecessary on the devnet as there is only one node.

To fetch data from Filecoin you will perform the following functions, described below:

1. Check for nodes that host the data you wish to receive.
2. Choose several nodes that could retrieve the data, and ask them for an offer for the retrieval.
3. Choose the node you want to fetch the data.
4. Create and execute an retreival offer.

### Step 1: Checking for nodes that host the data

In [filecoin-network-inspector/src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/local/src/redux/actions/lotus.js#L134), to check if a lotus node has your data locally, use the `nodeClient.clientHasLocal` function.

```js
// Check if the cid is available locally on the node or not
const hasLocal = await nodeClient.clientHasLocal({ '/': payload.cid })
```

This function will return `hasLocal`, a boolean value indicating whether a particular node has your data or not.

### Step 2: Request offers for data retrieval

In [filecoin-network-inspector/src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/local/src/redux/actions/lotus.js#L137), to check what node gives you the best deal for data retrieval, select a suitable nodes to query via `nodeClient.clientFindData` function to get an offer.

::: tip
As the setup used in this example only has 1 node, we query only 1 node. In case of devnet or mainnet, you would need to query more nodes to find a suitable retrieval offer.
:::

```js
// Fetch the retrieval offer from the lotus node
const offers = await nodeClient.clientFindData({ '/': payload.cid })
```

The `offers` array can have multiple offers. Following is an example of a single offer:

```json
{
  "Err": "",
  "Root": { "/": "QmZvDXX1ng6hKocK1HsnE2Ma8tTNBeSwoGjKLBqSfXuvjt" },
  "Size": 2032,
  "MinPrice": "4064",
  "PaymentInterval": 1048576,
  "PaymentIntervalIncrease": 1048576,
  "Miner": "t0100",
  "MinerPeerID": "12D3KooWQ2uwA1r6X3Gb2iYvChhHQXLzLEdKfwrv3uZiRMCssRTM"
}
```

Following is an explanation of the fields in the offer:

- `Err`: Error message.
- `Root`: The CID of the data to be retrieved.
- `Size`: Size of data to be retrieved in bytes.
- `MinPrice`: The minimum price at which the lotus node is willing to create a retrieval deal in FIL.
- `PaymentInterval`: TODO
- `PaymentIntervalIncrease`: TODO
- `Miner`: The name of the miner.
- `MinerPeerID`: PeerID of the miner.

### Step 3: Choose the node for data retrieval

Based on the offers you receive choose the node (`Miner`, `MinerPeerID`) for the retrieval deal.

### Step 4: Create a retrieval offer

In [filecoin-network-inspector/src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/local/src/redux/actions/lotus.js#L139), the retrieval offer is your order for the data retrieval. When it is executed, the file is retrieved and you are charged the fee that you agreed upon for the retrieval. Following is an example of a `retrievalOffer`:

```js
const retrievalOffer = {
  Root: offers[0].Root,
  Size: offers[0].Size,
  Total: offers[0].MinPrice,
  PaymentInterval: offers[0].PaymentInterval,
  PaymentIntervalIncrease: offers[0].PaymentIntervalIncrease,
  Client: payload.walletAddress,
  Miner: offers[0].Miner,
  MinerPeerID: offers[0].MinerPeerID
}
```

The retrieval offer contains the data of the node you choose, based on the `offers` array.

### Step 5: Create the retrieval deal

In [filecoin-network-inspector/src/redux/actions/lotus.js](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/local/src/redux/actions/lotus.js#L150),create the retrieval deal using `retrieveClient.clientRetrieve` function:

```js
const error = await nodeClient.clientRetrieve(retrievalOffer, null)
if (!error) {
  document.getElementById('fetchData').innerText = 'Data fetched Successfully'
  window.open(`http://localhost:7070/ipfs/${payload.cid}`, '_blank')
} else {
  document.getElementById('fetchData').innerText =
    'Error while fetching data. Try again.'
}
```

The `nodeClient.clientRetrieve` function executes the retrieval deal according to the conditions in `retrievalOffer` parameter and returns `error`, if there is one.

If there is no error, open a new browser tab using `window.open` with the URL: `http://localhost:7070/ipfs/${payload.cid}`. This URL fetches the retrieved data from the HTTP gateway endpoint exposed on port `7070` via the IPFS integration, [as discussed in step 1](./step-1-start-lotus-devnet-and-go-ipfs.md).

::: tip
This may take a few seconds on devnet, but it will take much longer on the mainnet.
:::

## Step 4d: Deals Page

The Deals page of the application displays the same information as the Deal Status page, but feel free to poke around the [Deals page source code](https://github.com/filecoin-shipyard/filecoin-network-inspector/blob/a94747f4967db2cde8bc563aa96675926d9c3193/src/pages/Deals/index.js) as well.
