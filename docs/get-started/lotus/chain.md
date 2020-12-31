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

Filecoin's blockchain grows relatively fast, so a full sync will take long time. For this reason, Lotus offers a faster way to sync via trusted state snapshots.

### Syncing from a trusted state snapshot (mainnet)

We recommend most users to perform the initial node sync from a minimal, lightweight snapshot. Trusted state snapshots do not contain the full chain and might not be suitable for nodes that need to perform queries against historical state information, like block explorers, but otherwise work for most users.

A recent minimal trusted state chain snapshot is available [here](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car). We can instruct lotus to start the daemon and directly import from the URL:

```sh
# The snapshot size is about 7GiB. This works for mainnet.
lotus daemon --import-snapshot https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car

# An alternative is to download first and use the file
lotus daemon --import-snapshot <filename.car>

# The sha256sum is stored alongside the interim snapshot and can be obtained via
curl -sI https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car \
| perl -ne '/^x-amz-website-redirect-location:(.+)\.car\s*$/ && print "$1.sha256sum"' \
| xargs curl -s
```

::: warning
If you do not trust the source of the snapshot or simply want Lotus to validate the chain, you need to follow the steps in the next section. Complete validation of the chain is an order of magnitude slower, and is expected to take multiple days.
:::

### Syncing from a full snapshot (mainnet)

An alternative to trusted state snapshots are full chain snapshots ([available here](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/complete_chain_with_finality_stateroots_latest.car)), which are significantly bigger and therefore slower to download, but will contain every block from genesis until the current tipset. In addition to the trusted import option described above, these complete snapshots can be trustlessly imported by fully recalculating the state during import. Simply supply the `--import-chain` option instead:

```sh
lotus daemon --import-chain https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/complete_chain_with_finality_stateroots_latest.car
```

::: warning
Due to the size and complexity of the Filecoin chain the above operation is expected to take multiple days.
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
lotus chain export --skip-old-msgs --recent-stateroots=2000 <filename>
```

where the `--recent-stateroots` flag specifies how many state roots to export. `--skip-old-msgs` will only include blocks directly referenced by the exported state roots.

## Restoring a custom snapshot

Snapshots can be restored by starting the daemon as follows:

```sh
# Without verification
lotus daemon --import-snapshot <filename>
# With verification
lotus daemon --import-chain <filename>
```

If you do not want the daemon to start once the snapshot has finished (this is useful in e.g. docker environments), add the `--halt-after-import` flag to the command:

```bash
lotus daemon --import-snapshot --halt-after-import <filename>
```

## Compacting the chain data

It is possible to "prune" the current chain data used by Lotus to reduce the disk footprint of a Lotus node by resyncing from a minimal snapshot. This is a quick overview of the steps:

1. Stop the lotus daemon, i.e. `lotus daemon stop`)
2. Remove the contents of the `datastore/chain/` folder in the Lotus path, i.e. `rm -f ~/.lotus/datastore/chain/*`
3. Start the daemon using a minimal snapshot as explained above, i.e. `lotus daemon --import-snapshot https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car`.
