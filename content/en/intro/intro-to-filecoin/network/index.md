---
title: "Networks"
description: "There are several Filecoin networks available, each of which serves a different purposes. This page covers each network, it's use-case, and how to connect to it."
lead: "There are several Filecoin networks available, each of which serves a different purposes. This page covers each network, it's use-case, and how to connect to it."
draft: false
images: []
type: docs
menu:
  intro:
    parent: "lorem"
    identifier: "network-6dbd9740092466c18c550116228cf5ec"
weight: 90
toc: true
---

## Mainnet

[Mainnet](https://docs.filecoin.io/networks/overview/available-networks/%23mainnet) is the live production network that all nodes on the Filecoin network are connected to. It never resets.

## Testnets

Test networks, or testnets, are version of the Filecoin network that attempt to simulate various aspects of the Filecoin mainnet. Since they are for testing they should not be used for production applications or services.

### Calibration

[Calibration](https://docs.filecoin.io/networks/overview/available-networks/%23calibration) testnet is the most realistic simulation of the mainnet, where prospective storage providers can experience more realistic sealing performance and hardware requirements due to the use of final proofs constructions and parameters, and prospective storage clients can store and retrieve real data on the network. Clients can participate in deal-making workflows and storage/retrieval functionality. It also has the same sector size as the mainnet.

- [Public endpoint](https://api.calibration.node.glif.io/rpc/v0)
- [Blockchain explorer](https://calibration.filscan.io/)
- [Faucet](https://faucet.calibration.fildev.network/)

### Hyperspace

[Hyperspace](https://github.com/filecoin-project/testnet-hyperspace) testnet is the main pre-production developer testnet which is more stable and reliable. The Hyperspace testnet is a pre-production developer-focused testnet. It resets only in the event of irrecoverable damage. Developers are welcome to build and test their toolings, applications, and smart contracts on this network.

- [Public endpoint](https://api.hyperspace.node.glif.io/rpc/v0)
- [Blockchain explorer](https://explorer.glif.io/?network%3Dhyperspace)
- [Faucet](https://hyperspace.filtest.network/%23faucet)
