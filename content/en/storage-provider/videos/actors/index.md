---
title: "Filecoin Actors"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-videos"
    identifier: "actors-f4644a7543ec8f041fcf7342e702d5eb"
weight: 100
toc: true
---

This talk given by zenground0 in July of 2022 takes a deep dive into the actors that make up the computational model of the Filecoin protocol. Learn about why Filecoin uses actors, the different types of actors, and what the current eleven available Filecoin actors do. Understand the upgrades that have occurred since mainnet launch. As the Filecoin Virtual Machine (FVM) is developed, the capabilities of Filecoin actors will greatly expand along with the potential for the Filecoin Protocol, by decoupling adding functionality from protocol upgrades and allowing for independent user actors.

{{< youtube "9JbwbTPonv0" >}}

### What are Filecoin actors

Filecoin actors are hard-coded programs that run on the Filecoin blockchain. If you understand Ethereum style smart contracts, you more or less understand Filecoin actors. Actors are written ahead of time (as of the time of writing) by Protocol Lab engineers. Actors are a key aspect of how the Filecoin blockchain protocol operates. 

### The Actor Model and Blockchain Consensus

Blockchain consensus is a way to figure out a shared state. Filecoin uses incremental block appends to accomplish this. You will see a bunch of blocks with some forks. These forks are not used for consensus.

![actors1](1.png)

 Consensus is achieved by finding the longest path through a tree of possible blocks as seen below. The question for us is what does this path mean? In all blockchains, it is a way to find the shared state of the blockchain. 

![Actors2](2.png)

Each block contains a state, as seen below. How does state and paths interact? Well all blockchains share the problem of dealing with payments and fund allocations so lets assume a simple state where we have three addresses and each address has different allocations of Filecoin. 

![Actors3](3.png)

The path through the blockchain represents state transitions over the original state so that when we get to the end of the head, we get to a final state. This final state is agreed upon by all participants in the network. 

For example, maybe we have a message which sends from f900 → f1000 a total of 1 FIL. Afterwards, f1000 then sends 1 FIL to f42. If we play this out over the entire path, we end up with a final state where f1000 has 1 FIL, f42 has 1 FIL, and f900 has 99 FIL. 

![Actors4](4.png)

We have these state transitions, which are associated with a block. We have a starting state and an end state. Filecoin actors are how we organize these state transitions. The internal state machine does this by accessing the entry point within blocks. 

Blocks are made up of two things. Inline data, like the current height of the block and hash pointers (CIDs). 

![Actors5](5.png)

The two main pointers in a block header are the state tree pointer and the messages pointer. State tree pointers points to a giant global map of every actor in the system. The messages pointers are state transitions, where logically the state has changed. Every block contains some amount of messages, which transitions the state from what it was before the block to what it is after the block. 

![Actors6](6.png)

Let’s look at the some leaf level objects inside of the triangles (Merkle trees) above. 

Actors contain four top level things; Filecoin balance, which we recognize from the payment example. There is the nonce, which handles replay attacks in most blockchains. CID pointer to actor code, which is the actual code the actor will execute. Last but not least, there is the CID pointer to actor state which is defined by the actor itself. This means you can write whatever you want in there as an actor and you get control over what bytes your write. At the end of the day, everything you constructed is then compressed into this CID pointer. 

Block messages are pretty much blockchain transactions in regular blockchain parlance. 

![Actors7](7.png)

### Actor Code

We can lean on the Ethereum model for smart contracts in relation to our actor code. We have code that runs and everyone who validates blocks is interacting with these state transitions. From the perspective of the actors, it has code which is separated into a bunch of different methods in a classic state machine style. Actor code takes in every method and takes in parameters from the methods. 

![Actors8](8.png)

What an actor does cannot impact anything else in the system unless it goes through the runtime, which is easy to imagine as the actors window to the world. There are a variety of methods an actor can run, things like reading state CIDs, verifying signatures, and sending, which is how actors interact with each other. Below we look at the characteristics of the message send method.

![Actors9](9.png)

### Filecoin is complicated

Filecoin has actors because Filecoin is complicated. We saw our first example of payments where you send funds from one actor to another. You might think “Why do we need the state machine model with different methods for something as simple as sending funds”? Well as we said, Filecoin is complicated and requires various functions to be available for a lot of different types of actions. 

![Actors10](10.png)

![Actors11](11.png)

Here we have a very simplified version of what the Filecoin actors are doing. The storage provider actors takes in Proofs of Storage and storage power is assigned to the power actor. This information is passed and accounted for by the information sent to the reward actor which in turn rewards the storage provider actor with Filecoin. 

![Actors12](12.png)

Actors also play an important role in securing the network. This is partially why creating actors is hard. Below we have an example where someone figured out a way to create proofs of storage without actually storing the data. 

![Actors13](13.png)

If we made a mistake in the storage provider actor, because its trusted code, a person could receive unearned rewards, fork the chain, exploit other actors, get fake power, and lead to security and consensus failure. 

The other thing that is worth thinking about in terms of actors is the storage market actor flow. This is a way to facilitate client and provider interaction for useful storage of data. Clients will provide deals and those deals will get associated with a storage providers sectors. Clients have flows of Filecoin through the market to the storage provider. 

![Actors14](14.png)

Below is a more expanded view, including Fil+ storage actor flows and rewards.

![Actors15](15.png)

### Future Actors and Two Layers

It looks like the future of actors is split into two actors, system actors and user space actors. Since the launch of mainnet, actors have already changed dramatically. 

- Snark Pack allowed 10x storage onboarding
- Optimistic Window PoSt massively reduced operating gas costs.
- Snap Deals made CC sector upgrades fast and cheap
- Many security vulnerabilities fixed
- May optimizations, fixed and small improvements.

**Why not more?** 

- FIPS (required for any changes to the Filecoin protocol).
    - This requires communication and consensus from the community and generally take a long time.
    - The time required and community input helps ensure secure actions and coding is used.
- Network Upgrade
    - Any changes to actor code requires a full network upgrade.
- Maintenance Costs
    - Any changes to code requires constant maintenance to remain up to date and secure.

### The FVM’s Impact

The FVM is new and exciting as well as being very valuable. I have been writing actor code for a couple of years and I can see the value of FVM. Users will be able to write new actors without FIPs and these actors will be separate from the core actors. New actors can be deployed without the need for a network upgrade and given their removal from the core actors, the new actors are not security critical. The barrier to contribute to the network is lower as you can write and deploy actors at will.  

![Actors16](16.png)

### Verifiable Storage

Filecoin has a totally new functionality which is verifiable storage. This new functionality is built into the Filecoin model. DataDaos manages the preservation of data inside of Filecoin sectors. This is outside the scope of this talk, but I wanted to mention it for awareness. 

![Actors17](17.png)
