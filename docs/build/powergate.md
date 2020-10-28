---
title: 'Powergate'
description: 'Powergate is a multitiered storage solution that stores data with IPFS ("Hot" storage layer) and Filecoin ("Cold" storage layer)'
breadcrumb: 'Powergate'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

Powergate exposes higher-level APIs for developers that facilitate easier interaction with IPFS and Filecoin nodes. Powergate also handles wallet management, long-term deal management, and provides many features that improve the overall experience of being a storage client on Filecoin.

You can read more about Powergate in the [Textile docs](https://docs.textile.io/powergate/).

Powergate is the **recommended solution** for developers who want an easier interface and better performance from Filecoin, but who prefer to manage their own nodes.

::: tip
Hosted Powergate nodes are available. Check out how to get one and get started using it in our [Hosted Powergate guide](hosted-powergate.md).
:::

## How to use Powergate

There are many ways to interact with the Powergate. These pathways are well-documented on Textile’s Powergate docs. The high-level pathways are summarized here for a quick reference:

- **Powergate CLI**: You can [install](https://docs.textile.io/powergate/#getting-started), run, and interact directly with the [Powergate CLI](https://docs.textile.io/powergate/cli/pow/).
- **Powergate JS API client**: If you would like to use Powergate in your JS application, you can use the [Powergate JS Client](https://textileio.github.io/js-powergate-client/).
- **Powergate Go API client**: If you would like to use Powergate in your Go application, you can use the [Powergate Go Client](https://godoc.org/github.com/textileio/powergate/api/client).

::: tip
Sometimes the best way to learn is through examples.

- See a walkthrough of an example application (the Simple Pinning Service) built on the [Powergate JS Client](../build/examples/simple-pinning-service/overview.md).
- See a full production application (Slate) built on the [Powergate JS Client](https://github.com/filecoin-project/slate/).
  :::

## Additional Powergate resources

For a more detailed description of how Powergate works, we recommend reading the following docs:

- [Filecoin Developer Tools](https://blog.textile.io/filecoin-developer-tools-concepts/)
- Powergate introduction: [docs](https://docs.textile.io/powergate/) and [video](https://www.youtube.com/watch?v=aiOTSkz_6aY)
- [Storing Data on Powergate through FFS](https://docs.textile.io/powergate/ffs/)
- [FFS Design Overview](https://github.com/textileio/powergate/blob/master/ffs/Design.md)
- [Get started with Hosted Powergate](hosted-powergate.md)
