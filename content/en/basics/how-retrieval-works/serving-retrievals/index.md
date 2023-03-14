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

## Retrieval process

If a client wants to retrieve publicly available data from the Filecoin network, then they generally follow this process.

### Query the IPNI

Before the client can submit a retrieval deal to a storage provider, they first need to find which providers hold the data. To do this, the client sends a query to the Interplanetary Network Indexer.

### Select a provider

Assuming the IPNI returns more than one storage provider, the client can select which provider they'd like to deal with. Once a provider has been selected, the client sends a retrieval proposal to the storage provider, specifying the content they want and the price they are willing to pay for the data.

### Review the deal

The storage provider receives the retrieval deal proposal and, based on certain parameters, such as price, decides whether or not to accept the deal. Storage providers can also reject a deal if it is asking for deny-listed content.

Once a retrieval deal is accepted, the storage provider replies to the client with details about the requested data, such as size, as well as payment details.

### Initiate retrieval

To start the retrieval process, the client creates a new `RetrievalDealStream`. Currently, this connection is kept open through the entire deal until completion or failure. Making deals pausable as well as surviving a restart is a planned future feature.

When attempting this retrieval deal using graphsync, payment channels are used to pay FIL to the storage provider. These payment channels watch the data flow and pay the storage provider after each chunk of data is retrieved successfully.

### Finalize the retrieval

Once the client has received the last chunk of data, the connection is closed.
