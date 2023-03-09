---
title: "Hardhat"
description: "The FEVM Hardhat kit is a starter Hardhat project for developing, deploying, and testing Solidity smart contracts on the Filecoin EVM runtime."
lead: "The [FEVM Hardhat kit](https://github.com/filecoin-project/fevm-hardhat-kit) is a starter Hardhat project for developing, deploying, and testing Solidity smart contracts on the Filecoin EVM runtime."
draft: false
images: []
type: docs
menu:
  developers:
    identifier: "hardhat-b363bf9e553014e146b735e0392b3a33"
weight: 6
toc: true
---

The [FEVM Hardhat kit](https://github.com/filecoin-project/fevm-hardhat-kit) contains three types of contracts:

- Basic Solidity Examples: simple default contracts to show off fundamental Solidity capabilities.
- Filecoin API Examples: contracts demonstrating how to use the [Filecoin API](#filecoin-apis) in Solidity to access storage deals and other Filecoin-specific functions.
- Filecoin Mock APIs: contracts that mock the Filecoin APIs intended for faster prototyping.

#### Filecoin API Examples

- `FilecoinMarketConsumer.sol`: shows how to get data on specific deals. It's a great way to become acquainted with the Filecoin Solidity API and write logic around existing deals.
- ` DealRewarder.sol`: based on [the `deal-bounty-contract` repository](https://github.com/lotus-web3/deal-bounty-contract/).

    It demonstrates how to set a bounty for a Filecoin Piece CID, which represents a piece of data that's been turned into a CAR file to store on Filecoin. Once the Piece CID has been successfully stored with a storage provider, the contract will send the bounty reward to the storage client who made the deal.

{{< alert >}}
You can use the [Lotus CLI to make a storage deal](https://lotus.filecoin.io/tutorials/lotus/store-and-retrieve/set-up/) on the Filecoin Hyperspace testnet.
{{< /alert >}}

## Filecoin APIs

The primary advantage of the Filecoin EVM runtime over other EVM-based chains is the ability to access Filecoin storage deals. This can be done in the Filecoin EVM runtime using the [Filecoin.sol library](https://github.com/Zondax/filecoin-solidity). This library is maintained by [Zondax](https://zondax.ch/).

{{< alert "warning" >}}
This library is currently in beta. It has yet to be audited, and the APIs will likely change frequently.
{{< /alert >}}

The library is [available from GitHub](https://github.com/Zondax/filecoin-solidity). The Zondax team writes and maintains this library's [documentation](https://docs.zondax.ch/fevm/filecoin-solidity).

The Filecoin.sol library provides a Solidity interface to Filecoin's [built-in actors]({{< relref "#" >}}), which are the core actors that power the Filecoin network. [Zondax provides a list](https://docs.zondax.ch/fevm/filecoin-solidity/api/) of all built-in actor methods currently supported by the Filecoin.sol API.

## Data DAO Example

To get started using the Filecoin APIs, [here's an FVM-compatible deal bounty contract example](https://github.com/lotus-web3/deal-bounty-contract/) that empowers Filecoin Data DAO use cases. This example lists data bounties to claim and pays out the bounty when deals are made with the built-in Filecoin Market actor.
