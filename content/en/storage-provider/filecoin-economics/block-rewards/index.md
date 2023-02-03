---
title: "Block rewards"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "block-rewards-6ac4a86158429427e733ff6713c474f8"
weight: 25
toc: true
---
WinningPoSt is the cryptographic challenge through which Storage Providers are rewarded for their contributions to the network. At the beginning of each epoch (1 epoch = 30 seconds), a small number of Storage Providers are elected to mine new blocks. Each elected Storage Provider who successfully created a block is granted Filecoin tokens by means of a “block reward”. The amount of FIL per block reward varies and is listed on various blockchain explorers like [Filfox](https://filfox.info/en).

The election mechanism of the Filecoin network is based on the “storage power” of the Storage Providers. A minimum of 10TiB in storage power is required to be eligible for WinningPoSt, and hence to earn block rewards. The more storage power one has the more likely he will be elected to mine a block. This concept becomes incredibly advantageous in the context of Filecoin Plus verified deals.

Committing 10TiB of capacity (sectors) equals 10TiB of “raw storage power” on the network. The more storage power a Storage Provider has, the more likely they are to get elected for block minting. Storage Providers above 10TiB of capacity can be elected by Filecoin’s “Expected Consensus algorithm” to mine a new block. This election happens every epoch (currently 1 epoch = 30 seconds) and up to 5 Storage Providers are elected to mine a block within 1 epoch. Collectively they form a “tipset”. The more storage capacity a Storage Provider has on the Filecoin network, the more likely they are to get elected for block mining. As such more capacity results in more block rewards.