---
description: >-
  The three parts of a Filecoin storage provider: Curio, a chain node and a
  database.
---

# How it works

**A storage provider runs three things: Curio, a chain node and a database.**

## Curio

Curio is the storage provider software. One program does all the work:

* Stores client data and proves it with PDP.
* Seals sectors and proves them with PoRep.
* Takes client deals through its built-in storage market.
* Serves data for download.

You can run Curio on one machine or across many. Each machine runs only the parts that suit its hardware: proving, sealing, the market or the web dashboard. Curio calls these parts **layers**. The dashboard runs on port 4701.

## Chain node

Curio needs a Filecoin node to read the chain and send messages.

* **Lotus:** the main Filecoin node. Sealing clusters use it, and it holds your wallets.
* **Forest:** another Filecoin node. It comes bundled in the Curio-PDP Docker stack.

If you already run a synced Lotus or Forest node, you can point Curio at it.

## Database

Curio keeps its settings, task queue and records in [YugabyteDB](https://www.yugabyte.com/), a database that runs across several machines. For PDP, it also holds your wallet key. Every Curio machine in a cluster shares the same database. If the database stops, Curio stops, so run three or more database nodes in production and back them up.

## How the parts fit

Every setup has the same three parts: Curio, a chain node and a database. What changes is which jobs Curio runs:

| Curio job | Warm storage | Archival storage |
| --- | --- | --- |
| Store client data | Yes | Yes |
| Prove data with PDP | Yes | No |
| Seal sectors (PoRep) | No | Yes |
| Prove sealed sectors every day | No | Yes |
| Take deals through the storage market | No | Yes |
| Serve downloads | Yes | Yes |

Warm storage has no sealing, so it fits on one server. Archival storage needs a sealing cluster.

![Two setups. Warm storage on one server: Curio-PDP stores and proves data with PDP, Forest is the chain node bundled in the Docker stack, and YugabyteDB holds settings, tasks and the wallet key. Only Curio faces the internet, on ports 80 and 443. Archival storage on a sealing cluster: Lotus is the chain node and holds wallets, YugabyteDB runs on three or more nodes, and Curio runs one job per machine: proving, sealing, storage and the market.](assets/warm-and-archival-setups.png)

**Warm storage:** one Docker stack runs Forest, YugabyteDB and Curio-PDP on one server. Only Curio faces the internet, on ports 80 and 443.

**Sealing cluster:** a Lotus node, a YugabyteDB cluster, and Curio on several machines, each with its own job:

| Machine | Job |
| --- | --- |
| Proving | Runs the daily proofs and block proofs. Run two for safety. |
| Sealing | Seals new sectors. Needs strong CPUs and GPUs. |
| Storage | Holds sealed sectors on large disk pools. |
| Market | Takes client deals and serves downloads over HTTPS. |

## Older software

* **lotus-miner and lotus-worker:** the old way to seal and prove. Curio replaces them. See [Switch from lotus-miner to Curio](switch-from-lotus-miner-to-curio.md).
* **Lotus itself stays.** It's still the chain node for sealing clusters. Only lotus-miner and lotus-worker are replaced.
* **Boost:** the old deal software for lotus-miner. It doesn't work with current Curio.
* **Venus:** a separate Filecoin implementation that works with Lotus.

## Next steps

* [Requirements](requirements.md)
* [Curio reference](curio-reference.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/provide-storage/how-it-works)
