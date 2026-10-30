---
description: >-
  Filecoin Cloud warm storage costs $2.50 per TiB per month per copy plus
  $0.12 per data set per month, paid in USDFC; small one-time fees cover each
  onchain operation.
---

# Pricing

**Warm storage on Filecoin Cloud costs $2.50 per TiB per month for each copy of your data, plus $0.12 per month for each data set.** You pay in USDFC from your deposit. On top of that, each step that writes to the blockchain, such as creating a data set or adding files, has a small one-time fee that pays back the provider's transaction cost.

## Warm storage rates

| What you pay for | Price | When you're charged |
| --- | --- | --- |
| Storage | $2.50 per TiB per month, per copy | Taken from your deposit continuously, from your first upload to a data set until you delete its files or end it |
| Proving service | $0.12 per data set per month | Same as storage: only while the data set holds files |

An empty data set costs nothing per month.

The monthly cost of one data set is: (TiB stored × $2.50) + $0.12.

## Copies and data sets

* A **copy** is one full copy of your data, kept by one provider.
* A **data set** is the group of your files that one provider keeps. Each copy lives in its own data set.
* With the default of two copies, your files go into two data sets. You pay the $0.12 fee twice, $0.24 a month, plus storage for both copies.
* You control how many data sets you pay for. Choose the number of copies (the `copies` option in the SDK), and add new files to the data sets you already have instead of creating new ones (give related uploads the same `metadata`). Files in the same data set share one fee.

## One-time fees

Some steps write to the blockchain, and the provider pays the transaction fee (gas) for you. A small one-time fee pays the provider back:

| Step | Fee |
| --- | --- |
| Create a data set | $0.025 |
| Add files | $0.008, plus $0.003 per file |
| Delete files | $0.007 per request |
| End a data set through the provider | $0.006 (free if you end it yourself) |

These fees come from a refundable reserve of about 0.50 USDFC, held while the data set is active.

## Examples

| Example | Per copy, per month | Total |
| --- | --- | --- |
| 10,000 small files (about 49 MiB), 1 copy, 24 months | about 0.12 USDFC (almost all proving fee) | about 2.88 USDFC |
| 1 TiB, 2 copies, 12 months | 2.62 USDFC | about 62.88 USDFC |

One-time fees are extra. For small amounts of data the proving fee is most of the cost, so put related files in the same data set.

## What you deposit and what you spend

Your deposit isn't spent all at once. It must always cover 30 days of storage at your current rate, called the lockup, so providers are sure to be paid. Storage is paid from it continuously, and you can withdraw what isn't locked. See [Fund storage](../warm-storage/fund-storage.md).

## Estimate before you upload

* **Agent and CLI:** `filecoin put ./path --dry-run` shows the cost and stores nothing.
* **SDK:** `synapse.storage.prepare({ pieceSizes })` returns the deposit you need and your monthly rate.

## Cold storage pricing

Cold storage has one price per TiB per month, for a term of at least 6 months. Retrieval is charged per TiB, with one free full retrieval of your dataset a year. Proofs are always free. See the [FCSS client app](https://clients.fcss.fidl.tech/#pricing) for current prices.

## Learn more

* Payments and runway: how the lockup works.
* [Filecoin Pay](../tools/filecoin-pay.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/overview/pricing)
