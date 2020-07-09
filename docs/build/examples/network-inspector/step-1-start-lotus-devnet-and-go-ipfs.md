---
title: Step 1 - Start lotus-devnet and go-ipfs
description: This article describes how to spin up lotus-devnet and go-ipfs nodes for the purpose of this tutorial.
---

# Step 1 - Start lotus-devnet and go-ipfs

You can install and run lotus from source, as described in the [lotus docs](https://lotu.sh/en+getting-started), and then run a [local devnet](https://lotu.sh/en+setup-local-dev-net). For faster development cycles, this example uses a [fork](https://github.com/filecoin-shipyard/lotus-devnet) of Textile’s [localnet](https://github.com/textileio/lotus-devnet), which can be used to spin up lotus full nodes and lotus miners with mocked sector-builders (for faster storage mining processes), and to run a network with tunable parameters (e.g. block time). lotus-devnet is recommended for easier and faster development.

For this tutorial, please use the [lotus-devnet fork](https://github.com/filecoin-shipyard/lotus-devnet). For your own applications, please use [Textile’s localnet](https://github.com/textileio/lotus-devnet). See the full localnet docs [here](https://docs.textile.io/powergate/localnet/).

### Requirements

- Operating Systems: Linux or Mac
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (latest version)
- [Docker Compose](https://docs.docker.com/compose/) (latest version)

### Steps

1. In your terminal, clone the lotus-devnet repo and create a local lotus-devnet.

```
git clone https://github.com/filecoin-shipyard/lotus-devnet
cd lotus-devnet
make devnet BIGSECTORS=true
```

::: tip
Note on `BIGSECTORS`: When running the devnet setup, the Lotus node is configured with a mocked sector builder, using either "small" or "big" sector sizes. The practical effects of this configuration are on the size of files you can store in the devnet and how quickly the storage deals will complete. Using `BIGSECTORS=false` will limit you to storing files of around 700 bytes and deals will complete in 30-60 seconds. Using `BIGSECTORS=true` will allow you to store files anywhere from 1Mb to 400Mb, but deals will complete in 3-4 minutes. Be sure to choose the value that makes sense for your development scenario (from [Textile’s documentation](https://docs.textile.io/powergate/localnet/)).
:::

2. In a new terminal window, install go-ipfs following these [docs](https://docs.ipfs.io/how-to/command-line-quick-start/).

3. Initialize the go-ipfs daemon, configure IPFS to accept CORS requests, and start running the IPFS daemon.

```
ipfs init
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
ipfs daemon
```

You now have a running local devnet with lotus nodes and a local go-ipfs node.
