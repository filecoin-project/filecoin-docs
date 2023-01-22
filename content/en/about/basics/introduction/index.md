---
title: "Introduction"
description: "Everything developers need to know about Filecoin in 15 minutes."
lead: "Want to quickly get up to speed? This page contains everything you need to know so that you can start experimenting and building on the Filecoin network!"
draft: false
images: []
type: docs
menu:
  about:
    identifier: "introduction-304db021e9413b888a29e53eac4bfc44"
weight: 2
toc: true
aliases:
    - "/introduction"
    - "/introduction-to-filecoin"
    - "/intro-to-filecoin"
---

This post aims to provide a comprehensive overview of Filecoin to developers and serves as a reference that developers can check back on. We assume readers to have a basic understanding of [blockchain](https://en.wikipedia.org/wiki/Blockchain) and [Ethereum](https://ethereum.org/en/developers/docs/) and will focus specifically on the special designs of Filecoin that makes it a unique decentralized storage network in Web3. This process should take about 20 minutes to go through and would provide you with a solid foundation to start developing on Filecoin confidently!

## What is Filecoin

[Filecoin](https://docs.filecoin.io/) is a peer-to-peer network that stores files, with built-in economic incentives and cryptography to ensure files are stored reliably over time. In Filecoin, users pay to store their files on storage providers. Storage providers are computers responsible for storing files and proving they have stored them correctly over time. Anyone who wants to store their files or get paid for storing other users’ files can join Filecoin. Available storage, and the price of that storage, are not controlled by any single company. Instead, Filecoin facilitates open markets for storing and retrieving files that anyone can participate in.

Filecoin is built on top of the same software powering [IPFS protocol](https://docs.ipfs.tech/), which is a peer-to-peer distributed storage network that leverages [content addressing](https://docs.ipfs.tech/concepts/content-addressing/) to allow permanent references to the data, and avoids relying on specific devices or cloud servers for addressing the content. Filecoin is different from IPFS because it has an incentive layer on top to incentivize contents to be reliably stored and accessed.

Filecoin enables several use cases, from Web3 native NFT and metaverse/game assets storage, incentivized permanent storage, to archiving Web2 datasets as a cheaper alternative to cloud storage. For example, [NFT.Storage](https://nft.storage/) utilizes Filecoin to provide a simple decentralized storage solution for NFT contents and metadata, while [Shoah Foundation](https://sfi.usc.edu/) and [Internet Archive](https://archive.org/) leverages Filecoin to backup their contents. Filecoin also supports a wide range of formats of data, including audio and video files, allowing Web3 platforms such as [Audius](https://audius.co/) and [Huddle01](https://huddle01.com/) to leverage Filecoin as the decentralized storage backend for music streaming and video conferencing.

## Cryptoeconomics

The native currency of Filecoin, FIL, is a utility token used to incentivize persistent storage on the Filecoin network. Storage providers mine FIL by providing reliable storage service or committing storage capacity on the network. It has a maximum circulating supply of 2,000,000,000 FIL, meaning that no more than 2 billion Filecoin will ever be created.

As a utility token that aligns participants’ incentives with the long-term growth of the network, Filecoin issuance is aligned with the overall provable utility of the network. The majority of Filecoin supply would only be minted if the network achieved growth and utility targets at scale.

Specifically, Filecoin uses a [dual minting model](https://spec.filecoin.io/#section-systems.filecoin_token.minting_model) for block reward minting:

### Baseline Minting

Up to 770M FIL tokens are minted based on the performance of the network. These tokens would only fully release if the Filecoin network reached a Yottabyte of storage capacity in under 20 years, estimated to be ~1000x larger than today’s cloud storage capacity.

### Simple Minting

330M FIL tokens are released on a 6 year half-life based on time, meaning that 97% of these tokens will be released in approximately 30 years time.

Additionally, 300M FIL tokens are held back in the mining reserve to incentivize future types of mining.

### Vesting

Mining rewards undergo a vesting schedule to encourage long-term network alignment. For example, 75% of block rewards earned by miners vest linearly over 180 days, while 25% are made immediately available to improve miner cash flow and profitability. And the remaining FIL tokens are vested to Protocol Labs teams and Filecoin Foundation over 6 years and SAFT investors over 3 years, as shown in the [vesting table](https://spec.filecoin.io/systems/filecoin_token/token_allocation/filtokenallocation.png) here.

### Collateral and slashing

To encourage good behavior from network participants, during block reward mining, storage providers must lock Filecoin tokens as [pledge collateral](https://spec.filecoin.io/#section-systems.filecoin_mining.miner_collaterals.initial-pledge-collateral) for consensus security, storage reliability, and contract guarantees. Pledge collateral is determined by projected block rewards that a miner would earn. Collateral and all earned rewards by storage providers are subject to slashing throughout the lifetime of a sector if the storage does not pass a reliability check.

## The Filecoin blockchain

Let's quickly go over the fundamentals of the Filecoin blockchain.

### Tipsets

The Filecoin blockchain is a chain of tipsets rather than a chain of blocks. A tipset is a set of blocks with the same height and parent tipset. Therefore, multiple storage providers can produce blocks for each epoch to increase network throughput.

Each tipset is assigned a weight, so the consensus protocol directs nodes to build on the heaviest chain. This provides a certain level of security to the Filecoin network by preventing a node from intentionally intervening with other nodes to produce valid blocks.

### Actors

An Actor in the Filecoin Blockchain is the equivalent of the smart contract in the Ethereum Virtual Machine. It is essentially an ‘object’ in the Filecoin network with a state and a set of methods that can be used to interact with it.

#### Built-in actors

There are several [built-in system actors](https://spec.filecoin.io/#section-systems.filecoin_vm.sysactors) that power the Filecoin network as the decentralized storage network.

- System Actor - general system actor.
- Init actor - initializes new actors and records the network name.
- Cron Actor - a scheduler actor that runs critical functions at every epoch.
- Account Actor - responsible for user accounts (non-singleton).
- Reward Actor - managing block reward and token vesting (singleton).
- Storage Miner Actor - storage mining operation and validate storage proofs.
- Storage Power Actor - keeping track of the storage power allocated at each storage provider
- Storage Market Actor - managing storage deals.
- Multisig Actor \- responsible for operations involving the Filecoin multi-signature wallet.
- Payment Channel Actor - set up and settle payment channel funds.
- Datacap Actor - responsible for datacap token management.
- Verified Registry Actor - responsible for managing verified clients.
- Ethereum address Manager (EAM) Actor\- responsible for assigning all Ethereum compatible addresses on Filecoin Network, including EVM smart contract addresses and Ethereum account addresses.
- EVM Account Actor - a non-singleton built-in actor representing an external Ethereum identity backed by a secp256k1 key.

#### User-programmable actors

Along with the maturity of FVM, developers can write actors and deploy them to the Filecoin network in the same way as other blockchains. Other blockchains refer to these programs as _smart contracts_. User-programmable actors can also interact with built-in actors using the exported API from built-in actors.

You can check out this [talk here](https://curriculum.pl-launchpad.io/curriculum/filecoin/protocol/#how-filecoin-actors-work--zenground0--protocol-labs) to learn more about how Filecoin Actor works.  

### Distributed randomness

Filecoin uses distributed and publicly verifiable random beacon protocol - [Drand](https://drand.love) as the randomness beacon for the leader election during the [expected consensus](#consensus) to produce blocks. This randomness guarantees that the leader election is secret, fair, and verifiable.

### Nodes

Nodes in the Filecoin network are primarily identified in terms of the services they provide to serve the Filecoin storage network, including chain verifier nodes, client nodes, storage provider nodes, and retrieval provider nodes. Any node participating in the Filecoin network should provide the chain verification service as a minimum.

Filecoin is targeting multiple protocol implementations to guarantee the security and resilience of the Filecoin network. Currently, the actively maintained implementations are:

- Lotus [lotus.filecoin.io/](https://lotus.filecoin.io/)
- Venus [github.com/filecoin-project/venus](https://github.com/filecoin-project/venus)
- Forest [github.com/ChainSafe/forest](https://github.com/ChainSafe/forest)

### Addresses

In the Filecoin network, addresses are used to identify actors in the Filecoin state. The address encodes information about the corresponding actor, providing a robust address format that is easy to use and resistant to errors. There are five types of addresses in Filecoin for either MainNet starts with f or TestNet starts with t.

- `f0/t0`: an ID address for an actor in a more “human friendly” way. For instance, f0123261 is the ID for a storage provider.
- `f1/t1`: a secp256k1 wallet address with encrypted key pair. Essentially, this is a wallet address generated from the secp256k1 public key.
- `f2/t2`: an address represents an actor (smart contract) and is assigned in a way that makes it safe to use during network forks.
- `f3/t3`: a BLS wallet address generated from a BLS public encryption key.
- `f4/t4`: the addresses which were created and assigned to user-defined actors by user-definable “address management” actors. This address can receive funds before an actor has been deployed to the address.
- `f410/t410`: the address space managed by Ethereum Address Manager (EAM) built-in actor. The original Ethereum addresses can be cast as f410/t410 addresses and vice versa to enable existing Ethereum tools to interact seamlessly with the Filecoin network.

### Consensus

Let's quickly cover how consensus works in the Filecoin network.

#### Expected consensus

Expected consensus (EC) is the underlying consensus algorithm used by Filecoin. EC is a probabilistic Byzantine fault-tolerant consensus protocol that runs a leader election among a set of storage providers to submit a block every epoch. Like proof-of-stake, Filecoin uses proof-of-storage for the leader election, meaning the likelihood of being elected depends on how much provable storage power a miner contributes to the network. The storage power of the network is stored in the storage power table and managed by the Storage Power Actor.

At a high level, the consensus process relies on [DRAND](https://drand.love/) to provide distributed and verifiable randomness to keep leader election secret, fair and verifiable. All the election participants and their power are drawn from the Power Table, which is calculated and maintained over time by the Storage Power Consensus subsystem. Eventually, EC takes all valid blocks produced in this epoch and uses a weighting function to select the chain with the highest weight to add blocks.

#### Block production process

The process of producing a block for each epoch can be briefly described as follows:

- Elect leaders from eligible miners.
- Miners need to check if they are elected.
- An elected miner gets the randomness value to generate WinningPoSt.
- If all above is successful, miners build and propagate a block.
- Verify whether a miner won the block and verify the leader election.
- Eventually, select the heaviest chain to add blocks.

#### Finality

EC enforces a version of soft finality whereby all miners at round `N` will reject all blocks that fork off before round `N - F`. `F` is set to `900`. This is important to enforce a macroeconomically-enforced finality at no cost to liveness in the chain.

### Proofs

As a decentralized storage network, Filecoin is built on the proof-of-storage in which miners contribute their vacant storage space to the network to store data and then provide proofs for the client to verify if their data has been stored throughout a period.

#### Proof of replication

Using proof-of-replication (PoRep), storage providers prove that they have created a unique copy of the client’s data and stored it on behalf of the network.

#### Proof of spacetime

Storage providers also need to continuously prove that they store clients’ data for the whole lifetime of the storage deal. There are two types of challenges as part of the proof-of-spacetime (PoSt) process:

- Winning PoSt guarantees that the storage provider maintains a copy of data at a specific time.
- Window PoSt is used as proof that a copy of the data has been continuously maintained over time.

#### Slashing

If storage providers fail to provide reliable uptime or act maliciously against the network, they will be penalized by slashing. Filecoin implements two kinds of slashing:

- Storage fault slashing to penalize storage providers for not being able to maintain healthy and reliable storage sectors for the network.
- Consensus fault slashing to penalize storage providers for sabotaging the liveness and security of the consensus process.

## Storage model overview

The storage model provides proven storage power in the network required for the consensus algorithm and also achieves the open storage market for storing and retrieving data on the Filecoin network. There are two major components to Filecoin markets, the storage and retrieval markets, which will be introduced in the following sections.

### Providers

Based on the nature of the storage markets, there are two types of providers to provide service and earn FIL as rewards:

- Storage providers are responsible for storing files and data for clients on the network and providing cryptographic proofs to verify storage.
- Retrieval providers are responsible for providing quick pipes to retrieve data per clients’ requests. Sometimes, storage providers who store client data also act as retrieval providers.

### Deals

In the Filecoin network, providers provide their storage or retrieval service to data clients through deals that are negotiated and agreed upon between two parties, including terms like data size, price and deal duration, and collateral.

### Sectors

Sectors are the basic units of provable storage where storage providers store clients’ data and generate PoSt on behalf of the Filecoin network. Sectors have standard sizes and a lifetime that storage providers can extend before reaching the end of the lifetime. `32 GiB` and `64 GiB` sector sizes are supported.

## Storage market

The storage market is the data entry point into the network where storage providers and clients negotiate and publish storage deals on-chain.

### Deal making

The lifecycle for a deal within the storage market contains distinct phases:

- Discovery: the client identifies storage providers and queries their current ask price.
- Negotiation: both parties agree to the term of the storage deal.
- Publishing: the deal and proof will be published on-chain.
- Handoff: once the deal is published on-chain, it will be added into a sector where data storage will be proven.

### Filecoin plus  

The mission of Filecoin Plus is to maximize the amount of useful storage on the Filecoin network. The aim is to bring more meaningful and valuable data into the Filecoin network by offering verified clients cheap, or even free, storage. This mechanism is designed and operates around datacap, the storage quota allocated to verified clients to store data and boost incentives for storage providers.  

Verified clients can onboard data into Filecoin using datacap, which they apply from community-selected notaries. In return for storing verified storage deals, storage providers receive datacap with a 10x boost to their storage power which eventually increases their block rewards as an incentive.

- Datacap: a Datacap token will be allocated to a verified client to spend in the storage deals carrying a 10x deal quality multiplier.
- Notaries: community-selected notaries govern the program by verifying storage clients and allocating datacap tokens to verified clients.
- Verified clients: clients are active network participants with datacap allocation for their data storage.

### Storage on-ramps

To simplify the process of storing data on the network, there are many storage helpers to provide an easier way to integrate Filecoin storage as well as IPFS into your applications or smart contracts.

Storage helpers provide libraries that abstract Filecoin deal-making into simple, streamlined API calls and storing the data on IPFS to provide more efficient and fast retrieval for your content.

Here are some available storage helpers:

- [boost.filecoin.io](https://boost.filecoin.io/)
- [estuary.tech](https://estuary.tech/)
- [web3.storage](https://web3.storage/)
- [nft.storage](https://nft.storage/)
- [lighthouse.storage](https://www.lighthouse.storage/)

## Retrieval market

The retrieval market refers to negotiating retrieval deals for a provider to serve stored data to a client. In this agreement, the client agrees to pay the retrieval provider a certain amount of FIL for a given piece of data.

### Basic retrieval  

Currently, Filecoin nodes support direct retrieval from the storage miners who originally stored the data. Clients can directly send retrieval requests to a storage provider to retrieve their data by paying some FIL for retrieval.  

Clients need to provide enough information to the storage provider for the data retrieval request, including:

- Storage Provider ID: The ID of the storage provider where the data is stored.
- Payload CID: also called Data CID.
- Address: The address initially used to create the storage deal.

### Saturn

[Saturn](https://strn.network/) is a Web3 CDN in Filecoin’s retrieval market which serves the data stored on Filecoin with low latency and at low cost. It consists of independent retrieval providers specifically dedicated to that business, making retrieval an efficient, fast, and reliable operation.

## Programming on Filecoin

Let's quickly cover running computation over the Filecoin network.

### Compute-over-data

When it comes to data, a common need beyond storage and retrieval is data transformation. The goal with the compute-over-data protocols is generally to perform computation over [IPLD](https://youtu.be/Sgf6j_mCdjI), which is the data layer used by content-addressed systems like Filecoin. There are working groups working on different types of computing on Filecoin data, such as large-scale parallel compute (e.g., Bacalhau) and cryptographically verifiable compute (e.g. [Lurk](https://filecoin.io/blog/posts/introducing-lurk-a-programming-language-for-recursive-zk-snarks/)), etc.

For example, [Bacalhau](https://www.bacalhau.org/) is a platform for public, transparent, and optionally verifiable distributed computation. It enables users to run arbitrary Docker containers and WebAssembly (wasm) images as tasks against data stored in the InterPlanetary File System (IPFS).

It is worth noting that Filecoin is uniquely positioned to support large-scale off-chain computation since the storage providers have to compute resources such as GPUs and CPUs colocated with their data. By supporting compute-over-data on the Filecoin network, we enable a new paradigm of computing on the data where the data exists rather than moving the data to external compute nodes.

### Filecoin virtual machine

The Filecoin virtual machine (FVM) is a runtime environment for smart contracts on the Filecoin network. Smart contracts enable users to run any bounded computation, including those that create and enforce rules for storing and accessing data on the network. The FVM is responsible for executing these smart contracts and ensuring they are executed correctly and securely.

FVM is designed to support native Filecoin actors written in languages that compile to WASM, as well as smart contracts written for foreign runtimes, including Solidity contracts for Ethereum Virtual Machine (EVM), Secure EcmaScript (SES), and eBPF. The [reference FVM](https://github.com/filecoin-project/ref-fvm) and SDK are written in Rust.

According to the FVM roadmap, we initially support smart contracts written in Solidity and eventually support any language that compiles to WASM.

The FVM enables compute-over-states on the Filecoin network and allows developers to build endless new use cases on top of Filecoin. Some example use cases are:

#### Data organizations

FVM can create a new kind of organization – one built around datasets of various kinds.

##### Data DAO and tokenized datasets

The FVM enables the creation and management of data-based decentralized and autonomous organizations -- data DAOs. The FVM allows a group of individuals, or organizations, to curate and preserve data collection. Data DAOs can govern and monetize data access and pool the returns into a shared treasury to fund the collections preservation and long-term growth. One could even exchange those data tokens between peers and request computation services on that data, such as validation, joins, analysis, feature detection, and extraction, moving into machine learning.

##### Perpetual storage

FVM allows users to store once and have repair and replication bots manage the repetitive storage deal creation tasks so that data can be stored perpetually. Using a smart contract, users can provision a wallet with FIL, and storage providers can use that to fund data storage permanently. Repair bots can monitor the storage deals and replicate the data with other storage providers when necessary. This process gives users long-term storage permanence.

#### Financial services for miners

FVM can provide a variety of financial services for storage providers. The needs of these SPs are unique to the Filecoin ecosystem.

##### Lending and staking protocols

Users can lend out Filecoin to storage providers to use it as storage collateral and receive interest in return. These loans can be under-collateralized based on the on-chain storage history of past storage provider performance. Community members can use this history to generate reputation scores, enabling everyone to identify good borrowers. On top of that, loans can be automatically paid back to investors by using a multisig as the storage provider’s owner address, including lenders and a third party, to help negotiate payback. New FVM-enabled smart contracts give every FIL token holder access to new yield opportunities on their holdings while also benefiting the whole Filecoin economy by allowing entry ramps for providing storage on the network.

##### Insurance

SPs need to have financial products that help protect them from the risk they are undertaking in creating more storage solutions. Certain characteristics such as payment history, length of operation, and availability can be used to craft insurance policies just as they can be used to underwrite loans to SPs. This can protect them from the financial consequences of active faulting or token price drops.

#### Core chain infra

We expect that FVM will gain feature parity with other chains that persist. This is required for any EVM chain to operate but is not necessarily tied to storage primitives.

##### Decentralized exchanges

Users on FVM need to be able to exchange FIL for other tokens issued on-chain. This may be a decentralized exchange such as a fork of Uniswap or Sushi or involve building a decentralized order book similar to Serum on Solana.

##### Token bridges

While not immediately on the roadmap, bridges are needed from EVM chains, Move chains, and Cosmos chains to bring wrapped tokens from other ecosystems into the fold. With the current launch, we are more focused internally since the value proposition of Filecoin is unique enough that it does not need to bootstrap TVL from other chains. However, in the long run, we expect FVM to be part of a broader family of blockchains.

Besides these, there are a lot more use cases that the FVM could enable, such as data access control ([Medusa](https://cryptonet.org/projects/project-medusa-scalable-threshold-network-on-chain)), retrieval and trustless reputation systems, replication workers, storage bounties, and L2 networks. To learn more about what you can build on top of FVM, check out our [Request for Startup](https://protocollabs.notion.site/Request-for-Startups-FVM-edition-8cd3e76982d14e29b33335ca458fb087) post.

If you are interested in building these use cases, there is a list of solution blueprints that might help as a reference point regarding how some of these could work on a high level:

- [DataDAO Solution Blueprint](https://docs.google.com/document/d/1OYDh_gs7mAk2M_O9m-2KedQA7MNo6ysIzH6eaQZxMOk/edit?pli%3D1)
- [Perp Storage Solution Blueprint](https://docs.google.com/document/d/19Kck1PiGGrUKyd6XBYj6NtsC5NiCjndUSsv0OFA1Lv0/edit)
- [Lending pool cookbook](https://docs.google.com/document/d/18in74On0bY7KyEsPgItvNvfUUPcPtHjNQtVfLdJUyzM/edit)

## Filecoin EVM

The Filecoin EVM runtime (FEVM) is the Ethereum Virtual Machine (EVM) virtualized as a runtime on top of the Filecoin Virtual Machine (FVM). It will allow developers to port any existing EVM-based smart contracts straight onto the FVM and make them work out of the box. FEVM emulates EVM bytecode at the low level, supporting contracts written in Solidity, Vyper, and Yul. The EVM foreign runtime is based on pre-existing OSS libraries, including [SputnikVM](https://github.com/rust-blockchain/evm) and [revm](https://github.com/bluealloy/revm). You can find out more details in the [EVM <> FVM mapping specification](https://github.com/filecoin-project/fvm-project/blob/main/04-evm-mapping.md).

Because Filecoin nodes offer the Ethereum JSON-RPC API support, FEVM is also completely compatible with any EVM development tools, such as Hardhat, Brownie, and Metamask. Most smart contracts ported to Filecoin shouldn't require changes or auditing. For example, new ERC-20 tokens can be launched on the Filecoin network or bridged directly to token pools on other chains.

Developers can deploy actors on either the FEVM or native FVM; which one should you choose? The decision can be summed up as such: if you want better performance, write actors that are compiled to WASM and deployed to native FVM. If you are familiar with Solidity and want access to the EVM ecosystem of tools, but don’t mind slightly less performance, deploy to the FEVM. You can find out more about the pros and cons of each in the [table here](https://docs.filecoin.io/developers/smart-contracts/concepts/filecoin-evm/#fevm-and-native-fvm).

To sum it up, the FEVM allows current Web3 developers to quickly start writing actors on the Filecoin blockchain while using all of the tools, software packages, and languages they are used to while having access to Filecoin storage deals as a native.

The difference between FEVM and EVM contracts is that contracts deployed on FEVM can interact with built-in actors to interact with Filecoin-specific actors, such as miner actors, as mentioned in the built-in actor section. This allows developers to build Filecoin-native decentralized applications for the new use cases mentioned above. Smart contracts deployed to the Ethereum blockchain have no direct access to the Filecoin network or Filecoin-specific actors.

To allow Solidity smart contracts on FEVM to seamlessly call methods on Filecoin built-in actors and access Filecoin-specific syscalls idiomatically, a Filecoin-Solidity API library has been developed, you can use it for building your use cases, such as interacting with storage deals.

If you build on FEVM, you might find some of the [example contracts](https://github.com/lotus-web3/client-contract) here helpful.

## Network and development tools

Currently, several Filecoin networks are available to serve different purposes, as detailed below. This table also captures a quick [comparison of Filecoin networks](https://docs.filecoin.io/developers/infrastructure/networks/#available-networks).

### Mainnet

[Mainnet](https://docs.filecoin.io/networks/overview/available-networks/#mainnet) is the live production network that all nodes on the Filecoin network are connected to. It never resets.

### Calibration testnet

[Calibration](https://docs.filecoin.io/networks/overview/available-networks/#calibration) testnet is the most realistic simulation of the mainnet, where prospective storage providers can experience more realistic sealing performance and hardware requirements due to the use of final proofs constructions and parameters, and prospective storage clients can store and retrieve real data on the network. Clients can participate in deal-making workflows and storage/retrieval functionality. It also has the same sector size as the mainnet.

- Public endpoint: [https://api.calibration.node.glif.i](https://api.calibration.node.glif.io/rpc/v0)[o/rpc/v0](https://api.calibration.node.glif.io/rpc/v0)
- Blockchain explorer: [https://calibration.filscan.io/](https://calibration.filscan.io/)
- Faucet: [https://faucet.calibration.fildev.network/](https://faucet.calibration.fildev.network/)

### Hyperspace testnet

[Hyperspace](https://github.com/filecoin-project/testnet-hyperspace) testnet is the main pre-production developer testnet which is more stable and reliable. The Hyperspace testnet is a pre-production developer-focused testnet. It resets only in the event of irrecoverable damage. Developers are welcome to build and test their toolings, applications, and smart contracts on this network.

- Public endpoint: [https://api.hyperspace.node.glif.io/rpc/v0](https://api.hyperspace.node.glif.io/rpc/v0)
- Blockchain explorer: [https://explorer.glif.io/?network=hyperspace](https://explorer.glif.io/?network%3Dhyperspace)
- Faucet: [https://hyperspace.filtest.network/#faucet](https://hyperspace.filtest.network/#faucet)

### Wallaby testnet

[Wallaby](https://github.com/filecoin-project/testnet-wallaby/) testnet is a bleeding-edge test network for the programmability features being developed for the FVM. You can deploy EVM-compatible smart contracts to Wallaby. Wallaby is reset every week, making it unsuitable for long-term testing of applications. The purpose of Wallaby is to allow developers to quickly poke and prod at any new features released within the latest development builds of the FVM. The Wallaby test is intended to be used by: the FVM engineering team to test FEVM releases and updates, early builders from the community to test EVM smart contract deployment on FVM, and to deploy native FVM actors.

You can find [Wallaby-specific documentation](http://kb.factor8.dev/docs/filecoin/testnets/wallaby) here.

- Public endpoint: [https://wallaby.node.glif.io/rpc/v0](https://wallaby.node.glif.io/rpc/v0)
- Blockchain explorer: [https://wallaby.filfox.info/en](https://wallaby.filfox.info/en)
- Faucet:  [https://wallaby.network/#faucet](https://wallaby.network/#faucet)

Filecoin has several block explorers that allow you to view individual transactions and messages across the Filecoin network. Here are some block explorers that support the FVM testnets:

- [Glif](https://explorer.glif.io/actor/?network%3Dwallaby)
- [Filexplorer](https://explorer.filmine.io/)

There are many dev tools available for developing on Filecoin. Some example libraries are:

- [Filecoin.sol](https://docs.zondax.ch/fevm/filecoin-solidity/): in the context of the Filecoin EVM, a Solidity library is required to allow Solidity smart contracts to seamlessly call methods on Filecoin built-in actors, as well as to access Filecoin specific syscalls idiomatically.
- [Filecoin-signing-tools](https://github.com/Zondax/filecoin-signing-tools): it is a JSON RPC library for creating signed messages in the Filecoin network.

## The end

That’s it! Congratulations, you have made it to the end of the Filecoin introduction! We look forward to seeing what you would build on top of the growing Filecoin ecosystem. Have fun building!
