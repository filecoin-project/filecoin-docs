---
title: "IPFS and Filecoin"
description: "Learn more about the relationship and different use-cases between IPFS and Filecoin."
menu:
    about:
        parent: "about-filecoin-basics"
weight: 40
---

Filecoin and IPFS are complementary protocols for storing and sharing data in the distributed web. Both systems are free, open-source, and share many building blocks, including data representation formats (IPLD) and network communication protocols (libp2p). While interacting with IPFS does not require using Filecoin, all Filecoin nodes _are_ IPFS nodes under the hood, and (with some manual configuration) can connect to and fetch IPLD-formatted data from other IPFS nodes using libp2p. However, Filecoin nodes don't join or participate in the public IPFS DHT ([Distributed Hash Tables](https://docs.ipfs.io/concepts/dht/#distributed-hash-tables-dhts)).

This page aims to explain the relationship between the IPFS and Filecoin projects and help users decide which approach is best suited for their use-case.

## Data storage incentives

[IPFS](https://ipfs.io) allows users to store and transfer verifiable, content-addressed data in a peer-to-peer network. IPFS users usually persist the data they want **on their own IPFS nodes**. This is called [pinning](https://docs.ipfs.io/concepts/persistence). Sometimes the data may be pinned using a third-party pinning service or through groups of individual IPFS users (like [IPFS Collaborative Clusters](https://collab.ipfscluster.io/)). The data exists in the network as long as one user is storing it and can provide it to others when they request it.

IPFS alone does not include a built-in mechanism to incentivize the storage of data for _other_ people. This is the challenge Filecoin aims to solve. Filecoin is built on IPFS to create a distributed storage marketplace for long-term storage. Nodes with a large storage capacity can rent their storage to users and get paid for it.

The Filecoin network ensures that data is safely stored. However, the processes of storing, verifying, and unsealing (referred to as sealing, proving, and retrieving, respectively) are computationally expensive and can take time. This is especially relevant for the retrieval of data, which should happen as fast as possible. For this reason, Filecoin enables an additional retrieval market where dedicated nodes can help quickly deliver content from the network for payment by keeping unsealed, cached copies. This delivery mechanism may make use of IPFS but is still in design. See [ResNetLab's Decentralized Data Delivery Market research](https://github.com/protocol/ResNetLab/blob/master/OPEN_PROBLEMS/DECENTRALIZED_DATA_DELIVERY_MARKETS.md) for more information on delivery mechanisms.

Filecoin aims to add longer-term persistence to safely store large batches of data, while IPFS optimizes for the quick retrieval and distribution of content.

## Using IPFS and Filecoin

### Content addressing with IPFS

IPFS is great for getting started using content addressing for all sorts of distributed web applications. In the majority of these cases:

- Data is provided by the user's own nodes. Otherwise, must rely on other peers to voluntarily/altruistically storing data or on a centralized pinning service.
- Centralized IPFS pinning services must be trusted to do their job. IPFS brings no built-in provisions to verify that data is being stored and correctly provided by the pinning service.
- Popular content is more easily accessible. Popular content (with many providers) naturally becomes faster/easier to retrieve in IPFS, which is great when there are external incentives to sync and store data in multiple nodes, and for situations where strong social contracts can be used to ensure the content remains hosted and maintained long-term.

### Data persistence with Filecoin

Filecoin builds on the content addressing of IPFS to add longer term data persistence using cryptoeconomic incentives. With Filecoin:

- Clients make _storage deals_ with storage providers to store data. The network verifies that the storage providers are correctly storing the data. Small payments are made on a regular basis for the duration of the _storage deal_.
- Storage providers that do not honor the storage deal are penalized.
- Content retrieval might be offered by storage providers directly, or by specialized retrieval storage providers. The user requesting the data pays for this service.
- Filecoin excels at storing large amounts of data for long periods of time.

### Using IPFS and Filecoin together

Many solutions combine the two networks to get the best of both worlds: IPFS for content addressing & data discovery, and Filecoin for longer-term persistence. To achieve this, services like [Powergate]({{< relref "../build/powergate.md" >}}) back up data on the Filecoin network while also ensuring content is discoverable in the IPFS Public DHT. Data is constantly available and can be retrieved quickly, while also making sure that it is safely and verifiably backed up on the Filecoin network over time.

## The technology behind IPFS and Filecoin

Filecoin and IPFS are powered by the same technology at many levels:

- [IPLD](https://ipld.io/) specifies data formats for content-addressed data like the blockchain or the way in which IPFS stores files.
- [libp2p](https://libp2p.io/) provides peer-to-peer network capabilities, connection security and key discovery and data distribution features like the [Distributed Hash Tables (DHT)](https://docs.ipfs.io/concepts/dht/#distributed-hash-tables-dhts)) and [Pubsub](https://docs.libp2p.io/concepts/publish-subscribe/).
- [Multiformats](https://multiformats.io) define future-proof identifiers and data-types.
- [Graphsync](https://github.com/ipfs/go-graphsync) and [Bitswap](https://github.com/ipfs/go-bitswap) enable fast and efficient IPLD data transfers between nodes.
