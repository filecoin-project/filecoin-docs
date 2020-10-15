---
title: 'Lotus: chain management'
description: 'The Lotus blockchain carries the information necessary to compute the current state of the network, is stored on disk and grows every 30 seconds with new blocks. This guide explains how to manage several aspects of th chain.'
breadcrumb: 'Chain management'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}.

[[TOC]]

## Syncing

Lotus will automatically sync to the latest _chain head_ by:

- Fetching the block headers from the current _head_ down to the last synced epoch.
- Retrieving and verifying all the blocks from the last synced epoch to the current head.

Once Lotus is synced, it will learn about new blocks as they are mined for every epoch via Pubsub, and verify them accordingly. Note that in Lotus, every epoch might see a variable number of mined blocks.

Lotus is a fast-growing chain, so a full sync will take long time. For this reason, Lotus offers a faster way to sync via snapshots.

### Syncing from a pruned snapshot (mainnet)

We recommend most users to perform the initial node sync from a pruned, lightweight snapshot. Pruned snapshots do not contain the full state and might not be suitable for nodes that need to perform queries against historical state information, like block explorers, but otherwise work for most users.

A recent pruned chain snapshot is available [here](https://very-temporary-spacerace-chain-snapshot.s3.amazonaws.com/Spacerace_pruned_stateroots_snapshot_latest.car). We can tell lotus to start the daemon directly with the url:

```sh
# The snapshot size is about 4GiB. This works for mainnet.
lotus daemon --import-snapshot https://very-temporary-spacerace-chain-snapshot.s3-us-west-2.amazonaws.com/Spacerace_pruned_stateroots_snapshot_latest.car
# An alternative is to download first and use the file
lotus daemon --import-snapshot <filename.car>
```

::: warning
If you do not trust the source of the snapshot and want Lotus to validate the chain, use `--import-chain` instead of `--import-snapshot`. This will be significantly slower.
:::

### Syncing from a full snapshot (mainnet)

An alternative to pruned snapshots are full chain snapshots ([available here](https://very-temporary-spacerace-chain-snapshot.s3-us-west-2.amazonaws.com/Spacerace_stateroots_snapshot_latest.car)), which are significantly bigger and therefore slower to download, but will contain all the historical state information. They are imported in the same way:

```sh
lotus daemon --import-snapshot https://very-temporary-spacerace-chain-snapshot.s3-us-west-2.amazonaws.com/Spacerace_stateroots_snapshot_latest.car
```

::: warning
If you do not trust the source of the snapshot and want Lotus to validate the chain, use `--import-chain` instead of `--import-snapshot`. This will be significantly slower.
:::

### Checking sync status

There are two ways to track whether the Lotus daemon is correctly syncing the chain and how far it has yet to go to complete the syncing:

```sh
# Inspect the current sync status, sync workers etc:
lotus sync status
# Wait for the chain to be fully synced and get information in the meantime:
lotus sync wait
```

You can also check when the last synced block was mined with:

```sh
date -d @$(./lotus chain getblock $(./lotus chain head) | jq .Timestamp)
```

## Creating a snapshot

A full chain CAR-snapshot can be created with:

```sh
lotus chain export <filename>
```

A pruned snapshot can be created with:

```sh
lotus export --skip-old-msgs --recent-stateroots=900 <filename>
```

where the `--recent-stateroots` flag specifies how many state roots to keep. `--skip-old-msgs` will avoid including any messages older than the state roots we are keeping.

## Restoring a custom snapshot

Snapshots can be restored by starting the daemon as follows:

```sh
# Without verification
lotus daemon --import-snapshot <filename>
# With verification
lotus daemon --import-chain <filename>
```

If you do not want the daemon to start once the snapshot has finished, add the `--halt-after-import` flag to the command:

```bash
lotus daemon --import-snapshot --halt-after-import <filename>
```

## Compacting the chain data

It is possible to "prune" the current chain data used by Lotus to reduce the disk footprint of a Lotus node by resyncing from a pruned snapshot. This is a quick overview of the steps:

1. Stop the lotus daemon, i.e. `lotus daemon stop`)
2. Remove the contents of the `datastore/chain/` folder in the Lotus path, i.e. `rm -rf ~/.lotus/datastore/chain/*`.
3. Start the daemon using a pruned snapshot as explained above, i.e. `lotus daemon --import-snapshot <url>`.
