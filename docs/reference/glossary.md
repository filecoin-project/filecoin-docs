---
title: Glossary
description: Definitions and usage for Filecoin terminology
---

# Glossary

## Address

## Block

## Blockchain

## Blockchain Height

## Capacity Commitment

If a storage miner doesn't find any available deal proposals appealing, they
can alternatively make a _capacity commitment_, filling a [sector](#sector)
with arbitrary data, rather than with client data. Maintaining this sector
allows the storage miner to provably demonstrate that they are reserving space
on behalf of the network. 

## Deals

## Declared Fault

## Election

## Epoch

## FIL

## Faucet

## Fault

## Filecoin

## Gas

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

## Proof-of-Spacetime (PoSt)

## Quality-Adjusted Storage Power

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
network. Storage miners are rewarded for this service by periodically being
granted the ability to extend the Filecoin blockchain with blocks of their own
creation. When they create a block, storage miners are rewarded with newly
minted filecoin, and by the transaction fees they can levy on other nodes
seeking to include messages in the block. The frequency with which a storage
miner is selected for this reward is roughly proportional to the storage they
contribute to the network.

## Storage Power

## Succinct Non-interactive Argument of Knowledge (SNARK)

## Testnet

## Tipset

## Verified Client

## Window Proof-of-Spacetime (WindowPoSt)

## Winning Proof-of-Spacetime (WinningPoSt)

## Zero-Knowledge SNARK (zk-SNARK)
