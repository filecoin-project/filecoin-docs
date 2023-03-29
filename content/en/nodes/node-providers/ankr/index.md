---
title: "Ankr"
description: ""
lead: "Instead of running a node and manually managing that infrastructure, developers can use third-party node providers like Ankr to execute their transactions."
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

The Ankr RPC API, maintained by Ankr, provides HTTP and websocket endpoint with a limited number of API methods for both mainnet and testnet. For the most up-to-date information on, see the [official Ankr documentation](https://www.ankr.com/docs/rpc-service/chains/chains-list/#networks-9)

## Mainnet endpoints 

```plaintext
https://rpc.ankr.com/filecoin
```

## Testnet endpoints

```plaintext
https://rpc.ankr.com/filecoin_testnet
```

## Supported methods 

Method support for these nodes differs between networks.

### Mainnet endpoint

The HTTP and websocket endpoints for mainnet currently support [these API methods.](https://www.ankr.com/docs/rpc-service/chains/chains-list/#api-methods-9)

### Testnet endpoint

The HTTP and websocket endpoints for testnet currently support all [supported mainet API methods](https://www.ankr.com/docs/rpc-service/chains/chains-list/#api-methods-9) listed above, along with applicable EVM-compatible methods, except for those listed as [unsupported](https://www.ankr.com/docs/rpc-service/chains/chains-list/#unsupported-9).
