---
description: >-
  Like many other blockchains, blocks are a fundamental concept in Filecoin.
  Unlike other blockchains, Filecoin is a chain of groups of blocks called
  tipsets, rather than a chain of individual blocks.
---

# Blocks and tipsets

## Blocks

In Filecoin, a block consists of:

* A block header
* A list of _messages_ contained in the block
* A signed copy of each message listed

Every block refers to at least one _parent block_; that is, a block produced in a prior epoch.

A _message_ represents communication between two actors, and thus changes in network state. The messages are listed in their order of appearance, deduplicated and returned in canonical order of execution. So, in other words, a block describes all changes to the network state in a given epoch.

### Blocktime

Blocktime is a concept that represents the average time it takes to mine or produce a new block on a blockchain. In Ethereum, for example, the blocktime is approximately 15 seconds on average, meaning that a new block is added to the Ethereum blockchain roughly every 15 seconds.

In the Filecoin network, storage providers compete to produce blocks by providing storage capacity and participating in the consensus protocol. The block time determines how frequently new blocks are added to the blockchain, which impacts the overall speed and responsiveness of the network.

Filecoin has a block time of 30 seconds, and this duration was chosen for two main reasons:

* **Hardware requirements**: If the block time were faster while maintaining the same gas limit or the number of messages per block, it would lead to increased hardware requirements. This includes the need for more storage space to accommodate the larger chain data resulting from more frequent block production.
* **Storage provider operations**: The block time also takes into account the various operations that occur during that duration on the storage provider (SP) side. As SPs generate new blocks, the 30 second block time allows for the necessary processes and computations to be carried out effectively. If the blocktime were shorter, SPs would encounter significantly more blocktime failures.

By considering these factors, the Filecoin network has established a block time of 30 seconds, balancing the need for efficient operations and hardware requirements.

## Tipsets

As described in [Consensus](consensus.md), multiple potential block producers may be elected via Expected Consensus (EC) to create a block in each epoch, which means that more than one valid block may be produced in a given epoch. All valid blocks with the same height and same parent block are assembled into a group called a _tipset_.

### Benefits of tipsets

In other blockchains, blocks are used as the fundamental representation of network state; that is, the overall status of each participant in the network at a given time. However, this structure has the following disadvantages:

* Potential block producers may be hobbled by network latency.
* Not all valid work is rewarded.
* Decentralization and collaboration in block production is not incentivized.

Because Filecoin is a chain of tipsets rather than individual blocks, the network enjoys the following benefits:

* All valid blocks generated in a given round are used to determine network state, increasing network efficiency and throughput.
* All valid work is rewarded (that is, all validated block producers in an epoch receive a block reward).
* All potential block producers are incentivized to produce blocks, disincentivizing centralization and promoting collaboration.
* Because all blocks in a tipset have the same height and parent, Filecoin is able to achieve rapid convergence in the case of forks.

In summary, blocks, which contain actor messages, are grouped into tipsets in each epoch, which can be thought of as the overall description of network state for a given epoch.

### Tipsets in the Ethereum JSON-RPC

Wherever you see the term _block_ in the Ethereum JSON-RPC, you should mentally read _tipset_. Before the inclusion of the Filecoin EVM runtime, there was no single hash referring to a tipset. A tipset ID was the concatenation of block CIDs, which led to a variable length ID, and poor user experience.

With the Ethereum JSON-RPC, we introduced the concept of the _tipset CID_ for the first time. It is calculated by hashing the former _tipset key_ using a blake-256 hash. Therefore, when you see the term:

* _block hash_, think _tipset hash_.
* _block height_, think _tipset epoch_.
* _block messages_, think _messages in all blocks in a tipset, in their order of appearance, deduplicated and returned in canonical order of execution_.
