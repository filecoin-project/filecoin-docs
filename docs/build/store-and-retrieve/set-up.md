---
title: Store and retrieve
description: This tutorial covers how to store data using the Filecoin network, and how to get that data back again. While there are other methods to store and retrieve data using Filecoin, this is the recommended path. 
---

# Set up

In this section you're going to install the dependencies needed to run a Lotus lite-node on your computer. You're also going to create a Filecoin address and use it to sign up to Filecoin+.

## Get access to a Lotus full-node

A Lotus full-node is a computer running the `lotus daemon`. Full-nodes are special because they have complete access to the Filecoin blockchain. The computer specifications required to run a Lotus full-node are fairly high, and might be out of reach for most end-user laptops and PCs. 

::: tip
For this tutorial, we're going to be using a Lotus full-node provided by Protocol Labs. This node, called `api.chain.love` is only for practice sessions like this tutorial, and should not be relied upon for any production purposes.
:::

## Lotus lite-node

### Project dependencies 

To install a Lotus lite-node on your computer you must have the tools required to _build_ a Lotus binary from the GitHub repository.

#### MacOS

1. Check if you have Xcode installed:

    ```shell
    xcode-select --version

    > xcode-select version 2384.
    ```

    If the above command returns an error you likely don't have Xcode installed. Run the following command to install Xcode:

    ```shell
    sudo rm -rf /Library/Developer/CommandLineTools 
    xcode-select --install

    > Password:
    > xcode-select: note: install requested for command line developer tools
    ```

1. Check if you have [Homebrew](https://brew.sh/) installed:

    ```shell
    brew install

    > Homebrew 3.0.11
    ```

    If the above command returns an error, you likely don't have Homebrew installed. Run the following command to install Homebrew:

    ```shell
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

    If you run into errors installing Homebrew, there may be something wrong with your macOS installation. Check out the [Homebrew documentation](https://brew.sh/) for more information on how you can it installed.

1. Use Homebrew to install the following packages:

    ```shell
    brew install go bzr jq pkg-config rustup hwloc
    ```

1. Download the Lotus repository from GitHub:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus
    ```

1. If you are using a Mac built with Apple silicon (M1) add the following lines into your `~/.bashrc` or `~/.zshrc`, depending on which shell you are using: 

    ```shell
    export LDFLAGS="-L/usr/local/lib"
    export CPPFLAGS="-I/usr/local/include"
    export CPATH=/usr/local/include
    export LIBRARY_PATH=/usr/local/lib
    export LD_LIBRARY_PATH=/usr/local/lib
    ```

    See the [troubleshooting section](./troubleshooting) to find out how to see which shell you are using.

1. Build the `lotus` binary, but don't run anything just yet:

    ```shell
    make clean && make all
    sudo make install
    ```

    If you run into errors here, it may be because some dependencies aren't installed properly. Check out the [Troubleshooting](troubleshooting) section, or see the [Lotus GitHub repository](https://github.com/filecoin-project/lotus) for more help.

1. You should now have the `lotus` executable ready to run on your computer. [Head over to the next section to run your Lotus lite-node →](#run-a-lotus-lite-node)

#### Ubuntu

1. Update your local `apt` repository:

    ```shell
    sudo apt update -y
    ```

1. Install the following packages:

    ```shell
    sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y && sudo apt upgrade -y
    ```

1. Install Rust:

    ```shell
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

1. Install Go and add `/usr/local/go/bin` to your `PATH`:

    ```shell
    wget -c https://golang.org/dl/go1.16.2.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
    ```

1. Add `/usr/local/go/bin` to your `PATH`:

    ```shell
    sudo echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.bashrc && source ~/.bashrc
    ```

1. Clone the Lotus GitHub repository:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus/
    ```

1. Build the `lotus` executable:

    ```shell
    make clean all

    > rm -rf  build/.filecoin-install build/.update-modules  lotus lotus-miner lotus-worker lotus-shed lotus-gateway lotus-seed lotus-pond lotus-townhall lotus-fountain lotus-chainwatch lotus-bench lotus-stats lotus-pcr lotus-health lotus-wallet lotus-keygen testground
    > make -C extern/filecoin-ffi/ clean
    > make[1]: Entering directory '/root/lotus/extern/filecoin-ffi'
    > ...
    > go run github.com/GeertJohan/go.rice/rice append --exec lotus-worker -i ./build 
    ```

1. Install Lotus:

    ```shell
    sudo make install

    > bash: go: command not found
    > expr: syntax error: unexpected argument ‘1015005’
    > install -C ./lotus /usr/local/bin/lotus
    > install -C ./lotus-miner /usr/local/bin/lotus-miner
    > install -C ./lotus-worker /usr/local/bin/lotus-worker
    ```

1. You should now have the `lotus` executable ready to run on your computer. 

    ```shell
    lotus --version

    > lotus version 1.7.0
    ```

[Head over to the next section to run your Lotus lite-node →](#run-a-lotus-lite-node)

### Run a Lotus lite-node 

Now that you have Lotus ready to run, you can start a Lotus lite-node on your computer and connect to the `api.chain.love` Lotus full-node!

1. Run the `lotus daemon --lite` command, using `api.chain.love` as the full-node address: 

    ```shell
    FULLNODE_API_INFO=wss://api.chain.love lotus daemon --lite
    ```

    The Lotus daemon will continue to run. Further commands must be ran from a seperate terminal window.

:::warning
The `api.chain.love` node is intended for lightweight experiments and testing. It is not suitable for ongoing development and production usage.
:::

## Get a FIL address

1. Create an address using the `wallet new` command:

    ```shell
    lotus wallet new 

    > f1fwavjcfb32nxbczmh3kgdxhbffqjfsfby2otloi
    ```

    Lotus outputs your public address. Public addresses always start with `f1`.

1. Make a note of this address. We'll use it in an uncoming section.

## Sign up to Filecoin+

Filecoin Plus is a layer of social trust on top of the Filecoin network to help incentivize the storage of real data. Essentially, all Filecoin+ users who want to upload something to the Filecoin network can become a _verfied client_ by signing up to Filecoin+ using their GitHub account. All _verified clients_ get an allowance of 8GB per month to upload their data to the Filecoin network! 

1. Go to [plus.fil.org](https://plus.fil.org).
1. Under **Clients**, click **Proceed**.
1. Under **Get verified**, click **Get Verified**.
1. Click **Automatic Verification**.
1. In the `Request` field, enter the address you got in the previous section.

<!-- TODO: Get someone to follow this workflow and grab screenshots. --> 

## Next steps

Now that we've got all the set up out of the way, we can move onto [storing data with the Filecoin network →](./store-data) 
