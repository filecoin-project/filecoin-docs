---
title: "Basic setup"
description: "This page gives a very basic overview of how to install Lotus on your computer."
lead: "This page gives a very basic overview of how to install Lotus on your computer. For more details, check out the [Lotus documentation](https://lotus.filecoin.io)."
draft: false
images: []
type: docs
menu:
  nodes:
    parent: "nodes-full-nodes"
    identifier: "basic-setup-92ee151deb7366b1197c595bc073d767"
weight: 220
toc: true
---

To install Lotus on your computer, follow these steps:

1. First, you need to download the appropriate binary file for your operating system. Go to the [official Lotus GitHub repository](https://github.com/filecoin-project/lotus) and select the latest release that is compatible with your system. You can choose from Windows, macOS, and Linux distributions.
1. Once you have downloaded the binary file, extract the contents to a directory of your choice. For example, if you are using Linux, you can extract the contents to the `/usr/local/bin directory` by running the command:

    ```shell
    sudo tar -C /usr/local/bin -xzf lotus-X.X.X-linux-amd64.tar.gz
    ```

    Replace `X.X.X` with the version number of the release you downloaded.

1. After extracting the contents, navigate to the `lotus` directory in your terminal. For example, if you extracted the contents to `/usr/local/bin`, you can navigate to the lotus directory by running the command:

    ```shell
    cd /usr/local/bin/lotus-X.X.X
    ```

    Again, replace `X.X.X` with the version number of the release you downloaded.

1. Run the `lotus` binary file to start the Lotus daemon. You can do this by running the command:

    ```shell
    ./lotus daemon
    ```

    This will start the Lotus daemon, which will connect to the Filecoin network and start synchronizing with other nodes on the network.

1. Optionally, you can also run the lotus-miner binary file if you want to participate in the Filecoin mining process. You can do this by running the command:

    ```shell
    ./lotus-miner run
    ```

    This will start the Lotus miner, which will use your computer's computing power to mine new blocks on the Filecoin network.

## Deeper dive

For a deeper dive into how to install Lotus on your system, including more advanced setups and configuration, check out the official [Lotus documentation](https://lotus.filecoin.io/lotus/install/prerequisites/).
<!--REVIEWED!-->