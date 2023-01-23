---
title: "Filecoin virtual machine"
lead: "The Filecoin virtual machine (FVM) is a runtime environment for smart contracts, also called actors, on the Filecoin network. These smart contracts can be written in Solidity or any language that compiles to WASM. Smart contracts enable users to create and enforce rules for storing and accessing data on the network. The FVM is responsible for executing these smart contracts and ensuring that they are executed correctly and securely."
lead: "The Filecoin virtual machine (FVM) is a runtime environment for smart contracts, also called actors, on the Filecoin network. These smart contracts can be written in Solidity, and eventually any language that compiles to WASM will be supported. Smart contracts enable users to create and enforce rules for storing and accessing data on the network. The FVM is responsible for executing these smart contracts and ensuring that they are executed correctly and securely."
draft: false
images: []
type: docs
menu:
  developers:
    parent: "developers"
    identifier: "introduction-304f49b81cae09b423aee1c85243b84d"
weight: 3
toc: true
aliases:
    - "/fvm/basics/introduction/"
    - "/fvm"
---

{{< beta-warning >}}

## What's it for

The FVM enables developers to build many new use cases on top of and with the Filecoin network.

### Data access control

One advantage centralized storage solutions have over web3 services is that they can limit individual data access.

The FVM enables Filecoin network participants to do the same. Threshold encryption networks, like Medusa, can individually or programmatically govern who can access a data collection without any contracts or validators having access to the data themselves.

### Data DAO

In combination with data access controls, the FVM enables the creation and management of data-decentralized-autonomous-organizations (data DAOs). The FVM allows a group of individuals, or organizations, to curate and preserve data collection. Data DAOs can govern and monetize data access and pool the returns into a shared treasury to fund the collections preservation and long-term growth.

### Perpetual storage

Before the FVM, storage deals only lasted a year or two. If users wanted to continue storing their data, they had to create new deals before the end of the current deal. This process was manual.

Now, the FVM allows users to store once and have repair and replication bots manage the repetitive storage deal creation tasks. Using a smart contract, users can provision a wallet with FIL, and storage providers can use that FIL to fund data storage permanently. Repair bots can monitor the storage deals and replicate the data with other storage providers when necessary.

This process gives users the long-term storage permanence that other blockchains claim while also benefiting from Filecoin's verifiable storage proofs, ensuring that the network stores and replicates the data correctly.

### Loans

Put your FIL to work. FIL token holds can help Filecoin storage providers gain access to FIL for storage collateral and receive interest in exchange. These loans can be under-collateralized thanks to the on-chain storage history of past storage provider performance. Community members can use this history to generate reputation scores, enabling everyone to identify good borrowers. On top of that, loans can be automatically paid back to investors by using a multisig as the storage provider's _owner_ address that includes lenders and a third party to help negotiate payback.

New FVM-enabled smart contracts give every FIL token holder access to new yield opportunities on their holdings while also benefiting the whole Filecoin economy.

### Ethereum compatibility

Since the FVM is fully EVM-compatible, new ERC-20 tokens can be launched on the Filecoin network or bridged directly to token pools on other chains. As well as that, layer two networks can plug into Filecoin and leverage its storage power and security.

## Why now

There are three stages to the development of Filecoin:

1. Build a robust decentralized storage network.
1. Onboard and safeguard humanity's most important data.
1. Allow computation over that data to enable web-scale applications.

The FVM covers stage 3. We had to ensure that the Filecoin network was stable, robust, and secure before we allowed any development on top of the network.

## FIL Lisbon

Molly and Raul from Protocol Labs hosted a great introduction to the FVM project. A recording of the presentation is [available on YouTube](https://www.youtube.com/watch?v=EqLlyJ13DLY).

{{< youtube EqLlyJ13DLY >}}
