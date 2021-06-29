---
title: Store and retrieve
description: Before you begin storing any data on the Filecoin network, you need to run through a few steps to get everything set up. This section covers getting access to a Lotus full-node, creating a Lotus lite-node on your computer, getting a FIL address, and signing up to Filecoin+. 
---

# Set up

Before you begin storing any data on the Filecoin network, you need to run through a few steps to get everything set up. This section covers getting access to a Lotus full-node, creating a Lotus lite-node on your computer, getting a FIL address, and signing up to Filecoin+. 

![A flowchart showing to steps within this set up process.](./images/set-up-process.png)

::: tip What is Lotus?
Programs that interact with the Filecoin network are called _implementations_, and [Lotus](../../get-started/lotus) is a command-line interface (CLI) implementation. There are [other implementation](../../get-started#filecoin-implementations) being created alongside Lotus, however Lotus is the only Filecoin implementation created and maintained by Protocol Labs.
:::

## Things to note

As you're going through this section, make a note of the following variables:

| Variable | Description | Example |
| --- | --- | --- |
| Your Filecoin address | The public part of your Filecoin address. This address is what other users can use to send your FIL. | `f1fwavjcfb32nxbczmh3kgdxhbffqjfsfby2otloi` |

## Get a full-node 

A Lotus full-node is a computer running the `lotus daemon`. Full-nodes are unique because they have complete access to the Filecoin blockchain. The computer specifications required to run a Lotus full-node are relatively high and might be out of reach for most end-user laptops and PCs. 

Usually, we'd have to _spin up_ a full-node, but we're going to use a Lotus full-node provided by Protocol Labs for this tutorial. This node, called `api.chain.love`, is only for practice sessions like this tutorial and should not be relied upon for any production or development purposes.

:::tip
If you've got a full-node that you'd prefer to use, feel free to use that instead! Just replace `api.chain.love` with your full-node IP address throughout this tutorial.
:::

## Install a lite-node

A lite-node lets your computer interact with the Filecoin network without having to run a resource-intensive full-node! Lite-nodes can do things like sign messages and talk to storage providers, but any processes that need data from the blockchain must come from a full node. Luckily, lite-nodes automatically route any blockchain-based requests to a full-node. For this tutorial, you're going to run a Lotus lite-node on your local computer and have it connect to a full-node managed by Protocol Labs.

![A diagram showing how Lotus lite-nodes interact with Lotus full-nodes.](./images/lite-nodes-process-diagram.png)

To install a Lotus lite-node on your computer, you must have the tools required to _build_ a Lotus binary from the GitHub repository.

| [MacOS](#macos) | [Ubuntu](#ubuntu) |
| --- | --- |

Take a look at the [Get started page](../../get-started) to learn how to install Lotus on other operating systems. 

### MacOS

This section covers how to install a Lotus lite-node on MacOS. If you are running Ubuntu, head to the [Ubuntu installation section ↓](#ubuntu)

:::tip Requirements 
You can install Lotus on MacOS 10.11 El Capitan or higher. You must have [Homebrew](https://brew.sh/) installed.
:::

1. Add the `filecoin-project/lotus` Homebrew tap:

    ```shell
    brew tap filecoin-project/lotus
    ```

1. Install Lotus:

    ```shell
    brew install lotus
    ```

1. Lotus is now installed on your computer. 

[Head over to the next section to run your Lotus lite-node ↓](#run-a-lotus-lite-node)

### Ubuntu

This section covers how to install a Lotus lite-node on Ubuntu. If you are running MacOS, head to the [MacOS installation section ↑](#macos).

:::tip Requirements 
You must have [Snapd](https://snapcraft.io/docs/installing-snapd) installed.
:::

1. To install Lotus using Snap, run:

    ```shell
    snap install lotus-filecoin
    ```

[Head onto the next section to run your Lotus lite-node ↓](#run-a-lotus-lite-node)

## Run a Lotus lite-node 

Now that you have Lotus ready to run, you can start a Lotus lite-node on your computer and connect to the `api.chain.love` Lotus full-node! 

:::warning
Just as a reminder, `api.chain.love` is a Lotus full-node managed by Protocol Labs. It's ideal for use in this tutorial, but do not use it for development or in a production environment.
:::

1. Open a terminal windows and run the `lotus daemon --lite` command, using `api.chain.love` as the full-node address: 

    ```shell
    FULLNODE_API_INFO=wss://api.chain.love lotus daemon --lite

    > 2021-04-10T13:34:07.170-0400  INFO    main    lotus/daemon.go:214 lotus repo: /home/johnny/.lotus
    > ...
    ```

    :::warning
    The above command uses [secure WebSockets `wss`](https://tools.ietf.org/html/rfc6455) to connect to the node. If you are **not** using `api.chain.love`, you will likely be using IPv4 or IPv6 instead and should replace `wss` with `ip4` or `ip6`, respectively.
    :::

1. MacOS users may see a warning regarding Lotus. Select **Accept incoming connections** if you see a warning.

    The Lotus daemon will continue to run. You must run further commands from a separate terminal window.

## Get a FIL address

Filecoin addresses are similar to regular bank account numbers. Other users can use your address to send you FIL, and you can use your address to pay storage providers for storing and retrieving your data. 

There are two parts to a Filecoin address: the public address and the private key. You can freely share your public address with anyone, but you should never share your private key. We're not going to view any private keys in this tutorial, but it's essential to understand the difference between your public address and your private key.

1. Open a new terminal window and create an address using the `lotus wallet new` command:

    ```shell
    lotus wallet new 

    > f1fwavjcfb32nxbczmh3kgdxhbffqjfsfby2otloi
    ```

    Lotus outputs your public address. Public addresses always start with `f1`.

1. Make a note of this address. We'll use it in an upcoming section.

## Backup your address

Your address is made up of two parts: your _public address_ and your _private key_. The public address is what you see when you run `lotus wallet new`, and you're safe to share that address with whoever you want. Your private key, however, must be kept secret and secure. If you lose your private key, you lose access to any FIL stored in that address.

It is incredibly important that you backup your addreses. Storing a copy of your addresses on another device is a great way to ensure you don't lose access to your funds. 

1. List the addresses associated with your Lotus node:

    ```shell
    lotus wallet list

    > Address                                    Balance  Nonce  Default  
    > f1nau67e6k6ggdwluatfz4waexetjfrqmx6fil3nq  0 FIL    0      X  
    ```

1. Copy the address `f1nau...` that you want to export.
1. The `lotus wallet export f1nau...` command simply output the private key to the terminal. To export an address _into_ a file, run the `lotus wallet export f1anu...` followed by `> my_address.key`:

    ```shell
    lotus wallet export f1nau67e6k6ggdwluatfz4waexetjfrqmx6fil3nq > my_address.key
    ```

    This will create a new file called `my_address.key` in the current directory. The filename you chose doesn't have to end in `.key`; it can be anything you want.

Once you have your address in a file, you can copy it to another drive, securely send it to another computer, or even print it out.

## Filecoin Plus

Storage providers get paid either by receiving FIL directly from users for storing their data, winning block rewards from the network, or both!

Getting paid from users is straightforward. If a storage client called Laika wants to store some data, and Albert is a storage provider, the two of them can create a deal to store Laika's data for `X` amount of time for `Y` FIL.

Block rewards are randomly given to a storage provider every 30 seconds. The more data that a storage provider is _storing_, the higher their chances of winning the block reward. You can think of it like this: if a storage provider accepts a deal from a user to store 5GB of data, they have 5 chances to win the block reward for each 30 second round.

Data cap acts as a kind of _multiplier_ for block rewards. If a storage provider accepts a deal from a user with data cap attached - also known as — _verified deal_ —, then the Filecoin network treats that deal as though it's 10x as big as it is. So a 5GB deal gives the storage miner 50 chances to win the block reward instead of the usual 5 chances. Some storage providers find data cap so valuable that they're willing to make verified deals without charging any FIL! You can find a list of these storage providers using the [Filecoin Plus miner registry](https://plus.fil.org/miners/).

### Sign up

Signing up to Filecoin Plus is easy and free!

:::tip
You need a GitHub account that is at least 180 days old. If you don't have a GitHub account that's old enough, [get in touch with the team on Filecoin Slack](https://filecoin.io/slack/).
:::

1. Go to [plus.fil.org](https://plus.fil.org).
1. Under **Clients**, click **Proceed**.
1. Under **Get verified**, click **Get Verified**.
1. Click **Automatic Verification**.
1. In the `Request` field, enter the address you got in the previous section.

## Next steps

Now that we've got all the set up out of the way, we can move onto [storing data with the Filecoin network →](./store-data.md) 

