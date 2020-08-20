---
title: Install Filecoin
sidebarDepth: 0
description: Learn how to get started with Filecoin.
---

# Install Filecoin

## Before you begin:

We recommend a dedicated computer that can be left running and connected to the network. If you don’t have a dedicated computer for this, you can use a remote server such as Digital Ocean. Here’s a starter configuration we use:

- Type: Standard
- CPU Type: Shared CPU
- vCPUs: 4 vCPUs
- Memory: 8 GB
- SSD: 160 GB
- Transfer: 5 TB

If you plan to mine (sell storage to others), see [Testnet Storage Mining](https://filecoin.io/blog/filecoin-testnet-mining/) for additional hardware specifications.

## Installation Instructions

To install and run a Filecoin protocol implementation from the command-line, we recommend you install [lotus](https://github.com/filecoin-project/lotus), a Filecoin protocol implementation in Go.

- **To install lotus and connect to the lotus testnet**: you can find installation instructions on the [lotus documentation site](https://lotu.sh/en+getting-started). Building and running the lotus `master` branch will automatically connect you to the lotus testnet
- **To install lotus and connect to a lotus devnet (recommended for faster development cycles)**: you can find installation instructions in our guide to [interacting with the network](./networks). You will have to build a specific branch of lotus to connect to a particular devnet.
- To install Powergate, see the [Textile Powergate documentation](https://docs.textile.io/powergate/).
- For more ways to install and use Filecoin, check out the [Build section](../build/README.md).
