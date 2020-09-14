---
title: 'Lotus JSON-RPC API reference'
description: 'This is the reference documentation for the Lotus JSON-RPC API.'
breadcrumb: 'Lotus API reference'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

Both the _Lotus Node_ and the _Lotus Miner_ serve a JSON-RPC API when started. This APIs are used by the `lotus` and `lotus-miners` CLI applications to control the running daemons, so all the necessary functionality performed by those applications also exists as API methods.

[[TOC]]

## Endpoints

The API can be accessed on:

- `http://[api:port]/rpc/v0` - HTTP RPC-API endpoint
- `ws://[api:port]/rpc/v0` - Websocket RPC-API endpoint
- `http://[api:port]/rest/v0/import` (PUT only) - REST endpoint for file import (multipart upload). It requires write permissions.

The _Lotus Node_ configures its listen interface and port in its [configuration](../get-started/lotus/configuration-and-advanced-usage) and the _Lotus Miner_ [own config file](../mine/lotus/miner-configuration).

## Methods

The [JSON-RPC](https://www.jsonrpc.org/specification) API matches directly the methods defined in the _Lotus API package_ ([link to the Go documentation](https://github.com/filecoin-project/lotus/api). This is the best place to discover what methods and types exist for the Lotus and the Lotus Miner APIs. For information on how to jump from a Go method definition to the JSON-RPC method see cURL examples below.

### Common methods

Common methods are available in both the Lotus Node API and the Lotus Miner API. The existing common methods are shown here:

[https://pkg.go.dev/github.com/filecoin-project/lotus/api?tab=doc#Common](https://pkg.go.dev/github.com/filecoin-project/lotus/api?tab=doc#Common)

### Lotus Node methods

The following methods are only provided by the Lotus Node API:

[https://pkg.go.dev/github.com/filecoin-project/lotus/api?tab=doc#FullNode](https://pkg.go.dev/github.com/filecoin-project/lotus/api?tab=doc#FullNode)

### Lotus Miner methods

The following methods are specific to the Lotus Miner API:

[https://pkg.go.dev/github.com/filecoin-project/lotus/api?tab=doc#StorageMiner](https://pkg.go.dev/github.com/filecoin-project/lotus/api?tab=doc#StorageMiner)

## API client libraries

Read the [Lotus client libraries page](../build/lotus/api-client-libraries) for an overview of existing clients.

Lotus uses its own Go library implementation of [JSON-RPC](https://github.com/filecoin-project/go-jsonrpc). An example on how to use the client side of it is available [here](../build/lotus/go-json-rpc).

## cURL examples

To demonstrate making an API request, we will take the method `ChainHead` from [api/api_full.go](https://github.com/filecoin-project/lotus/blob/master/api/api_full.go) and create a CURL command. The method is defined as:

```go
ChainHead(context.Context) (*types.TipSet, error)
```

Thus, `ChainHead` will translate as the following [JSON-RPC](https://www.jsonrpc.org/specification) request object:

```json
{
  "jsonrpc": "2.0",
  "method": "Filecoin.ChainHead",
  "params": [],
  "id": 1
}
```

Note the `id` is an arbitrary **number**.

In order to make a cURL request we will also need an [authorization token, which can be easily generated](../build/lotus/api-token-generation.md).

```sh
curl -X POST \
	 -H "Content-Type: application/json" \
	 -H "Authorization: Bearer $(cat ~/.lotusminer/token)" \
	 --data '{ "jsonrpc": "2.0", "method": "Filecoin.ChainHead", "params": [], "id": 1 }' \
	 'http://127.0.0.1:1234/rpc/v0'
```

The response will be a JSON object corresponding to the [Typset type](https://pkg.go.dev/github.com/filecoin-project/lotus/chain/types?tab=doc#TipSet) (which is actually serialized to JSON from the [ExpTipSet type](https://pkg.go.dev/github.com/filecoin-project/lotus/chain/types?tab=doc#ExpTipSet)).

Let us now make a request with parameters using the [ChainGetMessage method](https://pkg.go.dev/github.com/filecoin-project/lotus/api?tab=doc#FullNode) for a message with CID `bafy2bzacedcdedrghloawlwkntdhqnknqzxgh26ddwix7ld2a5ygagco3ngee`. Per the above, the JSON-RPC request payload will look like:

```json
{
  "jsonrpc": "2.0",
  "method": "Filecoin.ChainGetMessage",
  "params": [
    { "/": "bafy2bzacedcdedrghloawlwkntdhqnknqzxgh26ddwix7ld2a5ygagco3ngee" }
  ],
  "id": 1
}
```

Notice how the CID has been serialized (a common pitfall).

The cURL request will then be:

```sh
curl -X POST \
	 -H "Content-Type: application/json" \
	 -H "Authorization: Bearer $(cat ~/.lotusminer/token)" \
	 --data '{"jsonrpc":"2.0","method":"Filecoin.ChainGetMessage","params":[{"/":"bafy2bzacedcdedrghloawlwkntdhqnknqzxgh26ddwix7ld2a5ygagco3ngee"}],"id":1}' \
	 'http://127.0.0.1:1234/rpc/v0'
```

And the response is a JSON-serialized [Message type](https://pkg.go.dev/github.com/filecoin-project/lotus/chain/types?tab=doc#Message)

All the above should help you getting bootstrapped to harness the power of the Lotus APIs!
