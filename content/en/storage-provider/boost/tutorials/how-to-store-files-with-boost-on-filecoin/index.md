---
title: "How to store files with Filecoin Boost"
description: "This tutorial guides through all the steps required to make a data storage deal with
  Filecoin Boost"
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "how-to-store-files-with-boost-on-filecoin-d8d2803652b1ec8b622b4c9b1c4fba75"
weight: 10
toc: true
---

First, you need to initialise a new Boost client and connect to a public Filecoin node. In this example, we are using the node run by [https://glif.io](https://glif.io):

```
export FULLNODE_API_INFO=https://api.node.glif.io

boost init
```

The `init` command will output your new wallet address, and warn you that the market actor is not initialised.

```
boost init

boost/init_cmd.go:53    default wallet set      {"wallet": "f3wfbcudimjcqtfztfhoskgls5gmkfx3kb2ubpycgo7a2ru77temduoj2ottwzlxbrbzm4jycrtu45deawbluq"}
boost/init_cmd.go:60    wallet balance  {"value": "0"}
boost/init_cmd.go:65    market actor is not initialised, you must add funds to it in order to send online deals
```

Then you need to send funds to the wallet, and add funds to the market actor (in the example below we are adding `1 FIL`).

You can use the `boostx` utilities to add funds to the market actor:

```
boostx market-add 1
```

You can confirm that the market actor has funds by running `boost init` again.

After that you need to generate a `car` file for data you want to store on Filecoin, and note down its `payload-cid`:

```
boostx generate-car ./my-data ./my-data.car

Payload CID:  bafykbzacedzjq6jvlqnclrseq8pp5lypa6ozuqgug3wjie3orh67berkwv7e4
```

Then you need to calculate the `commp` and `piece size` for the generated `car` file:

```
boostx commp ./my-data.car

CommP CID:  baga6ea4seaqjaxked6ovoj5f3bdisfeuwtjhrzh3s34mg5cyzevgoebe7tdckdi
Piece size:  2097152
Car file size: 1101978 
```

Place the generated `car` file on a public HTTP server, so that a storage provider can later fetch it.

Finally, trigger an online storage deal with a given storage provider:

```
export FULLNODE_API_INFO=https://api.node.glif.io

boost deal --verified=false \
           --provider=f0026876 \
           --http-url=https://public-http-server.com/my-data.car \
           --commp=baga6ea4seaqjaxked6ovoj5f3bdisfeuwtjhrzh3s34mg5cyzevgoebe7tdckdi \
           --car-size=1101978 \
           --piece-size=2097152 \
           --payload-cid=bafykbzacedzjq6jvlqnclrseq8pp5lypa6ozuqgug3wjie3orh67berkwv7e4
```
