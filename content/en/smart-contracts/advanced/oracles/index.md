---
title: "Oracles"
description: "This page introduces the Oracle solutions which support FVM."
lead: "Oracle acts as a bridge between the Filecoin network and external data sources. Secure Oracle allows smart contracts on FVM to access and use external data sources, such as token price quotes, weather data, or other types of information."
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

In the Filecoin network or any blockchain network, the on-chain data and smart contract state are typically isolated from external data sources and also cannot access real-world information without breaking the deterministic of its consensus. Since smart contracts on FVM cannot access information outside the Filecoin network, Oracle is a trusted entity that can provide data to smart contracts running on FVM. 

Oracles are an important component of many blockchain applications, as they enable the blockchain to interact with the real world and provide more functionality to blockchain-based systems. Oracles can retrieve data from external sources, verify the data, and then submit it to the blockchain for use by smart contracts or other blockchain-based applications. 

FVM brings the on-chain programmability to the Filecoin decentralized storage network which opens so many possibilities to the decentralized storage. A secure Oracle is essential for many of those possibilities on the Filecoin network, including:
- **Price Feed**: DeFi protocols like cross-chain lending, AMM  will rely on Oracle for various token or token pair prices. 
- **Cross-chain storage deal verification**:  It will enable applications running on any blockchains to use the Filecoin decentralized storage and also be able to verify the storage deal status and proof.  
- **Perpertual Storage**: Automated deal renewal and repair with the support of Oracle to provide the storage deal status off-chain.


## Oracles support FVM
There are couple Oracle protocols that have been built to support FVM, and developers can integrate them into their applications.

### Tellor
[Tellor](https://tellor.io/) is a decentralized Oracle protocol for smart contracts to easily get any data. It is an optimistic oracle so builders should not accept instant price quotes and should adopt a couple min waiting period.

Tellor supports both price feed and data oracle for the Filecoin network. Data oracle can provide Filecoin-specific data query, such as storage provider reputation data which is useful for lending protocols to determine interest rates for SPs. 

#### Tellor smart contracts
Tellor Oracle smart contracts are already live on both the Filecoin Mainnet and Calibration testnet.  

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

#### Resource

- [Tellor docs](https://docs.tellor.io/)
- [Filecoin Storage Insurance Contract](https://github.com/tellor-io/filecoin-query-insurance-impl/tree/main)
- [Getting Tellor Data for any use case](https://www.youtube.com/watch?v=AQIDqTLguyI) - FVM Dataverse Hackathon

### Pyth Network

Pyth Network is a price feed oracle that publishes financial market data to multiple blockchains. Price feed data is contributed by over 80 first-party publishers, including some of the biggest exchanges and market making firms in the world. 

The support of FVM is comming soon.