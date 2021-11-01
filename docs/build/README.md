---
title: Build
description: Documentation to start building applications on Filecoin.
---

# Build

Filecoin is for the builders. If you are excited about the potential of leveraging the Filecoin protocol and decentralized storage network to build game-changing applications, you've come to the right place.

:::tip
Use one of the community built tools and services to get started. [Take a look now →](../store/README.md) 
:::

## Get started

There are several options to start integrating with Filecoin. Here are some guides to get you started:

- [Build with Glif-nodes](hosted-lotus.md), for users looking for an endpoint to submit messages to the chain. Standalone Lotus, with optional Powergate, are also available).
- [Build with Lotus](lotus/README.md), for users looking to interact with their own, local Lotus nodes.
- [Build with Powergate](hosted-powergate.md), for users wanting to combine IPFS (fast retrieval) and Filecoin (backup) with full control of both.
- [Build with Textile buckets](textile-buckets.md), for users looking for simple IPFS storage with Filecoin-based archival, with encryption and shared buckets support.
- [Store and retrieve data](../get-started/store-and-retrieve) directly with a Lotus node by following this tutorial series.

## Filecoin-backed storage providers

The following products provide storage solutions that are backed up by the Filecoin network and potentially [integrate IPFS as a hot-data layer (FPS)](filecoin-pinning-services.md).

::: tip
We plan to update this list regularly as new providers are announced and their features expand.
:::

| Name                                                | Description                                                                                                                   | [IPFS Pinning API](https://ipfs.github.io/pinning-services-api-spec/) support |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [Pinata](https://pinata.cloud)                      | IPFS pinning service, with Filecoin coming soon.                                                                              | No                                                                            |
| [Textile Buckets](https://docs.textile.io/buckets/) | A hosted service that allows development teams to build software projects end-to-end on a decentralized DB and storage stack. | No                                                                            |

For more information about the benefits and the architecture of Filecoin-backed Pinning Services, check the [FPS page](filecoin-pinning-services.md).

## Hosted nodes

Hosted node providers take care of running Filecoin node software for you so that you can focus on integrating and building on top of it.

| Name                          | Description                                                  | [IPFS Pinning API](https://ipfs.github.io/pinning-services-api-spec/) support |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Glif Nodes](hosted-lotus.md) | Glif Nodes are hosted Lotus instances accessible via the Lotus JSON-RPC API endpoint. | No                                                           |

## Developer references

The following documentation links can help you start building on Filecoin:

| Name                                 | Description                                                                          |
| ------------------------------------ | ------------------------------------------------------------------------------------ |
| [Building on Lotus](lotus/README.md) | Lotus nodes provide JSON-RPC API with JWT-token-based authorization.                 |
| [Powergate](powergate.md)            | Powergate is a multitiered storage solution that stores data with IPFS and Filecoin. |
| [Local devnet](local-devnet.md)      | Learn how to deploy a Filecoin network fully contained on your own computer.         |

## Additional resources

- [Filecoin integrations for web3 infrastructure](https://www.youtube.com/watch?v=Q0oe6i7d1u4) (video)
- [What is an IPFS Pinning Service?](https://medium.com/pinata/what-is-an-ipfs-pinning-service-f6ed4cd7e475#:~:text=An%20IPFS%20pinning%20service%20is,running%20your%20own%20IPFS%20nodes.) (Pinata explainer)
- [IPFS Docs: Persistence, permanence and pinning](https://docs.ipfs.io/concepts/persistence/)
- [Developing on Filecoin](https://www.youtube.com/watch?v=aGCpq0Xf-w8) (video)
- Textile tools: [video](https://www.youtube.com/watch?v=IZ8M9m9_uJY) and [blog post](https://blog.textile.io/developer-tools-for-filecoin-ipfs-web/)
- [Building decentralized apps using Fleek’s Space daemon](https://www.youtube.com/watch?v=pWJ5fty-7mA) (video)

