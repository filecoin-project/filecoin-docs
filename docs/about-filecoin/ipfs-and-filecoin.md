---
title: IPFS and Filecoin
description: Learn more about the relationship and different use-cases between IPFS and Filecoin.
---

# IPFS and Filecoin

Filecoin and IPFS are complementary systems for storing and sharing data in the distributed web. Both systems are free, open-source, and share several building blocks, including data representation formats and certain network communication protocols. However, the Filecoin and the IPFS networks are otherwise fully independent. Software that interacts with IPFS does not require Filecoin, and vice-versa, although some solutions may use both.

This page aims to explain the relationship between the IPFS and Filecoin projects and help users decide which option is best suited for their use-case.

## Data storage incentives

[IPFS](https://ipfs.io) allows users to store and transfer verifiable, content-addressed data in a peer-to-peer network. IPFS users persist the data they want **on their own IPFS nodes**. This is referred as [pinning](https://docs.ipfs.io/concepts/persistence). Sometimes the data may be pinned using a third-party pinning service, or through groups of individual IPFS users. The data exists in the network as long as one user is storing it and able to provide it to others when they request it.

IPFS does not include a built-in mechanism to incentivize the storage of data for _other_ people. This is the challenge Filecoin hopes to solve. The Filecoin network creates a distributed storage marketplace for long-term storage. Nodes with a large storage capacity can rent storage to users with and get paid for it.

The Filecoin network ensures that data is safely stored. However, the processes of storing (sealing), verifying (proving) and unsealing (for retrieval) are computationally expensive and can take time. This is specially relevant for the retrieval of data, which should happen as fast as possible. For this reason, Filecoin enables an additional retrieval market where dedicated nodes can help quickly deliver content from the network for a payment by keeping unsealed, cached copies. This delivery mechanism may make use of IPFS.

Filecoin can be seen as a _cold_ storage layer, perfect to safely store large batches of data. IPFS would be the _hot_ storage layer, designed for the quick retrieval and distribution of content.

## Which system should I use?

### Using IPFS

- Data provided by user's own nodes. Otherwise must rely on other peers to voluntarily/altruistically storing data or on a centralized pinning service.
- Centralized IPFS pinning services must be trusted to do their job. IPFS brings no built-in provisions to verify that data is being stored and correctly provided by the pinning service.
- IPFS by itself works very well for popular content (with many providers), for organizations where there are incentives to sync and store data in multiple nodes and for situation where strong social contracts can be used to ensure the content remains hosted and maintained long-term.

### Using Filecoin

- Clients make _storage deals_ with miners to store data. The network verifies that the miners are correctly storing the data. Small payments are made on a regular basis for the duration of the _storage deal_.
- Miners that do not honor the storage deal are penalised.
- Content retrieval might be offered by storage miners directly, or by specialized retrieval miners. The user requesting the data pays for this service.
- Filecoin excels at storing large amounts of data for long periods of time.

### Using both

Some solutions combine the best of the two systems, backing up data on the Filecoin network and at the same time providing the data through the IPFS network. This ensures that data is constantly available and can be retrieved quickly, while also making sure that the data is safely backed up on the Filecoin network. [Powergate](../build/powergate.md) is a multitiered file storage API built on Filecoin and IPFS, and and index builder for Filecoin data.

## The technology behind IPFS and Filecoin

Filecoin and IPFS share are powered by the same technology at many levels:

- [IPLD](https://ipld.io/) specifies data formats for content-addressed data like the blockchain or the way in which IPFS stores files.
- [libp2p](https://libp2p.io/) provides peer-to-peer network capabilities, connection security and key discovery and data distribution features like the DHT and Pubsub.
- [Multiformats](https://multiformats.io) define future-proof identifiers and data-types.
- [Graphsync](https://github.com/ipfs/go-graphsync) and [Bitswap](https://github.com/ipfs/go-bitswap) enable fast an efficient IPLD data transfers between nodes.

Interested in learning more? Check some of our [application examples](../build/examples/README.md).
