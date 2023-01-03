---
title: "As a client"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "as-a-client-4c0ca708371872d466d37fad19e7f4ae"
weight: 20
toc: true
---
Boost comes with a client executable, `boost`, that can be used to send a deal proposal to a Boost server.

The client is intentionally minimal. It does not require a daemon process, and can be pointed at any public Filecoin API for on-chain operations. This means that users of the client do not need to run a Filecoin node that syncs the chain.

### Set the API endpoint environment variable

```
export FULLNODE_API_INFO=<filecoin API endpoint>
```

{{< alert  >}}
There are a number of public Filecoin APIs ran by a number of organisations, such as Infura, Glif, etc. For test purposes you can try: \
\
`export FULLNODE_API_INFO=https://api.node.glif.io`
{{< /alert  >}}

### Initialize the client

```
boost -vv init
```

The `init` command

* Creates a Boost client repository (at `~/.boost-client` by default)
* Generates a libp2p peer ID key
* Generates a wallet for on-chain operations and outputs the wallet address

### Add funds to the wallet and to the market actor

To make deals you will need to:\
a) add funds to the wallet\
b) add funds to the market actor for that wallet address

### Make a storage deal

Currently, we don't distribute binaries, so you will have to build from source.

```bash
boost -vv deal --provider=<f00001> \
               --http-url=<https://myserver/my.car> \
               --commp=<commp> \
               --car-size=<car-size> \
               --piece-size=<piece-size> \
               --payload-cid=<payload-cid>

```

When a storage provider accepts the deal, you should see output of the command similar to:

```
sent deal proposal
  deal uuid: 9e68fb16-ff9a-488e-ad0a-1289b512d176
  storage provider: f0127896
  client wallet: f1sw5zjcyo4mff5cbvgsgmm8uoko6gcr4tptvtkhy
  payload cid: bafyaa6qshafcmalqudsbeidrunclaep6mdbipm2gjfvuosjfd6cbqd6th7bshy5hi5npxe727yjaagelucbyabasgafcmalqudsaeieapsxspo2i36no36n7yitswsxdazvziwvgj4vbp2scuxasrc6n4ejaage3r7m3saykcqeaegeavdllsbzaqcaibaaeecakrvvzam
  url: https://webserver/file.car
  commp: baga6ea4seaqh5prrl6ykov4t64k6m5giijsc44dcxtdnzsp4izjakqhs7twauiq
  start epoch: 1700711
  end epoch: 2219111
  provider collateral: 358.687 μFIL
```

### Check deal status

You can check the `deal status` with the following command:

```
boost deal-status --provider=<provider> --deal-uuid=<deal-uuid>
```

```
got deal status response
  deal uuid: 9e68fb16-ff8a-488e-ad0a-1289b512d176
  deal status: Transfer Queued
  deal label: bafyaa6qsgafcmalqudsaeidrunclaep6mdbipm2gjfvuosjfd6cbqd6th7bshy5hi5npxe727yjaagelucbyabasgafcmalqudsaeieapsxspo2i36no36n7yitswsxdazvziwvgj4vbp2scuxasrc6n4ejaage3r7m3saykcqeaegeavdllsbzaqcaibaaeecakrvvzam
  publish cid: <nil>
  chain deal id: 0
```
