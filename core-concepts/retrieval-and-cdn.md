---
description: >-
  How data stored in Filecoin Cloud is retrieved: over HTTP from any provider
  that holds a copy, by its PieceCID or Root CID, with no egress charge, or
  through the Filecoin Beam CDN.
---

# Retrieval and CDN

**Anything you store in Filecoin Cloud can be downloaded over HTTP from any storage provider that holds a copy, with no egress charge.** You ask for it by its PieceCID, or by its Root CID if you stored it with Filecoin Pin.

This is a concept page. To download your data, see [Retrieve data](../store-data/warm-storage/retrieve-data.md).

## Ways to retrieve

| Path | Served from | Address | Speed | Use it for |
| --- | --- | --- | --- | --- |
| Direct from a provider | The provider's HTTP endpoint | PieceCID | Seconds | Most workloads. This is the default |
| IPFS gateways | The provider's IPFS gateway, directly or through any IPFS gateway | Root CID | Varies with the gateway. Public gateways are rate-limited and best-effort | IPFS apps and tools, and content stored with Filecoin Pin. See [Filecoin and IPFS](filecoin-and-ipfs.md) |
| Filecoin Beam | A cache in front of the providers | PieceCID | Milliseconds once cached | Data read often or by many users |

## Why any copy works

A PieceCID or Root CID is calculated from the data, so any provider holding a copy can serve it under that ID. If one provider is offline, another copy can be used. See [Data sets and pieces](data-sets-and-pieces.md).

The ID also lets you check a download. The Filecoin SDK checks every download it makes. A plain HTTP download, for example with `curl`, isn't checked unless you check it yourself.

## How the SDK finds a provider

When you download with the Filecoin SDK, you only give it the PieceCID:

1. It reads your data sets onchain to find which providers hold the piece.
2. It asks those providers at the same time whether they have it.
3. It downloads from the first one that answers.
4. It checks the bytes against the PieceCID.

The download works as long as any one provider holding the piece is reachable.

## Filecoin Beam

{% hint style="warning" %}
Filecoin Beam isn't fully supported yet. Check the [Filecoin Beam docs](https://docs.filbeam.com/) before you rely on it.
{% endhint %}

Filecoin Beam is a content delivery network (CDN) for Filecoin Cloud. It caches your pieces close to where they are requested:

* **Cache hit:** the piece is already cached and is served right away.
* **Cache miss:** Filecoin Beam fetches the piece from a provider, serves it, and caches it for the next request.

Beam is turned on per data set when you store the data, with the SDK's `withCDN` option. Beam egress is charged per TiB, to the wallet that owns the data set. For prices and limits, see the [Filecoin Beam docs](https://docs.filbeam.com/).

## Common questions

**Can anyone download my data?**
Yes. Data in warm storage is public: anyone with its ID can download it. Encrypt anything private before you upload. See [Security, privacy and data location](../store-data/overview/security-privacy-and-data-location.md).

## Next steps

* [Retrieve data](../store-data/warm-storage/retrieve-data.md): download with the CLI, the SDK or an agent.
* [Filecoin and IPFS](filecoin-and-ipfs.md): how Root CIDs and gateways fit in.

*Applies to: Filecoin SDK 2.x.*

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/core-concepts/retrieval-and-cdn)
