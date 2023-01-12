---
title: "Get started"
description: "The Filecoin Network is made with storage providers and clients. They make deals and contribute to maintaining the Filecoin blockchain, obtaining storage services, and receiving rewards in the process. This section walks you through how to get started, build a node, and create a simple application."
lead: "The Filecoin Network is made with storage providers and clients. They make deals and contribute to maintaining the Filecoin blockchain, obtaining storage services, and receiving rewards in the process. This section walks your through how to get started, build a node, and create a simple application."
draft: false
images: []
type: docs
menu:
  get-started:
    parent: "lorem"
    identifier: "get-started-62cc2fc519b3de021978f6474293a2b9"
weight: 100
toc: true
aliases:
    - "/get-started"
    - "/how-to/install-filecoin"
    - "/get-started/resources"
---

Working with blockchains is difficult, and the inherent complexity of blockchains can be overwhelming for new developers. If you're not sure where to begin, we recommend you take a look at these sections before diving into more complex parts of Filecoin:

{{< alert  >}}
Looking for Lotus? You can find Lotus specific documentation over at [lotus.filecoin.io](https://lotus.filecoin.io)
{{< /alert >}}

## Become familiar with the concepts

- Read [How Filecoin Works]({{< relref "how-filecoin-works" >}}) and [IPFS and Filecoin]({{< relref "filecoin-and-ipfs" >}}).
- Complete the [Protoschool tutorial](https://proto.school/verifying-storage-on-filecoin/) to get a closer, practical look.
- Check out the [existing networks](https://network.filecoin.io).
- Explore the mainnet using one of the [available block explorers]({{< relref "explore-the-network" >}}). Discover the blocks, the messages, the scoreboards for storage providers. Watch the self-adjusting base fee, the deals, and all the things tracked by the chain.

## Store content on Filecoin

Looking for an easy way to store and access your files on Filecoin? Use one of the community built tools and services to get started. [Take a look now →]({{< relref "start-storing" >}})

- Visit [Slate](https://slate.host/) to store content on Filecoin and make deals from your browser.
- Install and launch your [Lotus Node](https://lotus.filecoin.io). Setup your first wallet and learn how to [send and receive ⨎](https://lotus.filecoin.io/docs/set-up/manage-fil/) and [make storage deals](https://lotus.filecoin.io/docs/storage-providers/manage-storage-deals/).
- Use [Starling]({{< relref "developers/storage-helpers/starling" >}}) to simplify the management of storage deals in Lotus.
- Check out the [Lotus API methods](https://lotus.filecoin.io/docs/apis/json-rpc/) to learn how to programmatically store data on the Filecoin network.

## Contribute to Filecoin

- [Mine Filecoin]({{< relref "storage-provider/basics/overview" >}}): for those wanting to provide storage and retrieval capabilities to the Network.
- [Build on Filecoin]({{< relref "#build/get-building/overview" >}}): for those wanting to build applications that interact with the Filecoin network.

## Filecoin Software

| Name                                                             |                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Lotus](https://lotus.filecoin.io)                                         | Implementation of Filecoin node, maintained by Protocol Labs. <br /><br />For users that want to participate in the Filecoin network validating blocks, manage a wallet and perform deals on the command line.                                                                            |
| [Slate](https://slate.host/)                                       | Slate is a fully open-source file-sharing network designed for research and collaboration, powered by [Textile](https://textile.io), [IPFS](https://ipfs.tech) and Filecoin. <br /><br /> For users that want to easily store their data in a cloud backed by decentralized technologies. |
| [Powergate](https://blog.textile.io/filecoin-developer-tools-concepts/)                               | A multitiered storage solution that stores data with IPFS ("Hot" storage layer) and Filecoin ("Cold" storage layer).                                                                                                                                                                    |
| [Fleek space daemon](https://blog.fleek.co/posts/daemon-release) | A wrapper around awesome IPFS tools to start coding a decentralized desktop app as fast as possible. It is built on top of Textile Threads, Buckets, and Powergate.                                                                                                                      |
| [Starling]({{< relref "developers/storage-helpers/starling" >}})                                 | A command-line interface for simplified, coordinated, decentralized storage on the Filecoin network.                                                                                                                                                                                    |

## Wallets

Filecoin wallets allow you to manage FIL, Filecoin's native token. Wallets store the private keys that allow you to authorize Filecoin transactions, including paying for storage deals and sending FIL to other accounts. See the [About Wallet Addresses](https://lotus.filecoin.io/docs/set-up/manage-fil) to learn about the kinds of addresses used by Filecoin accounts.

The table below lists the recommended wallet implementations:

| Name                                             |                                                                                                                                                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Glif Wallet](https://wallet.glif.io/) | Glif Wallet is a lightweight web interface to send and receive Filecoin with a Ledger device ([instructions](https://reading.supply/@glif/install-the-filecoin-app-on-your-ledger-device-y33vhX)).|
| [Glif Safe](https://safe.glif.io/) | Glif Safe is a multisig wallet with a lightweight web interface to send and receive Filecoin with a Ledger device ([instructions](https://reading.supply/@glif/install-the-filecoin-app-on-your-ledger-device-y33vhX)). Check out the [Glif Safe GitHub repo](https://github.com/glifio/safe) for more information.|
| [Lotus](https://lotus.filecoin.io)                         | Lotus includes a command-line wallet that can manage bls, sec1p256k1, multisig wallets, and supports [Ledger integration](https://lotus.filecoin.io/docs/set-up/manage-fil/#ledger).|

Glif Safe and Lotus both support multisig wallets, a multisig wallet is a wallet that requires two or more private keys in order to sign and send transactions. Multisig wallets prevent any one private key holder from signing and sending a transaction, this is beneficial for wallets with multiple users and for people who are concerned about an attack on their wallet.

Lotus, Glif Safe, and Glif Wallet all support [Ledger](https://www.ledger.com/) hardware devices, allowing you to use Filecoin without storing your private keys on a network-connected device. This can help protect your valuable private keys from malicious software on your computer and is commonly used for accounts with large balances.

There are a number of [additional wallets](https://docs.filecoin.io/reference/#other-wallets) that support Filecoin tokens, including mobile wallets.

## Filecoin implementations

There are 4 Filecoin protocol implementations (or "node software") currently in progress:

- [lotus](https://github.com/filecoin-project/lotus/) (Go): This implementation is closest to feature-complete and is, therefore, the recommended Filecoin protocol implementation.
- [venus](https://github.com/filecoin-project/venus) (Go): This implementation is currently running tens of nodes on the Filecoin network. Participants are encouraged to experiment with this implementation and provide feedback to the [Venus team](https://filecoinproject.slack.com/archives/CEHHJNJS3).
- [forest](https://github.com/chainsafe/forest) (Rust)
- [fuhon](https://github.com/filecoin-project/cpp-filecoin) (C++)

Each of these software clients implements the Filecoin protocol as described in the [Filecoin protocol specification](https://filecoin-project.github.io/specs). To learn more about why there are multiple Filecoin implementations, please read [this blog post](https://filecoin.io/blog/announcing-filecoin-implementations-in-rust-and-c++/).

Here is a snapshot of each implementation's progress across the primary parts of the Filecoin protocol (updated August 1, 2022):

|                    | Lotus | Venus | Forest | Fuhon (deprecated)|
| ------------------ | ----- | ----- | ------ | ----- |
| Base Language      | Go    | Go    | Rust   | C++  |
| 1. Node            | ✅    | ✅    | ✅     | ✅    |
| 2. Files & data    | ✅    | ✅    | ⛔️     | ✅    |
| 3. Virtual Machine | ✅    | 🔄    | 🔄     | ⛔️    |
| 4. VM Actors       | ✅    | 🔄    | 🔄     | ⛔️    |
| 5. Blockchain      | ✅    | ✅    | ✅     | ✅    |
| 6. Token           | ✅    | ✅    | ✅     | ✅    |
| 7. Storage Mining  | ✅    | ✅    | ⛔️     | ⛔️    |
| 8. Market          | ✅    | ✅    | ⛔️     | ⛔️    |

✅ : fully-featured implementation.
🔄 : reuses components from another implementation.
🔶 : partial implementation.
⛔️ : pending implementation.

Since May 2022, Fuhon's C++ implementation has been deprecated and is currently out of support. The source code is available [here](https://github.com/filecoin-project/cpp-filecoin). There are no immediate plans to introduce another c++ implementation.
