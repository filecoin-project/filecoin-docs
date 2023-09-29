---
description: >-
  Nodes are participants that contribute to the network’s operation and maintain
  its integrity. There are two major node implementations running on the
  Filecoin network today, with more in the works.
---

# Implementations

## Lotus

![The Lotus implementation logo.](../../.gitbook/assets/nodes-implementations-overview-lotus-logo.webp)

Lotus is the reference implementation of the Filecoin protocol, developed by Protocol Labs, the organization behind Filecoin. Lotus is a full-featured implementation of the Filecoin network, including the storage, retrieval, and mining functionalities. It is written in Go and is designed to be modular, extensible, and highly scalable.

[Learn more about Lotus](lotus.md)

## Venus

![The Venus implementation logo.](../../.gitbook/assets/nodes-implementations-overview-venus-logo.webp)

Venus is an open-source implementation of the Filecoin network, developed by IPFSForce. The project is built in Go and is designed to be fast, efficient, and scalable.

Venus is a full-featured implementation of the Filecoin protocol, providing storage, retrieval, and mining functionalities. It is compatible with the Lotus implementation and can interoperate with other Filecoin nodes on the network.

One of the key features of Venus is its support for the Chinese language and market. Venus provides a Chinese language user interface and documentation, making it easier for Chinese users to participate in the Filecoin network.

[Learn more about Venus](venus.md)

## Implementation differences

While Lotus and Venus share many similarities, they differ in their development, feature sets, focus, and community support. Depending on your needs and interests, you may prefer one implementation over the other:

### Compatibility

Both Lotus and Venus are fully compatible with the Filecoin network and can interoperate with other Filecoin nodes on the network.

### Features

While both implementations provide storage, retrieval, and mining functionalities, they differ in their feature sets. Lotus includes features such as a decentralized storage market, a retrieval market, and a built-in consensus mechanism, while Venus includes features such as automatic fault tolerance, intelligent storage allocation, and decentralized data distribution.

### Focus

Lotus has a more global focus, while Venus has a stronger focus on the Chinese market. Venus provides a Chinese language user interface and documentation, making it easier for Chinese users to participate in the Filecoin network.

## Other implementations

The following implementations exist, but aren’t fully featured.

### Forest

![Forest logo.](../../.gitbook/assets/nodes-implementations-overview-venus-forest.webp)

Forest is an implementation of Filecoin written in Rust. It is currently in beta. The implementation will take a modular approach to building a full Filecoin node in two parts:

* Building Filecoin’s security critical systems in Rust from the Filecoin Protocol Specification, specifically the virtual machine, blockchain, and node system,
* Integrating functional components for storage mining and storage & retrieval markets to compose a fully functional Filecoin node implementation.

You can find the [Forest codebase on GitHub](https://github.com/ChainSafe/forest) and the documentation site at [`chainsafe.github.io/forest`](https://chainsafe.github.io/forest/).
