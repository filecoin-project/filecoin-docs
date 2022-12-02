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
toc: true
---

{{< beta-warning >}}

<!-- - What actors and smart contracts are. -->
<!-- - How they interact with the FVM. -->
<!-- - How the FVM processes actors/contracts. -->

## Actors

Actors are blocks of code that run on the Filecoin virtual machine (FVM). Application developers can use this code to create decentralized apps on the FVM. For those familiar with the Ethereum virtual machine (EVM), actors work similarly to smart contracts. There are two types of actors:

- Built-in actors: code that the Filecoin network team has written deployed directly into the Filecoin network. An example of a built-in actor is the multi-sig actor, a system that requires multiple private keys to perform some action.
- User actors: code that any developer can write and deploy to the Filecoin network using the FVM.

Unless otherwise specified, the term actor refers to a user actor.

## Smart contracts

Smart contracts are small, self-executing blocks of code that run on Ethereum. The term smart contract is also used in other blockchains to describe custom code that can run on their networks. In the Filecoin network, the term smart contract is a synonym for user actor. You may see the term smart contract used in tandem with actor, but there is no difference between the two; this documentation mainly uses smart contract to ease learning for Ethereum developers.

## Deeper dive

If you want to learn more about how actors work, check out Zenground's on Filecoin Actors and how they work:

{{< youtube "9JbwbTPonv0" >}}
