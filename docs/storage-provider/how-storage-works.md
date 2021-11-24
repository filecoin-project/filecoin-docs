---
title: 'How storage works'
description: 'Filecoin storage involves accepting deals and honoring them by inserting proofs in the chain. This provides an overview of the storage providing process.'
breadcrumb: 'How mining works'
---

:::tip ProtoSchool tutorial available
Take a look at the [Filecoin Tutorial over at ProtoSchool](https://proto.school/verifying-storage-on-filecoin) to get a better understanding of how mining works.
:::

# {{ $frontmatter.title }}

In most blockchain protocols, _storage providers_ are the participants on the network that do the work necessary to advance the blockchain and maintain its validity. For providing these services, storage providers are compensated in the native cryptocurrency. 

The term  emerged in the initial Proof-of-Work era, comparing the work done by hardware miners using computational power to secure blockchains with that of gold miners who expended vast physical resources for a chance at a large payout.

In the Proof-of-work era, hardware miners lent their computational power to the network and competed with each other for a chance of a large payout. Providing storgae in Filecoin works quite differently, however. Instead of contributing computational power, storage provider contribute storage capacity to be used in deals with clients looking to store data.


## Types of provider 

The Filecoin network has multiple types of provider:

- _Storage providers_, responsible for storing files and data on the network.
- _Retrieval provider_, responsible for providing quick pipes to retrieve files.
- _Repair provider_, to be implemented.

**Storage provider** are the heart of the network. They earn Filecoin by storing data for clients, and computing cryptographic proofs to verify storage across time. The probability of earning the block reward and transaction fees is proportional to the amount of storage the provider contributes to the Filecoin network, and not hashing power.

**Retrieval providers** are the veins of the network. They earn Filecoin by winning bids and mining fees for a particular file, which are determined by the market value of said file's size. A retrieval providers’ bandwidth and bid/initial response time for deals (i.e., latency and proximity to clients) will determine its ability to close retrieval deals on the network. The maximum bandwidth of a retrieval provider will set the total quantity of deals it can make.

## Deals

Deals are the core function of the Filecoin network, and represent an agreement made between a client and a provider for a storage 'contract'.

Once a client has decided on a provider to store with based on their available capacity, duration, and desired price, they lock up sufficient funds in an associated wallet to cover the total cost of the deal. The deal is then published once the provider has accepted the storage agreement.

After the deal is published, the client then prepares the data for storage and then transfers it to the provider. Upon receiving the data, the provider packs the data into a sector, seals it, and begins submitting proofs to the chain. Once the first confirmation has been hit, the client can be certain the data is being stored properly, and the deal has officially begun.

Throughout the lifetime of the deal, the provider submits ongoing proofs to the chain. Clients pay incrementally using the funds they previously locked up. If a proof is missing or delayed, the provider is penalized. More information on this can be found in the [slashing](slashing.md) section.

## Power and rewards

Each Filecoin provider has an associated _power_ value in the network that is proportional to the amount of space contributed and determines the chances to win the right to provide a block in every epoch. By mining blocks, providers obtain _block rewards_ and collect fees for the messages included in that block.

Additionally, providers submit storage proofs regularly to the chain. This enables them to obtain _storage fees_ from the clients that have made deals with them.

Additional details about this can be found in the [storage rewards](storage-rewards.md) section.
