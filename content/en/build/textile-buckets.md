---
title: "Textile Buckets"
description: "Buckets is a Textile product that provides storage to be used in a very similar fashion as standard cloud storage, but using IPFS and Filecoin under the hood."
menu:
    build:
        parent: "build-tools"
---

Here are the steps to quickly get setup with buckets:

1. **Download and install the `hub` CLI**:

   The installation process is [documented here](https://docs.textile.io/hub/accounts/). You will need to grab the latest release from the [releases page](https://github.com/textileio/textile/releases/latest).

1. **Initialize the account and login**:

   ```sh
   hub init # Follow instructions
   ...
   hub login # if you already have a username
   ```

   Detailed instructions can be found in the [official docs](https://docs.textile.io/hub/accounts/#account-setup).

1. **Initialize a new Bucket**:

   Buckets are mapped to local directories. In order to create a bucket from the working directory run:

   ```sh
   cd /path/to/your/data
   hub bucket init
   ```

   {{< alert icon="warning" >}}
   Buckets are not encrypted by default. If you are going to store sensitive data, use the `hub bucket init --private` option. [Read more here](https://docs.textile.io/buckets/#encryption).
   {{< /alert >}}

   It is also possible to retrieve existing buckets (or pull changes performed by others in the case of shared buckets) with the `hub bucket init --existing` flag.

1. **Make changes and push them**:

   After adding or modifying files in your bucket folder, you can publish the changes by pushing them:

   ```sh
   hub bucket status # show changes to the bucket
   hub bucket push   # publish changes to IPFS
   ```

1. **Explore your content on IPFS**:

   Your content has been pushed and is made available on IPFS. You can display thread, IPNS and website links associated to your bucket with:

   ```sh
   hub bucket links
   ```

   The first link should take you to the Hub gateway and allow you to inspect your files as currently published. You can use the IPNS link for example, if you are hosting a website, to open it on the browser.

1. **Archive your bucket and back it up on Filecoin**:

   You can archive your bucket at any point and store it on Filecoin:

   ```sh
   # Archive
   hub bucket archive
   # Check status
   hub bucket archive status
   # Or watch status
   hub bucket archive status -w
   ```

1. **Learn more about Textile buckets**:

   - All `hub` commands and subcommands take a `--help` flag that displays available flags and usage instructions. These are also [published here](https://docs.textile.io/hub/cli/hub_buck/).
   - The instructions here are based on the [Buckets guide](https://docs.textile.io/buckets/), which contains more details, for example about [permissions](https://docs.textile.io/buckets/permissions/), shared buckets and organizations.
   - Filecoin storage in Textile buckets is a very new feature! Make sure you read the [Bucket Archiving](https://docs.textile.io/buckets/archiving/) for the latest information on how it works, limits and price.
   - This [blog post](https://blog.textile.io/buckets-diffing-syncing-archiving/) contains explanatory videos and information about archiving and recovery. Once you have a deal CID, you can also use Lotus to [retrieve the data](https://lotus.filecoin.io/docs/developers/retrieve-data/).

1. **Use the Buckets API directly**:

- [js-textile](https://textileio.github.io/js-textile/docs/hub.buckets) provides programmatic access to the Buckets API from Javascript. Some examples are [here](https://github.com/textileio/js-examples).
- Go support is also [available](https://docs.textile.io/tutorials/go/getting-started/).
