---
description: >-
  Earn by providing storage on Filecoin: run warm storage with PDP on a single
  machine, or cold storage and consensus mining on a sealing cluster.
---

# Storage providers

**You can earn by providing storage on Filecoin: run warm storage with PDP on a single machine, cold storage or consensus mining on a sealing cluster, or both on one Curio cluster.**

## Choose what to run

| Option | What it takes |
| --- | --- |
| **Warm storage (PDP)** | No GPU. A single-machine Docker stack is enough to start. Recommended for new providers |
| **Cold storage (FCSS)** | A PoRep sealing cluster. Stores sealed copies of client archives of 1 TiB and up |
| **Consensus mining (PoRep)** | GPU-heavy sealing hardware and FIL collateral |
| **Both** | Consensus mining and warm storage on one Curio cluster |

## Common questions

**Which setup fits my size?**
For warm storage, there are three operation profiles: Solo (one machine, starting at 10 TiB of HDD), Renting (a bare-metal server from a colocation or data center host), and Enterprise Data Center Operator (1 PiB and up). See [Choose your operation profile](../../storage-providers/getting-started.md#choose-your-operation-profile).

**What are the minimum requirements to be a storage provider?**
For warm storage, one server with 16+ CPU threads, 64 GB+ RAM, 1 TiB of NVMe for the chain and database, and 10 TiB+ of HDD for client data. You also need a public IPv4 address and a domain that points to it. No GPU is needed. Cold storage and consensus mining need a PoRep sealing and proving cluster with GPUs. See [Storage provider agent quickstart](../../storage-providers/agent-quickstart.md).

**What currency are storage providers paid in?**
Warm storage and cold storage pay in USDFC, a US dollar stablecoin on Filecoin, through Filecoin Pay. Consensus mining earns block rewards in FIL. Warm storage rates are fixed by the storage contract, and a 0.5% network fee comes off at settlement.

## Start here

* [Plan your storage provider business](../../storage-providers/getting-started.md): the options, economics, and hardware.
* [Storage provider agent quickstart](../../storage-providers/agent-quickstart.md): from zero to running on a single page.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/getting-started/paths/storage-providers)
