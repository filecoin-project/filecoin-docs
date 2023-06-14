---
title: "Mir and Trantor"
description: "Alongside the scaling framework, the IPC project is developing high-performance consensus protocols that are suitable for subnet use."
lead: "Alongside the scaling framework, the IPC project is developing high-performance consensus protocols that are suitable for subnet use."
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-interplanetary-consensus"
    identifier: "ipc-mir-and-trantor"
weight: 120
toc: true
---

Beyond their function as a scaling tool, IPC subnets will be deployed to meet the requirements of applications that cannot be run on the Filecoin rootnet. The combination of Mir and Trantor provides a high-performance consensus mechanism with faster finality and higher throughput. Moreover, Trantor can be further configured for each subnet.

## Mir framework

[Mir](https://github.com/filecoin-project/mir) is a framework for implementing, debugging, and analyzing distributed protocols. It is organized as a library that provides abstractions representing different components of a distributed system and an engine to orchestrate their interaction.

The goal of Mir is to enable the implementation of distributed protocols in a way that is agnostic to network transport, storage, and cryptographic primitives. These components of a distributed protocol implementation are encapsulated in abstractions with well-defined interfaces. While Mir provides some out-of-the-box implementations, users are free to define their own.

Mir is used as a scalable and efficient consensus layer in Filecoin subnets. Learn more at [GitHub](https://github.com/filecoin-project/mir).

## Trantor consensus protocol

[Trantor](https://github.com/filecoin-project/mir/tree/main/pkg/trantor) is a modern, multi-leader, Byzantine fault-tolerant (BFT) protocol. It was inspired by recently proposed, high-throughput, BFT consensus protocols, namely ISS and Narwahl. Trantor iterates through instances of PBFT with immediate finality, each block containing an ordered list of decided transactions and a certificate for verification, with every nth block containing a checkpoint of the state.

Learn more on [GitHub](https://github.com/filecoin-project/mir/tree/main/pkg/trantor).

To stay updated on Mir and Trantor development, join the `#mir-dev` channel in the  [Filecoin Slack workspace](https://filecoin.io/slack/).
