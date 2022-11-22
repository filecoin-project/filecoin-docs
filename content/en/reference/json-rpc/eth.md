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

Use the `eth_accounts` functions to generate Ethereum accounts and sign transactions and data. `eth_accounts` will always return and empty array `[]` since Filecoin does not manage Ethereum private keys.

Perms: read

Inputs: `null`

Example:

```curl
curl --location --request POST '<NODE_ADDRESS>' \
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

<!-- TODO: find out where this came from. I can't find it in Eth docs. -->
## EthBlockNumber

EthBlockNumber returns the height of the latest (heaviest) tipset.

Perms: read

Inputs: `null`

Example:

```shell
curl --location --request POST 'https://wallaby.node.glif.io/rpc/v0' \                                         ~
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

## EthCall

Perms: read

Inputs:

```json
[
  {
    "from": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
    "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
    "gas": "0x5",
    "gasPrice": "0x0",
    "value": "0x0",
    "data": "0x07"
  },
  "string value"
]
```

Response: `"0x07"`

## EthChainId

Perms: read

Inputs: `null`

Response: `"0x5"`

## EthEstimateGas

Perms: read

Inputs:

```json
[
  {
    "from": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
    "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
    "gas": "0x5",
    "gasPrice": "0x0",
    "value": "0x0",
    "data": "0x07"
  }
]
```

Response: `"0x5"`

## EthFeeHistory

Perms: read

Inputs:

```json
[
  "0x5",
  "string value",
  [
    9
  ]
]
```

Response:

```json
{
  "oldestBlock": 42,
  "baseFeePerGas": [
    "0x0"
  ],
  "gasUsedRatio": [
    12.3
  ],
  "reward": []
}
```

## EthGasPrice

Perms: read

Inputs: `null`

Response: `"0x0"`

## EthGetBalance

Perms: read

Inputs:

```json
[
  "0x0707070707070707070707070707070707070707",
  "string value"
]
```

Response: `"0x0"`

## EthGetBlockByHash

Perms: read

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

Perms: read

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

Perms: read

Inputs:

```json
[
  "0x0707070707070707070707070707070707070707070707070707070707070707"
]
```

Response: `"0x5"`

## EthGetBlockTransactionCountByNumber

EthGetBlockTransactionCountByNumber returns the number of messages in the TipSet

Perms: read

Inputs:

```json
[
  "0x5"
]
```

Response: `"0x5"`

## EthGetCode

Perms: read

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

Perms: write

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

Perms: write

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

Perms: read

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

Perms: read

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

Perms: read

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

Perms: read

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

Perms: read

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

Perms: read

Inputs:

```json
[
  "0x0707070707070707070707070707070707070707",
  "string value"
]
```

Response: `"0x5"`

## EthGetTransactionReceipt

Perms: read

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

Perms: read

Inputs: `null`

Response: `"0x0"`

## EthNewBlockFilter

Installs a persistent filter to notify when a new block arrives.

Perms: write

Inputs: `null`

Response: `"c5564560217c43e4bc0484df655e9019"`

## EthNewFilter

Installs a persistent filter based on given filter spec.

Perms: write

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

Perms: write

Inputs: `null`

Response: `"c5564560217c43e4bc0484df655e9019"`

## EthProtocolVersion

Perms: read

Inputs: `null`

Response: `"0x5"`

## EthSendRawTransaction

Perms: read

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

Perms: write

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

Perms: write

Inputs:

```json
[
  "c5564560217c43e4bc0484df655e9019"
]
```

Response: `true`

## EthUnsubscribe

Unsubscribe from a websocket subscription

Perms: write

Inputs:

```json
[
  "b62df77831484129adf6682332ad0725"
]
```

Response: `true`
