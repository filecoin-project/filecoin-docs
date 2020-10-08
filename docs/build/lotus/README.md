---
title: 'Build on Lotus'
description: 'Lotus offers the full feature set of its capabilities through a comprehensive JSON-RPC API.'
breadcrumb: 'Build on Lotus'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} Both the _Lotus Node_ and the _Lotus Miner_ applications expose APIs (which overlap in some parts). These APIs listen on a local port and perform authorization of every request using JWT tokens.

If you wish to interact with the Lotus Node API, you will need to either:

- Run your own [Lotus daemon](../../store/lotus/README.md) (on the Lotus network of your choice - testnet recommended), or
- Run a [local devnet](../local-devnet.md), or
- Use a [hosted Lotus node](hosted-nodes.md) provided by Protocol Labs.

## Getting started with Lotus APIs

The following guides are essential to start building something on top of Lotus:

- **Learn how the JSON-RPC API works, where to contact it and how to obtain documentation for every method in the [reference](../../reference/lotus-api)**.
- Learn how to obtain JWT tokens to perform requests to the API in [this guide](api-token-generation.md).
- Learn how to optionally enable remote access from a different computer [here](enable-remote-api-access.md).
