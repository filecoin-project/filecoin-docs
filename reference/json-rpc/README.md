---
description: >-
  Find out how to manage and interact with the Filecoin network using the
  standard JSON-RPC API.
---

# JSON-RPC

## Quick start

The easiest way to test the API is to use Curl commands. A Curl command to the Filecoin network looks something like this:

```sh
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

```sh
curl -X POST 'https://api.node.glif.io' \
    -H 'Content-Type: application/json' \
    --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.ChainHead","params":[]}'
```

The ChainHead endpoint doesn’t require any input parameters, so we’ve left `params` an empty array `[]`.

2. The above command will output a large chunk of JSON data. You can use [JSON processor JQ](https://stedolan.github.io/jq/) to _prettify_ the output:

{% code fullWidth="false" %}
```sh
curl -X POST 'https://api.node.glif.io' \
    -H 'Content-Type: application/json' \
    --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.ChainHead","params":[]}'
```
{% endcode %}

This will output something like:

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

* `read`: Read node state, no private data.
* `write`: Write to local store / chain, and read permissions.
* `sign`: Use private keys stored in wallet for signing, read and write permissions.
* `admin`: Manage permissions, read, write, and sign permissions.

## Authentication

Each node implementation has different ways to generate and manage authentication tokens. Take a look at your node’s specific documentation:

* [Lotus](https://lotus.filecoin.io)
* [Venus](https://venus.filecoin.io)

If you are using a node provider service like [Glif](https://glif.io) or [Chain.love](https://chain.love), take a look at your providers documentation to find out how to manage authentication tokens.
