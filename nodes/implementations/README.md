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

### Forest

![Forest logo.](../../.gitbook/assets/nodes-implementations-overview-venus-forest.webp)

Forest is the Rust implementation of the Filecoin protocol with low hardware requirements (16 GiB, 4 cores), developed by ChainSafe. Forest is focused on blockchain analytics, and does not support storage, retrieval or mining.

Forest is currently used for generating up-to-date snapshots and managing archival copies of the Filecoin blockchain. Currently, the Forest team is hosting the entire Filecoin archival data for the community to use. This can be downloaded for free [here](https://forest-archive.chainsafe.dev/list/).

You can learn more about Forest at the [codebase on GitHub](https://github.com/ChainSafe/forest) and [documentation site](https://docs.forest.chainsafe.io/).
