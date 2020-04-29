---
title: Interacting with the Network
description: Learn how to interface with the Filecoin network.
---

# Interacting with the Network

This page outlines various options for connecting to local and remote test networks while building and operating your service or application.

Each Filecoin-based service or application will need to use at least one Filecoin node that maintains consensus. All interactions with the network must flow through an up-to-date node: sending and receiving market deals, sending and receiving data, and more.

You can run this node yourself or choose a hosted option. Running your own node offers more decentralized control, but it requires non-trivial time and resources. Choosing a hosted node makes it easier to get started quickly, but you’ll need to trust the hosting provider.

## Local networks

Here are some ways to spin up a mock version of the Filecoin network on your own machine(s), for quick testing and development:
- [Simple local devnet for lotus](https://lotu.sh/en+setup-local-dev-net)
- [Containerized devnet using mocked sectorbuilder](https://github.com/textileio/lotus-devnet) (aka mocked mining)
- [Additional containers & virtualization scripts](https://github.com/filecoin-project/docs/wiki#containers--virtualization)

## Running your own remote nodes or networks

- [Filecoin Node Hosting Quick Start](https://paper.dropbox.com/doc/Filecoin-Node-Hosting-Quick-Start-7RBPjls1Bz6WLkT634NEN) for remotely hosting your own node(s) using Kubernetes and Docker

## Testnet

[Filecoin Testnet](https://filecoin.io/testnet/) is a live community test network, under active development.

### Hosted nodes for Testnet
The Filecoin project has a limited number of dedicated, up-to-date nodes (synced with the latest Testnet chain) available to developers actively building storage services or applications. They are intended to jump-start development instead of waiting for your own node to sync, and not for production usage. To request a dedicated hosted node, please email [filecoin-collabs@protocol.ai](mailto:filecoin-collabs@protocol.ai?subject=Requesting20%a20%hosted20%node).

## Mainnet

Filecoin Mainnet launch is currently planned for Q3 2020. See the [Filecoin blog](https://filecoin.io/blog/roadmap-update-april-2020/) for more information.
