---
title: 'Mining architectures'
description: 'Filecoin allows anyone to setup a mining operation to participate in a global, distributed storage market.'
breadcrumb: 'Mining architectures'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

This section provides examples for Filecoin Storage mining setups in the hope that they can help and guide other miners to plan and make the right choices when acquiring and setting up their mining infrastructure. Note that any storage mining setup must meet the [minimal hardware requirements](hardware-requirements.md).

::: callout
We are working to improve this section. If you would like to share your mining setup, please use the link at the bottom to edit the page!
:::

[[TOC]]

## Protocol Labs example architecture

The following [Lotus](lotus/README.md) miner setup was published as part of the [Guide to Filecoin Storage Mining](https://filecoin.io/blog/filecoin-guide-to-storage-mining/) blog post. A PDF is available for download [here](https://filecoin.io/vintage/mining-hardware-config-testnet-v3.pdf):

| Hardware unit        | CPU model                     | GPU                        | RAM        | Disk                        | Processes                                                   | Notes                                                                                       |
| -------------------- | ----------------------------- | -------------------------- | ---------- | --------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Storage miner + Node | AMD Epyc 7402 (24 cores)      | Nvidia Quadro RTX 6000     | 128-256GB  | Unspecified                 | 1x lotus <br /><br />1x lotus-miner                         | The miner delegates sealing functions to the workers below.                                 |
| PC1 workers          | AMD Epyc 7F32 DP/UP (8 cores) | -                          | 128-256GiB | 6 x 1-2TiB SSD scratch disk | 6x lotus-worker                                             | Runs 6 [Lotus seal workers](lotus/seal-workers.md) in parallel for PreCommit1 phase only.   |
| PC2, Commit workers  | AMD Epyc 7402 (24 cores)      | 2 x Nvidia Quadro RTX 6000 | 256GiB     | 2-4TiB SSD scratch disk(s)  | 1x lotus-worker (PC2) <br /><br /> 1x lotus-worker (Commit) | One [worker](lotus/seal-workers.md) dedicated to PreCommit2 and another to the Commit phase |
