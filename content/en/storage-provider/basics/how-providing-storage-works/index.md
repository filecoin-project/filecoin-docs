---
title: "How providing storage works"
description: "Discover the responsibilities and benefits of becoming a storage provider on the Filecoin network. Make deals, store data, and earn Filecoin."
lead: "In most blockchain protocols, _miners_ are the participants on the network that do the work necessary to advance the blockchain and maintain its validity. In Filecoin, instead of miners contributing computational power, _providers_ contribute important utilities such as storage capacity and data retrieval. Providers make deals with clients to store and retrieve data and receive FIL, the Filecoin cryptocurrency, in return. This page describes how providing storage works."
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-basics"
    identifier: "how-providing-storage-works-1e29addf0ea9d46268f68b508d61b89e"
weight: 20
toc: true
aliases:
    - "/storage-provider/how-providing-works/"
    - "/mine/how-mining-works/"
---

On a decentralized, peer-to-peer network like [IPFS](https://docs.ipfs.tech/), we can use cryptographic hashing to confirm that any number of peers are storing exact copies of our data. However, we're depending on the generosity of those parties and have no guarantee that our data will continue to be replicated over time. Filecoin, on the other hand, adds an incentive layer to promote long-term, verifiable storage on the decentralized web.

## Types of providers

The Filecoin network has multiple types of providers:

- _Storage providers_ are responsible for storing files and data on the network, and are discussed on this page.
- _Retrieval providers_, currently being implemented, will be responsible for providing quick retrieval of files.
- _Repair providers_ are not yet implemented.

**Storage providers** are the heart of the network. They earn FIL by storing data for clients and computing cryptographic proofs to verify storage across time, and earn rewards for adding new blocks of data. The probability of earning transaction fees and block rewards is proportional to the amount of storage the storage provider contributes to the Filecoin network.

**Retrieval providers** will be the veins of the network. They will earn FIL by winning bids and provider fees, determined by the market value of the file they're retrieving. A retrieval provider’s bandwidth, bid and initial response time for deals, which are a function of retrieval speed and proximity to the client, will determine ability to close retrieval deals on the network. The maximum bandwidth of a retrieval provider will set the total quantity of deals it can make.

## Responsibilities

### Hardware requirements

The hardware requirements for providers are very demanding. However, the requirements are not expected to increase in the foreseeable future, so money spent on hardware should provide you with many years of reliable service, paying for itself several times over. This hardware is required not only for storage, but also to regularly run computationally expensive operations, called _proofs_. Providers must regularly run proofs that show that they are continuing to dedicate storage space to the same data you received.

Here's a general idea of the **minimum** hardware requirements for providing storage:

- An 8 core CPU
- 128 GiB of RAM
- A powerful GPU to speed up SNARK computations
- 1TiB NVMe-based disk space for cache storage
- Additional hard drives for storing _sealed sectors_, the Lotus chain, and more.

Every provider's situation is different, but to give you an idea of the level of investment and the possible return, here is one example:

For an 18-month period, an investment of $147k covered combined capital expenses, operating expenses, and FIL loan with 15% collateral. In this example, the storage provider received $267k in FIL rewards (starting at $21), for a profit of $120k over 18 months. For more information, see [Filecoin Storage Provider Bootcamp, by ESPA](https://www.youtube.com/watch?v=T-TgPILQD3c) (at 14:47).

### Lotus application

To store files, you'll need to install Lotus. Lotus is the reference implementation for the Filecoin network written in Go and maintained by [Protocol Labs](https://protocol.ai). For more information, see the [Lotus installation prerequisites](https://lotus.filecoin.io/lotus/install/prerequisites/).

### Storage provider collateral

Most permissionless blockchain networks require an upfront investment in resources to participate in the consensus. The more power an entity has on the network, the greater the share of total resources it needs to own, both in terms of physical resources and/or staked tokens, referred to as _collateral_ in Filecoin. Filecoin includes three different collateral mechanisms:

- Initial pledge collateral (initial commitment)
- Block reward as collateral (vesting block rewards over time)
- Storage deal provider collateral (aligns incentives between storage provider and client)

For more information, see the [Filecoin Spec](https://spec.filecoin.io/#section-systems.filecoin_mining.miner_collaterals).

### Gas fees

You must pay a nominal _gas fee_ for resources used for sealing storage. You can set a gas limit, above which a transaction will not execute, allowing for precise control.

### Storage provider deals

_Deals_ are the core function of the Filecoin network. Each deal represents a storage agreement between a client and a provider. The provider prepares themselves by acquiring the required hardware and storage or retrieval capacity. Providers don't need to advertise their services, as the network does that for them. A storage provider only needs to set their available capacity, duration, and desired price. However, providers need to monitor their system to acknowledge and respond to offers. In previous versions of the Filecoin protocol, monitoring was done by physically sitting in front of a computer. As the network has since scaled and this is no longer optimal, monitoring can now be automated via the _CID gravity_ software created by Filecoin participants for this purpose. See [CID gravity](https://www.cidgravity.com/) for pricing and client management. Once a client has decided on a provider to store with, they notify the provider that they're interested in the deal. They then lock up sufficient funds in an associated wallet to cover the total cost of the deal. When the provider accepts the storage agreement, they publish the deal to the Filecoin blockchain, committing both parties to the deal. The client then prepares the data for storage and transfers it to the provider. 

For more information, see [Preparing and transferring data](https://proto.school/verifying-storage-on-filecoin/02).

### Proofs

#### Sealing: Proof of Replication (PoRep)

Upon receiving all the data, the provider packs the data into a sector (the fundamental storage unit used by Filecoin) and seals it. Sealing is accomplished by using Proof of Replication (PoRep). Proofs are the consensus mechanisms by which users in a peer-to-peer network come to agreement without the need for a central authority. All participants in the network work together to verify each deal. PoRep is the confirmation that the provider sends the client, so the client can be certain the data is being stored properly, and the execution of the deal has officially begun. PoRep happens just once, at the time the data is first stored by the storage provider. It takes up to 24 hours to seal the data. Sealing is computation-intense and is performed over a sector that results in a unique representation of the sector. The properties of this new representation are essential to proving that the data has been received and later to prove ongoing storage of the same data.

For more information, see the following resources:

- The **Cryptographic proofs** section in [Centralized and decentralized storage](https://proto.school/verifying-storage-on-filecoin/01) Scroll down to .
- [Proof of Replication (PoRep)]({{ < "proofs#proof-of-replication-porep" >}})
- The **Advanced mining considerations** section in [A Guide to Filecoin Storage Mining](https://filecoin.io/blog/posts/a-guide-to-filecoin-storage-mining/). 

#### Proof of SpaceTime (PoSt)

Once the data is sealed, the storage provider is ready to begin submitting ongoing proofs to the chain that the data continue to be stored and remain the same. Throughout the lifetime of the deal, the provider submits ongoing proofs, called Proof of SpaceTime (PoSt), to the chain. Clients pay incrementally, using the funds they previously locked up.

For more information, see [Proof of Spacetime (PoSt)]({{ < "proofs#proof-of-replication-porep" >}}).

#### zk-SNARKs

Both the Proof of Replication and Proof of Spacetime processes use _Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge_, abbreviated as zk-SNARKs, for compression. A zk-SNARK can be can be thought of as hashes of computations. They let us prove that a proof such as PoRep or PoST has been done correctly without revealing the details of the proof itself or the underlying data on which it's based; hence the use of the term "Zero-Knowledge". Because they enable verification of data without invasion of privacy, zk-SNARKs are an important part of consensus mechanisms on the blockchain. For more information, see [zk-SNARKs](https://proto.school/verifying-storage-on-filecoin/05).

### Slashing

_Slashing_ occurs when a storage provider fails to provide sector reliability or decides to voluntarily exit the network, for which they are assessed a set of financial penalties.
When storage providers agree to store data for a client, they're required to provide collateral. If the storage provider fails a Proof of Spacetime at any point during the contract, they'll be penalized with one of several slashing penalties, each of which is applied in different circumstances:

- Fault fees, applied for an offline faulted sector.
- Sector penalties, applied for an undeclared faulted sector.
- Termination fees, applied for a terminated or removed sector.

Slashing is a key part of the incentivization that encourages good behavior amongst all the players in the Filecoin network.

For more information, see:

- [Verifying your deal](https://proto.school/verifying-storage-on-filecoin/06)
- [slashing]({{< relref "slashing" >}})

### Retrieval provider role

Retrieval providers play a role at the end of a storage provider deal. To qualify for this role, a potential retrieval provider will need to perform a Proof of Retrievability (PoR), a compact proof that demonstrates that the target file is intact, in the sense that the client can fully recover it.

## Rewards

### Storage provider power and rewards

Each Filecoin provider has an associated _power_ value in the network that is proportional to the amount of space contributed and determines the chances to win the right to add a block to an epoch (a specific point on the chain). By adding blocks, providers obtain _block rewards_ and collect fees for the messages included in that block. Additionally, providers submit storage proofs regularly to the chain. This allows them to obtain _storage fees_ from the clients that have made deals with them.Block rewards are meant to bootstrap the Filecoin network. They decrement as actual storage utility and fees take over.

### Verified storage deals

Filecoin Plus aims to enable the demand side of the Filecoin network and maximize the amount of useful storage on Filecoin by adding a layer of social trust to the network and introducing a novel resource called _DataCap_.
When allocated to a client, DataCap can be spent by the client in storage deals with storage providers. Those deals carry a higher deal quality multiplier, which increases the _quality adjusted power_ of the storage provider on the network by a factor of 10, yielding better block rewards for the storage provider over time. Clients looking to onboard storage onto the network apply to community-selected _Notaries_ to receive DataCap, which can be used to incentivize storage providers to take storage deals. Notaries are selected to serve as fiduciaries for the Filecoin Network and are responsible for allocating DataCap to clients with valuable storage use cases.

For more information, see [Filecoin Plus](https://docs.filecoin.io/store/filecoin-plus/#frontmatter-title).

### Retrieval provider fees

_Retrieval providers_ will not receive additional rewards with the ability to add blocks to the Filecoin blockchain; their only reward will be the fee they extract from the client. _Retrieval fees_ will be paid incrementally using payment channels, as the retrieval deals are fulfilled by sending portions of the data to the client. This happens off-chain.

## Where Storage Providers fit in the Filecoin network

The Filecoin network is a vibrant ecosystem with various roles that support each other, including storage providers, retrieval providers, Filecoin employees, open-source collaborators, notaries, developers, and clients. Because of blockchain technology, storage clients don’t need a large, centralized intermediary to guarantee the security and privacy of their data. Instead, they can trust anyone who wins a Filecoin deal to store their data privately and securely. In fact, the security is greater, because the data is not subject to a single point of failure and can be verified cryptographically.

Unlike centralized systems with a large, captive audience from whom they profit, the decentralized Filecoin ecosystem bootstraps and verifies itself so that everyone benefits from the increased value. The main role of Filecoin employees is to facilitate a strong, decentralized community around data storage and retrieval. Because Filecoin is decentralized, no single, central entity determines who can and can't join our network. Instead, Filecoin uses transparent and objective criteria, such as blockchain properties, deals, proofs, and consensus mechanisms, to determine who can participate. These allow anyone who can perform a role that is important to the network to join. 

Every storage providers success is a success for the entire ecosystem. When you provide stellar storage service, the reputation of the network increases, thereby attracting more clients and providers. In addition, the growing market for storage and retrieval apps attracts developers that build applications that increase network efficiency, making the ecosystem even more appealing.

This is only the beginning for the Filecoin network, so it's a good time to get on board. For further information, see the:

- [Chat & discussion forums](https://docs.filecoin.io/about-filecoin/chat-and-discussion-forums/).
- [Filecoin spec](https://spec.filecoin.io/). 
- [Filecoin YouTube channel, including videos on the Filecoin Storage Provider Bootcamp](https://www.youtube.com/channel/UCPyYmtJYQwxM-EUyRUTp5DA).
- [Filecoin Storage Provider Accelerator](https://www.web3espa.io/#journey), a 7-month training program for storage providers.
- [Slingshot program](https://slingshot.filecoin.io/), where storage providers compete for rewards for storing curated data.
