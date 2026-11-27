---
description: >-
  Filecoin Onchain Cloud is a programmable storage, retrieval, and payments
  stack built on Filecoin, with a warm storage service and a cold storage
  service.
---

# Filecoin Onchain Cloud

Filecoin Onchain Cloud (FOC) is a programmable storage platform built on the Filecoin Virtual Machine. It combines storage, cryptographic storage verification, retrieval, and payments into one stack, and offers two storage services:

* **Filecoin Warm Storage Service (FWSS)** for data that applications read often. Providers keep the data unsealed and hot, and prove it with Proof of Data Possession (PDP).
* **Filecoin Cold Storage Service (FCSS)** for archives and large datasets that must be preserved and verifiable but are read rarely. Providers seal the data with Proof of Replication (PoRep) under deals with service-level terms the client sets.

Both services pay storage providers through Filecoin Pay, in USDFC, on on-chain payment rails. FWSS providers are PDP providers registered in a smart contract, while FCSS providers are PoRep providers with a miner actor. See [Storage providers: PoRep and PDP](../../core-concepts/storage-providers.md).

## Choose a service

| | **Warm storage (FWSS)** | **Cold storage (FCSS)** |
| --- | --- | --- |
| **Best for** | Application data, media, agent artifacts, anything read often | Archives, research and enterprise datasets, backups, from 1 TiB up |
| **Proof** | PDP: providers answer random on-chain challenges on the stored data | PoRep and Proof of Spacetime: providers seal a unique replica and prove it every day |
| **Provider matching** | The FWSS contract selects providers from the on-chain registry | The PoRep Market matches each deal to a provider offer that meets the client's terms |
| **Price** | Fixed by the FWSS contract | One service price per TiB per month in the [FCSS client app](https://clients.fcss.fidl.tech/#pricing). Providers set their own offers in the PoRep Market |
| **Terms the client sets** | Number of copies | Duration (6 months or more), price, retrievability, bandwidth, latency, and IPNI indexing |
| **Copies** | One or more, chosen by the client |One or more, chosen by the client |
| **Retrieval** | Hot, over HTTPS, with Filecoin Beam for faster delivery | From the provider's unsealed copy. Free or paid per piece, and public or limited to the client |
| **Start with** | [Synapse SDK](synapse-quickstart.md) | [FCSS](fcss.md) |

If you only need a managed IPFS pinning-style workflow, start with [Filecoin Pin](../cookbook/filecoin-pin/README.md).

## Core components

| Component | Role |
| --- | --- |
| FWSS | Filecoin Warm Storage Service. Stores data with retrievability-oriented provider selection, proven with PDP. |
| FCSS | Filecoin Cold Storage Service. Stores sealed copies of large datasets under deals with service-level terms, proven with PoRep. |
| PDP | Proof of Data Possession verifies that providers still hold warm data without requiring a full download. |
| PoRep Market | On-chain contracts that match FCSS deals to provider offers, track provider capacity, and gate each deal's payments on its service-level indicators. |
| Filecoin Pay | Payment rails fund storage and settle provider payments based on service delivery, for both services. |
| Filecoin Beam | Retrieval infrastructure for fast delivery of warm data. |
| Synapse SDK | TypeScript SDK for funding warm storage, selecting providers, uploading, downloading, and managing storage operations. |

## Developer paths

| Path | Use when | Start here |
| --- | --- | --- |
| Synapse SDK | You are building a JavaScript or TypeScript application that stores and retrieves warm data with FOC. | [FOC quickstart and Synapse docs](synapse-quickstart.md) |
| Filecoin Pin | You want a CLI or API path for pinning IPFS-compatible content to Filecoin-backed storage. | [Filecoin Pin](../cookbook/filecoin-pin/README.md) |
| FCSS | You have a dataset of 1 TiB or more to preserve, and want to onboard it with a CLI, a web app, or an AI agent. | [Filecoin Cold Storage Service](fcss.md) |
| Warm storage provider | You want to sell FWSS storage from your own hardware (≈5 min Docker setup). | [Run a PDP provider](../../storage-providers/pdp/install-and-run-pdp.md) · [Curio-PDP](https://docs.curiostorage.org/getting-started/curio-pdp) |
| Cold storage provider | You run, or plan to run, a PoRep sealing cluster and want FCSS deals. | [Path D of the storage provider quickstart](../../storage-providers/agent-quickstart.md#path-d) |
| Full FOC docs | You need the complete FOC guides, API reference, architecture, pricing, or contract references. | [docs.filecoin.cloud](https://docs.filecoin.cloud/) |

## Learn more

The FOC documentation is the source of truth for detailed warm storage docs, pricing, API references, and contract addresses:

* [FOC quick start](https://docs.filecoin.cloud/getting-started)
* [Architecture](https://docs.filecoin.cloud/core-concepts/architecture)
* [FWSS overview](https://docs.filecoin.cloud/core-concepts/fwss-overview)
* [PDP overview](https://docs.filecoin.cloud/core-concepts/pdp-overview)
* [Filecoin Pay overview](https://docs.filecoin.cloud/core-concepts/filecoin-pay-overview)
* [Synapse SDK guide](https://docs.filecoin.cloud/developer-guides/synapse)
* [Contract addresses](https://docs.filecoin.cloud/resources/contracts)

For cold storage, see [Filecoin Cold Storage Service](fcss.md), the [PoRep Market contracts](https://github.com/fidlabs/porep-market), and the [PoRep Market CLI](https://github.com/fidlabs/filecoin-porep-market-tooling).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/filecoin-onchain-cloud)
