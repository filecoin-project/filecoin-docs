---
title: "Serving retrievals"
description: "Storage providers are expected to accept retrieval deals. This page explains what the retrieval process looks like from a storage providers perspective."
lead: "Storage providers are expected to accept retrieval deals. This page explains what the retrieval process looks like from a storage providers perspective."
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-how-retrieval-works"
    identifier: "serving-retrievals-21f14f25e21f23f44989b9fafad6868d"
weight: 420
toc: true
---

In the Filecoin network, storage providers (SPs) serve two major functions:

- To store data.
- To serve that data back to the client.

When a client wants the data back from a storage provider, it sends a request known as a _retrieval_.

## The indexer

When a storage deal is originally made, the client can opt to make the data publically discoverable. If this is the case, the storage provider must publish an advertisement of the storage deal to the Interplanetary Network Indexer (IPNI). The IPNI contains a CID-to-SP mapping. This mapping allows clients to query the IPNI to discover where content is on Filecoin.

The IPNI also tracks which data transfer protocols you can use to retrieve specific CIDs. Currently, Filecoin SPs have the ability to serve retrievals over graphsync, bitswap, and http. This is dependent on the SP setup. 

## Retrieval process

If a client wants to retrieve publicly available data from the Filecoin network, then they generally follow this process.

### Query the IPNI

Before the client can submit a retrieval deal to a storage provider, they first need to find which providers hold the data. To do this, the client sends a query to the Interplanetary Network Indexer.

### Select a provider

Assuming the IPNI returns more than one storage provider, the client can select which provider they'd like to deal with. Here, they will also get additional details (if needed) based on the retrieval protocol they want to retrieve the content over. 

### Initiate retrieval

The client then attempts to retrieve the data from the SP over bitswap, graphsync, or http. Note that currently, clients can only get full piece retrievals via http. 

When attempting this retrieval deal using graphsync, payment channels are used to pay FIL to the storage provider. These payment channels watch the data flow and pay the storage provider after each chunk of data is retrieved successfully.

### Finalize the retrieval

Once the client has received the last chunk of data, the connection is closed.
