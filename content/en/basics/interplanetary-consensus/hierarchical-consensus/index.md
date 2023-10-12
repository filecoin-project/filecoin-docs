---
title: "Hierarchical consensus"
description: "Traditional sharding designs explicitly divide the network's state. In Interplanetary consensus, subnets can be created on demand to manage new states. This page describes hierarchical consensus in detail."
lead: "IPC subnets are organized as a tree and periodically checkpoint their state onto their parent to leverage its security."
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-interplanetary-consensus"
    identifier: "ipc-hierarchical-consensus"
weight: 110
toc: true
---

## Overview

In IPC, subnets are organized in a hierarchy, with each subnet having its consensus instance, cryptoeconomic rules, and agreement algorithm. This design increases the network's capacity and accommodates new applications with varying consensus requirements.

Subnets periodically save their state by checkpointing it with their parent network. They are also able to interact with other subnets via cross-net transactions. IPC subnets can resemble other L2 platforms, such as [optimistic rollups](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/), [ZK rollups](https://ethereum.org/en/developers/docs/scaling/zk-rollups/), or a sidechain with a native communication bridge.

A complete overview of the architecture can be found in the [IPC Design Reference](https://github.com/consensus-shipyard/IPC-design-reference-spec/raw/main/main.pdf).

## IPC Agent

The IPC Agent is the entry point to interacting with IPC. It is a client application that provides a simple and easy-to-use interface to interact with IPC as a user and run all the processes required to operate a subnet. The agent acts as an orchestrator, connecting to one blockchain node in each relevant subnet. It also handles the entire IPC workflow, including subnet creation, cross-net message passing, and checkpointing.

More information on the IPC Agent, as well as comprehensive documentation, can be found on [GitHub](https://github.com/consensus-shipyard/ipc-agent).

## IPC Actors

IPC relies on two actors, the _IPC Subnet Actor (ISA)_ and the _IPC Gateway Actor (IGA)_, which are instantiated in each subnet and provide convenience and governance functions.

The IGA is an actor that contains all IPC-related information and logic associated with a subnet that needs to be replicated within the subnet. The ISA is the IGA’s parent-side counterpart; that is, it is deployed to a subnet’s parent and contains all data and logic associated with the particular child subnet.

The [actors](https://github.com/consensus-shipyard/ipc-actors) are currently implemented in Rust and provided as built-in WASM actors in [Spacenet]({{< relref "networks/spacenet/details">}}). We are currently working on a Solidity implementation.

## Eudico

Eudico is a modularized implementation of [Lotus]({{< relref "nodes/implementations/lotus">}}), itself an implementation of the Filecoin Distributed Storage Network. It is designed with the flexibility to support different use cases and, particularly relevant to IPC, the ability to load different consensus protocols.

In our architecture, Eudico is used as the blockchain node. A separate instance of Eudico is run for each subnet in which a given node participates.

The Eudico node is available on [GitHub](https://github.com/consensus-shipyard/lotus).
