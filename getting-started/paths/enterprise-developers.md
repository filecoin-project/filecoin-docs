---
description: >-
  Keep auditable records and archive large datasets on Filecoin, with storage
  providers that prove on chain that they still hold your data.
---

# Enterprise developers

**Filecoin stores your records and archives with independent storage providers that prove on chain that they still hold the data, so you can audit retention instead of relying on a vendor's word.**

## What you can do

| Use case | Guide |
| --- | --- |
| Keep records that can be audited | [Keep immutable, auditable records](../../guides/keep-immutable-auditable-records.md) |
| Preserve large datasets you rarely read | [Archive large datasets](../../guides/archive-large-datasets.md) |
| Keep using S3 tools | [Fil One docs](https://docs.fil.one/) |

## Common questions

**Can we audit that our data is kept?**
Yes. Storage providers' proofs are recorded on chain, so you, or an auditor, can check them at any time. See [Reliability and proofs](../../store-data/overview/reliability-and-proofs.md).

**Where does the data live?**
With independent storage providers. See [Security, privacy and data location](../../store-data/overview/security-privacy-and-data-location.md) for how providers are chosen and where they operate.

**What will it cost?**
Warm storage has a fixed price per TiB per month. Cold storage has a price per TiB per month for a term of 6 months or more. See [Pricing](../../store-data/overview/pricing.md).

**Is there lock-in?**
Your data is addressed by its content and stored with independent providers, and you can retrieve it at any time. Warm storage is paid as you go, with 30 days of payment held as a guarantee. Cold storage deals run for the term you set.

**Is our data encrypted?**
Filecoin doesn't encrypt your data for you, so encrypt sensitive data before you upload it. Cold storage deals can also be private, so only you and the wallets you authorize can retrieve the data. See [Security, privacy and data location](../../store-data/overview/security-privacy-and-data-location.md).

**Does it work with the tools we use?**
Fil One works with any S3 SDK or tool. Filecoin Cloud has a TypeScript SDK and command-line tools.

## Start here

* [Choose a storage option](../choose-a-storage-option.md): compare warm storage, cold storage, and Fil One.
* [Filecoin Cold Storage Service](../../store-data/cold-storage/cold-storage-for-archival-data.md): preserve datasets of 1 TiB or more.

## Talk to sales

Planning a large deployment? [Talk to sales](TALK_TO_SALES_LINK).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/getting-started/paths/enterprise-developers)
