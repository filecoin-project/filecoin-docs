---
title: 'How mining works'
description: 'Filecoin mining involves accepting deals and honoring them by inserting proofs in the chain. This provides an overview of the mining process.'
breadcrumb: 'How mining works'
---

# {{ $frontmatter.title }}

In most blockchain protocols, "miners" are the participants on the network that do the work necessary to advance the blockchain and maintain its validity. For providing these services, miners are compensated in the native cryptocurrency. The term "miner" emerged in the initial Proof-of-Work era, comparing the work done by hardware miners using computational power to secure blockchains with that of gold miners who expended vast physical resources for a chance at a large payout.

Mining in Filecoin works quite differently however -- instead of contributing computational power, miners contribute storage capacity to be used in deals with clients looking to store data.

## Types of miners

The Filecoin network will have multiple types of miners:

- _Storage miners_, responsible for storing files and data on the network.
- _Retrieval miners_, responsible for providing quick pipes to retrieve files.
- _Repair miners_, to be implemented.

**Storage miners** are the heart of the network. They earn Filecoin by storing data for clients, and computing cryptographic proofs to verify storage across time. The probability of earning the block reward and transaction fees is proportional to the amount of storage the miner contributes to the Filecoin network, and not hashing power.

**Retrieval miners** are the veins of the network. They earn Filecoin by winning bids and mining fees for a particular file, which are determined by the market value of said file's size. A retrieval miner’s bandwidth and bid/initial response time for deals (i.e., latency and proximity to clients) will determine its ability to close retrieval deals on the network. The maximum bandwidth of a retrieval miner will set the total quantity of deals it can make.

## Deals

Deals are the core function of the Filecoin network, and represent an agreement made between a client and a miner for a storage 'contract'.

Once a client has decided on a miner to store with based on their available capacity, duration, and desired price, they lock up sufficient funds in an associated wallet to cover the total cost of the deal. The deal is then published once the miner has accepted the storage agreement.

After the deal is published, the client then prepares the data for storage and then transfers it to the miner. Upon receiving all of the data, the miner packs the data into a sector, seals it, and begins submitting proofs to the chain. Once the first confirmation has been hit, the client can be certain the data is being stored properly, and the deal has officially begun.

Throughout the lifetime of the deal, the miner submits ongoing proofs to the chain. Clients pay incrementally using the funds they previously locked up. If a proof is missing or delayed, the miner is penalized. More information on this can be found in the [slashing](slashing.md) section.

## Power and rewards

Each Filecoin miner has an associated _power_ value in the network that is proportional to the amount of space contributed and determines the chances to win the right to mine a block in every epoch. By mining blocks, miners obtain _block rewards_ and collect fees for the messages included in that block.

Additionally, miners submit storage proofs regularly to the chain. This enables them to obtain _storage fees_ from the clients that have made deals with them.

Additional details about this can be found in the [mining rewards](mining-rewards.md) section.
