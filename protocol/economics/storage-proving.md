---
description: >-
  How Filecoin proves storage: Proof of Replication (PoRep) once at sealing,
  then WindowPoSt and WinningPoSt on a schedule, and what each proof checks.
---

# Storage proving

**Storage proving is how the Filecoin chain checks that storage providers keep the data they committed to. A provider proves it stored a unique copy once, with Proof of Replication, and then keeps proving it on a schedule, with Proof of Spacetime.**

These proofs apply to sealed, archival storage. For the proof used for warm storage, see [Proof of Data Possession](../../core-concepts/proof-of-data-possession.md). If you run a provider, see [Monitor proofs and faults](../../provide-storage/monitor-proofs-and-faults.md).

## Proof of Replication (PoRep)

A provider proves replication once, when it takes on data:

1. The data is placed in a [sector](../../reference/general/glossary.md#sector).
2. The provider _seals_ the sector.
3. Sealing produces a unique encoding, which proves the provider holds its own copy of the data.
4. The proof is compressed and submitted to the network.

The encoding depends on the data, on the provider that seals it, and on the time of sealing. If any of the three changes, the encoding changes. That makes it proof that this provider stored this data at this time.

## Proof of Spacetime (PoSt)

After replication, the provider must keep proving that the data is still stored, still available, and still sealed. Because the proof covers data held in a place over a period of time, it is called Proof of Spacetime. It comes in two kinds.

### WinningPoSt

WinningPoSt decides which providers can add blocks to the chain. At the start of each epoch, the network elects a few providers (see [Consensus](../concepts/consensus.md)). Each elected provider must submit a WinningPoSt, which proves it holds a sealed copy of its data.

The deadline is the end of the current epoch. It is short on purpose, so that a provider can't fabricate the proof. A provider that submits in time earns the [block reward](block-rewards.md) and the fees for the messages it includes. A provider that misses the deadline is not penalized, but it loses the chance to produce that block.

### WindowPoSt

WindowPoSt audits every provider continuously. Each provider must prove every sector it has committed once in each _proving period_, which lasts 24 hours.

* The proving period is split into 48 non-overlapping _deadlines_ of 30 minutes each.
* Sectors are grouped into _partitions_, and each partition is assigned to one deadline.
* A provider proves a whole partition at once, by the deadline it is assigned. All sectors in a partition are proved in the same deadline.

A provider with more sectors has more partitions to prove. The proof is a [zk-SNARK](https://en.wikipedia.org/wiki/Zero-knowledge_proof) sent in a message to the chain. Producing it needs the sealed copies, so it is not worth a provider's while to seal data again each time it must prove it.

If a provider misses a WindowPoSt, its sectors become faulty and it is penalized. See [Slashing](slashing.md).

## How long a commitment lasts

A provider commits a sector for at least 180 days, and can set its expiration at most 1,278 days ahead. It must keep proving the sector until it expires.

## Next steps

* [Proofs](../concepts/proofs.md): PoRep, PoSt and PDP compared.
* [Slashing](slashing.md): what happens when a proof is missed.
* [Committed capacity](committed-capacity.md): sectors that hold no customer data.
* [Manual storage deals](../manual-storage-deals.md): negotiate and record a deal directly with a provider.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/economics/storage-proving)
