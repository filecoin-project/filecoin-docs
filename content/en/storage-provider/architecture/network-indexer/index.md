---
title: "Network indexer"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "network-indexer-b1b5a5cef1596a5dadb6245c9b954b11"
weight: 141
toc: true
---

InterPlanetary Network Indexer (IPNI) exists to enable searching for content-addressable data available from storage providers, such as those on the Filecoin and IPFS networks. Storage providers can publish the content IDs (CIDs) of their data to the Network Indexer, and clients can query the Network Indexer to learn where to retrieve the content identified by those CIDs.

## What is a Network Indexer
A Network Indexer is a system that maps CIDs to records of who has the data (provider data records). It is built to handle the scale of data in the Filecoin network and is usable by the IPFS network for locating data.

Storage providers publish data to indexers, for clients to be able to find. A client that wants to know where a piece of information is stored can query an indexer, using the CID or multihash of the content. The indexer responds to the client with information about the provider(s). This tells where the client can retrieve the content from, and how the content can be retrieved.

As a Storage Provider you will need to run an Indexer Node in your setup. See the [IPNI documentation](https://github.com/ipni/storetheindex/blob/main/doc/creating-an-index-provider.md) for more information on how to create an Index Provider.

## How does the Network Indexer work?
Filecoin stores a great deal of data, but without proper indexing, clients can’t perform efficient retrieval. To improve Filecoin content discoverability, Indexer nodes are developed to store mappings of CID multi-hashes to content provider records. A client uses a CID or multihash to lookup a provider record, and then uses that provider record to retrieve data from a storage provider. In short, the indexer works like a specialized key-value store for the following two groups of users:

Storage providers advertise their available content by storing data in the Indexer. This is handled by the Indexer’s ingest logic.
Retrieval clients query the Indexer to find which storage providers have the content, and how to retrieve it (i.e. graphsync, bitswap, etc.). This is handled by the Indexer’s find logic.

This diagram summarizes the different actors in indexer ecosystem, and how they interact with each other:

[![Network Indexer ecosystem](indexer.png)](indexer.png)

For more info on how the indexer works, read this [blog post](https://filecoin.io/blog/posts/how-does-the-network-indexer-work/).