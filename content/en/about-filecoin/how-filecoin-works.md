---
title: "How Filecoin Works"
description: "An overview of how the Filecoin network operates - binding clients and storage providers through storage and retrieval deals."
menu:
    about:
        parent: "about-filecoin-basics"
weight: 20
---

This page gives a basic introduction to how the Filecoin network operates. While the Filecoin network is similar to other cryptocurrency networks, there are some differences that developers looking to build on the network should be aware of.

## The Network

The Filecoin network is a distributed, peer-to-peer network formed by Filecoin peers who participate in different ways.

Peers communicate over secure channels that they use to distribute information to the network, also known as _gossiping_. These secure channels are used to transfer data among peers and discover other peers. This creates a well-connected swarm in which information like blocks and messages flow swiftly, even when many thousands of peers participate.

## Nodes

_Filecoin nodes_ are peers that sync the Filecoin blockchain and validate the messages in every block to provide a global state of the network.

Filecoin nodes can also publish different types of _messages_ to the network by broadcasting them. For example, a client can publish a message to send FIL from one address to another. Nodes can propose [storage and retrieval deals](#deals) to storage providers and pay for them as they are executed.

Running a Filecoin node is a low-level task that usually implies keeping a program running constantly. There are several Filecoin node implementations in the works, with [Lotus](https://lotus.filecoin.io) being the most advanced.

## Storage providers

Storage providers (SPs) deliver services to the network by executing different types of [deals](#deals). SPs also append new blocks to the chain every 30 seconds, for which they collect FIL rewards. Additional details about types of providers, rewards, and deals execution from the storage provider perspective can be found in the [How providing storage works]({{< relref "how-providing-works" >}}) section.

Running a Filecoin storage provider is a highly-technical task with strong [hardware requirements]({{< relref "../storage-provider/hardware-requirements.md" >}}) The [`lotus-miner` application](https://lotus.filecoin.io) is currently the most advanced implementation of a Filecoin storage provider.

## Deals

There are two main types of deals in Filecoin: _storage deals_ and _retrieval deals_.

### Storage deals

Storage deals are agreements between clients and _storage providers_ to store data on the network. Once a deal is initiated, and the storage provider has received the data to store, it will repeatedly [prove](#proofs) that it is still storing the data so that it can collect [rewards]({{< relref "rewards.md" >}}). If the storage provider cannot prove that they are still storing the data correctly, they are [slashed]({{< relref "../storage-provider/slashing.md" >}}) and lose FIL.

### Retrieval deals

Retrieval deals are agreements between clients and _retrieval providers_ to extract data stored on the network. Unlike storage deals, these deals are fulfilled off-chain using _payment channels_ to incrementally pay for the data received. Storage providers also often provide retrieval functions.

## Proofs

Storage providers must prove that they are storing the data following the terms of a storage deal. That means that:

- They must store all the data submitted by the client.
- They must store it during the whole lifetime of the deal.

Cryptographic proofs are used to these ends, as explained in this article about the [Filecoin proof system](https://filecoin.io/blog/filecoin-proof-system/).

Using _Proof Of Replication (PoRep)_, storage providers demonstrate that they have received all the data and that they have encoded it in a way unique to that storage provider. The process of using their physical storage in a way that no other storage provider is important since this means that two deals for the same data cannot end up re-using the same disk. This proof is provided when the deal starts, and the _sealing_ operation completes.

Once a deal is active the storage provider will use _Proof of Spacetime (PoSt)_ to prove that it is still storing the data associated with a deal. For PoSt, random storage providers need to prove that random parts of the data they store are still there.

Filecoin clients and other storage providers continuously verify that the proofs included in each block are valid. This process delivers security and stability to the network by penalizing storage providers that do not honor their deals.

## Gas fees

Executing messages consumes both computation and storage resources on the network. _Gas_ is a measure of resources consumed by each message. The gas consumed by a message directly affects the cost that the sender has to pay for it to be included in a new block.

Historically in other blockchains, miners specify a _gas fee_ in a unit of native currency and then pay the block producing miners a priority fee based on how much gas is consumed by the message. Filecoin works similarly, except an amount of the fees is burned (sent to an irrecoverable address) to compensate for the network expenditure of resources, since all nodes need to validate the messages. The idea is based on Ethereum's [EIP1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md).

The amount of fees burned in the Filecoin network is determined by a dynamic `BaseFee` value. The `BaseFee` is automatically adjusted according to the network congestion parameters, also known as _block sizes_. The current value can be obtained from one of the [block explorers]({{< relref "get-started/explore-the-network" >}}) or by inspecting the current head of the chain.

Additionally, a number of gas-related parameters are attached to each message and determine the amount of rewards that storage providers get. Here's an overview of the terms and concepts:

### Gas usage

The amount of gas that a message's execution actually consumes. Currently, nodes do not know how much gas a message will exactly consume ahead of execution, but it can be estimated. `GasUsage` measured in units of _Gas_.

### Base fee

The amount of FIL that gets burned per unit of gas consumed for the execution of every message. It is measured in units of `attoFIL ÷ Gas`.

### Gas limit

A limit on the amount of gas that a message's execution can consume, estimated and specified by the message sender. It is measured in units of `Gas`. The sum of _GasLimit_ for all messages included in a block must not exceed the _BlockGasLimit_. Messages will fail to execute if they run out of _Gas_, and any effects of the execution will be reverted.

### Gas fee cap

The maximum token amount that a sender is willing to pay per `GasUnit` for including a message in a block. It is measured in units of `attoFIL / Gas`. A message sender must have a minimum balance of `GasFeeCap × GasLimit` when sending a message, even though not all of that will be consumed. _GasFeeCap_ can serve as a safeguard against high, unexpected _BaseFee_ fluctuations.

### Gas premium

A priority fee that is paid to the block-producing storage provider. This is capped by _GasFeeCap_. The _BaseFee_ has a higher priority. It is measured in units of `attoFIL ÷ Gas` and can be as low as 1 `attoFIL ÷ Gas`.

### Overestimation burn

An additional amount of gas to burn that grows larger when the difference between `GasLimit` and `GasUsage` is large.

### Total cost

The total cost of a message for a sender will be:

- `GasUsage × BaseFee` FIL + 
- `GasLimit × GasPremium` FIL +
- `OverEstimationBurn` × `BaseFee` FIL

A message will **always pay the burn fee** regardless of the _GasFeeCap_ used. Thus, a low _GasFeeCap_ may result in a reduced _GasPremium_ or even a negative one! In that case, the storage providers that include a message will have to pay the needed amounts out of their own pockets, which means they are unlikely to include such messages in new blocks.

Filecoin implementations may choose the heuristics of how their storage providers select messages for inclusion in new blocks, but they will usually attempt to maximize the storage provider's rewards.

## Actors

Actors are a [software design pattern](https://en.wikipedia.org/wiki/Actor_model) for managing state. Accounts, multisigs, storage providers, and anything with a state, such as an account balance, are implemented as an _actor_.

Actors are the Filecoin equivalent of smart contracts in the Ethereum ecosystem. As such, actors are very central components of the system. Any change to the current state of the Filecoin blockchain has to be triggered through an actor.

## Addresses

In Filecoin, addresses are used to identify actors. There are 4 address types:

- `0` - ID Address
- `1` - SECP256K1 Public Key Address
- `2` - Actor Address
- `3` - BLS Public Key Address

### ID addresses - `f0`

All actors have an ID such as `99`, a short integer assigned to it by the InitActor when the actor is created. An _ID address_ is an actor's ID prefixed with the network (`f` for mainnet) and address type `0` for ID.

For example, the _burn account_ actor on the mainnet has the ID `99` and the ID Address `f099`.

### Public key addresses - `f1` and `f3`

Actors managed directly by users, like accounts, are derived from a public-private key pair. If you have access to a private key, you can sign messages sent from that actor. The public key is used to derive an address for the actor.

Public key addresses allow devices like the Ledger to derive a valid Filecoin address for your account from just the public key. It doesn't need to ask a remote node what your ID address is.

Filecoin supports both secp256k1 addresses that begin with `f1` and BLS addresses that begin with `f3`.

### Robust addresses versus ID addresses

Public key addresses are referred to as "Robust Addresses" as they do not depend on the filecoin chain state.

Actor IDs are defined on-chain by the InitActor. An actor ID can change for a brief time after its creation if the same ID is assigned to different actors on different forks. You can think of ID addresses like a monotonically increasing numeric primary key in a relational database. Where a chain reorg occurs or a rollback in SQL terms, you can end up referring to the same id for different rows. The [Expected Consensus](https://spec.filecoin.io/#section-algorithms.expected_consensus) algorithm will resolve the conflict, and once the state that defines a new ID is old enough (_reaches finality_ in consensus terms), no changes can occur; the ID is bound to that actor forever.

Robust addresses provide a safe way to reference actors before the chain state is final. ID Addresses are used as a space-efficient way to identify actors in the filecoin chain state, where every byte matters, and as a human-friendly, concise form.

### Actor addresses `f2`

Actor addresses provide a way to create robust addresses for actors not associated with a public key. They are the essentially random sha256 hash of the output of the account creation. The ZH storage provider has the Actor Address `f2plku564ddywnmb5b2ky7dhk4mb6uacsxuuev3pi` and the ID address `f01248`.

### BLS Curve `f3`
In addition to secp256k1 `f1` addresses, BLS addresses in Filecoin begin with `f3`. Filecoin uses curve bls12-381 for BLS signatures. Bls12-381 is a pair of two related curves: G1 and G2. Implementations of bls12-381 can vary based on if public keys are on G1 and signatures on G2 or vice-versa.

Filecoin uses G1 for public keys and G2 for signatures as G1 allows for a smaller representation of public keys. This is the same design decision made with ETH2, but contrasts to, for instance, Zcash which has signatures on G1 and public keys on G2.

Also note that Filecoin stores and interprets private keys in little-endian order. This is in contrast to ETH2 keys, which also use bls12-381 but are stored in big-endian order.

## Additional materials

Filecoin is built on top of mature projects like libp2p (networking, addressing, message distribution), IPLD (data formats, encoding, and content-addressed data structures), IPFS (data transfers), and multiformats (future-proof data types).

Here are some links to useful introductory materials about the technology that powers Filecoin and about Filecoin itself:

- IPFS:

  - [A beginner's guide to IPFS](https://hackernoon.com/a-beginners-guide-to-ipfs-20673fedd3f)
  - [IPFS concepts](https://docs.ipfs.tech/concepts/)
  - [ProtoSchool tutorials](https://proto.school/#/tutorials)

- libp2p:

  - [Why libp2p?](https://www.parity.io/blog/why-libp2p)
  - [libp2p: A Modular, p2p Networking Stack](https://www.youtube.com/watch?v=xqVmEzsin3Y)

- Filecoin:
  - [Introducing Filecoin, a decentralized storage network](https://www.youtube.com/watch?v=EClPAFPeXIQ)
  - [Filecoin primer](https://ipfs.io/ipfs/QmWimYyZHzChb35EYojGduWHBdhf9SD5NHqf8MjZ4n3Qrr/Filecoin-Primer.7-25.pdf)
  - [Building the Filecoin ecosystem](https://www.youtube.com/watch?v=SXlTBvcqzz8)
  - [Filecoin features: gas fees](https://filecoin.io/blog/filecoin-features-gas-fees/)
