---
title: How Filecoin Works
description: An overview of how the Filecoin network operates - binding clients and miners through storage and retrieval deals.
---

# How Filecoin Works

This page gives a basic introduction to how the Filecoin network operates. While Filecoin is similar to other cryptocurrencies, there are some differences that developers looking to build on the network should be aware of.

## The Network

The Filecoin network is a distributed, peer-to-peer network formed by Filecoin peers who participate in different ways.

Peers communicate over secure channels that they use to distribute information to the network (gossiping), to transfer data among themselves, and to discover other peers, maintaining a well-connected swarm in which information like blocks and messages flows swiftly even when many thousands of peers participate.

## Filecoin nodes

_Filecoin Nodes_ or _Filecoin clients_ are peers that sync the Filecoin blockchain and validate the messages in every block, which, once applied, provide a global state. Nodes can manage [Filecoin wallets](../get-started/lotus/send-and-receive-fil.md) and receive FIL on them.

Filecoin Nodes can also publish different types of _messages_ to the network by broadcasting them. For example, a client can publish a message to send FIL from one address to a different one. Nodes can propose [storage and retrieval deals](#deals) to Filecoin miners and pay for them as they are executed.

Running a Filecoin Node is a low-level task that usually implies keeping a program running 24/7. There are several Filecoin Node implementations in the works, with [Lotus](../store/lotus/README.md) being the most advanced.

## Filecoin miners

The miners provide services to the network by executing different types of [deals](#deals) and appending new blocks to the chain (every 30 seconds), for which they collect FIL rewards. Additional details about types of miners, rewards, and deals execution from the miner perspective can be found in the [How mining works](../mine/how-mining-works.md) section.

Running a Filecoin miner is a highly-technical task with strong [hardware requirements](../mine/hardware-requirements.md), as needed to complete the necessary [proofs](#proofs). The [Lotus Miner](../mine/lotus/README.md) is the most advanced implementation of a Filecoin miner to this day.

## Deals

There are two main types of deals in Filecoin: _storage deals_ and _retrieval deals_.

Storage deals are agreements between clients and _storage miners_ to store some data in the network. Once a deal is initiated, and the miner has received the data to store, it will repeatedly [prove](#proofs) to the chain that it is still storing the data per the agreement so that it can collect [rewards](../mine/mining-rewards.md). If not, the miner will be [slashed](../mine/slashing.md) and lose FIL.

Retrieval deals are agreements between clients and _retrieval miners_ (which may or not be also storage miners) to extract data that is stored in the network (hopefully in a fast and reliable manner). Unlike storage deals, these deals are fulfilled off-chain, using _payment channels_ to incrementally pay for the data received.

## Proofs

As mentioned above, storage miners must prove that they are storing the data per the terms of a deal. That means that:

- They must store all the data submitted by the client
- They must store it during the whole lifetime of the deal

Cryptographic proofs are used to these ends, as explained in this article about the [Filecoin proof system](https://filecoin.io/blog/filecoin-proof-system/).

Using _Proof Of Replication (PoRep)_, miners demonstrate that they have received all the data and that they have encoded it in a way unique to that miner using their physical storage in a way that no other miner can replicate (so two deals for the same data cannot end up re-using the same disk). This proof is provided when the deal starts, and the _sealing_ operation completes.

Once a deal is active and during its full lifetime, the miner will use _Proof of Spacetime (PoSt)_ to prove that it is _still_ storing the data associated with a deal. For PoSt, random miners need to prove that random parts of the data they store are still there.

Filecoin clients and other miners continuously verify that the proofs included in each block are valid, providing the necessary security and penalizing miners that do not honor their deals.

## Gas fees

Executing messages, for example by including transactions or proofs in the chain, consumes both computation and storage resources on the network. _Gas_ is a measure of resources consumed by messages. The gas consumed by a message directly affects the cost that the sender has to pay for it to be included in a new block by a miner.

Historically in other blockchains, miners specify a GasFee in a unit of native currency and then pay the block producing miners a priority fee based on how much gas is consumed by the message. Filecoin works similarly, except an amount of the fees is burned (sent to an irrecoverable address) to compensate for the network expenditure of resources, since all nodes need to validate the messages. The idea is based on Ethereum's [EIP1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md).

The amount of fees burned in the Filecoin network comes given by a dynamic \*_*BaseFee*_ which gets automatically adjusted according to the network congestion parameters (block sizes). The current value can be obtained from one of the [block explorers](../get-started/explore-the-network.md) or by [inspecting the current head](../mine/lotus/message-pool.md).

Additionally, a number of gas-related parameters are attached to each message and determine the amount of rewards that miners get. Here's an overview of the terms and concepts:

- **_GasUsage_**: the amount of gas that a message's execution actually consumes. Current protocol does not know how much gas a message will exactly consume ahead of execution, but it can be estimated (see [prices](https://github.com/filecoin-project/lotus/blob/d678fe4bfa5b4c70bcebd46cdc38aafc452b42d1/chain/vm/gas.go#L87)). GasUsage measured in units of _Gas_.
- **_BaseFee_**: the amount of FIL that gets burned _per unit of gas consumed_ for the execution of every message. It is measured in units of attoFIL/Gas.
- **_GasLimit_**: the limit on the amount of gas that a message's execution can consume, estimated and specified by a message sender. It is measured in units of Gas. The sum of _GasLimit_ for all messages included in a block must not exceed the _BlockGasLimit_. Messages will fail to execute if they run out of _Gas_, and any effects of the execution will be reverted.
- **_GasFeeCap_**: the maximum token amount that a sender is willing to pay per GasUnit for including a message in a block. It is measured in units of attoFIL/Gas. A message sender must have a minimum balance of _GasFeeCap \* GasLimit_ when sending a message, even though not all of that will be consumed. _GasFeeCap_ can serve as a safeguard agains high, unexpected _BaseFee_ fluctuations.
- **_GasPremium_**: a priority fee that is paid to the block-producing miner. This is capped by _GasFeeCap_. The _BaseFee_ has a higher priority. It is measured in units of attoFIL/Gas and can be as low as 1 attoFIL/Gas.
- **_Overestimation burn_**: an additional amount of gas to burn that grows larger when the difference between _GasLimit_ and _GasUsage_ is large. See [current implementation](https://github.com/filecoin-project/lotus/blob/v0.10.0/chain/vm/burn.go#L38)).

The total cost of a message for a sender will be:

- _GasUsage \* BaseFee_ FIL (burned) **+**
- _GasLimit \* GasPremium_ FIL (miner's reward) **+**
- _OverEstimationBurn \* BaseFee_ FIL

An important detail is that a message will always pay the _burn fee_, regardless of the _GasFeeCap_ used. Thus, a low _GasFeeCap_ may result in a reduced _GasPremium_ or even a negative one! In that case, the miners that include a message will have to pay the needed amounts out of their own pockets, which means they are unlikely to include such messages in new blocks.

Filecoin implementations may choose the heuristics of how their miners select messages for inclusion in new blocks, but they will usually [attempt to maximize the miner's rewards](../mine/lotus/message-pool.md).

## Additional materials

Filecoin is built on top of [mature projects](../project/related-projects/) like libp2p (networking, addressing, message distribution), IPLD (data formats, encoding, and content-addressed data structures), IPFS (data transfers), and multiformats (future-proof data types).

Here are some links to useful introductory materials about the technology that powers Filecoin and about Filecoin itself:

- IPFS:

  - [A beginner's guide to IPFS](https://hackernoon.com/a-beginners-guide-to-ipfs-20673fedd3f)
  - [IPFS concepts](https://docs.ipfs.io/concepts/)
  - [ProtoSchool tutorials](https://proto.school/#/tutorials)

- libp2p:

  - [Why libp2p?](https://www.parity.io/why-libp2p/)
  - [libp2p: A Modular, p2p Networking Stack](https://www.youtube.com/watch?v=xqVmEzsin3Y)

- Filecoin:
  - [Introducing Filecoin, a decentralized storage network](https://www.youtube.com/watch?v=EClPAFPeXIQ)
  - [Filecoin primer](https://ipfs.io/ipfs/QmWimYyZHzChb35EYojGduWHBdhf9SD5NHqf8MjZ4n3Qrr/Filecoin-Primer.7-25.pdf)
  - [Building the Filecoin ecosystem](https://youtu.be/SXlTBvcqzz8)
  - [Filecoin features: gas fees](https://filecoin.io/blog/filecoin-features-gas-fees/)
