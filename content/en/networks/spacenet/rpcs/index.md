---
title: "RPCs"
description: "Public RPC endpoints are available for the Spacenet testnet."
lead: "Public RPC endpoints are available for the Spacenet testnet."
draft: false
images: []
type: docs
menu:
  networks:
    parent: "networks-spacenet"
    identifier: "spacenet-rpcs"
weight: 410
toc: true

---

## [Glif](https://glif.io) (recommended)

- HTTPS: `https://api.spacenet.node.glif.io/` (defaults to /rpc/v1)
  - `https://api.spacenet.node.glif.io/rpc/v0`
  - `https://api.spacenet.node.glif.io/rpc/v1`

## Basic

This endpoint is currently limited to read-only [JSON RPC API calls]({{< relref "/reference/json-rpc/introduction" >}}).

- HTTP: `http://api.spacenet.ipc.space:1234/rpc/v1`
- Eudico lite-node command:

    ```shell
    FULLNODE_API_INFO=/dns4/api.spacenet.ipc.space/tcp/1234/http ./eudico mir daemon --lite
    ```
