---
title: "Block rewards"
description: "How Storage Providers earn Filecoin for making storage capacity available"
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-filecoin-economics"
    identifier: "block-rewards-6ac4a86158429427e733ff6713c474f8"
weight: 230
toc: true
---
WinningPoSt (short for [Winning Proof of SpaceTime](https://spec.filecoin.io/algorithms/pos/post/)) is the cryptographic challenge through which Storage Providers are rewarded for their contributions to the network. At the beginning of each epoch (1 epoch = 30 seconds), a small number of Storage Providers are elected by the network to mine new [blocks](https://docs.filecoin.io/reference/general/glossary/#block). Each elected Storage Provider who successfully creates a block is granted Filecoin tokens by means of a _block reward_. The amount of FIL per block reward varies over time, and is listed on various blockchain explorers like [Filfox](https://filfox.info/en).

The election mechanism of the Filecoin network is based on the “storage power” of the Storage Providers. A minimum of 10TiB in storage power is required to be eligible for WinningPoSt, and hence to earn block rewards. The more storage power a Storage Provider has, the more likely they will be elected to mine a block. This concept becomes incredibly advantageous in the context of [Filecoin Plus verified deals](https://docs.filecoin.io/basics/how-storage-works/filecoin-plus/).
