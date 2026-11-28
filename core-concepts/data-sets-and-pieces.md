---
description: >-
  In Filecoin Cloud, each file you store becomes a piece identified by its
  PieceCID, and each storage provider keeps your pieces in a data set, the
  unit that is proved and paid for.
---

# Data sets and pieces

**Each file you store becomes a piece, identified by its PieceCID, and each storage provider keeps your pieces in a data set.** The data set is the unit that providers prove and that you pay for.

This is a concept page. To upload, inspect or delete data, see [Upload data](../store-data/warm-storage/upload-data.md) and [Manage data sets](../store-data/warm-storage/manage-data-sets.md).

## Pieces and PieceCID

A piece is usually one file you upload. Its ID, the PieceCID (built on [CommP](../reference/general/glossary.md#commp)), is calculated from the file's bytes. So the same piece has the same PieceCID on every provider, and any copy can be checked against it. The Filecoin SDK does this check on every download.

A piece can be from 127 bytes to 63.5 GiB. A larger file isn't split for you: split it into parts before you upload. Each part is its own piece, with its own PieceCID, and the parts can go in the same data set. This is different from a copy: a copy of a piece on another provider has the same PieceCID.

A PieceCID is not the same as the Root CID that IPFS uses. See [Filecoin and IPFS](filecoin-and-ipfs.md).

## Data sets

A data set is a group of your pieces kept by one provider. You pay for it, and that provider stores and proves it. A data set has no size limit of its own; only each piece does.

* **Proved as a whole.** The provider proves it still holds the data set's pieces every proving period. See [Proof of Data Possession](proof-of-data-possession.md).
* **Paid as a whole.** Each data set has its own payment rail, a payment stream from you to its provider. See [Payments and runway](payments-and-runway.md).
* **Shared by related uploads.** Uploads with the same `metadata` go into the same data set. Data sets with [Filecoin Beam](retrieval-and-cdn.md#filecoin-beam) turned on are kept separate from those without it.

Each data set has its own monthly fee, so fewer data sets cost less. See [Pricing](../store-data/overview/pricing.md).

## Copies and storage providers

The Filecoin SDK and [Filecoin Pin](../store-data/tools/filecoin-pin.md) store each file with two different providers by default. The Filecoin CLI stores one copy. Each copy is its own data set, with its own proofs and payment rail. If one provider fails, you can still download the other copy.

The SDK picks providers from the Service Provider Registry, the onchain list of storage providers that offer Filecoin Cloud storage. The contracts call them service providers; they are the same thing.

* **First copy:** an endorsed provider, one that has made extra operational commitments.
* **Other copies:** approved providers, which meet published quality criteria.
* **Never picked automatically:** providers that are registered but not approved.

To choose providers yourself, pass `providerIds`. See [Select providers by region](../guides/select-providers-by-region.md). With one copy (`copies: 1`), a single provider failure can leave you with no copy. See [Reliability and proofs](../store-data/overview/reliability-and-proofs.md).

## How a data set changes over time

| Stage | What happens | Effect on payment |
| --- | --- | --- |
| Created | The provider creates the data set onchain, on your first upload to it | A payment rail opens, and a small refundable reserve for one-time fees is held |
| Pieces added | New uploads join the data set | The rate rises with the amount stored, and the lockup (30 days of payment) rises with it |
| Pieces removed | You schedule pieces for deletion; the provider removes them | The rate falls |
| Ended | You or the provider end the service | Payment stops when the lockup period ends |

For the steps, see [Manage data sets](../store-data/warm-storage/manage-data-sets.md).

## Common questions

**Can I add new files to a specific data set I already have?**
Yes. Pass its ID with `dataSetIds`. See [Upload data](../store-data/warm-storage/upload-data.md).

**Do I pay for an empty data set?**
No. Storage and the proving fee are charged only while the data set holds files. See [Pricing](../store-data/overview/pricing.md).

## Next steps

* [Payments and runway](payments-and-runway.md): how each data set is paid for.
* [Proof of Data Possession](proof-of-data-possession.md): how providers prove they hold a data set.
* [Upload data](../store-data/warm-storage/upload-data.md): store your first piece.
* [FAQ](../store-data/resources/faq.md): short answers to common questions.

*Applies to: Warm Storage contracts 1.4.0 and Filecoin SDK 2.x.*

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/core-concepts/data-sets-and-pieces)
