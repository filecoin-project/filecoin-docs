---
description: Public RPC endpoints are available for the Spacenet testnet.
---

# RPCs

## [Glif](https://glif.io)

* HTTPS: `https://api.spacenet.node.glif.io/` (defaults to /rpc/v1)
  * `https://api.spacenet.node.glif.io/rpc/v0`
  * `https://api.spacenet.node.glif.io/rpc/v1`

## Basic

This endpoint is currently limited to read-only [JSON RPC API calls](../../reference/json-rpc/).

* HTTP: `http://api.spacenet.ipc.space:1234/rpc/v1`
*   Eudico lite-node command:\


    ```shell
    FULLNODE_API_INFO=/dns4/api.spacenet.ipc.space/tcp/1234/http ./eudico mir daemon --lite
    ```
