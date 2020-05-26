---
title: What is Filecoin?
description: Learn more about the relationship and different use-cases between IPFS and Filecoin.
---


# IPFS & Filecoin

Filecoin and IPFS are complementary protocols for storing and sharing data in the decentralized web. While users aren’t required to use Filecoin and IPFS together, the two combined solve significant failings of the current web 2.0 infrastructure. This page aims to explain the relationship between the two protocols and assist users in deciding which option, or combination of options, is best suited for their use-case.

## Incentivizing data reliability

IPFS is a free and open-source network stack protocol that allows users to store and transfer verifiable data with each other. IPFS users persist data on the network by  [pinning](https://docs-beta.ipfs.io/concepts/persistence/#pinning-in-context) data on their own hardware, to a third-party cloud service (known as Pinning Services), or through community-oriented systems where a group of individual IPFS users share resources to ensure the content remains live.

The lack of a built-in incentive mechanism is the challenge that Filecoin hopes to solve by maintaining the efficiency and resiliency provided by the IPFS network, while also allowing users to incentivize long-term distributed storage at competitive prices through a marketplace of storage nodes. 

Development around FIlecoin was and continues to be fully integrated with IPFS, including many shared core team members on both projects; and while other storage markets do exist, including on IPFS, this close relationship under the Protocol Labs umbrella ensures far better guarantees on longevity, reliability and overall user experience.

## Different persistence strategies: which should I use?

Depending on your use case, one or multiple of these persistence strategies might be a good fit for you.

### Using IPFS

As mentioned: in IPFS, data is hosted via network pinning, primarily performed on an entirely voluntary, altruistic basis by other IPFS users. The secondary option is to use a centralized pinning service that utilizes AWS buckets or a similar cloud-service provider to store the data.  This situation is useful where one -- or multiple -- organizations share popular files on an internal network (intranet). For cases where the data isn't shared on an internal network, social contracts can be used to ensure the content remains hosted and maintained long-term.

### Using Filecoin

The final option is to use a decentralized storage marketplace, such as Filecoin. In Filecoin's structure, clients make regular small payments to store data at a specified availability, while miners earn these payments by continuously verifying this data's integrity, storing it, and ensuring it can be retrieved quickly. This allows users to incentivize Filecoin miners to ensure their content will be live when it's needed, a clear advantage over depending solely on the generosity of other network users as required with IPFS.

## Filecoin, powered by IPFS

First, it is important to understand that Filecoin is built _on top of_  IPFS. Filecoin is intended to be a highly integrated and seamless storage market that _leverages_ the underlying functionality provided by IPFS; in this sense, they are connected, but can be implemented completely independent of each other. Users do not _need_ to interact with Filecoin in order to use IPFS.

Some features within Filecoin that are shared with IPFS include:

* The use of [IPLD](https://ipld.io/) for blockchain data structures
* The use of [libp2p](https://libp2p.io/) by Filecoin nodes to establish secure connections with each other
* Messaging between nodes and block propagation in Filecoin are facilitated by [libp2p](https://libp2p.io/) pubsub
* CIDs in Filecoin and IPFS share a hashing specification

 > particular use case sections and content will go here
Suggestion from Johnny:
It might be handy to see an example of how the two protocols work together. Like, if I want the network to pin mars.jpg, how do I go about paying for miners to host it. Stuff like that.
