---
description: >-
  Earn by storing data on Filecoin. Run Curio, start with warm storage, and add
  sealed storage when you're ready.
---

# Provide storage on Filecoin

**Storage providers run the machines that store data on Filecoin, and they get paid for it.** You run **Curio**, the storage provider software. Most providers start with warm storage: one server, no GPU, and no FIL to lock up. You can add sealed storage later with the same software.

## Two ways to provide storage

|  | Warm storage | Archival storage |
| --- | --- | --- |
| **What you store** | Client files, ready to download | Large client datasets, sealed |
| **How you prove it** | PDP: you answer random checks that show you still hold the data | PoRep: you seal the data into a unique copy, then prove it every day |
| **Service that sends you clients** | Filecoin Warm Storage Service (FWSS) | Filecoin Cold Storage Service (FCSS) |
| **You earn** | USDFC from clients | USDFC from clients, plus FIL block rewards for your sealed storage |
| **Hardware** | One server, no GPU | A sealing cluster with GPUs |
| **FIL you lock up** | None. A small balance pays for proofs | FIL for each sector |
| **Time to first proof** | Hours | Days to weeks |

Both run on [Curio](https://docs.curiostorage.org/), the storage provider software, so what you learn carries over.

## Pick your path

* **New to Filecoin:** [Provide warm storage](provide-warm-storage.md). To have an AI agent set it up and run it, see [Provide warm storage with an agent](provide-warm-storage-with-an-agent.md).
* **Already sealing with Curio:** [Add warm storage to a sealing cluster](add-warm-storage-to-a-sealing-cluster.md).
* **Still on lotus-miner:** [Switch from lotus-miner to Curio](switch-from-lotus-miner-to-curio.md).
* **Want to store client datasets:** [Build a sealing cluster](build-a-sealing-cluster.md), then [Provide archival storage](provide-archival-storage.md).

Start on the Calibration Testnet, where FIL is free. Move to Mainnet once your setup has proved for a few days.

## Choose your size

For warm storage:

| Size | What it looks like |
| --- | --- |
| Solo | One server. Start with 10 TiB or more of hard disk and add disks as you fill them. |
| Rented server | A bare-metal storage server from a hosting company, 40 to 175 TiB per box before RAID. |
| Data center | 1 PiB and up, with disk shelves for client data. |

Approved providers today offer between 60 and 500 TiB.

For archival storage, your size depends on your sealing cluster and the datasets you take on. See [Requirements](requirements.md).

## Get help

Ask in the Filecoin Slack: `#fil-curio-help` for Curio, `#fil-sp-help` for PDP, FWSS and FCSS, and `#fil-lotus-help` for Lotus. Not on the Filecoin Slack yet? [Join here](https://filecoin.io/slack).

Planning a large deployment? [Talk to sales](TALK_TO_SALES_LINK).

## Next steps

* [How storage providers earn](how-storage-providers-earn.md)
* [Requirements](requirements.md)
* [Provide warm storage](provide-warm-storage.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/provide-storage/overview)
