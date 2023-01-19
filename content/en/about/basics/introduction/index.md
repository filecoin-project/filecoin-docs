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
---

This post aims to provide a comprehensive overview of Filecoin to the developers, and serves as a reference that developers can check back on. We assume readers to have basic understanding of [blockchain](https://en.wikipedia.org/wiki/Blockchain&sa=D&source=editors&ust=1674147484217031&usg=AOvVaw0nu7s-iqkyWj4UhowhMi3h) and [Ethereum](https://ethereum.org/en/developers/docs/&sa=D&source=editors&ust=1674147484217366&usg=AOvVaw2RgPfNhg8mxEVDTvf_rwfi), and will focus specifically on the special designs of Filecoin that makes it a unique decentralized storage network in Web3. This should take about 20 minutes to go through and would provide you with a solid foundation to start developing on Filecoin confidently!

## What is Filecoin

[Filecoin](https://docs.filecoin.io/&sa=D&source=editors&ust=1674147484217778&usg=AOvVaw2cMubhJrI-j-jJj1xOhV78) is a peer-to-peer network that stores files, with built-in economic incentives and cryptography to ensure files are stored reliably over time. In Filecoin, users pay to store their files on storage providers. Storage providers are computers responsible for storing files and proving they have stored the files correctly over time. Anyone who wants to store their files or get paid for storing other users’ files can join Filecoin. Available storage, and the price of that storage, is not controlled by any single company. Instead, Filecoin facilitates open markets for storing and retrieving files that anyone can participate in.

Filecoin is built on top of the same software powering [IPFS protocol](https://docs.ipfs.tech/&sa=D&source=editors&ust=1674147484218205&usg=AOvVaw0sL0VWPDB6X2ClualleNlB), which is a peer-to-peer distributed storage network that leverages [content addressing](https://docs.ipfs.tech/concepts/content-addressing/&sa=D&source=editors&ust=1674147484218452&usg=AOvVaw27G9NSXWsS9p72oIu8pG6Q) to allow permanent references to the data, and avoids relying on specific devices or cloud servers for addressing the content. Filecoin is different from IPFS in the sense that it has an incentive layer on top to incentivize contents to be reliably stored and accessed.

Filecoin enables a number of use cases, from Web3 native NFT and metaverse/game assets storage, incentivized permanent storage, to archiving Web2 datasets as a cheaper alternative to cloud storage. For example, [NFT.Storage](https://nft.storage/&sa=D&source=editors&ust=1674147484218833&usg=AOvVaw0yAtHqVkRXX-oORC3p71C-) utilizes Filecoin to provide a simple decentralized storage solution for NFT contents and metadata, while [Shoah Foundation](https://sfi.usc.edu/&sa=D&source=editors&ust=1674147484219109&usg=AOvVaw3hOWIqKVWXXV58bPij3Mpq) and [Internet Archive](https://archive.org/&sa=D&source=editors&ust=1674147484219303&usg=AOvVaw3QlQr-CrSfHROfVLMdp2oO) leverages Filecoin to backup their contents. Filecoin also supports a wide range of formats of data, including audio and video files, allowing Web3 platforms such as [Audius](https://audius.co/&sa=D&source=editors&ust=1674147484219472&usg=AOvVaw2uAX-G8LB3LG560tXDt1tk) and [Huddle01](https://huddle01.com/&sa=D&source=editors&ust=1674147484219621&usg=AOvVaw0kap7nRhCDwwNn1JMumEFe) to leverage Filecoin as the decentralized storage backend for music streaming and video conferencing.

## Cryptoeconomics

The native currency of Filecoin, FIL, is a utility token that is used to incentivize persistent storage on Filecoin network, storage providers mine FIL by providing reliable storage service or committing storage capacity on the network. It has a maximum circulating supply of 2,000,000,000 FIL, meaning that at most 2B Filecoin will ever be created.

As a utility token that aligns participants’ incentives with the long-term growth of the network, Filecoin issuance is aligned with the overall provable utility of the network, and the majority of Filecoin supply would only be minted if the network achieved growth and utility targets at scale.

Specifically, Filecoin uses a [dual minting model](https://spec.filecoin.io/%23section-systems.filecoin_token.minting_model&sa=D&source=editors&ust=1674147484220325&usg=AOvVaw25eQbNyiZGSVUEtPqqoNs_) for block reward minting:

- [Baseline Minting](https://spec.filecoin.io/%23section-systems.filecoin_token.block_reward_minting.baseline-minting&sa=D&source=editors&ust=1674147484220662&usg=AOvVaw1vf2sVTFJtM9GHBzBY_qhG): up to 770M FIL tokens are minted based on the performance of the network. The full release of these tokens would only occur if the Filecoin network reached a Yottabyte of storage capacity in under 20 years, which is estimated ~1000x larger than today’s cloud storage capacity.
- [Simple Minting](https://spec.filecoin.io/%23section-systems.filecoin_token.block_reward_minting.simple-minting&sa=D&source=editors&ust=1674147484221089&usg=AOvVaw09re-gzBn_xxHxlt08dfot): 330M FIL tokens are released on a 6 year half-life based on time, meaning that 97% of these tokens will be released in approximately 30 years time.
- Additionally, there are 300M FIL tokens held back in the mining reserve to incentivize future types of mining.
- Vesting: to encourage long term network alignment, mining rewards undergo a vesting schedule, for example, 75% of block rewards earned by miners vest linearly over 180 days while 25% are made immediately available to improve miner cash flow and profitability. And the remaining of the FIL tokens are vested to Protocol Labs teams and Filecoin Foundation over the course of 6 years and SAFT investors over the course of 3 years, as shown in the [vesting table](https://spec.filecoin.io/systems/filecoin_token/token_allocation/filtokenallocation.png&sa=D&source=editors&ust=1674147484221810&usg=AOvVaw0APuLa2qxi8zOsOWsvv500) here.
- Collateral and Slashing: to encourage good behavior from network participants, during block reward mining, storage providers must lock Filecoin tokens as [pledge collateral](https://spec.filecoin.io/%23section-systems.filecoin_mining.miner_collaterals.initial-pledge-collateral&sa=D&source=editors&ust=1674147484222187&usg=AOvVaw0peY2CM6khJetFkBnendi5) for consensus security, storage reliability, and contract guarantees. Pledge collateral is determined by projected block rewards that a miner would earn. Collateral and all earned rewards by storage providers are subject to slashing throughout the lifetime of a sector if the storage did not pass reliability check.

## The Filecoin Blockchain

### Tipsets

The Filecoin blockchain is a chain of tipsets, rather than a chain of blocks. A tipset is set of blocks that each have the same height and parent tipset. Therefore, multiple storage providers can produce blocks for each epoch to increase network throughput.

Each tipset is assigned a weight so the consensus protocol directs nodes to build on top of the heaviest chain. This provides a certain level of security to the Filecoin network by preventing a node from intentionally intervening other nodes to produce valid blocks.

### Actors

An Actor in the Filecoin Blockchain is the equivalent of the smart contract in the Ethereum Virtual Machine. It is essentially an ‘object’ in the filecoin network with state and a set of methods that can be used to interact with it.

#### Built-in actors

There are several [built-in system actors](https://spec.filecoin.io/%23section-systems.filecoin_vm.sysactors&sa=D&source=editors&ust=1674147484223172&usg=AOvVaw3QP7fTDmWMtMTWPPGPog0p) that power the Filecoin network as the decentralized storage network.

- System Actor - general system actor.
- Init actor - initializes new actors and records the network name.
- Cron Actor - a scheduler actor that runs critical functions at every epoch.
- Account Actor - responsible for user accounts (non-singleton).
- Reward Actor - managing block reward and token vesting (singleton).
- Storage Miner Actor - storage mining operation and validate storage proofs.
- Storage Power Actor - keeping track of the storage power allocated at each storage provider
- Storage Market Actor - managing storage deals.
- Multisig Actor \- responsible for dealing with operations involving the Filecoin multi-signature wallet.
- Payment Channel Actor - setting up and settling funds related to payment channels.
- DataCap Actor - responsible for DataCap token management.
- Verified Registry Actor - responsible for managing verified clients.
- Ethereum address Manager (EAM) Actor\- responsible for assigning all Ethereum compatible addresses on Filecoin Network, includes EVM smart contract addresses and Ethereum account addresses.
- EVM Account Actor - a non-singleton built-in actor representing an external Ethereum identity backed by a secp256k1 key.

#### User programmable actors

Along with the maturity of FVM, developers can write actors and deploy to Filecoin network the same way as other blockchains. Other blockchains refer to these programs as _smart contracts_. User programmable actors are also able to interact with built-in actors using the exported API from built-in actors.

You can check out this [talk here](https://curriculum.pl-launchpad.io/curriculum/filecoin/protocol/%23how-filecoin-actors-work--zenground0--protocol-labs&sa=D&source=editors&ust=1674147484225577&usg=AOvVaw1fhqffcWd0kUimWA9-YRr7) to learn more about how Filecoin Actor works.  

### Distributed Randomness

Filecoin uses distributed and publicly verifiable random beacon protocol - [Drand](https://drand.love) as the randomness beacon for the leader election during the Expected Consensus (see Consensus section) to produce blocks. This randomness guarantees leader election secret, fair and verifiable.

### Nodes

Nodes in the Filecoin network are primarily identified in terms of the services they provide to serve the Filecoin storage network, including Chain verifier node, client node, storage provider node and retrieval provider node. But any node participating in the Filecoin network should provide the chain verification service as a minimum.

Filecoin is targeting multiple implementations of the protocol in order to guarantee security but also resilience of the Filecoin network. Currently, the active maintained implementations are:

- Lotus [lotus.filecoin.io/](https://lotus.filecoin.io/&sa=D&source=editors&ust=1674147484226548&usg=AOvVaw3cFh7AKmqi4v8tZzn_1d-y)
- Venus [github.com/filecoin-project/venus](https://github.com/filecoin-project/venus&sa=D&source=editors&ust=1674147484226901&usg=AOvVaw3xTT84WBcgDlG_78XpvFno)
- Forest [github.com/ChainSafe/forest](https://github.com/ChainSafe/forest&sa=D&source=editors&ust=1674147484227231&usg=AOvVaw0Co642mTizoH50rlUOQuWU)

### Addresses

In the Filecoin network, addresses are used to identify actors in the Filecoin state. The address encodes information about the corresponding actor so it provides a robust address format which is easy to use and resistant to errors. There are five types of address in Filecoin for either MainNet starts with f or TestNet starts with t.

- f0/t0 - an ID address for an actor in a more “human friendly” way. For instance, f0123261 is the ID for a storage provider.
- f1/t1 - A secp256k1 wallet address with encrypted key pair. Essentially, this is a wallet address generated from secp256k1 public key.
- f2/t2 - An address represents an actor (smart contract) and is assigned in a way that makes it safe to use during network forks.
- f3/t3 - A BLS wallet address which is generated from a BLS public encryption key.
- f4/t4 - the addresses which was created and assigned to user-defined actors by user-definable “address management” actors. This type of address can receive funds before an actor has been deployed to the address.
- f410/t410 - the address space which is managed by Ethereum Address Manager (EAM) built-in actor. The original Ethereum addresses can be cast as f410/t410 addresses, and vice versa in order to enable existing Ethereum tools to seamlessly interact with the Filecoin network.

### Consensus

#### Expected Consensus

Expected consensus (EC) is the underlying consensus algorithm used by Filecoin. It is a probabilistic Byzantine fault-tolerant consensus protocol which runs a leader election among a set of storage providers to submit a block every epoch. Similar to proof of stake, Filecoin uses proof of storage for the leader election which means the likelihood of being elected depends on how much provable storage power a miner contributes to the network. The storage power of the network is stored in the storage power table and managed by the Storage Power Actor.

At a high-level, the consensus process relies on [DRAND](https://drand.love/&sa=D&source=editors&ust=1674147484229241&usg=AOvVaw1e7Fsq4qETNCMGAPrPm10n) to provide distributed and verifiable randomness to keep leader election secret, fair and verifiable. All the election participants and their power are drawn from the Power Table which is calculated and maintained over time by the Storage Power Consensus subsystem. Eventually, EC takes all valid blocks produced in this epoch and uses a weighting function to select the chain with highest weight to add blocks.

#### Block production process

The process of producing block for each epoch can be briefly described as following:

- Elect leaders from eligible miners.
- Miners need to check if they are elected.
- An elected miner gets the randomness value to generate WinningPoSt.
- If all above is successful, miners build a block and propagate it.
- Verify whether a miner won the block and also verify leader election.
- Eventually, select the heaviest chain to add blocks.

#### Finality

EC enforces a version of soft finality whereby all miners at round N will reject all blocks that fork off prior to round N-F(F is set to 900 in current network). This is important to enforce a macroeconomically-enforced finality at no cost to liveness in the chain.

### Proofs

As the decentralized storage network, Filecoin is built on the Proof-of-Storage in which miners contribute their vacant storage space to the network to store data and then provide proofs for the client to verify if their data has been stored throughout a period of time.

#### Proof of Replication (PoRep)

Using Proof Of Replication (PoRep), storage providers prove that they have created a unique copy of the client’s data and stored it on the behalf of the network.

#### Proof of Spacetime (PoSt)

Storage providers also need to continuously prove that they store clients’ data the whole lifetime of the storage deal.  There are two types of challenges as part of PoSt process.

- Winning PoSt guarantees that the storage provider maintains a copy of data at a specific point in time.
- Window PoSt is used as a proof that a copy of the data has been continuously maintained over time.

#### Slashing

If storage providers fail to provide reliable uptime or act maliciously against the network, they will be penalized by slashing. Filecoin implements two kinds of slashing: storage fault slashing to penalize storage providers for not being able to maintain the healthy and reliable storage sectors for the network, and consensus fault slashing to penalize storage providers to sabotage the liveness and security of the consensus process.

## Storage Model Overview

Storage model provides proven storage power in the network required for the consensus algorithm, and also achieves the open storage market for storing and retrieving data on Filecoin network. There are two major components to Filecoin markets, the storage market and the retrieval market which will be introduced in the following sections.

### Providers

Based on the nature of the storage markets, there are two types of providers to provide service and earn FIL as rewards.

- Storage providers are responsible for storing files and data for clients on the network and providing cryptographic proofs to verify storage.
- Retrieval providers are responsible for providing quick pipes to retrieve data per clients’ requests. In some cases, storage providers who stored data for clients also act as retrieval providers.

### Deals

In the Filecoin network, providers provide their storage or retrieval service to data clients through deals which are negotiated and agreed between two parties, including terms like data size, price and deal duration, and collateral, etc.

### Sectors

Sectors are the basic units of provable storage where storage providers store client’s data and generate PoSt on behalf of the Filecoin network . Sectors have standard sizes (currently 32GiB and 64 GiB are supported), as well as the lifetime which could be extended by storage providers before reaching the end of lifetime.

## Storage Market

Storage market is the data entry point into the network where storage providers and clients negotiate storage deals and publish storage deals on-chain.

### Deal making

The lifecycle for a deal within the storage market contains distinct phases.

- Discovery - the client identifies storage providers and query their current asks for price.
- Negotiation - both parties come to an agreement about the term of the storage deal.
- Publishing - the deal will be published on-chain as well as the proof.
Handoff - once the deal is published on-chain, it will be added into sector where data storage will be proven.

### Filecoin Plus  

The mission of Filecoin Plus is to maximize the amount of useful storage on the Filecoin network. The aims to bring more meaningful and valuable data into Filecoin network by offering cheaper or even free storage service to the verified clients. This mechanism is designed and operates around DataCap which is the storage quota allocated to verified clients to store data, and also boost incentives for storage providers.  

Verified clients onboard data into Filecoin by using DataCap which they apply from community selected notaries. In return of storing verified storage deals, storage providers receive DataCap with a 10x boost to their storage power which eventually increase their block rewards as incentive.

- Datacap - DataCap token will be allocated to verified client to spend in the storage deals carrying 10x deal quality multiplier.
- Notaries  - community selected notaries govern the program by verify storage client and allocate DataCap token to verified clients.
- Verified clients  - Clients are active participants of the network with DataCap allocation for their data storage.

### Storage onramps

To simplify the process of making storage deals with SPs to store data on Filecoin, there are many storage helpers to provide simplest way to integrate Filecoin storage as well as IPFS into your applications or smart contracts.

Storage helpers provide libraries that abstract Filecoin dealmaking into simple, streamlined API calls as well as storing the data on IPFS to provide the more efficient and fast retrieval for your contents.

The available storage helpers:

- Boost [boost.filecoin.io](https://boost.filecoin.io/&sa=D&source=editors&ust=1674147484234258&usg=AOvVaw1PFBrROfthUdAgHLwkkv63)
- Estuary [estuary.tech](https://estuary.tech/&sa=D&source=editors&ust=1674147484234745&usg=AOvVaw1b_HzDFLP0Tmz_o-I4yV7P)
- Web3.Storage [web3.storage](https://web3.storage/&sa=D&source=editors&ust=1674147484235114&usg=AOvVaw3YpID28KFS1K2RXMlravRA)
- NFT.Storage [nft.storage](https://nft.storage/&sa=D&source=editors&ust=1674147484235484&usg=AOvVaw15IcqJMpzEfmvDH3Ls5jFG)
- Lighthouse.Storage [lighthouse.storage](https://www.lighthouse.storage/&sa=D&source=editors&ust=1674147484235832&usg=AOvVaw3FpKwTYoVxHi9WfPLgEaWb)

## Retrieval Market

The retrieval market refers to the process of negotiating retrieval deals for a retrieval provider to serve stored data to a client. In this agreement, the client agrees to pay the retrieval provider a certain amount FIL for a given piece of data.

### Basic retrieval  

Currently, Filecoin node (Lotus) supports direct retrieval from the storage miners which originally stored the data. Clients can directly send retrieval requests to a storage provider to retrieve their data by paying some FIL for retrieval.  

Clients need to provide enough information to storage provider for the data retrieval request, including:

- Storage Provider ID - The ID of the storage provider where the data is stored.
- Payload CID - also called Data CID.
- Address - The address initially used to create the storage deal.

### Saturn

[Saturn](https://strn.network/&sa=D&source=editors&ust=1674147484236758&usg=AOvVaw2K3yZqvo8i2N-8vovOuZQ4) is a Web3 CDN in Filecoin’s retrieval market which serves the data stored on Filecoin with low latency and at low cost. It consists of independent retrieval providers that are specifically dedicated to that business by making retrieval an efficient, fast and reliable operation.

## Programming on Filecoin

### Compute over Data (Off-chain Compute)

When it comes to data, a common need beyond storage and retrieval is data transformation. bring useful Compute resources to data stored in Filecoin. The goal with the compute over data protocols are generally to perform computation over [IPLD](https://youtu.be/Sgf6j_mCdjI&sa=D&source=editors&ust=1674147484237289&usg=AOvVaw32wwy9EPa-lmaPUmtYxoij), which is the data layer used by content-addressed systems like Filecoin. There are working groups working on different types of compute on Filecoin data, such as large scale parallel compute (e.g. Bacalhau), and cryptographically verifiable compute (e.g. [Lurk](https://filecoin.io/blog/posts/introducing-lurk-a-programming-language-for-recursive-zk-snarks/&sa=D&source=editors&ust=1674147484237649&usg=AOvVaw1GL0xeMSkAuNXHOCuPr5BY)) etc.

For example, [Bacalhau](https://www.bacalhau.org/&sa=D&source=editors&ust=1674147484237957&usg=AOvVaw1-M55caz-IeAojWAAKFOnM) is a platform for public, transparent, and optionally verifiable distributed computation. It enables users to run arbitrary Docker containers and WebAssembly (wasm) images as tasks against data stored in the InterPlanetary File System (IPFS).

It is worth noting that Filecoin is uniquely positioned to support large scale off-chain compute since the storage providers have compute resources colocated with their data (GPUs and CPUs for running the proofs). By supporting compute over data on Filecoin network, we enable a new paradigm of having compute jobs moved to the data, rather than moving the data to external compute nodes.

### Filecoin Virtual Machine (FVM)

The Filecoin virtual machine (FVM) is a runtime environment for smart contracts on the Filecoin network. Smart contracts enable users to run any bounded computation, including those that create and enforce rules for storing and accessing data on the network. The FVM is responsible for executing these smart contracts and ensuring that they are executed correctly and securely.

FVM is designed to support native Filecoin actors written in languages that compile to WASM, as well as smart contracts written for foreign runtimes including Solidity contracts for Ethereum Virtual Machine (EVM), Secure EcmaScript (SES), and eBPF. The [reference FVM](https://github.com/filecoin-project/ref-fvm&sa=D&source=editors&ust=1674147484238786&usg=AOvVaw0ynRb84ODaWk0Io4MtrZK1) and SDK are written in Rust.

According to the FVM roadmap, we initially support smart contracts written in Solidity, and eventually support any language that compiles to WASM.

The FVM enables compute over states on Filecoin network, and allows developers to build endless new use cases on top of Filecoin. Some example use cases are:

#### Data Organizations

FVM can create a new kind of organization – one built around datasets of various kinds.

##### Data DAO and Tokenized Datasets

The FVM enables the creation and management of data-decentralized-autonomous-organizations, i.e. data DAOs. The FVM allows a group of individuals, or organizations, to curate and preserve data collection. Data DAOs can govern and monetize data access and pool the returns into a shared treasury to fund the collections preservation and long-term growth. One could even exchange those data tokens between peers and request computation services on that data, such as validation, joins, analysis, feature detection, and extraction, moving into machine learning.

##### Perpetual Storage

FVM allows users to store once and have repair and replication bots manage the repetitive storage deal creation tasks, so that data can be stored perpetually. Using a smart contract, users can provision a wallet with FIL, and storage providers can use that to fund data storage permanently. Repair bots can monitor the storage deals and replicate the data with other storage providers when necessary. This process gives users long-term storage permanence.

#### Financial Services for Miners

FVM can provide a variety of financial services for SPs (storage providers) . The needs of these SPs are unique to the Filecoin ecosystem.

##### Lending and Staking Protocols

Users can lend out Filecoin to storage providers for them to use it as storage collateral and receive interest in return. These loans can be under-collateralized based on the on-chain storage history of past storage provider performance. Community members can use this history to generate reputation scores, enabling everyone to identify good borrowers. On top of that, loans can be automatically paid back to investors by using a multisig as the storage provider’s owner address that includes lenders and a third party to help negotiate payback. New FVM-enabled smart contracts give every FIL token holder access to new yield opportunities on their holdings while also benefiting the whole Filecoin economy by allowing the entry barriers for providing storage on the network.

##### [Insurance](https://rfs.fvm.dev/%23ca5450197bb947bd8d30a9eb96110553&sa=D&source=editors&ust=1674147484240273&usg=AOvVaw1kOBRECofdvEzKp_i-1vB-): SPs need to have financial products that help protect them from the risk they are undertaking in creating more storage solutions. Certain characteristics (such as payment history, length of operation, availability, etc) can be used to craft insurance policies just as they can be used to underwrite loans to SPs. This can protect them from the financial consequences of active faulting or token price drops.

#### [Core Chain Infra](https://rfs.fvm.dev/%23e7b0b711aaed456f9affa5fa82a0971a&sa=D&source=editors&ust=1674147484240884&usg=AOvVaw3FFFfV15Rc_cZmgshz1M31)

We expect that FVM will gain feature parity with other chains that persist. This is required for any EVM chain to operate, but is not necessarily tied to storage primitives.

##### Decentralized exchanges

Users on FVM need to be able to exchange FIL for other tokens issued on-chain. This may be a DEX \[as simple as a fork of Uniswap or Sushi on EVM\], or involve building a decentralized order book, similar to Serum on Solana.

##### Token Bridges

While not something immediately on the roadmap, bridges are needed from EVM chains, Move chains and Cosmos chains in order to bring wrapped tokens from other ecosystems into the fold. With the current launch, we are more focused internally, since the value proposition of Filecoin is unique enough that it does not need to bootstrap TVL from other chains. However, in the long run, we expect FVM to be part of a broader family of blockchains.

Besides these, there are a lot more use cases that could be enabled by FVM, such as data access control ([Medusa](https://cryptonet.org/projects/project-medusa-scalable-threshold-network-on-chain&sa=D&source=editors&ust=1674147484241915&usg=AOvVaw0c_qjySYEL-Q_hsegs6BGA)), retrieval and trustless reputation systems, replication workers, storage bounties, and L2 networks etc. To find out more about what you can build on top of FVM, check out our [Request for Startup](https://protocollabs.notion.site/Request-for-Startups-FVM-edition-8cd3e76982d14e29b33335ca458fb087&sa=D&source=editors&ust=1674147484242578&usg=AOvVaw2zcOEP-aWW-iZX52FBveRd) post.

If you are interested in building these use cases, there is a list of solution blueprints that might help as reference point regarding how some of these could work on a high level:

- [DataDAO Solution Blueprint](https://docs.google.com/document/d/1OYDh_gs7mAk2M_O9m-2KedQA7MNo6ysIzH6eaQZxMOk/edit?pli%3D1&sa=D&source=editors&ust=1674147484243226&usg=AOvVaw1LTPkW2A7_XynOaBS0Ujdf)
- [Perp Storage Solution Blueprint](https://docs.google.com/document/d/19Kck1PiGGrUKyd6XBYj6NtsC5NiCjndUSsv0OFA1Lv0/edit&sa=D&source=editors&ust=1674147484243632&usg=AOvVaw2Bw84J_xdyPPCPlEjxhK9t)
- [Lending pool cookbook](https://docs.google.com/document/d/18in74On0bY7KyEsPgItvNvfUUPcPtHjNQtVfLdJUyzM/edit&sa=D&source=editors&ust=1674147484243946&usg=AOvVaw3maWqHAx7Zz85AZdw3fA7-)

## Filecoin EVM

The Filecoin EVM (FEVM) is the Ethereum Virtual Machine (EVM) virtualized as a runtime on top of the Filecoin Virtual Machine (FVM). It will allow developers to port any existing EVM-based smart contracts straight onto the FVM and make them work out of the box. FEVM emulates EVM bytecode at the low-level, supporting contracts written in Solidity, Vyper, and Yul. The EVM foreign runtime is based on pre-existing OSS libraries including [SputnikVM](https://github.com/rust-blockchain/evm&sa=D&source=editors&ust=1674147484244405&usg=AOvVaw11yGUJ_B3XZjt421Lwiumt) and [revm](https://github.com/bluealloy/revm&sa=D&source=editors&ust=1674147484244576&usg=AOvVaw0JYAzKXNEmO9FGDbJdO4H7). You can find out more details in the [EVM <> FVM mapping specification](https://github.com/filecoin-project/fvm-project/blob/main/04-evm-mapping.md&sa=D&source=editors&ust=1674147484244789&usg=AOvVaw3bPEKtt7RJ7LQHsdJhFWDC).

Because Filecoin nodes offer the Ethereum JSON-RPC API support, FEVM is also completely compatible with any EVM development tools, such as Hardhat, Brownie, and Metamask. Most smart contracts ported to Filecoin shouldn't require changes nor auditing. For example, new ERC-20 tokens can be launched on the Filecoin network or bridged directly to token pools on other chains.

Developers will have the option to deploy actors on either the FEVM or native FVM, which one should you choose? The decision can be summed up as such: if you want better performance, write actors that are compiled to WASM and deployed to native FVM. If you are familiar with Solidity and want access to the EVM ecosystem of tools, but don’t mind slightly less performance, deploy to the FEVM. You can find out more about the pros and cons of each in the [table here](https://docs.filecoin.io/developers/smart-contracts/concepts/filecoin-evm/%23fevm-and-native-fvm&sa=D&source=editors&ust=1674147484245424&usg=AOvVaw3ABJnghuJ6p1OFBMj52BE0).

To sum it up, the FEVM allows current Web3 developers to quickly start writing actors on the Filecoin blockchain while also using all of the tools, software packages, and languages they are used to while also having access to Filecoin storage deals as a native.

The difference between FEVM and EVM contracts is that contracts deployed on FEVM can interact with builtin actors to interact with Filecoin-specific actors, such as miner actors, as mentioned in the built-in actor section. This allows developers to build Filecoin-native decentralized applications for the new use cases mentioned above. Smart contracts deployed to the Ethereum blockchain have no direct access to the Filecoin network or Filecoin-specific actors.

In order to allow Solidity smart contracts on FEVM to seamlessly call methods on Filecoin built-in actors, as well as to access Filecoin specific syscalls idiomatically, a Filecoin-Solidity API library has been developed, you can use it for building your use cases such as interacting with storage deals etc.

If you plan to build on FEVM, you might find some of the [example contracts](https://github.com/lotus-web3/client-contract&sa=D&source=editors&ust=1674147484246137&usg=AOvVaw22yHCUlEzbhwVo32nH4chG) here helpful.

## Network and development tools

Currently, there are several Filecoin networks available to serve different purposes, as detailed below. This table also captures a quick [comparison of Filecoin networks](https://docs.filecoin.io/developers/infrastructure/networks/%23available-networks&sa=D&source=editors&ust=1674147484246615&usg=AOvVaw12KvjKI4yn5ZnMoJqPlP2N).

### Mainnet 

[Mainnet](https://docs.filecoin.io/networks/overview/available-networks/%23mainnet&sa=D&source=editors&ust=1674147484246936&usg=AOvVaw0Q8aXd92roXqWuypwDSBBX) is the live production network that all nodes on the Filecoin network are connected to. It never resets.

### Calibration testnet

[Calibration](https://docs.filecoin.io/networks/overview/available-networks/%23calibration&sa=D&source=editors&ust=1674147484247293&usg=AOvVaw3My7r2akNWZiA_lEbLJ1Oz) testnet is the most realistic simulation of the mainnet, where prospective storage providers can experience more realistic sealing performance and hardware requirements due to the use of final proofs constructions and parameters, and prospective storage clients can store and retrieve real data on the network. Clients can participate in deal-making workflows and storage/retrieval functionality. It also has the same sector size as mainnet.

- Public endpoint: [https://api.calibration.node.glif.i](https://api.calibration.node.glif.io/rpc/v0&sa=D&source=editors&ust=1674147484247708&usg=AOvVaw0u9YCwkFdJnzp1luGEZZkD)[o/rpc/v0](https://api.calibration.node.glif.io/rpc/v0&sa=D&source=editors&ust=1674147484247892&usg=AOvVaw2v0ZpCMofN-_N5NwsBcari)
- Blockchain explorer: [https://calibration.filscan.io/](https://calibration.filscan.io/&sa=D&source=editors&ust=1674147484248185&usg=AOvVaw2w0Cy2DSs63TApLDFw9WSz)
- Faucet: [https://faucet.calibration.fildev.network/](https://faucet.calibration.fildev.network/&sa=D&source=editors&ust=1674147484248498&usg=AOvVaw0cFTrKRBvrfbwhOCK-ahK1) 

### Hyperspace testnet

[Hyperspace](https://github.com/filecoin-project/testnet-hyperspace&sa=D&source=editors&ust=1674147484248855&usg=AOvVaw3kD1WYwLJUd72HvXfXWenE) testnet is the main pre-production developer testnet which is more stable and reliable. The Hyperspace testnet is a pre-production developer focused testnet, it resets only in the event of irrecoverable damage. Developers are welcomed to build and test their toolings, applications, smart contracts etc on this network.

- Public endpoint: [https://api.hyperspace.node.glif.io/rpc/v0](https://api.hyperspace.node.glif.io/rpc/v0&sa=D&source=editors&ust=1674147484249267&usg=AOvVaw2gjuhQr6h9sqGSqDj8uMot)
- Blockchain explorer: [https://explorer.glif.io/?network=hyperspace](https://explorer.glif.io/?network%3Dhyperspace&sa=D&source=editors&ust=1674147484249567&usg=AOvVaw17jVoHPJNDo3Bh-N2OKsTz) 
- Faucet: [https://hyperspace.filtest.network/#faucet](https://hyperspace.filtest.network/%23faucet&sa=D&source=editors&ust=1674147484249928&usg=AOvVaw1D2yPJG-nhAEyLV0yi9E27)

### Wallaby testnet

[Wallaby](https://github.com/filecoin-project/testnet-wallaby/&sa=D&source=editors&ust=1674147484250250&usg=AOvVaw020jTMXQdGqzyw-rMVExTA) testnet is a bleeding-edge test network for the programmability features being developed for the FVM. You can deploy EVM-compatible smart contracts to Wallaby. Wallaby is reset every week, making it unsuitable for long-term testing of applications. The purpose of Wallaby is to allow developers to quickly poke and prod at any new features released within the latest development builds of the FVM. The Wallaby test is intended to be used by: the FVM engineering team to test FEVM releases and updates, early builders from the community to test EVM smart contract deployment on FVM, and to deploy native FVM actors.

You can find [Wallaby-specific documentation](http://kb.factor8.dev/docs/filecoin/testnets/wallaby&sa=D&source=editors&ust=1674147484250612&usg=AOvVaw1oYhw9JpWeLrlhI7ZoqtHB) here.

- Public endpoint: [https://wallaby.node.glif.io/rpc/v0](https://wallaby.node.glif.io/rpc/v0&sa=D&source=editors&ust=1674147484250892&usg=AOvVaw0kR0Yy732gPgCek-6k-QqM) 
- Blockchain explorer: [https://wallaby.filfox.info/en](https://wallaby.filfox.info/en&sa=D&source=editors&ust=1674147484251220&usg=AOvVaw2pcwlDyfIvWdC5yhVi1D16)
- Faucet:  [https://wallaby.network/#faucet](https://wallaby.network/%23faucet&sa=D&source=editors&ust=1674147484251572&usg=AOvVaw1r3dXEaUXlCD51OmZWjk8e)

Filecoin has a number of block explorers that allow you to view individual transactions and messages across the Filecoin network. This is some of the block explorers that support the FVM testnets:

- [Glif](https://explorer.glif.io/actor/?network%3Dwallaby&sa=D&source=editors&ust=1674147484251988&usg=AOvVaw2eM9oifMb-ITf0zGE4ysr5)
- [Filexplorer](https://explorer.filmine.io/&sa=D&source=editors&ust=1674147484252325&usg=AOvVaw2NVjQ5fJjCO3wv0NxHV1Vu)

There are a number of dev tools available for developing on Filecoin, some example libraries are:

- [Filecoin.solidity](https://docs.zondax.ch/fevm/filecoin-solidity/&sa=D&source=editors&ust=1674147484252707&usg=AOvVaw1G1AHhwFGOY8imXshSHVE3): in the context of the Filecoin EVM, a Solidity library is required in order to allow Solidity smart contracts to seamlessly call methods on Filecoin built-in actors, as well as to access Filecoin specific syscalls idiomatically.
- [F](https://github.com/Zondax/filecoin-signing-tools&sa=D&source=editors&ust=1674147484253062&usg=AOvVaw1fKrsLLihJyUHzatkMXcxH)[ilecoin-signing-tools](https://github.com/Zondax/filecoin-signing-tools&sa=D&source=editors&ust=1674147484253223&usg=AOvVaw2H7_vj_D0KT3uTZLh2UB2E): it is a JSON RPC library for creating signed messages in the Filecoin network.

## The end

That’s it! Congratulations, you have made it to the end of Filecoin introduction! We look forward to seeing what you would build on top of the growing Filecoin ecosystem.

Have fun building!
