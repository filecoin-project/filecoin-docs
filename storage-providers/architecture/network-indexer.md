---
description: >-
  InterPlanetary Network Indexer (IPNI) enables users to search for
  content-addressable data available from storage providers. This page discusses
  the implications of IPNI for storage providers.
---

# Network indexer

A _network indexer_, also referred to as an _indexer node_ or _indexer_, is a node that maps content identifiers (CIDs) to records of who has the data and how to retrieve that data. These records are called _provider data records_. Indexers are built to scale in environments with massive amounts of data, like the Filecoin network, and are also used by the IPFS network to locate data. Because the Filecoin network stores so much data, clients can’t perform efficient retrieval without proper indexing. Indexer nodes work like a specialized key-value store for efficient retrieval of content-addressed data.

There are two groups of users within the network indexer process:

* _Storage providers_ advertise their available content by storing data in the indexer. This process is handled by the indexer’s _ingest_ logic.
* _Retrieval clients_ query the indexer to determine which storage providers have the content and what protocol to use, such as Graphsync, Bitswap, etc. This process is handled by the indexer’s _find_ logic.

## How the indexer works

This diagram summarizes the different _actors_ in the indexer ecosystem and how they interact with each other. In this context, these actors are not the same as [smart-contract actors](../../smart-contracts/filecoin-evm-runtime/actor-types.md).

<figure><img src="https://docs.filecoin.io/storage-provider/architecture/network-indexer/indexer.png" alt=""><figcaption><p>For more info on how the indexer works, read the <a href="https://filecoin.io/blog/posts/how-does-the-network-indexer-work/">Filecoin blog post</a>.</p></figcaption></figure>

## IPNI and storage providers

Storage providers publish data to indexers so that clients can find that data using the CID or multihash of the content. When a client queries the indexer using a CID or multihash, the indexer then responds to the client with the provider data record, which tells the client where and how the content can be retrieved.

As a storage provider, you will need to run an indexer in your setup so that your clients know where and how to retrieve data. For more information on how to create an index provider, see the [IPNI documentation](https://github.com/ipni/storetheindex/blob/main/doc/creating-an-index-provider.md).
