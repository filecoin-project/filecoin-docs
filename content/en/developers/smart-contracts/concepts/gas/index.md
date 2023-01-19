---
title: "Gas"
description: "Transactions and processes within the FVM require gas in order to pay the nodes running the actors and contracts. This page details what gas is, how it's used, and how to properly manage it within your actors and contracts."
lead: "Transactions and processes within the FVM require gas in order to pay the nodes running the actors and contracts. This page details what gas is, how it's used, and how to properly manage it within your actors and contracts."
draft: false
images: []
type: docs
weight: 40
menu:
  build:
    parent: "build-concepts"
    identifier: "gas-1pu3ibyrifsnrh2dhah"
toc: true
---

{{< beta-warning >}}

## What is GAS?

<!-- TODO: Johnny, can you please summarize it for this section. There might be some useful detail we can keep for the intro part.-->
As is traditionally the case with many blockchains, Gas is a unit of measure of how much storage and/or compute resource a message operation consumes in order to be executed on-chain. Executing messages on Filecoin consumes both computation and storage resources on the network. *Gas* is a unit that measure of resources consumed by each message.

The Gas fee consumed by a message directly affects the cost the sender must pay for it to be included in a new block, as well the priority fee goes to storage providers as tips. Therefore, it is very important to understand how to set proper Gas values while submitting your messages to Filecoin network which is helpful to avoid transaction failure or paying higher transaction fees unnecessarily. 

The Gas fee which paid by the massage sender depends on several parameters which either 1) automatically calculated based on network parameters or 2) specified by the senders based on how much they are willing to pay. 

`GasUsage * BaseFee` is the actual execution cost to be burned.

+ GasUsage - The amount of Gas that a message’s execution consumes depends on the options of this message. It is measured in units of `Gas`.
+ BaseFee - The amount of attoFIL that gets burned per unit of Gas. The value of the BaseFee is dynamic and adjusts according to current network congestion parameters. It is measured in units of `attoFIL/Gas`.

Gas params set by the message sender.

+ GasLimit - maximum amount of Gas that the message sender is willing to pay to execute a message (i.e., number of units of `Gas`).

+ BaseFeeCap - is the maximum price that the message sender is willing to pay per unit of gas. It is measured in units of `attoFIL/Gas`.

  `GasLimit * BaseFeeCap` is the hard limit that a message can consume.

+ GasPremium - considered as priority fee which is the price per unit of gas that the message sender is willing to pay to the block-producing storage provider as "tip". It is measured in units of `attoFIL/Gas`.

Gas fees are paid in a unit of native currency, FIL token. Gas prices are denoted in attoFIL, which itself is a denomination of FIL - each attoFIL is equal to 0.000000001 FIL. 

#### GASUsage

GasUsage is how much Gas that is consumed executing message/transaction and it is various depends the execution operations and storage consumed for messages.  The GasUsage for each message will be calculated while the message is executing by VM. And it is broken down into storage cost and computation cost. 

+ Storage cost - The gas cost to store a given size of message or message response in the chain. 

+ Computation cost

  With the arrival of the Filecoin Virtual Machine, the Filecoin network will gain the capability to run codes for user-defined actors. Therefore, the computation cost will be calculated for the execution of the actor's computation logic, includes: 

  + execution gas - it is charged per WASM instruction which is similar to Op code for EVM. The conversion of WASM execution units to Filecoin gas units is at a fixed ratio of 4 gas per execution unit.
  + syscalls cost - The cost of calling exposed functions which are provided for actors. The functions of verifying signatures,  verifying a sector seal proof or proof of spacetime, and verifying the consensus faults, etc.
  + additional extern cost - the cost for the operations outside of FVM space to traverse the extern boundary to access client functionalities.

#### BaseFee

BaseFee is the set price per unit of Gas (measured in attoFIL/Gas unit) which will be burned for every message execution. The value of the BaseFee is dynamic and adjusted according to the BaseFee in the parent block before it and an increase factor based on current network congestion (how much messages waiting to be added on chain).

The BaseFee applied to each block should be included in the block itself so that the value of the current BaseFee can be get from the head of the chain. The BaseFee applies per unit of Gas used and therefore, the total amount of Gas burned for a message is `BaseFee * GasUsed`. 

#### GasLimit

Gas Limit is the maximum limit of Gas the users are willing to pay for their transaction to be executed. It can be estimated and specified by the message sender. It is measured in units of `Gas`.

Gas limit sets an upper limit for the total units of Gas the transaction execution will consume. For a message to be execute, the GasLimit must be enough to cover the base fee to execute the message and  priority fees paid to storage provider. The message execution will be failed if it runs out of gas. So setting the proper Gas Limit is important to avoid the message execution failure. 

#### GasFeeCap

GasFeeCap is the maximum price in attoFIL that the message sender is willing to pay per unit of gas.  `GasFeeCap * GasLimit` sets the maximum amount of attoFIL that a sender will pay a message which means that a message will never cost them more than `GasLimit * GasFeeCap` attoFIL. 

In order to ensure the successfully execution of a message, `GasFeeCap * GasLimt` need to be enough to cover the cost of executing the message (`GasUsage * Basefee`) as well as the tips for the miner (`GasLimit * GasPremium`).  It is hard-constrained for a message to spending no more than `GasFeeCap * GasLimit`. From this amount, the message execution fee `GasUsage * BaseFee` is paid (burnt) first. After that, up to `GasLimit * GasPremium` will be given to the storage provider as a reward. But storage provider will not able to receive full `GasLimit * GasPremium` if the message sender set low Gas Fee Cap.

#### GasPremium

GasPremium is the price per unit of Gas (measured in `attoFIL/gas`) that the message sender is willing to pay (on top of the `BaseFee`) as “tips” to the miner that will include this message in a block.  By packing a message into a block, the storage provider can earn `GasPremier * GasLimit` in autoFIL as reward. So GasPremium will allow storage providers to prioritize received messages and packed the into blocks sooner.

GasPremium could be estimated based on all the GasPremium for all the messages in previous N blocks. Apart from the estimation, the message senders can also specify higher GasPremium if they want the message be added on-chain sooner.

### **How to calculate Gas fee.**

Essentially, the Gas fee is paid by the message sender in the unit of FIL. First, the actual cost of executing the message will be burned. Then there will be portion of Gas fee paid to the storage provider as tips to include the message in a block. If there is Gas fee left, it will be refunded to the message sender. 

The total Gas fee of a message will be calculated as following:

```
  GasUsage × BaseFee(To be burned)
+ GasLimit × GasPremium(Tips for SP)
+ OverEstimationBurn × BaseFee(ExtraBurn) 
```

Let's take a transaction as an example and assume in this transaction:

+ The `GasUsage`  is 1000 Gas and `BaseFee` is calculated as 20 attoFIl/Gas.
+ The message sender set the `GasLimit` as 2000 Gas which they are willing to spend. 
+ Then they like to pay 5 attoFIL/Gas as `GasPremium` to the storage provider.

The total fee would be: `GasUsage × BaseFee +  Gaslimit x GasPremium `,  which is `1000 Gas x 20 attoFIL/Gas + 1500 Gas x 5 attoFIL/Gas = 27500 attoFIL`.

Additionally, the message sender can also set the max Gas Fee (`Gaslimit x BaseFeeCap`) they are willing to pay. If the sender set the GasLimit too heigh, it will compute amount of Gas to be refunded and amount of Gas to be burned as extra burn.

### How devs can estimate gas.

Lotus node exposed several JSON-RPC APIs for developers to request the estimate gas based on the message/transaction that devs are creating. The available JSON-RPC APIs are:

- GasEstimateMessageGas - it will estimate gas values for a message which without any gas fields set, including GasLimit, GasPremium, and GasFeeCap. It will return the message with those gas fields set.
- GasEstimateGasLimit - this will take the input message and estimate GasLimit based on the execution cost as well as a transaction multiplier.
- GasEstimateGasPremium - this will estimated GasPremium price should be used for a message to have high likelihood to be included in N epoch. N is smaller, the GasPremium is higher.
- GasEstimateFeeCap - this will estimate GasFeeCap according to BaseFee in parent blocks, network congestion as well as GasPremium. 

If you want to learn more about how to use those JSON-RPC APIs for Filecoin gas model, please check the [JSON RPC API docs for Gas](https://docs.filecoin.io/developers/reference/json-rpc/gas/). 

{{< alert  >}}Gas estimation will be various from Filecoin MainNet and TestNet since it depends on several network parameters and real-time network congestion. But the GasUsage will be the same across multiple network.

{{< / alert  >}}

But in general, developers do not need to call those API  to estimate gas fees individually for their messages. When message senders construct a message, they 

+ either leave those gas fields unset, and then gas fields will be estimated and set when the message is pushed to memory pool.
+ or specific those gas fields based on their willingness or preference to pay for this message. For instance, giving users couple options for GasPremium based on how fast they want this message to be included on chain.

### Ethereum compatibility

Since FVM is fully EVM compatible to support developers from Ethereum ecosystem, Filecoin node also provide Ethereum compatible APIs to support gas estimation for Ethereum toolings (e.g. ethers.js, MetaMask, etc.), those APIs includes:

+ [EthEstimateGas](https://docs.filecoin.io/developers/reference/json-rpc/eth/#ethestimategas) - Generates and returns an estimate of how much gas is necessary to allow the transaction to complete.
+ [EthMaxPriorityFeePerGas](https://docs.filecoin.io/developers/reference/json-rpc/eth/#ethmaxpriorityfeepergas) - Returns a fee per gas that is an estimate of how much you can pay as a priority fee, or ’tip’, to get a transaction included in the current block.

If you want to request estimate gas for your message or request current max priority fee in the network, you can send the JSON RPC request to the public endpoint of the Fielcoin networks. Here is an example of requesting EthMaxPriorityFeePerGas in Hyperspace testNet using JavaScript.

```javascript
var options = {
  method: "POST",
  url: "https://api.hyperspace.node.glif.io/rpc/v0",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: 'eth_maxPriorityFeePerGas',
    params: null,
    id: 1,
  }),
}
const response = await request(options)
console.log("The maxPriorityFeePerGas is ", JSON.parse(res.body).result)
```

