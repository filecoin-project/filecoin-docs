---
title: 'Build on Lotus'
description: 'Lotus offers the full feature set of its capabilities through a comprehensive JSON-RPC API.'
breadcrumb: 'Build on Lotus'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} Both the _Lotus Node_ and the _Lotus Miner_ applications expose APIs (which overlap in some parts). These APIs listen on a local port and perform authorization of every request using JWT tokens.

If you wish to interact with the Lotus Node API, you will need to either:

- Run your own [Lotus daemon](../../store/lotus/README.md) (on the Lotus network of your choice - calibration-net recommended), or
- Run a [local devnet](../local-devnet.md), or
- Use a [hosted Lotus node](../hosted-lotus.md) provided by Protocol Labs.

## Getting started with Lotus APIs

1. **Decide how you want to run Lotus**:

   There are several options depending on your needs:

   - You can install a Lotus node following the [default instructions](../../get-started/lotus/installation.md) to join one of the Filecoin networks.
   - You can run a [local devnet](../local-devnet.md).

   You can also use [Glif node](../hosted-lotus.md). The steps below apply when running your own Lotus daemon.

1. **Enable remote API access for your Lotus node**:

   By default, your Lotus daemon and Lotus Miner do not support remote API access, as they are configured to listen only to local requests. You will need to edit the configuration to listen on a public interface.

   This is explained [here](enable-remote-api-access.md). Additionally, you want to ensure that your node is reachable from the outside. We have a [connectivity guide](https://docs.filecoin.io/mine/lotus/connectivity/) for miners with some tips that also apply to normal, non-miner nodes.

1. **Obtain a token**:

   The API authenticates requests using a JWT token. Lotus (and Lotus Miner) provide tokens with different scopes: read, write, sign and admin. The procedure to obtain the tokens is explained [here](api-tokens.md).

   The token can be used to configure `lotus` to talk to any remote lotus daemon:

   ```sh
   # The following will make lotus make requests against lotus_endpoint,
   # rather than against the local-running daemon.
   export FULLNODE_API_INFO=<token>:<lotus_endpoint>
   lotus net id
   ```

   You can use this to test that your API endpoint is reachable and works well.

1. **Start using the JSON-API**

   Learn how the JSON-RPC API works, where to contact it and how to obtain documentation for every method in the [reference](../../reference/lotus-api.md).

   This will allow you to become familiar with how the API operates. From that point, you can start leveraging any of the [existing client libraries](api-client-libraries.md) or writing your own!
