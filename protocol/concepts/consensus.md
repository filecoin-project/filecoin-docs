---
description: >-
  Expected Consensus (EC) in Filecoin: how storage providers are elected each
  epoch, weighted by storage power, to propose a block.
---

# Consensus

**Filecoin reaches consensus with Expected Consensus (EC). EC tolerates malicious participants (it is Byzantine fault tolerant) and gives probabilistic finality: a block becomes more certain as more blocks build on it. Each [epoch](../../reference/general/glossary.md#epoch), storage providers are elected at random, weighted by their storage power, to propose a block.**

For what winners earn, see [Block rewards](../economics/block-rewards.md).

## Properties

* An epoch can have several elected leaders, and each may propose a block.
* The winners are drawn at random from the network's participants, weighted by the storage power each contributes.
* All blocks proposed in an epoch are grouped into a [tipset](blocks-and-tipsets.md), and the final chain is selected from the tipsets.
* Anyone on the network can verify a block producer.
* A block producer stays anonymous until it releases its block.

## Steps in each epoch

1. **Election.** Each storage provider checks whether it is elected by generating an _election proof_. The election uses randomness from [drand](drand.md). Zero, one, or several providers can be elected. If none is, a new election runs in the next epoch, so the network stays live.
2. **Proof.** Each elected provider generates a [WinningPoSt](../../reference/general/glossary.md#winning-proof-of-spacetime-winningpost) proof for a randomly selected [sector](../../reference/general/glossary.md#sector), within a short window. A provider that fails is not eligible to produce a block. If every elected provider fails, EC returns to step 1.
3. **Tipset.** The blocks from providers that pass are grouped into a [tipset](../../reference/general/glossary.md#tipset).
4. **Selection.** The tipset that reflects the most committed storage on the network is selected, and the chain state is propagated from it.
5. **Repeat.** EC starts again in the next epoch.

## Next steps

* [Storage proving](../economics/storage-proving.md): how providers prove storage, including WinningPoSt.
* [Drand](drand.md): the randomness source for elections.
* [Proofs](proofs.md): the storage proofs compared.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/concepts/consensus)
