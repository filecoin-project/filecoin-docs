---
title: 'Store data on Filecoin'
description: 'Start storing data on the Filecoin network.'
breadcrumb: 'Store'
---

# Store data on Filecoin

Welcome to the starting point to begin interacting with the Filecoin Network. Content in this section will help you to:

- Learn about the different implentations and existing utilities to interact with the Filecoin network and store data in it.
- Install and run a [Lotus Node](lotus/README.md), using it to manage a Filecoin wallet and to store data on the network.

## Filecoin Software

| Name                                                     |                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Lotus](lotus/)                                          | Implementation of Filecoin node and miner by Protocol Labs. <br /><br />For users that want to participate in the Filecoin network validating blocks, manage a wallet and perform deals on the command line.                                                                            |
| [Slate](https://slate.host)                              | Slate is a fully open-source file sharing network designed for research and collaboration, powered by [Textile](https://textile.io), [IPFS](https://ipfs.io) and Filecoin. <br /><br /> For users that want to easily store their data in a cloud backed by decentralized technologies. |
| [Powergate](../build/powergate.md)                       | a multitiered storage solution that stores data with IPFS ("Hot" storage layer) and Filecoin ("Cold" storage layer).                                                                                                                                                                    |
| [Starling](https://github.com/filecoin-project/starling) | A command-line interface for simplified, coordinated, decentralized storage on the Filecoin network                                                                                                                                                                                     |

### Filecoin implementations

There are 4 Filecoin protocol implementations (or “node software”) currently in progress:

- [lotus](https://github.com/filecoin-project/lotus/) (Go): This implementation is closest to feature-complete and is therefore, the recommended Filecoin protocol implementation.
- [forest](https://github.com/chainsafe/forest) (Rust)
- [fuhon](https://github.com/filecoin-project/cpp-filecoin) (C++)
- [go-filecoin](https://github.com/filecoin-project/go-filecoin) (Go)

Each of these software clients implements the Filecoin protocol as described in the [Filecoin protocol specification](https://filecoin-project.github.io/specs). Please note that the protocol spec and all implementations are still works-in-progress and expected to change significantly between now and Filecoin mainnet launch. To learn more about why there are multiple Filecoin implementations, please read [this blog post](https://filecoin.io/blog/announcing-filecoin-implementations-in-rust-and-c++/).

Here is a snapshot of each implementation’s progress across the primary parts of the Filecoin protocol (updated June 24, 2020):

|                    | lotus | go-filecoin | forest | fuhon |
| ------------------ | ----- | ----------- | ------ | ----- |
| 1. Node            | ✅    | ✅          | ✅     | ✅    |
| 2. Files & data    | ✅    | 🔶          | 🔶     | ✅    |
| 3. Virtual Machine | ✅    | ✅          | 🔶     | 🔶    |
| 4. VM Actors       | 🔶    | 🔶          | 🔶     | 🔶    |
| 5. Blockchain      | ✅    | ✅          | ✅     | ✅    |
| 6. Token           | ✅    | ✅          | ✅     | ✅    |
| 7. Storage Mining  | ✅    | 🔄          | 🔄     | 🔄 🔶 |
| 8. Market          | ✅    | ✅          | 🔄     | ✅    |

✅ : fully featured implementation
🔄 : reuses components from another implementation
🔶 : partial implementation
