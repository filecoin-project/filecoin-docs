---
title: Glossary
description: Definitions and usage for Filecoin terminology
---

## Address

In the Filecoin network, an _address_ is a unique cryptographic value that serves to publicly identify a user. This value, a public key, is paired with a corresponding private key. The mathematical relationship between the two keys is such that access to the private key allows the creation of a signature that can be verified with the public key. Filecoin specifically employs the Boneh–Lynn–Shacham (BLS) signature scheme for this purpose.

## Block

In a blockchain, a _block_ is the fundamental unit of record. Each block is cryptographically linked to one or more previous blocks. Blocks typically contain [messages](#message) relating changes to some state (for example, financial records) tracked by the blockchain.

## Blockchain

Fundamentally, a _blockchain_ is a system of record in which new records, or [blocks](#block) are cryptographically linked to preceding records. This construction is a foundational component of secure, verifiable, and distributed transaction ledgers.

## Block height

The _height_ of a [block](#block) corresponds to the number of [epochs](#epoch) elapsed before the block was added to the blockchain. The height of the Filecoin [blockchain](#blockchain) is defined to be the maximum height of any block in the blockchain.

## Capacity commitment

If a storage miner doesn't find any available deal proposals appealing, they can alternatively make a _capacity commitment_, filling a [sector](#sector) with arbitrary data, rather than with client data. Maintaining this sector allows the storage miner to provably demonstrate that they are reserving space on behalf of the network.

## Collateral

In order to enter into a [storage deal](#deal), a [storage miner](#storage-miner) is required to provide [FIL](#fil) as _collateral_, to be paid out as compensation to a client in the event that the miner fails to uphold their storage commitment.

## Deal

Two participants in the Filecoin network can enter into a _deal_ in which one party contracts the services of the other. The Filecoin specification currently details _storage deals_ (in which one party agrees to store data for the other for a specified length of time) and _retrieval deals_ (in which one party agrees to transmit specified data to the other).

## Election

Every [epoch](#epoch), a small subset of Filecoin [storage miners](#storage-miner) are _elected_ to mine a new [block](#block) for the Filecoin blockchain. A miner's probability of being elected is roughly proportional to the share of the Filecoin network's total storage capacity that they contribute.

## Epoch

Time in the Filecoin blockchain is discretized into _epochs_ that are currently thirty seconds in length. Every epoch, a subset of storage miners are elected to each add a new block to the Filecoin blockchain via [Winning Proof-of-Spacetime](#winning-proof-of-spacetime-winningpost).

## FIL

_FIL_ is the name of the Filecoin unit of currency; it is alternatively denoted by the Unicode symbol for an integral with a double stroke (⨎).

## Faucet

A _faucet_ is a service that provides free [FIL](#fil). Typically, faucets are run for the benefit of new users in a network, providing them with the necessary seed capital to begin making transactions.

## Fault

When a [storage miner](#storage-miner) fails to complete [Window Proof-of-Spacetime](#window-proof-of-spacetime-windowpost) for a given sector, the Filecoin network registers a _fault_ for that sector, and the miner is [_slashed_](#slash). If a storage miner does not resolve the fault quickly, the network assumes they have abandoned their commitment.

## Filecoin

The term _Filecoin_ is used generically to refer to the Filecoin project, protocol, and network.

## Gas

_Gas_ is a property of a [message](#message), corresponding to the resources involved in including that message in a given [block](#block). For each message included in a block, the block's creator extracts a fee from the message's sender; this fee is proportional to the message's gas.

## Mainnet

A portmanteau of "main" and "network, _mainnet_ is a term used to refer to the predominant public-facing network of the Filecoin project and community. The mainnet embodies an expectation of widespread adoption and permanence; changes to its protocol are subject to the adoption of the network participants.

If used as a proper noun, capitalize the term: _"I am mining on Mainnet."_

## Message

The term _message_ is used to refer to data stored as part of a [block](#block). A block can contain several messages.

## Miner

The Filecoin project uses the term _miner_ to refer to participants in the network who provide a service of value to a client. At present, the Filecoin specification recognizes two miner types: [storage miners](#storage-miner) and [retrieval miners](#retrieval-miner).

## Pledged storage

Storage capacity that a miner has promised to reserve for the Filecoin network via [Proof-of-Replication](#proof-of-replication-porep) is termed _pledged storage_.

## Proof-of-Storage

Many blockchain networks are underpinned by the notion that participants supply something of value to the blockchain - a contribution that is hard to fake, but which, if actually made, can be trivially verified. Blockchains based in this approach are often said to require "Proof-of-_X_", where _X_ is the valued contribution. The Filecoin blockchain values contributions of storage capacity; it is predicated upon a novel _Proof-of-Storage_ construction, distinguishing it from other blockchains that, as is most often the case, require a contribution of computing power.

As a term, Proof-of-Storage refers to the design elements of the Filecoin protocol that allow one to guarantee (to some very high tolerance) that participants that claim to be contributing a given amount of storage are indeed fulfilling that pledge. In fact, Filecoin's Proof-of-Storage construction provides for a much stronger claim, allowing one to efficiently verify that a participant is storing a _particular piece of data_, without requiring that one have a copy of the file itself.

_Note_: "proof" here is used in an informal sense - typically, these proofs take the form of a probabilistic argument, rather than a concrete proof; that is, it might _technically_ be possible to convince other participants that one is making a contribution one is not, but the possibility is so vanishingly slight as to border on impossibility.

## Proof-of-Replication (PoRep)

_Proof-of-Replication_ is a procedure by which a [storage miner](#storage-miner) can prove to the Filecoin network that they have created a unique copy of some piece of data on the network's behalf.

## Proof-of-Spacetime (PoSt)

_Proof-of-Spacetime_ is a procedure by which a [storage-miner](#storage-miner) can prove to the Filecoin network they continue to store a unique copy of some data on behalf of the network. Proof-of-Spacetime manifests in two distinct varieties in the present Filecoin specification: [Window Proof-of-Spacetime](#window-proof-of-spacetime-windowpost) and [Winning Proof-of-Spacetime](#winning-proof-of-spacetime-winningpost).

## Quality-adjusted storage power

The storage power a [storage miner](#storage-miner) earns from a storage deal offered by a [verified client](#verified-client) will be augmented by a multiplier. Power totals that take into account this multiplier are termed _quality adjusted_.

## Retrieval miner

A _retrieval miner_ is a Filecoin participant that enters retrieval [deals](#deal) with clients, agreeing to supply a client with a particular file in exchange for [FIL](#fil). Note that unlike [storage miners](#storage-miner), retrieval miners are not additionally rewarded with the ability to add blocks to the Filecoin blockchain; their only reward is the fee they extract from the client.

## Seal

_Sealing_ is one of the fundamental building blocks of the Filecoin protocol. It is a computation-intensive process performed over a [sector](#sector) that results in a unique representation of the sector. The properties of this new representation are essential to the [Proof-of-Replication](#proof-of-replication-porep) and the [Proof-of-Spacetime](#proof-of-spacetime-post) procedures.

## Sector

Storage miners store data on behalf of the Filecoin network in fixed-size blocks of data called _sectors_.

## Slash

When a [fault](#fault) is registered for a [sector](#sector), the Filecoin network will _slash_ the [storage miner](#storage-miner) that is supposed to be storing the sector; that is, it will assess penalties to the miner (to be paid out of the [collateral](#collateral) fronted by the miner) for their failure to uphold their pledge of storage. When slashing takes place, the power a miner earns for the associated sector is subtracted from the miner's total power for the purposes of [election](#election).

## Storage miner

A _storage miner_ is a Filecoin participant that stores data on behalf of the network. Storage miners are rewarded for this service through payments by clients that contract their services, as well as by periodic authorization to extend the Filecoin [blockchain](#blockchain) with [blocks](#block) of their own creation. When they create a block, storage miners are rewarded with newly minted [FIL](#fil), as well as the transaction fees they can levy on other participants seeking to include [messages](#message) in the block.

## Storage power

A [storage miner's](#storage-miner) _storage power_ is a value roughly proportional to the amount of storage capacity they make available on behalf of the network via [capacity commitments](#capacity-commitment) or [storage deals](#deal). Storage power is used to select storage miners for rewards in proportion to their contributions to the total network storage capacity.

## Zero-knowledge succinct non-interactive argument of knowledge (zk-SNARK)

An _argument of knowledge_ is a construction by which one party, called the _prover_, can convince another, the _verifier_, that the prover has access to some piece of information. There are several possible constraints on such constructions:

- A _non-interactive_ argument of knowledge has the requirement that just a single message, sent from the prover to the verifier, should serve as a sufficient argument.

- A _zero-knowledge_ argument of knowledge has the requirement that the verifier should not need access to the knowledge the prover has access to in order to verify the prover's claim.

- A _succinct_ argument of knowledge is one that can be "quickly" verified, and which is "small", for appropriate definitions of both of those terms.

A zero-knowledge, succinct non-interactive argument of knowledge (zk-SNARK) embodies all of these properties. Filecoin utilizes these constructions to enable its distributed network to efficiently verify that [storage miners](#storage-miner) are storing files they pledged to store, without requiring the verifiers to maintain copies of these files themselves.

## Testnet

A portmanteau of "test" and "network, _testnet_ is a term used to refer to one of the [primary Filecoin testing networks](https://network.filecoin.io/#calibration).

Note: if used as a proper noun, capitalize the term. For example, "I am mining on Testnet."

## Tipset

A [tipset](https://filecoin.io/blog/tipsets-family-based-approach-to-consensus/) is a set of [blocks](#block) that each have the same [height](#block-height) and parent tipset; the Filecoin [blockchain](#blockchain) is a chain of tipsets, rather than a chain of blocks.

Each tipset is assigned a weight corresponding to the amount of storage the network is provided per the commitments encoded in the tipset's blocks. The consensus protocol of the network directs nodes to build on top of the heaviest chain.

By basing its blockchain on tipsets, Filecoin can allow multiple [storage miners](#storage-miner) to create blocks in the same [epoch](#epoch), increasing network throughput. By construction, this also provides network security: a node that attempts to intentionally prevent the valid blocks of a second node from making it onto the canonical chain runs up against the consensus preference for heavier chains.

## Verified client

To further incentivize the storage of "useful" data over simple [capacity commitments](#capacity-commitment), [storage miners](#storage-miner) have the additional opportunity to compete for special [deals](#deal) offered by [verified clients](#verified-client). Such clients are certified with respect to their intent to offer deals involving the storage of meaningful data, and the power a storage miner earns for these deals is augmented by a multiplier.

## Window Proof-of-Spacetime (WindowPoSt)

_Window Proof-of-Spacetime_ (WindowPoSt) is the mechanism by which the commitments made by [storage miners](#storage-miner) are audited. It sees each 24-hour period broken down into a series of windows. Correspondingly, each storage miner's set of pledged [sectors](#sector) is partitioned into subsets, one subset for each window. Within a given window, each storage miner must submit a [Proof-of-Spacetime](#proof-of-spacetime-post) for each sector in their respective subset. This requires ready access to each of the challenged sectors, and will result in a [zk-SNARK-compressed](#zero-knowledge-succinct-non-interactive-argument-of-knowledge-zk-snark) proof published to the Filecoin [blockchain](#blockchain) as a [message](#message) in a [block](#block). In this way, every sector of [pledged storage](#pledged-storage) is audited at least once in any 24-hour period, and a permanent, verifiable, and public record attesting to each storage miner's continued commitment is kept.

The Filecoin network expects constant availability of stored data. Failing to submit WindowPoSt for a sector will result in a [fault](#fault), and the storage miner supplying the sector will be [slashed](#slash).

## Winning Proof-of-Spacetime (WinningPoSt)

_Winning Proof-of-Spacetime_ (WinningPoSt) is the mechanism by which [storage miners](#storage-miner) are rewarded for their contributions to the Filecoin network. At the beginning of each [epoch](#epoch), a small number of storage miners are [elected](#election) to each mine a new [block](#block). As a requirement for doing so, each miner is tasked with submitting a compressed [Proof-of-Storage](#proof-of-storage) for a specified [sector](#sector). Each elected miner who successfully creates a block is granted [FIL](#fil), as well as the opportunity to charge other Filecoin participants fees to include [messages](#message) in the block.

Storage miners who fail to do this in the necessary window will forfeit their opportunity to mine a block, but will not otherwise incur penalties for their failure to do so.
