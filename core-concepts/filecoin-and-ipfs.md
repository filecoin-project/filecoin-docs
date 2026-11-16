---
description: >-
  How Filecoin and IPFS fit together: IPFS names content by CID and moves it
  between peers, and Filecoin Cloud keeps it stored, proven and paid for,
  while serving it back through IPFS gateways.
---

# Filecoin and IPFS

**IPFS names content and moves it between computers; Filecoin adds storage that is paid for and proven.** Filecoin Cloud can store IPFS content and serve it back through IPFS gateways, under the same CID.

This is a concept page. To store IPFS content on Filecoin, see [Filecoin Pin](../store-data/tools/filecoin-pin.md). To move content you already pin elsewhere, see [Migrate pinned data with ipfs2foc](../guides/migrate-pinned-data-with-ipfs2foc.md).

## What each one does

| Job | IPFS | Filecoin Cloud |
| --- | --- | --- |
| Name the content | A [CID](../reference/general/glossary.md#content-identifier-cid), calculated from the content | A PieceCID for each piece, plus the Root CID for content stored with Filecoin Pin |
| Find who holds it | IPNI, a shared index of which servers hold which CID | Data set records onchain, plus IPNI for content stored with Filecoin Pin |
| Keep it stored | Only while someone chooses to pin it | Providers store it under a paid agreement |
| Prove it is still stored | No | Yes, every proving period. See [Proof of Data Possession](proof-of-data-possession.md) |
| Pay for storage | Not part of IPFS | Filecoin Pay, from your deposit. See [Payments and runway](payments-and-runway.md) |

## Two kinds of CID

Both are calculated from the content, but they do different jobs:

* **Root CID.** The IPFS CID of a file or folder. IPFS gateways and tools fetch content by it.
* **PieceCID.** Names a piece in Filecoin Cloud. Proofs and payments refer to it, and direct downloads from a provider use it.

Content stored with Filecoin Pin has both. See [Data sets and pieces](data-sets-and-pieces.md).

## Gateways

Filecoin Cloud providers run an IPFS gateway. Once a provider announces your content to IPNI, any IPFS gateway or tool can find and fetch it by its Root CID:

* **[inbrowser.link](https://inbrowser.link)** fetches the content and checks it against the CID in your browser.
* **Public gateways**, such as dweb.link, work too, but they are rate-limited and best-effort.
* **IPFS tools** fetch it like any other IPFS content.

For the other ways to retrieve, see [Retrieval and CDN](retrieval-and-cdn.md).

## Common questions

**How soon can a public gateway serve new content?**
A new Root CID can take a few minutes to start working through gateways. If you get a 404, wait and try again.

## Next steps

* [Migrate from IPFS](../getting-started/paths/migrate-from-ipfs.md): the path for teams moving from an IPFS pinning service.
* [Filecoin Pin](../store-data/tools/filecoin-pin.md): store IPFS content on Filecoin Cloud.
* [Migrate pinned data with ipfs2foc](../guides/migrate-pinned-data-with-ipfs2foc.md): copy existing pins without changing their CIDs.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/core-concepts/filecoin-and-ipfs)
