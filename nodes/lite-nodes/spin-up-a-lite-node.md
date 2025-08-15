---
description: >-
  Lite-nodes are a simplified node option that allows developers to perform
  lightweight tasks on a local node. This page covers how to spin up a lite node
  on your local machine.
---

# Spin up a lite-node

In this guide, we will use the [Lotus](../implementations/lotus.md) Filecoin implementation to install a lite-node on MacOS and Ubuntu. For other Linux distributions, check out the [Lotus documentation](https://lotus.filecoin.io/lotus/install/linux/#building-from-source). To run a lite-node on Windows, install [WSL with Ubuntu](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-10#1-overview) on your system and follow the _Ubuntu_ instructions below.

## Prerequisites

Lite-nodes have relatively lightweight hardware requirements. Your machine should meet the following hardware requirements:

1. At least 2 GiB of RAM
2. A dual-core CPU.
3. At least 4 GiB of storage space.

To build the lite-node, you’ll need some specific software. Run the following command to install the software prerequisites:

{% tabs %}
{% tab title="MacOS" %}
1. Ensure you have [XCode](https://developer.apple.com/xcode/) and [Homebrew](https://brew.sh/) installed.
2.  Install the following dependencies:

    ```shell
    brew install go jq pkg-config hwloc coreutils rust
    ```
{% endtab %}

{% tab title="Ubuntu" %}
1.  Install the following dependencies:

    ```shell
    sudo apt update -y
    sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y
    ```
2.  [Install Go](https://go.dev/doc/install) and add `/usr/local/go/bin` to your `$PATH` variable:

    ```shell
    wget https://go.dev/dl/go1.21.7.linux-amd64.tar.gz
    sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.21.7.linux-amd64.tar.gz
    echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc
    ```
3.  [Install Rust](https://www.rust-lang.org/tools/install), choose the standard installation option, and source the `~/.cargo/env` config file:

    ```shell
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    source "$HOME/.cargo/env"
    ```
{% endtab %}
{% endtabs %}

## Pre-build

Before we can build the Lotus binaries, we need to follow a few pre-build steps. MacOS users should select their CPU architecture from the tabs:

{% tabs %}
{% tab title="MacOS Intel" %}
1.  Clone the repository and move into the `lotus` directory:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus/
    ```
2.  Retrieve the latest Lotus release version:

    ```shell
    git tag -l 'v*' | grep -v '-' | sort -V -r | head -n 1
    ```

    This should output something like:

    ```output
    v1.33.1
    ```
3.  Using the value returned from the previous command, checkout to the latest release branch:

    ```shell
    git checkout v1.33.1
    ```
4. Done! You can move on to the [Build](https://docs.filecoin.io/nodes/lite-nodes/spin-up-a-lite-node/#build-the-binary) section.
{% endtab %}

{% tab title="MacOS ARM" %}
1.  Clone the repository and move into the `lotus` directory:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus
    ```
2.  Retrieve the latest Lotus release version:

    ```shell
    git tag -l 'v*' | grep -v '-' | sort -V -r | head -n 1
    ```

    This should output something like:

    ```output
    v1.33.1
    ```
3.  Using the value returned from the previous command, checkout to the latest release branch:

    ```shell
    git checkout v1.33.1
    ```
4.  Create the necessary environment variables to allow Lotus to run on M1 architecture:

    ```bash
    export LIBRARY_PATH=/opt/homebrew/lib
    export FFI_BUILD_FROM_SOURCE=1
    export PATH="$(brew --prefix coreutils)/libexec/gnubin:/usr/local/bin:$PATH"
    ```
5. Done! You can move on to the [Build](https://docs.filecoin.io/nodes/lite-nodes/spin-up-a-lite-node/#build-the-binary) section.
{% endtab %}

{% tab title="Ubuntu" %}
1.  Clone the repository and move into the `lotus` directory:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus
    ```
2.  Retrieve the latest Lotus release version:

    ```shell
    git tag -l 'v*' | grep -v '-' | sort -V -r | head -n 1
    ```

    This should output something like:

    ```output
    v1.33.1
    ```
3.  Using the value returned from the previous command, checkout to the latest release branch:

    ```shell
    git checkout v1.33.1
    ```
4.  If your processor was released later than an AMD Zen or Intel Ice Lake CPU, enable SHA extensions by adding these two environment variables. If in doubt, ignore this command and move on to [the next section](https://docs.filecoin.io/nodes/lite-nodes/spin-up-a-lite-node/#build-the-binary).

    ```shell
    export RUSTFLAGS="-C target-cpu=native -g"
    export FFI_BUILD_FROM_SOURCE=1
    ```
5. Done! You can move on to the Build section.
{% endtab %}
{% endtabs %}

## Build the binary

The last thing we need to do to get our node setup is to build the package. The command you need to run depends on which network you want to connect to:

{% tabs %}
{% tab title="Mainnet" %}
1.  Remove or delete any existing Lotus configuration files on your system:

    ```shell
    mv ~/.lotus ~/.lotus-backup
    ```
2.  Make the Lotus binaries and install them:

    ```shell
    make clean all
    sudo make install
    ```
3.  Once the installation finishes, query the Lotus version to ensure everything is installed successfully and for the correct network:

    ```shell
    lotus --version
    ```

    This will output something like:

    ```plaintext
    lotus version 1.33.1+mainnet+git.1ff3b360b
    ```
{% endtab %}

{% tab title="Calibration" %}
1.  Remove or delete any existing Lotus configuration files on your system:

    ```shell
    mv ~/.lotus ~/.lotus-backup
    ```
2.  Make the Lotus binaries and install them:

    ```shell
    make clean && make calibrationnet
    sudo make install
    ```
3.  Once the installation finishes, query the Lotus version to ensure everything is installed successfully and for the correct network:

    ```shell
    lotus --version
    ```

    This will output something like:

    ```plaintext
    lotus version 1.33.1+calibnet+git.1ff3b360b
    ```
{% endtab %}
{% endtabs %}

## Start the node

Let's start the lite-node by connecting to a remote full-node. We can use the public full-nodes from [glif.io](https://www.glif.io/en):

{% tabs %}
{% tab title="Mainnet" %}
1.  Create an environment variable called `FULLNODE_API_INFO` and set it to the WebSockets address of the node you want to connect to. At the same time, start the Lotus daemon with the `--lite` tag:

    ```shell
    FULLNODE_API_INFO=wss://wss.node.glif.io/apigw/lotus lotus daemon --lite
    ```

    This will output something like:

    ```plaintext
    2023-01-26T11:18:54.251-0400    INFO    main    lotus/daemon.go:219     lotus repo: /Users/johnny/.lotus
    2023-01-26T11:18:54.254-0400    WARN    cliutil util/apiinfo.go:94      API Token not set and requested, capabilities might be limited.
    ...
    ```
2. The Lotus daemon will continue to run in this terminal window. All subsequent commands we use should be done in a separate terminal window.
{% endtab %}

{% tab title="Calibration" %}
1.  Create an environment variable called `FULLNODE_API_INFO` and set it to the WebSockets address of the node you want to connect to. At the same time, start the Lotus daemon with the `--lite` tag:

    ```shell
    FULLNODE_API_INFO=wss://wss.calibration.node.glif.io/apigw/lotus lotus daemon --lite
    ```

    This will output something like:

    ```plaintext
    2023-01-26T11:18:54.251-0400    INFO    main    lotus/daemon.go:219     lotus repo: /Users/johnny/.lotus
    2023-01-26T11:18:54.254-0400    WARN    cliutil util/apiinfo.go:94      API Token not set and requested, capabilities might be limited.
    ...
    ```
2. The Lotus daemon will continue to run in this terminal window. All subsequent commands we use should be done in a separate terminal window.
{% endtab %}
{% endtabs %}

## Expose the API

To send JSON-RPC requests to our lite-node, we need to expose the API.

{% tabs %}
{% tab title="Mainnet" %}
1.  Open `~/.lotus/config.toml` and uncomment `ListenAddress` on line 6:

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
2. Open the terminal window where your lite-node is running and press `CTRL` + `c` to close the daemon.
3.  In the same window, restart the lite-node:

    ```shell
    FULLNODE_API_INFO=wss://wss.node.glif.io/apigw/lotus lotus daemon --lite
    ```

    This will output something like:

    ```plaintext
    2023-01-26T11:18:54.251-0400    INFO    main    lotus/daemon.go:219     lotus repo: /Users/johnny/.lotus
    2023-01-26T11:18:54.254-0400    WARN    cliutil util/apiinfo.go:94      API Token not set and requested, capabilities might be limited
    ...
    ```
4. The Lotus daemon will continue to run in this terminal window. All subsequent commands we use should be done in a separate terminal window.
{% endtab %}

{% tab title="Calibration" %}
1.  Open `~/.lotus/config.toml` and uncomment `ListenAddress` on line 6:

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
2. Open the terminal window where your lite-node is running and press `CTRL` + `c` to close the daemon.
3.  In the same window, restart the lite-node:

    ```shell
    FULLNODE_API_INFO=wss://wss.calibration.node.glif.io/apigw/lotus lotus daemon --lite
    ```

    This will output something like:

    ```plaintext
    2023-01-26T11:18:54.251-0400    INFO    main    lotus/daemon.go:219     lotus repo: /Users/johnny/.lotus
    2023-01-26T11:18:54.254-0400    WARN    cliutil util/apiinfo.go:94      API Token not set and requested, capabilities might be limited.
    ...
    ```
4. The Lotus daemon will continue to run in this terminal window. All subsequent commands we use should be done in a separate terminal window.
{% endtab %}
{% endtabs %}

The lite-node is now set up to accept local JSON-RPC requests! However, we don't have an authorization key, so we won't have access to privileged JSON-RPC methods.

## Create a key

To access privileged JSON-RPC methods, like creating a new wallet, we need to supply an authentication key with our Curl requests.

1.  Create a new admin token and set the result to a new `LOTUS_ADMIN_KEY` environment variable:

    ```shell
    lotus auth create-token --perm "admin"
    ```

    This will output something like:

    ```plaintext
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.um-LqY7g-SDOsMheDRbQ9JIaFzus_Pan0J88VQ6ZLVE
    ```
2. Keep this key handy. We're going to use it in the next section.

## Send requests

Let's run a couple of commands to see if the JSON-RPC API is set up correctly.

1.  First, let's grab the head of the Filecoin network chain:

    ```shell
    curl -X POST '127.0.0.1:1234/rpc/v0' \
    -H 'Content-Type: application/json' \
    --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.ChainHead","params":[]}' \
    | jq 
    ```

    This will output something like:

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
2.  Next, let's try to create a new wallet. Since this is a privileged method, we need to supply our auth key `eyJhbGc...`:

    ```shell
    curl -X POST '127.0.0.1:1234/rpc/v0' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.um-LqY7g-SDOsMheDRbQ9JIaFzus_Pan0J88VQ6ZLVE' \
    --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.WalletNew","params":["secp256k1"]}' \
    | jq
    ```

    This will output something like:

    ```plaintext
    {
      "id": 1,
      "jsonrpc": "2.0",
      "result": "f1vuc4eu2wgsdnce2ngygyzuxky3aqijqe7gj5qqa"
    }
    ```

    The result field is the public key for our address. The private key is stored within our lite-node.
3.  Set the new address as the default wallet for our lite-node. Remember to replace the Bearer token with our auth key `eyJhbGc...` and the `"params"` value with the wallet address, `f1vuc4...`, returned from the previous command:

    ```shell
    curl -X POST '127.0.0.1:1234/rpc/v0' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.um-LqY7g-SDOsMheDRbQ9JIaFzus_Pan0J88VQ6ZLVE' \
    --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.WalletSetDefault","params":["f1vuc4eu2wgsdnce2ngygyzuxky3aqijqe7gj5qqa"]}' \
    | jq 
    ```

    This will output something like:

    ```plaintext
    {
      "id": 1,
      "jsonrpc": "2.0",
      "result": null
    }
    ```

## Next steps

You should now have a local lite-node connected to a remote full-node with an admin API key! You can use this setup to continue playing around with the JSON-RPC, or start building your applications on Filecoin!



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/nodes/lite-nodes/spin-up-a-lite-node)
