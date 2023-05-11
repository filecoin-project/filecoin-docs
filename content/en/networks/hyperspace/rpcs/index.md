---
title: "RPCs"
description: "Public RPC endpoints are available for the Hyperspace testnet."
lead: "Public RPC endpoints are available for the Hyperspace testnet."
draft: false
images: []
type: docs
menu:
  networks:
    parent: "networks-hyperspace"
    identifier: "rpcs-f72fd86a6a78b4fe41647b3488235373"
weight: 230
toc: true
aliases:
    - "/developers/infrastructure/node-providers/"

---

These endpoints are limited to all [read-only Filecoin JSON RPC API calls]({{< relref "/reference/json-rpc/introduction" >}}) and [`MPoolPush`]({{< relref "/reference/json-rpc/mpool#mpoolpush" >}}) for sending messages that have already been signed.

## [Glif](https://glif.io)

- HTTPS: `https://api.hyperspace.node.glif.io/rpc/v1`
- WebSockets: `wss://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1`
- Lotus lite-node command:

    ```shell
    FULLNODE_API_INFO=wss://wss.hyperspace.node.glif.io/apigw/lotus lotus daemon --lite`
    ```

    When using a lite-node, omit `/rpc/v1` from Glif's WebSocket address.

## [ChainStack](https://chainstack.com/labs/#filecoin)

- HTTPS: `https://filecoin-hyperspace.chainstacklabs.com/rpc/v1`
- WebSockets: `wss://ws-filecoin-hyperspace.chainstacklabs.com/rpc/v1`

## [Ankr](https://ankr.com)

- HTTPS: `https://rpc.ankr.com/filecoin_testnet`
- [Ankr documentation](https://www.ankr.com/docs/rpc-service/chains/chains-list/#filecoin)
<!--REVIEWED!-->