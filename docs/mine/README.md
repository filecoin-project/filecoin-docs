---
title: Mining in Filecoin
description: An overview of everything mining-related on the Filecoin network.
breadcrumb: Mine
---

# Mining in Filecoin

In most blockchain protocols, "miners" are the participants on the network that do the work necessary to advance the blockchain and maintain its validity. For providing these services, miners are compensated in the native cryptocurrency. The term "miner" emerged in the initial Proof-of-Work era, comparing the work done by hardware miners using computational power to secure blockchains with that of gold miners whom expended vast physical resources for a chance at a large payout.

Mining in Filecoin works quite differently however -- instead of contributing computational power, miners contribute storage capacity to be used in deals with clients looking to store data.

# Table of Contents

[[TOC]]

## Types of miners

The Filecoin network will have multiple types of miners:

- Storage miners, responsible for storing files and data on the network.
- Retrieval miners, responsible for providing quick pipes to retrieve files.
- Repair miners, which are to be implemented.

**Storage miners** are the heart of the network. They earn Filecoin by storing data for clients, and computing cryptographic proofs to verify storage across time. The probability of earning the block reward and transaction fees is proportional to the amount of storage the miner contributes to the Filecoin network, and not hashing power.

**Retrieval miners** are the veins of the network. They earn Filecoin by winning bids and mining fees for a particular file, which are determined by the market value of said file's size. A retrieval miner’s bandwidth and bid/initial response time for deals (i.e., latency and proximity to clients) will determine its ability to close retrieval deals on the network. The maximum bandwidth of a retrieval miner will set the total quantity of deals it can make.

In the current implementation, the focus is mostly on storage miners, which sell storage capacity in exchange for FIL. The below sections discuss how to initiate, maintain and receive rewards for a storage miner.

### Coming from another ecosystem?

First, welcome! For those coming from Proof-of-Stake or Proof-of-Work development communities, there are a number of concepts and considerations that are unique to Filecoin. While this page provides an overview of the concepts related to mining in particular, more introductory information on what Filecoin is and how it works can be found in [introduction section](../introduction/README.md) of this manual, or head over and try out some related [ProtoSchool tutorials](https://proto.school/#/tutorials)!

## Getting started as a miner

For instructions on getting the Filecoin network running and a miner initialized, see the [Lotus client manual](https://lotu.sh/).

### Hardware recommendations

The current recommended system specifications for operating a storage miner are:

- An 8+ core CPU
- A NVIDIA-manufactured GPU chip (to be expanded on)
- A dedicated SSD to act as a large cache store (512GB+)
- A large amount of RAM for computing data replication (128GB+)

For users wishing to use the Lotus client for the purposes of keeping a wallet or interfacing with the network (and not mining), **a system with 2-4 CPU cores, 8GiB of RAM, and enough storage for the Filecoin blockchain** should be sufficient. (The current testnet chain grows at about 12GiB per week; improvements to reduce this storage requirement are ongoing.)

**Aren't these requirements relatively high?**

Indeed, compared to the hardware requirements of running a Proof-of-Stake validator, these benchmarks are much higher -- though are certainly worth it. As these will not increase for the presumable future, money spent on hardware for Filecoin mining will provide users with many years of reliable service, paying for themselves several times over. Think of the investment as running a small cloud storage business; to launch one on the existing data hosting model, it would cost millions of dollars in infrastructure and logistics to get off the ground. With Filecoin, you are able to do the exact same for only a few thousand dollars, and can also be run out of the comfort of your own home.

### All about deals

Deals are the core function of the Filecoin network, and represent an agreement made between a client and a miner for a storage 'contract'.

Once a client has decided on a miner to store with based on their available capacity, duration, and desired price, they lock up sufficient funds in an associated wallet to cover the total cost of the deal. The deal is then published once the miner has accepted the storage agreement. By default, all Filecoin miners are set to auto-accept any deal that meets their criteria, though it is possible to disable this for miners that would prefer to manually curate their deals.

After the deal is published, the client then prepares the data for storage and then transfers it to the miner. Upon receiving all of the data, the miner packs the data into a sector , seals it, and begins submitting proofs to the chain. Once the first confirmation has been hit, the client can be certain the data is being stored properly, and the deal has officially begun.

Throughout the lifetime of the deal, the miner submits ongoing proofs to the chain. Clients pay incrementally using the funds they previously locked up. If a proof is missing or delayed, the miner is penalized. More information on this can be found in the [uptime, slashing and penalties](#uptime-slashing-and-penalties) section of this page.

For more comprehensive information on how deals are performed on the Filecoin network, see [this section of the documentation](https://docs.filecoin.io/how-to/store/making-storage-deals/).

## Getting rewards

In Filecoin, miners earn two different types of rewards for their efforts: storage fees and block rewards.

**Storage fees** are the fees paid regularly by clients after a deal has been reached, in exchange for storing data. These fees are automatically deposited into a miner's associated withdrawal wallet as they continue to perform their duties over time, and are briefly locked upon being received.

**Block rewards** are large sums that are given to the miner credited for a new block. Unlike storage fees, these rewards do not come from an associated client; rather, the network "prints" new FIL as both an inflationary measure and an incentive to miners advancing the chain. All active miners on the network have a chance at recieving a block reward, their chance at such being directly proportional to the amount of storage space currently being contributed to the network.

### WinningPoSt

WinningPoSt is the mechanism by which storage miners are rewarded for their contributions. In the Filecoin network, time is discretized into a series of epochs – the blockchain’s height corresponds to the number of elapsed epochs. At the beginning of each epoch, a small number of storage miners are elected to mine new blocks (Filecoin utilizes tipsets, which permit multiple blocks to be mined at the same height). Each elected miner who successfully creates a block is granted FIL, as well as the opportunity to charge other nodes fees to include messages in the block.

To further incentivize the storage of “useful” data over simple capacity commitments, storage miners have the additional opportunity to compete for special deals offered by verified clients. Such clients are certified with respect to their intent to offer deals involving the storage of meaningful data, and the power a storage miner earns for these deals is augmented by a multiplier. The total amount of power a given storage miner has, after accounting for this multiplier, is known as **quality-adjusted power**.

### Uptime, slashing and penalties

"Slashing" is a feature present in most blockchain protocols, and is used to penalise miners that either fail to provide reliable uptime or act maliciously against the network.

In Filecoin, miners are succeptible to two different kinds of slashing: **storage fault slashing**, and **consensus fault slashing**.

**Storage fault slashing** is a term that is used to encompass a broader set of penalties, including (but not limited to) fault fees, sector penalties and termination fees. These penalties are to be paid by miners if they fail to provide sector reliability or decide to voluntarily exit the network.

- A **fault fee** is a penalty that a miner incurs for each day a miner’s sector is offline.
- A **sector penalty:** is a penalty that a miner incurs for a faulted sector that was not declared faulted before a `WindowPoSt` check occurs.
  - The sector will pay a Fault Fee after a Sector Penalty once the fault is detected
- A **termination fee:** is a penalty that a miner incurs when a sector is voluntarily or involuntarily terminated and is removed from the network.

**Consensus fault slashing** is the penalty that a miner incurs for committing consensus faults. This penalty is applied to miners that have acted maliciously against the network’s consensus functionality.

### Window PoSt checks

PoSt (Proof-of-Spacetime) window checks are performed on 24 hour intervals across the network to ensure that miners are continuing to host their required sectors as normal. Correspondingly, each storage miner’s set of pledged sectors is partitioned into subsets, one subset for each window. Within a given window, each storage miner must submit a PoSt for each sector in their respective subset. For each day a miner is inactive it will receive a fault fee, continuing until the associated wallet is empty and the miner is removed from the network. In the case of a faulted sector, there will be an additional sector penalty added immediately following the fault fee.

::: callout
[Learn about PoSt and other verification methods at ProtoSchool](https://proto.school/#/verifying-storage-on-filecoin)
:::

## Guildelines for Filecoin Miner operators

Running a public service on the Internet brings a series of challenges that every miner should be aware, specially if it is the first time they are running an Internet service. Filecoin Miner operators are responsible for:

- Running a secure operation following the [Least Priveledge Principle](https://en.wikipedia.org/wiki/Principle_of_least_privilege).
- Protecting the Miner from [DoS (Denial of Service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) attacks.
- Set the miner to be diable by the rest of the network so that it can participate in the deal market.
- Keep the Miner running up to date software that includes all the latest security patches.
- Monitor their node and set up alerts in the case of a undesired event happen, be alerted right away.

In order to support you, Filecoin Miner Operators, we've prepared a few guides to walk you through steps in order to improve your operation. Note, these are just a starting point and not the destination, you will need to customize your own deployment to your own infrastructure and network conditions. The guides are:

- [Improving connectivity](./connectivity.md) through a series of techniques such as port forwarding, relay and VPNs.
- [Setting a static port](./setting-a-static-port.md) so that your firewall and port forwarding stay valid.
- [Proactive mitigation of DoS attacks](./mitigating-dos.md)
