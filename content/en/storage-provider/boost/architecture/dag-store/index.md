---
title: "DAG store"
description: "The DAG store manages a copy of unsealed deal data stored as CAR files. It maintains indexes over the CAR files to facilitate efficient querying of multihashes."
lead: "The DAG store manages a copy of unsealed deal data stored as CAR files. It maintains indexes over the CAR files to facilitate efficient querying of multihashes."
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "dag-store-71f2215a790e65e7ca91cd7362b26bb4"
weight: 30
toc: true
---

## Directory structure

By default, the dagstore root will be:


* `$BOOST_REPO_PATH/dagstore`

The directory structure is as follows:

```
 dagstore
     |___ index                         # (1)
     |___ transients                    # (2)
     |___ datastore                     # (3)
     |___ .shard-registration-complete  # (4)
     |___ .boost-shard-registration-complete  # (5)

```

1. `index`: holds the shard indices.
2. `transients`: holds temporary shard data (unsealed pieces) while they're being indexed.
3. `datastore`: records shard state and metadata so it can survive restarts.
4. `.shard-registration-complete`: marker file that signals that initial migration for legacy markets deals is complete.
5. `.boost-shard-registration-complete`: marker file that signals that initial migration for boost deals is complete.

## First-time migration

When you first start your boost process without a dagstore repo, a migration process will register all shards for both legacy and Boost deals in **lazy initialization** mode. As deals come in, shards are fetched and initialized just in time to serve the retrieval.

* For legacy deals, you can monitor the progress of the migration in your log output, by grepping for the keyword `migrator`. Here's example output. Notice the first line, which specifies how many deals will be evaluated (this number includes failed deals that never went on chain, and therefore will not be migrated), and the last lines (which communicate that migration completed successfully):
* For Boost deals, you can do the same by grepping for the keyword `boost-migrator`.


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


Initialization places IO workload on your storage system. You can stop/start this command at your wish/convenience as proving deadlines approach and elapse, to avoid IOPS starvation or competition with window PoSt.

To stop a bulk initialization(see the next paragraph), press Control-C. Shards being initialized at that time will continue in the background, but no more initializations will be performed. The next time you run the command, it will resume from where it left off.

You can force bulk initialization using the `boostd dagstore initialize-all` command. This command will force initialization of every shard that is still in `ShardStateNew` state for both legacy and Boost deals. To control the operation:


* You must set a concurrency level through the `--concurrency=N` flag.
  * A value of `0` will disable throttling and all shards will be initialized at once. ⚠️ Use with caution!
* By default, only unsealed pieces will be indexed to avoid forcing unsealing jobs. To index also sealed pieces, use the `--include-sealed` flag.

In our test environments, we found the migration to proceed at a rate of 400-500 shards/deals per second, on the following hardware specs: AMD Ryzen Threadripper 3970X, 256GB DDR4 3200 RAM, Samsung 970 EVO 2TB SSD, RTX3080 10GB GPU.

## Configuration

The DAG store can be configured through the `config.toml` file of the node that runs the _boost_ subsystem. Refer to the `[DAGStore]` section. Boost ships with sane defaults:

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
  # Default value: <BOOST_REPO_PATH>/dagstore
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

Boost will automatically try to recover failed shards by triggering a recovery once.

You can view failed shards by using the `boostd dagstore list-shards` command, and optionally grepping for `ShardStateErrored`.

## CLI commands

The `boostd` executable contains a `dagstore` command with several useful subcommands:

* `boostd dagstore list-shards`
* `boostd dagstore initialize-shard <key>`
* `boostd dagstore initialize-all --concurrency=10`
* `boostd dagstore gc`

Refer to the `--help` texts for more information.
