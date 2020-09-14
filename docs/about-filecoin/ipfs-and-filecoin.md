---
title: IPFS and Filecoin
description: Learn more about the relationship and different use-cases between IPFS and Filecoin.
---

# IPFS and Filecoin

Filecoin and IPFS are complementary protocols for storing and sharing data in the decentralized web. While users aren’t required to use Filecoin and IPFS together, the two combined solve significant failings of the current web 2.0 infrastructure. This page aims to explain the relationship between the two protocols and assist users in deciding which option, or combination of options, is best suited for their use-case.

## Incentivizing data reliability

[IPFS](https://ipfs.io) is a free and open-source network stack protocol that allows users to store and transfer verifiable data with each other. IPFS users persist data on the network by [pinning](https://docs-beta.ipfs.io/concepts/persistence/#pinning-in-context) it on their own hardware, to a third-party cloud service (known as Pinning Services), or through community-oriented systems where a group of individual IPFS users share resources to ensure the content remains live.

The lack of a built-in incentive mechanism is the challenge that Filecoin hopes to solve by allowing users to incentivize long-term distributed storage at competitive prices through a marketplace of storage nodes, while maintaining the efficiency and resiliency provided by the IPFS network.

## Different persistence strategies: which should I use?

Depending on your use case, one or multiple of these persistence strategies might be a good fit for you.

### Using IPFS

As mentioned: in IPFS, data is hosted by nodes pinning the desired data. To persist data when a user’s node is offline - users must either rely on other peers to voluntarily/altruistically pin their data, or use a centralized pinning service (often running long lived host nodes on a cloud-service provider) to store the data.

Relying on peers to altruistically cache data might work well where one -- or multiple -- organizations share popular files on an internal network (intranet), or where strong social contracts can be used to ensure the content remains hosted and maintained long-term. Most users in the IPFS Network use a pinning service.

### Using Filecoin

The final option is to pin your data to a decentralized storage marketplace, such as Filecoin. In Filecoin's structure, clients make regular small payments to store data at a specified availability, while miners earn these payments by continuously verifying this data's integrity, storing it, and ensuring it can be retrieved quickly. This allows users to incentivize Filecoin miners to ensure their content will be live when it's needed, a clear advantage over depending solely on the generosity of other network users as required with using IPFS on its own.

## Filecoin, powered by IPFS

First, it is important to understand that Filecoin is built _on top of_ IPFS. Filecoin is intended to be a highly integrated and seamless storage market that _leverages_ the underlying functionality provided by IPFS; in this sense, they are connected, but can be implemented completely independent of each other. Users do not _need_ to interact with Filecoin in order to use IPFS.

Some features within Filecoin that are shared with IPFS include:

- The use of [IPLD](https://ipld.io/) for blockchain data structures
- The use of [libp2p](https://libp2p.io/) by Filecoin nodes to establish secure connections with each other
- Messaging between nodes and block propagation in Filecoin are facilitated by [libp2p](https://libp2p.io/) pubsub
- CIDs in Filecoin and IPFS share a hashing specification
- The use of [graphsync](https://github.com/ipfs/go-graphsync) for transferring data between nodes, enabling direct transfers between IPFS and Filecoin nodes in the future.

**Interested in learning more?** Check back here soon for various use-case examples featuring both protocols!
