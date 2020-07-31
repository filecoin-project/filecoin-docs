---
title: Filecoin FAQ
description: Filecoin frequently asked questions.
---

# Filecoin FAQ

[[toc]]

### How do I get started with Filecoin and the broader web3 space?

- You can start from checking out the tutorials from [Protoschool](https://proto.school/#/tutorials)
- Participate in the hackathon and future events of [Filecoin Ignite](https://ignite.fil.events/)
- Check out the different tools to [build dApps on Filecoin](https://blog.textile.io/)

### What are some of the primary use cases for Filecoin at mainnet launch?

Filecoin is a protocol that provides core primitives enabling a truly trustless decentralized storage network. These primitives and features include cryptographic storage proofs (that are publicly verifiable so you can trust that when a miner says they're storing your data, they actually are), cryptoeconomic mechanisms (see our recent description of Filecoin's cryptoeconomics [here](https://filecoin.io/blog/filecoin-cryptoeconomic-constructions/)), and a public blockchain. Filecoin provides these primitives to solve the really hard problem of creating a truly trustless decentralized storage network.

On top of the core Filecoin protocol, there are a number of "layer 2 solutions" -- many incorporating [IPFS](https://ipfs.io/) -- that enable a broad array of use cases and applications. These solutions include Powergate, Textile Hub, and more. Using these solutions, any use case that can be built on top of IPFS can also be built on Filecoin.

Some of the primary areas for development expected on Filecoin around mainnet launch are:

- Additional developer tools and layer 2 solutions/libraries that strengthen Filecoin as a developer platform and ecosystem
- IPFS apps that rely on decentralized storage solutions and want a decentralized data persistence solution as well
- Financial tools and services on Filecoin, e.g. wallets, signing libraries, and more
- Beginnings of verified storage solutions -- applications that use Filecoin's publicly verifiable cryptographic proofs in order to provide trustless and timestamped guarantees of storage to their users

### How can a website app be free on a network where retrieval is monetary?

Several existing websites support file downloads entirely through ads. All of those types of websites could be easily replaced with a Filecoin incentivized retrieval setup, paying small amounts of FIL (Filecoin tokens) directly for whatever files you were hoping to download (e.g. trying to download mods for games). Several large datasets are hosted through Amazon's "pay per download" S3 buckets, which Filecoin retrieval could also easily augment or replace.

### How will Filecoin attract developers to use Filecoin for storage?

It's going to require a pretty major shift in how we think about the internet. But at the same time, it is a very exciting shift, and things are heading that way (slowly) in general. Browser vendors and major tech companies are getting more into decentralized tech and crypto (see Brave, Opera, and Firefox's dWeb experiments).

We think the internet must return to its decentralized roots in order to be resilient, robust, and efficient enough for the challenges of the next several decades. Early developers in the Filecoin ecosystem are those who believe in that same vision and potential for the internet, and we're excited to work with them to build this space.

### When shall we expect to get the detailed params of the Filecoin's cryptoeconomics?

We are still finalizing our cryptoeconomic parameters and they will continue to evolve. We will post on our blog when the parameters have been finalized.

### How expensive will Filecoin storage be at launch?

As Filecoin is a free market, the price will be determined by a number of variables related to the supply and demand for storage, so it’s difficult to predict before launch. However, a few design elements of the network helps support inexpensive storage, especially initially.

Along with revenue from active storage deals, Storage Miners receive block rewards, where the expected value of winning a given block reward is proportional to the amount of storage they have on the network. These block rewards are weighted heavily towards the early days of the network (with the frequency of block rewards exponentially decaying over time). As a result, Storage Miners are relatively incentivized to charge less for storage to win more deals, which would increase their expected block reward - and this is especially true in the early days.

Further, Filecoin introduces a concept called “Verified Clients” where clients can be verified to actually be storing useful data. Storage Miners who store data from Verified Clients also increase their expected block reward. Anyone running a Filecoin-backed IPFS Pinning Services should qualify as a Verified Client. We do not have the process of verification finalized, but we expect it to be lightweight (e.g., submitting Github profile).

### Will it be cheaper to store data on Filecoin than other centralized cloud services? If yes, when it is anticipated to occur?

Filecoin creates a hyper-competitive market for data storage – there will be many miners offering many prices, rather than one fixed price on the network. We expect Filecoin’s permissionless model and low barriers to entry to result in some very efficient operations and low-priced storage, but it’s impossible to say what exact prices will be until the network is live.

### When will Filecoin mainnet launch?

As we announced in our [roadmap update](https://filecoin.io/blog/roadmap-update-june-2020/), we’re continuing to make good progress towards mainnet launch, aiming towards the end of our mainnet launch window. However, all dates are still best-effort optimistic estimates - our top priority is to launch a secure and successful network.

### What happens to the existing content on IPFS once Filecoin launches? What if nodes continue to host content for free and undermine the Filecoin incentive layer?

IPFS will continue to exist as it is, enhanced with Filecoin nodes. There are many use cases that require no financial incentive. Think of it like IPFS is HTTP and Filecoin is a storage cloud like S3 – only a fraction of IPFS content will be there.

People with unused storage who want to earn monetary rewards, should pledge that storage to Filecoin, and clients who want guaranteed storage should store that data with Filecoin miners.

### How big will the deals be that the bot tries to make with miners during Incentivized Testnet?

You can expect data ranges from a few kilobytes up to full 32GiB sectors.

### Will the 5PB big miner incentive be included or excluded in the 4M incentives?

The mechanisms for the incentive competition are [here](https://filecoin.io/blog/announcing-testnet-incentives/).

### Lotus or Go-Filecoin, which is better for miners?

Lotus is the primary reference implementation for the Filecoin protocol. At this stage, we would recommend most miners use lotus to participate in the Filecoin network.

### What is your recommendation on the right hardware to use?

While the Filecoin team does not recommend any specific hardware configuration, [we did share some setups](https://filecoin.io/blog/announcing-testnet-incentives/#hardware) setups we’ve used for various types of testing. We also recently published [this guide to storage mining](https://filecoin.io/blog/filecoin-guide-to-storage-mining/) that we recommend miners read through before deciding to storage mine. However, it is overwhelmingly likely that there are more efficient setups, and we strongly encourage miners to test and experiment to find the best combinations.

### We are worried about the ability for our network to handle the additional overhead of running a Filecoin node and still provide fast services for our customers. What are the computational demands of a Lotus node? Are there any metrics for node performance given various requirements?

As we approach launch, our Testground team is prioritizing getting metrics to understand the performance of Lotus nodes; we will share these as they are determined. We are also still tweaking node and network design parameters, so these numbers will continue to improve significantly over the next few months.

### We bought a lot of hard drives of data through the Discover project. When will they be shipped to China?

There are a number of details that are still being finalized between the verified deals construction and the associated cryptoeconomic parameters.

Our aim is to allow these details to finalize before shipping, but given timelines, we’re considering enabling teams to take receipt of these drives before the parameters are set. We will publish updates on the status of the Discover project on the Filecoin blog.

### Is there a KYC certification process for miners? How does it work? How will you verify the geographical location of miners?

To receive tokens, miners will be required to verify their identity by providing passports or similar identity documents. We may need to request additional information in rare cases.

We’ll use a variety of technical and non-technical mechanisms. They may also be different for different miners. To avoid cheating, we’re not revealing the specific mechanisms until verification begins.

When we verify miners’ locations, we’ll reach out by email and coordinate a time that the miner will be standing by to provide verification. We’ll ask for some specific evidence and require submission within a short time period.

Location verification is not required to participate in either (i) the global leaderboard or (ii) the regional leaderboard for the most competitive region (i.e., the region with the most storage).

We consider the location of the storage and sealing hardware to be the location of the miner.

Please note that miners who attempt to “spoof” their location will be completely ineligible for all rewards.

### Does Filecoin reward network or main network line machine need a fixed IP?

For mainnet, you will need a public IP address, but it doesn’t need to be fixed (just accessible).

### What if we lost a sector accidentally, is there any way to fix that?

If you lost the data itself, then no, there’s no way to recover that, and you will be slashed for it. If the data itself is recoverable, though (say you just missed a Windowed PoSt), then the Recovery process will let you regain the sector.

### Has Filecoin confirmed the use of SDR algorithm? Is there any evidence of malicious construction?

SDR is confirmed for mainnet launch, and we have no evidence of malicious construction. The algorithm is also going through both internal and external security audits.

If you have any information about any potential security problem or malicious construction, reach out to our team at security@filecoin.org.

### How likely is it that the Filecoin protocol will switch to the NSE Proof-of-Replication construction later?

About NSE: NSE is one of the best candidates for a proof upgrade, and teams are working on implementation. But there are other candidates too, which are promising as well. It may be that another algorithm ends up better than NSE -- we don’t know yet. Proof upgrades will arrive after mainnet launch and will coexist.

AMD may be optimal hardware for SDR. You can [see this description](https://github.com/filecoin-project/lotus/blob/master/documentation/en/sealing-procs.md) for more information on why.

### How are you working to bootstrap the demand side of the marketplace? The Discover program is nice but who is the target market for users and how do you get them?

In addition to Filecoin Discover, a number of groups are actively building tools and services to support adoption of the Filecoin network with developers and clients. For example, check out the recordings from our [Virtual Community Meetup](https://filecoin.io/blog/filecoin-virtual-community-meetup-recap/) to see updates about Textile Powergate and Starling Storage. You can also read more about some of the teams building on Filecoin through HackFS in our [HackFS Week 1 Recap](https://filecoin.io/blog/hackfs-teams-vol-1/).

### Does Filecoin have an implementation of client and miner order matching through order books?

There will be off-chain orderbooks and miner marketplaces -- some are in development now from some teams. They will work mostly off-chain, because transactions per second on chain is not enough for the volume of usage we expect on Filecoin. These orderbooks build on the basic deal-flow on chain. These orderbooks will arrive in their own development trajectory -- most likely around or soon after mainnet launch.

### Why does Filecoin mining work best on AMD?

Currently, Filecoin's Proof of Replication (PoRep) prefers to be run on AMD processors. See this description of Filecoin sealing for more information. More accurately, it runs much much slower on Intel CPUs. It runs competitively fast on some ARM processors, like the ones in newer Samsung phones, but they lack the RAM to seal the larger sector sizes. The main reason that we see this benefit on AMD processors is due to their implementation of the SHA hardware instructions.

### What are the changes to the algorithm and logic layer of lotus and go-filecoin before going online?

There will be no changes to algorithm and logic before we go live -- from here on out, all we’re doing is fixing bugs (so please report them!), improving performance (our sync is much faster on the latest Testnet), and improving the UX with new APIs and documentation.

### How will network retrieval of real data be measured and assessed on an incentivized testnet?

During the competition, once your miner has > 0 storage power, many bots will begin attempting storage and retrieval deals with your miner. The competition dashboard will display your deal success rate in near-real time. Miners below a certain high threshold will be ineligible to receive rewards.

### What do miners have to do to change a committed capacity (CC) sector into a "real-data" sector?

We are reusing much of the existing code path for this first iteration. Miners will publish storage deals that they will upgrade the CC sector with, announce to the chain that they are doing an upgrade, and prove to the chain that a new sector has been sealed correctly. We expect to evolve and make this cheaper and more attractive over time after mainnet.

### For the incentive phase, a miner has to execute the full sector life cycle and terminate the sectors. What does “terminating” the sectors mean?

When a committed capacity sector is added to the chain, it can upgrade to a sector with deals, extend its lifetime, or terminate through either faults or voluntary actions. While we don’t expect this to happen very often on mainnet, a miner may deem it rational to terminate their promise to the network and their clients but accept a penalty for doing so. We want miners to execute the full sector lifecycle to get a flavor of providing long-term and useful storage on Filecoin.

### Does the committed capacity sector still need to be sealed before it upgrades to one with real data?

For the first iteration of the protocol, yes. We have plans to make it cheaper and more economically attractive after mainnet with no resealing required and other perks.

### What’s the minimum time period for the storage contract between the provider and the buyer?

The minimum duration for a deal is set in the miner’s ask. There’s also a practical limitation, because sectors have a minimum duration (currently one month).

### After I made a deal with a miner, and sent my data to them, how exactly is the data supposed to be recoverable and healable if that miner goes down?

Automatic repair of faulted data is a feature we've pushed off until after mainnet launch. For now, the way to ensure resiliency is to store your data with multiple miners, to gain some level of redundancy. If you want to learn more about how we are thinking about repair in the future, [here are some notes](https://github.com/filecoin-project/specs/pull/245/files).

### How do I know that my storage miner will not charge prohibitively high costs for data retrieval?

To avoid extortion, always ensure you store your data with a fairly decentralized set of miners (and note: it's pretty difficult for a miner to be sure they are the only person storing a particular piece of data, especially if you encrypt the data).

Miners currently provide a 'dumb box' interface and will serve anyone any data they have. Maybe in the future miners will offer ACLs and logins and such, but that requires that you trust the miner. The recommended (and safest) approach here is to encrypt data you don't want others to see yourself, before storing it.

### How does updating data with Filecoin work?

We have some really good ideas around 'warm' storage (that is mutable, and provable) that we will probably implement in the near future. But for now, your app will have to treat Filecoin as an append-only log. If you want to change your data, you just write new data.

‘Warm' storage can be done with a small amount of trust, where you make a deal with a miner with a start date quite far in the future. The miner can choose to store your data in a sector now (but they won't get paid for proving it until the actual start date) or they can hold it for you (and even send you proofs of it on request) and you can then send them new data to overwrite it, along with a new storage deal that overwrites the previous one.

There’s a pretty large design space here, and we can do a bunch of different things depending on the levels of trust involved, the price sensitivity, and the frequency of updates clients desire.

### Who will be selected to be verifiers to verify clients on the network?

We don’t have more updates about verifiers at this time. We will post on our blog once we do.

### Will the existence of Filecoin mining pools lead to centralized storage and away from the vision of distributed storage?

No – Filecoin creates a decentralized storage network in part by massively decreasing the barrier to entry to becoming a storage provider. Even if there were some large pools, anyone can join the network and provide storage with just a modest hardware purchase, and we expect clients to store their files with many diverse miners.

Also, note that world location matters for mining: many clients will prefer miners in specific regions of the world, so this enables lots of miners to succeed across the world, where there is storage demand.

### Even though Filecoin will be backed up to our normal IPFS pinning layer, we still need to know how quickly we can access data from the Filecoin network. How fast will retrieval be from the Filecoin network?

If you are retrieving your data from IPFS or a remote pinning layer such as an [FPS](https://github.com/filecoin-project/filecoin-docs/build/core-products/filecoin-backed-pinning-services/), retrieval should take on the order of milliseconds to seconds in the worst case. Our latest tests for retrieval from the Filecoin network directly show that a sealed sector holding data takes ~1 hour to unseal. 1-5 hours is our best real world estimate to go from sector unsealing to ultimate delivery of the data. If you need faster data retrieval for your application, we recommend building on Powergate or an FPS.
