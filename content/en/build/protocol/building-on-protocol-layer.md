---
title: "Building on the protocol layer"
description: "This quickstart aims to give you a taste of working directly with the Filecoin protocol in less than 5 minutes. We will use JSON RPC API calls and curl to read public chain data from Filecoin."
menu:
    build:
        parent: "protocol-layer"
weight: 10
---

If you are building tooling such as wallets, exchanges, and developer tools, you may wish to interact directly with Filecoin’s protocol layer. This section includes resource pages for building directly on the protocol layer, and quickstart guides for [curl](#curl-quickstart) and [NodeJS].

See [Available Networks](https://docs.filecoin.io/networks/overview/) for information on test networks and Mainnet. 

## Curl Quickstart

This quickstart aims to give you a taste of working directly with the Filecoin protocol in less than 5 minutes. We will use JSON RPC API calls along with [curl](https://curl.se/), a command-line utility that’s pre-installed into most Linux distributions, to read public chain data from Filecoin.

In this tutorial, you will learn how to: 
* [Get current block height](#get-current-block-height)
* [Get tipset by height and find block CID](#get-tipset-by-height-and-find-block-cid)
* [Get block details](#get-block-details)

**A note on authentication:** Publicly hosted nodes only support unsigned methods that don’t require an API token. To use all of the methods, you’ll need to host your own node or get access to a [dedicated hosted node](https://lotus.filecoin.io/lotus/developers/glif-nodes/). For more details, see [Lotus API access](https://lotus.filecoin.io/reference/basics/api-access/).

### Get current block height

Let’s start by getting the current block height of the chain. This can be found by reading the current highest tipset using the `Filecoin.ChainHead` method:

```
curl -X POST 'https://api.node.glif.io' -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.ChainHead","params":[]}' -H "Accept: application/json" -s | jq
```


This call will return plenty of information, but we are only interested in the `Height` parameter:


```
{
    "result": {
        "Cids": [
            {
                "/": "bafy2bzacedr7iporlwiwnpx57mnanrncfa7aegyuoduosyk36mcesqvpoyrns"
            },
            ...
        ],
        "Height": 1956488,
        "Blocks": [
            { ... }
        ]
    },
    "id": 1,
    "jsonrpc": "2.0"
}
```

At the time of writing, the block height is 1956488. You can confirm the current block height via any block explorer, such as [Filfox](https://filfox.info/en).

## Get tipset by height and find block CID

Now we have the height, we can query the node to find the tipset by this height. A tipset is a set of blocks that each have the same height and parent tipset. Filecoin’s consensus mechanism allows zero or multiple blocks at each epoch; blocks from the same epoch are assembled into tipsets.

Use `ChainGetTipSetByHeight` to get the tipset at a given block height:

```
curl -X POST 'https://api.node.glif.io' -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.ChainGetTipSetByHeight","params":[1918961]}' -H "Accept: application/json" -s | jq
```


You’ll get a long response, including snippets like this:


```
{
    "result": {
        "Cids": [
            {
                "/": "bafy2bzacebrrj32tuexypcohrqwc2nh4q6ju5geughmsfrlpxcw7lswzbrvnw"
            },
            ...
        ],
        "Height": 1918961,
        "Blocks": [
            {
                "ElectionProof": {
                    "WinCount": 1,
                    "VRFProof": "lbNIXkbkfNPsrl0L38CY2/Lx1N+3VBtk9zxdX69RyuFC8wEP0A0XP2ddG4aSat/KFjSvljf8EouYscDU7Vognow9W7OajtlN2AVYzRdYO61J+GY9pt+FYoxAzJN1JN1D"
                },
                ...
            },
            ...
        ]
    },
    "jsonrpc": "2.0",
    "id": 1
}
```

Let’s use a block CID from `Cids` to get the detail of just one block and inspect it in the next call. Copy "bafy2bzacebrrj32tuexypcohrqwc2nh4q6ju5geughmsfrlpxcw7lswzbrvnw" and keep it for our next step.

### Get block details

Now, let’s use `ChainGetBlock` and the block CID to retrieve details related to that block.

```
curl -X POST 'https://api.node.glif.io' -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.ChainGetBlock","params":[
  {
    "/": "bafy2bzacebrrj32tuexypcohrqwc2nh4q6ju5geughmsfrlpxcw7lswzbrvnw"
  }
]}' -H "Accept: application/json" -s | jq .
```

You’ll get a response formatted like this: 

```
{
    "result": {
        "ElectionProof": {
            "WinCount": 1,
            "VRFProof": "lbNIXkbkfNPsrl0L38CY2/Lx1N+3VBtk9zxdX69RyuFC8wEP0A0XP2ddG4aSat/KFjSvljf8EouYscDU7Vognow9W7OajtlN2AVYzRdYO61J+GY9pt+FYoxAzJN1JN1D"
        },
        "BLSAggregate": {
            "Type": 2,
            "Data": "r3vRjWMMSkb/XbIlVm/vaTWKIvl6xaRhxX2R7R06raf58mzaSbH5I0PMQiT+9QKXBgnWNrCYsZoGXb4mDMZjKHZEnD8Z/WF61F705RoMe64XX4V2Bsm0+W8CBtN8GuLJ"
        },
        "Miner": "f01675012",
        "Messages": {
            "/": "bafy2bzacec2eo4izghntphsouvi7dfzvfqxvzmghjifw34jpiza4prq7ib6gi"
        },
        "BlockSig": {
            "Type": 2,
            "Data": "ka6nv7gbeXTDuJKUXPZoknVCEPGI1gcVbiVvT7lNP+cTKB+vAdF7+pTIy532JvWpF397UTXOR1I7GhxK5ElY6mMnWlFjEw2Tl1rdWwg19tK9nqZCzGaCPOvDeR+RGqS4"
        },
        "BeaconEntries": [
            {
                "Data": "grEqjWmRPLP+eR4fTzb770Undx8AYDrUIU9mZ+Qr5cgiMgi5QbPNavKDpb6lJ2jbFoAluYRx+N+JoQPm+7vfC7SsrEQELFc1LnQwDZ/OD05J81IDNVsXPoiiQ28Q9gVV",
                "Round": 2014805
            }
        ],
        "WinPoStProof": [
            {
                "ProofBytes": "iwGv022aM97e5X9q+yQVQsMHfMcPTBjakji5Ys27W2b+0U7s8fTHqcnzI+PRWjhzgs45E+nvLvh4vOImhNLopLEpQh+Whn8HUANN+ChteCsAFsFw+ZNPgmd/MUNZVPEYBIPdtBsnEZXq28rTEQYbJJizQ463TsEbSJa0Xy7LGlnksMwo85cPMprio78xxVTjoadduGgxld60kK7vpTwktV1dpZsyk7w2E/X7cHJZoQ1+YnCr3Rk5WdLuTgoVic2S",
                "PoStProof": 3
            }
        ],
        "Parents": [
            {
                "/": "bafy2bzaceafxc544aggeim7nx5aws3v5c4rhxmdewovfoirzo5icle4ibcaac"
            },
            {
                "/": "bafy2bzacebiugsg6m3is47p7wsztnhlhkeg5vkzuapcucvxl2prwbvrbblfha"
            },
            {
                "/": "bafy2bzaceaipzlpzrhq7xxeuz37ymhmiisajatolqff5a2jhf3ttum3hlukm4"
            },
            {
                "/": "bafy2bzacec4epy47nubciwsgspvf33wxl6ryejonf2lon5ikoafefhtq5iram"
            }
        ],
        "Ticket": {
            "VRFProof": "gQhNDq5AuLceYg1rc7pior/h3eGJeoL020M2czgaYn8MKT4wcQe2MwBwvDYplfxJEWt1ywsS5m/Gt2Obcde4axL5pCSaYXvKXddiKQJs8lwM9/G0yfxmNkEfILtd7nwC"
        },
        "ParentStateRoot": {
            "/": "bafy2bzaceb2muaf5km4i2jxa55ovzzrgtukf6gie3s7sprpvzn7osick4gori"
        },
        "Timestamp": 1655875230,
        "Height": 1918961,
        "ParentBaseFee": "125249085",
        "ForkSignaling": 0,
        "ParentWeight": "44698197127",
        "ParentMessageReceipts": {
            "/": "bafy2bzacedj3xqgx6bmkfadtahaoav2s44iuwprhxdea5jkudzjawmfdawpxc"
        }
    },
    "jsonrpc": "2.0",
    "id": 1
}
```

You can see this block contains the miner’s address, the Ticket, the Proof of SpaceTime (PoSt), the CID of the parents where this block evolved from in the IPLD DAG, and its own CIDs. 

A few definitions: 

* **_Parents: _**CIDs of the parent tipset’s blocks
* **_Miner: _**The actor address of the miner that produced this block
* **_ElectionProof_**: Shows the ticket is a winning ticket
* **_WinPoStProof_**: The WinningPoSt proof that the chosen miner must submit to the network 
* **_Messages_: **CIDs of the messages packed into this block

🎉 You’ve reached the end of the quickstart!

Want to keep going with more in-depth API calls such as signing messages, storing data, and more? Check out the [Building with Lotus APIs](https://lotus.filecoin.io/tutorials/lotus/build-with-lotus-api/) tutorial and the [Lotus API Reference](https://lotus.filecoin.io/reference/basics/overview/). 
