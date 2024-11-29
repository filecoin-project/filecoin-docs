---
description: >-
    FEVM Indexers allow users and developers to query Filecoin chain data in an extremely quick manner. Learn what FEVM indexers are available on Filecoin and how to use them through existing data providers.
---

# FEVM Blockchain Indexers
> *Not to be confused with [IPNI Indexer](https://docs.filecoin.io/storage-providers/architecture/network-indexer)*

Blockchain indexers are used for accessing blockchain data efficiently. They process and organize storage-optimized raw blockchain data into retrieve-optimized and well-queryable formats. This benefits developers and users looking to retrieve specific information because they don't need to:

1. Run their own [archival node](https://docs.filecoin.io/networks/mainnet/rpcs).
2. Parse entire blockchain histories to crawl for events that might not exist for thousands of [tipsets](https://docs.filecoin.io/basics/the-blockchain/blocks-and-tipsets#tipsets).
3. Spend significant time required to retrieve data from the blockchain node.
4. Determine complex interconnections between smart contracts.
5. Spend substantial compute power to calculate advanced queries.

Additionally, blockchain indexers provide a better developer experience by leveraging well-known API standards and query languages like GraphQL.

## The Graph

[The Graph](https://thegraph.com) is a decentralized protocol for indexing blockchain data. It enables developers to build and publish custom open APIs, known as subgraphs, that applications can query to retrieve blockchain data using GraphQL in a time-efficient manner.

#### Glossary

- **Subgraphs**: Customizable schemas that define how to index data from specific blockchain smart contracts and events.
- **GraphQL**: A query language that allows clients to request exactly the data they need, making data fetching more efficient.

#### Querying Subgraphs on Filecoin FEVM

There are many ways to query existing subgraphs, including numerous well-known libraries for [JavaScript](https://thegraph.com/docs/en/querying/querying-from-an-application/) and [Python](https://thegraph.com/docs/en/querying/querying-with-python/). But even without any third-party tooling, querying a subgraph is no more complicated than querying [RPC nodes](https://docs.filecoin.io/reference/json-rpc). The only complexity is that you have to know the schema of the subgraph beforehand, similar to knowing SQL database tables and columns before being able to query them. Luckily, The Graph provides several ways to discover the subgraph schema. The most convenient one is called the ["Playground"](https://graphql.org/blog/2020-04-03-graphiql-graphql-playground/), and it is available upon a GET request to the subgraph query URL. Alternatively, you may use the discovery method that exists on every subgraph, called the [Introspection Query](https://graphql.org/learn/introspection/).

#### Developing Subgraphs on Filecoin FEVM

Developing a subgraph requires specialized knowledge that can be obtained through [The Graph Academy](https://thegraph.academy). Although it is not very complicated, the exact structure of a subgraph is an ever-changing process, so the details will stay out of scope for this documentation.

### Deploying Subgraphs

Just as with database data queried through SQL, subgraphs have to be stored somewhere. You may run a self-hosted instance as described in [The Graph Academy examples](https://thegraph.academy/developers/local-development/) and deploy a subgraph there. However, as with RPC nodes and databases, running subgraphs locally in production is not recommended from an uptime standpoint. For hosting the subgraph, it is reasonable to use online web services such as AWS or refer to professional subgraph providers such as [Protofire (aka Glif Nodes)](https://api.node.glif.io/graph).

#### Example: Deploying a Subgraph with Glif Nodes (Protofire)

[Protofire (aka Glif Nodes)](https://api.node.glif.io) offers public access to The Graph services, simplifying the process of deploying and managing subgraphs.

1. **Connect Your Wallet**
   - On the [Protofire (Glif Nodes) platform - SUBGRAPHS](https://api.node.glif.io/graph), connect your [Filecoin-compatible wallet](https://docs.filecoin.io/basics/assets/wallets).

2. **Create an API Key**
   - Choose the **API keys** tab.
   - Click **Create new key**.
   - Generate an API key to authenticate your requests.

3. **Activate Your Free Subscription**
   - Go to the **Subscription** tab.
   - If you have created a key, you will see one The Graph subscription pending.
   - Click **Pay** and proceed with providing your credit card details to activate a free subscription.

{% hint style="warning" %}
Glif Nodes currently offers this service completely **free of charge**. If this ever changes, you will be notified at least one month in advance. It is recommended to provide your contact details on the Glif Nodes website to receive updates. Credit card details are used solely for DDoS protection. No charges will be made without prior notification.
{% endhint %}

4. **Create a Subgraph**
   - Switch back to the **Subgraphs** tab.
   - Click on **Create a New Subgraph** to set up a new subgraph instance.

5. **Manage Your Subgraphs**
   - Select **MY** in the subgraphs switcher.
   - Select the subgraph you just created to access deployment instructions and endpoints.
   - Should you have any additional inquiries, do not hesitate to contact the Glif Nodes team through the **Contact us** button in the website header.

### Querying Existing Subgraphs

One of the popular subgraphs is a subgraph containing information about all the blocks on the network, essentially providing an alternative to the `eth_getBlock...` subset of commands. Let's see how we can query the `eth_getBlockByNumber` using the Linux command-line interface and the Protofire (Glif Nodes) platform.

- Visit the [Protofire (Glif Nodes) platform](https://api.node.glif.io).
- Navigate to the **SUBGRAPHS** tab.
- Select the **[blocks](https://api.node.glif.io/graph/21/mainnet%2Fblocks)** subgraph.
- In the opened **Playground** tab, click the **Show GraphiQL Explorer** button (folder icon, 3rd from the top in the left bar) to verify the subgraph schema.
- Click the elements that you are looking to query and adjust the query if necessary. For the sake of this example, let's query the first block this subgraph supports (#2867000). The resulting query should look like the following:

    ```graphql
      query MyQuery {
      blocks(block: {number: 2867000}) {
        number
        id
        timestamp
        gasLimit
        gasUsed
      }
    }
    ```

- Click **Execute query** (alternatively Ctrl+Enter, the icon with white triangle in the red square) and adjust query if needed.

    ```json
    {
      "data": {
        "blocks": [
          {
            "number": "2867000",
            "id": "0x2df02173a94343c971733e0c94b854dee9100fbd37c70d69956bf35bca7020da",
            "timestamp": "1684316400",
            "gasLimit": "70000000000",
            "gasUsed": "24086592799"
          }
        ]
      }
    }
    ```

- Copy **Queries (HTTP)** URL on the top of the Playground as well as resulting query to your code. The subgraph querying is free so far, although it requires an API key.

