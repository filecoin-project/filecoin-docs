---
title: Filecoin FAQ
description: Filecoin frequently asked questions.
---

# Filecoin FAQ

[[toc]]

## Getting Started

### How do ordinary people, not geeks, get involved in this work?

You can start from checking out the tutorials from [Protoschool](https://proto.school/#/tutorials)
Participate in the hackathon and future events of [Filecoin Ignite](https://ignite.fil.events/)
Check out the different tools to [build dapps on Filecoin](https://blog.textile.io/)

### What are some of the primary use cases for Filecoin at mainnet launch?

The primary use case for filecoin at first will be more 'long term' storage applications. Archival, personal backups, etc. As well as applications like existing dapps that don't want to (or 'can't') store their data in traditional ways. There is fairly significant demand among current decentralized applications for a solution to how their data should be stored, and a good number of them already use IPFS (but resort to pinning data themselves, on their servers to ensure the data sticks around). These apps already have wallets built in usually, and adding some sort of micropayment for the data they use isn't too big of a stretch.

### How can a website app be free on a network where retrieval is monetary?

There are a good number of websites out there right now where file downloads are supported entirely through huge amounts of ads (the sort of thing where you click through three pages of ads before you get to your really slow download). All of those types of things could be easily replaced with a filecoin incentivized retrieval setup, paying small amounts of filecoin directly for whatever files you were hoping to download (the biggest one here in my mind is when you're trying to download mods for games). There are also a bunch of large datasets out there that are hosted through amazons 'pay per download' s3 buckets, filecoin retrieval easily competes with that too.

### How is Filecoin supposed to allure to app developers and users to actually work as a service?

It's going to require a pretty major shift in how we think about the internet. But at the same time, a very exciting shift, and things are heading that way (slowly) in general. Browser vendors and major tech companies are getting more into decentralized tech and crypto (see Brave, Opera, and Firefox's dWeb experiments)

### When shall we expect to get the detailed params of the Filecoin's Cryptoeconomic?

We are still finalizing our Cryptoecon parameters and they will continue to evolve. We are looking to solidify more final parameters in late July. Let us know if you have more questions on the structural mechanisms themselves.

### How expensive will Filecoin storage be at launch?

As Filecoin is a free market, the price will be determined by a number of variables related to the supply and demand for storage, so it’s difficult to predict before launch. However, a few design elements of the network helps support inexpensive storage, especially initially.

Along with revenue from active storage deals, Storage Miners receive block rewards, where the expected value of winning a given block reward is proportional to the amount of storage they have on the network. These block rewards are weighted heavily towards the early days of the network (with the frequency of block rewards exponentially decaying over time). As a result, Storage Miners are relatively incentivized to charge less for storage to win more deals, which would increase their expected block reward - and this is especially true in the early days.

Further, Filecoin introduces a concept called “Verified Clients” where clients can be verified to actually be storing useful data. Storage Miners who store data from Verified Clients also increase their expected block reward. Anyone running a Filecoin-backed IPFS Pinning Services should qualify as a Verified Client. We do not have the process of verification finalized, but we expect it to be lightweight (e.g., submitting Github profile).

### How can I confirm the mainnet launch time is on track?

As we announced in our [roadmap update](https://filecoin.io/blog/roadmap-update-june-2020/), we’re continuing to make good progress towards mainnet launch, aiming towards the end of our mainnet launch window. However, all dates are still best-effort optimistic estimates - our top priority is to launch a secure and successful network.

## Miners

### What data size is the bot going to send to miners?

Expect ranges from a few kilobytes up to full 32GiB sectors.

### Will the 5PB big miner incentive be included or excluded in the 4M incentives?

See [https://filecoin.io/blog/announcing-testnet-incentives/](https://filecoin.io/blog/announcing-testnet-incentives/) for the mechanisms for the incentive competition.

### We are worried about the ability for our network to handle the additional overhead of running a Filecoin node and still provide fast services for our customers. What are the computational demands of a Lotus node? Are there any metrics for node performance given various requirements?

As we approach launch, our Testground team is prioritizing getting metrics to understand the performance of Lotus nodes; we will share these as they are determined. We are also still tweaking node and network design parameters, so these numbers will continue to improve - they will likely be orders of magnitude better by launch.

### Is there a miner's KYC certification process?

To receive tokens, miners will be required to verify their identity by providing passports or similar identity documents. We may need to request additional information in rare cases.

We’ll use a variety of technical and non-technical mechanisms. They may also be different for different miners. To avoid cheating, we’re not revealing the specific mechanisms until verification begins.

### How will Filecoin identify the mining location of miners?

When we verify miners’ locations, we’ll reach out by email and coordinate a time that the miner will be standing by to provide verification. We’ll ask for some specific evidence and require submission within a short time period.

Location verification is not required to participate in either (i) the global leaderboard or (ii) the regional leaderboard for the most competitive region (i.e., the region with the most storage).

We consider the location of the storage and sealing hardware to be the location of the miner.

Please note that miners who attempt to “spoof” their location will be completely ineligible for all rewards.

### Would the repair miner have a "budget" that it can spend on delegating new storage miners when previous ones fail? Or are tokens "refunded" when the original storage miner fails, and the repair miner just reallocates it as the budget for a new storage miner contract?

Yes, the repair miner would charge a premium on the underlying storage, assuming some failure rate, and would be responsible for the extra costs if they chose unreliable storage miners to ultimately store the data.

We descoped the repair miner work for mainnet launch as the network is complicated enough without it, and it's relatively straightforward as an upgrade later.

### Does filecoin reward network or main network line machine need a fixed IP?

For mainnet, you will need a public IP address, but it doesn’t need to be fixed (just accessible).

### What if we lost a sector accidentally, is there any way to fix that?

If you lost the data itself, then no, there’s no way to recover that, and you will be slashed for it. If the data itself is recoverable, though (say you just missed a Windowed PoSt), then the Recovery process will let you regain the sector.

### How likely is the NSE algorithm to come on line later? Is AMD's configuration the most consistent with the current SDR algorithm

About NSE: NSE is one of the best candidates for a proof upgrade, and teams are working on implementation. But there are other candidates too, which are promising as well. It may be that another algorithm ends up better than NSE -- we don’t know yet. Proof upgrades will arrive after mainnet launch and will coexist.

Yes, AMD may be optimal for SDR, [see this for why](https://github.com/filecoin-project/lotus/blob/master/documentation/en/sealing-procs.md)

### How are you working to bootstrap the demand side of the marketplace? The Discover program is nice but who is the target market for users and how do you get them?

In addition to Filecoin Discover, a number of groups are actively building tools and services to support adoption of the Filecoin network with developers and clients. For example, check out the recordings from our [Virtual Community Meetup](https://filecoin.io/blog/filecoin-virtual-community-meetup-recap/) to see updates about Textile Powergate and Starling Storage.

A number of other programs, like Filecoin Ignite, will also contribute additional demand, tooling, and usage.

### Why not implement the scheme that the white paper says "miners and clients automatically match orders through order books"？Is it because the LIMITS of TPS?

There will be off-chain orderbooks and miner marketplaces -- some are in development now from some teams. They will work mostly off-chain, because TPS on chain is not enough for the volume of usage we expect on Filecoin. These orderbooks build on the basic deal-flow on chain. These orderbooks will arrive in their own development trajectory -- most likely around or soon after mainnet launch.

### Does the committed capacity sector still need to be sealed before it upgrades to one with real data?

For the first iteration of the protocol, yes. We have plans to make it cheaper and more economically attractive after Mainnet with no resealing required and other perks.

Why does Filecoin mining work best on AMD?
Currently, Filecoin's Proof of Replication (PoRep) prefers to be run on AMD processors. More accurately, it runs much much slower on Intel CPUs (it runs competitively fast on some ARM processors, like the ones in newer Samsung phones, but they lack the RAM to seal the larger sector sizes). The main reason that we see this benefit on AMD processors is due to their implementation of the SHA hardware instructions. Now, why do we use the SHA instruction?

### The Filecoin Client is not usable enough, so how will I give a deal to customers when mainnet launch？

Improving the UX and fixing bugs is our only priority right now. We’re excited to be fixing all the issues the community is reporting, so please keep complaining (file issues on Github, and post in #fil-lotus on Slack).

Clients

### What are the changes to the algorithm and logic layer of lotus and go-filecoin before going online?

There will be no changes to algorithm and logic before we go live -- from here on out, all we’re doing is fixing bugs (so please report them!), improving performance (our sync is much faster on the latest Testnet), and improving the UX with new APIs and documentation.

### How do you realize the reward network retrieval and real data？

During the competition, once your miner has > 0 storage power, many bots will begin attempting storage and retrieval deals with your miner. The competition dashboard will display your deal success rate in near-real time. Miners below a certain high threshold will be ineligible to receive rewards.

We plan to run the bots for one to two weeks before the competition to give miners a chance to test their configuration, and will announce when that begins.

### What do miners have to do to change a committed capacity (CC) sector into a "real-data" sector?

We are reusing much of the existing code path for this first iteration. Miners will publish storage deals that they will upgrade the CC sector with, announce to the chain that they are doing an upgrade, and prove to the chain that a new sector has been sealed correctly. We expect to evolve and make this cheaper and more attractive over time after Mainnet.

### For the incentive phase, what does "terminating" the sectors mean?

When a committed capacity sector is added to the chain, it can upgrade to a sector with deals, extend its lifetime, or terminate through either faults or voluntary actions. While we don’t expect this to happen very often on Mainnet, a miner may deem it rational to terminate their promise to the network and their clients but accept a penalty for doing so. We want miners to execute the full sector lifecycle to get a flavor of providing long-term and useful storage on Filecoin.

### What’s the minimum time period for the storage contract between the provider and the buyer?

The minimum duration for a deal is set in the miner’s ask. There’s also a practical limitation, because sectors have a minimum duration (currently one month).

### After I made a deal with a miner, and sent my data to them, how exactly is the data supposed to be recoverable and healable if that miner goes down?

Automatic repair of faulted data is a feature we've pushed off until after mainnet launch. For now, the way to ensure resiliency is to store your data with multiple miners, to gain some level of redundancy. If you want to learn more about how we are thinking about repair in the future, [here are some notes](https://github.com/filecoin-project/specs/pull/245/files).

### How do I know that whatever miner "takes the burden" would not immediately start asking me ridiculously high prices for retrieval?

To avoid extortion, always ensure you store your data with a fairly decentralized set of miners (and note: it's pretty difficult for a miner to be sure they are the only person storing a particular piece of data, especially if you encrypt the data).

Miners currently provide a 'dumb box' interface and will serve anyone any data they have. Maybe in the future miners will offer ACLs and logins and such, but that requires that you trust the miner. The recommended (and safest) approach here is to encrypt data you don't want others to see yourself, before storing it.

### How does updating data with Filecoin work?

We have some really good ideas around 'warm' storage (that is mutable, and provable) that we will probably implement in the near future. But for now, your app will have to treat Filecoin as an append-only log. If you want to change your data, you just write new data.

‘Warm' storage can be done with a small amount of trust, where you make a deal with a miner with a start date quite far in the future. The miner can choose to store your data in a sector now (but they won't get paid for proving it until the actual start date) or they can hold it for you (and even send you proofs of it on request) and you can then send them new data to overwrite it, along with a new storage deal that overwrites the previous one.

There’s a pretty large design space here, and we can do a bunch of different things depending on the levels of trust involved, the price sensitivity, and the frequency of updates clients desire.

### What are the standards and conditions of the verifier, is there a selected institution to verify, can you tell us about this situation?

There will be several different institutions. We don’t have more updates about Verfiers at this time. We will have more around mid July.

### Will the existence of the Filecoin pool lead to the deviation of centralized storage from the vision of distributed storage?

No – Filecoin creates a decentralized storage network in part by massively decreasing the barrier to entry to becoming a storage provider. Even if there were some large pools, anyone can join the network and provide storage with just a modest hardware purchase, and we expect clients to store their files with many diverse miners.

Also, note that world location matters for mining: many clients will prefer miners in specific regions of the world, so this enables lots of miners to succeed across the world, where there is storage demand.

### How can someone get an audit on global/market-wide pricing quickly enough to make a decision if nearby nodes could "crowd out" smaller and less-reachable nodes with higher prices?

Miner pricing is communicated via signed 'storage asks'. Currently, the software just queries a miner directly for their asks, but that's not necessary. An aggregator service can query asks from a large number of miners, and present those quickly to clients, so clients can ask an aggregator for the best set of miners. Since the asks are signed, and have temporal validity information baked in, clients can trust asks received from anyone.

### Even though Filecoin will be backed up to our normal pinning layer, we still need to know how quickly we can access data from the Filecoin network. How fast will retrieval be?

Our latest tests show that a sector that holds data takes ~1 hour to unseal. 1-5 hours is our best real world estimate.

We are also building a feature that will be available by launch to help with this. When proposing a deal to a storage miner, you can set a flag indicating that you want an extra, unsealed copy of your data to store, making retrieval faster.
