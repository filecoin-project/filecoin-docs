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

Providers offer storage and retrieval services to network users.

### Storage providers

Storage providers, often called SPs, are responsible for storing files and data for clients on the network. They also provide cryptographic proofs to verify that data is stored securely. There are two kinds:

- **PoRep providers** run a built-in miner actor, seal data into sectors, earn storage power, and take part in consensus.
- **PDP providers** register in a smart contract, keep data unsealed in data sets, and prove it with Proof of Data Possession. They have no storage power.

See [Storage providers: PoRep and PDP](../../core-concepts/storage-providers.md) for how they compare.

### Retrieval providers

Retrieval providers, or RPs, specialize in delivering quick access to data rather than long-term storage. While many storage providers also offer retrieval services, stand-alone RPs are increasingly joining the network to enhance data accessibility.

## Deals

In the Filecoin network, SPs and RPs offer storage or retrieval services to clients through deals. These deals are negotiated between two parties and outline terms such as data size, price, duration, and collateral.

The deal-making process initially occurs _off-chain_. Once both parties agree to the terms, the deal is published _on-chain_ for network-wide visibility and validation.

## Sectors

Sectors are the fundamental units of provable storage where PoRep providers securely store client data and generate PoSt (Proof of Spacetime) for the Filecoin network. Sectors come in standard sizes, typically `32 GiB` or `64 GiB`, and have a set lifespan that providers can extend before it expires.

PDP providers don't use sectors. They group unsealed pieces into data sets, which are proven by a smart contract.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/getting-started/what-is-filecoin/storage-model)
