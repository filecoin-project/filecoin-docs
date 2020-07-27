---
title: Mining in Filecoin
description: An overview of everything mining-related on the Filecoin network.
---

# Mining in Filecoin

In most blockchain protocols, "miners" are the participants on the network that do the work necessary to advance the blockchain and maintain its validity. For providing these services, miners are compensated in the native cryptocurrency. The term "miner" emerged in the initial Proof-of-Work era, comparing the work done by hardware miners using computational power to secure blockchains with that of gold miners whom expended vast physical resources for a chance at a large payout.

Mining in Filecoin works quite differently however -- instead of contributing computational power, miners contribute storage capacity to be used in deals with clients looking to store data.

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

## Hardware recommendations

The current recommended system specifications for operating a storage miner are:

- An 8+ core CPU
- A NVIDIA-manufactured GPU chip (to be expanded on)
- A dedicated SSD to act as a large cache store (512GB+)
- A large amount of RAM for computing data replication (128GB+)

### Aren't these requirements relatively high?

Indeed, compared to the hardware requirements of running a Proof-of-Stake validator, these benchmarks are much higher -- though are certainly worth it. As these will not increase for the presumable future, money spent on hardware for Filecoin mining will provide users with many years of reliable service, paying for themselves several times over. Think of the investment as running a small cloud storage business; to launch one on the existing data hosting model, it would cost millions of dollars in infrastructure and logistics to get off the ground. With Filecoin, you are able to do the exact same for only a few thousand dollars, and can also be run out of the comfort of your own home.

## Getting started as a miner

For instructions on getting the Filecoin network running and a miner initialized, see the [Lotus client manual](https://lotu.sh/).

## All about deals

Deals are the core function of the Filecoin network, and represent an agreement made between a client and a miner for a storage 'contract'.

Once a client has decided on a miner to store with based on their available capacity, duration, and desired price, they lock up sufficient funds in an associated wallet to cover the total cost of the deal. The deal is then published once the miner has accepted the storage agreement. By default, all Filecoin miners are set to auto-accept any deal that meets their criteria, though it is possible to disable this for miners that would prefer to manually curate their deals.

After the deal is published, the client then prepares the data for storage and then transfers it to the miner. Upon receiving all of the data, the miner packs the data into a sector , seals it, and begins submitting proofs to the chain. Once the first confirmation has been hit, the client can be certain the data is being stored properly, and the deal has officially begun.

Throughout the lifetime of the deal, the miner submits ongoing proofs to the chain. Clients pay incrementally using the funds they previously locked up. If a proof is missing or delayed, the miner is penalized. More information on this can be found in the [uptime, slashing and penalties](#uptime-slashing-and-penalties) section of this page.

For more comprehensive information on how deals are performed on the Filecoin network, see [this section of the documentation](https://docs.filecoin.io/how-to/store/making-storage-deals/).

## Getting rewards

In Filecoin, miners earn two different types of rewards for their efforts: storage fees and block rewards.

**Storage fees** are the fees paid regularly by clients after a deal has been reached, in exchange for storing data. These fees are automatically deposited into a miner's associated withdrawal wallet as they continue to perform their duties over time, and are briefly locked upon being received.

**Block rewards** are large sums that are given to the miner credited for a new block. Unlike storage fees, these rewards do not come from an associated client; rather, the network "prints" new FIL as both an inflationary measure and an incentive to miners advancing the chain. All active miners on the network have a chance at recieving a block reward, their chance at such being directly proportional to the amount of storage space currently being contributed to the network.

## Uptime, slashing and penalties

"Slashing" is a feature present in most blockchain protocols, and is used to penalise miners that either fail to provide reliable uptime or act maliciously against the network.

In Filecoin, miners are succeptible to two different kinds of slashing: **storage fault slashing**, and **consensus fault slashing**.

**Storage fault slashing** is a term that is used to encompass a broader set of penalties, including (but not limited to) fault fees, sector penalties and termination fees. These penalties are to be paid by miners if they fail to provide sector reliability or decide to voluntarily exit the network.

- A **fault fee** is a penalty that a miner incurs for each day a miner’s sector is offline.
- A **sector penalty:** is a penalty that a miner incurs for a faulted sector that was not declared faulted before a `WindowPoSt` check occurs.
  - The sector will pay a Fault Fee after a Sector Penalty once the fault is detected
- A **termination fee:** is a penalty that a miner incurs when a sector is voluntarily or involuntarily terminated and is removed from the network.

**Consensus fault slashing** is the penalty that a miner incurs for committing consensus faults. This penalty is applied to miners that have acted maliciously against the network’s consensus functionality.

### Window PoSt checks

PoSt (Proof-of-Spacetime) window checks are done to regularly ensure that miners are continuing to host their required sectors as normal. These checks are performed in 24 hour intervals on the network. For each day a miner is inactive it will receive a fault fee, continuing until the associated wallet is empty and the miner is removed from the network. In the case of a faulted sector, there will be an additional sector penalty added immediately following the fault fee.

::: callout
[Learn about PoSt and other verification methods at ProtoSchool](https://proto.school/#/verifying-storage-on-filecoin)
:::
