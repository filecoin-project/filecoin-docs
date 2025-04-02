---
description: >-
  A storage model defines how data is stored within a system. This page covers the basic aspects of Filecoin’s storage model.
---

# Storage Model

The Filecoin storage model consists of three main components:

- Clients, who store their data with a Filecoin Storage Provider. 
- Storage Providers, who operate data centers, compete to accept deals from Clients, provide cryptographic proofs they are storing said data, and earn block rewards and paid storage deals fees.  
- [Deals](https://docs.filecoin.io/storage-providers/filecoin-deals/storage-deals), a data structure which details the terms of a storage arrangement between a client and a storage providor.  
- Sectors, the [basic unit of storage on Filecoin](https://spec.filecoin.io/systems/filecoin_mining/sector/).

## Clients

Clients have data they are looking to store with a cloud service.  

## Storage Providers

Storage Providers offer storage and retrieval services to network users --they are effectively crypto miners with data centers. Storage providers, often called SPs, are responsible for storing files and data for clients on the network.

## Deals

In the Filecoin network, SPs offer storage or retrieval services to clients through deals. These deals are negotiated between two parties and outline terms such as data size, price, duration, and collateral.  The deal-making process initially occurs _off-chain_. Once both parties agree to the terms, the deal is published _on-chain_ for network-wide visibility and validation.

Deals are a data structure.  You can think of them as being in the same class as a Bitcoin transaction, in that Bitcoin transactions detail the terms of the transaction and are added to a block by a miner.  Similarly, Filecoin deals detail the terms of the storage arrangement between a client and a storage provider, and are added to a block by the storage provider as they mine the Filecoin blockchain.  Unique information found in deals include the data size, usually one sector, the price for storage, and whether or not the deal is [verified](https://docs.filecoin.io/basics/how-storage-works/filecoin-plus).

## Sectors

Sectors are the fundamental units of provable storage where storage providers securely store client data and generate PoSt (Proof of Spacetime) for the Filecoin network. Sectors come in standard sizes, typically `32 GiB` or `64 GiB`, and have a set lifespan that providers can extend before it expires.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/basics/what-is-filecoin/storage-model)
