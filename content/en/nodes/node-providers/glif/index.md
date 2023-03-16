---
title: "Glif"
description: ""
lead: "Instead of running a node and manually managing that infrastructure, developers can use third-party node providers like Glif to execute their transactions."
draft: false
images: []
type: docs
menu:
  nodes:
    parent: "nodes-node-providers"
    identifier: "glif-4c337bc2be7b70e42087645fa591127f"
weight: 100
toc: true
---

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
