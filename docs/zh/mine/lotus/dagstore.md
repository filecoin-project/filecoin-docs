---
title: 'Lotus Miner: About the markets dagstore'
description: ''
breadcrumb: 'About the markets dagstore'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

[[TOC]]
::: warning
This guide is WIP, please create an issue if you have any feedback!
:::
## Conceptual overview

::: tip
The dagstore is targeted to be introduced in Lotus v1.11.2. We will update the docs once it’s confirmed.
:::

The dagstore is a sharded store to hold large IPLD graphs efficiently, packaged as location-transparent attachable CAR files, with mechanical sympathy resulting in zero-copy access in ideal situations.

The dagstore is a component of the _markets_ subsystem in `lotus-miner`. It replaces the former Badger staging blockstore. It is designed to provide high efficiency and throughput, and minimize resource utilization during deal-making operations.

The dagstore leverages the indexing features of [CARv2](https://github.com/ipld/ipld/blob/master/specs/transport/car/carv2/index.md) to enable plain CAR files to act as read and write blockstores. These CAR files serve as the direct medium for data exchange in markets and deal-making processes, without requiring intermediate buffers.

Compared to before dagstore was introduced:

* On storage deals, miners no longer stage the data into a Badger store prior to forming the unsealed CAR. Instead, the unsealed CAR is built directly as the data is being transferred through graphsync.
* On retrieval deals, miners no longer load the unsealed CAR into a Badger blockstore first. Retrievals are served directly from the data at rest (the unsealed CAR).

The DAG store comprises three layers:

1. Storage layer (manages shards).
2. Index repository (manages indices).
3. DAG access layer (manages queries).

## Terminology

Here's a definition of terms:

- **Shard:** the unit of data storage in the dagstore. Every Filecoin piece (the data within a deal) is a unique shard in the dagstore. Every shard is identified by a unique **key**, whose value is the **Piece CID**.
- **Shard state:** the state that a dagstore shard is in. It can be one of the  following:
  - `ShardStateNew`: indicates that a shard has been registered, but has not yet been initialized.
  - `ShardStateInitializing`: indicates that the shard is being initialized.
    - `ShardStateAvailable`: indicates that the shard has been initialized and is capable of serving retrievals. However, there are no active shard readers in this moment.
  - `ShardStateServing`: indicates the shard has active readers, and thus is currently serving at least one retrieval.
    - `ShardStateErrored`: indicates that an unexpected error was encountered during a shard operation (e.g. initialization or acquisition), and therefore the shard needs to be recovered to be fully operational.
    - `ShardStateRecovering`: indicates that the shard is attempting to recover from an errored state.
- **Shard initialization:** the act of fetching the shard's data, indexing it and storing the index under the `dagstore/index` directory.
- **Shard acquisition:** the act of fetching the shard's data, joining it with an index, and building an accessor for shard data to serve retrievals.
- **Index:** a mapping of _CID to CAR_ file offset, associated with a shard.
- **Mount:** a key feature of the dagstore is location-transparency of shard data, and the mount is the component that teaches the dagstore how to obtain the data for a shard. A shard can be mounted from a local path, HTTP URL, distributed filesystem, the Lotus storage subsystem (precisely the mount type that we use in Lotus), or anything else.

## Directory structure

By default, the dagstore root will be:

- `$LOTUS_MARKETS_PATH/dagstore`, if you're running a [split miner/market deployment](./split-markets-miners.md).
- `$LOTUS_MINER_PATH/dagstore`, if you're not.

The directory structure is as follows:

```
 dagstore
     |___ index                         # (1)
     |___ transients                    # (2)
     |___ datastore                     # (3)
     |___ .shard-registration-complete  # (4)
```

1. `index`: holds the shard indices.
2. `transients`: holds temporary shard data (unsealed pieces) while they're being indexed.
3. `datastore`: records shard state and metadata so it can survive restarts.
4. `.shard-registration-complete`: marker file that signals that initial migration is complete.

## First-time migration

When you first start your lotus-miner or the market nodes if you’ve split it out using the lotus that introduced dagstore (we will add the exact version later), a migration process will register all shards in **lazy initialization** mode. As deals come in, shards are fetched and initialized just in time to serve the retrieval.

You can monitor the progress of the migration in your log output, by grepping for the keyword `migrator`. Here's example output. Notice the first line, which specifies how many deals will be evaluated (this number includes failed deals that never went on chain, and therefore will not be migrated), and the last lines (which communicate that migration completed successfully):

```
2021-08-09T22:06:35.701+0300    INFO    dagstore.migrator       dagstore/wrapper.go:286 registering shards for all active deals in sealing subsystem    {"count": 453}
2021-08-09T22:06:35.701+0300    WARN    dagstore.migrator       dagstore/wrapper.go:335 deal has nil piece CID; skipping        {"deal_id": 0}
2021-08-09T22:06:35.701+0300    INFO    dagstore.migrator       dagstore/wrapper.go:348 registering deal in dagstore with lazy init     {"deal_id": 2208881, "piece_cid": "baga6ea4seaqhnvxy55e
nveknyqhkkh7mltcrrcx35yvuxdmcbfouaafkvp6niay"}
2021-08-09T22:06:35.702+0300    INFO    dagstore.migrator       dagstore/wrapper.go:318 async shard registration completed successfully {"shard_key": "baga6ea4seaqhnvxy55enveknyqhkkh7mltcrrcx
35yvuxdmcbfouaafkvp6niay"}
[...]
2021-08-09T22:06:35.709+0300    INFO    dagstore.migrator       dagstore/wrapper.go:361 finished registering all shards {"total": 44}
[...]
2021-08-09T22:06:35.826+0300    INFO    dagstore.migrator       dagstore/wrapper.go:365 confirmed registration of all shards
2021-08-09T22:06:35.826+0300    INFO    dagstore.migrator       dagstore/wrapper.go:372 successfully marked migration as complete
2021-08-09T22:06:35.826+0300    INFO    dagstore.migrator       dagstore/wrapper.go:375 dagstore migration complete
```

## Forcing bulk initialization

Forcing bulk initialization will become important in the near future, when miners begin publishing indices to the network to advertise content they have, and new retrieval features become available (e.g. automatic shard routing).

You should start now if possible, as this process is better carried out gradually and over a longer timeframe, if you have many storage deals.
::: warning
Initialization places IO workload on your storage system. You can stop/start this command at your wish/convenience as proving deadlines approach and elapse, to avoid IOPS starvation or competition with window PoSt.

To stop a bulk initialization(see the next paragraph), press Control-C. Shards being initialized at that time will continue in the background, but no more initializations will be performed. The next time you run the command, it will resume from where it left off.
:::
You can force bulk initialization using the `lotus-miner dagstore initialize-all` command. This command will force initialization of every shard that is still in `ShardStateNew` state. To control the operation:
- You must set a concurrency level through the `--concurrency=N` flag.
  - A value of `0` will disable throttling and all shards will be initialized at once. ⚠️ Use with caution!
- By default, only unsealed pieces will be indexed to avoid forcing unsealing jobs. To index also sealed pieces, use the `--include-sealed` flag.

::: tip
In our test environments, we found the migration to proceed at a rate of 400-500 shards/deals per second, on the following hardware specs: AMD Ryzen Threadripper 3970X, 256GB DDR4 3200 RAM, Samsung 970 EVO 2TB SSD, RTX3080 10GB GPU.
:::

## Configuration

The DAG store can be configured through the `config.toml` file of the node that runs the _markets_ subsystem. Refer to the `[DAGStore]` section. Lotus ships with sane defaults:

```toml
[DAGStore]
  # Path to the dagstore root directory. This directory contains three
  # subdirectories, which can be symlinked to alternative locations if
  # need be:
  #  - ./transients: caches unsealed deals that have been fetched from the
  #    storage subsystem for serving retrievals.
  #  - ./indices: stores shard indices.
  #  - ./datastore: holds the KV store tracking the state of every shard
  #    known to the DAG store.
  # Default value: <LOTUS_MARKETS_PATH>/dagstore (split deployment) or
  # <LOTUS_MINER_PATH>/dagstore (monolith deployment)
  # RootDir = ""

  # The maximum amount of indexing jobs that can run simultaneously.
  # 0 means unlimited.
  # Default value: 5.
  #
  # type: int
  # MaxConcurrentIndex = 5

  # The maximum amount of unsealed deals that can be fetched simultaneously
  # from the storage subsystem. 0 means unlimited.
  # Default value: 0 (unlimited).
  #
  # type: int
  # MaxConcurrentReadyFetches = 0

  # The maximum number of simultaneous inflight API calls to the storage
  # subsystem.
  # Default value: 100.
  #
  # type: int
  # MaxConcurrencyStorageCalls = 100

  # The time between calls to periodic dagstore GC, in time.Duration string
  # representation, e.g. 1m, 5m, 1h.
  # Default value: 1 minute.
  #
  # type: Duration
  # GCInterval = "1m"
```

## Automatic shard recovery on error

Shards can error for various reasons, e.g. if the storage system cannot serve the unsealed CAR for a deal/shard, if the shard index is accidentally deleted, etc.

Lotus will automatically try to recover failed shards by triggering a recovery once.

You can view failed shards by using the `lotus-miner dagstore list-shards` command, and optionally grepping for `ShardStateErrored`.

## CLI commands

The `lotus-miner` executable contains a `dagstore` command with several useful subcommands:

- `lotus-miner dagstore list-shards`
- `lotus-miner dagstore initialize-shard <key>`
- `lotus-miner dagstore initialize-all --concurrency=10`
- `lotus-miner dagstore recover-shard <key>`
- `lotus-miner dagstore gc`

Refer to the `--help` texts for more information.

On a [split miner/market deployment](./split-markets-miners.md), these commands hit the markets node as long as your environment variables are configured correctly.

## Recommendations

1. If possible, configure your markets node `storage.json` to point to storage paths that are shared with your mining/sealing/storage node. That will avoid unnecessary network transfer.
2. Do plan and execute [bulk initialization](#forcing-bulk-initialization) ASAP.

## Troubleshooting

### Lotus Version Rollback

If you are downgrading from Lotus 1.11.2-dev (or above) to 1.11.1 (or below), you will need to ensure outstanding storage deals have reached the `StorageDealAwaitingPrecommit` state, before downgrading. That's the stage at which the _markets_ subsystem has handed off the deal to the _sealing_ subsystem.

If downgrading is performed before outstanding storage deals reach this state, the _markets_ process will panic.

If you are experiencing this panic, you will need to restore to your previous version and all the storage deals to reach `StorageDealAwaitingPrecommit` before attempting to downgrade again.
