---
title: "Storage provider rewards"
description: "In Filecoin, providers earn different types of rewards by contributing to the network."
menu:
    storageprovider:
        parent: "storage-provider-rewards"
aliases:
    - /storage-provider/storage-provider-rewards/
---

There are two main types of rewards for their efforts: storage fees and block rewards.

## Storage fees

_PoSt (Proof-of-Spacetime)_ window checks are performed on 24 hour intervals across the network to ensure that storage providers are continuing to host their required sectors as normal. Correspondingly, each storage providers’s set of pledged sectors is partitioned into subsets, one subset for each window. Within a given window, each storage provider must submit a PoSt for each sector in their respective subset. For each day a storage provider is inactive it will receive a [fault fee]({{< relref "slashing.md" >}}).

**Storage fees** are the fees paid regularly by clients after a deal has been reached, in exchange for storing data. These fees are automatically deposited into a providers's associated withdrawal wallet as they continue to perform their duties over time, and are briefly locked upon being received.

## Block rewards

**Block rewards** are large sums that are given to the storage provider credited for a new block. Unlike storage fees, these rewards do not come from an associated client; rather, the network "prints" new FIL as both an inflationary measure and an incentive to providers advancing the chain. All active storage providers on the network have a chance at receiving a block reward, their chance at such being directly proportional to the amount of storage space currently being contributed to the network.

The mechanism to earn the right to _provide_ a new block is called _WinningPoSt_. In the Filecoin network, time is discretized into a series of epochs – the blockchain's height corresponds to the number of elapsed epochs. At the beginning of each epoch, a small number of storage providers are elected to provide new blocks. Additionally to the block reward, each storage provider can collect the fees associated to each message included in the block.

The number of blocks on every tipset is based on a Poisson distribution of a random variable with λ = 5. Provider implementations may use several strategies to choose which messages to include in every block to minimize overlap. Only the "first execution" of each message will collect the associated fees, with executions ordered per the hash of the VRF (Verifiable Random Function) ticket associated to the block.

## Verified clients

To further incentivize the storage of "useful" data over simple capacity commitments, storage provider have the additional opportunity to compete for special deals offered by _verified clients_. Such clients are certified with respect to their intent to offer deals involving the storage of meaningful data, and the power a storage provider earns for these deals is augmented by a multiplier. The total amount of power a given storage provider has, after accounting for this multiplier, is known as **quality-adjusted power**.

## Retrieval fees

Retrieval fees are paid incrementally using _payment channels_ as the retrieval deals are fulfilled (by sending portions of the data to the client. This happens off-chain.
