---
title: 'Get Started'
description: 'The Filecoin Network is made with miners and clients. They make deals and contribute to maintaining the Filecoin blockchain, obtaining storage services, and receiving rewards in the process. This section walks your through how to get started, build a node, and create a simple application.'
breadcrumb: ''
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Become familiar with the concepts

- Read [How Filecoin Works](../about-filecoin/how-filecoin-works.md) and [IPFS and Filecoin](../about-filecoin/ipfs-and-filecoin.md).
- Complete the [Protoschool tutorial](https://proto.school/verifying-storage-on-filecoin/) to get a closer, practical look.
- Check out the [existing networks](https://networks.filecoin.io).
- Explore the mainnet using one of the [available block explorers](explore-the-network.md). Discover the blocks, the messages, the scoreboards for miners. Watch the self-adjusting base fee, the deals, and all the things tracked by the chain.

## Store content on Filecoin

- Visit [Slate](../store/slate.md) to store content on Filecoin and make deals from your browser.
- Install and launch your [Lotus Node](lotus/README.md). Setup your first wallet and learn how to [send and receive ⨎](lotus/send-and-receive-fil.md) and [make storage deals](../store/lotus/store-data.md).
- Use [Starling](../store/starling.md) to simplify the management of storage deals in Lotus.

## Contribute to Filecoin

- [Mine Filecoin](../mine/README.md): for those wanting to provide storage and retrieval capabilities to the Network.
- [Build on Filecoin](../build/README.md): for those wanting to build applications that interact with the Filecoin network.

## Filecoin Software

| Name                                                             |                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Lotus](lotus/README.md)                                         | Implementation of Filecoin node and miner by Protocol Labs. <br /><br />For users that want to participate in the Filecoin network validating blocks, manage a wallet and perform deals on the command line.                                                                            |
| [Slate](../store/slate.md)                                       | Slate is a fully open-source file sharing network designed for research and collaboration, powered by [Textile](https://textile.io), [IPFS](https://ipfs.io) and Filecoin. <br /><br /> For users that want to easily store their data in a cloud backed by decentralized technologies. |
| [Powergate](../build/powergate.md)                               | A multitiered storage solution that stores data with IPFS ("Hot" storage layer) and Filecoin ("Cold" storage layer).                                                                                                                                                                    |
| [Fleek space daemon](https://blog.fleek.co/posts/daemon-release) | A wrapper around awesome IPFS tools to start coding a decentralized desktop app as fast as possible. It is built on top of Textile Threads, Buckets and Powergate.                                                                                                                      |
| [Starling](../store/starling.md)                                 | A command-line interface for simplified, coordinated, decentralized storage on the Filecoin network.                                                                                                                                                                                    |

## Wallets

| Name                                             |                                                                                                                                                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Lotus](lotus/README.md)                         | Lotus can manage bls, sec1p256k1 wallets and supports [Ledger integration](lotus/ledger.md).                                                                                                |
| [Glif wallet](https://wallet.glif.io/?network=f) | Glif is a lightweight web interface to send and receive Filecoin with a Ledger device ([instructions](https://reading.supply/@glif/install-the-filecoin-app-on-your-ledger-device-y33vhX)). |

There are a number of [additional wallets](https://docs.filecoin.io/reference/#other-wallets) that support Filecoin tokens including mobile wallets.

## Filecoin implementations

There are 4 Filecoin protocol implementations (or “node software”) currently in progress:

- [lotus](https://github.com/filecoin-project/lotus/) (Go): This implementation is closest to feature-complete and is therefore, the recommended Filecoin protocol implementation.
- [forest](https://github.com/chainsafe/forest) (Rust)
- [fuhon](https://github.com/filecoin-project/cpp-filecoin) (C++)
- [venus](https://github.com/filecoin-project/venus) (Go)

Each of these software clients implements the Filecoin protocol as described in the [Filecoin protocol specification](https://filecoin-project.github.io/specs). To learn more about why there are multiple Filecoin implementations, please read [this blog post](https://filecoin.io/blog/announcing-filecoin-implementations-in-rust-and-c++/).

Here is a snapshot of each implementation’s progress across the primary parts of the Filecoin protocol (updated June 24, 2020):

|                    | lotus | venus | forest | fuhon |
| ------------------ | ----- | ----- | ------ | ----- |
| 1. Node            | ✅    | ✅    | ✅     | ✅    |
| 2. Files & data    | ✅    | 🔶    | 🔶     | ✅    |
| 3. Virtual Machine | ✅    | ✅    | 🔶     | 🔶    |
| 4. VM Actors       | 🔶    | 🔶    | 🔶     | 🔶    |
| 5. Blockchain      | ✅    | ✅    | ✅     | ✅    |
| 6. Token           | ✅    | ✅    | ✅     | ✅    |
| 7. Storage Mining  | ✅    | 🔄    | 🔄     | 🔄 🔶 |
| 8. Market          | ✅    | ✅    | 🔄     | ✅    |

✅ : fully featured implementation
🔄 : reuses components from another implementation
🔶 : partial implementation
