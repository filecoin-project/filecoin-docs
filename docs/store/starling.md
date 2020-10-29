---
title: 'Starling'
description: 'Starling is a decentralized storage application designed for use in archival settings, where the ability to demonstrate the authenticity of a file over the course of time is of paramount importance.'
breadcrumb: 'Starling'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

<center>
<a href="https://starlingstorage.io" target="_blank"><img src="./images/starling.gif" alt="starling" /></a>
</center>

## Getting started

This guide will quickly set up Starling on your computer.

### Prerequisites

You need to have a couple of things installed before you can interact with Starling:

1. [Lotus](../get-started/lotus/installation.md).
1. [NodeJS](https://nodejs.org/en/download/)

### Steps

1.  Start the Lotus daemon:

    ```bash
    lotus daemon
    ```

1.  In a new terminal window, get your Lotus API token and endpoint with:

    ```bash
    lotus auth api-info --perm admin

    > FULLNODE_API_INFO=eyJhbGcabdjwieusyiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwdj3isu2938X0.tmdXnxUflc8nhghfjiwo2l1o9T1QwT0jLskdEV5cYEc:/ip4/127.0.0.1/tcp/1234/http

    ```

    This will print a **token** and **port** that we will use later. In this case, our **token** is `eyJhbGcabdjwieusyiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwdj3isu2938X0.tmdXnxUflc8nhghfjiwo2l1o9T1QwT0jLskdEV5cYEc`, and our **port** is `1234`.

1.  Clone the Starling repository:

    ```bash
    git clone https://github.com/filecoin-project/starling
    ```

1.  Move into the `starling` directory and install the dependencies:

    ```bash
    cd starling
    npm install
    sudo npm link
    ```

1.  Create an environment variable called `LOTUS_AUTH_TOKEN` and supply it with the **s** we received from running `api-info` earlier:

    ```bash
    # export LOTUS_AUTH_TOKEN=<token>
    export LOTUS_AUTH_TOKEN=eyJhbGcabdjwieusyiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwdj3isu2938X0.tmdXnxUflc8nhghfjiwo2l1o9T1QwT0jLskdEV5cYEc
    ```

    Add this line into your `~/.bashrc` file if you want to keep this token after closing your terminal.

1.  Create an environment variable called `LOTUS_URL` and supply it with the **port** we received from running `api-info` earlier:

    ```bash
    # export LOTUS_URL=ws://127.0.0.1/<PORT>/rpc/v0
    export LOTUS_URL=ws://127.0.0.1/1234/rpc/v0
    ```

    Add this line into your `~/.bashrc` file if you want to keep this token after closing your terminal.

1.  Configure Starling settings:

    ```bash
    starling config
    ```

1.  You are ready to run Starling!

    a. Store a single file run:

        ```bash
        starling store full/path/to/file
        ```

    b. Store a folder run:

        ```bash
        starling store full/path/to/folder
        ```

    c. Launch the interactive monitoring interface:

        ```bash
        starling monitor
        ```

Check the [official documentation](https://starlingstorage.io/commands.html) for a more in-depth look into what Starling can do.
