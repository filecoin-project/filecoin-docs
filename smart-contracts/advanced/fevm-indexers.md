---
description: >-
  FEVM Indexers allow users and developers to query Filecoin chain data in an
  extremely quick manner. Learn what FEVM indexers are available on Filecoin and
  how to use them through existing data provide
---

# FEVM Indexers

> _Not to be confused with_ [_IPNI Indexer_](https://docs.filecoin.io/storage-providers/architecture/network-indexer)

Blockchain indexers are used for accessing blockchain data efficiently. They process and organize storage-optimized raw blockchain data into retrieve-optimized and well-queryable formats. This benefits developers and users looking to retrieve specific information because they don't need to:

1. Run their own [archival node](https://docs.filecoin.io/networks/mainnet/rpcs).
2. Parse entire blockchain histories to crawl for events that might not exist for thousands of [tipsets](https://docs.filecoin.io/basics/the-blockchain/blocks-and-tipsets#tipsets).
3. Spend significant time required to retrieve data from the blockchain node.
4. Determine complex interconnections between smart contracts.
5. Spend substantial compute power to calculate advanced queries.

Additionally, blockchain indexers provide a better developer experience by leveraging well-known API standards and query languages like GraphQL.

## Goldsky
[Goldsky](https://goldsky.com/) offers high-performance subgraph hosting and real-time data indexing for blockchain data. These are GraphQL-based APIs built on top of smart contracts. With Goldsky, developers can access structured blockchain data quickly and efficiently without needing to run their own nodes or build custom indexing backends.

Goldsky officially supports the Filecoin, allowing developers to create subgraphs that index smart contract data from the Filecoin mainnet & testnet. 

**Ways to Deploy a Subgraph with Goldsky**

**1. Goldsky Web App (No-Code)**
A visual interface that guides you step-by-step to configure and deploy a subgraph. Ideal for quick prototyping or less technical users.

**2. Goldsky CLI (Developer Tooling)**
A command-line interface for creating, editing, and deploying subgraphs programmatically. 
- From Subgraph source code
- Migrating from The Graph or any other subgraph host
- Via instant, no-code subgraphs

In this tutorial, we will use no-code Goldsky’s deploy wizard to create a subgraph for the wFIl ERC-20 token on the Filecoin testnet.

### Prerequisites
Make sure you have the following tools and setup ready:
- Node.js
- Create a Goldsky account and generate a Goldsky API key
- Goldsky CLI installed
  ```
  curl https://goldsky.com | sh
  ```
- Authenticate Goldsky CLI with your API key
  ```
  goldsky login
  ```
- wFIl Contract information
  - contract address: `0xaC26a4Ab9cF2A8c5DBaB6fb4351ec0F4b07356c4`
  - [contract ABI](https://beryx.io/fil/calibration/address/0xaC26a4Ab9cF2A8c5DBaB6fb4351ec0F4b07356c4?tab=contract): saved it as `wfil_abi.json` locally.

### Deploy a subgraph
Goldsky’s Deploy Wizard simplifies the creation of subgraphs using a CLI-guided flow.

Run:
```
goldsky subgraph init
```
Follow the prompts from the Goldsky subgraph configuration wizard:
- *Subgraph name*: wfil-subgraph
- *Subgraph version*: 1.0.0
- *Subgraph target path*: Choose default or specify your own
- *Contract ABI source*: path/to/wfil_abi.json
- *Contract Address*: `0xaC26a4Ab9cF2A8c5DBaB6fb4351ec0F4b07356c4`
- *Contract network*: filecoin-testnet
- *Start block*: Which block is the wfil created, can be 0.
- *Contract name*: wfil
- *Enable subgraph call handlers?*: no

Once you complete the above information following the prompt, the Goldsky wizard will guide you through building and deploying your subgraph. Once the subgraph is successfully deployed, Goldsky will output a deployment URL (GraphQL endpoint).

Indexing all the data for your smart contract will take time after the subgraph is deployed. You can also check the indexing status of your subgraph from the [Goldsky dashboard](https://app.goldsky.com/). 

### Query the Subgraph
You can use the provided GraphQL endpoint to query the subgraph. 

For example:
```
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
Use the Goldsky Playground or integrate it into your app to consume indexed data.

## Chain.Love

[Chain.Love](https://filecoin.chain.love) offers public access to The Graph services, simplifying the process of deploying and managing subgraphs.

1. **Connect Your Wallet**
   * On the [Chain.Love platform - SUBGRAPHS](https://filecoin.chain.love/graph), connect your [Filecoin-compatible wallet](https://docs.filecoin.io/basics/assets/wallets).
2. **Create an API Key**
   * Choose the **API keys** tab.
   * Click **Create new key**.
   * Generate an API key to authenticate your requests.
3. **Activate Your Free Subscription**
   * Go to the **Subscription** tab.
   * If you have created a key, you will see one The Graph subscription pending.
   * Click **Pay** and proceed with providing your credit card details to activate a free subscription.

{% hint style="warning" %}
Chain.Love currently offers this service completely **free of charge**. If this ever changes, you will be notified at least one month in advance. It is recommended to provide your contact details on the Chain.Love website to receive updates. You may authorize via GitHub or Google to avoid passing your credit card details, which is used as a DDoS protection mechanism.
{% endhint %}

4. **Create a Subgraph**
   * Switch back to the **Subgraphs** tab.
   * Click on **Create a New Subgraph** to set up a new subgraph instance.
5. **Manage Your Subgraphs**
   * Select **MY** in the subgraphs switcher.
   * Select the subgraph you just created to access deployment instructions and endpoints.
   * Should you have any additional inquiries, do not hesitate to contact the Glif Nodes team through the **Contact us** button in the website header.

### Querying Existing Subgraphs

One of the popular subgraphs is a subgraph containing information about all the blocks on the network, essentially providing an alternative to the `eth_getBlock...` subset of commands. Let's see how we can query the `eth_getBlockByNumber` using the Linux command-line interface and the Chain.Love platform.

* Visit the [Chain.Love platform](https://filecoin.chain.love/graph).
* Select the relevant subgraph.
* In the opened **Playground** tab, click the **Show GraphQL Explorer** button (folder icon, 3rd from the top in the left bar) to verify the subgraph schema.
*   Click the elements that you are looking to query and adjust the query if necessary. For the sake of this example, let's query the first block this subgraph supports (#2867000). The resulting query should look like the following:

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
*   Click **Execute query** (alternatively Ctrl+Enter, the icon with white triangle in the red square) and adjust query if needed.

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
* Copy **Queries (HTTP)** URL on the top of the Playground as well as resulting query to your code. The subgraph querying is free so far, although it requires an API key.

### Providers list

Chain.Love provides a curated list of indexers available on Filecoin network
{% @chainlove-widget/chainlove-compare url="https://widget.docs.chain.love/?network=filecoin&category=indexing" %}