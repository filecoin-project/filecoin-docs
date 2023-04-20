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

## The problem with consensus

Many blockchain networks, including Filecoin, require all validators to process _all_ transactions. This causes a major bottleneck for the network and makes it difficult to increase network performance by scaling out. On top of that, different applications have different performance and security requirements, making it difficult for a single consensus layer to accommodate any type of web3 application.

Interplanetary Consensus (IPC) is a framework to enable on-demand, horizontal scalability of Filecoin by deploying subnets that spawn their own state, validate messages in parallel, and seamlessly interact with any network in the hierarchy, as well as with the Filecoin root network. Subnets can run different consensus algorithms depending on application requirements.

Check out this short introduction from [ConsensusLab](https://consensuslab.world/):

{{< youtube "aRyj9kOvW7I" >}}

## Components

The IPC project is split into two main components, which we briefly describe here.

### The IPC scalability framework

Our solution is different from traditional sharding designs, which explicitly divide the network's state. We use the concept of subnets that can be created on demand to manage new states. These subnets are organized in a hierarchy, each subnet have its own consensus instance, cryptoeconomic rules, and even agreement algorithm.  This increases the network's capacity and allows for new applications with different requirements.

Additionally, subnets periodically save their state by checkpointing it with their parent network, and are also able to interact with other subnets by means of cross-net transactions. IPC subnets can resemble different L2 platforms, such as an optimistic or ZK-rollup, or a side-chain with a native communication bridge.

- [IPC Design Reference](https://github.com/consensus-shipyard/IPC-design-reference-spec/raw/main/main.pdf)
- [IPC Agent on GitHUb](https://github.com/consensus-shipyard/ipc-agent)

### The Mir/Trantor consensus mechanism

Alongside the scaling framework, the IPC project is developing high-performance consensus protocols that are suitable for subnet use. 

Mir is a framework used for implementing, debugging, and analyzing distributed protocols. We use Mir to implement Trantor, a modular total-order broadcast protocol with robust properties. Trantor is scalable without needing a primary node to make periodic protocol decisions. It uses multiple instances of a leader-driven consensus protocol that all work simultaneously and independently.

- [Mir on GitHub](https://github.com/filecoin-project/mir)
- [Trantor on GitHub](https://github.com/filecoin-project/mir/tree/main/pkg/systems/trantor)

## Use cases

The introduction of IPC enables the following use cases on the Filecoin network:

- **Computation**: Spawn ephemeral subnets to run distributed computation jobs.
- **Coordination**: Assemble into smaller subnets for decentralized orchestration with high throughput and low fees.
- **Localization**: Leverage proximity to improve performance and operate with very low latency in geographically constrained settings.
- **Partition tolerance**: Deploy blockchain substrates in mobile settings or other environments with limited connectivity.

## Public testnet

[Spacenet]({{< relref "networks/spacenet/details">}}) is an early builder testnet for Interplanetary Consensus, Mir, and Trantor focused on high throughput and low latency with smart contract capabilities.


