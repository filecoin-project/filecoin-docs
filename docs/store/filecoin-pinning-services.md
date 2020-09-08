---
title: 'Filecoin-backed pinning services'
description: Filecoin-backed pinning service (FPS) services are data storage and retrieval services that offer the performance and availability of IPFS alongside the data persistence features of Filecoin’s decentralized storage network (DSN).
---

# Filecoin-backed pinning services (FPS)

{{ $frontmatter.description }} FPS solutions offer this functionality behind a single, easy-to-use API.

::: tip
Filecoin-backed pinning services are still in early stages. We plan to update this page regularly.
:::

## Existing services

| Name                                                |                                                                                                                               |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [Textile Buckets](https://docs.textile.io/buckets/) | A hosted service that allows development teams to build software projects end-to-end on a decentralized DB and storage stack. |
| **Chainsafe**                                       | Coming soon.                                                                                                                  |
| [Pinata](https://pinata.cloud)                      | IPFS pinning service, with Filecoin coming soon.                                                                              |

## Key benefits of FPSs

1. Data backed up by decentralized storage network (the Filecoin network) for data persistence.

2. Single [FPS API](https://ipfs.github.io/pinning-services-api-spec/) that can interface with both IPFS and Filecoin nodes, abstracting most of the Filecoin-specific workflows (deal-making) without sacrifizing features (i.e. different geographies, redundant copies, and cryptographic storage receipts).

3. Perfect for developers that do not want to worry about maintaining their own decentralized infrastructure while avoiding vendor lock-in. All providers contribute to the same storage network.

If you are a developer and want to learn more about integration possibilities on top of Filecoin, check the [Build](../build/) section.

## How to use an FPS

While each FPS provider will have slightly different instructions for utilizing the service, the general flow remains the same:

- Create and configure your account with the FPS provider.
- Retrieve your auth token for the FPS provider.
- Make storage requests through the API of the service you are using.
- Maintain and monitor your data storage.
- Retrieve your data through the API of the service you are using.

## How FPS solutions work

FPS solutions run IPFS (for hot storage) and Filecoin (for cold storage) software clients under the hood, either communicating directly with these software clients through their native APIs or through tools like [Powergate](../build/powergate). FPS services manage the flow of data between the different networks, employing intelligent caching strategies to keep popular data readily available.

![Diagram showing a simplified architecture for a Filecoin IPFS Pinning Service (FPS). User makes API request to the FPS. The FPS stores and retrieves data from embedded go-ipfs and lotus nodes, which communicate with each other via libp2p and IPLD data formats.](./images/filecoin-pinning-services/fps-data-flows.png)

While the specific architecture of each service will look different, most FPS solutions follow similar flows behind-the-scenes.

**Data storage**:

- When a user makes an API request to store a particular CID through an FPS, the FPS will pin that CID to its node (which is connected to the public IPFS network) -- or the “Hot” storage layer.
- The FPS will simultaneously initiate Filecoin storage deals (“Cold” storage layer) to persist the data.
- If the user specifies a replication factor greater than 1 for their file (X redundant copies of the data), the FPS will initiate X separate Filecoin storage deals for the data.
- The user pays the FPS directly for providing this storage service.

**Data retrieval**:

- When a user makes an API request to retrieve a particular CID through an FPS, the FPS will attempt first to retrieve the CID through the “Hot” storage layer (pinned data on the public IPFS network).
- If this is unsuccessful, the FPS will then retrieve the CID through the “Cold” storage layer (data stored with miners on the Filecoin network) and serve it back to the requestor.
- The user pays the FPS directly for providing this retrieval service.

Remember that these flows are hidden from the user and take place behind the scenes. Users will interact with a single interface that abstracts away data flows between systems, node management, and Filecoin deal management.
