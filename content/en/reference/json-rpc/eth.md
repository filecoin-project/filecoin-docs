---
title: "Eth"
description: "These methods are used for Ethereum-compatible JSON-RPC calls."
lead: "These methods are used for Ethereum-compatible JSON-RPC calls. For in-depth information on each of these methods, take a look at the [official Ethereum API documentation](https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html)."
menu:
    reference:
             parent: "reference-json-rpc"
toc: true
---

## EthAccounts

This method is intended to return a list of addresses owned by client. However, `eth_accounts` will always return and empty array `[]` since Filecoin does not manage Ethereum private keys.

- Permissions: read
- Inputs: none

Example:

```curl
curl --location --request POST 'https://wallaby.node.glif.io/rpc/v0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_accounts",
    "params":[],
    "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "result": [],
  "id": 1
}
```

## EthBlockNumber

Returns the number of most recent block.

- Permissions: read
- Inputs: none

Example:

```curl
curl --location --request POST 'https://wallaby.node.glif.io/rpc/v0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_blockNumber",
    "params":[],
    "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "result": "0x3bb7",
  "id": 1
}
```

<!-- TODO: find an example of this function working. -->
<!-- ## EthCall -->

<!-- Executes a new message call immediately without creating a transaction on the blockchain. -->

<!-- - Permissions: read -->
<!-- - Input: -->
<!--     1. Object - The transaction call object: -->
<!--         - from: DATA, 20 Bytes - (optional) The address the transaction is sent from. -->
<!--         - to: DATA, 20 Bytes - The address the transaction is directed to. -->
<!--         - gas: QUANTITY - (optional) Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions. -->
<!--         - gasPrice: QUANTITY - (optional) Integer of the gasPrice used for each paid gas -->
<!--         - value: QUANTITY - (optional) Integer of the value sent with this transaction -->
<!--         - data: DATA - (optional) Hash of the method signature and encoded parameters. For details see [Ethereum Contract ABI in the Solidity documentation](https://docs.soliditylang.org/en/latest/abi-spec.html) -->
<!--     1. QUANTITY|TAG - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`. See the [default block parameter](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block-parameter). -->

<!-- Inputs: -->

<!-- ```json -->
<!-- [ -->
<!--   { -->
<!--     "from": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031", -->
<!--     "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031", -->
<!--     "gas": "0x5", -->
<!--     "gasPrice": "0x0", -->
<!--     "value": "0x0", -->
<!--     "data": "0x07" -->
<!--   }, -->
<!--   "latest" -->
<!-- ] -->
<!-- ``` -->

<!-- Response: `"0x07"` -->

## EthChainId

Returns the currently configured chain ID, a value used in replay-protected transaction signing as introduced by EIP-155.

- Permissions: read
- Inputs: none

Example:

```curl
curl --location --request POST 'https://wallaby.node.glif.io/rpc/v0' \    src/languages update/json-rpc-examples
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_chainId",
    "params":[],
    "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "result": "0x7ab7",
  "id": 1
}
```

<!-- TODO: find out how to perform this call. -->
<!-- ## EthEstimateGas -->

<!-- Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance. -->

<!-- - Permissions: read -->
<!-- - Inputs: -->

<!-- Example: -->

<!-- ```curl -->
<!-- curl --location --request POST 'https://wallaby.node.glif.io/rpc/v0' \ -->
<!--     --header 'Content-Type: application/json' \ -->
<!--     --data-raw '{ -->
<!--         "jsonrpc":"2.0", -->
<!--         "method":"eth_estimateGas", -->
<!--         "params":[{ -->
<!--             "from": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031", -->
<!--             "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031", -->
<!--             "gas": "0x5", -->
<!--             "gasPrice": "0x0", -->
<!--             "value": "0x0", -->
<!--             "data": "0x07" -->
<!--         }], -->
<!--         "id":1 -->
<!--     }' | jq -->
<!-- ``` -->

<!-- ```json -->
<!-- { -->
<!--   "jsonrpc": "2.0", -->
<!--   "id": 1, -->
<!--   "error": { -->
<!--     "code": 1, -->
<!--     "message": "CallWithGas failed: call raw get actor: resolution lookup failed (t410fls7oz6m5h7nt6jpdbhgcmtzeboygmqbr55tzfdq): resolve address t410fls7oz6m5h7nt6jpdbhgcmtzeboygmqbr55tzfdq: actor not found" -->
<!--   } -->
<!-- } -->
<!-- ``` -->

<!-- TODO: find out how to make this one work. -->
## EthFeeHistory

Returns a collection of historical gas information.

- Permissions: read
- Inputs:
    - `BLOCKCOUNT` - Number of blocks in the requested range. Between 1 and 1024 blocks can be requested in a single query. Less than requested may be returned if not all blocks are available.
    - `NEWESTBLOCK` - Highest number block of the requested range.
    - `REWARDPERCENTILES` - (optional) A monotonically increasing list of percentile values to sample from each block's effective priority fees per gas in ascending order, weighted by gas used.
- Returns:
    - `object`:
        - `OLDESTBLOCK` - Lowest number block of the returned range.
        - `BASEFEEPERGAS` - An array of block base fees per gas. This includes the next block after the newest of the returned range, because this value can be derived from the newest block. Zeroes are returned for pre-EIP-1559 blocks.
        - `GASUSEDRATIO` - An array of block gas used ratios. These are calculated as the ratio of gasUsed and gasLimit.
        - `REWARD` - (Optional) An array of effective priority fees per gas data points from a single block. All zeroes are returned if the block is empty.

Example:

```curl
curl --location --request POST 'https://wallaby.node.glif.io/rpc/v0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_feeHistory",
    "params": [ "0x5", "latest", [ 0 ] ],
    "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "result": {
    "oldestBlock": 15510,
    "baseFeePerGas": [
      "0x64",
      "0x64",
      "0x64",
      "0x64",
      "0x64",
      "0x64"
    ],
    "gasUsedRatio": [
      0,
      0,
      0.0024320284,
      0,
      0
    ]
  },
  "id": 1
}
```

## EthGasPrice

Returns the current price per gas in wei.

- Permissions: read
- Inputs: none

Example:

```curl
curl --location --request POST 'https://wallaby.node.glif.io/rpc/v0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_gasPrice",
    "params": [],
    "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "result": "0x30bbf",
  "id": 1
}
```

## EthGetBalance

Permissions: read

Inputs:

```json
[
  "0x0707070707070707070707070707070707070707",
  "string value"
]
```

Response: `"0x0"`

## EthGetBlockByHash

Permissions: read

Inputs:

```json
[
  "0x0707070707070707070707070707070707070707070707070707070707070707",
  true
]
```

Response:

```json
{
  "hash": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "parentHash": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "sha3Uncles": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "miner": "0x0707070707070707070707070707070707070707",
  "stateRoot": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "transactionsRoot": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "receiptsRoot": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "difficulty": "0x5",
  "totalDifficulty": "0x5",
  "number": "0x5",
  "gasLimit": "0x5",
  "gasUsed": "0x5",
  "timestamp": "0x5",
  "extraData": "Ynl0ZSBhcnJheQ==",
  "mixHash": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "nonce": "0x0707070707070707",
  "baseFeePerGas": "0x0",
  "size": "0x5",
  "transactions": [
    {}
  ],
  "uncles": [
    "0x0707070707070707070707070707070707070707070707070707070707070707"
  ]
}
```

## EthGetBlockByNumber

Permissions: read

Inputs:

```json
[
  "string value",
  true
]
```

Response:

```json
{
  "hash": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "parentHash": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "sha3Uncles": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "miner": "0x0707070707070707070707070707070707070707",
  "stateRoot": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "transactionsRoot": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "receiptsRoot": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "difficulty": "0x5",
  "totalDifficulty": "0x5",
  "number": "0x5",
  "gasLimit": "0x5",
  "gasUsed": "0x5",
  "timestamp": "0x5",
  "extraData": "Ynl0ZSBhcnJheQ==",
  "mixHash": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "nonce": "0x0707070707070707",
  "baseFeePerGas": "0x0",
  "size": "0x5",
  "transactions": [
    {}
  ],
  "uncles": [
    "0x0707070707070707070707070707070707070707070707070707070707070707"
  ]
}
```

## EthGetBlockTransactionCountByHash

EthGetBlockTransactionCountByHash returns the number of messages in the TipSet

Permissions: read

Inputs:

```json
[
  "0x0707070707070707070707070707070707070707070707070707070707070707"
]
```

Response: `"0x5"`

## EthGetBlockTransactionCountByNumber

EthGetBlockTransactionCountByNumber returns the number of messages in the TipSet

Permissions: read

Inputs:

```json
[
  "0x5"
]
```

Response: `"0x5"`

## EthGetCode

Permissions: read

Inputs:

```json
[
  "0x0707070707070707070707070707070707070707",
  "string value"
]
```

Response: `"0x07"`

## EthGetFilterChanges

Polling method for a filter, returns event logs which occurred since last poll.
(requires write perm since timestamp of last filter execution will be written)

Permissions: write

Inputs:

```json
[
  "c5564560217c43e4bc0484df655e9019"
]
```

Response:

```json
[
  {}
]
```

## EthGetFilterLogs

Returns event logs matching filter with given id.
(requires write perm since timestamp of last filter execution will be written)

Permissions: write

Inputs:

```json
[
  "c5564560217c43e4bc0484df655e9019"
]
```

Response:

```json
[
  {}
]
```

## EthGetLogs

Returns event logs matching given filter spec.

Permissions: read

Inputs:

```json
[
  {
    "fromBlock": "2301220",
    "address": [
      "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031"
    ],
    "topics": null
  }
]
```

Response:

```json
[
  {}
]
```

## EthGetStorageAt

Permissions: read

Inputs:

```json
[
  "0x0707070707070707070707070707070707070707",
  "0x07",
  "string value"
]
```

Response: `"0x07"`

## EthGetTransactionByBlockHashAndIndex

Permissions: read

Inputs:

```json
[
  "0x0707070707070707070707070707070707070707070707070707070707070707",
  "0x5"
]
```

Response:

```json
{
  "chainId": "0x5",
  "nonce": "0x5",
  "hash": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "blockHash": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "blockNumber": "0x5",
  "transacionIndex": "0x5",
  "from": "0x0707070707070707070707070707070707070707",
  "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "value": "0x0",
  "type": "0x5",
  "input": "0x07",
  "gas": "0x5",
  "maxFeePerGas": "0x0",
  "maxPriorityFeePerGas": "0x0",
  "v": "0x07",
  "r": "0x07",
  "s": "0x07"
}
```

## EthGetTransactionByBlockNumberAndIndex

Permissions: read

Inputs:

```json
[
  "0x5",
  "0x5"
]
```

Response:

```json
{
  "chainId": "0x5",
  "nonce": "0x5",
  "hash": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "blockHash": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "blockNumber": "0x5",
  "transacionIndex": "0x5",
  "from": "0x0707070707070707070707070707070707070707",
  "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "value": "0x0",
  "type": "0x5",
  "input": "0x07",
  "gas": "0x5",
  "maxFeePerGas": "0x0",
  "maxPriorityFeePerGas": "0x0",
  "v": "0x07",
  "r": "0x07",
  "s": "0x07"
}
```

## EthGetTransactionByHash

Permissions: read

Inputs:

```json
[
  "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"
]
```

Response:

```json
{
  "chainId": "0x5",
  "nonce": "0x5",
  "hash": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "blockHash": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "blockNumber": "0x5",
  "transacionIndex": "0x5",
  "from": "0x0707070707070707070707070707070707070707",
  "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "value": "0x0",
  "type": "0x5",
  "input": "0x07",
  "gas": "0x5",
  "maxFeePerGas": "0x0",
  "maxPriorityFeePerGas": "0x0",
  "v": "0x07",
  "r": "0x07",
  "s": "0x07"
}
```

## EthGetTransactionCount

Permissions: read

Inputs:

```json
[
  "0x0707070707070707070707070707070707070707",
  "string value"
]
```

Response: `"0x5"`

## EthGetTransactionReceipt

Permissions: read

Inputs:

```json
[
  "0x0707070707070707070707070707070707070707070707070707070707070707"
]
```

Response:

```json
{
  "transactionHash": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "transactionIndex": "0x5",
  "blockHash": "0x0707070707070707070707070707070707070707070707070707070707070707",
  "blockNumber": "0x5",
  "from": "0x0707070707070707070707070707070707070707",
  "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "status": "0x5",
  "contractAddress": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "cumulativeGasUsed": "0x5",
  "gasUsed": "0x5",
  "effectiveGasPrice": "0x0",
  "logsBloom": "0x07",
  "logs": [
    {
      "address": "0x0707070707070707070707070707070707070707",
      "data": "0x07",
      "topics": [
        "0x07"
      ],
      "removed": true,
      "logIndex": "0x5",
      "transactionIndex": "0x5",
      "transactionHash": "0x0707070707070707070707070707070707070707070707070707070707070707",
      "blockHash": "0x0707070707070707070707070707070707070707070707070707070707070707",
      "blockNumber": "0x5"
    }
  ],
  "type": "0x5"
}
```

## EthMaxPriorityFeePerGas

Permissions: read

Inputs: none

Response: `"0x0"`

## EthNewBlockFilter

Installs a persistent filter to notify when a new block arrives.

Permissions: write

Inputs: none

Response: `"c5564560217c43e4bc0484df655e9019"`

## EthNewFilter

Installs a persistent filter based on given filter spec.

Permissions: write

Inputs:

```json
[
  {
    "fromBlock": "2301220",
    "address": [
      "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031"
    ],
    "topics": null
  }
]
```

Response: `"c5564560217c43e4bc0484df655e9019"`

## EthNewPendingTransactionFilter

Installs a persistent filter to notify when new messages arrive in the message pool.

Permissions: write

Inputs: none

Response: `"c5564560217c43e4bc0484df655e9019"`

## EthProtocolVersion

Permissions: read

Inputs: none

Response: `"0x5"`

## EthSendRawTransaction

Permissions: read

Inputs:

```json
[
  "0x07"
]
```

Response: `"0x0707070707070707070707070707070707070707070707070707070707070707"`

## EthSubscribe

Subscribe to different event types using websockets
eventTypes is one or more of:
    - newHeads: notify when new blocks arrive.
    - pendingTransactions: notify when new messages arrive in the message pool.
    - logs: notify new event logs that match a criteria
params contains additional parameters used with the log event type
The client will receive a stream of EthSubscriptionResponse values until EthUnsubscribe is called.

Permissions: write

Inputs:

```json
[
  "string value",
  {
    "topics": [
      [
        "0x0707070707070707070707070707070707070707070707070707070707070707"
      ]
    ]
  }
]
```

Response:

```json
{
  "subscription": "b62df77831484129adf6682332ad0725",
  "result": {}
}
```

## EthUninstallFilter

Uninstalls a filter with given id.

Permissions: write

Inputs:

```json
[
  "c5564560217c43e4bc0484df655e9019"
]
```

Response: `true`

## EthUnsubscribe

Unsubscribe from a websocket subscription

Permissions: write

Inputs:

```json
[
  "b62df77831484129adf6682332ad0725"
]
```

Response: `true`
