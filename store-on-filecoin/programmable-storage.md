---
description: >-
  Choose a storage path on Filecoin based on your needs, from managed on-chain
  storage to direct deal-making with providers.
---

# Programmable storage

Filecoin offers several ways to store data. Each path trades off simplicity against control. This page describes programmable and operator-controlled storage paths and links to the relevant documentation.

## Filecoin Onchain Cloud

[Filecoin Onchain Cloud (FOC)](../build/filecoin-onchain-cloud/README.md) is a programmable storage platform built on the Filecoin Virtual Machine. It handles the full lifecycle of storing data: the Filecoin Warm Storage Service (FWSS) stores your data with fast retrieval, Proof of Data Possession (PDP) cryptographically verifies providers still hold it, and Filecoin Pay settles payments automatically based on verified storage delivery. All operations are on-chain and auditable.

Developers interact with FOC through the [Synapse SDK](https://docs.filecoin.cloud/developer-guides/synapse), which provides a high-level API for uploads, payments, and provider discovery. See the [FOC documentation](https://docs.filecoin.cloud/) for setup guides and API reference.

{% hint style="success" %}
**Best for**: developers who want verifiable, programmable storage with minimal infrastructure.
{% endhint %}

## Fil One

[Fil One](https://fil.one/) is S3-compatible object storage backed by Filecoin. Point any S3 SDK or tool at its endpoint and store data with flat per-terabyte pricing, no egress fees, and cryptographic integrity proofs from the Filecoin network. It suits teams that want a drop-in S3 replacement without managing deals or running infrastructure. See the [Fil One documentation](https://docs.fil.one/) for the endpoint, SDKs, and API reference.

{% hint style="success" %}
**Best for**: teams that want a familiar S3 workflow with Filecoin-backed durability.
{% endhint %}

## Singularity

[Singularity](https://data-programs.gitbook.io/singularity) is an end-to-end tool for onboarding large datasets to Filecoin storage providers. It supports PiB-scale data preparation, local and remote data sources, content distribution, retrieval workflows, push and pull deal-making modes, and wallet management. Use Singularity when you need a dataset onboarding pipeline instead of a simple upload API.

{% hint style="success" %}
**Best for**: large dataset onboarding, data preparers, and storage-provider deal pipelines.
{% endhint %}

## Direct deal-making

For full control over provider selection, pricing, and deal terms, you can negotiate storage deals directly. [Curio](https://curiostorage.org/) is the modern storage-provider stack for running this infrastructure; see the [Curio documentation](https://docs.curiostorage.org/). [Boost](https://boost.filecoin.io/) remains the established deal engine, and the [Lotus client](../storage-providers/nodes/implementations/lotus.md) provides CLI tools for proposing and managing deals. This path requires running infrastructure and understanding the Filecoin deal lifecycle.

{% hint style="success" %}
**Best for**: storage providers, large-scale data onboarders, and users with custom deal requirements.
{% endhint %}

## Related paths

For a managed upload path, see [Storage onramps](storage-onramps.md). For verified-dataset economics and DataCap, see [Filecoin Plus](filecoin-plus.md). For provider-side direct onboarding without a built-in market deal, see [Direct data onboarding](direct-data-onboarding.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/store-on-filecoin/programmable-storage)
