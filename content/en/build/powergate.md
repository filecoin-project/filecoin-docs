---
title: "Powergate"
description: "The Powergate is an API-driven storage solution for deploying multi-tiered storage across Filecoin (the cold-storage layer) and IPFS(the hot-storage layer)."
menu:
    build:
        parent: "build-tools"
---

Powergate exposes higher-level APIs for developers that facilitate interaction with IPFS and Filecoin nodes. It also handles wallet management, long-term deal management, and provides many features that improve the overall experience of being a storage client on Filecoin. You can read more about Powergate in the [Textile docs](https://docs.textile.io/powergate/).

Powergate is the **recommended solution** for developers who want an easier interface and better performance from Filecoin, but who prefer to manage their nodes, and also gain access to rich and flexible storage configurations. For examples:

- Replication factor
- Miner selection
- Deal renewal and Repair

## How to use Powergate

There are many ways to interact with the Powergate. These pathways are well-documented on Textile’s Powergate docs. The high-level pathways are summarized here for a quick reference:

- **Powergate CLI**: You can [install](https://docs.textile.io/powergate/#getting-started), run, and interact directly with the [Powergate CLI](https://docs.textile.io/powergate/cli/pow/).
- **Powergate JS API client**: If you would like to use Powergate in your JS application, you can use the [Powergate JS Client](https://textileio.github.io/js-powergate-client/).
- **Powergate Go API client**: If you would like to use Powergate in your Go application, you can use the [Powergate Go Client](https://pkg.go.dev/github.com/textileio/powergate/api/client?utm_source=godoc).

{{< alert icon="tip" >}}
Sometimes the best way to learn is through examples.

- See a full production application ([Slate](https://github.com/filecoin-project/slate/)) built on the **Powergate JS Client**.
{{< /alert >}}

### Getting started with POW CLI

This guide will help you get started with _Powergate CLI_. We will be using the _Powergate CLI_ to interact with the Powergate API endpoint.

{{< alert icon="tip" >}}
Developers can also start with the localnet as you'll have access to all the APIs and capabilities without having to sync to the network right away. When you're ready, you can update your Powergate to connect to the live _mainnet_.

We will use the Filecoin mainnet as an example here. Learning how to use localnet, see [Powergate localnet instruction](https://docs.textile.io/powergate/localnet/).
{{< /alert >}}

1. **Download and install `pow` CLI**:

   The [`pow` CLI tool](https://docs.textile.io/powergate/cli/pow/) will help us interact with the Powergate instance. It can be built and installed with:

   ```sh
   git clone https://github.com/textileio/powergate
   cd powergate
   make install-pow
   ```

1. **Sync the blocks for Filecoin mainnet**:

   Before you can start storing and retrieving data from Filecoin, you need to fully sync from Filecoin mainnet which may take over a day.

   To speed up the syncing process, you can also choose to sync from the current snapshot provided by Protocol Labs every hour. For all the details, please check [Bootstrap a clean Lotus node from a snapshot](https://docs.textile.io/powergate/mainnet/#bootstrap-a-clean-lotus-node-from-a-snapshot).

1. **Create a new User instance**:

   A User instance manages all the necessary state and capabilities to provide multitiered file storage through the Powergate. Each Powergate setup can manage an arbitrary number of User instances. To create a new User:

   ```sh
   pow admin user create
   ```

   This will print an instance ID and a User auth token. Write down the auth token; we will need it for every other user-operation. As an optional convienience (vs. including the User `--token` flag on every `pow` command), you can let Powergate know about it with the `POW_TOEKN` environment variable:

   ```sh
   export POW_TOKEN=<token>
   ```

   Additional details about User instances can be found in the [official documentation](https://docs.textile.io/powergate/storage/#intro-to-users).

1. **Stage your data**:

   Powergate requires stored data to be available over IPFS, you can ensure it's available by staging it on IPFS using `stage`. If data exists on the IPFS network, you don't need to run `stage` as the Powergate will automatically fetch that data from remote peers.

   ```sh
   pow data stage [path|url]
   ```

   Note the CID in the output. This will be used to initiate the Powergate storage.

1. **Initiate data storage**:

   The following command pushes a new storage configuration for a CID, creates a storage job for it, and watches the progress of the resulting job:

   ```sh
   pow config apply [cid] --watch
   ```

   The configuration used will be based on the default configuration unless a custom configuration is provided (see `pow config apply --help`). Powergate will automatically find storage providers and perform the storage deal.

   You can watch the job progress anytime with:

   ```sh
   pow storage-jobs watch [jobid]
   ```

   For additional details and up-to-date information on how to use `pow` and perform other operations like retrieval, see the [official Textile docs](https://docs.textile.io/powergate/cli/pow/).

1. **Retrieve your file**

   To retrieve the file that you stored through POW CLI, you can run the following command to download it from IPFS:

   ```
   pow data get <cid> fileName
   ```

1. **Interact with the Powergate API**:

   Once you are familiar with the Powergate workflows, you can start programatically controlling the Powergate instance. Textile provides Go and Javascript API clients for Powergate using the gRPC API endpoint:

   - [js-powergate-client](https://github.com/textileio/js-powergate-client)
   - [Go Powergate client module](https://pkg.go.dev/github.com/textileio/powergate/api/client?utm_source=godoc)

## Additional Powergate resources

For a more detailed description of how Powergate works, we recommend reading the following docs:

- [Filecoin Developer Tools](https://blog.textile.io/filecoin-developer-tools-concepts/)
- Powergate introduction: [docs](https://docs.textile.io/powergate/) and [video](https://www.youtube.com/watch?v=aiOTSkz_6aY)
- [Using Powergate with LocalNet](https://docs.textile.io/powergate/localnet/)
- [Learn all POW command lines](https://docs.textile.io/powergate/cli/pow/)
- [FFS Design Overview](https://github.com/textileio/powergate/blob/master/ffs/Design.md)
