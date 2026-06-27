---
description: >-
  Use Proof of Replication storage when you need Filecoin sectors, sealing,
  storage power, and PoRep deal-making workflows.
---

# Store with PoRep

Use the PoRep path when you want to run a Filecoin storage provider that seals sectors, earns storage power, and accepts storage deals that become part of the Filecoin proving lifecycle.

PoRep storage is the traditional provider path for committing data into sectors. Providers seal data, prove that the replica was created, and then continue proving storage over time with WindowPoSt.

## Software path

Most PoRep provider deployments combine these components:

* [Curio](nodes/implementations/curio.md) for storage-provider operations, sealing, proving, storage, and retrieval workflows.
* [Lotus](nodes/implementations/lotus.md) for chain sync, wallet, actor, and client tooling.
* [Boost](https://boost.filecoin.io/) for PoRep deal-making and retrieval services.

## What to read next

* [Curio](nodes/implementations/curio.md) for the current provider operations stack.
* [Sealing pipeline](architecture/sealing-pipeline.md) for the sector preparation flow.
* [Storage proving](../core-concepts/filecoin-economics/storage-proving.md) for proving deadlines and proofs.
* [Storage deals](../core-concepts/filecoin-deals/storage-deals.md) for accepting client data.
* [Verified deals](../core-concepts/filecoin-deals/verified-deals.md) for Filecoin Plus and DataCap workflows.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/storage-providers/store-with-porep)
