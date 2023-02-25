---
title: "Eth"
description: "These methods are used for Ethereum-compatible JSON-RPC calls."
lead: "These methods are used for Ethereum-compatible JSON-RPC calls. For in-depth information on each of these methods, take a look at the [official Ethereum API documentation](https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html)."
draft: false
images: []
type: docs
menu:
  reference:
    parent: "lorem"
    identifier: "eth-0381eb8b7183c0446087985169edb72b"
weight: 100
toc: true
aliases:
    - "/developers/reference/json-rpc/eth/"
---

## EthAccounts

This method is intended to return a list of addresses owned by client. However, `eth_accounts` will always return and empty array `[]` since Filecoin does not manage Ethereum private keys.

- Permissions: read
- Inputs: none

Example:

```curl
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
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
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
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
## EthCall

Executes a new message call immediately without creating a transaction on the blockchain.

This documentation section is a work-in-progress.

- Permissions: read
- Input:
    1. Object - The transaction call object:
        - from: DATA, 20 Bytes - (optional) The address the transaction is sent from.
        - to: DATA, 20 Bytes - The address the transaction is directed to.
        - gas: QUANTITY - (optional) Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
        - gasPrice: QUANTITY - (optional) Integer of the gasPrice used for each paid gas
        - value: QUANTITY - (optional) Integer of the value sent with this transaction
        - data: DATA - (optional) Hash of the method signature and encoded parameters. For details see [Ethereum Contract ABI in the Solidity documentation](https://docs.soliditylang.org/en/latest/abi-spec.html)
    1. QUANTITY|TAG - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`. See the [default block parameter](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block-parameter).

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
  "latest"
]
```

## EthChainId

Returns the currently configured chain ID, a value used in replay-protected transaction signing as introduced by EIP-155.

- Permissions: read
- Inputs: none

Example:

```curl
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \    src/languages update/json-rpc-examples
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
## EthEstimateGas

Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance.

This documentation section is a work-in-progress.

- Permissions: read
- Inputs: 
    - `object`:
        - `from`: DATA, 20 Bytes - (optional) The address the transaction is sent from.
        - `to: DATA, 20 Bytes - The address to which the transaction is directed to.
        - `gas: QUANTITY - (optional) Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
        - `gasPrice`: QUANTITY - (optional) Integer of the gasPrice used for each paid gas.
        - `value`: QUANTITY - (optional) Integer of the value sent with this transaction
        - `data`: DATA - (optional) Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI
    - `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending".

Example:

```curl
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "jsonrpc":"2.0",
        "method":"eth_estimateGas",
        "params":[{
            "from": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
            "to": "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031",
            "gas": "0x5",
            "gasPrice": "0x0",
            "value": "0x0",
            "data": "0x07"
        }],
        "id":1
    }' | jq
```

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
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_feeHistory",
    "params": [ "0x5", "latest", [ 0 ] ],
    "id":1
}' | jq
```

## EthGasPrice

Returns the current price per gas in wei.

- Permissions: read
- Inputs: none

Example:

```curl
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
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

Returns the balance of the account of a given address.

Permissions: read

Input:

1. String - 20 Bytes - Address.
1. String - Either the hex value of a block number OR One of the following block tags:
    - `pending`: a sample next block built by the client on top of latest and containing the set of transactions usually taken from local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
    - `latest`: the most recent block in the canonical chain observed by the client, this block may be re-orged out of the canonical chain even under healthy/normal conditions.
    - `safe`: the most recent crypto-economically secure block, cannot be re-orged outside of manual intervention driven by community coordination. Intuitively, this block is “unlikely” to be re-orged.
    - `finalized`: the most recent crypto-economically secure block, that has been accepted by >2/3 of validators. Cannot be re-orged outside of manual intervention driven by community coordination. Intuitively, this block is very unlikely to be re-orged.
    - `earliest` - The lowest numbered block the client has available. Intuitively, you can think of this as the first block created.


```curl
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_getBalance",
    "params": ["0x3e1F70090cf4476d788C5259F50F89E9fB88bF1a", "latest"],
    "id":1
}' | jq
```

```json
{
    "jsonrpc": "2.0",
    "result": "0x0",
    "id": 1
}
```

<!-- TODO: Find a tipset to use for this example. -->
## EthGetBlockByHash

Returns information about a block by tipset, also known as a block hash.

- Permissions: read
- Inputs:
    - `array`:
        - `string`: Tipset of block
        - `boolean`: If true it returns the full transaction objects, if false only the hashes of the transactions. Defaults to false.


```json
[
  "0x0707070707070707070707070707070707070707070707070707070707070707",
  true
]
```

## EthGetBlockByNumber

Returns information about a block by block number.

- Permissions: read
- Inputs:
    - `QUANTITY|TAG`: integer of a block number, or the string `earliest`, `latest` or `pending`, as in the default block parameter.
    - `Boolean`: If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.

```shell
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_getBlockByNumber",
    "params":["0x82c9", true],
    "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "result": {
    "hash": "0xf9a8005d886e6a458003835f7c1fda53c666777fef19ce42db2614c9848adb3f",
    "parentHash": "0x8aec5230892f858c4c7ee860ca9de1542c9a59e5b809a71125ae3e26c36b7997",
    "sha3Uncles": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0x0000000000000000000000000000000000000000",
    "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "transactionsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "receiptsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
    "difficulty": "0x0",
    "totalDifficulty": "0x0",
    "number": "0x82c9",
    "gasLimit": "0x2540be400",
    "gasUsed": "0x0",
    "timestamp": "0x63857585",
    "extraData": "",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "nonce": "0x0000000000000000",
    "baseFeePerGas": "0x64",
    "size": "0x0",
    "transactions": [],
    "uncles": []
  },
  "id": 1
}
```

<!-- TODO: Find a tipset to test. -->
## EthGetBlockTransactionCountByHash

Returns the number of messages in the tipset.

- Permissions: read
- Inputs:

```shell
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByHash",
    "params":["0xf9a8005d886e6a458003835f7c1fda53c666777fef19ce42db2614c9848adb3f"],
    "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "result": "0x0",
  "id": 1
}
```

<!-- TODO: figure out how this works. -->
## EthGetBlockTransactionCountByNumber

Returns the number of transactions in a block matching the given tipset.

- Permissions: read
- Inputs:
    - `string`: Either the hex value of a block number OR one of the following block tags:
        - `pending`: A sample next block built by the client on top of latest and containing the set of transactions usually taken from local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
        - `latest`: The most recent block in the canonical chain observed by the client, this block may be re-orged out of the canonical chain even under healthy/normal conditions.
        - `safe`: The most recent crypto-economically secure block, cannot be re-orged outside of manual intervention driven by community coordination. Intuitively, this block is “unlikely” to be re-orged.
        - `finalized`: The most recent crypto-economically secure block, that has been accepted by >2/3 of validators. Cannot be re-orged outside of manual intervention driven by community coordination. Intuitively, this block is very unlikely to be re-orged.
        - `earliest`: The lowest numbered block the client has available. Intuitively, you can think of this as the first block created.

Example:

```shell
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByNumber",
    "params": [ "0x5" ],
    "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x0"
}
```

<!-- TODO: Get return example for this method. -->
## EthGetCode

Returns code at a given address.

This section of documentation is a work-in-progress.

- Permissions: read
- Inputs:
    - `string`: 20 byte address.
    - `string`: Either the hex value of a block number OR one of the following block tags:
        - `pending` - A sample next block built by the client on top of latest and containing the set of transactions usually taken from local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
        - `latest` - The most recent block in the canonical chain observed by the client, this block may be re-orged out of the canonical chain even under healthy/normal conditions.
        - `safe` - The most recent crypto-economically secure block, cannot be re-orged outside of manual intervention driven by community coordination. Intuitively, this block is “unlikely” to be re-orged.
        - `finalized` - The most recent crypto-economically secure block, that has been accepted by >2/3 of validators. Cannot be re-orged outside of manual intervention driven by community coordination. Intuitively, this block is very unlikely to be re-orged.
        - `earliest` - The lowest numbered block the client has available. Intuitively, you can think of this as the first block created.

```shell
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_getCode",
    "params": [ "0x0707070707070707070707070707070707070707", "string value" ],
    "id":1
}' | jq
```

```json
{
  "id": 0,
  "jsonrpc": "string",
  "result": "string"
}
```

<!-- TODO: create a filter and add it here so that we can get a response. -->
## EthGetFilterChanges

Polling method for a filter, which returns an array of logs which occurred since last poll.

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

Returns the receipt of a transaction by transaction hash.

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

Returns a fee per gas that is an estimate of how much you can pay as a priority fee, or 'tip', to get a transaction included in the current block. Generally you will use the value returned from this method to set the `maxFeePerGas` in a subsequent transaction that you are submitting.

- Permissions: read
- Inputs: none

```shell
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_maxPriorityFeePerGas",
    "params": [],
    "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "result": "0x312da",
  "id": 1
}
```

## EthNewBlockFilter

Installs a persistent filter to notify when a new block arrives.

- Permissions: write
- Inputs: none

```shell
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_newBlockFilter",
    "params": [ ],
    "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "result": "5f1623cd-5901-4e4c-a0ec-b2c37c113b8e",
  "id": 1
}
```

## EthNewFilter

Creates a filter object, based on filter options, to notify when the state changes (logs). Unlike [`eth_newBlockFilter`](#EthNewBlockFilter) which notifies you of all new blocks, you can pass in filter options to track new logs matching the topics specified. To check if the state has changed, call [`eth_getFilterChanges`](#EthGetFilterChanges).

- Permissions: write
- Inputs:
    - `array`:
        - `object`:
            - `string`: BlockHash. Using blockHash is equivalent to fromBlock = toBlock = the block number with hash blockHash. If blockHash is present in the filter criteria, then neither fromBlock nor toBlock are allowed.
            - `array`:
                - `string`: Contract address or a list of addresses from which logs should originate.
                - `string`: Either the hex value of a block number OR one of the following block tags:
                    - `pending`: A sample next block built by the client on top of latest and containing the set of transactions usually taken from local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
                    - `latest`: The most recent block in the canonical chain observed by the client, this block may be re-orged out of the canonical chain even under healthy/normal conditions.
                    - `safe`: The most recent crypto-economically secure block, cannot be re-orged outside of manual intervention driven by community coordination. Intuitively, this block is “unlikely” to be re-orged.
                    - `finalized`: The most recent crypto-economically secure block, that has been accepted by >2/3 of validators. Cannot be re-orged outside of manual intervention driven by community coordination. Intuitively, this block is very unlikely to be re-orged.
                    - `earliest`: The lowest numbered block the client has available. Intuitively, you can think of this as the first block created.

```shell
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_newFilter",
    "params": [{
        "fromBlock": "2301220",
        "address": [
          "0x5cbeecf99d3fdb3f25e309cc264f240bb0664031"
        ],
        "topics": null
    }],
    "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "result": "4d5981d6-5da2-40c3-85e0-18ecc6b3fd5d",
  "id": 1
}
```

## EthNewPendingTransactionFilter

Creates a filter in the node, to notify when new pending transactions arrive. To check if the state has changed, call [`eth_getFilterChanges`](#EthGetFilterChanges).

- Permissions: write
- Inputs: none

```shell
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_newPendingTransactionFilter",
    "params": [],
    "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "result": "6512e91c-2bba-49be-ab56-903a84eee5b2",
  "id": 1
}
```

## EthProtocolVersion

Returns the current ethereum protocol version.

- Permissions: read
- Inputs: none

```shell
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_protocolVersion",
    "params": [],
    "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "result": "0x12",
  "id": 1
}
```

<!-- TODO: I'm pretty sure this requires something to be signed before sending a transaction. Double check on this one. -->
## EthSendRawTransaction

Creates a new message call transaction or a contract creation for signed transactions. Returns 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

- Permissions: read
- Inputs:

```shell
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_sendRawTransaction",
    "params": ["0x07"],
    "id":1
}' | jq
```

```json

```

<!-- TODO: this uses websockets and looks like a special request. Get more info on this. -->
## EthSubscribe

Subscribe to different Ethereum event types like newHeads, logs, pendingTransactions, and minedTransactions using WebSockets. Creates a new subscription for desired events. Sends data as soon as it occurs.

- Permissions: write
- Inputs:
    - Event types: specifies the type of event to listen to (ex: new pending transactions, logs, etc).
    - Optional params: optional parameters to include to describe the type of event to listen to (`address` for example).

## EthUninstallFilter

Uninstalls a filter with given id.

- Permissions: write
- Inputs:

```shell
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_uninstallFilter",
    "params": ["6512e91c-2bba-49be-ab56-903a84eee5b2"],
    "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "result": true,
  "id": 1
}
```

## EthUnsubscribe

Unsubscribe from different Ethereum event types with a regular RPC call with `eth_unsubscribe` as the method and the `subscriptionId` as the first parameter.

- Permissions: write
- Inputs:
    - `Subscription ID`: as previously returned from an `eth_subscribe` call.

```shell
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_unsubscribe",
    "params": ["b62df77831484129adf6682332ad0725"],                                                                      "id":1
}' | jq
```

```json
{
  "jsonrpc": "2.0",
  "result": true,
  "id": 1
}
```
