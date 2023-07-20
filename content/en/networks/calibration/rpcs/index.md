---
title: "RPCs"
description: "Public RPC endpoints are available for the Calibration testnet."
lead: "Public RPC endpoints are available for the Calibration testnet."
draft: false
images: []
type: docs
menu:
  networks:
    parent: "networks-calibration"
    identifier: "rpcs-f83788f36772434a1a2346d867ebbf54"
weight: 320
toc: true
---

These endpoints are limited to [read-only Filecoin JSON RPC API calls]({{< relref "/reference/json-rpc/introduction" >}}) and [`MPoolPush`]({{< relref "/reference/json-rpc/mpool#mpoolpush" >}}) for sending messages that have already been signed.

## [Ankr](https://www.ankr.com/rpc/filecoin)

- HTTPS: `https://rpc.ankr.com/filecoin_testnet`
- [Ankr documentation](https://www.ankr.com/docs/rpc-service/chains/chains-list/#filecoin)

## [ChainupCloud](https://cloud.chainup.com)

- HTTPS: `https://filecoin-calibration.chainup.net/rpc/v1`
- WebSocket: `wss://filecoin-calibration.chainup.net/rpc/v1`
- [ChainupCloud documentation](https://docs.chainupcloud.com/blockchain-api/filecoin/public-apis)

## [ChainStack](https://chainstacklabs.com)

- HTTPS: `https://filecoin-calibration.chainstacklabs.com/rpc/v1`
- WebSocket: `wss://ws-filecoin-calibration.chainstacklabs.com/rpc/v1`
- [Chainstack documentation](https://chainstack.com/labs/#filecoin)

## [Glif](https://glif.io)

Please note that publicly available hosted endpoints **only guarantee 2000 of the latest blocks.**

- HTTPS: `https://api.calibration.node.glif.io/rpc/v1`
- WebSocket: `wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1`
- Lotus lite-node command

  ```shell
  FULLNODE_API_INFO=wss://wss.calibration.node.glif.io/apigw/lotus lotus daemon --lite
  ```

  When using a lite-node, omit `/rpc/v1` from Glif's WebSocket address.

- [Glif documentation](https://hosting.glif.io/)
