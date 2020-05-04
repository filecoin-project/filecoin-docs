---
title: Retrieving Data
description: Learn how to retrieve your data from storage
---

# Retrieving Data

To fetch previously stored data from the Filecoin network, clients and miners make **retrieval deals**. A retrieval deal is an agreement between a client and a retrieval miner, where the client agrees to pay a certain amount for a given piece of data. Unlike storage deals, retrieval deals are entirely off-chain.

### Finding a retrieval provider

Today, Filecoin supports direct retrieval. In direct retrieval, a client makes retrieval deals directly with the miner who originally stored the data.

In the near future, Filecoin will support an independent retrieval market. Miners who have low-latency, high-bandwidth connections to lots of users (but not necessarily the most disk space) can participate as dedicated retrieval miners, storing additional copies of data to make it more readily available. Clients will be able to search the network for all possible providers of their desired data (via the DHT, the chain, or out-of-band aggregators), compare deal terms, and chose the best retrieval option for their needs.

### Negotiating the retrieval deal

Once the client knows which miner(s) to ask for their data, the negotiation goes as follows:

1. Client sends a `RetrievalQuery` (_Here’s the PayloadCID of the data I want._)
1. Miner sends a `RetrievalQueryResponse` (_I do have that data, and can send it to you for this price._)
1. Client sends a `RetrievalDealProposal` (_Yes I like those terms, go ahead._)
1. Miner sends a `RetrievalDealResponse` (_I accept your deal._)

*Note: Today, retrieval deals must include all the data in a given storage deal. In the future, you’ll be able to use* [*IPLD selectors*](https://github.com/ipld/specs/blob/master/selectors/selectors.md) *in the RetrievalQuery to retrieve subsets of stored data.*

### Fulfilling the retrieval deal

Before the exchange of data for payment can begin, the miner and client each complete final preparations. The miner unseals the data, which may take some time. If the client does not already have a payment channel open to that miner, they create one now. 

Because neither the client nor the miner have any specific reason to trust the other, fulfillment and payment for retrieval is done incrementally. The miner and client alternate these steps:

1. Miner sends a `RetrievalDealResponse` (_Here's part of your data, pay me before I send the next._)
1. Client confirms the data is correct, and sends the partial payment via the payment channel (_Here's the partial payment, keep going._)

This pattern continues until the end of the retrieval, when the last payment will simply be for the remainder of bytes. Now the retrieval deal is complete.

### Usage

If you are using a Filecoin full node implementation, you will not need to manage each of these incremental steps. Instead, they are wrapped into a single CLI or API call. For specific CLI commands, see the [Retrieving Data tutorial for lotus](https://lotu.sh/en+retrieving-data) or the [Retrieving Data tutorial for go-filecoin](https://go.filecoin.io/go-filecoin-tutorial/Storing-on-Filecoin.html#retrieve-your-data).

### References

- Filecoin Specification: [2.7.2 Retrieval Market](https://filecoin-project.github.io/specs/#systems__filecoin_markets__retrieval_market)
- [Retrieving Data tutorial for lotus](https://lotu.sh/en+retrieving-data)
- [Retrieving Data tutorial for go-filecoin](https://go.filecoin.io/go-filecoin-tutorial/Storing-on-Filecoin.html#retrieve-your-data)
