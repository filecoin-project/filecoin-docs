---
description: >-
  Filecoin Onchain Cloud is a programmable storage, retrieval, and payments
  stack built on Filecoin.
---

# Filecoin Onchain Cloud

Filecoin Onchain Cloud (FOC) is a programmable storage platform built on the Filecoin Virtual Machine. It combines warm storage, cryptographic storage verification, retrieval, and payments into one developer-facing stack.

Use FOC when you want application-controlled storage on Filecoin without building the storage, payment, provider-selection, and proof flows yourself. The primary integration path is the [Synapse SDK](synapse-quickstart.md).

## When to use FOC

FOC is a good fit when your application needs:

* **Programmable storage** that can be controlled from a wallet, backend service, agent, or smart-contract-adjacent workflow.
* **Verifiable persistence** through Proof of Data Possession (PDP), so providers regularly prove they still hold the data.
* **Automated payments** through Filecoin Pay, so storage providers are paid through on-chain payment rails.
* **Retrieval paths** for application data, with Filecoin Beam available for faster data delivery.

If you only need a managed IPFS pinning-style workflow, start with [Filecoin Pin](../cookbook/filecoin-pin/README.md). If you want to run provider infrastructure for the FOC stack, start with the [PDP provider documentation](../../storage-providers/pdp/README.md).

## Core components

FOC is composed of services that can be used together through the Synapse SDK:

| Component | Role |
| --- | --- |
| FWSS | Filecoin Warm Storage Service stores data with retrievability-oriented provider selection. |
| PDP | Proof of Data Possession verifies that providers still hold stored data without requiring a full download. |
| Filecoin Pay | Payment rails fund storage and settle provider payments based on service delivery. |
| Filecoin Beam | Retrieval infrastructure for fast data delivery when your application needs it. |
| Synapse SDK | TypeScript SDK for funding storage, selecting providers, uploading data, downloading data, and managing storage operations. |

## Developer paths

| Path | Use when | Start here |
| --- | --- | --- |
| Synapse SDK | You are building a JavaScript or TypeScript application that stores and retrieves data with FOC. | [Quick start with Synapse SDK](synapse-quickstart.md) |
| Filecoin Pin | You want a CLI or API-style path for pinning IPFS-compatible content to Filecoin-backed storage. | [Filecoin Pin](../cookbook/filecoin-pin/README.md) |
| PDP provider | You want to run provider infrastructure that can participate in FOC storage. | [PDP](../../storage-providers/pdp/README.md) |
| Full FOC docs | You need the complete FOC guides, API reference, architecture, pricing, or contract references. | [docs.filecoin.cloud](https://docs.filecoin.cloud/) |

## Learn more

The FOC documentation is the source of truth for detailed product docs, pricing, API references, and contract addresses:

* [FOC quick start](https://docs.filecoin.cloud/getting-started)
* [Architecture](https://docs.filecoin.cloud/core-concepts/architecture)
* [FWSS overview](https://docs.filecoin.cloud/core-concepts/fwss-overview)
* [PDP overview](https://docs.filecoin.cloud/core-concepts/pdp-overview)
* [Filecoin Pay overview](https://docs.filecoin.cloud/core-concepts/filecoin-pay-overview)
* [Synapse SDK guide](https://docs.filecoin.cloud/developer-guides/synapse)
* [Contract addresses](https://docs.filecoin.cloud/resources/contracts)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/filecoin-onchain-cloud)
