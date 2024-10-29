---
description: >-
  InterPlanetary Consensus (IPC) powers planetary-scale decentralized
  applications (dApps) through horizontal scalability of Filecoin, Ethereum and
  more.
---

# Interplanetary consensus

## What is IPC?

[Interplanetary Consensus (IPC)](https://www.ipc.space/) is a framework that enables on-demand horizontal scalability of networks, by deploying "subnets" running different consensus algorithms depending on the application's requirements.

### What is horizontal scalability and why is it important for dApps?

[Horizontal scalability](https://en.wikipedia.org/wiki/Scalability#Horizontal\_or\_scale\_out) generally refers to the addition of nodes to a system, to increase its performance. For example, adding more nodes to a compute network helps distribute the effort needed to run a single compute task. This reduces cost per task and decreases latency, while improving overall throughput.

In web3, horizontal scalability refers to _scaling_ blockchains, for _desired_ performance. More specifically, _scaling_ the ability of a blockchain to process transactions and achieve consensus, across an increasing number of users, at _desired_ latencies and throughput. IPC is one such scaling solution, alongside other popular layer 2 solutions, like [sidechains](https://ethereum.org/en/developers/docs/scaling/sidechains/) and [rollups](https://ethereum.org/en/developers/docs/scaling/#rollups).

For decentralized applications (dApps), there are several key motivations to adopt scaling - performance, decentralization, security. The challenge is that these factors are known to be conflicting goals.

### How does IPC achieve horizontal scalability?

IPC is a scaling solution intentionally designed to achieve considerable performance, decentralization and security for dApps.

It achieves scaling through the permissionless spawning of new blockchain sub-systems, which are composed of [subnets](https://docs.ipc.space/concepts/subnets).

Subnets are organized in a hierarchy, with one parent subnet being able to spawn infinite child subnets. Within a hierarchical subsystem, subnets can seamlessly communicate with each other, reducing the need for cross-chain bridges.

Subnets also have their own specific consensus algorithms, whilst leveraging security features from parent subnets. This allows dApps to use subnets for hosting sets of applications or to [shard](https://en.wikipedia.org/wiki/Shard\_\(database\_architecture\)) a single application, according to its various cost or performance needs.

### How is IPC unique as a scaling solution?

Earlier, we talked about the challenge of scaling solutions to balance performance, security and decentralization. IPC is a standout framework that strikes a considerable balance between these factors, to achieve breakthroughs in scaling.

* **Highly customizable without compromising security.** Most L2 scaling solutions today either inherit the L1's security features but don't have their own consensus algorithms (e.g. rollups), or do the reverse (e.g. sidechains). They are also deployed in isolation and require custom bridges or protocols to transfer assets and state between L2s that share a common L1, which are vulnerable to attacks. In contrast, IPC subnets have their own consensus algorithms, inherit security features from the parent subnet and have native cross-net communication, eliminating the need for bridges.
* **Multi-chain interoperability.** IPC uses the [Filecoin Virtual Machine (FVM)](https://docs.filecoin.io/smart-contracts/fundamentals/the-fvm) as its transaction execution layer. The FVM is a WASM-based polyglot execution environment for IPLD data and is designed to support smart contracts written in any programming language, compiled to WASM. It currently supports Filecoin and Ethereum. Today, IPC is fully compatible with Filecoin and Ethereum and can use either as a rootnet. IPC will eventually allow any chain to be taken as rootnet.
* **Tight storage integration with Filecoin.** IPC was designed from the data-centric L1, [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin), which is the largest decentralized storage network. IPC can leverage its storage primitives, like IPLD data integration, to deliver enhanced solutions for data availability and more.

## Applications of IPC

Here are some practical examples of how IPC improves the performance of dApps:

* **Distributed Computation**: Spawn ephemeral subnets to run distributed computation jobs.
* **Coordination**: Assemble into smaller subnets for decentralized orchestration with high throughput and low fees.
* **Localization**: Leverage proximity to improve performance and operate with very low latency in geographically constrained settings.
* **Partition tolerance**: Deploy blockchain substrates in mobile settings or other environments with limited connectivity.

With better performance, lower fees and faster transactions, IPC can rapidly improve horizontal and vertical markets with decentralized technology:

* **Artificial Intelligence:** IPC is fully compatible with [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin), the world’s largest decentralized data storage. Leveraging Filecoin, IPC can enable distributed computation to power hundreds of innovative AI models.
* **Decentralized Finance (DeFi):** Enabling truly high-frequency trading and traditional backends with verifiability and privacy.
* **Big Data and Data Science:** Multiple teams are creating global-scale distributed compute networks to enable Data Science analysis on Exabytes of decentralized stored data.
* **Metaverse/Gaming:** Enabling real-time tracking of player interactions in virtual worlds.
* **DAOs:** Assemble into smaller subnets for decentralized orchestration with high throughput and low fees. Partition tolerance: Deploy blockchain substrates in mobile settings or other environments with limited connectivity.

### Get involved

* Visit the [website](https://www.ipc.space/)
* Read the [docs](https://docs.ipc.space/)
* Check out the [repository](https://github.com/consensus-shipyard/ipc)
* Connect with the community on [Discord](https://discord.gg/QtNbXf75)



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/basics/interplanetary-consensus)
