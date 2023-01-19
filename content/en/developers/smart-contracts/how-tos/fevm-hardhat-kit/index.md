---
title: "FEVM Hardhat kit"
description: "The [**FEVM Hardhat kit**](https://github.com/filecoin-project/fevm-hardhat-kit) is a starter hardhat project for developing, deploying, and testing Solidity smart contracts on the FEVM (Ethereum Virtual Machine on Filecoin)."
lead: "The [**FEVM Hardhat kit**](https://github.com/filecoin-project/fevm-hardhat-kit) is a starter hardhat project for developing, deploying, and testing Solidity smart contracts on the FEVM (Ethereum Virtual Machine on Filecoin)."
menu:
    developers:
        parent: "developers-how-tos"
type: docs
weight: 50
draft: false
images: []
aliases:
    - "/developers/smart-contracts/how-tos/fevm-hardhat-kit/"
    - "/fvm/how-tos/fevm-hardhat-kit/"
---

{{< beta-warning >}}

## About

The kit contains 3 main types of contracts:

- Basic Solidity Examples: Simple default contracts to show off basic solidity

- Filecoin API Examples: Contracts that demo how to use the [**Filecoin API**](#filecoin-apis) in Solidity to access storage deals and other Filecoin-specific functions.

- Filecoin Mock APIs: Contracts that mock the Filecoin APIs.

## Filecoin APIs

The primary advantage of the FEVM over other EVM based chains is the ability to access and program around Filecoin storage deals. This can be done in the FEVM via the [Filecoin.sol library maintained by Zondax](https://github.com/Zondax/filecoin-solidity).

**Note this library is currently in BETA.** It is not yet audited, and the APIs will likely be changing with time.

- [Docs for the Filecoin Solidity library](https://docs.zondax.ch/fevm/filecoin-solidity/)

This library provides a Solidity interface to Filecoin's [built-in actors](https://spec.filecoin.io/#section-systems.filecoin_vm.sysactors), which are the core actors that power the Filecoin network. (Actors are Filecoin's equivalent of smart contracts.) [Here's a list](https://docs.zondax.ch/fevm/filecoin-solidity/api/) of all built-in actor methods currently supported by the Filecoin Solidity API.

## Data DAO Example

To get started using the Filecoin APIs, [here's an FVM-compatible deal bounty contract example](https://github.com/lotus-web3/deal-bounty-contract/) that empowers Filecoin Data DAO uses cases. This example provides lists data bounties to claim, and pays out the bounty when deals are proven to be made with the built-in Filecoin Market actor.
