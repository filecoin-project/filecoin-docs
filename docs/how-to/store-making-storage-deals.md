---
title: Making Storage Deals
description: Learn how to use Filecoin tokens to pay for storage.
---

# Making Storage Deals

Once a client has prepared their data and added tokens to their wallet, they can make storage deals with miners. There are several distinct phases:

### Discovering storage miners

In the discovery phase, clients identify the miners who might be able to store their data. They start by querying the chain for the list of registered miners, and sends each miner a request for its storage ask (short for *asking price*).

The storage ask contains details such as price, duration, and available storage capacity. Clients use these details to choose their preferred miner.

*Note: In the near future, 3rd party reputation systems will allow clients to check for geography, miner reputation, and other factors.*

### Negotiating the storage deal

Next, the client locks up sufficient funds in their wallet to pay for the deal. The client also calculates the unique piece commitment (CommP) for the data it intends to store, which is used for confirmation in later phases.

Now, the client reaches out to the miner and proposes the storage deal. The storage deal proposal contains a price, the size of the data, how long the data will be stored for, a reference to the data and how it will be transferred, and a number of other fields. If the miner accepts, they sign the deal proposal and publish it to the chain.

To store multiple copies of the same data, clients make multiple storage deals.

### Transferring data and beginning storage

After the deal is published, the client begins transferring data to the miner. Upon receiving all of the data, the miner packs the data into a [sector](https://filecoin-project.github.io/specs/#systems__filecoin_mining__sector), seals it, and begins submitting proofs to the chain. Once the first proof makes it onto the chain, the client has certainty that the miner is correctly storing the data, and the storage deal is officially begun.

### Ongoing storage and verification

Throughout the lifetime of the deal, the miner submits ongoing proofs to the chain. Clients pay incrementally using the funds they previously locked up. If a proof is missing or delayed, the miner is penalized.

Deals have a start and end time, specified by epoch (aka block height) in the client's original storage deal proposal. Once the blockchain reaches the ending block height, the storage deal is complete and miners have no further obligation. To continue storing their data, storage clients must make a new deal.

### Usage

If you are using a common Filecoin node implementation, you will not need to manage each of these incremental steps. Instead, they are wrapped into a small handful of CLI commands or API calls. For details, see the [Storing Data tutorial for go-filecoin](https://docs.filecoin.io/go-filecoin-tutorial/Storing-on-Filecoin.html#table-of-contents) or [Storing Data tutorial for lotus](https://lotu.sh/en+storing-data).

You can also check out [Filecoin Community Resources](https://github.com/filecoin-project/docs/wiki#community-resources) for libraries, tools, and applications that simplify storage or add additional capabilities.

### References

- Filecoin Specification: [2.7.1 Storage Market](https://filecoin-project.github.io/specs/#systems__filecoin_markets__storage_market)
- [Storing Data tutorial for go-filecoin](https://docs.filecoin.io/go-filecoin-tutorial/Storing-on-Filecoin.html#table-of-contents)
- [Storing Data tutorial for lotus](https://lotu.sh/en+storing-data)
