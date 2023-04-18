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

Check out this introduction presentation from [Consensus Lab](https://research.protocol.ai/groups/consensuslab/):

{{< youtube "aRyj9kOvW7I" >}}

## Components

The IPC project is split into several individual components:

### Subnets

Our solution is different from traditional sharding designs, which explicitly divide the network's state. We use the concept of subnets that can be created on demand to manage new states. These subnets are organized in a hierarchy, where parent subnets are separated from child subnets, have their own rules, and use a different consensus algorithm. This increases the network's capacity and allows for new applications. Subnets also periodically save their state and can interact with other subnets. IPC subnets can resemble different L2 platforms, such as an optimistic or ZK-rollup or a side-chain with a native communication bridge.

- [Interplanetary Consensus White Paper](https://research.protocol.ai/publications/hierarchical-consensus-a-horizontal-scaling-framework-for-blockchains/delarocha2022.pdf)
- [Interplanetary Consensus Spec](https://github.com/protocol/ConsensusLab/blob/main/specs/hierarchical_consensus.md)

### Mir and Trantor

Mir is a framework used for implementing, debugging, and analyzing distributed protocols. We use Mir to create Trantor, which is a state machine replication system that arranges client requests in a specific order and has safety and liveness features. Trantor is scalable without needing a primary node to make periodic protocol decisions. It uses multiple instances of a leader-driven consensus protocol that all work simultaneously and independently.

- [Mir on GitHub](https://github.com/filecoin-project/mir)
- [Trantor on GitHub](https://github.com/filecoin-project/mir/tree/main/pkg/systems/trantor)

## Use cases

The introduction of IPC enables the following use cases on the Filecoin network:

- **Computation**: Spawn ephemeral subnets to run distributed computation jobs.
- **Coordination**: Assemble into smaller subnets for decentralized orchestration. Coordinate resources with high throughput and low fees.
- **Localization**: Leverage proximity to improve performance. Operate at very low latency in geographically constrained settings.
- **Partition tolerance**: Deploy blockchain substrates in mobile settings or environments with limited connectivity.

## Public testnet

Spacenet is an early builder testnet for Interplanetary Consensus, Mir, and Trantor focused on high throughput and low latency with smart contract capabilities.

The Spacenet testnet is different from other Filecoin testnets because of its increased network throughput and reduced block time of around 1 second. As more applications are added to the Filecoin network using FVM, some use cases may not be possible with Filecoin alone. Spacenet is a testbed for developers to try out these new FVM use cases and create new Web3 applications. In early 2023, IPC will be released in Spacenet, which allows developers to deploy their own subnets while being able to interact with states and applications in the original network.
