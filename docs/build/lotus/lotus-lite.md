---
title: Lite node 
description: "A Lotus lite-node is a stripped down version of a Lotus full-node capable of running on lower-end hardware. Lotus lite-nodes do not contain any chain-data and can only perform message signing and deal transactions. However, they are very quick to spin up and can process transactions in parallel with other Lotus lite-nodes."
---

# Lite node 

A Lotus lite-node is a stripped-down version of a Lotus full-node capable of running on lower-end hardware. Lotus lite-nodes do not contain any chain-data and can only perform message signing and deal transactions. However, they are very quick to spin up and can process transactions in parallel with other Lotus lite-nodes.

Before we get started, let's just go over the terms we'll use in this guide:

| Term | Description |
| --- | --- |
| Lotus | The main Filecoin implementation, written in Golang. |
| Full-node | A Lotus node that contains all the blockchain data of the Filecoin network. |
| Lite-node | A Lotus node that does not contain any of the blockchain data of the Filecoin network. Lite-nodes rely on access to a full-node in order to run. |

## Prerequsites

To spin up a Lotus lite-node, you will need:

1. A [Lotus full-node](../../get-started/lotus). For best results, make sure that this node is fully synced. 
2. A computer with at least 2GB RAM and a dual-core CPU to act as the Lotus lite-node. This can be your local machine. This computer must have Rust and Go 1.15 or higher installed.
3. You must have [all the software dependencies required](../../get-started/lotus/installation##software-dependencies) to build Lotus.

## Full-node preparation

If you have access to the full-node you're using, you need to make some minor modifications to it's configuration.

1. On your full-node open `~/.lotus/config` and:

    a. Uncommend line 3.
    a. Change `127.0.0.1` to `0.0.0.0`.

    ```toml
    ListenAddress = "/ip4/0.0.0.0/tcp/1234/http"
    ```
    
    Save and exit the file.

1. Create an API token for your lite-node to use:

    ```shell
    # lotus auth create-token --perm <read,write,sign,admin>
    lotus auth create-token --perm write
    ```

    Which permissions you choose will depend on your use-case. Take a look at the [API tokens section to find out more →](https://docs.filecoin.io/build/lotus/api-tokens/#obtaining-tokens)

1. Send this API token to your lite-node, or to whoever will be the administator for the lite-node.
1. If you have the `lotus daemon` running, stop it and start it again. This forces Lotus to open the API port we just set.

Next up you'll create the Lotus executable on your lite-node and running it in _lite_ mode!

## Create the Lotus executable 

You need to create the Lotus executable to run your lite-node with. This process is the same as when creating a full-node.

1. On your lite-node clone the [Lotus GitHub repository](https://github.com/filecoin-project/lotus) and create the executable, but do not run anything yet:

    ```shell
    git clone https://github.com/filecoin-project/lotus
    cd lotus
    make clean all
    sudo make install
    ```

If you run into errors here, it may be because you don't have all the Lotus dependencies installed. Take a quick look at the [Lotus Getting Started guide](/get-started/lotus/installation/#software-dependencies) and double check that you have all the dependencies installed, along with Golang and Rust.

## Start the lite-node

You've got the Lotus executables ready to go, and you have access to a Lotus full-node. All that's left is connecting your Lotus lite-node to the full-node!

1. On the lite-node, create an environment variable called `FULLNODE_API_INFO` and give it the following value while calling `lotus daemon --lite`. Make sure to replace `API_TOKEN` with the token you got from the full-node, and `YOUR_FULL_NODE_IP_ADDRESS` with the IP address of your full-node:

    ```shell
    FULLNODE_API_INFO=API_TOKEN/ip4/YOUR_FULL_NODE_IP_ADDRESS/tcp/1234 lotus daemon --lite

    > 2021-03-02T23:59:50.609Z        INFO    main    lotus/daemon.go:201     lotus repo: /root/.lotus
    > ...
    ```

    If you don't have an `API_TOKEN`, you can run the above command without one, and just gain read-only access to the full-node:

    ```shell
    FULLNODE_API_INFO=/ip4/YOUR_FULL_NODE_IP_ADDRESS/tcp/1234 lotus daemon --lite
    ```

1. You can now interact with your Lotus lite-node:

    ```shell
    lotus wallet balance f10...

    > 100 FIL
    ```

A lite-node is limited in what it can do and is designed to only perform message signing and transactional operations. Lite-nodes cannot seal data or query the chain directly. All chain requests go through the attached full-node. If for whatever reason, the full-node goes offline, any lite-nodes connected to it will also go offline.

### Access and permissions 

Setting up a Lotus lite-node without using an [API token from a full-node](https://docs.filecoin.io/build/lotus/api-tokens/) results in the lite-node having read-only access to the full-node. While read-only access should be fine for most use-cases, there are situations where you need write access to the full-node. 

## Use cases 

A Lotus lite-node can perform transaction-based functions like creating the transaction, proposing deals, signing messages, etc. They do not have any chain data themselves and rely on a full-node for chain data completely. Lotus lite-nodes are completely useless on their own.

One use-case is a service that needs to sign multiple messages a minute, such as an exchange. In this case, the service could have multiple lite-nodes specifically to sign and deal with transactional computation, while a single full-node maintains the chain data.

Another scenario is an organization with a lot of data they want to store on Filecoin but no resources to run a full-node. They could create a Lotus lite-node to create deals with a full-node that they trust, and then once a miner has been found, the lite-node can transfer the data to the miner.

## Benefits and drawbacks 

Since Lotus lite-nodes do not need to sync any chain data, they're able to spin up quickly. Due to their minimal hardware requirements, it's possible to spin up multiple lite-nodes with quite a small footprint. A project can horizontally expand or shrink its processing power by adding or removing Lotus lite-nodes whenever necessary.

However, lite-nodes come with some significant drawbacks. While there are some functions that a lite-node can perform without access to a full-node, all transactions and processes that require access to chain-data must be routed through a Lotus full-node. 

