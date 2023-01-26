---
title: "Spin up a lite node"
description: "A full-node is a Filecoin node that has access to the full feature set of the Filecoin network. However, full-nodes can be difficult to spin up and expensive to maintain. Lite-nodes are a simplified node option that allow developers to perform lightweight tasks on a local node. This page covers how to spin-up a lite nodeon your local machine."
lead: "A full-node is a Filecoin node that has access to the full feature set of the Filecoin network. However, full-nodes can be difficult to spin up and expensive to maintain. Lite-nodes are a simplified node option that allow developers to perform lightweight tasks on a local node. This page covers how to spin-up a lite nodeon your local machine."
draft: false
images: []
type: docs
menu:
  developers:
    identifier: "spin-up-a-lite-node-bb6b1ef2c15b672b991481c370e5c3bc"
weight: 2210
toc: true
---

In this guide we're going to use the {{< tooltip "Lotus" >}} Filecoin implementation. We'll show how to install a lite-node on MacOS and Ubuntu. For other Linux distributions check out the [Lotus documentation](https://lotus.filecoin.io/lotus/install/linux/#building-from-source). To run a lite-node on Windows, install [WLS with Ubuntu](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-10#1-overview) on your system and follow the _Ubuntu_ instructions below.

## Prerequisites

Please make sure you have the following software installed, and that your machine meets the hardware requirements.

### Hardware

Lite-nodes have fairly lightweight hardware requirements -- it's possible to run a lite-node on a Raspberry Pi 4. You machine should meet the following hardware requirements:

1. At least 2 GiB of RAM
1. A dual-core CPU.

### Software

Run the following command to install the software prerequisites:

{{< tabs tabTotal="2">}}
{{< tab tabName="MacOS" >}}
<br>

1. Ensure you have [XCode](https://developer.apple.com/xcode/) and [Homebrew](https://brew.sh/) installed.
1. Install the following dependencies:

    ```shell
    brew install go bzr jq pkg-config hwloc coreutils
    ```

    ```plaintext
    Running `brew update --auto-update`...
    ==> Auto-updated Homebrew!
    Updated 3 taps (homebrew/core, homebrew/cask and filecoin-project/lotus).
    ==> New Formulae

    ...
    ```

{{< /tab >}}
{{< tab tabName="Ubuntu" >}}

<br>

1. Install the following dependencies:

    ```shell
    sudo apt update -y
    sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y
    ```

1. Install Rust:

    ```shell
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

    Follow the prompts in the terminal to complete the Rust installation.

1. Install [Go version 1.18.8 or higher](https://golang.org/dl/)

    ```shell
    wget -c https://golang.org/dl/go1.18.8.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
    ```

{{< /tab >}}
{{< /tabs >}}

## Build Lotus

In this section we're going to build the Lotus lite-node binary. MacOS users should select their CPU architecure from the tabs:

{{< tabs tabTotal="3">}}
{{< tab tabName="MacOS-Intel" >}}
<br>

1. Clone the repository:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus/
    ```

1. Switch to the branch representing the network you want to switch to:

    ```shell
    git checkout releases # Mainnet
    git checkout ntwk/hyperspace # Hyperspace testnet
    ```

1. Build and install Lotus:

    ```shell
    make clean all
    sudo make install
    ```

{{< /tab >}}
{{< tab tabName="MacOS-M1/M2" >}}
<br>

1. Clone the repository:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus/
    ```

1. Switch to the branch representing the network you want to switch to:

    ```shell
    git checkout releases # Mainnet
    git checkout ntwk/hyperspace # Hyperspace testnet
    ```

1. Create the necessary environment variables to allow Lotus to run on M1 architecture:

    ```shell
    export LIBRARY_PATH=/opt/homebrew/lib
    export FFI_BUILD_FROM_SOURCE=1
    export PATH="$(brew --prefix coreutils)/libexec/gnubin:/usr/local/bin:$PATH"
    ```

1. Build and install the Lotus binary:

    ```shell
    make all
    sudo make install
    ```

{{< /tab >}}
{{< tab tabName="Ubuntu" >}}
<br>

1. Clone the repository:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus/
    ```

1. Switch to the branch representing the network you want to switch to:

    - Mainnet: `git checkout releases`
    - Hyperspace testnet: `git checkout ntwk/hyperspace`

    ```shell
    git checkout releases # Mainnet
    git checkout ntwk/hyperspace # Hyperspace testnet
    ```

1. If your processor was released later than an AMD Zen or Intel Ice Lake CPU, enable the use of SHA extensions by adding these two environment variables:

    ```shell
    export RUSTFLAGS="-C target-cpu=native -g"
    export FFI_BUILD_FROM_SOURCE=1
    ```

    If in doubt, ignore this command and move onto the _Build and install Lotus_ command.

1. Build and install Lotus:

    ```shell
    make clean all
    sudo make install
    ```

{{< /tab >}}
{{< /tabs >}}

Once the installation is finished, query the Lotus version to ensure everything installed successfully and for the correct network:

```shell
lotus --version
```



<!-- Prerequisites -->
<!-- Build Lotus Lite -->
<!-- Configure -->
<!-- Run -->
