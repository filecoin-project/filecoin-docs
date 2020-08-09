---
title: Overview
description: Learn about the Lotus Filecoin implementation, why it exists, and how to install it.
---

# Overview

Lotus is an implementation of the Filecoin specification written in Go. You can run the Lotus client to interact with the Filecoin networks. The Lotus project is created and maintained by Protocol Labs, the creators of IPFS, libp2p, and Filecoin. This section covers how to install the Lotus client on your machine.

There are three types of Lotus client available:

| Client        | Purpose                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lotus node    | An interface between your computer and the Filecoin network. All transactions, queries, and interactions with the Filecoin network must pass through a Lotus node.              |
| Storage miner | The Lotus storage miner queries a Lotus node for the latest tipset on-chain, produces a block on that tipset, and submits it to the node to be broadcast to the entire network. |
| Seal worker   | An extra process that can offload heavy processing tasks from your Lotus Storage miner.                                                                                         |

## Requirements

The requirements of your system will change depending on the type of client you are running: a node, a storage miner, or seal worker.

### Hardware

#### Lotus node

Since the Filecoin network is constantly growing and being developed, hardware requirements keep changing. The requirements table below is correct as of writing but may change in the future. The amount of memory (RAM) required is expected to drop significantly as the Lotus client uses Badger FS more efficiently. This is expected to come down to about 1GB in the near future.

| Processor                                      | Memory   | Storage space         |
| ---------------------------------------------- | -------- | --------------------- |
| 4 cores<br>8 threads<br> 2.5GHz base frequency | 8GB DDR4 | 200GB (SSD preferred) |

Again, these requirements will change in the near future.

#### Storage miner

Miners require a significant amount of hardware to run. The setup below is a minimal example for sealing 32GB sectors on Lotus:

| Processor                                      | Memory     | Storage space |
| ---------------------------------------------- | ---------- | ------------- |
| 4 cores<br>8 threads<br> 2.5GHz base frequency | 128GB DDR4 | 2TB           |

##### Processors

AMD processors have access to the [Intel SHA Extensions](https://en.wikipedia.org/wiki/Intel_SHA_extensions) instruction set. Intel processors, strangely enough, do not have access to this instruction set and perform much slower than AMD processors during the sealing process. Because of this, AMD processors are _highly_ recommended.

##### Graphics cards

GPUs are a must for getting block rewards. These graphics cards have been confirmed to generate [SNARKs](<https://en.wikipedia.org/wiki/SNARK_(theorem_prover)>) quickly enough to successfully mine blocks on the Lotus Testnet:

- GeForce RTX 2080 Ti
- GeForce RTX 2080 SUPER
- GeForce RTX 2080
- GeForce GTX 1080 Ti
- GeForce GTX 1080
- GeForce GTX 1060

#### Seal worker

The specifications for a system running a seal worker are similar to those of a standard Lotus node:

| Processor                                      | Memory   | Storage space         |
| ---------------------------------------------- | -------- | --------------------- |
| 4 cores<br>8 threads<br> 2.5GHz base frequency | 8GB DDR4 | 200GB (SSD preferred) |

It is common to run both a Lotus node and a seal worker on the same system.

### Software

#### Golang

You need to have Go installed on your system. Head over to the [Golang Install docs](https://golang.org/doc/install) to find out how to install Go for your operating system.

You can check that you have Go installed properly by asking for the version number in a terminal window:

```bash
go version

> go version go1.14.6 linux/amd64
```
