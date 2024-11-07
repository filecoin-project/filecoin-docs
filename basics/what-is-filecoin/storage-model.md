---
description: >-
  A storage model defines how data is stored within a system. This page covers the basic aspects of Filecoin’s storage model.
---

# Storage Model

The Filecoin storage model consists of three main components:

- Providers
- Deals
- Sectors

## Providers

Providers offer storage and retrieval services to network users. There are two types of providers:

- Storage Providers
- Retrieval Providers

### Storage providers

Storage providers, often called SPs, are responsible for storing files and data for clients on the network. They also provide cryptographic proofs to verify that data is stored securely. The majority of providers on the Filecoin network are SPs.

### Retrieval providers

Retrieval providers, or RPs, specialize in delivering quick access to data rather than long-term storage. While many storage providers also offer retrieval services, stand-alone RPs are increasingly joining the network to enhance data accessibility.

## Deals

In the Filecoin network, SPs and RPs offer storage or retrieval services to clients through deals. These deals are negotiated between two parties and outline terms such as data size, price, duration, and collateral.

The deal-making process initially occurs _off-chain_. Once both parties agree to the terms, the deal is published _on-chain_ for network-wide visibility and validation.

## Sectors

Sectors are the fundamental units of provable storage where storage providers securely store client data and generate PoSt (Proof of Spacetime) for the Filecoin network. Sectors come in standard sizes, typically `32 GiB` or `64 GiB`, and have a set lifespan that providers can extend before it expires.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/basics/what-is-filecoin/storage-model)
