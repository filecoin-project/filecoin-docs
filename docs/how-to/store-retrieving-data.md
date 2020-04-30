---
title: Retrieving Data
description: Learn how to retrieve your data from storage
---

# Retrieving Data

To fetch previously stored data from the Filecoin network, clients and miners make **retrieval deals**. A retrieval deal is an agreement between a client and a retrieval miner, where the client agrees to pay a certain amount for a given piece of data. Unlike storage deals, retrieval deals are entirely off-chain.

### Finding a retrieval provider

Today, Filecoin supports direct retrieval. In direct retrieval, a client makes retrieval deals directly with the miner who is storing it.

In the near future, Filecoin will support an independent retrieval market. Miners who have low-latency, high-bandwidth connections to lots of users (but not necessarily the most disk space) can participate as dedicated retrieval miners. Clients will be able to search the network for additional providers of data via the DHT, the chain, or out-of-band aggregators, and negotiate deals with the best retrieval miner for their needs.

### Negotiating the retrieval deal

Once a miner (also known as the provider) is identified, the client sends a `RetrievalQuery` with the CID of their desired data. The miner can either decline the request, or reply to confirm the data available and their pricing terms.

TODO: confirm that this is accurate

Client sends RetrievalQuery (here’s the data I want, in PayloadCID (optional selector in the future))

Miner sends RetrievalQueryResponse (i do have that data, and can send it to you for this price).

Client sends RetrievalDealProposal (yes I like those terms go ahead)

Miner sends RetrievalDealResponse (pay me)

Client sends a payment, and fulfillment begins.

*Note: Today, retrieval deals must include all the data in a given storage deal. In the future, you’ll be able to use* [*IPLD selectors*](https://github.com/ipld/specs/blob/master/selectors/selectors.md) *in the RetrievalQuery to retrieve subsets of stored data.*

### Fulfilling the retrieval deal

Before the exchange of data for payment can begin, the miner and client each complete final preparations. The miner unseals the data, which may take some time. If the client does not already have a payment channel open to that miner, they open one now. 

Because neither the client nor the provider have any specific reason to trust the other, fulfillment and payment for retrieval is done incrementally. The client begins by requesting a small portion of the file and including a payment channel voucher for a proportional amount of the total payment. The miner receives this, and sends back the data that was requested. When the client receives the data and validates that it was correct, they send another request for the next piece of data, with a bit more payment, and this repeats until the retrieval is complete.

This pattern continues till the end of the retrieval, when the last payment will simply be for the remainder of bytes. Now the retrieval deal is complete.

### Usage

If you are using a common Filecoin node implementation, you will not need to manage each of these incremental steps. Instead, they are wrapped into a single CLI or API call. For specific CLI commands, see the [Retrieving Data tutorial for lotus](https://lotu.sh/en+retrieving-data) or the [Retrieving Data tutorial for go-filecoin](https://docs.filecoin.io/go-filecoin-tutorial/Storing-on-Filecoin.html#retrieve-your-data).

### References

- Filecoin Specification: [2.7.2 Retrieval Market](https://filecoin-project.github.io/specs/#systems__filecoin_markets__retrieval_market)
- [Retrieving Data tutorial for lotus](https://lotu.sh/en+retrieving-data)
- [Retrieving Data tutorial for go-filecoin](https://docs.filecoin.io/go-filecoin-tutorial/Storing-on-Filecoin.html#retrieve-your-data)
