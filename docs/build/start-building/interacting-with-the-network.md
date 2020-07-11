---
title: Interacting with the network
description: Learn how to interface with the Filecoin network.
---

# Interacting with the network

This page outlines various options for connecting to local and remote test networks while building and operating your service or application.

Each Filecoin-based service or application will need to use at least one Filecoin node that maintains consensus. All interactions with the network must flow through an up-to-date node: sending and receiving market deals, sending and receiving data, and more.

You can run this node yourself or choose a hosted option. Running your own node offers more decentralized control, but it requires non-trivial time and resources. Choosing a hosted node makes it easier to get started quickly, but you’ll need to trust the hosting provider.

## Local networks

Here are some ways to spin up a mock version of the Filecoin network on your own machine(s), for quick testing and development:

- [Simple local devnet for lotus](https://lotu.sh/en+setup-local-dev-net)
- [Containerized devnet using mocked sectorbuilder](https://github.com/textileio/lotus-devnet) (aka mocked mining)
- [Additional containers & virtualization scripts](https://github.com/filecoin-project/docs/wiki#containers--virtualization)

## Running your own remote network

Here are some scripts to set up your own remote networks for development:

- [Lotus Docker Image](https://github.com/openworklabs/filecoin-docker) for a simple Lotus node Docker container
- [Filecoin Chart](https://github.com/openworklabs/filecoin-chart) for more complex Lotus node architectures managed with Kubernetes

## Devnet

In order to make testing easier, a live devnet (developer network) is now available for use. We call this network the Nerpa Devnet (the nerpa is a species of seal, and one of the smallest true seals). The Nerpa Devnet features 512MB sectors (in addition to 32GB and 64GB sectors) and reduced proofs parameters, so sealing is much faster than in the full Testnet version.

To connect to the [Nerpa Devnet](http://www.nerpa.fildev.network/):

1. Delete any existing local Lotus repository, if one is present.
2. Build and run Lotus from branch `ntwk-nerpa`, [`tag ntwk-nerpa-7.7.0`](https://github.com/filecoin-project/lotus/tree/ntwk-nerpa-7.7.0). When you run `lotus daemon` on the build from this branch, you should automatically be connected to the proper bootstrappers.
3. There should be a few miners on the network that are configured to accept storage deals. If you are having trouble finding a miner to accept your storage deal, please ping for support in the #fil-storage-dev channel on the [Filecoin slack](https://filecoin.io/slack).

> **NOTICE:** At the moment, there are no guarantees on uptime for any of the auto-accepting miners. If one has gone offline or become unresponsive, please let us know in the same channel on Filecoin Slack.

To tap the faucet or see dashboard for the devnet:

- Nerpa Devnet Faucet (to obtain mock FIL): https://faucet.nerpa.fildev.network/
- Other Nerpa Devnet Information: https://nerpa.fildev.network/

## Testnet

[Filecoin Testnet](https://filecoin.io/testnet/) is a live community test network, under active development.

### Hosted nodes for testnet

The Filecoin project has a limited number of dedicated, up-to-date nodes (synced with the latest Testnet chain) available to developers actively building storage services or applications. They are intended to jump-start development instead of waiting for your own node to sync, and not for production usage. To request a dedicated hosted node, please email [filecoin-collabs@protocol.ai](mailto:filecoin-collabs@protocol.ai?subject=Requesting20%a20%hosted20%node).

## Mainnet

Filecoin Mainnet launch is currently planned for Q3 2020. See the [Filecoin blog](https://filecoin.io/blog/roadmap-update-june-2020) for more information.
