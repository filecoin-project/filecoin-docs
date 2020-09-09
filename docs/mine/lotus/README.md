---
title: Lotus Miner
description: The Lotus Miner is a Filecoin miner implementation written by Protocol Labs
---

# Lotus Miner

{{ $frontmatter.description }}. It is optionally complemented by the Lotus Worker.

This sections contains guides to setup and run succesful mining operations using Lotus and should be approached by **advanced users only**, familiar with [how Filecoin works](../../store/how-filecoin-works.md), [how mining works](../how-mining-works.md) and the operation of the [Lotus Node](../../store/lotus/README.md).

::: warning
Lotus Mining for _testnet_ and _mainnet_ has stringent minimal **[hardware requirements](../hardware-requirements.md)**. If you do not reach the minimum requirements for the network you plan to use, you should not even attempt it.
:::

## Getting started with Lotus Miner

The following guides are essential starting points for those willing to launch a Lotus miner:

- Miner installation is covered in the [Installation guide](../../store/lotus/installation.md) along with that of the Lotus Node. Once installation is completed all three application (node, miner and worker) should be installed.
- The [Miner setup](miner-setup.md) covers all the details to configure your miner to achieve the maximum performance and avoid common pitfalls.
- The [Configuration reference](miner-configuration.md) explains what the different miner configuration options mean.
- The [Seal workers](seal-workers.md) guide covers how to run additional seal workers co-located or not with the Lotus Miner.

We nevertheless recommend careful reading of every existing section and gaining as much background as possible before proceeding with a Lotus miner deployment.
