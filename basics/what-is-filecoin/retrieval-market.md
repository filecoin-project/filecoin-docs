---
description: >-
  The retrieval market facilitates the negotiation of retrieval deals for serving stored data to clients in exchange for FIL.
---

# Retrieval market

## Basic Retrieval from Filecoin

Currently, Filecoin nodes support direct retrieval from the storage miners who originally stored the data. Clients can send retrieval requests directly to a storage provider and pay a small amount of FIL to retrieve their data.

To request data retrieval, clients need to provide the following information to the storage provider:

- **Storage Provider ID**: The ID of the storage provider where the data is stored.
- **Payload CID**: Also known as Data CID.
- **Address**: The address initially used to create the storage deal.

## Hot Retrieval from IPFS

Since most Filecoin nodes are also IPFS nodes, standard practice has been for Filecoin storage providers to also make available a hot copy of any given stored file through IPFS.  Since the algorithm that generates a content address (CID) is the same for both Filecoin and IPFS, the client can request the CID of a file they stored on Filecoin and retrieve it from IPFS, if there is an IPFS node that is able and willing to serve the file. 

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/basics/what-is-filecoin/retrieval-market)
