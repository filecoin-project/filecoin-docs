---
title: "Glif"
description: ""
lead: "Instead of manually managing and running a node, developers can use third-party node providers like Glif to execute transactions."
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

The Glif Node RPC API is a publicly hosted Lotus endpoint that supports JSON-RPC POST requests against the Lotus API. The Glif Nodes RPC API provides both a standard endpoint and a WebSocket endpoint. For further information, see the [official endpoint page](https://api.hyperspace.node.glif.io/rpc/v1).

## HTTP endpoints

```plaintext
https://api.hyperspace.node.glif.io/rpc/v1
```

## WebSockets endpoints

```plaintext
wss://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1
```

## Curl example

```shell
curl -X POST 'https://api.node.glif.io' \
    -H 'Content-Type: application/json' \
    --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.ChainHead","params":[]}'
```

```json
{"jsonrpc":"2.0","result":{"Cids":[{"/":"bafy2bzaceayoigaf3v5muqmknpjfkguse43jp4t2zxhpmykhqynqhkdgpgybc"},{"/":"bafy2bzacecnrtzlhn6h75gm7tozhzuw77plvdhniwzfj7wgmyuju6wn573h22"},{"/":"bafy2bzacecygiaxfsqv7ecb2gvodzh74eret3pchwe5e4j5a3mzlwasvndi6i"},{"/":"bafy2bzacebe477tdmijfse4je2g63gnnkdgzj3ftq6zbygd7toszkrsjts6uu"},{"/":"bafy2bzacedoe6hcxy2cgqzbg4p7qolbd5imbjpjnz2tj4n7o3kw2md4uv2ttq"},{"/":"bafy2bzacec7wbqvskwvolireljmufszdu5nk37yyg4qtxgnrwbyipgoenmhc6"},{"/":"bafy2bzaceahxdiauteywlbjnwj3ntr72qcbamtq3nbvjzyn5wruithpyqyxbm"}],"Blocks":[{"Miner":"f0693008","Ticket":{"VRFProof":"uLR0LHfNBAfQzyYUVBiIEXzyblPv3yPIEsJQGTpaAvO1ZriPZ7wC2IFpw7mrz1RvDQEfsgRXGxb6APTRvrPiFEAe35RFNLKC9SYb64PNcDYwGY4de5LdlHfyUv+Ovwg5"}...
```

## Supported methods

The Glif Node API supports all API request methods listed in the [Lotus JSON-RPC API documentation](https://lotus.filecoin.io/developers/apis/json-rpc/).

## Further notes

Here is some extra information you might need to consider when using these nodes.

- All JSON-RPC requests must include the header `"Content-Type": "application/json"`
- For Lotus Lite, use `FULLNODE_API_INFO=wss://wss.hyperspace.node.glif.io/apigw/lotus lotus daemon --lite`
<!--REVIEWED!-->