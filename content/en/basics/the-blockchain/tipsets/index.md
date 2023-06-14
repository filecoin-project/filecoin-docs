---
title: "Blocks and tipsets"
description: "Learn more about blocks, tipsets, their relationship to each, and their use in Filecoin."
lead: "Like many other blockchains, _blocks_ are a fundamental concept in Filecoin. However, unlike other blockchains, Filecoin is a chain of groups of blocks called _tipsets_, rather than a chain of individual blocks. This page discusses blocks, tipsets, their relationship to each, and their use in Filecoin in detail."
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-the-blockchain"
    identifier: "tipsets-9c429ba5c09b3b3f9247ef22571dd7df"
weight: 100
toc: true
aliases:
    - "/fvm/concepts/tipsets/"
    - "/developers/smart-contracts/concepts/tipsets/"
---

## Blocks

In Filecoin, a block consists of:

- A block header
- A list of _messages_ contained in the block
- A signed copy of each message listed

Every block refers to at least one _parent block_; that is, a block produced in a prior epoch.

A _message_ represents communication between two actors, and thus changes in network state. The messages are listed in their order of appearance, deduplicated and returned in canonical order of execution. So, in other words, a block describes all changes to the network state in a given epoch.

## Tipsets

As described in [Consensus]({{< relref "consensus" >}}), multiple potential block producers may be elected via Expected Consensus (EC) to create a block in each epoch, which means that more than one valid block may be produced in a given epoch. All valid blocks with the same height and same parent block are assembled into a group called a _tipset_.

### Benefits of tipsets

In other blockchains, blocks are used as the fundamental representation of network state; that is, the overall status of each participant in the network at a given time. However, this structure has the following disadvantages:

- Potential block producers may be hobbled by network latency.
- Not all valid work is rewarded.
- Decentralization and collaboration in block production is not incentivized.

Because Filecoin is a chain of tipsets rather than individual blocks, the network enjoys the following benefits:

- All valid blocks generated in a given round are used to determine network state, increasing network efficiency and throughput.
- All valid work is rewarded (that is, all validated block producers in an epoch receive a block reward).
- All potential block producers are incentivized to produce blocks, disincentivizing centralization and promoting collaboration.
- Because all blocks in a tipset have the same height and parent, Filecoin is able to achieve rapid convergence in the case of forks.

In summary, blocks, which contain actor messages, are grouped into tipsets in each epoch, which can be thought of as the overall description of network state for a given epoch.

### Tipsets in the Ethereum JSON-RPC

Wherever you see the term _block_ in the Ethereum JSON-RPC, you should mentally read _tipset_. Before the inclusion of the Filecoin EVM runtime, there was no single hash referring to a tipset. A tipset ID was the concatenation of block CIDs, which led to a variable length ID, and poor user experience.

With the Ethereum JSON-RPC, we introduced the concept of the _tipset CID_ for the first time. It is calculated by hashing the former _tipset key_ using a blake-256 hash. Therefore, when you see the term:

- _block hash_, think _tipset hash_.
- _block height_, think _tipset epoch_.
- _block messages_, think _messages in all blocks in a tipset, in their order of appearance, deduplicated and returned in canonical order of execution_.
