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
* [go-car command-line tooling](https://github.com/ipld/go-car)
* [IPLD CAR specification and JavaScript libraries](https://github.com/ipld/js-car)
* [IPFS Desktop / Kubo docs](https://docs.ipfs.tech/)

Recommended outputs before proposing storage workflows:

* Piece CID / Payload CID
* CAR size and piece size
* A durable retrieval URL or CID

### <mark style="color:blue;">Encrypt private files</mark>

Encrypt files before uploading them when their contents should be available only to selected users or services. Common examples include:

* **User files:** private attachments, invoices, account exports and personal documents.
* **Agent state:** conversation history, saved memory, task checkpoints and private tool results.
* **Project data:** internal reports, contracts, unpublished datasets and confidential supporting records.

Your application encrypts the file before passing it to the storage API. Providers can store the encrypted bytes and prove they hold them; reading the contents requires the decryption key. Keysmith provides wallet-derived key recovery and lets your application share access to individual files or collections.

Keep data with different readers in separate encrypted files. Sharing the key to a single encrypted archive gives access to everything inside it.

See [Encryption](../advanced/encryption/README.md) under Advanced for an upload and download example, recovery requirements, and instructions for sharing access.

### <mark style="color:blue;">Store large data with Filecoin Onchain Cloud</mark>

Use the FOC stack for programmatic, verifiable storage at scale:

* [Filecoin Onchain Cloud overview](../filecoin-onchain-cloud/README.md)
* [FOC quickstart and Synapse docs](../filecoin-onchain-cloud/synapse-quickstart.md)
* [FOC developer guides](https://docs.filecoin.cloud/developer-guides)
* [PDP documentation](../../storage-providers/pdp/README.md)
* [Filecoin Cold Storage Service](../filecoin-onchain-cloud/fcss.md) for archives and datasets of 1 TiB and up

### <mark style="color:blue;">Store small data with storage onramps</mark>

For smaller datasets and managed ingestion paths:

* [Storage onramps overview](../../getting-started/how-storage-works/storage-onramps.md)
* [Filecoin Pin getting started](filecoin-pin/getting-started.md)
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

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/build/cookbook/store-data)
