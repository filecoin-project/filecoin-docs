---
title: 'Lotus Miner: Splitting main miner and markets service processes'
description: ''
breadcrumb: 'Splitting main miner and markets service processes'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Background

> Note: this feature is available starting with Lotus v1.11.1

Lotus v1.11.1 introduced the notion of `subsystems` in the `lotus-miner` process. Currently there are 4 subsystems, that can be enabled or disabled in the `config.toml` file:

```toml
[Subsystems]
#  EnableMining = true
#  EnableSealing = true
#  EnableSectorStorage = true
#  EnableMarkets = true
```

All these options are set to `true` by default. Until now, the monolith `lotus-miner` process has been responsible for all functionality.

At the moment these `subsystems` are designed to be grouped into two distinct types of `lotus-miner` nodes:

1. The `markets` node - a `lotus-miner` process responsible to handling the storage market subsystem, and all functionality related to storage/retrieval deals;

```toml
[Subsystems]
  EnableMining = false
  EnableSealing = false
  EnableSectorStorage = false
  EnableMarkets = true
```

2. The `mining/sealing/proving` node - a `lotus-miner` process responsible to Filecoin mining, and sector storage, sealing and proving;

```toml
[Subsystems]
  EnableMining = true
  EnableSealing = true
  EnableSectorStorage = true
  EnableMarkets = false
```

When a `lotus-miner` node is started with configuration for a `markets` node, it includes a libp2p node and should be publicly exposed on the Internet and reachable/dialable for other clients to communicate with it.

When a `lotus-miner` node is started with configuration for a `mining/sealing/proving` node, it does not include a libp2p node, and it doesn't have to be publicly exposed on the Internet. The `markets` node communicates with it via its JSON RPC interface.

This document explains how to split your existing monolith `lotus-miner` node into multiple processes and take advantage of this new architecture, which brings more security to your mining operation as well as less potential attack surface.

## Pre-requisites

Before splitting the markets service process from the monolith miner process, you should backup your miner's metadata repository. You need to start the `lotus-miner` with the `LOTUS_BACKUP_BASE_PATH` env variable in order to do that.

```shell
export LOTUS_BACKUP_BASE_PATH=~/lotus-backup-location
lotus daemon
```

```shell
export LOTUS_BACKUP_BASE_PATH=~/lotus-backup-location
lotus-miner run
```

## Creating a backup

```shell
export LOTUS_BACKUP_BASE_PATH=~/lotus-backup-location
lotus-miner backup ~/lotus-backup-location/backupfile
```

## Create config.toml for the markets service

You need to create a `config.toml` for the markets node, and have it ready for the next step. For more information see [configuration usage page](https://docs.filecoin.io/get-started/lotus/configuration-and-advanced-usage/) and the [custom storage layout page](https://docs.filecoin.io/mine/lotus/custom-storage-layout/).

In the example commands below, we have placed the `config.toml` in the `~/.lotusmarket` directory, which is not the repository directory for the `markets` instance. The repository directory which we use is `~/markets-repo-location`. We are using the following `config.toml`:

```toml
[API]
  ListenAddress = "/ip4/127.0.0.1/tcp/8787/http"
  RemoteListenAddress = "127.0.0.1:8787"

[Libp2p]
  ListenAddresses = ["/ip4/0.0.0.0/tcp/24001", "/ip6/::/tcp/24001"]
  AnnounceAddresses = ["/ip4/12.34.56.78/tcp/24001"]
```

If you intend to run the `mining/sealing/proving` node on the same machine as the `markets` node, make sure that their listeners do not clash. By default the `lotus-miner` API server listens to port 2345, so in the example configuration above, we change the configuration for the `markets` node to listen to `127.0.0.1:8787`.

Make sure you adjust the `[Libp2p]` section on the `markets` node accordingly - it needs to be publicly accessible, so that clients can make storage and retrieval deals with your system.

The `[Libp2p]` section on the `mining/sealing/proving` node can be removed because this node will no longer be running a Libp2p node.

## Initialising a markets service repository

1. Create authentication tokens for the `markets` node

```shell
export APISEALER=`./lotus-miner auth api-info --perm=admin`
export APISECTORINDEX=`./lotus-miner auth api-info --perm=admin`
```

2. Initialise the `market` node. This performs a one-time setup of the markets node. Part of that setup includes updating the `Peer ID` and the `Multiaddr` in the miner actor by submitting a message on chain. This is necessary so that storage and retrieval clients know that this miner's **deal-making** endpoint is now publicly dialable/reachable on a new address (the new `market` node).

    Note that `lotus-miner` interacts with one repository or another depending on the `LOTUS_MINER_PATH` environment variable!

```shell
export LOTUS_MINER_PATH=~/markets-repo-location

./lotus-miner init service --type=markets \
                           --api-sealer=$APISEALER \
                           --api-sector-index=$APISECTORINDEX \
                           --config=~/.lotusmarket/config.toml \
                           ~/lotus-backup-location/backupfile
```

## Move the DAG store directory to the markets node repository

```shell
mv ~/.lotusminer/dagStore ~/markets-repo-location/
```

## Start the `mining/sealing/proving` miner process without the markets subsystem

1. Update your `config.toml` and set `EnableMarkets` option to `false`.

2. Start the node (with the default LOTUS_MINER_PATH, which should point to your `mining/sealing/proving` node repo). Note that `lotus-miner` interacts with a given repository depending on the `LOTUS_MINER_PATH` environment variable!

```shell
./lotus-miner run
```

## Start the `markets` miner process with the markets subsystem

```shell
LOTUS_MINER_PATH=~/markets-repo-location ./lotus-miner run
```

## Interacting with the different miner instances with CLI over JSON RPC

> In case you run more than one miner instance on the same machine, make sure that you have `MINER_API_INFO` environment variable `unset`. If you have it set, you will always be interacting with only one miner process, because it has precedence over `LOTUS_MINER_PATH`.

Now that you have both a `markets` miner process and a `mining/sealing/proving` miner process running, you can confirm that you can interact with each respective process with the following:

1. Get the peer identity of the `markets` miner process
```shell
LOTUS_MINER_PATH=~/markets-repo-location ./lotus-miner net id
```

2. Get a list of storage deals from the `markets` miner process
```shell
LOTUS_MINER_PATH=~/markets-repo-location ./lotus-miner storage-deals list
```

3. Get a list of sectors from the `mining/sealing/proving` miner process
```shell
LOTUS_MINER_PATH=~/.lotusminer ./lotus-miner sectors list
```

## Rollback to `lotus-miner` monolith process

If you want to revert the changes listed above and go back to running `lotus-miner` as a single process, run the following:

1. Make sure that the `mining/sealing/proving` node is publicly exposed, as we will be enabling the markets subsystem on it.
1. In the `mining/sealing/proving` repository, update the `config.toml` and set `EnableMarkets` option to `true`

```toml
[Subsystems]
  EnableMining = true
  EnableSealing = true
  EnableSectorStorage = true
  EnableMarkets = true
```

3. Move back the DAG store directory to the monolith miner node repository

```shell
mv ~/markets-repo-location/dagStore ~/.lotusminer/
```

4. Backup and restore the metadata related to storage deals from the `markets` instance back to the monolith miner instance. Given that storage deals metadata would have changed on the `markets` instance in case you accepted storage deals while running multi-services architecture, we have to copy it back to the monolith miner instance.

```shell
./lotus-shed market export-datastore --repo ~/markets-repo-location --backup-dir /tmp/deals-backup

./lotus-shed market import-datastore --repo ~/.lotusminer --backup-path /tmp/deals-backup/markets.datastore.backup
```

5. Restart the `mining/sealing/proving` node (with the default LOTUS_MINER_PATH, which should point to your `mining/sealing/proving` node repo). Note that `lotus-miner` interacts with a given repository depending on the `LOTUS_MINER_PATH` environment variable!

```shell
./lotus-miner run
```

6. Fetch the node identity. This is necessary as you have to update your miner's peer identity on-chain, as it was changed to the identity of the markets node during the initialising of the markets service repository.

```shell
./lotus-miner net id
```

7. Update the miner's peer id on-chain with the result from the previous step.

```shell
./lotus-miner actor set-peer-id 12D3XXXXX
```

As soon as the message is confirmed, clients will know to look for the node identity of your `mining/sealing/proving` node, which now also runs the `markets` subsystem, i.e. currently all Lotus subsystems.

## DAG store troubleshooting

If there are any problems related to the DAG store, you can safely stop the node, remove the `dagStore` directory from the repository and restart your miner. It will re-register all active deals in the `dagStore` directory from scratch on startup.
