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

{{< alert >}}
[Chainlist](https://chainlist.org/chain/314) contains a dynamically updated list of available RPCs along with stats like current block-height and latency. [Find out more at chainlist.org](https://chainlist.org/chain/314)
{{< /alert >}}

## [Ankr](https://ankr.com)

- HTTPS: `https://rpc.ankr.com/filecoin`
- [Supported Filecoin API methods](https://www.ankr.com/docs/rpc-service/chains/chains-list/#filecoin)

## [Chainstack](https://www.chainstack.com)

- HTTPS: `https://filecoin-mainnet.chainstacklabs.com/rpc/v1`
- WebSocket: `wss://ws-filecoin-mainnet.chainstacklabs.com/rpc/v1`
- [Chainstack documentation](https://docs.chainstack.com)

## [ChainupCloud](https://cloud.chainup.com)

- HTTPS: `https://filecoin.chainup.net/rpc/v1`
- WebSocket: `wss://filecoin.chainup.net/rpc/v1`
- [ChainupCloud documentation](https://docs.chainupcloud.com/blockchain-api/filecoin/public-apis)

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

## [NOWNodes](https://nownodes.io/)

These nodes are available for free to users for the [first month](https://nownodes.io/pricing), after which the user will have to pay to maintain access.

- HTTPS: `https://fil.nownodes.io`
- [NOWNodes documentation](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
