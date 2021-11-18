---
title: 'Storage architectures'
description: 'Filecoin allows anyone to set up a storage provider operation to participate in a global, distributed storage market.'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

This section provides examples for Filecoin Storage mining setups to guide providers to plan and make the right choices when acquiring and setting up their mining infrastructure. Any storage mining setup must meet the [minimal hardware requirements](hardware-requirements.md).

::: callout
We are working to improve this section. If you would like to share your mining setup, please use the link at the bottom to edit the page!
:::

[[TOC]]

## Protocol Labs example architecture

<<<<<<< HEAD:docs/storage-provider/storage-architectures.md
The following [Lotus](https://lotus.filecoin.io) provider setup was published as part of the [Guide to Filecoin Storage Providing](https://filecoin.io/blog/filecoin-guide-to-storage-mining/) blog post. A PDF is available for download [here](https://filecoin.io/vintage/mining-hardware-config-testnet-v3.pdf):

| Hardware unit        | CPU model                     | GPU                        | RAM        | Disk                        | Processes                                                   | Notes                                                                                       |
| -------------------- | ----------------------------- | -------------------------- | ---------- | --------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Storage provider + Node | AMD Epyc 7402 (24 cores)      | Nvidia Quadro RTX 6000     | 128-256 GB  | Unspecified                 | 1x lotus <br /><br />1x lotus-miner                         | The miner delegates sealing functions to the workers below.                                 |
| PC1 workers          | AMD Epyc 7F32 DP/UP (8 cores) | -                          | 128-256 GiB | 6 x 1-2 TiB SSD scratch disk | 6x lotus-worker                                             | Runs 6 [Lotus seal workers](https://lotus.filecoin.io/docs/storage-providers/seal-workers/) in parallel for PreCommit1 phase only.   |
| PC2, Commit workers  | AMD Epyc 7402 (24 cores)      | 2 x Nvidia Quadro RTX 6000 | 256 GiB     | 2-4 TiB SSD scratch disk(s)  | 1x lotus-worker (PC2) <br /><br /> 1x lotus-worker (Commit) | One [worker](https://lotus.filecoin.io/docs/storage-providers/seal-workers/) dedicated to PreCommit2 and another to the Commit phase |
| Storage provider + Node | Intel Xeon Platinum Processor 8358 (32 cores) | Nvidia GeForce RTX 3080 series or RTX 3090 | 128-256 GB | Unspecified | 1x lotus<br><br>1x lotus-miner | The miner delegates sealing functions to the workers below. |
=======
The following [Lotus](https://lotus.filecoin.io) miner setup was published as part of the [Guide to Filecoin Storage Mining](https://filecoin.io/blog/filecoin-guide-to-storage-mining/) blog post. A PDF is available for download [here](https://filecoin.io/vintage/mining-hardware-config-testnet-v3.pdf):

| Hardware unit        | CPU model                     | GPU                        | RAM        | Disk                        | Processes                                                   | Notes                                                                                       |
| -------------------- | ----------------------------- | -------------------------- | ---------- | --------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Storage miner + Node | AMD Epyc 7402 (24 cores)      | Nvidia Quadro RTX 6000     | 128-256 GB  | Unspecified                 | 1x lotus <br /><br />1x lotus-miner                         | The miner delegates sealing functions to the workers below.                                 |
| PC1 workers          | AMD Epyc 7F32 DP/UP (8 cores) | -                          | 128-256 GiB | 6 x 1-2 TiB SSD scratch disk | 6x lotus-worker                                             | Runs 6 [Lotus seal workers](https://lotus.filecoin.io/docs/storage-providers/seal-workers/) in parallel for PreCommit1 phase only.   |
| PC2, Commit workers  | AMD Epyc 7402 (24 cores)      | 2 x Nvidia Quadro RTX 6000 | 256 GiB     | 2-4 TiB SSD scratch disk(s)  | 1x lotus-worker (PC2) <br /><br /> 1x lotus-worker (Commit) | One [worker](https://lotus.filecoin.io/docs/storage-providers/seal-workers/) dedicated to PreCommit2 and another to the Commit phase |
| Storage miner + Node | Intel Xeon Platinum Processor 8358 (32 cores) | Nvidia GeForce RTX 3080 series or RTX 3090 | 128-256 GB | Unspecified | 1x lotus<br><br>1x lotus-miner | The miner delegates sealing functions to the workers below. |
>>>>>>> master:docs/mine/mining-architectures.md
| PC1 workers | Intel Xeon Gold Processor 6346 (16 cores) | - | 128-256 GiB | 6 x 1-2 TiB SSD scratch disk | 6x lotus-worker | Runs 6 Lotus seal workers in parallel for PreCommit1 phase only. |
| PC2, Commit workers | Intel Xeon Platinum Processor 8358 (32 cores) | 2x Nvidia GeForce RTX 3080 series or RTX 3090 | 256 GiB | 2-4 TiB SSD scratch disk(s) | 1x lotus-worker (PC2)<br><br>1x lotus-worker (Commit) | One worker dedicated to PreCommit2 and another to the Commit phase. |
