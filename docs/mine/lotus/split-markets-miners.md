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

It is now possible to run mining and markets subsystems in separate processes. Service providers can
accept storage and retrieval deals without impacting ongoing mining operations. The markets process
communicates with the mining process over JSON-RPC.

It is **highly recommended** to run the mining and markets processes on separate physical or virtual machines so that
- the machine hardware can be targeted according to the typical workload of the process
- only the machine running the markets process exposes public ports

However it is still advantageous to run the processes separately on the same machine to
isolate them - for example the storage service provider can stop and restart the markets
process without affecting an ongoing Winning PoSt Window PoSt on the miner. 

The steps below will guide you through the procedure to backup your mining node, create
an initial configuration for your brand new markets node, disable markets functionality
on the mining node, and bring both the mining and markets nodes online.

## Splitting the `lotus-miner` monolith into Subsystems

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

These options are set to `true` by default and you are running a `lotus-miner` monolith under this setting. Until now, the monolith `lotus-miner` process
has been responsible for all functionality.

`subsystems` can be enabled and disabled individually per process within each node's own config file. There are only two combinations that are supported right now:

1. The `markets` node - a `lotus-miner` process responsible for handling the storage market
 subsystem, and all functionality related to serve storage and retrieval deals;

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

This guide won't go into details on how to make the endpoint connectable, as this ultimately depends on your network infrastructure and equipment, refer to the [lotus-miner connectivity guide](https://docs.filecoin.io/mine/lotus/connectivity/#frontmatter-title) for more details. Generally speaking, configuring static port mappings on your external-facing router, and ensuring your markets node has an internal static IP address and port should be sufficient, in addition to adjusting any firewalls that may be present.


::: tip  
When a `lotus-miner` instance is configured as a `mining/sealing/proving` node,
**it does not receive requests and should not be publicly exposed on the Internet**.  
**The `markets` node communicates with the `mining/sealing/proving` node via its
JSON RPC interface.** Just to reiterate, the `mining/sealing/proving` no longer runs a libp2p interface, and the `markets` and `mining/sealing/proving` do not communicate over libp2p, but through HTTP and/or Websockets (JSON-RPC interface).  
:::

## Split the processes

#### Pre-requisites

Before splitting the markets service process from the monolith miner process,
we need to backup the miner's metadata repository. Stop the `lotus daemon` and
restart it with the `LOTUS_BACKUP_BASE_PATH` environment variable:

```shell
export LOTUS_BACKUP_BASE_PATH=/tmp
lotus daemon
```

#### 1. Restart the `mining/sealing/proving` miner process without the markets subsystem

1. Update your `config.toml` to set the `EnableMarkets` option to `false`.

2. Stop the lotus miner, then restart it with the `LOTUS_BACKUP_BASE_PATH` environment variable:

```shell
export LOTUS_BACKUP_BASE_PATH=/tmp
lotus-miner run
```

The miner is now running as a `mining/sealing/proving` node (without the `markets` subsystem) 

#### 2. Create a backup

```shell
export LOTUS_BACKUP_BASE_PATH=/tmp
lotus-miner backup /tmp/backup.cbor
```

#### 3. Create a seed `config.toml` for the markets service

To initialize the markets service we need to create a seed `config.toml` for
the markets node. For more information see the [configuration page](https://docs.filecoin.io/get-started/lotus/configuration-and-advanced-usage/) and the [custom storage layout page](https://docs.filecoin.io/mine/lotus/custom-storage-layout/).

In the examples below the `config.toml` is in the `/tmp` directory. You may customise the example below to adapt it to your environment.
The repository directory is `~/.lotusmarkets`.
We are using the following `config.toml`:

```toml
[API]
  # Endpoint where the markets process will serve JSON-RPC requests
  ListenAddress = "/ip4/127.0.0.1/tcp/8787/http"
  RemoteListenAddress = "127.0.0.1:8787"

[Libp2p]
  # Endpoint for libp2p requests (public)
  ListenAddresses = ["/ip4/0.0.0.0/tcp/24001", "/ip6/::/tcp/24001"]
  AnnounceAddresses = ["/ip4/12.34.56.78/tcp/24001"]
```

If you intend to run the `mining/sealing/proving` node on the same machine as the
`markets` node, make sure that their `[API]` listener addresses do not clash.
By default the `lotus-miner` API server listens to port 2345, so in the example
configuration above for the `markets` process, we change the configuration for the
`markets` node API server to listen to `127.0.0.1:8787`.

Make sure you adjust the `[Libp2p]` section on the `markets` node accordingly - it
needs to be publicly accessible so that clients can make storage and retrieval
deals with your system.

:: info
The `[Libp2p]` section of the `config.toml` on the `mining/sealing/proving` node
can be removed because it will no longer be running a Libp2p node, as we explained above.
::

#### 4. Initialize a `markets` service repository

1. Create authentication tokens that will be used by the `markets` node to make JSON-RPC
calls to the `mining/sealing/proving` node.

```shell
export APISEALER=`lotus-miner auth api-info --perm=admin`
export APISECTORINDEX=`lotus-miner auth api-info --perm=admin`
```

2. Initialize the `markets` node. This performs a one-time setup of the markets node.
Part of that setup includes updating the `peer id` in the miner actor by submitting
a message on chain. This is necessary so that storage and retrieval clients know that
this miner's **deal-making** endpoint is now publicly dialable/reachable on a new
address (the new `markets` node).

```shell
lotus-miner --markets-repo=~/.lotusmarkets init service --type=markets \
                                                        --api-sealer=$APISEALER \
                                                        --api-sector-index=$APISECTORINDEX \
                                                        --config=/tmp/config.toml \
                                                        /tmp/backup.cbor
```

3. If during this procedure, you ended up changing the `multiaddr` of your `markets`
process to a different host and/or port, you must update miner's `multiaddr` on-chain.
Otherwise, clients wishing to make deals with you will no longer be able to connect to
your node.

```shell
lotus-miner actor set-addrs <NEW_MULTIADDR>
```

#### 5. Move the DAG store directory to the markets node repository (optional)

If you are running a lotus version with a DAG store, you can optionally move the
DAG store directory to the lotus markets repository, to avoid having to reindex
all storage deals when the markets node starts up.

```shell
mv ~/.lotusminer/dagStore ~/.lotusmarkets/
```

#### 6. Start the `markets` miner process with the markets subsystem

Start the `markets` node with the environment variable `LOTUS_MINER_PATH` pointing to the `markets` node repo.

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
