---
title: "Ankr"
description: ""
lead: "Instead of manually managing and running a node, developers can use third-party node providers like Ankr to execute transactions."
draft: false
images: []
type: docs
menu:
  nodes:
    parent: "nodes-node-providers"
    identifier: "ankr-fd88930b57d77b2364a5f2d4a5acde8c"
weight: 100
toc: true
aliases:
    - "/developers/infrastructure/node-providers/"
---

The Ankr RPC API, maintained by [Ankr](https://www.ankr.com/), provides HTTP and WebSocket endpoint with a limited number of API methods for both [mainnet](https://docs.filecoin.io/reference/general/glossary/#mainnet) and testnet. For the most up-to-date information on available methods, see the [official Ankr documentation](https://www.ankr.com/docs/rpc-service/chains/chains-list/#networks-9)

## Mainnet endpoints 

```plaintext
https://rpc.ankr.com/filecoin
```

## Testnet endpoints

```plaintext
https://rpc.ankr.com/filecoin_testnet
```

## Supported methods 

Supported methods for these nodes vary between mainnet and testnet.

### Mainnet endpoint

The HTTP and WebSocket endpoints for mainnet currently support [these API methods.](https://www.ankr.com/docs/rpc-service/chains/chains-list/#api-methods-9)

### Testnet endpoint

The HTTP and Websocket endpoints for testnet currently support all [mainnet API methods](https://www.ankr.com/docs/rpc-service/chains/chains-list/#api-methods-9) listed above, along with applicable EVM-compatible methods. However, some methods are [unsupported](https://www.ankr.com/docs/rpc-service/chains/chains-list/#unsupported-9).
