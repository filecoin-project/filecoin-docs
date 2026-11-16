---
description: >-
  Short answers to common questions about storing data on Filecoin Cloud:
  cost, how long data is kept, copies, privacy, retrieval and verification.
---

# FAQ

**Short answers to common questions about storing data on Filecoin Cloud.**

## Getting started

### What do I need to get started?

A wallet, a little FIL for transaction fees, and USDFC to pay for storage. On the Calibration testnet, both tokens are free from faucets. See [Fund storage](../warm-storage/fund-storage.md).

### Which tool should I use?

Use an AI agent or the Filecoin CLI to store files quickly, the Filecoin SDK to build an app, and Filecoin Pin if you already use IPFS. See [Filecoin Cloud](../README.md).

### Can I try it for free?

Yes. Use the Calibration testnet, where tokens are free. Data on Calibration isn't guaranteed to be kept, so use it only for testing.

## Payments

### How do payments work?

You deposit USDFC into Filecoin Pay and approve the Warm Storage service once. After that, providers are paid from your deposit over time, while they prove they have your data.

### How much does it cost?

$2.50 per TiB per month for each copy, plus $0.12 per data set per month. See [Pricing](../overview/pricing.md).

### What happens if my deposit runs out?

New uploads fail, and providers can end your storage and remove your data. Watch your balance and top up in time. See [Monitor balance and proofs](../warm-storage/monitor-balance-and-proofs.md).

### Can I pay without crypto?

Yes, through a storage onramp such as Fil One. See [Storage onramps](../tools/storage-onramps.md).

## Storage

### How long is my data stored?

As long as your deposit keeps paying for it and you don't delete it. Providers must keep proving they have your data to get paid.

### What is a data set?

A group of your files kept by one provider. Each upload becomes a piece in a data set, and files in the same data set share one payment stream.

### How many copies are kept?

The Filecoin SDK and Filecoin Pin keep two copies with two providers by default. The Filecoin CLI keeps one.

### Is my data private?

No. Anyone with its ID can download it. Encrypt sensitive data before you upload. See [Security, privacy and data location](../overview/security-privacy-and-data-location.md).

### Can I delete my data?

Yes. See [Manage data sets](../warm-storage/manage-data-sets.md).

## Retrieval and proof

### How do I get my data back?

By its PieceCID, with `filecoin get` or the SDK. Content stored with Filecoin Pin can also be fetched by its root CID from any IPFS gateway. See [Retrieve data](../warm-storage/retrieve-data.md).

### What's the difference between a PieceCID and a root CID?

The PieceCID (starts with `bafkzcib`) identifies the exact bytes a provider stores and proves. The root CID (often starts with `bafy`) identifies your content on IPFS. Both are linked onchain.

### How do I check my data is really stored?

Look up your data set or PieceCID in [PDP Explorer](https://pdp.filecoin.cloud) to see each proof. See [Reliability and proofs](../overview/reliability-and-proofs.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/resources/faq)
