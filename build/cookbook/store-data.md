---
description: >-
  Reference-only guide to official storage onboarding resources for Filecoin
  data storage workflows.
---

# Store Data

{% hint style="info" %}
This page is reference-only.

We do not maintain step-by-step third-party storage tutorials in Builder Cookbook.
Use the official resources below for implementation details.
{% endhint %}

### <mark style="color:blue;">Prepare data for Filecoin storage</mark>

Use these resources to prepare CAR artifacts and storage inputs:

* [Lighthouse documentation](https://docs.lighthouse.storage/)
* [IPFS CAR tooling (`ipfs-car`)](https://github.com/web3-storage/ipfs-car)
* [IPLD CAR specification and libraries](https://github.com/ipld/js-car)
* [IPFS Desktop / Kubo docs](https://docs.ipfs.tech/)

Recommended outputs before proposing storage workflows:

* Piece CID / Payload CID
* CAR size and piece size
* A durable retrieval URL or CID

### <mark style="color:blue;">Store large data with modern programmatic patterns</mark>

Use maintained Filecoin guidance for large-data programmatic storage:

* [PDP documentation](../../storage-providers/pdp/README.md)

### <mark style="color:blue;">Store small data with storage onramps</mark>

For smaller datasets and managed ingestion paths:

* [Storage onramps overview](../../getting-started/how-storage-works/storage-onramps.md)
* [Lighthouse documentation](https://docs.lighthouse.storage/)

### <mark style="color:blue;">Monitor storage deal status from a smart contract</mark>

For actor-level deal status lookups and contract integration references:

* [Built-in actors overview](../../reference/built-in-actors/README.md)
* [Protocol API reference](../../reference/built-in-actors/protocol-api.md)
* [Filecoin.sol reference](../../reference/built-in-actors/filecoin.sol.md)

### <mark style="color:blue;">Incentivized data storage</mark>

For incentive design and onboarding programs:

* [Filecoin Data Onboarding](https://dataonboarding.filecoin.io/)
* [Filecoin storage market basics](../../getting-started/what-is-filecoin/storage-market.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/build/cookbook/data-storage/store-data)
