---
description: Definitions and usage for Filecoin terminology
---

# Glossary

## Address

In the Filecoin network, an _address_ is a unique cryptographic value that serves to publicly identify a user. This value, a public key, is paired with a corresponding private key. The mathematical relationship between the two keys is such that access to the private key allows the creation of a signature that can be verified with the public key. Filecoin specifically employs the Boneh–Lynn–Shacham (BLS) signature scheme for this purpose.

## Block

In a blockchain, a _block_ is the fundamental unit of record. Each block is cryptographically linked to one or more previous blocks. Blocks typically contain [messages](https://docs.filecoin.io/reference/general/glossary/#message) relating changes to some state (for example, financial records) tracked by the blockchain.

## Blockchain

Fundamentally, a _blockchain_ is a system of record in which new records, or [blocks](https://docs.filecoin.io/reference/general/glossary/#block) are cryptographically linked to preceding records. This construction is a foundational component of secure, verifiable, and distributed transaction ledgers.

## Block height

The _height_ of a [block](https://docs.filecoin.io/reference/general/glossary/#block) corresponds to the number of [epochs](https://docs.filecoin.io/reference/general/glossary/#epoch) elapsed before the block was added to the blockchain. The height of the Filecoin [blockchain](https://docs.filecoin.io/reference/general/glossary/#blockchain) is defined to be the maximum height of any block in the blockchain.

## Capacity commitment

If a storage provider doesn’t find any available deal proposals appealing, they can alternatively make a _capacity commitment_, filling a [sector](https://docs.filecoin.io/reference/general/glossary/#sector) with arbitrary data, rather than with client data. Maintaining this sector allows the storage provider to provably demonstrate that they are reserving space on behalf of the network.

## CommP

The commitment phase of the Proof-of-Replication (PoRep) process. PoRep is a mechanism used to verify that a storage provider is storing data on behalf of a client by requiring the provider to prove that they have replicated the client’s data to their storage space.

## Content IDentifier (CID)

A self-describing format for referencing data in distributed information systems by it’s _contents_, rather than its _location_ using cryptographic hashing and self-describing formats. It is a core component of IPFS and IPLD, which are in turn components of Filecoin.

## Collateral

In order to enter into a [storage deal](https://docs.filecoin.io/reference/general/glossary/#deal), a [storage provider](https://docs.filecoin.io/reference/general/glossary/#storage-provider) is required to provide [FIL](https://docs.filecoin.io/reference/general/glossary/#fil) as _collateral_, to be paid out as compensation to a client in the event that the provider fails to uphold their storage commitment.

## Deal

Two participants in the Filecoin network can enter into a _deal_ in which one party contracts the services of the other. The Filecoin specification currently details _storage deals_ (in which one party agrees to store data for the other for a specified length of time) and _retrieval deals_ (in which one party agrees to transmit specified data to the other).

## Election

Every [epoch](https://docs.filecoin.io/reference/general/glossary/#epoch), a small subset of Filecoin [storage providers](https://docs.filecoin.io/reference/general/glossary/#storage-provider) are _elected_ to mine a new [block](https://docs.filecoin.io/reference/general/glossary/#block) for the Filecoin blockchain. A provider’s probability of being elected is roughly proportional to the share of the Filecoin network’s total storage capacity that they contribute.

## Epoch

Time in the Filecoin blockchain is discretized into _epochs_ that are currently thirty seconds in length. Every epoch, a subset of storage providers are elected to each add a new block to the Filecoin blockchain via [Winning Proof-of-Spacetime](https://docs.filecoin.io/reference/general/glossary/#winning-proof-of-spacetime-winningpost).

## FIL

_FIL_ is the name of the Filecoin unit of currency; it is alternatively denoted by the Unicode symbol for an integral with a double stroke (⨎).

## Faucet

A _faucet_ is a service that provides free [FIL](https://docs.filecoin.io/reference/general/glossary/#fil). Typically, faucets are run for the benefit of new users in a network, providing them with the necessary seed capital to begin making transactions.

## Fault

When a [storage provider](https://docs.filecoin.io/reference/general/glossary/#storage-provider) fails to complete [Window Proof-of-Spacetime](https://docs.filecoin.io/reference/general/glossary/#window-proof-of-spacetime-windowpost) for a given sector, the Filecoin network registers a _fault_ for that sector, and the provider is [_slashed_](https://docs.filecoin.io/reference/general/glossary/#slash). If a storage provider does not resolve the fault quickly, the network assumes they have abandoned their commitment.

## Filecoin

The term _Filecoin_ is used generically to refer to the Filecoin project, protocol, and network.

## Finality

Finality refers to the immutability of messages and state recorded to the Filecoin blockchain. As new blocks are added to the blockchain, it becomes more and more difficult for older blocks to be altered, until they become effectively impossible to modify. The _finality period_ is the amount of time that must elapse before a block is considered completely immutable. In the current [mainnet](https://docs.filecoin.io/reference/general/glossary/#mainnet), this is configured as 900 [epochs](https://docs.filecoin.io/reference/general/glossary/#epoch).

## Gas

_Gas_ is a property of a [message](https://docs.filecoin.io/reference/general/glossary/#message), corresponding to the resources involved in including that message in a given [block](https://docs.filecoin.io/reference/general/glossary/#block). For each message included in a block, the block’s creator extracts a fee from the message’s sender; this fee is proportional to the message’s gas.

## Mainnet

A portmanteau of “main” and “network, _mainnet_ is a term used to refer to the predominant public-facing network of the Filecoin project and community. The mainnet embodies an expectation of widespread adoption and permanence; changes to its protocol are subject to the adoption of the network participants.

If used as a proper noun, capitalize the term: _“I am providing on Mainnet.”_

## Message

The term _message_ is used to refer to data stored as part of a [block](https://docs.filecoin.io/reference/general/glossary/#block). A block can contain several messages.

## Merkle Directed Acyclic Graph

Abbreviated as _Merkle DAG_. A graph data structure where nodes:

* Have a unique identifier that is the hash of the nodes contents
* Are directionally related to other nodes
* Never form a closed loop

Merkle DAGs are a fundamental component for the representation of relationships between content-addressed data in IPLD, which is in turn used by Filecoin.

## Miner

The Filecoin project uses the term _provider_ to refer to participants in the network who provide a service of value to a client. Other blockchains, like Ethereum and Bitcoin, use the term _miner_. At present, the Filecoin specification recognizes two provider types: [storage providers](https://docs.filecoin.io/reference/general/glossary/#storage-provider) and [retrieval providers](https://docs.filecoin.io/reference/general/glossary/#retrieval-provider).

## Pledged storage

Storage capacity that a provider has promised to reserve for the Filecoin network via [Proof-of-Replication](https://docs.filecoin.io/reference/general/glossary/#proof-of-replication-porep) is termed _pledged storage_.

## Proof-of-Storage

Many blockchain networks are underpinned by the notion that participants supply something of value to the blockchain - a contribution that is hard to fake, but which, if actually made, can be trivially verified. Blockchains based in this approach are often said to require “Proof-of-X”, where X is the valued contribution. The Filecoin blockchain values contributions of storage capacity; it is predicated upon a novel _Proof-of-Storage_ construction, distinguishing it from other blockchains that, as is most often the case, require a contribution of computing power.

As a term, Proof-of-Storage refers to the design elements of the Filecoin protocol that allow one to guarantee (to some very high tolerance) that participants that claim to be contributing a given amount of storage are indeed fulfilling that pledge. In fact, Filecoin’s Proof-of-Storage construction provides for a much stronger claim, allowing one to efficiently verify that a participant is storing a _particular piece of data_, without requiring that one have a copy of the file itself.

_Note_: “proof” here is used in an informal sense - typically, these proofs take the form of a probabilistic argument, rather than a concrete proof; that is, it might _technically_ be possible to convince other participants that one is making a contribution one is not, but the possibility is so vanishingly slight as to border on impossibility.

## Proof-of-Replication (PoRep)

_Proof-of-Replication_ is a procedure by which a [storage provider](https://docs.filecoin.io/reference/general/glossary/#storage-provider) can prove to the Filecoin network that they have created a unique copy of some piece of data on the network’s behalf.

## Proof-of-Spacetime (PoSt)

_Proof-of-Spacetime_ is a procedure by which a [storage-provider](https://docs.filecoin.io/reference/general/glossary/#storage-provider) can prove to the Filecoin network they continue to store a unique copy of some data on behalf of the network. Proof-of-Spacetime manifests in two distinct varieties in the present Filecoin specification: [Window Proof-of-Spacetime](https://docs.filecoin.io/reference/general/glossary/#window-proof-of-spacetime-windowpost) and [Winning Proof-of-Spacetime](https://docs.filecoin.io/reference/general/glossary/#winning-proof-of-spacetime-winningpost).

## Quality-adjusted storage power

The storage power a [storage provider](https://docs.filecoin.io/reference/general/glossary/#storage-provider) earns from a storage deal offered by a [verified client](https://docs.filecoin.io/reference/general/glossary/#verified-client) will be augmented by a multiplier. Power totals that take into account this multiplier are termed _quality adjusted_.

## Retrieval provider

A _retrieval provider_ is a Filecoin participant that enters retrieval [deals](https://docs.filecoin.io/reference/general/glossary/#deal) with clients, agreeing to supply a client with a particular file in exchange for [FIL](https://docs.filecoin.io/reference/general/glossary/#fil). Note that unlike [storage providers](https://docs.filecoin.io/reference/general/glossary/#storage-provider), retrieval providers are not additionally rewarded with the ability to add blocks to the Filecoin blockchain; their only reward is the fee they extract from the client.

## Seal

_Sealing_ is one of the fundamental building blocks of the Filecoin protocol. It is a computation-intensive process performed over a [sector](https://docs.filecoin.io/reference/general/glossary/#sector) that results in a unique representation of the sector. The properties of this new representation are essential to the [Proof-of-Replication](https://docs.filecoin.io/reference/general/glossary/#proof-of-replication-porep) and the [Proof-of-Spacetime](https://docs.filecoin.io/reference/general/glossary/#proof-of-spacetime-post) procedures.

## Sector

Storage providers store data on behalf of the Filecoin network in fixed-size blocks of data called _sectors_.

## Slash

When a [fault](https://docs.filecoin.io/reference/general/glossary/#fault) is registered for a [sector](https://docs.filecoin.io/reference/general/glossary/#sector), the Filecoin network will _slash_ the [storage provider](https://docs.filecoin.io/reference/general/glossary/#storage-provider) that is supposed to be storing the sector; that is, it will assess penalties to the provider (to be paid out of the [collateral](https://docs.filecoin.io/reference/general/glossary/#collateral) fronted by the provider) for their failure to uphold their pledge of storage. When slashing takes place, the power a provider earns for the associated sector is subtracted from the provider’s total power for the purposes of [election](https://docs.filecoin.io/reference/general/glossary/#election).

## Storage provider

A _storage provider_ is a Filecoin participant that stores data on behalf of the network. Storage providers are rewarded for this service through payments by clients that contract their services, as well as by periodic authorization to extend the Filecoin [blockchain](https://docs.filecoin.io/reference/general/glossary/#blockchain) with [blocks](https://docs.filecoin.io/reference/general/glossary/#block) of their own creation. When they create a block, storage providers are rewarded with newly minted [FIL](https://docs.filecoin.io/reference/general/glossary/#fil), as well as the transaction fees they can levy on other participants seeking to include [messages](https://docs.filecoin.io/reference/general/glossary/#message) in the block.

## Storage power

A [storage provider’s](https://docs.filecoin.io/reference/general/glossary/#storage-provider) _storage power_ is a value roughly proportional to the amount of storage capacity they make available on behalf of the network via [capacity commitments](https://docs.filecoin.io/reference/general/glossary/#capacity-commitment) or [storage deals](https://docs.filecoin.io/reference/general/glossary/#deal). Storage power is used to select storage providers for rewards in proportion to their contributions to the total network storage capacity.

## Zero-knowledge succinct non-interactive argument of knowledge (zk-SNARK)

An _argument of knowledge_ is a construction by which one party, called the _prover_, can convince another, the _verifier_, that the prover has access to some piece of information. There are several possible constraints on such constructions:

* A _non-interactive_ argument of knowledge has the requirement that just a single message, sent from the prover to the verifier, should serve as a sufficient argument.
* A _zero-knowledge_ argument of knowledge has the requirement that the verifier should not need access to the knowledge the prover has access to in order to verify the prover’s claim.
* A _succinct_ argument of knowledge is one that can be “quickly” verified, and which is “small”, for appropriate definitions of both of those terms.

A zero-knowledge, succinct non-interactive argument of knowledge (zk-SNARK) embodies all of these properties. Filecoin utilizes these constructions to enable its distributed network to efficiently verify that [storage providers](https://docs.filecoin.io/reference/general/glossary/#storage-provider) are storing files they pledged to store, without requiring the verifiers to maintain copies of these files themselves.

## Testnet

A portmanteau of “test” and “network, _testnet_ is a term used to refer to one of the [primary Filecoin testing networks](https://network.filecoin.io/#calibration).

Note: if used as a proper noun, capitalize the term. For example, “I am providing on Testnet.”

## Tipset

A [tipset](https://filecoin.io/blog/tipsets-family-based-approach-to-consensus/) is a set of [blocks](https://docs.filecoin.io/reference/general/glossary/#block) that each have the same [height](https://docs.filecoin.io/reference/general/glossary/#block-height) and parent tipset; the Filecoin [blockchain](https://docs.filecoin.io/reference/general/glossary/#blockchain) is a chain of tipsets, rather than a chain of blocks.

Each tipset is assigned a weight corresponding to the amount of storage the network is provided per the commitments encoded in the tipset’s blocks. The consensus protocol of the network directs nodes to build on top of the heaviest chain.

By basing its blockchain on tipsets, Filecoin can allow multiple [storage providers](https://docs.filecoin.io/reference/general/glossary/#storage-provider) to create blocks in the same [epoch](https://docs.filecoin.io/reference/general/glossary/#epoch), increasing network throughput. By construction, this also provides network security: a node that attempts to intentionally prevent the valid blocks of a second node from making it onto the canonical chain runs up against the consensus preference for heavier chains.

## Verified client

To further incentivize the storage of “useful” data over simple [capacity commitments](https://docs.filecoin.io/reference/general/glossary/#capacity-commitment), [storage providers](https://docs.filecoin.io/reference/general/glossary/#storage-provider) have the additional opportunity to compete for special [deals](https://docs.filecoin.io/reference/general/glossary/#deal) offered by [verified clients](https://docs.filecoin.io/reference/general/glossary/#verified-client). Such clients are certified with respect to their intent to offer deals involving the storage of meaningful data, and the power a storage provider earns for these deals is augmented by a multiplier.

## Window Proof-of-Spacetime (WindowPoSt)

_Window Proof-of-Spacetime_ (WindowPoSt) is the mechanism by which the commitments made by [storage providers](https://docs.filecoin.io/reference/general/glossary/#storage-provider) are audited. It sees each 24 hour period broken down into a series of windows. Correspondingly, each storage provider’s set of pledged [sectors](https://docs.filecoin.io/reference/general/glossary/#sector) is partitioned into subsets, one subset for each window. Within a given window, each storage provider must submit a [Proof-of-Spacetime](https://docs.filecoin.io/reference/general/glossary/#proof-of-spacetime-post) for each sector in their respective subset. This requires ready access to each of the challenged sectors, and will result in a proof compressed via [zk-SNARK](https://docs.filecoin.io/reference/general/glossary/#zero-knowledge-succinct-non-interactive-argument-of-knowledge-zk-snark) being published to the Filecoin [blockchain](https://docs.filecoin.io/reference/general/glossary/#blockchain) as a [message](https://docs.filecoin.io/reference/general/glossary/#message) in a [block](https://docs.filecoin.io/reference/general/glossary/#block). In this way, every sector of [pledged storage](https://docs.filecoin.io/reference/general/glossary/#pledged-storage) is audited at least once in any 24 hour period, and a permanent, verifiable, and public record attesting to each storage provider’s continued commitment is kept.

The Filecoin network expects constant availability of stored data. Failing to submit WindowPoSt for a sector will result in a [fault](https://docs.filecoin.io/reference/general/glossary/#fault), and the storage provider supplying the sector will be [slashed](https://docs.filecoin.io/reference/general/glossary/#slash).

## Winning Proof-of-Spacetime (WinningPoSt)

_Winning Proof-of-Spacetime_ (WinningPoSt) is the mechanism by which [storage providers](https://docs.filecoin.io/reference/general/glossary/#storage-provider) are rewarded for their contributions to the Filecoin network. At the beginning of each [epoch](https://docs.filecoin.io/reference/general/glossary/#epoch), a small number of storage providers are [elected](https://docs.filecoin.io/reference/general/glossary/#election) to each mine a new [block](https://docs.filecoin.io/reference/general/glossary/#block). As a requirement for doing so, each provider is tasked with submitting a compressed [Proof-of-Storage](https://docs.filecoin.io/reference/general/glossary/#proof-of-storage) for a specified [sector](https://docs.filecoin.io/reference/general/glossary/#sector). Each elected provider who successfully creates a block is granted [FIL](https://docs.filecoin.io/reference/general/glossary/#fil), as well as the opportunity to charge other Filecoin participants fees to include [messages](https://docs.filecoin.io/reference/general/glossary/#message) in the block.

Storage providers who fail to do this in the necessary window will forfeit their opportunity to mine a block, but will not otherwise incur penalties for their failure to do so.



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/reference/general/glossary)
