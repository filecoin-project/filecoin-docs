---
title: "Cross Chain Bridges"
description: "This page introduces cross-chain bridges in regards to the Filecoin network."
lead: "Blockchain networks are often isolated and cannot interact with each other directly, so cross-chain bridges serve as a link between them and bring interoperability between different blockchains. Bridges connect two blockchain networks, allowing users to move assets or on-chain messages from one network to another."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-advanced"
    identifier: "bridges-044d3a8c19798294d899b53cbf5979bd"
weight: 120
toc: true
---

Cross-chain bridges have many use cases, such as enabling decentralized exchanges to support the trading of assets from multiple blockchain networks or allowing users to access decentralized applications (dApps) on different networks. They are also helpful for interoperability between separate blockchain networks, essential for the growth and adoption of blockchain technology.

## Available bridges

Regarding bridges, security is the top concern. The Filecoin team is focused on integrating with notary-based bridges that have a solid security model. Eventually, trustless light-client-based bridging solutions will be available.

### [Axelar](https://axelar.network/)

Axelar enables both token bridge and general message passing and is well-connected to major EVM chains & Cosmos ecosystem.

Initially, the bridge will support the following assets: wFIL, wETH, wBTC, USDC, and USDT.

#### Axelar smart contracts

Currently, Axelar supports Filecoin Mainnet.

| Name    | Mainnet                                      |
| ------- | -------------------------------------------- |
| wFIL    | `0x60E1773636CF5E4A227d9AC24F20fEca034ee25A` |
| axlUSDC | `0xEB466342C4d449BC9f53A865D5Cb90586f405215` |
| axlUSDT | `0x7f5373AE26c3E8FfC4c77b7255DF7eC1A9aF52a6` |
| axlWBTC | `0x1a35EE4640b0A3B87705B0A4B45D227Ba60Ca2ad` |
| axlWETH | `0xb829b68f57CC546dA7E5806A929e53bE32a4625D` |

#### Further Axelar resources

- [Axelar docs for developers](https://docs.axelar.dev/dev/intro)
- [Axelar with Squid Router](https://app.squidrouter.com/ )
- [Getting Started with Axelar on FVM Tutorial](https://www.youtube.com/watch?v=L7cw5FhxW4s)

### [Celer](https://cbridge.celer.network/1/314)

Celer is a blockchain interoperability protocol enabling a one-click user experience accessing tokens, DeFi, GameFi, NFTs, governance, and privacy solutions across multiple chains. Celer has been successfully supporting Filecoin on both assets bridging using it's CBridge and messaging passing through Celer Inter-chain Messaging (Celer IM).

Initially, the bridge will support the following assets: wFIL, wETH, wBTC, USDC, and USDT.

#### Celer smart contracts

Celar's CBridge supports both Filecoin Mainnet and Calibration testnet.

| Name       | Mainnet                                      | Calibration                                  |
| ---------- | -------------------------------------------- | -------------------------------------------- |
| wFIL       | `0x60E1773636CF5E4A227d9AC24F20fEca034ee25A` |                                              |
| USDC       | `0x2421db204968A367CC2C866CD057fA754Cb84EdF` | `0xf5C6825015280CdfD0b56903F9F8B5A2233476F5` |
| USDT       | `0x422849b355039bc58f2780cc4854919fc9cfaf94` | `0x7d43AABC515C356145049227CeE54B608342c0ad` |
| WBTC       | `0x592786e04c47844aa3b343b19ef2f50a255a477f` | `0x265B25e22bcd7f10a5bD6E6410F10537Cc7567e8` |
| WETH       | `0x522b61755b5ff8176b2931da7bf1a5f9414eb710` | `0x5471ea8f739dd37E9B81Be9c5c77754D8AA953E4` |
| MessageBus | `0x6ff2130fbdd2837b0c92d7f56f6c017642d84f66` | `0xd5818D039A702DdccfD11A900A40B3dc6DA03CEc` |

#### Further Celer resources

- [cBridge docs](https://cbridge-docs.celer.network/)
- [Celer IM Docs](https://im-docs.celer.network/developer/celer-im-overview)
