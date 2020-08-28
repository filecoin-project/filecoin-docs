---
title: Install Lotus
description: Set up the Lotus Filecoin client on your computer, ready to be used as a single node or in a mining operation.
---

# Install Lotus

Lotus is an implementation of the Filecoin specification written in Go. You can run the Lotus client to interact with the Filecoin network. The Lotus project is created and maintained by Protocol Labs, the creators of IPFS, libp2p, and Filecoin. This section covers how to install the Lotus client on your machine.

The Lotus client can be used for one of three use-cases:

| Client        | Purpose                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lotus node    | An interface between your computer and the Filecoin network. All transactions, queries, and interactions with the Filecoin network must pass through a Lotus node.              |
| Storage miner | The Lotus storage miner queries a Lotus node for the latest tipset on-chain, produces a block on that tipset, and submits it to the node to be broadcast to the entire network. |
| Seal worker   | An extra process that can offload heavy processing tasks from your Lotus Storage miner.                                                                                         |

All three of these use-cases use the same Lotus client, but they differ in how they are configured _after_ the client has been installed. To make the install go as smoothly as possible, read through the [software and hardware requirements](./requirements.md) first.

## Ubuntu

1.  Install the dependencies:

    ```bash
    sudo apt update
    sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl build-essential -y
    ```

1.  Clone the Lotus repository:

    ```bash
    git clone https://github.com/filecoin-project/lotus.git
    ```

1.  _Build_ and _Make_ the Lotus project:

    ```bash
    make clean && make all
    sudo make install
    ```

    This process might take a while

1.  Once the build process has finished, you're left with a `lotus` executable:

    ```bash
    lotus version

    > lotus version 0.4.1+git.7d7496e1
    ```

## macOS

1. Make sure you have `xcode-select` and Homebrew installed:

   ```bash
   xcode-select --install

   brew --version
   ```

1. Install the dependencies for Lotus:

   ```bash
   brew install go bzr jq pkg-config rustup git
   ```

1. Clone the Lotus repository:

   ```bash
   git clone https://github.com/filecoin-project/lotus.git
   ```

1. _Build_ and _Make_ the Lotus project:

   ```bash
   make clean && make all
   sudo make install
   ```

   This process might take a while

1. Once the build process has finished, you're left with a `lotus` executable:

   ```bash
   lotus version

   > lotus version 0.4.1+git.7d7496e1
   ```

## Arch

These steps will install the following dependencies:

- go (1.14 or higher)
- gcc (7.4.0 or higher)
- git (version 2 or higher)
- bzr (some go dependency needs this)
- jq
- pkg-config
- opencl-icd-loader
- opencl driver (like nvidia-opencl on arch) (for GPU acceleration)
- opencl-headers (build)
- rustup (proofs build)
- llvm (proofs build)
- clang (proofs build)

1. Install dependencies:

   ```sh
   sudo pacman -Syu opencl-icd-loader gcc git bzr jq pkg-config opencl-icd-loader opencl-headers
   ```

1. Install Go 1.14 by following [the docs on their website](https://golang.org/doc/install).
1. Clone the Lotus repository:

   ```sh
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

1. Build the Lotus binaries from source and install. If you are running an AMD platform or if your CPU supports SHA extensions you will want to build the Filecoin proofs natively:

   ```sh
   make clean && make all
   sudo make install
   ```

1. Native Filecoin FFI building:

   ```sh
   env env RUSTFLAGS="-C target-cpu=native -g" FFI_BUILD_FROM_SOURCE=1 make clean deps all
   sudo make install
   ```

   After installing Lotus, you can run the `lotus` command directly from your CLI to see usage documentation. Next, you can join the [Lotus Testnet](https://lotu.sh/en+join-testnet).

## Fedora Instructions

> tested on 30

If you have an AMD GPU the opencl instructions may be incorrect...

These steps will install the following dependencies:

- go (1.14 or higher)
- gcc (7.4.0 or higher)
- git (version 2 or higher)
- bzr (some go dependency needs this)
- jq
- pkg-config
- rustup (proofs build)
- llvm (proofs build)
- clang (proofs build)

1. Install dependencies

   ```sh
   $ sudo dnf -y update
   $ sudo dnf -y install gcc git bzr jq pkgconfig mesa-libOpenCL mesa-libOpenCL-devel opencl-headers ocl-icd ocl-icd-devel clang llvm
   $ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

1. Install Go 1.14 by following [the docs on their website](https://golang.org/doc/install).
1. Clone the Lotus repository:

   ```sh
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

1. Build the Lotus binaries from source and install. If you are running an AMD platform or if your CPU supports SHA extensions you will want to build the Filecoin proofs natively:

   ```sh
   $ make clean && make all
   $ sudo make install
   ```

1. Native Filecoin FFI building:

   ```sh
   env env RUSTFLAGS="-C target-cpu=native -g" FFI_BUILD_FROM_SOURCE=1 make clean deps all
   sudo make install
   ```

   After installing Lotus, you can run the `lotus` command directly from your CLI to see usage documentation. Next, you can join the [Lotus TestNet](https://lotu.sh/en+join-testnet).
