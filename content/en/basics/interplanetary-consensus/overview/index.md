---
title: "Overview"
description: "Interplanetary Consensus - Overview"
lead: "Interplanetary Consensus is the next frontier in blockchain scalability, unlocking unmatched capacity and enabling new use cases."
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

## Interplanetary Consensus

Consensus poses a major scalability bottleneck in blockchain networks. This is particularly the case when all validators are required to process all transactions, as is the case for Filecoin, which renders the network unable to increase its performance by adding more participants (scale-out).

Moreover, not every application benefits from using the same consensus algorithm: different applications may have different performance and security requirements, making it difficult for a single blockchain network with a single consensus layer to accommodate any type of web3 application.

Interplanetary Consensus (IPC) is a framework to enable on-demand horizontal scalability of Filecoin by deploying subnets (self-governing chains) that spawn their own state, validate messages in parallel, and seamlessly interact with any network in the hierarchy, as well as with the Filecoin root network. Subnets can run different consensus algorithms, depending on application requirements.

IPC is complementary to the programmability introduced by the [Filecoin Virtual Machine](https://www.markdownguide.org/basic-syntax/#links): it provides a framework to further program the Filecoin network, accommodating a variety of use cases while overcoming potential consensus bottlenecks, to load balance decentralised applications by spawning new blockchain substrates on-demand, and to tailor the system to better fit application needs.

[![Interplanetary Consensus Video](https://img.youtube.com/vi/aRyj9kOvW7I/0.jpg)](https://www.youtube.com/watch?v=aRyj9kOvW7I)

## Components

### IPC - Interplanetary Consensus

Unlike traditional sharding designs, based on the explicit partitioning of the network’s state, our solution centers on the concept of subnets that can be spawned on-demand to manage new state. Subnets are organized in a hierarchy, in which parent subnets are firewalled from child subnets, have their own policies, and run a different consensus algorithm, increasing the network’s capacity and enabling new applications. Subnets leverage the security of parent subnets by periodically checkpointing state and include mechanisms to interact with other subnets in the system. IPC subnets can be configured to resemble different L2 platforms: from an optimistic or ZK-rollup, to a side-chain with a native communication bridge.

[Interplanetary Consensus White Paper](https://research.protocol.ai/publications/hierarchical-consensus-a-horizontal-scaling-framework-for-blockchains/delarocha2022.pdf)<br>
[Interplanetary Consensus Spec](https://github.com/protocol/ConsensusLab/blob/main/specs/hierarchical_consensus.md)

### Mir and Trantor

Mir is a framework for implementing, debugging, and analyzing distributed protocols. We use Mir to implement Trantor, a state machine replication system that establishes a total order of client requests with typical liveness and safety properties. Trantor achieves scalability without requiring a primary node to periodically decide on the protocol configuration. It multiplexes multiple instances of a leader-driven consensus protocol which operate concurrently and almost independently.

[Mir on GitHub](https://github.com/filecoin-project/mir)<br>
[Trantor on GitHub](https://github.com/filecoin-project/mir/tree/main/pkg/systems/trantor)

## Applications

- **Computation** - Spawn ephemeral subnets to run distributed computation jobs.
- **Coordination** - Assemble into smaller subnets for decentralized orchestration. Coordinate resources with high throughput and low fees.
- **Localization** - Leverage proximity to improve performance. Operate at very low latency in geographically constrained settings.
- **Partition tolerance** - Deploy blockchain substrates in mobile settings or environments with limited connectivity.

## Spacenet

An early builder testnet for Interplanetary Consensus, Mir, and Trantor. High throughput and low latency with smart contract capabilities, powered by FVM.

Spacenet is not just another Filecoin testnet. By adopting a high-performance consensus implementation of Trantor over Mir, we have increased the network's throughput while reducing the block time to around 1 second. As FVM onboards a gamut of new applications to the Filecoin network, many use cases will have requirements beyond what Filecoin can accommodate. Spacenet provides developers with a testbed to deploy those FVM use cases and innovate with new Web3 applications. Once IPC is released in Spacenet, in early 2023, developers will be able to deploy their own subnets from Spacenet while maintaining the ability to seamlessly interact with state and applications in the original network.
