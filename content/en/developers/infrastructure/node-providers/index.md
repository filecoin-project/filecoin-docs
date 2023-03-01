---
title: "Node providers"
description: "Instead of running a node and manually managing that infrastructure, developers can use third-party node providers to execute their transactions. Passing the responsibility of managing a node to a third-party can free up time for developers allowing them to work on their projects, rather than deal with network infrastructure."
lead: "Instead of running a node and manually managing that infrastructure, developers can use third-party node providers to execute their transactions. Passing the responsibility of managing a node to a third-party can free up time for developers allowing them to work on their projects, rather than deal with network infrastructure."
draft: false
images: []
type: docs
menu:
  developers:
    parent: "lorem"
    identifier: "node-providers-c5f8055ae87352ce7519806cdf0885f0"
weight: 270
toc: true
---

{{< beta-warning >}}

## Available Node Providers

### Hyperspace

The Hyperspace testnet, maintained by Factor 8, is a pre-production developer focused testnet. This network is designed for developers to build and test their toolings, applications, smart contracts, and actors on a public, stable network. The Hyperspace testnet is extremely stable, as it will only be reset under catastrophic circumstances. More information can be found in the official [Hyperspace repository](https://github.com/filecoin-project/testnet-hyperspace). 

Hyperspace has the following network parameters: 

- Supported Sector Sizes: `512 MiB` and `32 GiB` and `64 GiB`
- Consensus Miner Min Power: `16 GiB`
- Epoch Duration Seconds: `30`
- Expected Leaders per Epoch: `5`
- WindowPoSt Proving Period: `2880`
- WindowPoSt Challenge Window: `60`
- WindowPoSt Period Deadlines: `48`
- Pre-Commit Challenge Delay: `10`

The Hyperspace network provides the following public RPC endpoints:

- [Glif Nodes RPC API](#glif-nodes-rpc)
- [ChainStack RPC API](#chainstack-rpc)
- [Ankr RPC API](#ankr-rpc)

{{< alert >}}
**Important**

All endpoints are limited to read-only Filecoin JSON RPC API calls and `MPoolPush` (for sending already signed messages)
{{< /alert >}}

#### Glif Nodes RPC

The Glif Node RPC API is a publicly hosted Lotus endpoint that supports JSON-RPC POST requests against the Lotus API. The Glif Nodes RPC API provides both a standard endpoint and a web socket endpoint. For further information, see the [official endpoint page](https://api.hyperspace.node.glif.io/rpc/v1).

**HTTP endpoint**: 

```plaintext
https://api.hyperspace.node.glif.io/rpc/v1
```

**Web socket endpoint**:

```plaintext
wss://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1
```

**Supported API methods**:

The Glif Node API supports all API request methods listed in the [Lotus JSON-RPC API documentation](https://lotus.filecoin.io/developers/apis/json-rpc/).

**Usage notes**:

- All JSON-RPC requests must include the header `"Content-Type": "application/json"`
- For Lotus Lite, use `FULLNODE_API_INFO=wss://wss.hyperspace.node.glif.io/apigw/lotus lotus daemon --lite`

#### ChainStack RPC

The ChainStack RPC API, maintained by Chainstack Labs, provides high-performance Hyperspace testnet nodes for Filecoin builders, especially for applications built on the Filecoin Virtual Machine. The ChainStack RPC API provides both a standard endpoint and a web socket endpoint. For further information, see the [official page](https://chainstack.com/labs/#filecoin)

**HTTP endpoint**: 

```plaintext
https://filecoin-hyperspace.chainstacklabs.com/rpc/v0
```

**Web socket endpoint**:

```plaintext
wss://ws-filecoin-hyperspace.chainstacklabs.com/rpc/v0
```

#### Ankr RPC 

The Ankr RPC API, maintained by Ankr, provides HTTP and websocket endpoint with a limited number of API methods for both mainnet and testnet. For the most up-to-date information on, see the [official Ankr documentation](https://www.ankr.com/docs/rpc-service/chains/chains-list/#networks-9)

**Mainet HTTP endpoint**: 

```plaintext
https://rpc.ankr.com/filecoin
```

**Testnet HTTP endpoint**: 

```plaintext
https://rpc.ankr.com/filecoin_testnet
```

**Supported API methods for mainnet endpoint:**
The HTTP and websocket endpoints for mainnet currently support [these API methods.](https://www.ankr.com/docs/rpc-service/chains/chains-list/#api-methods-9)

**Supported API methods for testnet endpoint**
The HTTP and websocket endpoints for testnet currently support all [supported mainet API methods](https://www.ankr.com/docs/rpc-service/chains/chains-list/#api-methods-9) listed above, along with applicable EVM-compatible methods, except for those listed as [unsupported](https://www.ankr.com/docs/rpc-service/chains/chains-list/#unsupported-9).
