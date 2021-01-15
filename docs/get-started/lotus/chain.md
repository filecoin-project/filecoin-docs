---
title: 'Lotus: chain management'
description: 'The Lotus blockchain carries the information necessary to compute the current state of the network. This guide explains how to manage several aspects of the chain.'
breadcrumb: 'Chain management'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}.

## Syncing

Lotus will automatically sync to the latest _chain head_ by:

- Fetching the block headers from the current _head_ down to the last synced epoch.
- Retrieving and verifying all the blocks from the last synced epoch to the current head.

Once Lotus is synced, it will learn about new blocks as they are mined for every epoch and verify them accordingly. Every epoch might see a variable number of mined blocks.

Filecoin's blockchain grows relatively fast, so a full sync will take long time. For this reason, Lotus offers a faster way to sync using trusted state snapshots. There are two types of snapshot available:

| Name                                 | Description | End height    | Message start height        | State start height          |
| ------------------------------------ | ----------- | ------------- | --------------------------- | --------------------------- |
| [Lightweight](#lightweight-snapshot) | asd         | Current block | Current block - 2000 blocks | Current block - 2000 blocks |
| [Full chain](#full-chain-snapshot)   | asd         | Current block | Genesis block               | Current block - 2000 blocks |

### Lightweight snapshot

We recommend most users perform the initial node sync from a lightweight snapshot. These snapshots do not contain the full chain and are not suitable for nodes that need to perform queries against historical state information, such as block explorers. However, they are significantly smaller than full snapshots.

:::warning
These lightweight state snapshots **do not contain any message receipts**. If message receipts are important to you, you need to sync your Lotus node from the genesis block without using any of these snapshots.
:::

1.  Download the most recent lightweight snapshot:

    ```bash
    wget https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car
    ```

1.  Check the sha256sum of the download:

        ```bash
        curl -sI https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car \

    | perl -ne '/^x-amz-website-redirect-location:(.+)\.car\s\*$/ && print "$1.sha256sum"' \
    | xargs curl -s
    ```

1.  Start the Lotus daemon using `--import-snapshot`:

    ```bash
    lotus daemon --import-snapshot minimal_finality_stateroots_latest.car
    ```

You can skip the `sha256sum` check and use the snapshot URL directly, if you'd prefer:

```bash
lotus daemon --import-snapshot https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car
```

::: warning
If you do not trust the source of the snapshot or simply want Lotus to validate the chain, you need to follow the steps in the next section. Complete validation of the chain is an order of magnitude slower, and is expected to take multiple days.
:::

### Full chain snapshot

An alternative to lightweight snapshots are full chain snapshots. Full snapshots contain every block from genesis until the current tipset. These complete snapshots can be trustlessly imported by supplying the `--import-chain` option to fully recalculate the state during import:

```sh
lotus daemon --import-chain https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/complete_chain_with_finality_stateroots_latest.car
```

::: warning
Due to the size and complexity of the Filecoin blockchain, the above operation will take multiple days.
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

It is possible to _prune_ the current chain data used by Lotus to reduce the disk footprint of a Lotus node by resyncing from a minimal snapshot.

1. Stop the Lotus daemon:

```bash
lotus daemon stop
```

1. Remove the contents of the `datastore/chain/` folder in the Lotus path:

```bash
rm -rf ~/.lotus/datastore/chain/*
```

1. Start the daemon using a minimal snapshot, as explained above:

```bash
lotus daemon --import-snapshot https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car
```
