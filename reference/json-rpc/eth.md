## Eth

These methods are used for Ethereum-compatible JSON-RPC calls

EthAccounts will always return [] since we don't expect Lotus to manage private keys

### EthAccounts

There are not yet any comments for this method.

Perms: read

Inputs: `null`

Response:

```json
["0x5cbeecf99d3fdb3f25e309cc264f240bb0664031"]
```

### EthAddressToFilecoinAddress

EthAddressToFilecoinAddress converts an EthAddress into an f410 Filecoin Address

Perms: read

Inputs:

```json
["0x5cbeecf99d3fdb3f25e309cc264f240bb0664031"]
```

Response: `"f01234"`

### EthBlockNumber

EthBlockNumber returns the height of the latest (heaviest) TipSet

Perms: read

Inputs: `null`

Response: `"0x5"`

### EthCall

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

### EthChainId

Perms: read

Inputs: `null`

Response: `"0x5"`

### EthEstimateGas

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

### EthFeeHistory

Perms: read

Inputs:

```json
["Bw=="]
```

Response:

```json
{
  "oldestBlock": "0x5",
  "baseFeePerGas": ["0x0"],
  "gasUsedRatio": [12.3],
  "reward": []
}
```

### EthGasPrice

Perms: read

Inputs: `null`

Response: `"0x0"`

### EthGetBalance

Perms: read

Inputs:

```json
["0x5cbeecf99d3fdb3f25e309cc264f240bb0664031", "string value"]
```

Response: `"0x0"`

### EthGetBlockByHash

Perms: read

Inputs:

```json
["0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e", true]
```

Response:

```json
{
  "hash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "parentHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "sha3Uncles": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "miner": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "stateRoot": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "transactionsRoot": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "receiptsRoot": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "logsBloom": "0x07",
  "difficulty": "0x5",
  "totalDifficulty": "0x5",
  "number": "0x5",
  "gasLimit": "0x5",
  "gasUsed": "0x5",
  "timestamp": "0x5",
  "extraData": "0x07",
  "mixHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "nonce": "0x0707070707070707",
  "baseFeePerGas": "0x0",
  "size": "0x5",
  "transactions": [{}],
  "uncles": [
    "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"
  ]
}
```

### EthGetBlockByNumber

Perms: read

Inputs:

```json
["string value", true]
```

Response:

```json
{
  "hash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "parentHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "sha3Uncles": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "miner": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "stateRoot": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "transactionsRoot": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "receiptsRoot": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "logsBloom": "0x07",
  "difficulty": "0x5",
  "totalDifficulty": "0x5",
  "number": "0x5",
  "gasLimit": "0x5",
  "gasUsed": "0x5",
  "timestamp": "0x5",
  "extraData": "0x07",
  "mixHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "nonce": "0x0707070707070707",
  "baseFeePerGas": "0x0",
  "size": "0x5",
  "transactions": [{}],
  "uncles": [
    "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"
  ]
}
```

### EthGetBlockTransactionCountByHash

EthGetBlockTransactionCountByHash returns the number of messages in the TipSet

Perms: read

Inputs:

```json
["0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"]
```

Response: `"0x5"`

### EthGetBlockTransactionCountByNumber

EthGetBlockTransactionCountByNumber returns the number of messages in the TipSet

Perms: read

Inputs:

```json
["0x5"]
```

Response: `"0x5"`

### EthGetCode

Perms: read

Inputs:

```json
["0x5cbeecf99d3fdb3f25e309cc264f240bb0664031", "string value"]
```

Response: `"0x07"`

### EthGetFilterChanges

Polling method for a filter, returns event logs which occurred since last poll.
(requires write perm since timestamp of last filter execution will be written)

Perms: read

Inputs:

```json
["0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"]
```

Response:

```json
[{}]
```

### EthGetFilterLogs

Returns event logs matching filter with given id.
(requires write perm since timestamp of last filter execution will be written)

Perms: read

Inputs:

```json
["0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"]
```

Response:

```json
[{}]
```

### EthGetLogs

Returns event logs matching given filter spec.

Perms: read

Inputs:

```json
[
  {
    "fromBlock": "2301220",
    "address": ["0x5cbeecf99d3fdb3f25e309cc264f240bb0664031"],
    "topics": null
  }
]
```

Response:

```json
[{}]
```

### EthGetMessageCidByTransactionHash

Perms: read

Inputs:

```json
["0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"]
```

Response:

```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### EthGetStorageAt

Perms: read

Inputs:

```json
["0x5cbeecf99d3fdb3f25e309cc264f240bb0664031", "0x07", "string value"]
```

Response: `"0x07"`

### EthGetTransactionByBlockHashAndIndex

Perms: read

Inputs:

```json
["0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e", "0x5"]
```

Response:

```json
{
  "chainId": "0x5",
  "nonce": "0x5",
  "hash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "blockHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "blockNumber": "0x5",
  "transactionIndex": "0x5",
  "from": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "value": "0x0",
  "type": "0x5",
  "input": "0x07",
  "gas": "0x5",
  "maxFeePerGas": "0x0",
  "maxPriorityFeePerGas": "0x0",
  "accessList": [
    "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"
  ],
  "v": "0x0",
  "r": "0x0",
  "s": "0x0"
}
```

### EthGetTransactionByBlockNumberAndIndex

Perms: read

Inputs:

```json
["0x5", "0x5"]
```

Response:

```json
{
  "chainId": "0x5",
  "nonce": "0x5",
  "hash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "blockHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "blockNumber": "0x5",
  "transactionIndex": "0x5",
  "from": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "value": "0x0",
  "type": "0x5",
  "input": "0x07",
  "gas": "0x5",
  "maxFeePerGas": "0x0",
  "maxPriorityFeePerGas": "0x0",
  "accessList": [
    "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"
  ],
  "v": "0x0",
  "r": "0x0",
  "s": "0x0"
}
```

### EthGetTransactionByHash

Perms: read

Inputs:

```json
["0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"]
```

Response:

```json
{
  "chainId": "0x5",
  "nonce": "0x5",
  "hash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "blockHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "blockNumber": "0x5",
  "transactionIndex": "0x5",
  "from": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "value": "0x0",
  "type": "0x5",
  "input": "0x07",
  "gas": "0x5",
  "maxFeePerGas": "0x0",
  "maxPriorityFeePerGas": "0x0",
  "accessList": [
    "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"
  ],
  "v": "0x0",
  "r": "0x0",
  "s": "0x0"
}
```

### EthGetTransactionByHashLimited

Perms: read

Inputs:

```json
["0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e", 10101]
```

Response:

```json
{
  "chainId": "0x5",
  "nonce": "0x5",
  "hash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "blockHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "blockNumber": "0x5",
  "transactionIndex": "0x5",
  "from": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "value": "0x0",
  "type": "0x5",
  "input": "0x07",
  "gas": "0x5",
  "maxFeePerGas": "0x0",
  "maxPriorityFeePerGas": "0x0",
  "accessList": [
    "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"
  ],
  "v": "0x0",
  "r": "0x0",
  "s": "0x0"
}
```

### EthGetTransactionCount

Perms: read

Inputs:

```json
["0x5cbeecf99d3fdb3f25e309cc264f240bb0664031", "string value"]
```

Response: `"0x5"`

### EthGetTransactionHashByCid

Perms: read

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `"0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"`

### EthGetTransactionReceipt

Perms: read

Inputs:

```json
["0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"]
```

Response:

```json
{
  "transactionHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "transactionIndex": "0x5",
  "blockHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "blockNumber": "0x5",
  "from": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "root": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "status": "0x5",
  "contractAddress": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "cumulativeGasUsed": "0x5",
  "gasUsed": "0x5",
  "effectiveGasPrice": "0x0",
  "logsBloom": "0x07",
  "logs": [
    {
      "address": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
      "data": "0x07",
      "topics": [
        "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"
      ],
      "removed": true,
      "logIndex": "0x5",
      "transactionIndex": "0x5",
      "transactionHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
      "blockHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
      "blockNumber": "0x5"
    }
  ],
  "type": "0x5"
}
```

### EthGetTransactionReceiptLimited

Perms: read

Inputs:

```json
["0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e", 10101]
```

Response:

```json
{
  "transactionHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "transactionIndex": "0x5",
  "blockHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "blockNumber": "0x5",
  "from": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "root": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
  "status": "0x5",
  "contractAddress": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
  "cumulativeGasUsed": "0x5",
  "gasUsed": "0x5",
  "effectiveGasPrice": "0x0",
  "logsBloom": "0x07",
  "logs": [
    {
      "address": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
      "data": "0x07",
      "topics": [
        "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"
      ],
      "removed": true,
      "logIndex": "0x5",
      "transactionIndex": "0x5",
      "transactionHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
      "blockHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
      "blockNumber": "0x5"
    }
  ],
  "type": "0x5"
}
```

### EthMaxPriorityFeePerGas

Perms: read

Inputs: `null`

Response: `"0x0"`

### EthNewBlockFilter

Installs a persistent filter to notify when a new block arrives.

Perms: read

Inputs: `null`

Response: `"0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"`

### EthNewFilter

Installs a persistent filter based on given filter spec.

Perms: read

Inputs:

```json
[
  {
    "fromBlock": "2301220",
    "address": ["0x5cbeecf99d3fdb3f25e309cc264f240bb0664031"],
    "topics": null
  }
]
```

Response: `"0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"`

### EthNewPendingTransactionFilter

Installs a persistent filter to notify when new messages arrive in the message pool.

Perms: read

Inputs: `null`

Response: `"0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"`

### EthProtocolVersion

Perms: read

Inputs: `null`

Response: `"0x5"`

### EthSendRawTransaction

Perms: read

Inputs:

```json
["0x07"]
```

Response: `"0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"`

### EthSubscribe

Subscribe to different event types using websockets
eventTypes is one or more of:

- newHeads: notify when new blocks arrive.
- pendingTransactions: notify when new messages arrive in the message pool.
- logs: notify new event logs that match a criteria
  params contains additional parameters used with the log event type
  The client will receive a stream of EthSubscriptionResponse values until EthUnsubscribe is called.

Perms: read

Inputs:

```json
["Bw=="]
```

Response: `"0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"`

### EthSyncing

Perms: read

Inputs: `null`

Response: `false`

### EthTraceBlock

TraceAPI related methods

Returns traces created at given block

Perms: read

Inputs:

```json
["string value"]
```

Response:

```json
[
  {
    "action": {
      "callType": "string value",
      "from": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
      "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
      "gas": "0x5",
      "input": "0x07",
      "value": "0x0"
    },
    "result": {
      "gasUsed": "0x5",
      "output": "0x07"
    },
    "subtraces": 123,
    "traceAddress": [123],
    "Type": "string value",
    "blockHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
    "blockNumber": 9,
    "transactionHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
    "transactionPosition": 123
  }
]
```

### EthTraceReplayBlockTransactions

Replays all transactions in a block returning the requested traces for each transaction

Perms: read

Inputs:

```json
["string value", ["string value"]]
```

Response:

```json
[
  {
    "output": "0x07",
    "stateDiff": "string value",
    "trace": [
      {
        "action": {
          "callType": "string value",
          "from": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
          "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
          "gas": "0x5",
          "input": "0x07",
          "value": "0x0"
        },
        "result": {
          "gasUsed": "0x5",
          "output": "0x07"
        },
        "subtraces": 123,
        "traceAddress": [123],
        "Type": "string value"
      }
    ],
    "transactionHash": "0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e",
    "vmTrace": "string value"
  }
]
```

### EthUninstallFilter

Uninstalls a filter with given id.

Perms: read

Inputs:

```json
["0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"]
```

Response: `true`

### EthUnsubscribe

Unsubscribe from a websocket subscription

Perms: read

Inputs:

```json
["0x37690cfec6c1bf4c3b9288c7a5d783e98731e90b0a4c177c2a374c7a9427355e"]
```

Response: `true`
