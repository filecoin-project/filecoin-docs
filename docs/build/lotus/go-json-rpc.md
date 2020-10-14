---
title: 'Lotus: Use Go with JSON-RPC APIs'
description: "This is a guide on how to use the Filecoin Project's json-rpc library to power a Go client to interact with the Lotus API."
breadcrumb: 'Use Go with JSON-RPC APIs'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

To use the Lotus Go client, the [go-jsonrpc](https://github.com/filecoin-project/go-jsonrpc) library can be used to interact with the Lotus API node. This library was written by Lotus developers and it is used by Lotus itself.

First, you can import the necessary Go module to resolve the dependency:

```bash
$ go get github.com/filecoin-project/go-jsonrpc
```

## Preparation

- If your Lotus instance is hosted remotely, ensure that you have [enabled remote API access](enable-remote-api-access.md).
- You will need to [obtain an API token](api-tokens.md)

## Use the client

Here is a complete snippet on how to connect to the Lotus API:

```go
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/filecoin-project/go-jsonrpc"
	"github.com/filecoin-project/lotus/api/apistruct"
)

func main() {
	authToken := "<value found in ~/.lotus/token>"
	headers := http.Header{"Authorization": []string{"Bearer " + authToken}}
	addr := "127.0.0.1:1234"

	var api apistruct.FullNodeStruct
	closer, err := jsonrpc.NewMergeClient(context.Background(), "ws://"+addr+"/rpc/v0", "Filecoin", []interface{}{&api.Internal, &api.CommonStruct.Internal}, headers)
	if err != nil {
		log.Fatalf("connecting with lotus failed: %s", err)
	}
	defer closer()

       // Now you can call any API you're interested in.
	tipset, err := api.ChainHead(context.Background())
	if err != nil {
		log.Fatalf("calling chain head: %s", err)
	}
	fmt.Printf("Current chain head is: %s", tipset.String())
}

```

Run `go mod init` as well to setup your `go.mod` file and you are ready to go!
