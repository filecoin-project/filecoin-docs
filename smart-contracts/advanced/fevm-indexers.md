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
- **[Graph Academy](https://thegraph.academy)**: Best way to quickly learn how to develop and query the subgraphs

## Querying subgraphs on Filecoin FEVM
There are many ways to query the existing subgraph. 
One of them is to deploy

## Developing subgraphs on Filecoin FEVM



## Example: Deploying Subgraphs with Glif Nodes

[Glif Nodes](https://api.node.glif.io) offers public access to The Graph services over Filecoin FEVM, simplifying the process of deploying and managing subgraphs.

### Querying Existing Subgraphs

- Visit the [Glif Nodes API](https://api.node.glif.io).
- Navigate to the **The Graph** tab.
- Browse and select existing subgraphs to query.
- Use the provided endpoints to execute GraphQL queries.

### Deploying Your Own Subgraph

1. **Connect Your Wallet**
   - Go to the [Glif Nodes API](https://api.node.glif.io) and connect your Filecoin-compatible wallet.

2. **Create an API Key**
   - Generate an API key to authenticate your requests.

3. **Activate Your Free Subscription**
   - Provide your credit card details to activate a free subscription.
     - **Note**: Glif Nodes currently offers this service completely free of charge. If this changes, you will be notified at least one month in advance. We recommend leaving your contact details on our website to receive updates.
     - **Privacy Assurance**: Credit card details are used solely for DDoS protection. No charges will be made without prior notification.
     - **Service Suspension**: Subgraphs without credit card details may be suspended after a one-month public notification period, but no charges will be incurred.

4. **Create a Subgraph**
   - Click on **Create Subgraph** to set up a new subgraph instance.

5. **Manage Your Subgraphs**
   - Navigate to the **My Subgraphs** section.
   - Select your subgraph to access deployment instructions and endpoints.

6. **Deploy via CLI**
   - Follow the provided instructions to deploy your subgraph using The Graph CLI.
     - Authenticate using your API key:
       ```bash
       graph auth --studio <YOUR_API_KEY>
       ```
     - Deploy your subgraph:
       ```bash
       graph deploy --studio <SUBGRAPH_NAME>
       ```

## Additional Resources

- [The Graph Documentation](https://thegraph.com/docs/)
- [Filecoin FEVM Documentation](https://docs.filecoin.io/smart-contracts/filecoin-evm/)
- [Glif Nodes Documentation](https://docs.glif.io/)

## Support and Feedback

- **The Graph Community**: Join the [Discord server](https://discord.gg/vtvv7FP) for support and discussion.
- **Filecoin Community**: Engage with the community on [Slack](https://filecoin.io/slack) or the [discussion forum](https://discuss.filecoin.io/).
- **Glif Nodes Support**: Contact us through our [website](https://glif.io/contact) or leave your contact details for updates.

---

By integrating The Graph with Filecoin FEVM, you can build powerful, data-driven applications with ease. Whether you're querying existing data or indexing new smart contracts, The Graph provides the tools you need to interact with the Filecoin blockchain efficiently. Explore the possibilities today with the help of services like Glif Nodes!
