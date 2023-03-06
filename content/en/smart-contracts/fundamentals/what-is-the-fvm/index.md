---
title: "What is the FVM"
description: "The Filecoin virtual machine (FVM) is a runtime environment for smart contracts on the Filecoin network, responsible for executing and securing them. These smart contracts, also called actors, can be written in Solidity or any language that compiles to WASM."
lead: "The Filecoin virtual machine (FVM) is a runtime environment for smart contracts on the Filecoin network, responsible for executing and securing them. These smart contracts, also called actors, can be written in Solidity or any language that compiles to WASM."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    identifier: "what-is-the-fvm-da0916626661af4bebfa119906cb0481"
weight: 100
toc: true
---

## Features

We created the FVM to enable developers to build new use cases on top of the Filecoin network, such as data access control, data DAOs, perpetual storage, loans, and Ethereum-compatible fungible and non-fungible tokens. To deliver a quality developer experience, we delayed development until the Filecoin network was stable, robust, and secure.

### Data access control

The FVM allows Filecoin network participants to limit individual data access, an advantage previously only available using centralized storage solutions.

### Data DAO

FVM data access control enables the creation and management of data centered decentralized-autonomous-organizations, which can govern and monetize data access and pool returns into a shared treasury.

### Perpetual storage

The FVM allows users to store data permanently, managed by repair and replication bots, which also benefit from Filecoin’s verifiable storage proofs.

### Loans

FIL token holders can use their holdings to provide storage collateral and receive interest, and community-generated reputation scores enable everyone to identify good borrowers.

### Ethereum compatibility

The FVM is fully EVM-compatible, allowing new ERC-20 tokens to be launched on the Filecoin network and enabling layer two networks to leverage its storage power and security.

## Use-cases

The FVM can be used for the creation of a new class of {{< tooltip "web3" >}} {{< tooltip "dApps" >}}, many of which will have the potential to become 10x improvements to the network’s functionality and beyond. The FVM team and members of the Filecoin community have discussed what can be built with the FVM. Some ideas are:

### Tokenized datasets and Data DAOs

Imagine kickstarting the dataset economy where you could capture and represent the value of those datasets to society. You could even exchange those data tokens between peers and request computation services on that data, such as validation, joins, analysis, feature detection, and extraction, moving into machine learning.

### Trustless reputation systems

Imagine an overlay network of nodes that could patrol the network performing random deals with Storage Providers (SPs) in order to gauge key metrics like quality of service guarantees, performance, latency, and region details. These nodes can then store SP reputation scores on-chain, making them traceable and verifiable while enabling users to decide on the terms of service of the SPs that they want to use for their data.

### Replication workers

Imagine anyone is able to write a new smart contract that makes new deals to maintain a specific level of replication of that dataset in the network. You could ensure the resiliency of your data by ensuring it is always stored n times automatically.

The smart contract could also be able to transfer your data just once into the filecoin network and have a trustless actor replicate and send that n times to multiple storage locations. You could even create a user-defined policy of rules for that data to obey - specifying things like region and location, latency, and even price. This can all be built right into the smart contract flow in FVM.

### Smarter storage markets

Imagine richer functionality in storage markets with features like auto-renewal of deals or self-repairing deals in the event of sector issues. Other possibilities are time-locked or event-driven data deals where retrieval only occurs under a specified timeframe or event trigger.

### The list goes on

There are many more use cases to unlock with FVM. Some other projects include:

- NFTs minted, exchanged, and stored under a single roof.
- Storage bounties and auction mechanisms.
- Enabling L2 bridges.
- Futures and derivatives on storage that compose in DeFi fashion.
- Conditional loans for sector pledging.

If you have a great idea or suggestion, join the discussion on the [FVM forum](https://fvm-forum.filecoin.io).
