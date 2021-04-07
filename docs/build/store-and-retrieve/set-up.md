---
title: Store and retrieve
description: This tutorial covers how to store data using the Filecoin network, and how to get that data back again. While there are other methods to store and retrieve data using Filecoin, this is the recommended path. 
---

# Set up

<!-- TODO: Explain all the steps we're going to do in this section. -->

## Get access to a Lotus full-node

A Lotus full-node is a computer running the `lotus daemon`. Full-nodes are special because they have complete access to the Filecoin blockchain. The computer specifications required to run a Lotus full-node are fairly high, and might be out of reach for most end-user laptops and PCs. We recommend running a Lotus full-node on a remote server, or connecting to a service that has Lotus full-nodes ready for you.

<!-- TODO: uncomment this section once we've figured out node-hosting services like Glif.
Choose one:

1. [Set up your own Lotus full-node on a remote server.](#set-up-your-own-lotus-full-node)
1. [Connect to a node-hosting service.](#connect-to-a-node-hosting-service)
-->

### Set up your own Lotus full-node

<!-- TODO: uncomment this section once we've figured out node-hosting services like Glif.
:::warning
You do not need to follow this section if you are using a [node-hosting service](#connect-to-a-node-hosting-service).
:::
-->

Lotus runs best on computers with at least 8 CPU cores and 16GB RAM. Lotus can run on most Linux distributions, and macOS. The following steps use Ubuntu 20.04. See the [Get started guide](../../get-started/lotus/installation/) to find out how to run Lotus on a different operating system:

1. Create a server with at least 8 CPUs and 16GB RAM, and connect to it using SSH. If you're not sure how to connect to a server, or even how to spin one up in the first place, check out Digital Ocean's guide on how to set up a [Ubuntu 20.04 server](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-ubuntu-20-04-server-on-a-digitalocean-droplet).
1. Make a note of your server's IP address. We'll be using this in an upcoming section.
1. Update the `apt` repositories and upgrade any out-of-date packages:

    ```shell
    sudo apt update -y && sudo apt upgrade -y
    ```

1. Install the dependencies for Lotus:

    ```shell
    sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y && sudo apt upgrade -y
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    wget -c https://golang.org/dl/go1.16.2.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
    echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.bashrc && ~/.bashrc
    ```

1. Download Lotus and create the `lotus` executable:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus/
    make clean all
    sudo make install
    ```

1. Start the Lotus daemon and download the latest snapshot:

    ```shell
    lotus daemon --import-chain https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/complete_chain_with_finality_stateroots_latest.car
    ```

1. Stop the `lotus daemon` process by pressing `CTRL` + `c`:
1. Open `~/.lotus/config` and:

    a. Uncommend line 3.
    a. Change `127.0.0.1` to `0.0.0.0`.

    ```toml
    ListenAddress = "/ip4/0.0.0.0/tcp/1234/http"
    ```

    Save and exit the file.

1. Create an API token using the `write` permissions:

    ```shell
    lotus auth create-token --perm write
    ```

    Make a note of this **API token**. We will use it in a later section.

1. Start the Lotus daemon and download the latest snapshot at the same time:

    ```shell
    lotus daemon --import-snapshot https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car
    ```

    The Lotus daemon will continue to run. You can disconnect from the server now, but do not shut it down.

:::tip
Things to write down from this section:

1. Your server's IP address.
1. The API token from running `lotus auth create-token --perm write`.
:::

<!-- TODO: uncomment this section once we've figured out node-hosting services like Glif.
### Connect to a node-hosting service
-->

## Install a Lotus lite-node on your local computer

You will need:

1. The IP address of your Lotus full-node.
1. If you created your own Lotus full-node, you will need the **API token** you created. If you are using a node-hosting service, you do not need an API token.

1. Open a terminal window.
1. Clone the [Lotus GitHub repository](https://github.com/filecoin-project/lotus) and create the executable, but do not run anything yet:

    ```shell
    git clone https://github.com/filecoin-project/lotus
    cd lotus
    make clean all
    sudo make install
    ```

1. Copy this command and enter your information:

    ```shell
    FULLNODE_API_INFO=<API_TOKEN>:/ip4/<YOUR_FULL_NODE_IP_ADDRESS>/tcp/1234 lotus daemon --lite
    ```

    Replace `<API_TOKEN>` with your API token, if you have one. Replace `<YOUR_FULL_NODE_IP_ADDRESS>` with the IP address of your Lotus full-node:

    ```shell
    FULLNODE_API_INFO=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiXX0.FfTKDJEy7yuSMDNXIsF292rRKNe6F8hWodX2r9g1T_8:/ip4/134.122.35.130/tcp/1234 lotus daemon --lite
    ```

    The Lotus daemon will continue to run. Further commands must be ran from a seperate terminal window.

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

Now that we've got all the set up out of the way, we can move onto storing data with the Filecoin network. 

