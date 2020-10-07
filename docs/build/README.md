---
title: Build
description: Documentation to start building applications on Filecoin.
---

# Build

Filecoin is for the builders. If you are excited about the potential of leveraging the Filecoin protocol and decentralized storage network to build game-changing applications, you've come to the right place.

[[TOC]]

## Testnet

We have a specific guide for people wanting to interact with the Filecoin testnet using Lotus or Powergate and start performing storage deals on it: [onboard the testnet](onboard-testnet.md).

## Pinning Services

::: tip
Providers for **_Filecoin-backed pinning services_** are still in early stages. We plan to update this list regularly.
:::

| Name                                                                                                             | Description                                                                                                                                         | [IPFS Pinning API](https://ipfs.github.io/pinning-services-api-spec/) support |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [Textile Buckets](https://docs.textile.io/buckets/)                                                              | A hosted service that allows development teams to build software projects end-to-end on a decentralized DB and storage stack.                       | No                                                                            |
| **Chainsafe**                                                                                                    | Coming soon.                                                                                                                                        | No                                                                            |
| [Pinata](https://pinata.cloud)                                                                                   | IPFS pinning service, with Filecoin coming soon.                                                                                                    | No                                                                            |
| [Hosted Powergate](https://blog.textile.io/announcing-managed-powergate-instances-enterprise-filecoin-and-ipfs/) | The Textile team offers hosted [Powergate](./powergate.md) instances.                                                                               | No                                                                            |
| [Lotus hosted nodes](lotus/hosted-nodes.md)                                                                      | Protocol Labs in partnership with [Protofire](https://protofire.io) provides hosted Lotus instances accessible via the Lotus JSON-RPC API endpoint. | No                                                                            |

For more information about the benefits and the architecture of Filecoin-backed Pinning Services, check the [FPS page](filecoin-pinning-services.md).

## Integrating with Filecoin

| Name                                       | Description                                                                                                                                                                                                                                                                 |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Lotus API](lotus/README.md)               | Lotus nodes provide JSON-RPC API with JWT-token-based authoriation.                                                                                                                                                                                                         |
| [Powergate](powergate.md)                  | Powergate is a multitiered storage solution that stores data with IPFS and Filecoin.                                                                                                                                                                                        |
| [Local devnet](local-devnet.md)            | Learn how to deploy a Filecoin network fully contained on your own computer.                                                                                                                                                                                                |
| [Application examples](examples/README.md) | Create your own Filecoin powered applications following one of our examples: [Simple pinning service](examples/simple-pinning-service/overview.md), [Network inspector](examples/network-inspector/overview.md), [Meme marketplace](examples/meme-marketplace/overview.md). |

## Additional resources

- [Filecoin integrations for web3 infrastructure](https://www.youtube.com/watch?v=Q0oe6i7d1u4) (video)
- [What is an IPFS Pinning Service?](https://medium.com/pinata/what-is-an-ipfs-pinning-service-f6ed4cd7e475#:~:text=An%20IPFS%20pinning%20service%20is,running%20your%20own%20IPFS%20nodes.) (Pinata explainer)
- [IPFS Docs: Persistence, permanence and pinning](https://docs.ipfs.io/concepts/persistence/)
- [Developing on Filecoin](https://www.youtube.com/watch?v=aGCpq0Xf-w8) (video)
- Textile tools: [video](https://www.youtube.com/watch?v=IZ8M9m9_uJY) and [blog post](https://blog.textile.io/developer-tools-for-filecoin-ipfs-web/)
- [Building decentralized apps using Fleek’s Space daemon](https://www.youtube.com/watch?v=pWJ5fty-7mA) (video)
