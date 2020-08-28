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

That's it! You've now got Lotus installed on your system. If you'd like to be able to run `lotus` from anywhere on your system:

1. Move the `lotus` executable to `/usr/local`:

   ```bash
   sudo mv lotus /usr/local/bin
   ```

1. Add `lotus` to your system PATH:

   ```bash
   echo "export PATH=\$PATH:/usr/local/bin/lotus" >> ~/.profile
   source ~/.profile
   ```

1. You can now run `lotus` commands from anywhere:

   ```bash
   cd ~
   lotus --version

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
   ./lotus --version

   > lotus version 0.4.1+git.7d7496e1
   ```

That's it! You've now got Lotus installed on your system. If you'd like to be able to run `lotus` from anywhere on your system:

1. Move the `lotus` executable to `/usr/local`:

   ```bash
   sudo mv lotus /usr/local/bin
   ```

1. Add `lotus` to your system PATH:

   ```bash
   echo "export PATH=\$PATH:/usr/local/bin/lotus" >> ~/.profile
   source ~/.profile
   ```

1. You can now run `lotus` commands from anywhere:

   ```bash
   cd ~
   lotus --version

   > lotus version 0.4.1+git.7d7496e1
   ```
