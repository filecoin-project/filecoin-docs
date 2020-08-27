---
title: Filecoin-backed pinning
description: A brief description of Filecoin IPFS pinning services and how to use them.
---

# Filecoin-backed pinning (FBP)

Filecoin-backed pinning (FBP) services are data storage and retrieval services that offer the performance and availability of IPFS alongside the data persistence features of Filecoin’s decentralized storage network (DSN). FBP solutions offer this functionality behind a single easy-to-use API.

FBP services offer a number of key benefits.

1. By storing your application data on an FBP, you are using a decentralized storage network (the Filecoin network) for data persistence.

2. Developers can interface with both IPFS and Filecoin nodes through a single FBP API, abstracting away some of the deal and file management patterns inherent to Filecoin. Developers can utilize Filecoin features, e.g. storage in different geographies, redundant copies, and cryptographic storage receipts without having to learn Filecoin protocol implementation APIs.
3. Like other IPFS pinning services, FBP services are often preferred alternatives to maintaining your own nodes on multiple peer-to-peer networks. FBP providers handle resource management and networking so application developers can focus on delivering a compelling user experience on web3 infrastructure.

**_FBP solutions are the recommended storage backend for most applications._** These solutions are especially targeted towards application developers coming from the IPFS and broader web3 ecosystems. Developers can use Filecoin pinning services to achieve values of decentralization, resilience, and peer-to-peer networks while maintaining storage/retrieval performance and cost savings.

Those who prefer to maintain their own infrastructure can look to solutions like [Powergate](https://github.com/textileio/powergate) or directly run [go-ipfs](https://github.com/ipfs/go-ipfs) and [lotus](https://github.com/filecoin-project/lotus) nodes.

## How to use an FBP

The following FBP solutions are live today:

- [**Textile Buckets**](https://docs.textile.io/buckets/): Textile Buckets is a hosted service that allows development teams to build software projects end-to-end on a decentralized DB and storage stack. Check out this recent blog post for some relevant features of Textile Buckets.
- **ChainSafe**: Coming soon (August 2020).
- **Pinata**: Filecoin persistence coming soon (August 2020), IPFS pinning available today.

While each FBP provider will have slightly different instructions for utilizing the service, the general flow remains the same:

- Create and configure your account with the FBP provider.
- Retrieve your auth token for the FBP provider.
- Make storage requests through the API of the service you are using.
- Maintain and monitor your data storage.
- Retrieve your data through the API of the service you are using.

This section will be updated with documentation links for additional FBP providers as they come online.

::: tip
See a walkthrough of an end-to-end example application (the Meme Marketplace) built on Textile Buckets [here](../examples/meme-marketplace/overview.md).
:::

## How FBP solutions work

FBP solutions run IPFS and Filecoin software clients (e.g. [go-ipfs](https://github.com/ipfs/go-ipfs) and [lotus](https://github.com/filecoin-project/lotus)) under the hood, either communicating directly with these software clients through their native APIs or through tools like the [Powergate](https://github.com/textileio/powergate) APIs. IPFS/Filecoin nodes speak libp2p protocols and transfer IPLD data back and forth. FBP services manage the flow of data between the IPFS DHT and Filecoin miners, employing intelligent caching strategies to keep popular data readily available.

![Diagram showing a simplified architecture for a Filecoin IPFS Pinning Service (FBP). User makes API request to the FBP. The FBP stores and retrieves data from embedded go-ipfs and lotus nodes, which communicate with each other via libp2p and IPLD data formats.](./images/fbp/fbp-data-flows.png)

While the specific architecture of each service will look different, most FBP solutions follow similar flows behind-the-scenes.

**Data storage**:

- When a user makes an API request to store a particular CID through an FBP, the FBP will pin that CID to its node (which is connected to the public IPFS network) -- or the “Hot” storage layer.
- The FBP will simultaneously initiate Filecoin storage deals (“Cold” storage layer) to persist the data.
- If the user specifies a replication factor greater than 1 for their file (X redundant copies of the data), the FBP will initiate X separate Filecoin storage deals for the data.
- The user pays the FBP directly for providing this storage service.

**Data retrieval**:

- When a user makes an API request to retrieve a particular CID through an FBP, the FBP will attempt first to retrieve the CID through the “Hot” storage layer (pinned data on the public IPFS network).
- If this is unsuccessful, the FBP will then retrieve the CID through the “Cold” storage layer (data stored with miners on the Filecoin network) and serve it back to the requestor.
- The user pays the FBP directly for providing this retrieval service.

Remember that these flows are hidden from the user and take place behind the scenes. Users will interact with a single FBP API that abstracts away data flows between systems, node management, and Filecoin deal management.
