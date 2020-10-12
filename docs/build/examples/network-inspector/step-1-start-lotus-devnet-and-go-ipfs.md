---
title: Step 1 - Start lotus-devnet and go-ipfs
description: This article describes how to spin up lotus-devnet and go-ipfs nodes for the purpose of this tutorial.
---

# Step 1 - Start lotus-devnet and go-ipfs

You can install and run lotus from source, and then run a local devnet. For faster development cycles, this example uses a [fork](https://github.com/filecoin-shipyard/lotus-devnet) of Textile’s [localnet](https://github.com/textileio/lotus-devnet), which can be used to spin up lotus full nodes and lotus miners with mocked sector-builders (for faster storage mining processes), and to run a network with tunable parameters (e.g. block time). lotus-devnet is recommended for easier and faster development.

For this tutorial, please use the [lotus-devnet fork](https://github.com/filecoin-shipyard/lotus-devnet). For your own applications, please use [Textile’s localnet](https://github.com/textileio/lotus-devnet). See the full localnet docs [here](https://docs.textile.io/powergate/localnet/).

## Requirements

- Operating Systems: Linux or Mac
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (latest version)
- [Docker Compose](https://docs.docker.com/compose/) (latest version)

## Steps

1. In your terminal, clone the lotus-devnet repo and create a local lotus-devnet.

```bash
git clone https://github.com/filecoin-shipyard/lotus-devnet
cd lotus-devnet
make devnet BIGSECTORS=true
```

In [filecoin-shipyard/lotus-devnet/docker-compose-devnet.yaml](https://github.com/filecoin-shipyard/lotus-devnet/blob/master/docker-compose-devnet.yaml), both the `services`: `lotus` and `ipfs` are started. In this setup, we are using IPFS integration, which supports making deals with data stored in IPFS, without having to re-import it into lotus.

The IPFS HTTP gateway running on `8080` within the container is exposed on `7070` on the host machine. This will be used to fetch data via filecoin retrieval deal.

```yaml
version: '3.7'

services:
  lotus:
    image: textile/lotus-devnet:v0.5.3
    ports:
      - 7777:7777
    environment:
      - TEXLOTUSDEVNET_SPEED=1500
      - TEXLOTUSDEVNET_BIGSECTORS=${BIGSECTORS}
      - TEXLOTUSDEVNET_IPFSADDR=/dns4/ipfs/tcp/5001
  ipfs:
    ports:
      - 7070:8080
```

::: tip
Note on `BIGSECTORS`: When running the devnet setup, the Lotus node is configured with a mocked sector builder, using either "small" or "big" sector sizes. The practical effects of this configuration are on the size of files you can store in the devnet and how quickly the storage deals will complete. Using `BIGSECTORS=false` will limit you to storing files of around 700 bytes and deals will complete in 30-60 seconds. Using `BIGSECTORS=true` will allow you to store files anywhere from 1Mb to 400Mb, but deals will complete in 3-4 minutes. Be sure to choose the value that makes sense for your development scenario (from [Textile’s documentation](https://docs.textile.io/powergate/localnet/)).
:::

2. In a new terminal window, install go-ipfs following these [docs](https://docs.ipfs.io/how-to/command-line-quick-start/).

3. Initialize the go-ipfs daemon, configure IPFS to accept CORS requests, and start running the IPFS daemon.

```bash
ipfs init
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
ipfs daemon
```

This IPFS node exposes:

- API endpoint on port `5001`.
- HTTP gateway on port `8080`.

::: tip
This IPFS node is used to demonstrate how to fetch data from an IPFS node which is not connected to a lotus node.
:::

You now have a running local devnet with lotus nodes and a local go-ipfs node.
