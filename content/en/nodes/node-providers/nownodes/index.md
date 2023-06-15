---
title: "NOWNodes"
description: ""
lead: "Instead of manually managing and running a node, developers can use third-party node providers like NOWNodes to execute transactions."
draft: false
images: []
type: docs
menu:
  nodes:
    parent: "nodes-node-providers"
    identifier: ""
weight: 100
toc: true
---


The NOWNodes RPC API, maintained by [NOWNodes](https://nownodes.io), provides mainnet nodes for Filecoin builders, especially for applications built on the Filecoin Virtual Machine. The NOWNodes Lotus RPC API supports JSON-RPC POST requests against the Lotus API. For further information on available methods, see the [official NOWNodes documentation](https://documenter.getpostman.com/view/13630829/TVmFkLwy#7f656a5d-bba9-43f8-affe-ce0ca8c3cbbd)


## Mainnet endpoints


```plaintext
https://fil.nownodes.io/rpc/v1
```


## Curl example


```shell
curl --location 'https://fil.nownodes.io/rpc/v1' \
--header 'api-key: your api-key' \
--header 'Content-Type: application/json' \
--data '{ "jsonrpc": "2.0", "method": "Filecoin.Version", "params": [], "id": 1 }'
```


```plaintext
{
  "jsonrpc": "2.0",
  "result": {
    "Version": "1.11.2+mainnet+git.785a54692",
    "APIVersion": 66304,
    "BlockDelay": 30
  },
  "id": 1
}
```


## Supported methods


The NOWNodes RPC API supports API request methods listed in the [NOWNodes official documentation](https://documenter.getpostman.com/view/13630829/TVmFkLwy#7f656a5d-bba9-43f8-affe-ce0ca8c3cbbd).
