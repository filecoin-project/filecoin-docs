---
title: Requirements
description: There are specific system and hardware requirements for running a Lotus node or mining set up.
---

# Requirements

The requirements of your system will change depending on the type of client you are running: a node, a storage miner, or seal worker.

## Hardware

### Lotus node

The requirements table below is correct as of August 2020 but may change in the future as software development continues. The amount of memory (RAM) required is expected to drop significantly to about 1GB in the future as the Lotus client uses Badger FS more efficiently.

| Processor                                      | Memory   | Storage space         |
| ---------------------------------------------- | -------- | --------------------- |
| 4 cores<br>8 threads<br> 2.5GHz base frequency | 8GB DDR4 | 200GB (SSD preferred) |

### Storage miner

Miners require a significant amount of hardware to run. The setup below is a minimal example for sealing 32GiB sectors on Lotus:

| Processor                                      | Memory     | Storage space |
| ---------------------------------------------- | ---------- | ------------- |
| 4 cores<br>8 threads<br> 2.5GHz base frequency | 128GB DDR4 | 2TB           |

#### Processors

AMD processors have access to the [Intel SHA Extensions](https://en.wikipedia.org/wiki/Intel_SHA_extensions) instruction set. Intel processors, strangely enough, do not have access to this instruction set and perform much slower than AMD processors during the sealing process. Because of this, AMD processors are _highly_ recommended.

#### Graphics cards

GPUs are a must for getting block rewards. These graphics cards have been confirmed to generate SNARKs quickly enough to successfully mine blocks on the Lotus Testnet:

- GeForce RTX 2080 Ti
- GeForce RTX 2080 SUPER
- GeForce RTX 2080
- GeForce GTX 1080 Ti
- GeForce GTX 1080
- GeForce GTX 1060

### Seal worker

The specifications for a system running a seal worker are similar to those of a standard Lotus node:

| Processor                                      | Memory   | Storage space         |
| ---------------------------------------------- | -------- | --------------------- |
| 4 cores<br>8 threads<br> 2.5GHz base frequency | 8GB DDR4 | 200GB (SSD preferred) |

It is common to run both a Lotus node and a seal worker on the same system.

## Software

### Go

You need to have Go `1.14.6` installed on your system. Head over to the [Golang Install docs](https://golang.org/doc/install) to find out how to install Go for your operating system.

You can check that you have Go installed properly by asking for the version number in a terminal window:

```bash
go version

> go version go1.14.6 linux/amd64
```
