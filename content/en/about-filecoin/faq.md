---
title: "Filecoin FAQ"
description: "Filecoin frequently asked questions."
menu:
    about:
        parent: "about-filecoin-basics"
weight: 90
---

### What are some of the primary use cases for Filecoin?

Filecoin is a protocol that provides core primitives, enabling a truly trustless decentralized storage network. These primitives and features include publicly verifiable cryptographic storage proofs, [crypto-economic mechanisms](https://filecoin.io/blog/filecoin-cryptoeconomic-constructions/), and a public blockchain. Filecoin provides these primitives to solve the really hard problem of creating a trustless decentralized storage network.

On top of the core Filecoin protocol, there are a number of layer 2 solutions that enable a broad array of use cases and applications, many of which also use [IPFS](https://ipfs.io). These solutions include [Powergate](https://docs.textile.io/powergate/), [Textile Hub](https://blog.textile.io/announcing-the-textile-protocol-hub/), and more. Using these solutions, any use case that can be built on top of IPFS can also be built on Filecoin!

Some of the primary areas for development on Filecoin are:

- Additional developer tools and layer-2 solutions and libraries that strengthen Filecoin as a developer platform and ecosystem.
- IPFS apps that rely on decentralized storage solutions and want a decentralized data persistence solution as well.
- Financial tools and services on Filecoin, like wallets, signing libraries, and more.
- Applications that use Filecoin's publicly verifiable cryptographic proofs in order to provide trustless and timestamped guarantees of storage to their users.

### How can a website or app be free if it costs to retrieve data from the Filecoin network?

Most websites and apps make money by displaying ads. This type of income-model could be replaced with a Filecoin incentivized retrieval setup, where users pay small amounts of FIL for whatever files they're hoping to download. Several large datasets are hosted through Amazon's _pay per download_ S3 buckets, which Filecoin retrieval could also easily augment or replace.

### How will Filecoin attract developers to use Filecoin for storage?

It's going to require a major shift in how we think about the internet. At the same time, it is a very exciting shift, and things are slowly heading that way. Browser vendors like Brave, Opera, and Firefox are investing into decentralized infrastructure.

We think that the internet must return to its _decentralized roots_ to be resilient, robust, and efficient enough for the challenges of the next several decades. Early developers in the Filecoin ecosystem are those who believe in that same vision and potential for the internet, and we're excited to work with them to build this space.

### What are the detailed parameters of Filecoin's crypto-economics?

We are still finalizing our crypto-economic parameters, and they will continue to evolve.

Here is a blog about Filecoin economics from December 2020: [Filecoin network economics](https://filecoin.io/blog/posts/filecoin-network-economics/).

### How expensive will Filecoin storage be at launch?

As Filecoin is a free market, the price will be determined by a number of variables related to the supply and demand for storage. It's difficult to predict before launch. However, a few design elements of the network help support inexpensive storage.

Along with revenue from active storage deals, Storage Miners receive block rewards, where the expected value of winning a given block reward is proportional to the amount of storage they have on the network. These block rewards are weighted heavily towards the early days of the network (with the frequency of block rewards exponentially decaying over time). As a result, Storage Miners are relatively incentivized to charge less for storage to win more deals, which would increase their expected block reward.

Further, Filecoin introduces a concept called _Verified Clients_, where clients can be verified to actually be storing useful data. Storage Miners who store data from _Verified Clients_ also increase their expected block reward. Anyone running a Filecoin-backed IPFS Pinning Services should qualify as a _Verified Client_. We do not have the process of verification finalized, but we expect it to be similar to submitting a GitHub profile.

### Will it be cheaper to store data on Filecoin than other centralized cloud services?

Filecoin creates a hyper-competitive market for data storage. There will be many storage providers offering many prices, rather than one fixed price on the network. We expect Filecoin's permissionless model and low barriers to entry to result in some very efficient operations and low-priced storage, but it's impossible to say what exact prices will be until the network is live.

### What happens to the existing content on IPFS once Filecoin launches? What if nodes continue to host content for free and undermine the Filecoin incentive layer?

IPFS will continue to exist as it is, enhanced with Filecoin nodes. There are many use cases that require no financial incentive. Think of it like IPFS is HTTP, and Filecoin is a storage cloud-like S3 – only a fraction of IPFS content will be there.

People with unused storage who want to earn monetary rewards should pledge that storage to Filecoin, and clients who want guaranteed storage should store that data with Filecoin storage providers.

### Lotus or Venus, which is better for storage providers?

Lotus is the primary reference implementation for the Filecoin protocol. At this stage, we would recommend most storage providers use lotus to participate in the Filecoin network.

### What is your recommendation on the right hardware to use?

While the Filecoin team does not recommend any specific hardware configuration, [we have shared some setups]({{< relref "architectures" >}}). We also published [this guide to storage mining](https://filecoin.io/blog/filecoin-guide-to-storage-mining/) that we recommend storage providers read through before deciding to provide storage. However, it is overwhelmingly likely that there are more efficient setups, and we strongly encourage storage providers to test and experiment to find the best combinations.

### We are worried about the ability of our network to handle the additional overhead of running a Filecoin node and still provide fast services for our customers. What are the computational demands of a Lotus node? Are there any metrics for node performance given various requirements?

For information on Lotus requirements, see [Prerequisites > Minimal requirements](https://lotus.filecoin.io/lotus/install/prerequisites/#minimal-requirements).

For information on Lotus full nodes and lite nodes, see [Types of nodes](https://lotus.filecoin.io/lotus/get-started/use-cases/).

### We bought a lot of hard drives of data through the Discover project. When will they be shipped to China?

There are a number of details that are still being finalized between the verified deals construction and the associated crypto-economic parameters.

Our aim is to allow these details to finalize before shipping, but given timelines, we're considering enabling teams to take receipt of these drives before the parameters are set. We will publish updates on the status of the Discover project on the Filecoin blog.

### Do Filecoin storage providers need a fixed IP?

For mainnet, you will need a public IP address, but it doesn't need to be fixed (just accessible).

### What if we lost a sector accidentally, is there any way to fix that?

If you lost the data itself, then no, there's no way to recover that, and you will be slashed for it. If the data itself is recoverable, though (say you just missed a _WindowPoSt_), then the Recovery process will let you regain the sector.

### Has Filecoin confirmed the use of the SDR algorithm? Is there any evidence of malicious construction?

SDR ([Stacked DRG PoRep](https://spec.filecoin.io/algorithms/porep-old/stacked_drg/#section-algorithms.porep-old.stacked_drg)) is confirmed and used, and we have no evidence of malicious construction. The algorithm is also going through both internal and external security audits.

If you have any information about any potential security problem or malicious construction, reach out to our team at [security@filecoin.org](mailto:security@filecoin.org).

### How likely is it that the Filecoin protocol will switch to the NSE Proof-of-Replication construction later?

Native storage extension (NSE) is one of the best candidates for a proof upgrade, and teams are working on implementation. But there are other candidates too, which are promising as well. It may be that another algorithm ends up better than NSE -- we don't know yet. Proof upgrades will arrive after the mainnet launch and will coexist.

AMD may be optimal hardware for SDR. You can [see this description](https://github.com/filecoin-project/lotus/blob/master/documentation/en/sealing-procs.md) for more information on why.

### How are you working on bootstrapping the demand side of the marketplace? The Discover program is nice, but who is the target market for users, and how do you get them?

In addition to [Filecoin Discover](https://filecoin.io/blog/posts/introducing-filecoin-discover/), a number of groups are actively building tools and services to support the adoption of the Filecoin network with developers and clients. For example, check out the recordings from our [Virtual Community Meetup](https://filecoin.io/blog/filecoin-virtual-community-meetup-recap/) to see updates about Textile Powergate and Starling Storage. You can also read more about some of the teams building on Filecoin through HackFS in our [HackFS Week 1 Recap](https://filecoin.io/blog/hackfs-teams-vol-1/).

### Does Filecoin have an implementation of client and storage provider order matching through order books?

There will be off-chain [order books](https://www.investopedia.com/terms/o/order-book.asp) and storage provider marketplaces -- some are in development now from some teams. They will work mostly off-chain because transactions per second on-chain are not enough for the volume of usage we expect on Filecoin. These order books build on the basic deal-flow on-chain. These order books will arrive in their own development trajectory -- most likely around or soon after the mainnet launch.

### Why does Filecoin mining work best on AMD?

Currently, Filecoin's Proof of Replication (PoRep) prefers to be run on AMD processors. See this description of Filecoin sealing for more information. More accurately, it runs much much slower on Intel CPUs. It runs competitively fast on some ARM processors, like the ones in newer Samsung phones, but they lack the RAM to seal the larger sector sizes. The main reason that we see this benefit on AMD processors is due to their implementation of the SHA hardware instructions.

### What do storage providers have to do to change a committed capacity (CC) sector into a "real-data" sector?

Storage providers will publish storage deals that they will upgrade the CC sector with, announce to the chain that they are doing an upgrade, and prove to the chain that a new sector has been sealed correctly. We expect to evolve and make this cheaper and more attractive over time after the mainnet launch.

### What does "terminating a sector" mean?

When a committed capacity sector is added to the chain, it can upgrade to a sector with deals, extend its lifetime, or terminate through either faults or voluntary actions. While we don't expect this to happen very often on mainnet, a storage provider may deem it rational to terminate their promise to the network and their clients, and accept a penalty for doing so.

### Does the committed capacity sector still need to be sealed before it upgrades to one with real data?

For the first iteration of the protocol, yes. We have plans to make it cheaper and more economically attractive after mainnet with no resealing required and other perks.

### What's the minimum time period for the storage contract between the provider and the buyer?

The minimum duration for a deal is set in the storage provider's ask. There's also a practical limitation because sectors have a minimum duration (currently 180 days).

### After I made a deal with a storage provider and sent my data to them, how exactly is the data supposed to be recoverable and healable if that storage provider goes down?

Automatic repair of faulted data is a feature we've pushed off until after the mainnet launch. For now, the way to ensure resiliency is to store your data with multiple storage providers, to gain some level of redundancy. If you want to learn more about how we are thinking about repair in the future, [here are some notes](https://github.com/filecoin-project/specs/pull/245/files).

### How do I know that my storage provider will not charge prohibitively high costs for data retrieval?

To avoid extortion, always ensure you store your data with a fairly decentralized set of storage providers (and note: it's pretty difficult for a storage provider to be sure they are the only person storing a particular piece of data, especially if you encrypt the data).

Storage providers currently provide a 'dumb box' interface and will serve anyone any data they have. Maybe in the future, storage providers will offer access control lists (ACLs) and logins and such, but that requires that you trust the storage provider. The recommended (and safest) approach here is to encrypt data you don't want others to see yourself before storing it.

### How do you update data stored on Filecoin?

We have some really good ideas around 'warm' storage (that is mutable and provable) that we will probably implement in the near future. But for now, your app will have to treat Filecoin as an append-only log. If you want to change your data, you just write new data.

'Warm' storage can be done with a small amount of trust, where you make a deal with a storage provider with a start date quite far in the future. The storage provider can choose to store your data in a sector now (but they won't get paid for proving it until the actual start date), or they can hold it for you (and even send you proofs of it on request), and you can then send them new data to overwrite it, along with a new storage deal that overwrites the previous one.

There's a pretty large design space here, and we can do a bunch of different things depending on the levels of trust involved, the price sensitivity, and the frequency of updates clients desire.

### Who will be selected to be verifiers to verify clients on the network?

Notaries, selected through an application process, serve as fiduciaries for the Filecoin Network and are responsible for allocating DataCap to clients with valuable storage use cases.

See [Filecoin Plus]({{< relref "filecoin-plus" >}}).

### Will the existence of Filecoin mining pools lead to centralized storage and away from the vision of distributed storage?

No – Filecoin creates a decentralized storage network in part by massively decreasing the barrier to entry to becoming a storage provider. Even if there were some large pools, anyone can join the network and provide storage with just a modest hardware purchase, and we expect clients to store their files with many diverse storage providers.

Also, note that world location matters for mining: many clients will prefer storage providers in specific regions of the world, so this enables lots of storage providers to succeed across the world, where there is storage demand.

### Even though Filecoin will be backed up to our normal IPFS pinning layer, we still need to know how quickly we can access data from the Filecoin network. How fast will retrieval be from the Filecoin network?

If you are retrieving your data from IPFS or a remote pinning layer such as an [FPS]({{< relref "../build/filecoin-pinning-services.md" >}}), retrieval should take on the order of milliseconds to seconds in the worst case. Our latest tests for retrieval from the Filecoin network directly show that a sealed sector holding data takes ~1 hour to unseal. 1-5 hours is our best real-world estimate to go from sector unsealing to delivery of the data. If you need faster data retrieval for your application, we recommend building on Powergate or an FPS.
