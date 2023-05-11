---
title: "RPCs"
description: "Public RPC endpoints are available for Filecoin mainnet."
lead: "Public RPC endpoints are available for the Filecoin mainnet."
draft: false
images: []
type: docs
menu:
  networks:
    parent: "networks-mainnet"
    identifier: "rpcs-643674db76354af138fa87bf82e73842"
weight: 130
toc: true
---

## [Glif](https://glif.io)

Please note that publicly available hosted endpoints **only guarantee 2000 of the latest blocks.**

- HTTPS: `https://api.node.glif.io/rpc/v1`
- WebSocket: `wss://wss.node.glif.io/apigw/lotus/rpc/v1`
- Lotus lite-node command

  ```shell
  FULLNODE_API_INFO=wss://wss.node.glif.io/apigw/lotus lotus daemon --lite
  ```

  When using a lite-node, omit `/rpc/v1` from Glif's WebSocket address.

- [Glif documentation](https://hosting.glif.io/)

## [Ankr](https://ankr.com)

- HTTPS: `https://rpc.ankr.com/filecoin`
- [Supported Filecoin API methods](https://www.ankr.com/docs/rpc-service/chains/chains-list/#filecoin)

## [Chainstack](https://www.chainstack.com)

- HTTPS: `https://filecoin-mainnet.chainstacklabs.com/rpc/v1`
- WebSocket: `wss://ws-filecoin-mainnet.chainstacklabs.com/rpc/v1`
- [Chainstack documentation](https://docs.chainstack.com)
<!--REVIEWED!-->