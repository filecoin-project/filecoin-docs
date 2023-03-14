---
title: "Tipsets"
description: "The Filecoin network uses the idea of tipsets to manage blocks within the blockchain. This page details what a tipset is, how they differ to blocks in other blockchains, and how developers should deal with tipsets."
lead: "The Filecoin network uses the idea of tipsets to manage blocks within the blockchain. This page details what a tipset is, how they differ to blocks in other blockchains, and how developers should deal with tipsets."
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

The Filecoin network produces multiple blocks at every epoch. In simple terms, block producers run a local function that uses their _quality-adjusted power_, as represented in the power table, and randomness from the Drand network to determine if they're eligible to produce a block for the current epoch. This consensus protocol is called _expected consensus_.

These blocks are assembled in a **tipset**, and the execution of their messages is deferred to the next tipset. Theoretically, there can be `0` to infinite blocks in a tipset. In practice, however, we see `5` to `10` blocks per tipset.

## Introduction of Ethereum

Wherever you see the term _block_ in the Ethereum JSON-RPC, you should mentally read _tipset_. Before the inclusion of the Filecoin EVM-runtime, there was no single hash referring to a tipset. A tipset ID was the concatenation of block CIDs, which led to a variable length ID, and a pretty poor experience.

With the Ethereum JSON-RPC, we introduced the concept of the tipset CID for the first time! It is calculated by hashing the former _tipset key_ using a blake-256 hash. Therefore:

- Wherever you see _block hash_, think _tipset hash_.
- Wherever you see _block height_, think _tipset epoch_.
- Wherever you see _block messages_, think _messages in all blocks in a tipset, in their order of appearance, deduplicated and returned in canonical order of execution_.
