---
title: "RPCs"
description: "A public RPC endpoint is available for the Spacenet testnet."
lead: "A public RPC endpoint is available for the Spacenet testnet."
draft: false
images: []
type: docs
menu:
  networks:
    parent: "networks-spacenet"
    identifier: "spacenet-rpcs"
weight: 110
toc: true

---

This endpoint is currently limited to read-only [JSON RPC API calls]({{< relref "/reference/json-rpc/introduction" >}}).

- HTTP: `http://api.spacenet.ipc.space:1234/rpc/v1`
- Eudico lite-node command: 

    ```shell
    FULLNODE_API_INFO=/dns4/api.spacenet.ipc.space/tcp/1234/http ./eudico mir daemon --lite
    ```
<!--REVIEWED!-->