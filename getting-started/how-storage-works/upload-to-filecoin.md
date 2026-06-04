---
description: >-
  Choose a storage path on Filecoin based on your needs, from managed on-chain
  storage to direct deal-making with providers.
---

# Upload to Filecoin

Filecoin offers several ways to store data. Each path trades off simplicity against control. This page describes what each option does and links to the relevant documentation.

## Filecoin Onchain Cloud

[Filecoin Onchain Cloud (FOC)](../../build/advanced/filecoin-onchain-cloud.md) is a programmable storage platform built on the Filecoin Virtual Machine. It handles the full lifecycle of storing data: the Filecoin Warm Storage Service (FWSS) stores your data with fast retrieval, Proof of Data Possession (PDP) cryptographically verifies providers still hold it, and Filecoin Pay settles payments automatically based on verified storage delivery. All operations are on-chain and auditable.

Developers interact with FOC through the [Synapse SDK](https://docs.filecoin.cloud/developer-guides/synapse), which provides a high-level API for uploads, payments, and provider discovery. See the [FOC documentation](https://docs.filecoin.cloud/) for setup guides and API reference.

{% hint style="success" %}
**Best for**: developers who want verifiable, programmable storage with minimal infrastructure.
{% endhint %}

## Fil One

[Fil One](https://fil.one/) is S3-compatible object storage backed by Filecoin. Point any S3 SDK or tool at its endpoint and store data with flat per-terabyte pricing, no egress fees, and cryptographic integrity proofs from the Filecoin network. It suits teams that want a drop-in S3 replacement without managing deals or running infrastructure. See the [Fil One documentation](https://docs.fil.one/) for the endpoint, SDKs, and API reference.

{% hint style="success" %}
**Best for**: teams that want a familiar S3 workflow with Filecoin-backed durability.
{% endhint %}

## Storage onramps

[Storage onramps](storage-onramps.md) are third-party services that handle Filecoin deal-making behind the scenes. You send data through a web UI, API, or SDK, and the onramp manages provider selection, deal negotiation, and data transfer. Services like [Pinata](https://pinata.cloud/) (IPFS pinning), [Lighthouse](https://lighthouse.storage/), and [Akave](https://www.akave.ai/) each offer different features. See the [storage onramps page](storage-onramps.md) for the full list with links to their documentation.

{% hint style="success" %}
**Best for**: teams who prefer a managed service and do not need direct on-chain control.
{% endhint %}

## Filecoin Plus

[Filecoin Plus](filecoin-plus.md) is a program that subsidizes storage costs for verified clients storing useful data. Allocators vet clients and grant them DataCap tokens. When a client spends DataCap in a storage deal, the provider earns higher block rewards, which incentivizes storing verified data at reduced cost. See the [Filecoin Plus page](filecoin-plus.md) for how the allocator process works.

{% hint style="success" %}
**Best for**: large datasets where cost efficiency is a priority.
{% endhint %}

## Direct deal-making

For full control over provider selection, pricing, and deal terms, you can negotiate storage deals directly. [Curio](https://curiostorage.org/) is the modern storage-provider stack for running this infrastructure, see the [Curio documentation](https://docs.curiostorage.org/), with [Boost](https://boost.filecoin.io/) as the established deal engine and the [Lotus client](../../storage-providers/nodes/implementations/lotus.md) providing CLI tools for proposing and managing deals. This path requires running infrastructure and understanding the Filecoin deal lifecycle.

{% hint style="success" %}
**Best for**: storage providers, large-scale data onboarders, and users with custom deal requirements.
{% endhint %}

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/getting-started/how-storage-works/upload-to-filecoin)
