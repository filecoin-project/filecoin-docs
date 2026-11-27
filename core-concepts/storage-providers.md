---
description: >-
  Filecoin has two kinds of storage providers: PoRep providers, which run a
  built-in miner actor and earn storage power, and PDP providers, which
  register in a smart contract and get paid for verified storage service.
---

# Storage providers: PoRep and PDP

"Storage provider" (SP) means two different things on Filecoin today. Both store data and prove it on chain, but they have different identities, proofs, economics, and tooling.

* **PoRep providers** run a built-in **miner actor**. They seal data into sectors with Proof of Replication (PoRep), prove them with Proof of Spacetime (PoSt), earn **storage power**, and take part in consensus. This is the original Filecoin storage provider, sometimes called a miner.
* **PDP providers** register in the **Service Provider Registry** smart contract. They keep data unsealed, prove it with Proof of Data Possession (PDP) through the `PDPVerifier` contract, and get paid by services such as the [Filecoin Warm Storage Service (FWSS)](../build/filecoin-onchain-cloud/README.md). They have no storage power and don't take part in consensus.

## Compared

| | **PoRep provider** | **PDP provider** |
| --- | --- | --- |
| **On-chain identity** | Miner actor ID (`f0…`) with owner, worker, and control addresses | Provider ID in the Service Provider Registry, with a `serviceProvider` and a `payee` address (`0x…`) |
| **Where state lives** | Built-in actors (miner, power, market, and reward) | FEVM smart contracts (Service Provider Registry, `PDPVerifier`, FWSS, and Filecoin Pay) |
| **Unit of storage** | Sealed 32 GiB or 64 GiB sectors | Data sets of unsealed pieces |
| **Proofs** | PoRep when sealing, WindowPoSt for every sector every 24 hours, WinningPoSt to produce blocks | Merkle inclusion proofs for random challenges (from drand) over each data set, every proving period |
| **Storage power** | Yes. Counts toward network power and consensus | None. PDP data is not counted in network storage power |
| **Collateral** | FIL initial pledge per sector, plus daily fees | No pledge. A 5 FIL registration fee (burned) and small FIL proof fees |
| **When proofs are missed** | Faults, penalties, and lost power | No payment for that proving period |
| **Earnings** | Block rewards in FIL, plus deal payments | Storage fees from clients, in USDFC through Filecoin Pay |
| **Clients find them through** | Deal-making tools, the [PoRep Market](../build/filecoin-onchain-cloud/fcss.md), or direct relationships | The registry and the services that approve providers (for example, FWSS) |
| **Software** | Curio and Lotus (or the older `lotus-miner` and Boost) | Curio-PDP |
| **Explorers** | Chain explorers such as [Filfox](https://filfox.info/en/) or [Beryx](https://beryx.zondax.ch/) | [PDP Explorer](https://pdp.filecoin.cloud) |

## One operator, several identities

An operator can run both kinds. Curio can seal sectors and serve PDP from the same cluster (see [Path C](../storage-providers/agent-quickstart.md#path-c)). The two identities are not linked on chain: a miner actor ID and a registry provider ID are separate, and PDP data is not stored in the miner's sectors.

[Filecoin Cold Storage Service (FCSS)](../build/filecoin-onchain-cloud/fcss.md) providers are PoRep providers. They also register their miner actor IDs in the PoRep Market contracts, which match client deals to their offers.

## What this means for network metrics

Network figures such as storage power, raw-byte and quality-adjusted capacity, block rewards, and provider counts on chain explorers only include PoRep providers. To count PDP providers or the data they store, read the Service Provider Registry and `PDPVerifier` contracts, or use the [PDP Explorer](https://pdp.filecoin.cloud). Contract addresses are listed in the [FOC documentation](https://docs.filecoin.cloud/resources/contracts).

## After Solstice

The Solstice network upgrade ([FIP-0118](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0118.md)) splits each block reward into streams. The consensus stream still pays the PoRep provider that wins the block. The service stream pays registered service orchestrators, based on the payments they settle through Filecoin Pay. PDP providers don't receive block rewards directly. They are paid by the services they work for.

## Learn more

* [Proofs](filecoin-virtual-machine/proofs.md)
* [About PDP](../storage-providers/pdp/about.md)
* [Filecoin Onchain Cloud](../build/filecoin-onchain-cloud/README.md)
* [Plan your Filecoin storage provider business](../storage-providers/getting-started.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/core-concepts/storage-providers)
