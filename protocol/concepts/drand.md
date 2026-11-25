---
description: >-
  How Filecoin uses the drand randomness beacon to elect block producers
  unpredictably, and what the beacon guarantees.
---

# Drand

**Drand is a public randomness beacon. Filecoin uses it as the random input for leader election, so no one can know in advance which providers will be elected.**

For how drand works in general, see the [drand documentation](https://www.drand.love/developers). For how elections use it, see [Consensus](consensus.md).

## Which drand network Filecoin uses

Filecoin uses drand's `quicknet` network, adopted in [FIP-0063](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0063.md). Quicknet produces a beacon every 3 seconds, and the beacons are _unchained_: each one is signed on its own and doesn't depend on the one before it. Filecoin needs fresh randomness once per 30-second epoch, so each epoch uses one beacon out of every 10.

Because beacons are unchained, a node can verify each one on its own, without keeping the earlier ones.

## What a beacon contains

A beacon is a round number and a threshold BLS signature over it. Quicknet uses BLS12-381 with signatures on group G1. The `round` is the index of the beacon in the sequence of all beacons the network has produced.

## How nodes get beacons

Drand nodes are not reachable by consumers directly. Highly available relays serve beacons over several channels, such as HTTP, S3 buckets, and gossip. A Filecoin node reads beacons from the relays of the selected drand network.

When it starts, a node sets up a drand client with the network's chain info: the beacon period, the genesis time, the public key used to verify beacons, and the signature scheme. It then calls:

* `/public/latest` for the latest beacon.
* `/public/<round>` for the beacon at a given round.

Each block header carries the beacon entries for its epoch. They are mixed with onchain data to draw the randomness Filecoin uses.

## If drand stops

If the drand beacon stops, Filecoin can't run new elections, so block production halts.

When the beacon resumes, drand quickly catches up on the missed rounds. Filecoin keeps a fixed mapping from time to drand round, so providers backdate blocks during this _catch-up_ period. They can publish null rounds for the outage, or try to produce the valid blocks that could have been made during it. When the catch-up ends, the heaviest chain wins and block production continues as normal.

## Next steps

* [Consensus](consensus.md): the election that uses these beacons.
* [Blocks and tipsets](blocks-and-tipsets.md): what an elected provider produces.
* [Precompiles](../fvm/precompiles.md): built-in contracts at fixed addresses.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/concepts/drand)
