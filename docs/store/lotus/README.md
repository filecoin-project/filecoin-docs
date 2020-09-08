---
title: Lotus
description: Lotus is a Filecoin implementation written by Protocol Labs.
---

# Lotus

{{ $frontmatter.description }}

Lotus is a suite of command-line applications:

- Lotus Node (`lotus`): a Filecoin Node: validates network transactions, manages a FIL wallet, can perform storage and retrieval deals.
- Lotus Miner (`lotus-miner`): a Filecoin miner. See the the respective [Lotus Miner](../../mine/lotus/) section in the [Mine](../../mine/) documentation.
- Lotus Worker (`lotus-worker`): a worker that assists miners to perform mining-related tasks. See its respective [guide](../../mine/lotus/seal-workers) for more information.

While the installation instructions are common to all three, this section contains guides to interact with the **Lotus Node** only. Additional documentation is available for [miners](../../mine/lotus/) and [developers](../../build/lotus/).

::: warning
Lotus is a command line application that **works on Linux and MacOS only**, and needs to be **built from source**. Users should be familiar with how command-line applications work.
:::

## Getting started with Lotus

These are the main guides to switfly get started with Lotus:

- [Install and launch a Lotus node](installation/)
- [Create a wallet and send or receive FIL to your address](send-and-receive-fil/)
- [Perform an storage deal and store some data in the network](store-data/)
- [Perform a retrieval deal and obtain some data from the network](retrieve-data/)

Please check the side menu for additional guides!
