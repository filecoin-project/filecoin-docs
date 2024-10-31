---
description: >-
    FEVM Indexers allow users and developers to query Ethereum chain data in an extremely quick manner. Learn what EVM indexers are available on Filecoin and how to use them through existing data providers.
---

# FEVM blockchain Indexers
> *not to be confused with [IPNI Indexer](https://docs.filecoin.io/storage-providers/architecture/network-indexer)*

Blockchain indexers are used for accessing blockchain data efficiently. They process and organize stogage-optimized raw blockchain data into retrieve-optimized and well-queryable formats.
This solves five key problems for developers and users looking to retrieve specific information:
1) The need to run own [archival node](https://docs.filecoin.io/networks/mainnet/rpcs)
2) The need to parse entire blockchain histories to crawl for events that might not exists for thousands of [tipsets](https://docs.filecoin.io/basics/the-blockchain/blocks-and-tipsets#tipsets)
3) The time needed to retrieve data from the blockchain node is significant
4) The complex interconnections between smart contracts are not easily identifiable
5) The compute power needed to calculate advanced queries is significant

Additionally, blockchain indexers provides better developer experience by leveraging well-known API standards and query languages like GraphQL.

## The Graph

[The Graph](https://thegraph.com) is a decentralized protocol for indexing blockchain data. It enables developers to build and publish custom open APIs, known as subgraphs, that applications can query to retrieve blockchain data using GraphQL in a time-efficient manner.

### Glossary

- **Subgraphs**: Customizable schemas that define how to index data from specific blockchain smart contracts and events.
- **GraphQL**: A query language that allows clients to request exactly the data they need, making data fetching more efficient.

### Querying subgraphs on Filecoin FEVM
There are many ways to query the existing subgraph, including numerous well-known libraries on [JS](https://thegraph.com/docs/en/querying/querying-from-an-application/) and [Python](https://thegraph.com/docs/en/querying/querying-with-python/)
But even without any 3rd-party tooling, querying the subgraph is no more complicated than querying [RPC nodes](https://docs.filecoin.io/reference/json-rpc), but the only complexity is that you have to know the schema of the subgraph beforehand, similarly as you have to know SQL DB tables and columns before being able to query it. Luckily, The Graph provides several ways to discover the subgraph schema. The most convenient one is called ["Playground"](https://graphql.org/blog/2020-04-03-graphiql-graphql-playground/), and is available upon GET request to the subgraph query URL. Alternatively, one may query the discovery method that exists on every subgraph, called [Introspection Query](https://graphql.org/learn/introspection/).

### Developing subgraphs on Filecoin FEVM
Developing a subgraph requires specialized knowledge that can be obtained through [The Graph Academy](https://thegraph.academy). Although it is not very complicated, the exact structure of the subgraph is everchanging process, so the details will stay out of scope for this documentation. 

### Deploying Subgraphs

Same as with database data queried through SQL, subgraphs have to be stored somewhere. One may run a self-hosted instance as describe in [The Graph Academy examples](https://thegraph.academy/developers/local-development/) and deploy a subgraph over there, however, same as with RPC nodes and databases - running subgraphs locally in production is not recommended from the uptime standpoint. For hosting the subgraph, it is reasonable to use online web services such as AWS or refer to professional subgraphs providers such as [Protofire (aka Glif Nodes)](https://api.node.glif.io).

#### Example: Deploying subgraph with Glif Nodes (Protofire)
[Protofire (aka Glif Nodes)](https://api.node.glif.io) offers public access to The Graph services, simplifying the process of deploying and managing subgraphs.

##### Deploying Your Own Subgraph

1. **Connect Your Wallet**
   - On the [Protofire (Glif Nodes) platform](https://api.node.glif.io) connect your [Filecoin-compatible wallet](https://docs.filecoin.io/basics/assets/wallets).

2. **Create an API Key**
   - Switch to **SUBGRAPHS** and then choose **API keys** tab
   - Click **Create new key**
   - Generate an API key to authenticate your requests.

3. **Activate Your Free Subscription**
   - Go to **Subscription** tab
   - If you have created a key - you will see one The Graph subscription pending
   - Click **Pay** and proceed with providing your credit card details to activate a free subscription.

{% hint style="warning" %}
Glif Nodes currently offers this service completely **free of charge**. If this ever changes, you will be notified at least one month in advance. It is recommended to provider your contact details on Glif Nodes website to receive updates. Credit card details are used solely for DDoS protection. No charges will be made without prior notification.
{% endhint %}

4. **Create a Subgraph**
   - Switch back to the "Subgraphs" tab
   - Click on **Create a New Subgraph** to set up a new subgraph instance.

5. **Manage Your Subgraphs**
   - Select **MY** in subgraphs switcher
   - Select subgraph you just created to access deployment instructions and endpoints.
   - Shall you have any additional inquires - do not hesitate to contact Glif Nodes team through the "Contact us" button in the website header.

### Querying Existing Subgraphs

One of the popular subgraphs is basically a subgraph containing information about all the blocks on the networks, essentially providing an alternative to `eth_getBlock...` subset of commands. Lets see how we can query the `eth_getBlockByNumber` using Linux command line interface and Protofire (Glif Nodes) platform.
- Visit the [Protofire (Glif Nodes) platform](https://api.node.glif.io).
- Navigate to the **SUBGRAPHS** tab.
- Select the **[blocks](https://api.node.glif.io/graph/21/mainnet%2Fblocks)** subgraph.
- Through the opened "Playground" tab click "Show GraphiQL Explorer" button (folder icon, 3rd from the top in the left bar) to verify the subgraph schema
- Click elements that you are looking to query and adjust query if necessary. For the sake of this example lets query the first block this subgraph supports (#2867000). The resulting query should look the following way:
```
query MyQuery {
  blocks(block: {number: 2867000}) {
    number
  }
}
```
- Click "Execute query" (alternatively Ctrl+Enter, the icon with white triangle in the red square) and adjust query if needed. 
- Copy "Queries (HTTP)" URL on the top of the Playground as well as resulting query to your code. The subgraph querying is free so far, although it requires an [API key](#deploying-your-own-subgraph).
