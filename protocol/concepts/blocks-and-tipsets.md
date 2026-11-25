---
description: >-
  How Filecoin blocks and tipsets work: what a block contains, how a tipset
  groups one epoch's blocks, and why the chain is a chain of tipsets.
---

# Blocks and tipsets

**A block records the messages that change the Filecoin chain's state. Filecoin groups all valid blocks from one epoch into a tipset, and the chain is a chain of tipsets rather than individual blocks.**

For how block producers are chosen, see [Consensus](consensus.md).

## Blocks

A block consists of:

* A block header.
* A list of the _messages_ in the block.
* A signed copy of each message.

Every block refers to at least one _parent block_, which is a block from an earlier epoch. A message is communication between two actors, so it changes network state. See [Actors](actors.md). Messages are listed in order of appearance, deduplicated, and returned in canonical order of execution.

### Block time

An _epoch_ is one round in which storage providers can be elected to produce a block. Filecoin's block time is 30 seconds, so an epoch lasts 30 seconds. Two things set that length:

* **Hardware requirements.** A faster block time with the same gas limit or number of messages per block would produce more chain data, which needs more storage.
* **Provider operations.** Providers do several operations while they produce a block. A shorter block time would cause many more missed blocks.

## Tipsets

Several providers can be elected in the same epoch, so more than one valid block can exist for it. All valid blocks with the same height and the same parent block are grouped into a _tipset_.

Chains built from single blocks can leave producers at a disadvantage when network latency delays their block, and not all valid work is rewarded. Because Filecoin is a chain of tipsets:

* All valid blocks from an epoch count toward network state, which raises throughput.
* Every validated block producer in an epoch receives a block reward.
* Producers are encouraged to collaborate rather than centralize.
* Blocks in a tipset share a height and a parent, so forks converge quickly.

### Tipsets in the Ethereum JSON-RPC

Wherever the Ethereum JSON-RPC says _block_, read _tipset_. A tipset's ID used to be the concatenation of its block CIDs, which made it a variable-length ID. The Ethereum JSON-RPC introduced the _tipset CID_, a BLAKE2b-256 hash of the tipset key.

| In the Ethereum JSON-RPC | Read it as |
| --- | --- |
| Block hash | Tipset hash |
| Block height | Tipset epoch |
| Block messages | The messages in all blocks in the tipset, in order of appearance, deduplicated, and in canonical order of execution |

## Next steps

* [Consensus](consensus.md): how providers are elected to produce blocks.
* [Block rewards](../economics/block-rewards.md): what a block producer earns.
* [Drand](drand.md): the randomness beacon behind leader election.
* [Gas](../fvm/gas.md): how gas is charged and estimated.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/concepts/blocks-and-tipsets)
