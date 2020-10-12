---
title: IPFS and Filecoin
description: Learn more about the relationship and different use-cases between IPFS and Filecoin.
---

# IPFS and Filecoin

Filecoin and IPFS are complementary systems for storing and sharing data in the distributed web. Both systems are free, open-source, and share several building blocks, including data representation formats and certain network communication protocols. However, the Filecoin and the IPFS networks are otherwise fully independent. Software that interacts with IPFS does not require Filecoin, and vice-versa, although some solutions may use both.

This page aims to explain the relationship between the IPFS and Filecoin and assist users in deciding which option, or combination of options, is best suited for their use-case.

## Data storage incentives

[IPFS](https://ipfs.io) allows users to store and transfer verifiable, content-addressed data in a peer-to-peer network. IPFS users persist the data they want **on their own IPFS nodes**. This is referred as [pinning](https://docs.ipfs.io/concepts/persistence). Sometimes the data may be pinned using a third-party pinning service, or through groups of individual IPFS users. The data exists in the network as long as one user is storing it and able to provide it to others when they request it.

However, IPFS does not include a built-in mechanism to incentivize the storage of data for _other_ people. This is the challenge Filecoin hopes to solve: the Filecoin network creates a distributed storage market place for long-term storage where nodes with large storage capacity can rent it to users with data-storage needs, and get paid for it.

The cryptographic guarantees ensuring that data is safely stored by the Filecoin network make the storage and retrieval of data a computationally and time-expensive operation. For this reason, Filecoin enables an additional retrieval market where dedicated nodes can help quickly delivering content from the network for a payment. This delivery mechanism may make use of IPFS.

In that sense, Filecoin can be seen as a "cold" storage layer, perfect to safely store large batches of data, while IPFS would be the "hot" storage layer, designed for the quick retrieval and distribution of content.

## Which should I use?

### Using IPFS

- Data provided by user's own nodes. Otherwise must rely on other peers to voluntarily/altruistically storing data or on a centralized pinning service.
- Centralized IPFS pinning services must be trusted to do their job. IPFS brings no built-in provisions to verify that data is being stored and correctly provided by the pinning service.
- IPFS by itself works very well for popular content (with many providers), for organizations where there are incentives to sync and store data in multiple nodes and for situation where strong social contracts can be used to ensure the content remains hosted and maintained long-term.

### Using Filecoin

- Clients make deals with miners to store data. The network verifies that the data is indeed stored by the miners, and regular, small payments are made for the duration of the deal.
- Miners that are unable to honor the storage conditions they offered have to pay a penalty.
- Content retrieval might be offered by storage miners directly or by specialized retrieval miners, for a price.
- Filecoin by itself work very well for large amounts of data to be stored for longer periods of time.

### Using both

Some solutions like [Powergate](../build/powergate.md) combine the best of the two worlds, backing up data on the Filecoin network and at the same time providing it through the IPFS network. This ensures availability and fast retrieval while knowing, at the same time, that the data is safely backed up by one or several Filecoin miners.

## The technology behind IPFS and Filecoin

Filecoin and IPFS share are powered by the same technology at many levels:

- [IPLD](https://ipld.io/) specifies data formats for content-addressed data like the blockchain or the way in which IPFS stores files.
- [libp2p](https://libp2p.io/) provides peer-to-peer network capabilities, connection security and key discovery and data distribution features like the DHT and Pubsub.
- [Multiformats](https://multiformats.io) define future-proof identifiers and data-types.
- [Graphsync](https://github.com/ipfs/go-graphsync) and [Bitswap](https://github.com/ipfs/go-bitswap) enable fast an efficient IPLD data transfers between nodes.

**Interested in learning more?** Check some of our [application examples](../build/examples/README.md).
