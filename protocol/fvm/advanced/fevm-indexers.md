---
description: >-
  Index and query Filecoin contract events with Goldsky or The Graph instead of
  scanning tipsets yourself, with setup steps for each.
---

# FEVM indexers

**An indexer reads a blockchain, organizes the data, and lets you query it quickly with an API such as GraphQL. With one, you don't need to run an archival node or scan thousands of tipsets for events.**

It isn't about the IPNI indexer, which is a different thing that helps with content retrieval.

Without an indexer you would have to run your own [archival node](../../networks/mainnet.md#rpc-endpoints), parse a long chain history to find events, work out how contracts relate, and spend a lot of compute on complex queries. An indexer does that work once.

## Goldsky

[Goldsky](https://goldsky.com/) hosts subgraphs and indexes blockchain data in real time. A subgraph is a GraphQL API over the events of one or more contracts. Goldsky supports Filecoin Mainnet and [Calibration](../../networks/calibration.md), so you don't need your own node or indexing backend.

You can deploy a subgraph with the Goldsky web app, with no code, or with the Goldsky CLI, from source code or by migrating one from another host. This tutorial uses the CLI wizard to index the [wFIL](wrapped-fil.md) token on Calibration.

### Before you start

You need:

* Node.js.
* A Goldsky account and API key.
* The Goldsky CLI: `curl https://goldsky.com | sh`
* To log in: `goldsky login`
* The wFIL contract address on Calibration, `0xaC26a4Ab9cF2A8c5DBaB6fb4351ec0F4b07356c4`, and its [ABI](https://beryx.io/fil/calibration/address/0xaC26a4Ab9cF2A8c5DBaB6fb4351ec0F4b07356c4?tab=contract), saved as `wfil_abi.json`.

### Deploy a subgraph

Run the wizard:

```shell
goldsky subgraph init
```

Answer the prompts:

| Prompt | Value |
| --- | --- |
| Subgraph name | `wfil-subgraph` |
| Subgraph version | `1.0.0` |
| Subgraph target path | The default, or your own |
| Contract ABI source | `path/to/wfil_abi.json` |
| Contract address | `0xaC26a4Ab9cF2A8c5DBaB6fb4351ec0F4b07356c4` |
| Contract network | `filecoin-testnet` |
| Start block | The block where the contract was created, or `0` |
| Contract name | `wfil` |
| Enable subgraph call handlers | No |

The wizard then builds and deploys the subgraph and prints a GraphQL endpoint. Indexing all the data takes some time. Check progress on the [Goldsky dashboard](https://app.goldsky.com/).

### Query the subgraph

Send a query to the endpoint, or use the Goldsky Playground. This one returns the latest ten transfers from an address:

```graphql
{
  transfers(
    where: {from: "0xf49d33f54ce41354dcd7e698aa54256781a6dd30"}
    orderBy: timestamp_
    orderDirection: desc
    first: 10
  ) {
    id
    from
    to
    amount
    timestamp_
  }
}
```

## The Graph

[The Graph](https://thegraph.com) is a decentralized protocol for indexing blockchain data. You publish a subgraph, which defines how to index a contract's events, and apps query it with GraphQL.

### Query an existing subgraph

Querying a subgraph is about as simple as calling an RPC node. You need to know its schema first, as you would need to know the tables and columns of a SQL database. Two ways to find it:

* The Playground, which opens when you send a GET request to the subgraph's query URL.
* The [introspection query](https://graphql.org/learn/introspection/), which every subgraph supports.

There are client libraries for [JavaScript](https://thegraph.com/docs/en/querying/querying-from-an-application/) and [Python](https://thegraph.com/docs/en/querying/querying-with-python/).

### Build and host a subgraph

To write a subgraph, see [The Graph documentation](https://thegraph.com/docs/). You can host it yourself, but a self-hosted subgraph is a poor choice for production because you have to keep it available. Use a hosting service instead, such as [Glif Nodes](https://api.node.glif.io/graph), which is run by Protofire.

To deploy on Glif Nodes:

1. On the [Glif Nodes subgraphs page](https://api.node.glif.io/graph), connect a [Filecoin-compatible wallet](../../fil/wallets.md).
2. Open the **API keys** tab, click **Create new key**, and generate a key.
3. Open the **Subscription** tab. A pending Graph subscription appears for your key. Click **Pay** and follow the steps to activate it. Check the current pricing there.
4. Go back to the **Subgraphs** tab and click **Create a New Subgraph**.
5. Select **MY** in the switcher, then select your subgraph to see its deployment instructions and endpoints.

### Example: query blocks

One popular subgraph on Glif Nodes holds block data. It is an alternative to the `eth_getBlock` calls. To query a block:

1. On the [Glif Nodes subgraphs page](https://api.node.glif.io/graph), open the subgraph, then its **Playground** tab.
2. Click **Show GraphQL Explorer** to check the schema.
3. Build and run a query, for example for block `2867000`:

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

4. Copy the **Queries (HTTP)** URL and the query into your code. Querying needs an API key.

## Related pages

* [FVM advanced](README.md): tools and services for FVM developers.
* [Multicall](multicall.md): batch many calls into one.
* [Blocks and tipsets](../../concepts/blocks-and-tipsets.md): how blocks group into tipsets each epoch.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/advanced/fevm-indexers)
