---
description: >-
  The storage market is the entry point where storage providers and clients negotiate and publish storage deals on-chain.
---

# Storage market

## Deal making

The lifecycle of a deal within the storage market includes four distinct phases:

- **Discovery**: The client identifies potential storage providers (SPs) and requests their prices.
- **Negotiation**: After selecting an SP, both parties agree to the terms of the deal.
- **Publishing**: The deal is published on-chain.
- **Handoff**: The deal is added to a sector, where the SP can provide cryptographic proofs of data storage.

## Filecoin Plus

Filecoin Plus aims to maximize useful storage on the Filecoin network by incentivizing the storage of meaningful and valuable data. It offers verified clients low-cost or free storage through a system called datacap, a storage quota that boosts incentives for storage providers.

Verified clients use datacap allocated by community-selected allocators to store data on the network. In exchange for storing verified deals, storage providers receive a 10x boost in storage power, which increases their block rewards as an incentive.

- **Datacap**: A token allocated to verified clients to spend on storage deals, offering a 10x quality multiplier for deals.
- **Allocators**: Community-selected entities responsible for verifying storage clients and allocating datacap tokens.
- **Verified Clients**: Active participants with datacap allocations for their data storage needs.

## Storage on-ramps

To simplify data storage on the Filecoin network, several tools offer streamlined integration of Filecoin and IPFS storage for applications or smart contracts.

These storage helpers provide libraries that abstract the Filecoin deal-making process into simple API calls. They also store data on IPFS for efficient and fast content retrieval.

Available storage helpers include:

- [Filecoin Onchain Cloud](../../build/filecoin-onchain-cloud/README.md): A programmable, on-chain storage platform with verifiable storage proofs (PDP) and automatic payments (Filecoin Pay), accessed through the Synapse SDK.
- [Filecoin Pin](../../build/cookbook/filecoin-pin/getting-started.md): A CLI and API path for pinning IPFS-compatible content to Filecoin-backed storage with Filecoin Pay.
- [fil.one](https://fil.one/): S3-compatible object storage backed by Filecoin, with flat per-terabyte pricing and no egress fees.
- [lighthouse.storage](https://www.lighthouse.storage/): An SDK for builders, providing tools for storing data from dApps.
- [Akave](https://www.akave.ai/): A modular L2 solution for decentralized data management, combining Filecoin storage with encryption and easy-to-use interfaces.
- [Pinata](https://pinata.cloud/): An IPFS pinning service for storing and serving files, media, and app data over IPFS.
- [Curio](https://curiostorage.org/): A next-gen platform within the Filecoin ecosystem, streamlining storage provider operations.
- [boost.filecoin.io](https://boost.filecoin.io/): A tool for storage providers to manage data onboarding and retrieval on the Filecoin network.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/getting-started/what-is-filecoin/storage-market)
