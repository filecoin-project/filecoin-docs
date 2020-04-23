---
title: Interacting with the Network
description: Learn how to interface with the Filecoin network.
---

# Interacting with the Network

This page outlines various options for connecting to networks while building and operating your service or application.

Each Filecoin-based service or application will need to use at least one Filecoin node that maintains consensus. All interactions with the network must flow through an up-to-date node: sending and receiving market deals, sending and receiving data, and more.

You can run this node yourself or choose a hosted option. Running your own node offers more decentralized control, but it requires non-trivial time and resources. Choosing a hosted node makes it easier to get started quickly, but you’ll need to trust the hosting provider.

## Local networks

Here are some ways to spin up a mock version of the Filecoin network, for quick testing and development:
- [Filecoin Node Hosting Quick Start](https://paper.dropbox.com/doc/Filecoin-Node-Hosting-Quick-Start-7RBPjls1Bz6WLkT634NEN) for k8s and Docker
- [Containerized devnet using mocked sectorbuilder](https://github.com/textileio/lotus-devnet) (aka mocked mining)
- [Additional containers & virtualization scripts](https://github.com/filecoin-project/docs/wiki#containers--virtualization)

## Node APIs & API endpoints

Coming soon.

## Running your own remote nodes or networks

The same containerization scripts for [local networks](#local-networks) can also be used to run your own remote nodes or networks.

TODO: Additional tips.

## Testnets / Mainnet

[Filecoin Testnet](https://filecoin.io/testnet/) is a live community test network, under active development.
