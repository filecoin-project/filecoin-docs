---
description: >-
  Store your IPFS content on Filecoin with Filecoin Pin and keep the same CIDs,
  so your links, gateways, and IPFS tools keep working.
---

# Migrate from IPFS

**Filecoin Pin stores your IPFS content on Filecoin under the same CIDs, so your links, gateways, and IPFS tools keep working while storage providers prove onchain that they hold the data.**

## What you can do

| Use case | Guide |
| --- | --- |
| Move content you've pinned elsewhere to Filecoin | [Migrate pinned data with ipfs2foc](../../build/cookbook/filecoin-pin/migrate-ipfs-pins/README.md) |
| Keep real-world asset records on IPFS and Filecoin | [Store RWAs with IPFS](../../guides/store-rwas-with-ipfs.md) |
| Keep CIDs and IPNS names resolving after you move | [Keep CIDs and IPNS names resolving](../../guides/keep-cids-and-ipns-names-resolving.md) |

## Common questions

**Do my CIDs stay the same?**
Yes. Filecoin Pin stores your content under its existing IPFS CID.

**Do gateways and IPFS tools still work?**
Yes. You can keep using standard IPFS tools, such as Kubo, Helia, and HTTP gateways, to fetch the content.

**Can I move my CIDs in bulk?**
Yes. ipfs2foc takes a list of the CIDs you already have pinned, on a service like Pinata or Storacha or any public IPFS gateway, and stores them on Filecoin. It packs many CIDs into each piece, so the onchain cost depends on the number of pieces, not the number of CIDs. See [Migrate pinned data with ipfs2foc](../../build/cookbook/filecoin-pin/migrate-ipfs-pins/README.md).

**What does it cost to keep my content on Filecoin?**
Filecoin Pin stores your content on warm storage, at 2.50 USDFC per TiB per month for each copy, plus 0.12 USDFC per data set per month. Two copies are stored by default. Downloading directly from a provider has no egress charge. See [Pricing](../../store-data/overview/pricing.md).

## Start here

* [Filecoin Pin](../../store-data/tools/filecoin-pin.md): what it is and how it works.
* [Filecoin Pin quickstart](../../build/cookbook/filecoin-pin/getting-started.md): store your first file from the command line.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/getting-started/paths/migrate-from-ipfs)
