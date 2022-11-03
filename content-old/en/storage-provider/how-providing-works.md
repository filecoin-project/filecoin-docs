---
title: "How providing storage works"
description: "Providing storage to the Filecoin network involves accepting deals and honoring them by inserting proofs in the chain."
menu:
    storageprovider:
        parent: "storage-provider-basics"
---

In most blockchain protocols, _miners_ are the participants on the network that do the work necessary to advance the blockchain and maintain its validity. For providing these services, miners are compensated in the native cryptocurrency. The term _miner_ emerged in the initial Proof-of-Work era, comparing the work done by hardware miners using computational power to secure blockchains with that of gold miners who expended vast physical resources for a chance at a large payout.

Filecoin works quite differently, however -- instead of miners contributing computational power (hashing power), _providers_ contribute important utilities, storage capacity, and retrieval pipeline. Providers make deals with clients to store and retrieve data and receive FIL, Filecoin native cryptocurrency, in return.

On a decentralized, peer-to-peer network like IPFS, we can use cryptographic hashing to confirm that any number of peers are storing exact copies of our data. However, we're depending on the generosity of those parties and have no guarantee that our data will continue to be replicated over time. Filecoin, on the other hand, adds an incentive layer to promote long-term, verifiable storage on the decentralized web.

To see if providing storage and/or retrieval is right for you, consider the requirements and rewards for this growing field of opportunity. As a provider, you can benefit from how it's growing, and you may even have ideas to contribute.  

## Types of providers

The Filecoin network has multiple types of providers:

- _Storage providers_: responsible for storing files and data on the network
- _Retrieval providers_: (under development) will be responsible for providing quick pipes to retrieve files
- _Repair providers_: to be implemented

**Storage providers** are the heart of the network. They earn FIL by storing data for clients and computing cryptographic proofs to verify storage across time, and they earn rewards for adding new blocks of data. The probability of earning transaction fees and block rewards is proportional to the amount of storage the storage provider contributes to the Filecoin network.

**Retrieval providers** will be the veins of the network. They will earn FIL by winning bids and provider fees, determined by the market value of the file they're retrieving. A retrieval provider’s bandwidth and bid/initial-response-time for deals (i.e., speed and how close to the client) will determine its ability to close retrieval deals on the network. The maximum bandwidth of a retrieval provider will set the total quantity of deals it can make.

## Responsibilities

### Hardware requirements

The hardware requirements for providers are very demanding, but once you acquire them, they're not expected to increase in the foreseeable future. Money spent on hardware should provide you with many years of reliable service, paying for itself several times over.

You'll need this hardware, not just to facilitate storage, but also to regularly run some computationally expensive operations, called proofs. You need to regularly run proofs that show that you're continuing to dedicate storage space to the same data you received.

Here's a general idea of the minimum hardware you'll need for providing storage:

- An 8+ core CPU
- 128 GiB of RAM at the very least
- A powerful GPU to speed up SNARK computations
- 1TiB NVMe-based disk space for cache storage
- Additional hard drives for storing _sealed sectors_, the Lotus chain, and more.

For more detail, see:

- [Hardware requirements]({{< relref "hardware-requirements#general-hardware-requirements" >}})
- [ESPA Module 3C - Hardware requirements](https://www.youtube.com/watch?v=RKihuvJpev4&t=126s)

Every provider's situation is different, but to give you an idea of the level of investment and the possible return, here is one example:

For an 18-month period, an investment of $147k covered combined capital expenses, operating expenses, and FIL loan with 15% collateral. In this example, the storage provider received $267k in FIL rewards (starting at $21), for a profit of $120k over 18 months.

See [Filecoin Storage Provider Bootcamp, by ESPA](https://www.youtube.com/watch?v=T-TgPILQD3c) (at 14:47).

### Lotus application

To store files, you'll need to install Lotus.

Lotus is an application that tells computers that follow the same rules how to talk to each other, so providers can store data for clients.

See [Lotus](https://lotus.filecoin.io/lotus/install/prerequisites/).

### Storage provider collateral

Most permissionless blockchain networks require an upfront investment in resources to participate in the consensus. The more power an entity has on the network, the greater the share of total resources it needs to own, both in terms of physical resources and/or staked tokens (collateral).

Filecoin includes three different collateral mechanisms:

- Initial pledge collateral (initial commitment)
- Block reward as collateral (vesting block rewards over time)
- Storage deal provider collateral (aligns incentives between storage provider and client)

See [Filecoin Spec](https://spec.filecoin.io/#section-systems.filecoin_mining.miner_collaterals).

### Gas fees

You must pay a nominal gas fee for resources used for sealing storage. You can set a gas limit, above which a transaction will not execute, allowing for control.

### Storage provider deals

Deals are the core function of the Filecoin network. Each deal represents a storage agreement between a client and a provider.

The provider prepares himself by acquiring the required hardware and storage or retrieval capacity. Providers don't need to advertise their services, as Filecoin does that for them. A storage provider only needs to set their available capacity, duration, and desired price.

However, providers need to monitor their system to acknowledge and respond to offers. Monitoring used to be done by physically sitting in front of a computer, but the field is growing so quickly, that monitoring can now be automated by software created by Filecoin participants for this purpose. See [CID gravity](https://www.cidgravity.com/) for pricing and client management.

Once a client has decided on a provider to store with, they notify the provider that they're interested in the deal. They then lock up sufficient funds in an associated wallet to cover the total cost of the deal. When the provider accepts the storage agreement, they publish the deal to the Filecoin blockchain, committing both parties to the deal.

The client then prepares the data for storage and transfers it to the provider.

See [Preparing and transferring data](https://proto.school/verifying-storage-on-filecoin/02).

### Proofs

#### Sealing: Proof of Replication (PoRep)

Upon receiving all the data, the provider packs the data into a sector (the fundamental storage unit used by Filecoin) and seals it.

Sealing is accomplished by using the first of two kinds of storage proofs:

- Proof of Replication (PoRep)
- Proof of SpaceTime (PoSt)

Proofs are the consensus mechanisms by which users in a peer-to-peer network come to agreement without the need for a central authority. All participants in the network work together to verify each deal.

PoRep is the confirmation that the provider sends the client, so the client can be certain the data is being stored properly, and the execution of the deal has officially begun. PoRep happens just once, at the time the data is first stored by the storage provider. It takes up to 24 hours to seal the data.

Sealing is computation-intense and is performed over a sector that results in a unique representation of the sector. The properties of this new representation are essential to proving that the data has been received and later to prove ongoing storage of the same data.

See:

- [Centralized and decentralized storage](https://proto.school/verifying-storage-on-filecoin/01) Scroll down to Cryptographic proofs.
- [Proof of Replication (PoRep)](https://proto.school/verifying-storage-on-filecoin/03)
- [A Guide to Filecoin Storage Mining](https://filecoin.io/blog/posts/a-guide-to-filecoin-storage-mining/)

#### Proof of SpaceTime (PoSt)

Once the data is sealed, the storage provider is ready to begin submitting ongoing proofs to the chain that the data continue to be stored and remain the same.

Throughout the lifetime of the deal, the provider submits ongoing proofs, PoSt, to the chain. Clients pay incrementally, using the funds they previously locked up.

See [Proof of Spacetime (PoSt)](https://proto.school/verifying-storage-on-filecoin/04).

#### zk-SNARKs

Both the Proof of Replication and Proof of Spacetime processes use zk-SNARKs for compression.

zk-SNARKs stands for "Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge." You can think of them as hashes of computations. They let us prove that a proof has been done correctly without having to reveal the details of the proof itself or the underlying data on which it's based.

zk-SNARKs are an important part of consensus mechanisms on the blockchain, because they enable verification of data without invasion of privacy.

See [zk-SNARKs](https://proto.school/verifying-storage-on-filecoin/05).

### Slashing

_Slashing_ is a set of penalties that are to be paid by storage providers if they fail to provide sector reliability or decide to voluntarily exit the network.

When storage providers agree to store data for a client, they're required to put down collateral. If they fail a Proof of Spacetime at any point during the contract, they'll be penalized with one of several slashing penalties, including:

- Fault fees (offline faulted sector)
- Sector penalties (undeclared faulted sector)
- Termination fees (terminated or removed sector)

Slashing is a key part of the incentivization that encourages good behavior amongst all the players in the Filecoin network.

For more information, see:
- [Verifying your deal](https://proto.school/verifying-storage-on-filecoin/06)
- [slashing]({{< relref "slashing" >}})

### Retrieval provider role

Retrieval providers will play a role at the end of a storage provider deal.

To qualify for this role, a potential retrieval provider will need to perform a Proof of Retrievability (PoR), a compact proof that a target file is intact, in the sense that the client can fully recover it.

## Rewards

### Storage provider power and rewards

Each Filecoin provider has an associated _power_ value in the network that is proportional to the amount of space contributed and determines the chances to win the right to add a block to an epoch (a specific point on the chain). By adding blocks, providers obtain _block rewards_ and collect fees for the messages included in that block.

Additionally, providers submit storage proofs regularly to the chain. This enables them to obtain _storage fees_ from the clients that have made deals with them.

Block rewards are meant to bootstrap the Filecoin network. They decrement as real storage utility and fees take over.

See [Storage provider rewards]({{< relref "storage-provider-rewards" >}}).

### Verified storage deals

Filecoin Plus aims to enable the demand side of the Filecoin network and maximize the amount of useful storage on Filecoin by adding a layer of social trust to the network and introducing a novel resource called DataCap.

DataCap, when allocated to a client, can be spent by the client in storage deals with storage providers. Those deals carry a higher deal quality multiplier, which increases the _quality adjusted power_ of the storage provider on the network by a factor of 10, yielding better block rewards for the storage provider over time.

Clients looking to onboard storage onto the network apply to community-selected Notaries to receive DataCap, which can be used to incentivize storage providers to take storage deals.

Notaries are selected to serve as fiduciaries for the Filecoin Network and are responsible for allocating DataCap to clients with valuable storage use cases.

See [Filecoin Plus]({{< relref "filecoin-plus#frontmatter-title" >}}).

### Retrieval provider fees

_Retrieval providers_ will not be additionally rewarded with the ability to add blocks to the Filecoin blockchain; their only reward will be the fee they extract from the client.

_Retrieval fees_ will be paid incrementally using payment channels, as the retrieval deals are fulfilled by sending portions of the data to the client. This happens off-chain.

## Where do providers fit in the Filecoin network

The Filecoin network is a vibrant ecosystem with various roles that support each other, including storage providers, retrieval providers, Filecoin employees, open-source collaborators, notaries, developers, and clients.

Because of blockchain technology, storage clients don’t need a large, centralized intermediary to guarantee the security and privacy of their data. They can trust anyone who wins a Filecoin deal to store their data privately and securely. In fact, the security is greater, because the data is not subject to a single point of failure.

Unlike centralized systems with a large, captive audience from whom they profit, the decentralized Filecoin ecosystem bootstraps and verifies itself so that everyone benefits from the increased value. The main role of Filecoin employees is to facilitate a strong community.

Your success is a success for the entire ecosystem. When you provide stellar storage service, our reputation increases to attract more clients and providers. In addition, the growing market for storage and retrieval apps attracts application developers to improve our efficiency, making our ecosystem even more attractive.

Because Filecoin is decentralized, no single, central entity determines who can and can't join our network. Instead, Filecoin has built-in objective criteria, such as the blockchain and our protocol, deals, proofs, and other consensus mechanisms, that allow anyone who can perform a role to join. Sharing the mutual benefits of more participants means that we naturally want to bring along new entrants to make the ecosystem stronger.

The openness to new entrants is the lifeblood of decentralized platforms, and providers are key players in leading the way. This is only the beginning, so it's a good time to get on board.

For further information, see:

- Chat and discussion forums: [Chat & discussion forums]({{< relref "chat-and-discussion-forums" >}}).

- Information on Filecoin as a whole and its direction: [Filecoin spec](https://spec.filecoin.io/). The Filecoin spec is a living document that you will want to return to regularly to see changes.

- Filecoin YouTube channel, including videos on the Filecoin Storage Provider Bootcamp: [Filecoin](https://www.youtube.com/channel/UCPyYmtJYQwxM-EUyRUTp5DA) on YouTube.

- A full 7-month training program: [Filecoin Storage Provider Accelerator](https://www.web3espa.io/#journey).

- An example of community activity: [Sling shot](https://slingshot.filecoin.io/), where storage providers compete for rewards for storing curated data.
