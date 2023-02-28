---
title: "Actors and contracts"
description: "Actors are smart contracts that run on the Filecoin Virtual Machine (FVM), and are used to manage, query and update the state of the Filecoin network. Smart contracts are small, self-executing blocks of code that run on a blockchain. With the FVM, user-defined actors can be created."
lead: "Actors are smart contracts that run on the Filecoin Virtual Machine (FVM), and are used to manage, query and update the state of the Filecoin network. Smart contracts are small, self-executing blocks of code that run on a blockchain. With the FVM, user-defined actors can be created."
draft: false
images: []
type: docs
weight: 20
menu:
  build:
    parent: "build-concepts"
    identifier: "actors-and-contracts-fliuh2no2uygbo874t"
toc: true
aliases:
    - "/fvm/concepts/actors-and-contracts/"
---

{{< beta-warning >}}

<!-- - What actors and smart contracts are. -->
<!-- - How they interact with the FVM. -->
<!-- - How the FVM processes actors/contracts. -->

For those familiar with the Ethereum virtual machine (EVM), _actors_ work similarly to [smart contracts](#smart-contracts). In the Filecoin network, there are two types of actors:

- [_Built-in actors_](#built-in-actors): Hardcoded programs similar to Eth smart contracts that run the Fil blockchain, written ahead of time by network engineers

- _User actors_: code that any developer can write and deploy to the Filecoin network using the FVM, otherwise known as a smart contract.

## Smart contracts

A _smart contract_ is a small, self-executing blocks of custom code that runs on other blockchains, like Ethereum. In the Filecoin network, the term is a synonym for [_user actor_](#user-actors). You may see the term _smart contract_ used in tandem with _user actor_, but there is no difference between the two.

## Built-in actors


Hardcoded programs similar to Eth smart contracts that run the Fil blockchain, written ahead of time by network engineers

### Actor model

Actors are how Filecoin network organizes state transitions
- State machine connected to blocks in chain 
- Blocks contains 
  - inline data such as current block height, CIDs (used as pointers)
  - State tree pointer
    - points to map of every global actor in network
  - Messages block pointer
    - state transition messages: causes transition between blocks
    - new state encoded in state tree pointer

Merkle Tree is used to map
- State Tree pointer map (CID)
- Messages pointer map (CID)

Leafs in state machine map
- Actor 
  - Fil balance
  - Nonce (typical blokchain thing)
  - CID pointer actor code
  - CID pointer to actor state
- Block Msg, transaction
  - To Actor, From actor
  - Target Method to call on actor
  - Crypto signature
  - Fil value transferred

Actors represent state however it works for them, so mayb "shapes"

Actor code (compared to Eth)
- state machine 
- seperated into different methods
- takes in params from a caller and runtime
- Runtime provides
  - general state (READS)
  - current epoch, balance, etc. not currently under actor state
  - crypto signs, proof validations
  - General state of network
- gas model: charges for execution of actors
- actors manage their OWN state

Interaction needs
- params to send
- actor, actor methods to call

Message sending
- method calls to actors correspond to messages
- state transitions occur with user specified messages
- 

Why does Filecoin have actors?

### Types of built-in actors

Users can make these types on demand. 11 different types of actors

#### Storage provider

#### Account

hold funds

#### Multisig

hold hunds with many keys  (multiple signatures)


#### Payment Channel: ?

...

System actor singletons, for storage

#### f05 Storage market

#### f04 Storage power

tracks stored bytes of every provider on network

#### f06 FIL+ actor

deals with sending data cap, providing providers with more power

#### f02 Reward actor

schedules and manages releasing Fil as part of block reward

#### f099 account actor

Internals, important

#### f03 cron

#### f01 init

#### f00 system

### Examples

#### Basic Example
- Suppose you have a block at the beginning of chain with 3 addresses
  - f1000: 1 FIL
  - f42: 0 Fil
  - f900: 100 Fil
- In block 4, f900 send 1 Fil to f1000
- In block 9, f1000 send 1 Fil to f42
- Final state:
  - f1000: 1 
  - f42: 1
  - f900: 99


#### Filecoin flow

SP provider actor takes in proof of storage
notifies power actor, which accounts for it, gets storage power to SP
During consensus, reward actor uses power actor state to reward blocks to providers in proportion to power

#### On chain storage market flow

clients provide deals
deals add to SP sector
clients send filecoin to market to SP actor
FIL + actor sends DataCap, which allows 10x value on special data


## User actors (smart contracts)

_User actors_ is code that any developer can write and deploy to the Filecoin network using the FVM, otherwise known as a [smart contract](#smart-contracts).

### FVM and actors

Users can create and deploy new actors without FIPS and network upgrades using solidity or wasm, without needing to worry a ton about security or protocol details

## Deeper dive

If you want to learn more about how actors work, check out Zenground's on Filecoin Actors and how they work:

{{< youtube "9JbwbTPonv0" >}}
