---
title: "Hardware requirements"
description: "Filecoin Boost hardware requirements"
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "hardware-requirements-26a3b19fda0b0528b0cb9c6ce7282c8f"
weight: 35
toc: true
---

The hardware requirements for Boost are related to the sealing process of the Lotus deployment it is attached to.

Depending on how much data you need to onboard, and how many deals you need to make with clients, hardware requirements in terms of CPU and Disk will vary.

## General hardware requirements

### CPU

Boost will need at least an **8 core CPU**.

We strongly recommend a CPU model with support for _Intel SHA Extensions_ : AMD since the 'Zen' microarchitecture, or Intel since 'Ice Lake'. Lack of SHA Extensions results in a very significant slow down.

The most significant computation that Boost has to do is the _Piece CID calculation (also known as Piece Commitment or CommP)_. When Boost receives data from a client, it calculates the _Merkle root_ out of the hashes of the _Piece_ (padded .car file). The resulting root of the clean binary Merkle tree is the _Piece CID._

### RAM

**2 GiB of RAM** are needed at the very least.

### Disk

Boost stores all data received from clients before Piece CID is calculated and compared against deal parameters received from clients. Next, deals are published on-chain, and Boost waits for a number of epoch confirmations before proceeding to pass data to the Lotus sealing subsystem. This means that depending on the throughput of your operation, you must have disk space for at least a few staged sectors.

For small deployments **100 GiB of disk are needed at the very least** if we assume that Boost is to keep three 32 GiB sectors before passing them to the sealing subsystem.

We recommend using **NVMe disk** for Boost. As Dagstore grows in size, the overall performance might slow down due to slow disk.

