---
title: Lite node 
description: "A Lotus lite-node is a stripped down version of a Lotus full-node capable of running on lower-end hardware. Lotus lite-nodes do not contain any chain-data and can only perform message signing and deal transactions. However, they are very quick to spin up, and process transactions in parallel with other Lotus lite-nodes."
---

# Lite node 

A Lotus lite-node is a stripped-down version of a Lotus full-node capable of running on lower-end hardware. Lotus lite-nodes do not contain any chain-data and can only perform message signing and deal transactions. However, they are very quick to spin up and process transactions in parallel with other Lotus lite-nodes.

## Install

### Prerequsites

To spin up a Lotus lite-node, you will need:

1. A [Lotus full-node](../../get-started/lotus). For best results, make sure that this node is fully synced. 
2. A computer with at least 2GB RAM and a dual-core CPU to act as the Lotus lite-node. This can be your local machine. This computer must have Rust and Go 1.15 or higher installed.
3. You must have [all the software dependencies required](../../get-started/lotus/installation##software-dependencies) to build Lotus.

### Steps

1. On the full-node open `~/.lotus/config` and edit line 3 to read:

```
ListenAddress = "/ip4/0.0.0.0/tcp/28001/http"
```

2. On your lite-node clone the [Lotus GitHub repository](https://github.com/filecoin-project/lotus) and create the binary, but do not run anything yet:

```
git clone https://github.com/filecoin-project/lotus
cd lotus
make clean all
sudo make install
```

3. On the lite-node, create an environment variable called `FULLNODE_API_INFO` and give it the following value while calling `lotus daemon --lite`:

```
$FULLNODE_API_INFO=/ip4/YOUR_FULL_NODE_IP_ADDRESS/tcp/28001 lotus daemon --lite

> 2021-03-02T23:59:50.609Z        INFO    main    lotus/daemon.go:201     lotus repo: /root/.lotus
> ...
```

Make sure to replace `YOUR_FULL_NODE_IP_ADDRESS` with the IP address of your full-node.

4. You can now interact with your Lotus lite-node:

```
lotus wallet balance f10...

> 100 FIL
```

A lite-node is limited in what it can do and is designed to only perform message signing and transactional operations. Lite-nodes cannot seal data or query the chain directly. All chain requests go through the attached full-node. If for whatever reason, the full-node goes offline, any lite-nodes connected to it will also go offline.

## Use cases 

A Lotus lite-node can perform transaction-based functions like creating the transaction, proposing deals, signing messages, etc. They do not have any chain data themselves and rely on a full-node for chain data completely. Lotus lite-nodes are completely useless on their own.

One use-case is a service that needs to sign multiple messages a minute, such as an exchange. In this case, the service could have multiple lite-nodes specifically to sign and deal with transactional computation, while a single full-node maintains the chain data.

Another scenario is an organization with a lot of data they want to store on Filecoin but no resources to run a full-node. They could create a Lotus lite-node to create deals with a full-node that they trust, and then once a miner has been found, the lite-node can transfer the data to the miner.

## Benefits and drawbacks 

Since Lotus lite-nodes do not need to sync any chain data, they're able to spin up quickly. Due to their minimal hardware requirements, it's possible to spin up multiple lite-nodes with quite a small footprint. A project can horizontally expand or shrink its processing power by adding or removing Lotus lite-nodes whenever necessary.

However, lite-nodes come with some significant drawbacks. While there are some functions that a lite-node can perform without access to a full-node, all transactions and processes that require access to chain-data must be routed through a Lotus full-node. 

