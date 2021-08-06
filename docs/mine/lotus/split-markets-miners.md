---
title: 'Lotus Miner: Splitting main miner and markets service processes'
description: ''
breadcrumb: 'Splitting main miner and markets service processes'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

[[TOC]]

## Concepts

Lotus performs mining operations, such as sealing files into sectors, calculating proofs over
those files and submitting the proofs on chain.
Lotus also performs markets operations, providing storage and serving retrievals to clients.

It is now possible to run mining and markets operations in separate processes. Service providers can
accept storage and retrieval deals without impacting ongoing mining operations.

It is recommended to run the mining and markets processes on separate machines so that
- the machine hardware can be targeted according to the typical workload of the process
- only the machine running the markets process exposes public ports

However it is still advantageous to run the processes separately on the same machine to
isolate them - for example the service provider can stop and restart the markets
process without affecting an ongoing Window PoST on the miner. 

## Splitting the `lotus-miner` monolith

::: warning
This feature is available in lotus v1.11.1-rc and up, however, it is still experimental
and under testing. Please use at your own risk.
:::

This document explains how to split an existing monolith `lotus-miner` node
into multiple processes to take advantage of this new architecture.

### Configuration

Lotus v1.11.1 introduced the notion of `subsystems` in the `lotus-miner` process.
Currently there are 4 subsystems that can be enabled or disabled in the `config.toml` file:

```toml
[Subsystems]
#  EnableMining = true
#  EnableSealing = true
#  EnableSectorStorage = true
#  EnableMarkets = true
```

These options are set to `true` by default. Until now, the monolith `lotus-miner` process
has been responsible for all functionality.

These `subsystems` are designed to be grouped into two distinct types of `lotus-miner` nodes:

1. The `markets` node - a `lotus-miner` process responsible for handling the storage market
 subsystem, and all functionality related to storage and retrieval deals;

```toml
[Subsystems]
  EnableMining = false
  EnableSealing = false
  EnableSectorStorage = false
  EnableMarkets = true
```

2. The `mining/sealing/proving` node - a `lotus-miner` process responsible for Filecoin mining,
sector storage, sealing and proving;

```toml
[Subsystems]
  EnableMining = true
  EnableSealing = true
  EnableSectorStorage = true
  EnableMarkets = false
```

When a `lotus-miner` instance is configured as a `markets` node, it exposes
a libp2p interface. The libp2p ports should be publically available so that
the node can be dialed by clients that wish to make storage and retrieval deals.

When a `lotus-miner` instance is configured as a `mining/sealing/proving` node,
it does not receive requests and should not be publicly exposed on the Internet.
The `markets` node communicates with the `mining/sealing/proving` node via its
JSON RPC interface.

### Split the processes

#### Pre-requisites

Before splitting the markets service process from the monolith miner process,
you should backup your miner's metadata repository. Start the `lotus-miner`
and `lotus daemon` with the `LOTUS_BACKUP_BASE_PATH` environment variable:

```shell
export LOTUS_BACKUP_BASE_PATH=/tmp
lotus daemon
```

```shell
export LOTUS_BACKUP_BASE_PATH=/tmp
lotus-miner run
```

#### 1. Create a backup

```shell
export LOTUS_BACKUP_BASE_PATH=/tmp
lotus-miner backup /tmp/backup.cbor
```

#### 2. Create a seed `config.toml` for the markets service

To initialize the markets service we need to create a seed `config.toml` for
the markets node. For more information see the [configuration page](https://docs.filecoin.io/get-started/lotus/configuration-and-advanced-usage/) and the [custom storage layout page](https://docs.filecoin.io/mine/lotus/custom-storage-layout/).

In the examples below the `config.toml` is in the `/tmp` directory.
The repository directory is `~/.lotusmarkets`.
We are using the following `config.toml`:

```toml
[API]
  # Endpoint for API calls to the markets process
  ListenAddress = "/ip4/127.0.0.1/tcp/8787/http"
  RemoteListenAddress = "127.0.0.1:8787"

[Libp2p]
  # Endpoint for libp2p requests (public)
  ListenAddresses = ["/ip4/0.0.0.0/tcp/24001", "/ip6/::/tcp/24001"]
  AnnounceAddresses = ["/ip4/12.34.56.78/tcp/24001"]
```

If you intend to run the `mining/sealing/proving` node on the same machine as the
`markets` node, make sure that their listeners do not clash.
By default the `lotus-miner` API server listens to port 2345, so in the example
configuration above, we change the configuration for the `markets` node API server
to listen to `127.0.0.1:8787`.

Make sure you adjust the `[Libp2p]` section on the `markets` node accordingly - it
needs to be publicly accessible so that clients can make storage and retrieval
deals with your system.

The `[Libp2p]` section of the `config.toml` on the `mining/sealing/proving` node
can be removed because it will no longer be running a Libp2p node.

#### 3. Initialising a `markets` service repository

1. Create authentication tokens for the `markets` node. This is an online operation,
so your `lotus-miner` should be running with its updated configuration (in case
you move its API to a different IP:PORT)

```shell
export APISEALER=`lotus-miner auth api-info --perm=admin`
export APISECTORINDEX=`lotus-miner auth api-info --perm=admin`
```

2. Initialise the `market` node. This performs a one-time setup of the markets node.
Part of that setup includes updating the `peer id` in the miner actor by submitting
a message on chain. This is necessary so that storage and retrieval clients know that
this miner's **deal-making** endpoint is now publicly dialable/reachable on a new
address (the new `market` node).

This command should be run on the `markets` miner instance host, as it is creating
the `markets` miner instance repository, among other actions.

```shell
lotus-miner --markets-repo=~/.lotusmarkets init service --type=markets \
                                                        --api-sealer=$APISEALER \
                                                        --api-sector-index=$APISECTORINDEX \
                                                        --config=/tmp/config.toml \
                                                        /tmp/backup.cbor
```

3. Optionally update your miner's `multiaddr` on-chain - in case your `markets`
instance is publicly exposed at a different location compared to your existing
monolith miner, you also need to update your `multiaddr` on-chain to advertise
the correct address to clients:

```shell
lotus-miner actor set-addrs <NEW_MULTIADDR>
```

#### 4. Move the DAG store directory to the markets node repository

If you are running a lotus version with a DAG store, you can optionally move the
DAG store directory to the lotus markets repository, to avoid having to reindex
all storage deals when the markets node starts up.

```shell
mv ~/.lotusminer/dagStore ~/.lotusmarkets/
```

#### 5. Start the `mining/sealing/proving` miner process without the markets subsystem

1. Update your `config.toml` to set the `EnableMarkets` option to `false`.

2. Start the `mining/sealing/proving` node (with the default LOTUS_MINER_PATH, which
should point to your `mining/sealing/proving` node repo).

    Note that `lotus-miner` interacts with either the the `markets` or `mining/sealing/proving` repository
depending on the `LOTUS_MINER_PATH` environment variable!

```shell
lotus-miner run
```

#### 6. Start the `markets` miner process with the markets subsystem

Start the `markets` node with LOTUS_MINER_PATH pointing to the `markets` node repo.

Note that `lotus-miner` interacts with either the the `markets` or `mining/sealing/proving` repository
depending on the `LOTUS_MINER_PATH` environment variable!

```shell
LOTUS_MINER_PATH=~/.lotusmarkets lotus-miner run
```

## Interacting with the different miner instances with CLI over JSON RPC

The client-side CLI commands have been refactored to target the correct `lotus-miner` node, depending on issued command. For example:

1. If you call `lotus-miner storage-deals list`, `lotus-miner` *knows* to target the `markets` process.
1. If you call `lotus-miner sectors list`, `lotus-miner` *knows* to target the `mining/sealing/proving` process.

If a given CLI is supported by all miner types, by default it targets the `mining/sealing/proving` process, but you can target the `markets` process with the `--call-on-markets` flag.

In order to take advantage of this functionality, You should configure the following environment variable for the `mining/sealing/proving` miner and the `markets` miner, in your run-commands file (`.bashrc`, `.zshrc`, etc.):

```shell
export LOTUS_MARKETS_PATH=~/.lotusmarkets
export LOTUS_MINER_PATH=~/.lotusminer
```

If one of these nodes is on a remote machine, you should set the relevant API_INFO environment variables, for example:

```shell
export MARKETS_API_INFO=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.7wPg1b8C-yigqgoCUL-62gzOCZAVjb6mrvnaE8W27OI:/ip4/127.0.0.1/tcp/2345/http
export MINER_API_INFO=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.m3aKgJDsJBVePHWAPpy5aDMaWZ7ZMV9rqe_8MokTwgY:/ip4/127.0.0.1/tcp/8787/http
```

Now that you have both a `markets` miner process and a `mining/sealing/proving` miner process running, you can confirm that you can interact with each respective process with the following:

1. Get miner info
```shell
lotus-miner info
```

1. Get the peer identity of the `markets` miner process
```shell
lotus-miner --call-on-markets net id
```

2. Get a list of storage deals from the `markets` miner process
```shell
lotus-miner storage-deals list
```

3. Get a list of sectors from the `mining/sealing/proving` miner process
```shell
lotus-miner sectors list
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
mv ~/.lotusmarkets/dagStore ~/.lotusminer/
```

4. Backup and restore the metadata related to storage deals from the `markets` instance back to the monolith miner instance. Given that storage deals metadata would have changed on the `markets` instance in case you accepted storage deals while running multi-services architecture, we have to copy it back to the monolith miner instance.

```shell
lotus-shed market export-datastore --repo ~/.lotusmarkets --backup-dir /tmp/deals-backup

lotus-shed market import-datastore --repo ~/.lotusminer --backup-path /tmp/deals-backup/markets.datastore.backup
```

5. Restart the `mining/sealing/proving` node (with the default LOTUS_MINER_PATH, which should point to your `mining/sealing/proving` node repo). Note that `lotus-miner` interacts with a given repository depending on the `LOTUS_MINER_PATH` environment variable!

```shell
lotus-miner run
```

6. Fetch the node identity. This is necessary as you have to update your miner's peer identity on-chain, as it was changed to the identity of the markets node during the initialising of the markets service repository.

```shell
lotus-miner net id
```

7. Update the miner's peer id on-chain with the result from the previous step.

```shell
lotus-miner actor set-peer-id 12D3XXXXX
```

As soon as the message is confirmed, clients will know to look for the node identity of your `mining/sealing/proving` node, which now also runs the `markets` subsystem, i.e. currently all Lotus subsystems.

## DAG store troubleshooting

If there are any problems related to the DAG store, you can safely stop the node, remove the `dagStore` directory from the repository and restart your miner. It will re-register all active deals in the `dagStore` directory from scratch on startup.
