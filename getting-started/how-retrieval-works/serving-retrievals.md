---
description: >-
  In this article, we will discuss the functions of storage providers in the
  Filecoin network, the role of the indexer, and the retrieval process for
  publicly available data.
---

# Serving retrievals

### The indexer

When data should be publicly discoverable, the storage provider publishes an advertisement to the InterPlanetary Network Indexer (IPNI). IPNI maps content identifiers to storage providers and retrieval metadata so clients can discover where content is available.

IPNI can also include the retrieval protocols or endpoints a provider advertises for specific CIDs. Filecoin storage providers may serve retrievals over HTTP, Bitswap, Graphsync, or service-specific endpoints depending on their software and configuration.

### Retrieval process

If a client wants to retrieve publicly available data from the Filecoin network, then they generally follow this process.

#### Query the IPNI

Before the client can retrieve from a storage provider, they first need to find which providers hold the data. To do this, the client sends a query to the InterPlanetary Network Indexer.

#### Select a provider

Assuming IPNI returns more than one storage provider, the client can select which provider to retrieve from. Here, they will also get additional details based on the retrieval path they want to use.

#### Initiate retrieval

The client then retrieves the data from the storage provider over one of the advertised paths. HTTP retrieval is the common path for whole-piece `/piece/{pieceCid}` retrieval. Providers that index and advertise IPFS CIDs can also expose `/ipfs/{cid}` style retrieval.

#### Finalize the retrieval

Once the client has received the last chunk of data, the connection is closed.

### Implementation paths

Different retrieval workflows use different tools:

| Workflow | Maintained path |
| --- | --- |
| Serving PDP retrievals as a storage provider | Use [Curio](https://curiostorage.org/) for PDP retrievals. |
| Serving PoRep retrievals as a storage provider | Use [Boost](https://boost.filecoin.io/) to serve retrievals. Boost supports Graphsync retrievals by default, and storage providers can run [`booster-http`](https://boost.filecoin.io/http-retrieval) for HTTP retrievals when configured. |
| Retrieving data as a client | Use [Lassie](https://github.com/filecoin-project/lassie) to fetch CID-addressed content from Filecoin and IPFS using the best available retrieval path. For whole-piece retrieval, use provider or service `/piece` endpoints. |
| Retrieving application data with Filecoin Onchain Cloud | See the [Filecoin Onchain Cloud retrieval docs](https://docs.filecoin.cloud/core-concepts/retrieval/) for maintained Synapse SDK retrieval flows. |

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/getting-started/how-retrieval-works/serving-retrievals)
