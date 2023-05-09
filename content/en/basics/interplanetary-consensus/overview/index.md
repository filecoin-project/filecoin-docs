---
title: "Overview"
description: "Interplanetary Consensus (IPC) is a framework that aims to enable on-demand horizontal scalability of Filecoin by deploying subnets that can run different consensus algorithms depending on application requirements. This page gives an overview of the IPC project."
lead: "Interplanetary Consensus (IPC) is a framework that aims to enable on-demand horizontal scalability of Filecoin by deploying subnets that can run different consensus algorithms depending on application requirements. This page gives an overview of the IPC project."
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-interplanetary-consensus"
    identifier: "overview-12144d796dedc50c9c1807c130bd3530"
weight: 100
toc: true
---

Many blockchain networks, including Filecoin, require that all validators process all transactions. This creates a bottleneck and makes it challenging to increase network performance by scaling out. On top of that, different applications have different performance and security requirements, making it difficult for a single consensus layer to accommodate the needs of all Web3 applications.

Interplanetary Consensus (IPC) is a framework that enables on-demand, horizontal scalability of Filecoin by deploying subnets that:

- Spawn their own state.
- Validate messages in parallel.
- Interact with any other subnet in the hierarchy, as well as with the Filecoin root network.

Subnets can run different consensus algorithms depending on application requirements, and are particularly well suited to scenarios requiring fast finality.

Check out this short introduction from [ConsensusLab](https://consensuslab.world/):

{{< youtube "aRyj9kOvW7I" >}}

## Use cases

The introduction of IPC enables the following use cases on the Filecoin network:

- **Computation**: Spawn ephemeral subnets to run distributed computation jobs.
- **Coordination**: Assemble into smaller subnets for decentralized orchestration with high throughput and low fees.
- **Localization**: Leverage proximity to improve performance and operate with very low latency in geographically constrained settings.
- **Partition tolerance**: Deploy blockchain substrates in mobile settings or other environments with limited connectivity.

## Components

The IPC project is split into two main components, which we briefly describe here:

- [The hierarchical consensus framework]({{< relref "basics/interplanetary-consensus/hierarchical-consensus">}}), consisting of the base protocol, the actors, the ipc-agent, and the Eudico node.
- [The Trantor consensus algorithm]({{< relref "basics/interplanetary-consensus/mir-and-trantor">}}), implemented atop the Mir framework.

## Public testnet

[Spacenet]({{< relref "networks/spacenet/details">}}) is an early builder testnet for Interplanetary Consensus, Mir, and Trantor. It provides high throughput and low latency with FEVM support.

## Support

The [IPC Agent repository](https://github.com/consensus-shipyard/ipc-agent) features extensive documentation on how to get started with IPC. We recommend that you start your journey there.

If you have questions, ideas, or wish to get involved, join the [Filecoin Slack workspace](https://filecoin.io/slack/) and meet us in the following channels:

- `#ipc-help`, for any questions and as a general entry point to the world of IPC.
- `#ipc-announcements`, for relevant announcements related to the software and network.
- `#ipc-dev`, for development discussions.
- `#ipc-docs`, for documentation discussions.
<!--REVIEWED!-->