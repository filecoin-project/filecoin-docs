---
title: "Starling"
description: "Starling is a decentralized storage application designed for use in archival settings, where the ability to demonstrate the authenticity of a file over the course of time is of paramount importance."
weight: 20 
menu:
    store:
        parent: "store-tools"
---

![A terminal window showing the Starling Filecoin application.](starling.png)

This guide will quickly set up Starling on your computer.

## Prerequisites

You need to have a couple of things installed before you can interact with Starling:

1. [Lotus](https://lotus.filecoin.io/docs/set-up/install/).
1. [NodeJS](https://nodejs.org/en/download/) version `12.19` or higher.

## Steps

1.  Ensure that the Lotus daemon is running, and has fully synced.
1.  In a new terminal window, get your Lotus API token and endpoint with:

    ```shell with-output
    lotus auth api-info --perm admin
    ```

    This will output something like: 

    ```plaintext
    FULLNODE_API_INFO=eyJhbGcabdjwieusyiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwdj3isu2938X0.tmdXnxUflc8nhghfjiwo2l1o9T1QwT0jLskdEV5cYEc:/ip4/127.0.0.1/tcp/1234/http
    ```


1.  Clone the Starling repository:

    ```shell
    git clone https://github.com/filecoin-project/starling
    ```

1.  Move into the `starling` directory and install the dependencies:

    ```shell
    cd starling
    npm install
    sudo npm link
    ```

1.  Configure Starling settings:

    ```shell
    starling config
    ```

## Run Starling

1.  Store a single file run:

    ```shell
    starling store full/path/to/file
    ```

1.  Store a folder run:

    ```shell
    starling store full/path/to/folder
    ```

1.  Launch the interactive monitoring interface:

    ```shell
    starling monitor
    ```

Check the [official documentation](https://starlingstorage.io/commands.html) for a more in-depth look into what Starling can do.
