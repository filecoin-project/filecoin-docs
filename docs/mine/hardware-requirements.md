---
title: 'Hardware requirements'
description: 'Minimum hardware requirements for Filecoin mining.'
breadcrumb: 'Hardware requirements'
---

# {{ $frontmatter.title }}

These are the minimum and recommended hardware requirements to run a Miner on the different [Filecoin networks](https://networks.filecoin.io).

## Testnet

Minimal sector sizes for testnet is 32GB. The minimal requirements are as follow:

- An **8+ core CPU**. Strongly recommended: a CPU model with support for _Intel SHA Extensions_ (AMD since Zen microarchitecture, or Intel since Ice Lake). Lack of SHA Extensions results in a significant slow down.
- **128 GiB of RAM** at the very least. This **must** be complemented with **256 GiB of swap on a very fast NVMe SSD** storage medium.
- A powerful GPU. The [authoritative list](https://github.com/filecoin-project/bellman#supported--tested-cards) of supported GPUs is in the [Bellman repository](https://github.com/filecoin-project/bellman#supported--tested-cards). Additional GPU models need to be enabled manually ([instructions for Lotus](lotus/gpus.md)).
- A dedicated SSD of at least 512GB+ for cache storage.
- The Lotus node may or may not run in the same machine as the miner, but it should also have enough storage to hold the Filecoin chain, which grows at a rate of 12GiB per week.

::: warning
Mixing AMD and Nvidia GPUs in the same machine is known to cause issues with OpenCL and should be avoided.
:::

## About hardware requirements

Minimal hardware requirements are adjusted for observed behaviour in the respective network. These will not increase in the presumable future, and money spent on hardware should provide users with many years of reliable service, paying for themselves several times over.

Filecoin allows to launch a small cloud storage business for a few thousand dollars right from your own home, where it would cost millions in infrastructure and logistics to get off the ground in the current data hosting model.Think of the investment as running a small cloud storage business; to launch one following the existing data hosting model.
