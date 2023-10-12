---
title: "Oracles"
description: "This page introduces with oracle solutions are available on the Filecoin network."
lead: "Oracles act as a bridge between the Filecoin network and external data sources. Secure oracles allow smart contracts on the FVM to access and use external data sources, such as token price quotes, weather data, and other types of information."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-advanced"
    identifier: "oracles-b2a4fe7054cd4d957f26d06159997150"
weight: 110
toc: true
---

In the Filecoin network, on-chain data and the state of smart contracts are isolated from external data sources. They cannot access real-world information without breaking the deterministic attributes of the network. Since smart contracts cannot access information outside the Filecoin network, oracles are used as trusted entities to provide external data to the network.

Oracles are an essential component of many blockchain applications, as they enable the blockchain to interact with the real world and provide more functionality to blockchain-based systems. Oracles can retrieve data from external sources, verify the data, and submit it to the blockchain for use by smart contracts and decentralized applications (dapps).

Oracles enable builders to integrate the following features into their projects: 

- **Price feeds**: DeFi protocols like cross-chain lending rely on oracles for various token or token pair prices.
- **Cross-chain storage deal verification**:  enable applications running on any blockchains to use the Filecoin decentralized storage and allow them to verify deal status and proofs.
- **Perpetual storage**: enable automated deal renewal and repair with the oracle providing deal status off-chain.

## Available oracles

There are several oracle-protocols built upon the FVM. Builders can integrate these oracles into their applications today.

### [Tellor](https://tellor.io/) 

Tellor is an _optimistic_ oracle. Builders should not accept instant price quotes and should wait a few minutes before locking in details.

Tellor supports a price feed oracle and a data oracle for the Filecoin network. The data oracle can provide Filecoin-specific data, such as the reputation of storage providers, which helps lending protocols determine interest rates for SPs. 

#### Tellor smart contracts

Teller's smart contracts are live on the Filecoin Mainnet and Calibration testnet.  

| Name             | Address                                      | Mainnet            | Calibration        |
| ---------------- | -------------------------------------------- | ------------------ | ------------------ |
| Bridged TRB      | `0x045CE60839d108B43dF9e703d4b25402a6a28a0d` | :heavy_check_mark: |                    |
| Playground/TRB   | `0x15e6Cc0D69A162151Cadfba035aa10b82b12b970` |                    | :heavy_check_mark: |
| Oracle           | `0xb2CB696fE5244fB9004877e58dcB680cB86Ba444` | :heavy_check_mark: | :heavy_check_mark: |
| Governance       | `0xb55bB55f7D8b4F26Bd18198088C96488D95cab39` | :heavy_check_mark: | :heavy_check_mark: |
| Autopay          | `0x60cBf3991F05a0671250e673Aa166e9D1A0C662E` | :heavy_check_mark: | :heavy_check_mark: |
| TellorFlex       | `0xb2CB696fE5244fB9004877e58dcB680cB86Ba444` | :heavy_check_mark: | :heavy_check_mark: |
| QueryDataStorage | `0xf44166ca8bdB612268a4D401e4c5147968E5a190` | :heavy_check_mark: | :heavy_check_mark: |
| Multisig         | `0x34Fae97547E990ef0E05e05286c51E4645bf1A85` | :heavy_check_mark: | :heavy_check_mark: |

#### Further Tellor resources

- [Tellor docs](https://docs.tellor.io/)
- [Filecoin Storage Insurance Contract](https://github.com/tellor-io/filecoin-query-insurance-impl/tree/main)
- [Getting Tellor Data for any use case](https://www.youtube.com/watch?v=AQIDqTLguyI) - FVM Dataverse Hackathon
