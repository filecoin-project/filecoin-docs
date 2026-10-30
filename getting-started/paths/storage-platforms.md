---
description: >-
  Build and sell your own storage service on Filecoin, with storage your
  customers can verify and payments settled on chain through Filecoin Pay.
---

# Storage platforms and resellers

**You can build your own storage service on Filecoin: your customers get storage that providers prove on chain, and Filecoin Pay settles payments with the providers.**

## What you can do

| Use case | Guide |
| --- | --- |
| Offer storage to your own customers | [Build a storage service](../../guides/build-a-storage-service.md) |
| Bill your customers through Filecoin Pay | [Charge your customers with Filecoin Pay](../../guides/charge-your-customers-with-filecoin-pay.md) |
| Store data with providers in specific regions | [Select providers by region](../../guides/select-providers-by-region.md) |

## Common questions

**What volume can Filecoin handle?**
Warm storage spreads data across independent providers, and cold storage is built for datasets of 1 TiB and up. For large deployments, [talk to sales](TALK_TO_SALES_LINK).

**What does egress cost?**
Downloading directly from a warm storage provider over HTTP has no egress charge. See [Retrieval and CDN](../../core-concepts/retrieval-and-cdn.md).

**Can we choose providers by region?**
See [Select providers by region](../../guides/select-providers-by-region.md).

**What happens to our service if a provider fails a proof?**
In warm storage, a provider isn't paid for a period it fails to prove, and the data stays available from the second copy. In cold storage, payments follow the deal's service levels, and a repair can move the dataset to a new provider. See [Reliability and proofs](../../store-data/overview/reliability-and-proofs.md).

## Start here

* [Build a storage service](../../guides/build-a-storage-service.md): the end-to-end guide.
* [Payments and runway](../../core-concepts/payments-and-runway.md): how Filecoin Pay holds deposits and pays providers.
* [View other managed services](../choose-a-storage-option.md#managed-services): storage services built on Filecoin, such as Fil One, Akave, and Lighthouse.

## Talk to sales

Building a service on Filecoin? [Talk to sales](TALK_TO_SALES_LINK).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/getting-started/paths/storage-platforms)
