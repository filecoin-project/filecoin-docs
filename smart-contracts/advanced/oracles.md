---
description: >-
  Oracles act as a bridge between the Filecoin network and external data
  sources. Secure oracles allow smart contracts on the FVM to access and use
  external data sources.
---

# Oracles

In the Filecoin network, on-chain data and the state of smart contracts are isolated from external data sources. They cannot access real-world information without breaking the deterministic attributes of the network. Since smart contracts cannot access information outside the Filecoin network, oracles are used as trusted entities to provide external data to the network.

Oracles are an essential component of many blockchain applications, as they enable the blockchain to interact with the real world and provide more functionality to blockchain-based systems. Oracles can retrieve data from external sources, verify the data, and submit it to the blockchain for use by smart contracts and decentralized applications (dapps).

Oracles enable builders to integrate the following features into their projects:

* **Price feeds**: DeFi protocols like cross-chain lending rely on oracles for various token or token pair prices.
* **Cross-chain storage deal verification**: enable applications running on any blockchains to use the Filecoin decentralized storage and allow them to verify deal status and proofs.
* **Perpetual storage**: enable automated deal renewal and repair with the oracle providing deal status off-chain.

## Available oracles

There are several oracle-protocols built upon the FVM. Builders can integrate these oracles into their applications today.

### [Pyth](https://pyth.network/)

Pyth data is sourced directly from financial institutions across both traditional finance and the cryptocurrency industry.

Pyth publishes both the price feed and a confidence interval for each product. Learn more about [Pyth confidence intervals](https://docs.pyth.network/price-feeds/best-practices#confidence-intervals).

**Pyth smart contracts**

Pyth’s smart contracts are live on the Filecoin Mainnet and Calibration testnet.


| Name             | Address                                      | Mainnet | Calibration |
| ---------------- | -------------------------------------------- | ------- | ----------- |
| [Pyth - Mainnet](https://filecoin.blockscout.com/address/0xA2aa501b19aff244D90cc15a4Cf739D2725B5729?tab=contract) | `0x045CE60839d108B43dF9e703d4b25402a6a28a0d` | ✔️      |             |
| [Pyth - Calibration](https://calibration.filfox.info/en/address/0xA2aa501b19aff244D90cc15a4Cf739D2725B5729) | `0x15e6Cc0D69A162151Cadfba035aa10b82b12b970` |         | ✔️          |


**Pyth x Filecoin Price Feed IDs**

Price Feed IDs for FIL are also available on various chains. These can be found at [Pyth - Price Feed IDs](https://pyth.network/developers/price-feed-ids) and search for 'FIL'. Learn more at [Pyth docs - Price Feed IDs](https://docs.pyth.network/price-feeds/price-feed-ids).


#### **Further Pyth resources**

* [Pyth docs](https://docs.pyth.network/)
* [Pyth - Best Practices](https://docs.pyth.network/price-feeds/best-practices)
* [Pyth Benchmarks - historical price feeds](https://docs.pyth.network/benchmarks)



### [Tellor](https://tellor.io/)

Tellor is an _optimistic_ oracle. Builders should not accept instant price quotes and should wait a few minutes before locking in details.

Tellor supports a price feed oracle and a data oracle for the Filecoin network. The data oracle can provide Filecoin-specific data, such as the reputation of storage providers, which helps lending protocols determine interest rates for SPs.

**Tellor smart contracts**

Teller’s smart contracts are live on the Filecoin Mainnet and Calibration testnet.

| Name             | Address                                      | Mainnet | Calibration |
| ---------------- | -------------------------------------------- | ------- | ----------- |
| Bridged TRB      | `0x045CE60839d108B43dF9e703d4b25402a6a28a0d` | ✔️      |             |
| Playground/TRB   | `0x15e6Cc0D69A162151Cadfba035aa10b82b12b970` |         | ✔️          |
| Oracle           | `0xb2CB696fE5244fB9004877e58dcB680cB86Ba444` | ✔️      | ✔️          |
| Governance       | `0xb55bB55f7D8b4F26Bd18198088C96488D95cab39` | ✔️      | ✔️          |
| Autopay          | `0x60cBf3991F05a0671250e673Aa166e9D1A0C662E` | ✔️      | ✔️          |
| TellorFlex       | `0xb2CB696fE5244fB9004877e58dcB680cB86Ba444` | ✔️      | ✔️          |
| QueryDataStorage | `0xf44166ca8bdB612268a4D401e4c5147968E5a190` | ✔️      | ✔️          |
| Multisig         | `0x34Fae97547E990ef0E05e05286c51E4645bf1A85` | ✔️      | ✔️          |

#### **Further Tellor resources**

* [Tellor docs](https://docs.tellor.io/)
* [Filecoin Storage Insurance Contract](https://github.com/tellor-io/filecoin-query-insurance-impl/tree/main)
* [Getting Tellor Data for any use case](https://www.youtube.com/watch?v=AQIDqTLguyI) - FVM Dataverse Hackathon
