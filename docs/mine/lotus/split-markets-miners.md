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

```
[Subsystems]
#  EnableMining = true
#  EnableSealing = true
#  EnableSectorStorage = true
#  EnableMarkets = true
```

All these options are set to `true` by default. Until now, the monolith `lotus-miner` process has been responsible for all functionality.

At the moment these `subsystems` are designed to be grouped into two distinct types of `lotus-miner` nodes:

1. The `markets` node - a `lotus-miner` process responsible to handling the storage market subsystem, and all functionality related to storage/retrieval deals;

```
[Subsystems]
  EnableMining = false
  EnableSealing = false
  EnableSectorStorage = false
  EnableMarkets = true
```

2. The `mining/sealing/proving` node - a `lotus-miner` process responsible to Filecoin mining, and sector storage, sealing and proving;

```
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

```sh
export LOTUS_BACKUP_BASE_PATH=~/lotus-backup-location
lotus daemon
```

```sh
export LOTUS_BACKUP_BASE_PATH=~/lotus-backup-location
lotus-miner run
```

## Creating a backup

```sh
export LOTUS_BACKUP_BASE_PATH=~/lotus-backup-location
lotus-miner backup ~/lotus-backup-location/backupfile
```

## Copy config.toml for the markets service

You need to generate a `config.toml` for the markets node, and have them ready for the next step. For more information see [configuration usage page](https://docs.filecoin.io/get-started/lotus/configuration-and-advanced-usage/) and the [custom storage layout page](https://docs.filecoin.io/mine/lotus/custom-storage-layout/).

If you intend to run the `mining/sealing/proving` node on the same machine as the `markets` node, make sure that their listeners do not clash:
```
[API]
  ListenAddress = "/ip4/127.0.0.1/tcp/8787/http"
  RemoteListenAddress = "127.0.0.1:8787"
```

By default the `lotus-miner` node listens to port 2345, so in the example configuration above, we change the configuration for the `markets` node to listen to `127.0.0.1:8787`.

In the example commands below, we have placed the `config.toml` in the `~/.lotusmarket` directory.

## Initialising a markets service repository

1. Create authentication tokens for the `markets` node

```sh
export APISEALER=`./lotus-miner auth api-info --perm=admin`
export APISECTORINDEX=`./lotus-miner auth api-info --perm=admin`
```

2. Initialise the `market` node. This performs a one-time setup of the markets node. Part of that setup includes updating the `Peer ID` and the `Multiaddr` in the miner actor by submitting a message on chain. This is necessary so that storage and retrieval clients know that this miner's **deal-making** endpoint is now publicly dialable/reachable on a new address (the new `market` node).

    Note that `lotus-miner` interacts with one repository or another depending on the `LOTUS_MINER_PATH` environment variable!

```sh
export LOTUS_MINER_PATH=~/markets-repo-location

./lotus-miner init service --type=markets \
                           --api-sealer=$APISEALER \
                           --api-sector-index=$APISECTORINDEX \
                           --config=~/.lotusmarket/config.toml \
                           ~/lotus-backup-location/backupfile
```

## Start the `mining/sealing/proving` miner process without the markets subsystem

1. Update your `config.toml` and set `EnableMarkets` option to `false`.

2. Start the node (with the default LOTUS_MINER_PATH, which should point to your `mining/sealing/proving` node repo). Note that `lotus-miner` interacts with a given repository depending on the `LOTUS_MINER_PATH` environment variable!

```sh
./lotus-miner run
```

## Start the `markets` miner process with the markets subsystem

```sh
LOTUS_MINER_PATH=~/markets-repo-location ./lotus-miner run
```

## Rollback from a multi-process architecture back to `lotus-miner` monolith process

In case you want to revert the changes listed above and go back to running `lotus-miner` as a single process, you have to do the following:

1. Make sure that the `mining/sealing/proving` node is publicly exposed, as we will be enabling the markets subsystem on it.

2. In the `mining/sealing/proving` repository, update the `config.toml` and set `EnableMarkets` option to `true`

```
[Subsystems]
  EnableMining = true
  EnableSealing = true
  EnableSectorStorage = true
  EnableMarkets = true
```

3. Restart the `mining/sealing/proving` node with an enabled markets subsystem and fetch its node identity. This is necessary as you have to update your miner's peer identity on-chain, as it was changed to the identity of the markets node during the initialising of the markets service repository.


```
./lotus-miner net id
```

4. Update the miner's peer id on-chain with the result from 3.

```
./lotus-miner actor set-peer-id 12D3XXXXX
```

As soon as the message is confirmed, clients will know to look for the node identity of your `mining/sealing/proving` node, which now also runs the `markets` subsystem, i.e. currently all Lotus subsystems.
