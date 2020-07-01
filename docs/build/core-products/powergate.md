---
title: Powergate
description: An overview of what Powergate is, how it works, and how it can be used in applications.
---

# Powergate

The [Powergate](https://github.com/textileio/powergate) is a multitiered storage solution that stores data with IPFS (“Hot” storage layer) and Filecoin (“Cold” storage layer). Powergate exposes higher-level APIs for developers that facilitate easier interaction with IPFS and Filecoin nodes. Powergate also handles wallet management, long-term deal management, and provides many features that improve the overall experience of being a storage client on Filecoin.

From the [Textile docs](https://docs.textile.io/powergate/):

> Powergate is a collection of libraries, modules, and configurations that can be used independently, and composed together to integrate Filecoin into your application or storage system. The Powergate is designed to manage one or many Filecoin wallet addresses. Each address in Powergate can be independently managed through the [FFS API](https://docs.textile.io/powergate/#api) (or grouped together into a single [FFS](https://docs.textile.io/powergate/ffs/) instance). Some benefits of using the Powergate include:
>
> - Ensure data stored on Filecoin is available on the IPFS network easily.
> - Handle long-term storage deal management, including automated renew and repair.
> - Make use of network indices to improve miner selection and deal creation.
> - Manage Filecoin wallet addresses for one or many users.
> - Easily configure, connect, and deploy Powergate, [Lotus](https://lotu.sh), and [IPFS](https://ipfs.io) together.
> - Much more!

**_Powergate is the recommended solution for developers who want an easier interface and better performance from Filecoin, but who prefer to manage their own nodes._** For most developers, we recommend using an [FPS](./filecoin-backed-pinning-services). For very low-level or advanced developers, you can integrate [lotus](https://lotu.sh) directly into your application.

The Powergate project is built and maintained by Textile. You can see the full Powergate docs [here](https://docs.textile.io/powergate/).

## How to use Powergate

There are many ways to interact with the Powergate. These pathways are well-documented on Textile’s Powergate docs. The high-level pathways are summarized here for a quick reference:

- **Powergate CLI**: You can [install](https://docs.textile.io/powergate/#getting-started), run, and interact directly with the [Powergate CLI](https://docs.textile.io/powergate/cli/pow/).
- **Powergate JS API**: If you would like to use Powergate in your JS application, you can use the [Powergate JS Client](https://textileio.github.io/js-powergate-client/).
- **Powergate Go API**: If you would like to use Powergate in your Go application, you can use the [Powergate Go Client](https://godoc.org/github.com/textileio/powergate/api/client).

::: tip
Sometimes the best way to learn is through examples.

- See a walkthrough of an example application (the Simple Pinning Service) built on the Powergate JS Client [here](../examples/simple-pinning-service/overview).
- See a full production application (Slate) built on the Powergate JS Client [here](https://github.com/filecoin-project/slate/).
  :::

## How Powergate works

Powergate can be configured to work with any IPFS or Filecoin node (whether local or remote), as long as the configured nodes expose the expected APIs. Additionally, Powergate itself can be run on your local machine (easiest installation is through Docker) or hosted in the cloud as the storage backend for your application.

![This diagram shows the high-level architecture of the Powergate binary. Powergate embeds a Lotus and IPFS node (go-ipfs), which interact with the Filecoin Network and IPFS Network respectively. Powergate also includes modules that maintain Filecoin deals and indices of miner reputation. Powergate functionality is accessible via its gRPC APIs.](../images/powergate/powergate-binary.png)
Source: [Filecoin Developer Tools](https://blog.textile.io/filecoin-developer-tools-concepts/)

For a more detailed description of how Powergate works, we recommend reading the following docs:

- [Filecoin Developer Tools](https://blog.textile.io/filecoin-developer-tools-concepts/)
- [Powergate Introduction](https://docs.textile.io/powergate/)
- [Storing Data on Powergate through FFS](https://docs.textile.io/powergate/ffs/)
- [FFS Design Overview](https://github.com/textileio/powergate/blob/master/ffs/Design.md)
