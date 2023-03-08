---
title: "Built-in actors"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  smart-contracts:
    identifier: "built-in-actors-overview"
weight: 100
toc: true
---

## Overview

Built-in actors are how the Filecoin network manages and updates _global state_. The _global state_ of the network at a given epoch can be thought of as the set of blocks agreed upon via network consensus in that epoch. This global state is represented as a _state tree_, which maps an actor to an _actor state_. An _actor state_ describes the current conditions for an individual actor, such as its Fil balance and its nonce. In Filecoin, actors trigger a _state transition_ by sending a _message_. Each block in the chain can be thought of as a **proposed** global state, where the block selected by network consensus sets the **new** global state. Each block contains a series of messages, and a checkpoint of the current global state after the application of those messages. The Filecoin Virtual Machine (FVM) is the Filecoin network component that is in charge of execution of all actor code.  

A basic example of how built-in actors are used in Filecoin is the process by which storage providers prove storage and are subsequently rewarded. The process is as follows:

1. The [`StorageMinerActor`](#storagemineractor) processes proof of storage from a storage provider.
1. The storage provider is awarded storage power based on whether the proof is valid or not.
1. The [`StoragePowerActor`](#storagepoweractor) accounts for the storage power.
1. During block validation, the `StoragePowerActor`'s state, which includes information on storage power allocated to each storage provider, is read.
1. Using the state information, the consensus mechanism randomly awards blocks to the storage providers with the most power, and the [`RewardActor`](#rewardactor) sends Fil to storage providers.

### Blocks in detail

Each block in the Filecoin chain contains: 

  - Inline data such as current block height.
  - A pointer (CID) to the current state tree.
  - A pointer (CID) to the set of messages that, when applied to the network, generated the current state tree.

### State tree in detail


A Merkle Directed Acyclic Graph (Merkle DAG) is used map the state tree. and the set of messages. Nodes in the state tree contain information on:

- Actors, like Fil balance, nonce and a pointer (CID) to actor state data.
- Messages in the current block


### Messages in detail

Like the state tree, a Merkle Directed Acyclic Graph (Merkle DAG) is used to map the set of messages for a given block. Nodes in the messages map contain information on:

- The actor the message was sent to
- The actor that sent the message
- Target method to call on actor being sent the message
- A cryptographic signature for verification
- The amount of Fil transferred between actors

### Actor code in detail

The code that defines an actor in the Filecoin network is separated into different methods. Messages sent to an actor contain information on which method(s) to call, and the input parameters for those methods. Additionally, actor code interacts with a _runtime_ object, which contains information on the general state of network, such as the current epoch, and cryptographic signatures and proof validations. Like smart contracts in other blockchains, actors must pay a _gas fee_, which is some predetermined amount of Fil to offset the cost (network resources used, etc.) of a transaction. Every actor has a Filecoin balance attributed to it, a state pointer, a code which tells the system what type of actor it is, and a nonce, which tracks the number of messages sent by this actor

### Types of built-in actors

The 11 different types of built-in actors are as follows:

- [CronActor](#cronactor)
- [InitActor](#initactor)
- [AccountActor](#accountactor)
- [RewardActor](#rewardactor)
- [StorageMarketActor](#storagemarketactor)
- [StorageMinerActor](#storagemineractor)
- [MultisigActor](#multisigactor)
- [PaymentChannelActor](#paymentchannelactor)
- [StoragePowerActor](#storagepoweractor)
- [VerifiedRegistryActor](#verifiedregistryactor)
- [SystemActor](#systemactor)

#### CronActor

The `CronActor` sends messages to the `StoragePowerActor` and `StorageMarketActor` at the end of each epoch. The messages sent by `CronActor` inidicate to StoragePowerActor and StorageMarketActor how they should maintain internal state and process deferred events. This system actor is instantiated in the genesis block, and interacts directly with the FVM.

#### InitActor

The `InitActor` can initialize new actors on the filecoin network. This system actor is instantiated in the genesis block, and maintains a table resolving a public key and temporary actor addresses to their canonical ID addresses. The `InitActor` interacts directly with the FVM.

#### AccountActor

The `AccountActor` is responsible for user accounts. Account actors are not created by the `InitActor`, but by sending a message to a public-key style address. The account actor updates the state tree with new actor address, and interacts directly with the FVM.

#### RewardActor

The `RewardActor` manages unminted Filecoin tokens, and distributes rewards directly to miner actors, where they are locked for vesting. The reward value used for the current epoch is updated at the end of an epoch. The `RewardActor` interacts directly with the FVM.

#### StorageMarketActor

The `StorageMarketActor` is responsible for processing and managing on-chain deals. This is also the entry point of all storage deals and data into the system. This actor keeps track of storage deals, and the of locked balances of both the client storing data and the storage provider. When a deal is posted on chain through the `StorageMarketActor`, the actor will first check if both transacting parties have sufficient balances locked up and include the deal on chain. Additionally, the `StorageMarketActor` holds _Storage Deal Collateral_ provided by the storage provider to collateralize deals. This collateral is returned to the storage provider when all deals in the sector successfully conclude. This actor does not interact directly with the FVM.

#### StorageMinerActor

The `StorageMinerActor` is created by the `StoragePowerActor`, and is responsible for storage mining operations and the collection of mining proofs. This actor is a key part of the Filecoin storage mining subsystem, which ensures a storage miner can effectively commit storage to the Filecoin,  handles the following:

- Committing new storage 
- Continuously proving storage 
- Declaring storage faults 
- Recovering from storage faults 

This actor does not interact directly with the FVM.

#### MultisigActor

The `MultisigActor` is responsible for dealing with operations involving the Filecoin wallet, and represents a group of transaction signers, with a maximum of 256. Signers may be external users or the `MultisigActor` itself. This actor does not interact directly with the FVM.

#### PaymentChannelActor

The `PaymentChannelActor` creates and manages _payment channels_, a mechanism for off-chain microtransactions for Filecoin DApps to be reconciled on-chain at a later time with less overhead than a standard on-chain transaction, and no gas costs. Payment channels are uni-directional and can be funded by adding to their balance. To create a payment channel and deposit fund, a user calls the `PaymentChannelActor`. This actor does not interact directly with the FVM.

#### StoragePowerActor

The `StoragePowerActor` is responsible for keeping track of the storage power allocated to each storage miner, and has the ability to create a `StorageMinerActor`. This actor does not interact directly with the FVM.

#### VerifiedRegistryActor

The `VerifiedRegistryActor` is responsible for managing Fil+ clients. This actor can add a verified client to the Fil+ program, remove and reclaim  expired DataCap allocations and manage claims. This actor does not interact directly with the FVM.

#### SystemActor

For more information on `SystemActor`, see the [source code](https://github.com/filecoin-project/specs-actors/blob/master/actors/builtin/system/system_actor.go).

## Access and invoke built-in actors

Developers can access and invoke built-in actors the _Protocol Labs API_ or the Zondax _filecoin.solidity_ API

{{< alert >}}
The Filecoin Solidity project is [currently in beta](https://docs.zondax.ch/fevm/filecoin-solidity#disclaimer-%EF%B8%8F%EF%B8%8F).
{{< /alert >}}

- _Protocol Labs API_, maintained by [Protocol Labs](https://protocol.ai/), ...
- _Filecoin.solidity_, maintained by [Zondax](https://docs.zondax.ch/), is a set of libraries that allows Solidity smart contracts to seamlessly call built-in actors methods. **Not all built-in actors and methods are supported** - for a complete list, see the [actors and methods supported](https://docs.zondax.ch/fevm/filecoin-solidity/api/#actors-and-methods-supported). For further information, including information on how to use the package, see the [official documentation](https://docs.zondax.ch/fevm/filecoin-solidity/) and the [GitHub repository](https://github.com/Zondax/filecoin-solidity).

For information on how invoke and access built-in actors in your smart contracts, see the 
[developers guide]({{< relref "invoke-built-in-actors.md" >}}).