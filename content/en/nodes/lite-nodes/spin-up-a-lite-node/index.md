---
title: "Spin up a lite-node"
description: "A full-node is a Filecoin node that has access to the full feature set of the Filecoin network. However, full-nodes can be difficult to spin up and expensive to maintain. Lite-nodes are a simplified node option that allow developers to perform lightweight tasks on a local node. This page covers how to spin-up a lite nodeon your local machine."
lead: "A full-node is a Filecoin node that has access to the full feature set of the Filecoin network. However, full-nodes can be difficult to spin up and expensive to maintain. Lite-nodes are a simplified node option that allow developers to perform lightweight tasks on a local node. This page covers how to spin-up a lite node on your local machine."
draft: false
images: []
type: docs
menu:
  nodes:
    parent: "nodes-lite-nodes"
    identifier: "spin-up-a-lite-node-1f7d187abfd5e063b67d8660a4de7b86"
weight: 100
toc: true
aliases:
    - "/developers/infrastructure/how-tos/spin-up-a-lite-node"
---

In this guide, we're going to use the {{< tooltip "Lotus" >}} Filecoin implementation. We'll show how to install a lite-node on MacOS and Ubuntu. For other Linux distributions, check out the [Lotus documentation](https://lotus.filecoin.io/lotus/install/linux/#building-from-source). To run a lite-node on Windows, install [WLS with Ubuntu](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-10#1-overview) on your system and follow the _Ubuntu_ instructions below.

## Prerequisites

Lite-nodes have relatively lightweight hardware requirements -- it's possible to run a lite-node on a Raspberry Pi 4. Your machine should meet the following hardware requirements:

1. At least 2 GiB of RAM
1. A dual-core CPU.

To build the lite-node, you'll need some specific software. Run the following command to install the software prerequisites:

{{< tabs tabTotal="2">}}
{{< tab tabName="MacOS" >}}
<br>

1. Ensure you have [XCode](https://developer.apple.com/xcode/) and [Homebrew](https://brew.sh/) installed.
1. Install the following dependencies:

    ```shell
    brew install go bzr jq pkg-config hwloc coreutils
    ```

1. Install Rust and source the `~/.cargo/env` config file:

    ```shell
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    source "$HOME/.cargo/env"
    ```

{{< /tab >}}
{{< tab tabName="Ubuntu" >}}

<br>

1. Install the following dependencies:

    ```shell
    sudo apt update -y
    sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y
    ```

1. Install Go and add `/usr/local/go/bin` to your `$PATH` variable:

    ```shell
    wget -c https://golang.org/dl/go1.18.8.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
    echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc
    ```

1. Install Rust and source the `~/.cargo/env` config file:

    ```shell
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    source "$HOME/.cargo/env"
    ```

1. Done! You can move on to the [Pre-build](#pre-build) section.

{{< /tab >}}
{{< /tabs >}}

## Pre-build

Before we can build the Lotus binaries, there's some setup we need to do. MacOS users should select their CPU architecture from the tabs:

{{< tabs tabTotal="3">}}
{{< tab tabName="MacOS-Intel" >}}
<br>

1. Clone the repository, and move into the `lotus` directory:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus/
    ```

1. Switch to the branch representing the network you want to use:

    ```shell
    git checkout releases # Mainnet
    ```

    Or...

    ```shell
    git checkout ntwk/hyperspace # Hyperspace testnet
    ```

1. Done! You can move on to the [Build](#build-the-binary) section.

{{< /tab >}}
{{< tab tabName="MacOS-M1/M2" >}}
<br>

1. Clone the repository:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus/
    ```

1. Switch to the branch representing the network you want to use:

    ```shell
    git checkout releases # Mainnet
    ```

    Or...

    ```shell
    git checkout ntwk/hyperspace # Hyperspace testnet
    ```

1. Create the necessary environment variables to allow Lotus to run on M1 architecture:

    ```shell
    export LIBRARY_PATH=/opt/homebrew/lib
    export FFI_BUILD_FROM_SOURCE=1
    export PATH="$(brew --prefix coreutils)/libexec/gnubin:/usr/local/bin:$PATH"
    ```

1. Done! You can move on to the [Build](#build-the-binary) section.

{{< /tab >}}
{{< tab tabName="Ubuntu" >}}
<br>

1. Clone the repository:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus/
    ```

1. Switch to the branch representing the network you want to use:

    ```shell
    git checkout releases # Mainnet
    ```

    Or...

    ```shell
    git checkout ntwk/hyperspace # Hyperspace testnet
    ```

1. If your processor was released later than an AMD Zen or Intel Ice Lake CPU, enable the use of SHA extensions by adding these two environment variables:

    ```shell
    export RUSTFLAGS="-C target-cpu=native -g"
    export FFI_BUILD_FROM_SOURCE=1
    ```

    If in doubt, ignore this command and move on to [the next section](#build-the-binary).

1. Done! You can move on to the [Build](#build-the-binary) section.

{{< /tab >}}
{{< /tabs >}}

## Build the binary

The last thing we need to do to get our node setup is to build the package. The command you need to run depends on which network you want to connect to:

{{< tabs tabTotal="2">}}
{{< tab tabName="Mainnet" >}}
<br>

1. Remove or delete any existing Lotus configuration files on your system:

    ```shell
    mv ~/.lotus ~/.lotus-backup
    ```

1. Make the Lotus binaries and install them:

    ```shell
    make clean all
    sudo make install
    ```

1. Once the installation finishes, query the Lotus version to ensure everything is installed successfully and for the correct network:

    ```shell
    lotus --version
    ```

    ```plaintext
    lotus --version
    lotus version 1.19.1-dev+mainnet+git.94b621dd5
    ```

{{< /tab >}}
{{< tab tabName="Hyperspace" >}}
<br>

1. Remove or delete any existing Lotus configuration files on your system:

    ```shell
    mv ~/.lotus ~/.lotus-backup
    ```

1. Make the Lotus binaries and install them:

    ```shell
    make clean && make hyperspacenet
    sudo make install
    ```

1. Once the installation finishes, query the Lotus version to ensure everything is installed successfully and for the correct network:

    ```shell
    lotus --version
    ```

    ```plaintext
    lotus --version
    lotus version 1.19.1-dev+hyperspacenet+git.94b621dd5.dirty
    ```

{{< /tab >}}
{{< /tabs >}}

## Start the node

Let's start the lite-node by connecting to a remote full-node. We can use the public full-nodes from [https://www.glif.io](https://www.glif.io):

{{< tabs tabTotal="2">}}
{{< tab tabName="Mainnet" >}}
<br>

1. Create an environment variable called `FULLNODE_API_INFO` and set it to the WebSockets address of the node you want to connect to. At the same time, start the Lotus daemon with the `--lite` tag:

    ```shell
    FULLNODE_API_INFO=wss://wss.mainnet.node.glif.io/apigw/lotus lotus daemon --lite
    ```

    ```shell
    2023-01-26T11:18:54.251-0400    INFO    main    lotus/daemon.go:219     lotus repo: /Users/johnny/.lotus
    2023-01-26T11:18:54.254-0400    WARN    cliutil util/apiinfo.go:94      API Token not set and requested, capabilities might be limited.

    ...
    ```

1. The Lotus daemon will continue to run in this terminal window. All subsequent commands we use should be done in a separate terminal window.
{{< /tab >}}
{{< tab tabName="Hyperspace" >}}
<br>

1. Create an environment variable called `FULLNODE_API_INFO` and set it to the WebSockets address of the node you want to connect to. At the same time, start the Lotus daemon with the `--lite` tag:

    ```shell
    FULLNODE_API_INFO=wss://wss.hyperspace.node.glif.io/apigw/lotus lotus daemon --lite
    ```

    ```shell
    2023-01-26T11:18:54.251-0400    INFO    main    lotus/daemon.go:219     lotus repo: /Users/johnny/.lotus
    2023-01-26T11:18:54.254-0400    WARN    cliutil util/apiinfo.go:94      API Token not set and requested, capabilities might be limited.

    ...
    ```

1. The Lotus daemon will continue to run in this terminal window. All subsequent commands we use should be done in a separate terminal window.
{{< /tab >}}
{{< /tabs >}}

## Expose the API

To send JSON-RPC requests to our lite-node we need to expose the API.

{{< tabs tabTotal="2">}}
{{< tab tabName="Mainnet" >}}
<br>

1. Open `~/.lotus/config.toml` and uncomment `ListenAddress` on line 6:

    ```toml
    [API]
      # Binding address for the Lotus API
      #
      # type: string
      # env var: LOTUS_API_LISTENADDRESS
      ListenAddress = "/ip4/127.0.0.1/tcp/1234/http"

      # type: string
      # env var: LOTUS_API_REMOTELISTENADDRESS
      # RemoteListenAddress = ""

    ...
    ```

1. Open the terminal window where your lite-node is running and press `CTRL` + `c` to close the daemon.
1. In the same window, restart the lite-node:

    ```shell
    FULLNODE_API_INFO=wss://wss.mainnet.node.glif.io/apigw/lotus lotus daemon --lite
    ```

    ```shell
    2023-01-26T11:18:54.251-0400    INFO    main    lotus/daemon.go:219     lotus repo: /Users/johnny/.lotus
    2023-01-26T11:18:54.254-0400    WARN    cliutil util/apiinfo.go:94      API Token not set and requested, capabilities might be limited.

    ...
    ```

1. The Lotus daemon will continue to run in this terminal window. All subsequent commands we use should be done in a separate terminal window.
{{< /tab >}}
{{< tab tabName="Hyperspace" >}}
<br>

1. Open `~/.lotus/config.toml` and uncomment `ListenAddress` on line 6:

    ```toml
    [API]
      # Binding address for the Lotus API
      #
      # type: string
      # env var: LOTUS_API_LISTENADDRESS
      ListenAddress = "/ip4/127.0.0.1/tcp/1234/http"

      # type: string
      # env var: LOTUS_API_REMOTELISTENADDRESS
      # RemoteListenAddress = ""

    ...
    ```

1. Open the terminal window where your lite-node is running and press `CTRL` + `c` to close the daemon.
1. In the same window restart the lite-node:

    ```shell
    FULLNODE_API_INFO=wss://wss.hyperspace.node.glif.io/apigw/lotus lotus daemon --lite
    ```

    ```shell
    2023-01-26T11:18:54.251-0400    INFO    main    lotus/daemon.go:219     lotus repo: /Users/johnny/.lotus
    2023-01-26T11:18:54.254-0400    WARN    cliutil util/apiinfo.go:94      API Token not set and requested, capabilities might be limited.

    ...
    ```

1. The Lotus daemon will continue to run in this terminal window. All subsequent commands we use should be done in a separate terminal window.
{{< /tab >}}
{{< /tabs >}}

The lite-node is now set up to accept local JSON-RPC requests! However, we don't have an authorization key, so we won't have access to privileged JSON-RPC methods.

## Create a key

To access privileged JSON-RPC methods, like creating a new wallet, we need to supply an authentication key with our Curl requests.

1. Create a new admin token and set the result to a new `LOTUS_ADMIN_KEY` environment variable:

    ```shell
    lotus auth create-token --perm "admin"
    ```

    ```plaintext
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.um-LqY7g-SDOsMheDRbQ9JIaFzus_Pan0J88VQ6ZLVE
    ```

1. Keep this key handy. We're going to use it in the next section.

## Send requests

Let's run a couple of commands to see if the JSON-RPC API is set up correctly.

1. First, let's grab the head of the Filecoin network chain:

    ```shell
    curl -X POST '127.0.0.1:1234/rpc/v0' \
    -H 'Content-Type: application/json' \
    --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.ChainHead","params":[]}' \
    | jq 
    ```

    ```plaintext
    {
      "jsonrpc": "2.0",
      "result": {
        "Cids": [
          {
            "/": "bafy2bzacead2v2y6yob7rkm4y4snthibuamzy5a5iuzlwvy7rynemtkdywfuo"
          },
          {
            "/": "bafy2bzaced4zahevivrcdoefqlh2j45sevfh5g3zsw6whpqxqjig6dxxf3ip6"
          },
    ...
    ```

1. Next, let's try to create a new wallet. Since this is a privileged method, we need to supply our auth key `eyJhbGc...`:

    ```shell
    curl -X POST '127.0.0.1:1234/rpc/v0' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.um-LqY7g-SDOsMheDRbQ9JIaFzus_Pan0J88VQ6ZLVE' \
    --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.WalletNew","params":["secp256k1"]}' \
    | jq
    ```

    ```plaintext
    {
      "jsonrpc": "2.0",
      "result": "t1vuc4eu2wgsdnce2ngygyzuxky3aqijqe7gj5qqa",
      "id": 1
    }
    ```

    The `result` field is the public key for our address. The private key is stored within our lite-node.

1. Set the new address as the default wallet for our lite-node:

    ```shell
    curl -X POST '127.0.0.1:1234/rpc/v0' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.um-LqY7g-SDOsMheDRbQ9JIaFzus_Pan0J88VQ6ZLVE' \
    --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.WalletSetDefault","params":["t1vuc4eu2wgsdnce2ngygyzuxky3aqijqe7gj5qqa"]}' \
    | jq 
    ```

    ```plaintext
    {
      "jsonrpc": "2.0",
      "id": 1
    }
    ```

## Next steps

You should now have a local lite-node connected to a remote full-node with an admin API key! You can use this setup to continue playing around with the JSON-RPC, or start building your applications on Filecoin!
<!--REVIEWED!-->