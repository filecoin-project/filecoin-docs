---
title: "Hierarchical consensus"
description: "Our solution is different from traditional sharding designs, which explicitly divide the network's state. We use the concept of subnets that can be created on demand to manage new states.."
lead: "Our solution is different from traditional sharding designs, which explicitly divide the network's state. We use the concept of subnets that can be created on demand to manage new states."
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

These subnets are organized in a hierarchy, each subnet have its own consensus instance, cryptoeconomic rules, and even agreement algorithm.  This increases the network's capacity and allows for new applications with different requirements.

Additionally, subnets periodically save their state by checkpointing it with their parent network, and are also able to interact with other subnets by means of cross-net transactions. IPC subnets can resemble different L2 platforms, such as an optimistic or ZK-rollup, or a side-chain with a native communication bridge.

A full overview of the architecture can be found in the [IPC Design Reference](https://github.com/consensus-shipyard/IPC-design-reference-spec/raw/main/main.pdf).


## IPC Agent

The IPC Agent is the entry point to interacting with IPC. It is a client application that provides a simple and easy-to-use interface to interact with IPC as a user and run all the processes required for the operation of a subnet. The agent acts as an orchestrator, connecting to a number of blockchain nodes, one in each relevant subnet, and handles the entire IPC workflow, from subnet creation, cross-net message passing, and checkpointing.

More information on the IPC Agent, as well as comprehensive documentation, can be found on [GitHub](https://github.com/consensus-shipyard/ipc-agent).

## IPC Actors

IPC relies on two actors, the IPC Subnet Actor (ISA) and the IPC Gateway Actor (IGA), which are instantiated in each subnet and provide a number of convenience and governance functions. 

The IGA is an actor that contains all IPC-related information and logic associated with a subnet that needs to be replicated in the subnet itself. The ISA is the IGA’s parent-side counterpart, i.e., it is deployed in a subnet’s parent and containing all the data and logic associated with the particular child subnet.

The [actors](https://github.com/consensus-shipyard/ipc-actors) are currently implemented in Rust and provided as built-in wasm actors in [Spacenet]({{< relref "networks/spacenet/details">}}). We are currently working on an Solidity implementation.

## Eudico

Eudico is a modularized implementation of [Lotus]({{< relref "nodes/implementations/lotus">}}) itself an implementation of the Filecoin Distributed Storage Network. It is designed with the flexibility to support distinct use cases, and, particularly relevant to IPC, the ability to load different consensus protocols. 

In our architecture, Eudico is used as the blockchain node. One instance of Eudico is deployed for each subnet, as well as one for interaction with the Filecoin root. 

The Eudico node is available on [GitHub](https://github.com/filecoin-project/lotus).