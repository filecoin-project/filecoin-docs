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
1. [NodeJS](https://nodejs.org/en/download/) version `12.19` or higher.

### Steps

1.  Ensure that the Lotus daemon is running, and has fully synced.


1.  In a new terminal window, get your Lotus API token and endpoint with:

    ```bash
    lotus auth api-info --perm admin

    > FULLNODE_API_INFO=eyJhbGcabdjwieusyiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwdj3isu2938X0.tmdXnxUflc8nhghfjiwo2l1o9T1QwT0jLskdEV5cYEc:/ip4/127.0.0.1/tcp/1234/http

    ```


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
