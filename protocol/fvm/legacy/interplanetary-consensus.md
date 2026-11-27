---
description: >-
  What Interplanetary Consensus (IPC) is: a framework for scaling with subnets
  that have their own consensus, and how it relates to Filecoin.
---

# Interplanetary consensus

**Interplanetary Consensus (IPC) is a framework that scales a blockchain out by spawning subnets, each with its own consensus algorithm, while still drawing security from a parent network. It uses the FVM to run transactions.**

**Info:** IPC is developed as a separate project, so its status and documentation can change independently of this site. Check the [IPC documentation](https://docs.ipc.space/) for the current state before you build on it.

## Horizontal scaling

Scaling horizontally means adding nodes to a system so that it can do more work. In a blockchain, it means processing more transactions and reaching consensus for more users, with the latency and throughput an app needs. Apps usually want performance, decentralization and security together, and these goals conflict. IPC is one answer to that. Others include sidechains and rollups.

## How IPC works

IPC scales through subnets, which anyone can create without permission. Subnets form a hierarchy. A parent subnet can spawn any number of children. Each subnet:

* Runs its own consensus algorithm, chosen to fit the application's needs for cost and performance.
* Inherits security from its parent.
* Can talk to other subnets in the hierarchy directly, so it doesn't need a bridge.

An app can run in its own subnet, or shard itself across several. See [Subnets](https://docs.ipc.space/concepts/subnets) in the IPC documentation.

## How IPC differs

* **Own consensus and inherited security.** Most scaling solutions do one or the other. Rollups inherit the base layer's security but don't have their own consensus, and sidechains do the reverse. IPC subnets have their own consensus and inherit security from the parent, and they have native cross-network communication, so no custom bridges are needed.
* **The FVM as the execution layer.** The FVM is a WebAssembly runtime for IPLD data (IPLD is the data model Filecoin uses for onchain data). IPC can use Filecoin or Ethereum as its root network.
* **Close to Filecoin storage.** IPC grew out of Filecoin, so it can use Filecoin's storage primitives, such as IPLD data, for data availability.

## Uses

IPC suits work that needs low latency or high throughput near where it is used. Examples are short-lived subnets for distributed computation, small subnets for coordination, subnets close to their users to cut latency, and subnets that keep working in places with limited connectivity.

## Learn more

* [IPC website](https://www.ipc.space/)
* [IPC documentation](https://docs.ipc.space/)
* [IPC repository](https://github.com/consensus-shipyard/ipc)
* [Consensus](../../concepts/consensus.md): how storage providers are elected to propose blocks.
* [FVM advanced](README.md): tools and services for FVM developers.
* [Filecoin Virtual Machine](../README.md): what the FVM is and where to start.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/legacy/interplanetary-consensus)
