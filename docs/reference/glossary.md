---
title: Glossary
description: Definitions and usage for Filecoin terminology
---

# Glossary

## Address

## Block

## Blockchain

## Block Height

The _height_ of a [block](#block) corresponds to the number of [epochs](#epoch)
elapsed before the block was added to the blockchain. The height of the
Filecoin [blockchain](#blockchain) is defined to be the maximum height
of any block in the blockchain.

## Capacity Commitment

If a storage miner doesn't find any available deal proposals appealing, they
can alternatively make a _capacity commitment_, filling a [sector](#sector)
with arbitrary data, rather than with client data. Maintaining this sector
allows the storage miner to provably demonstrate that they are reserving space
on behalf of the network. 

## Deal

Two actors in the Filecoin network can enter into a _deal_ in
which one party contracts the services of the other. The Filecoin
specification currently details _storage deals_ (in which one
party agrees to store a file for the other for a specified
lengtht of time) and _retrieval deals_ (in which one party agrees
to transmit a particular file to the other).

## Declared Fault

## Election

## Epoch

Time in the Filecoin blockchain is discretized into _epochs_ that
are currently twenty-five seconds in length. Each epoch, a subset
of storage miners are elected to each add a new block to the
Filecoin blockchain via [Winning
Proof-of-Spacetime](#winning-proof-of-spacetime-post).

## FIL

## Faucet

A _faucet_ is a service that provides free filecoin. Typically, facuets are run
for the benefit of new users in a network, providing them with the necessary
seed capital to begin making transactions.

## Fault

## Filecoin

## Gas

_Gas_ is a transaction fee associated with a [message](#message),
paid to the creator of a [block](#block) in return for including
the message in the block.

## Mainnet

## Message

## Miner

The Filecoin project uses the term _miner_ to refer to an actor in the network
providing a service of value to a client. At present, the Filecoin
specification recognizes two miner types: [storage miners](#storage-miner) and
[retrieval miners](#retrieval-miners).

## Pledged Storage

## Proof-of-Storage

Many blockchain networks are underpinned by the notion that
constituent nodes supply something of value to the blockchain - 
a contribution that is hard to fake, but which, if actually made,
can be trivially verified. Typically, this takes the form of a
probabilistic argument, rather than a concrete proof; that is,
it might _technically_ be possible to convince other nodes that
one is making a contribution one is not, but the possibility is
so vanishingly slight as to border on impossibility.

Blockchains based in this approach are often said to require
"Proof-of-_X_", where _X_ is the valued contribution. The
Filecoin blockchain values contributions of storage capacity; it
is predicated upon a novel Proof-of-Storage construction,
distinguishing it from other blockchains that, as is most often
the case, require a contribution of computing power.

As a term, Proof-of-Storage refers to the design elements of the
Filecoin protocol that allow one to guarantee (to some very high
tolerance) that nodes that claim to be contributing a given
amount of storage are indeed fulfilling that pledge. In fact,
Filecoin's Proof-of-Storage construction provides for a much
stronger claim, allowing one to efficiently verify that a node is
storing a _particular file_, without requiring that one have a
copy of the file itself.

## Proof-of-Replication (PoRep)

_Proof-of-Replication_ is a procedure by which a [storage
miner](#storage-miner) can prove to the Filecoin network that they have created
a unique copy of some piece of data on the network's behalf.

## Proof-of-Spacetime (PoSt)

_Proof-of-Spacetime_ is a procedure by which a [storage-miner](#storage-miner)
can prove to the Filecoin network they continue to store a unique copy of some
data on behalf of the network. Proof-of-Spacetime manifests in two distinct
varieties in the present Filecoin specification: [Window
Proof-of-Spacetime](window-proof-of-spacetime-windowpost) and [Winning
Proof-of-Spacetime](winning-proof-of-spacetime-winningpost).

## Quality-Adjusted Storage Power

A storage deal offered by a [verified client](#verified-client) will be
augmented by a multiplier.

## Retrieval Miner

## Seal

_Sealing_ is one of the fundamental building blocks of the Filecoin protocol.
It is a computation-intensive process performed over a [sector](#sector) that
results in a unique representation of the sector. The properties of this new
representation are essential to the
[Proof-of-Replication](#proof-of-replication-porep) and the
[Proof-of-Spacetime](#proof-of-spacetime-post) procedures.

## Sector

Storage miners store data on behalf of the Filecoin network in fixed-size
blocks of data called _sectors_. Currently, only 32GiB and 64GiB sectors
are supported.  

## Slash

## Storage Miner

A _storage miner_ is a Filecoin actor that stores data on behalf of the
network. Storage miners are rewarded for this service through payments by
clients that contract their services, as well as by periodic authorization to
extend the Filecoin blockchain with blocks of their own creation. When they
create a block, storage miners are rewarded with newly minted filecoin, and by
the transaction fees they can levy on other nodes seeking to include messages
in the block. The frequency with which a storage miner is selected for this
reward is roughly proportional to the storage they contribute to the network.

## Storage Power

A [storage miner's](#storage-miner) _storage power_ is a value roughly
proportional to the amount of storage capacity they make available on behalf of
the network via [capacity commitments](#-capacity-commitment) or [storage
deals](#deal). Storage power is used to select storage miners for rewards
in proportion to their contributions to the network.

## Succinct Non-interactive Argument of Knowledge (SNARK)

## Testnet

## Tipset

## Verified Client

## Window Proof-of-Spacetime (WindowPoSt)

## Winning Proof-of-Spacetime (WinningPoSt)

## Zero-Knowledge SNARK (zk-SNARK)
