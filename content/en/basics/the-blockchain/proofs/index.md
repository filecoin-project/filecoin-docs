---
title: "Proofs"
description: ""
lead: "In the Filecoin network, _cryptographic proving systems_, often simply referred to as _proofs_, are used to validate that a storage provider is properly storing data. In Filecoin, this process, generally referred to as _Proof-of-Storage_, consists of two distinct types of proofs, _[Proof of Replication (PoRep)](#proof-of-replication-porep)_ and _[Proof of Spacetime (PoST)](#proof-of-spacetime-post)_, each of which serves a different purpose."
draft: true
images: []
type: docs
menu:
  basics:
    parent: "basics-the-blockchain"
    identifier: "proofs-8abae3f79b34ba2207b6d5e266464ea8"
weight: 100
toc: true
draft: false
---

## Overview

Different blockchains use different _{{< tooltip "cryptographic proving systems" >}}_ (also called _proofs_) based on the exact purpose, goals and functionality of the network. However, regardless of which method is used, proofs have the following in common:

- All blockchain networks achieve _{{< tooltip "consensus" >}}_ through proofs.  
- Proofs incentive network participants to behave in certain ways, and allow the network to penalize participants that do not abide by network standards.
- Proofs allow decentralized systems to agree on network state without a central authority.

Common proof methods include but are not limited to:

- _Proof-of-Work_, a method that only validates blocks if they require a certain amount of computational power to produce.
- _Proof-of-Stake_, a method in which network participants contribute their own cryptocurrency as collateral for the chance to validate blocks.

The Filecoin network aims to provide useful, reliable storage to its participants. With a traditional centralized entity like a cloud storage provider, explicit trust is placed in the entity itself that the data will be stored in a way that meets some minimum set of standards such as security, scalability, retrievability, or replication. Because the Filecoin network is a decentralized network of SPs distributed across the globe (with more being added every day), network participants need an automated, trustless, decentralized way to validate that a SP is doing a good job of handling the data. 

In particular, the Filecoin proof process must verify the data was properly stored at the time of intitial request, and is continuing to be stored based on the terms of the agreement between the client and the SP. In order for the proof processes to be foolproof, the process must:

- Target a random part of the data.
- Occur at a time interval such that it is not possible, profitable, or rational for an SP to discard and re-fetch the copy of data.

In Filecoin, this process, generally referred to as _Proof-of-Storage_, consists of two distinct types of proofs, each of which serves a different purpose:

- [Proof of Replication (PoRep)](#proof-of-replication-porep), a procedure used at time of initial data storage to validate that an SP has _created and stored_ a unique copy of some piece of data.
- [Proof of Spacetime (PoST)](#proof-of-spacetime-post), a procedure to validate that an SP is _continuing to store_ a unique copy of some piece of data.

## Proof-of-Replication (PoRep)

In the Filecoin storage lifecycle process, _Proof-of -Replication (PoRep)_ is used when an SP agrees to store data on behalf of a client, and receives a piece of client data. In this process:

1. The data is placed into a _{{< tooltip "sector" >}}_. 
1. The sector is sealed by the SP.
1. A unique encoding, which serves as proof that the SP has replicated a copy of the data they agreed to store, is generated (described in [Sealing as proof]({{< relref "#sealing-as-proof" >}})).
1. The proof is compressed.
1. The result of the compression is submitted to the network as certification of storage.

### Sealing as proof

The unique encoding created during the sealing process is generated using the following pieces of information:

- The data sealed.
- The storage provider sealing the data.
- The time at which the data was sealed.

In other words, because of the principles of cryptographic hashing, a new encoding will be generated if the data changes, the storage provider sealing the data changes, or the time of sealing changes. Thus, this encoding is unique and can be used to verify that a specific storage provider did in fact store a particular piece of client data at a specific time. 

## Proof-of-Spacetime (PoSt)

After a storage provider has proved that they have replicated a copy of the data that they agreed to store, the SP must continue to prove to the network that:

- They are still storing the requested data.
- The data is available.
- The data is still sealed. 

Because this method is concerned with proving that data is being stored in a particular _space_ for a particular period or at a particular _time_, it is called _Proof-of-Spacetime (PoSt)_. In Filecoin, the PoSt process is handled via two different sub-methods, each of which serve a different purpose:

- [WinningPoSt](#winningpost) is used to prove that _an SP selected via election_ has a replica of the data _at the specific time that they were asked_, and is used in the block consensus process. 
- [WindowPoSt](#windowpost) is used to prove that, _for any and all SPs in the network_, a copy of the data that was agreed to be stored is being _continuously maintained over time_, and is used to continuously audit SPs. 

### WinningPoSt

_WinningPoSt_ is used to prove that _an SP selected via election_ has a replica of the data _at the specific time that they were asked_, and is specifically used in Filecoin to determine which SPs may add blocks the Filecoin blockchain. 

At the beginning of each _{{< tooltip "epoch" >}}_, a small number of SPs are elected to mine new blocks via the [Expected Consensus algorithm](https://spec.filecoin.io/algorithms/expected_consensus/), which guarantees that validators will be chosen based on a probability proportional to their _{{< tooltip "power" >}}_. Each of the SPs selected must submit a WinningPoSt, proof that they have a sealed copy of the data which they have included in their proposed block. The deadline to submit this proof is the end of the current epoch, and was intentionally designed to be short to make it impossible for the SP to spoof the proof. Successful submission grants the SP:

- The _{{< tooltip "block reward" >}}_.
- The opportunity to charge other nodes fees in order to include their messages in the block. 

If an SP misses the submission deadline, no penalty is incurred, but the SP misses the opportunity to mine a block, and receive the block reward. 

### WindowPoSt

_WindowPoSt_ is used to prove that, _for any and all SPs in the network_, a copy of the data that was agreed to be stored is being _continuously maintained over time_, and is used to continuously audit SPs. In WindowPoSt, all SPs must demonstrate the availability of all sectors claimed every _{{< tooltip "proving period" >}}_. Sector availability is not proved individually; rather, SPs must prove a whole _{{< tooltip "partition" >}}_ at once, and that sector must be proved by the deadline assigned (a 30 minute interval in the proving period).

The more sectors an SP has pledged to store, the more the partitions of sectors that the SP will need to prove per deadline. As this requires that the SP have access to sealed copies of each of the requested sectors, it makes it irrational for the SP to seal data every time they need to provide a WindowPoSt proof, thus ensuring that SPs on the network are continuously maintaining the data agreed to. Additionally, failure to submit WindowPoSt for a sector will result in the SPs pledge collateral being forfeited, and their storage power being reduced. 