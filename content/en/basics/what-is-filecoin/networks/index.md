---
title: "Networks"
description: "Find out information about which networks are available, what their scheduled uptime is, and how you can connect to each network."
lead: "The Filecoin network has several different networks for testing, staging, and production purposes. This page contains information on the [networks available](#available-networks) for Filecoin."
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-what-is-filecoin"
    identifier: "networks-7da5a52c1427d233e3ebfc1aba5fe0e1"
weight: 90
toc: true
aliases:
    - "/intro/intro-to-filecoin/network/"
---

## Mainnet

[Mainnet]({{< relref "networks/mainnet/details" >}}) is the live production network that all nodes on the Filecoin network are connected to. It never resets.

## Testnets

Test networks, or testnets, are version of the Filecoin network that attempt to simulate various aspects of the Filecoin mainnet. Since they are for testing they should not be used for production applications or services.

### Calibration

[Calibration]({{< relref "/networks/calibration/details" >}}) testnet is the most realistic simulation of the mainnet, where prospective storage providers can experience more realistic sealing performance and hardware requirements due to the use of final proofs constructions and parameters, and prospective storage clients can store and retrieve real data on the network. Clients can participate in deal-making workflows and storage/retrieval functionality. It also has the same sector size as the mainnet.

- [Public endpoint](https://api.calibration.node.glif.io/rpc/v0)
- [Blockchain explorer](https://calibration.filscan.io/)
- [Faucet](https://faucet.calibration.fildev.network/)

### Hyperspace

[Hyperspace](https://github.com/filecoin-project/testnet-hyperspace) testnet is the main pre-production developer testnet which is more stable and reliable. The Hyperspace testnet is a pre-production developer-focused testnet. It resets only in the event of irrecoverable damage. Developers are welcome to build and test their toolings, applications, and smart contracts on this network.

- [Public endpoint](https://api.hyperspace.node.glif.io/rpc/v0)
- [Blockchain explorer](https://explorer.glif.io/?network%3Dhyperspace)
- [Faucet](https://hyperspace.filtest.network/%23faucet)
