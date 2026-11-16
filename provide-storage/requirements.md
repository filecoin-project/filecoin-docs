---
description: >-
  The skills, hardware, network and money you need to provide storage on
  Filecoin.
---

# Requirements

**Check this page before you buy hardware.** Each path needs very different machines, skills and money.

## What you need to know

* **Linux:** you work in a terminal on Ubuntu or Debian (22.04 or newer), run services or Docker containers, open firewall ports and read logs.
* **Storage:** you plan disks, RAID and backups, and replace failed disks fast.
* **Networking:** you run public servers, DNS and HTTPS, and keep them reachable.
* **Security:** you protect wallet keys, limit SSH access and keep admin ports private.
* **Business:** you plan costs, cash flow and, for client data, contracts and support.

One person can cover all of this for a small setup. Larger setups need a team.

## Hardware for warm storage

| Part | Minimum |
| --- | --- |
| CPU | 16 threads |
| RAM | 64 GB |
| Fast disk | 1 TiB NVMe or SSD for the chain and the database |
| Bulk disk | 10 TiB hard disk for client data, more as you grow |
| GPU | Not needed |

## Hardware for archival storage

Archival storage seals data, so it needs this hardware.

You can test on one large machine. In production, the work is split across machines:

| Machine | Typical spec |
| --- | --- |
| Chain node (Lotus) | 8 cores, 64 GiB RAM, 2 TB NVMe |
| Database (YugabyteDB) | 3 nodes. Can share machines with Curio. Don't use ZFS for its disks. |
| Proving (run two) | 16 cores, 128 GiB RAM, a GPU with 10 GB or more of memory |
| Sealing, first stage | 32 cores with SHA extensions, 1 TiB RAM, about 450 GiB NVMe per sector sealed at once |
| Sealing, second stage | 32 cores, 512 GiB RAM, a GPU with 24 GB or more of memory |
| Long-term storage | Large disk pools with about 20% free space |

To check a CPU for SHA extensions, run `grep -c sha_ni /proc/cpuinfo`. Any number above 0 means yes.

A balanced 1 PiB setup seals up to about 7 TiB a day. To start without sealing hardware, you can pay a sealing service to seal for you. You still need the chain node, database, proving machines and storage.

For archival storage, add disk for a ready-to-download copy of client data.

## Network

* **Warm storage:** a public IPv4 address, steady bandwidth, and a domain that points to your server. Open only ports 80 and 443 to the internet.
* **Sealing:** 10 GbE between your machines. 1 to 10 Gbps to the internet if you take client data.
* **Archival storage:** the same network as sealing, plus enough bandwidth to download large datasets, often many TiB, and to serve downloads.
* **All paths:** keep machines online. Proofs run on a fixed schedule, and a machine that's down misses them.

## Money

* **Warm storage:** about 8 FIL on Mainnet to pay for proof messages. No FIL locked up.
* **Sealing:** FIL for the pledge on every sector, plus a buffer for gas and daily fees until rewards arrive. See [How storage providers earn](how-storage-providers-earn.md).
* **Hardware and hosting:** your largest cost on every path.

On the Calibration Testnet, FIL is free from a [faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html).

## Next steps

* [Provide warm storage](provide-warm-storage.md)
* [Build a sealing cluster](build-a-sealing-cluster.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/provide-storage/requirements)
