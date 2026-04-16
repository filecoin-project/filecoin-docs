---
description: >-
  Filecoin Onchain Cloud is a programmable cloud platform built on Filecoin that provides verifiable storage, retrieval, and payments through smart contracts.
---

# Filecoin Onchain Cloud

Filecoin Onchain Cloud (FOC) is a service layer built on the Filecoin Virtual Machine that combines storage, data delivery, and payments into a single programmable stack. All operations are settled on-chain through smart contracts.

## Core components

FOC is composed of four layers that work independently but integrate through on-chain contracts:

* **FWSS (Filecoin Warm Storage Service)** — warm storage optimized for frequent retrieval and verifiable availability. Pricing starts at 2.5 USDFC/TiB/month with a minimum of 2 copies.
* **PDP (Proof of Data Possession)** — a cryptographic challenge-response protocol that verifies storage providers still hold your data without re-downloading it. See [PDP documentation](../../storage-providers/pdp/README.md).
* **Filecoin Pay** — the on-chain settlement engine that automates payments to providers through payment rails. Providers are paid only upon verified service delivery.
* **Filecoin Beam** — the data delivery layer for fast content retrieval (up to 0.014 USDFC/GiB egress).

## Developer tools

The **Synapse SDK** is the primary way to interact with FOC. It provides three packages:

* **Synapse SDK** — high-level API for payments, storage, provider discovery, and session keys
* **Synapse Core** — low-level building blocks for direct contract interaction and PieceCID utilities
* **Synapse React** — React hooks built on Wagmi and TanStack Query

## Documentation

For full guides, API references, and cookbooks, see the [Filecoin Onchain Cloud documentation](https://docs.filecoin.cloud/).

* [Quick start](https://docs.filecoin.cloud/getting-started)
* [Architecture](https://docs.filecoin.cloud/core-concepts/architecture)
* [FWSS overview](https://docs.filecoin.cloud/core-concepts/fwss-overview)
* [Filecoin Pay overview](https://docs.filecoin.cloud/core-concepts/filecoin-pay-overview)
* [PDP overview](https://docs.filecoin.cloud/core-concepts/pdp-overview)
* [Synapse SDK guide](https://docs.filecoin.cloud/developer-guides/synapse)
* [Contract addresses](https://docs.filecoin.cloud/resources/contracts)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/build/advanced/filecoin-onchain-cloud)
