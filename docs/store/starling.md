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

## Get started with Starling

1. Starling uses [Lotus](../get-started/lotus/README.md) to interact with the Filecoin network. [download, install and run a Lotus daemon](../get-started/lotus/installation.md):

   Make sure that Lotus is running and the find out about your Lotus API token and endpoint with:

   ```sh
   lotus auth api-info --perm admin
   ```

   This will print a `FULLNODE_API_INFO=<token>:/ip4/127.0.0.1/tcp/<port>/http` string that we will use later.

2. [Install NodeJS](https://nodejs.org/en/download/):

   You will need a recent version of nodejs and npm (>=2.19).

3. Install **Starling**:

   You can do it from source with:

   ```sh
   # Checkout the repository
   git clone https://github.com/filecoin-project/starling
   cd starling
   # Install dependencies
   npm install
   sudo npm link
   ```

4. Configure Starling:

   Make sure your environment defines the location of the Lotus API and the token to use:

   ```sh
   # As provided by the `api-info` command we ran before
   export LOTUS_URL=ws://127.0.0.1/1234/rpc/v0
   export LOTUS_AUTH_TOKEN=<token>
   ```

   Configure startling settings by running:

   ```sh
   starling config
   ```

5. You are ready to run Starling!

   ```sh
   # Store a single file
   starling store full/path/to/file
   # Store a folder
   starling store full/path/to/folder
   # Launch interactive monitoring interface
   starling monitor
   ...
   ```

   Check the [official documentation](https://starlingstorage.io/commands.html) for a list of commands and what they can do.
