---
description: >-
  Compare Filecoin's storage proofs: Proof of Replication (PoRep), Proof of
  Spacetime (PoSt) and Proof of Data Possession (PDP). What each proves, when it
  runs and which kind of storage uses it.
---

# Proofs

**Filecoin checks that providers still hold your data with cryptographic proofs, not trust. Three proofs do this: Proof of Replication (PoRep) and Proof of Spacetime (PoSt) for sealed, archival storage, and Proof of Data Possession (PDP) for warm storage.**

This page compares them. Each links to a page with the full detail.

## The three proofs

| | PoRep | PoSt | PDP |
| --- | --- | --- | --- |
| Full name | Proof of Replication | Proof of Spacetime | Proof of Data Possession |
| What it proves | The provider stored its own unique copy of the data | The sealed data is still stored, available and unchanged | The provider still holds the exact bytes you stored |
| When it runs | Once, when the provider takes on a sector | On a schedule for as long as the sector lives: WindowPoSt every 24 hours, WinningPoSt when a provider is elected to produce a block | Every proving period |
| Kind of storage | Sealed, archival storage | Sealed, archival storage | Warm storage, which is ready to download |
| How the data is kept | Encoded into a unique sealed copy | Sealed copy | As uploaded |

## How they fit together

PoRep and PoSt work as a pair. PoRep proves a provider made a unique copy at one point in time, and PoSt then proves the provider keeps that copy over time. A provider that misses a PoSt is penalized. See [Slashing](../economics/slashing.md).

PDP serves data that clients read back often. Because the data is not sealed, it can be served quickly, and the chain verifies a proof built from randomly chosen parts of the data without anyone downloading it.

## Where to read more

* [Storage proving](../economics/storage-proving.md): PoRep and PoSt in detail, including WinningPoSt, WindowPoSt and sector commitments.
* [Proof of Data Possession](../../core-concepts/proof-of-data-possession.md): how a PDP proving round works, and what a fault means.
* [Consensus](consensus.md): how WinningPoSt is used to elect block producers.

## Related pages

* [Block rewards](../economics/block-rewards.md): what a provider earns for producing a block.
* [Committed capacity](../economics/committed-capacity.md): sectors that hold no customer data.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/concepts/proofs)
