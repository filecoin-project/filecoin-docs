---
title: "Introduction"
description: "Find out how to manage and interact with the Filecoin network using the standard JSON-RPC API."
lead: "Find out how to manage and interact with the Filecoin network using the standard JSON-RPC API."
draft: false
images: []
type: docs
menu:
  reference:
    parent: "lorem"
    identifier: "introduction-0e4e3f3842c939bb1b4842a0a1c85e4d"
weight: 10
toc: true
aliases:
    - "/reference/overview/"
    - "/reference/lotus-api/"
    - "/developers/reference/json-rpc/introduction/"
---

## Quick start

The easiest way to test the API is to use Curl commands. A Curl command to the Filecoin network looks something like this:

```curl
curl --location --request POST '<NODE_ADDRESS>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"<API_METHOD_TO_CALL>",
    "params": [<ARRAY OF PARAMETERS>],
    "id":1
}'
```

## Step-by-step example

1. In a terminal window, use Curl to request the current chain head from a public [Glif](https://glif.io) node.

    ```shell
    curl -X POST 'https://api.node.glif.io' \
        -H 'Content-Type: application/json' \
        --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.ChainHead","params":[]}'
    ```

    ```shell
    {"jsonrpc":"2.0","result":{"Cids":[{"/":"bafy2bzaceayoigaf3v5muqmknpjfkguse43jp4t2zxhpmykhqynqhkdgpgybc"},{"/":"bafy2bzacecnrtzlhn6h75gm7tozhzuw77plvdhniwzfj7wgmyuju6wn573h22"},{"/":"bafy2bzacecygiaxfsqv7ecb2gvodzh74eret3pchwe5e4j5a3mzlwasvndi6i"},{"/":"bafy2bzacebe477tdmijfse4je2g63gnnkdgzj3ftq6zbygd7toszkrsjts6uu"},{"/":"bafy2bzacedoe6hcxy2cgqzbg4p7qolbd5imbjpjnz2tj4n7o3kw2md4uv2ttq"},{"/":"bafy2bzacec7wbqvskwvolireljmufszdu5nk37yyg4qtxgnrwbyipgoenmhc6"},{"/":"bafy2bzaceahxdiauteywlbjnwj3ntr72qcbamtq3nbvjzyn5wruithpyqyxbm"}],"Blocks":[{"Miner":"f0693008","Ticket":{"VRFProof":"uLR0LHfNBAfQzyYUVBiIEXzyblPv3yPIEsJQGTpaAvO1ZriPZ7wC2IFpw7mrz1RvDQEfsgRXGxb6APTRvrPiFEAe35RFNLKC9SYb64PNcDYwGY4de5LdlHfyUv+Ovwg5"}...
    ```

    The ChainHead endpoint doesn't require any input parameters, so we've left `params` an empty array `[]`.

1. The above command will output a large chunk of JSON data. You can use [JSON processor JQ](https://stedolan.github.io/jq/) to _prettify_ the output:

    ```shell
    curl -X POST 'https://api.node.glif.io' \
        -H 'Content-Type: application/json' \
        --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.ChainHead","params":[]}' \
        | jq
    ```

    ```json
    {
        "jsonrpc": "2.0",
            "result": {
                "Cids": [
                {
                    "/": "bafy2bzacecrbhy67by4upktab6rvbgd3w5jml7zog4ifoaupo35yo4rbbc4am"
                },
                {
                    "/": "bafy2bzacecm42csr2ysmgpj54lz762iom4n4gcafkerijirzsfzq3jni2gqyu"
                }
                ],
                "Blocks": [
                {
                    "Miner": "f0152747",
                    "Ticket": {
    ...
    ```

## Permissions

Each method has specific permissions that must be met before you can receive a response from a Filecoin node. Methods with the `read` permission can be called by anyone at anytime, without the need for a token. All other permissions require you to send an authentication along with you request.

- `read`: Read node state, no private data.
- `write`: Write to local store / chain, and read permissions.
- `sign`: Use private keys stored in wallet for signing, read and write permissions.
- `admin`: Manage permissions, read, write, and sign permissions.

## Authentication

Each node implementation has different ways to generate and manage authentication tokens. Take a look at your node's specific documentation:

- [Lotus](https://lotus.filecoin.io)
- [Venus](https://venus.filecoin.io)
- [Fuhon](https://github.com/filecoin-project/cpp-filecoin)

If you are using a node provider service like [Glif](https://glif.io) or [Chain.love](https://chain.love), take a look at your providers documentation to find out how to manage authentication tokens.
