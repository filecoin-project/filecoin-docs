---
title: Configure Lotus for Development
description: How to configure Lotus for Development
---

# Configure Lotus for Development

After you have installed you can start configuring Lotus.

Requests to Lotus API are made against `127.0.0.1:1234` by default.

If you want to allow the **API to be called remotely** you need to modify `.lotus/config.toml` changing from:

```
# ListenAddress = /ip4/127.0.0.1/tcp/1234/http
```

to

```
ListenAddress = /ip4/0.0.0.0/tcp/1234/http
```

It's important to delete the `#` which is commenting the line.

## Requesting the API

To make requests to the API you need to include a token to authenticate requests. A token is automatically created and stored at `~/.lotus/token` on first run.

### Use the client

You can use the `go-jsonrpc` library to interact with the Lotus API node.

Import the necessary Go module to resolve the dependency

```bash
$ go get github.com/filecoin-project/go-jsonrpc
```

Here is a complete Go snippet on how to connect to the Lotus API

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

In the `go.mod` file you should see

```go
module github.com/user/myapp

go 1.14

require (
	github.com/filecoin-project/go-jsonrpc v0.1.2-0.20200822201400-474f4fdccc52
	github.com/filecoin-project/lotus v0.5.4
)
```
