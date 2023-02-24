---
title: "Actors and contracts"
description: "Actors are blocks of code that run on the Filecoin virtual machine. Smart contracts are small, self-executing blocks of code that run on Ethereum. Both actors and smart-contracts are used within the FVM."
lead: "Actors are blocks of code that run on the Filecoin virtual machine. Smart contracts are small, self-executing blocks of code that run on Ethereum. Both actors and smart-contracts are used within the FVM."
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

## Actors

For those familiar with the Ethereum virtual machine (EVM), actors work similarly to smart contracts. There are two types of actors:

- _Built-in actors_: code that the Filecoin network team has written deployed directly into the Filecoin network. An example of a built-in actor is the multi-sig actor, a system that requires multiple private keys to perform some action.

## Filecoin flow

SP provider actor takes in proof of storage
notifies power actor, which accounts for it, gets storage power to SP
During consensus, reward actor uses power actor state to reward blocks to providers in proportion to power

## On chain storage market flow

clients provide deals
deals add to SP sector
clients send filecoin to market to SP actor
FIL + actor sends DataCap, which allows 10x value on special data

## FVM and actors

Users can create and deploy new actors without FIPS and network upgrades using solidity or wasm, without needing to worry a ton about security or protocol details


## Types 

Users can make these types on demand. 11 different types of actors

- Storage provider: ?
- Account: hold funds
- Multisig: hold hunds with many keys 
- Payment Channel: ?

System actor singletons, for storage

- f05 Storage market
- f04 Storage power, tracks stored bytes of every provider on network
- f06 FIL+ actor, deals with sending data cap, providing providers with more power
- f02 Reward, schedule for releasing Fil as part of block reward
- f099 account actor

Internals, important

- f03 cron
- f01 init
- f00 system

- _User actors_: code that any developer can write and deploy to the Filecoin network using the FVM, otherwise known as a [smart contract](#smart-contracts).

Unless otherwise specified, the term actor refers to a user actor.

## Smart contracts

Smart contracts are small, self-executing blocks of code that run on Ethereum. The term smart contract is also used in other blockchains to describe custom code that can run on their networks. In the Filecoin network, the term smart contract is a synonym for user actor. You may see the term smart contract used in tandem with actor, but there is no difference between the two; this documentation mainly uses smart contract to ease learning for Ethereum developers.

## Deeper dive

If you want to learn more about how actors work, check out Zenground's on Filecoin Actors and how they work:

{{< youtube "9JbwbTPonv0" >}}
