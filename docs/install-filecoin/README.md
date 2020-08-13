---
title: Install Filecoin
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
