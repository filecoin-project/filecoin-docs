---
title: 'Lotus: chain management'
description: "The Lotus chain carries the information necessary to compute the current state of the Filecoin network. This guide explains how to manage several aspects of the chain, including how to decrease your node's sync-time by loading the chain from a snapshot."
breadcrumb: 'Chain management'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Syncing

Lotus will automatically sync to the latest _chain head_ by fetching the block headers from the current _head_ down to the last synced epoch. The node then retrieves and verifies all the blocks from the last synced epoch to the current head. Once Lotus is synced, it will learn about new blocks as they are mined for every epoch and verify them accordingly. Every epoch might see a variable number of mined blocks.

Filecoin's blockchain grows relatively fast and a full sync will take a long time. Lotus offers a faster way to sync by using trusted state snapshots. There are two types of snapshot available:

| Name                                 | End height    | Message start height        | State start height          |
| ------------------------------------ | ------------- | --------------------------- | --------------------------- |
| [Lightweight](#lightweight-snapshot) | Current block | Current block - 2000 blocks | Current block - 2000 blocks |
| [Full chain](#full-chain-snapshot)   | Current block | Genesis block               | Current block - 2000 blocks |

### Lightweight snapshot

We recommend most users perform the initial node sync from a lightweight snapshot. These snapshots do not contain the full states of the chain and are not suitable for nodes that need to perform queries against historical state information, such as block explorers. However, they are significantly smaller than full chain snapshots and should be sufficient for most use-cases.

:::warning
These lightweight state snapshots **do not contain any message receipts**. To get message receipts, you need to sync your Lotus node from the genesis block without using any of these snapshots.
:::

1. Download the most recent lightweight snapshot and its checksum:

    ```bash
    curl -sI https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car | perl -ne '/x-amz-website-redirect-location:\s(.+)\.car/ && print "$1.sha256sum\n$1.car"' | xargs wget
    ```

    [This URL](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car) always contains the latest snapshot available.

1. Check the `sha256sum` of the downloaded snapshot:

    ```bash
    # Please change the file name accordingly to the actual downloaded snapshot and sha256sum, in this example it is `minimal_finality_stateroots_517061_2021-02-20_11-00-00.car and minimal_finality_stateroots_517061_2021-02-20_11-00-00.sha256sum`
    echo "$(cut -c 1-64 minimal_finality_stateroots_517061_2021-02-20_11-00-00.sha256sum) minimal_finality_stateroots_517061_2021-02-20_11-00-00.car" | sha256sum --check
    
    > minimal_finality_stateroots_517061_2021-02-20_11-00-00.car: OK
    ```

1. Start the Lotus daemon using `--import-snapshot`:

    ```bash
    #Please change the file name accordingly to the actual downloaded snapshot, in this example it is `minimal_finality_stateroots_517061_2021-02-20_11-00-00.car`
    lotus daemon --import-snapshot minimal_finality_stateroots_517061_2021-02-20_11-00-00.car
    ```

We strongly recommend you to download and verify the checksum of the snapshot before importing it. However, you can skip the `sha256sum` check and use the snapshot URL directly if you'd prefer:

```bash
lotus daemon --import-snapshot https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car
```

### Full chain snapshot

Full chain snapshots contain every block from genesis until the current tipset. You can trustlessly import these complete snapshots by supplying the `--import-chain` option to recalculate the state during import fully:

```sh
lotus daemon --import-chain https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/complete_chain_with_finality_stateroots_latest.car
```

This operation will take multiple days due to the size and complexity of the Filecoin blockchain.

### Checking sync status

There are two ways to track whether the Lotus daemon is correctly syncing the chain and how far it has yet to go to complete the syncing.

#### Sync status

Use `sync status` to output the current state of your local chain:

````sh
lotus sync status

> sync status:
> worker 0:
>         Base:   [bafy2bzacecnamqgqmifpluoeldx7zzglxcljo6oja4vrmtj7432rphldpdmm2]
>         Target: [bafy2bzaceb4b3ionbbxz4uqoehzkjlt4ayta7bneh2bh5xatnwypeuqypebmw bafy2bzaceb2uct4pawanule5bt2ivepcgqls6e6f52lccofvdyfynyfnsa3aa bafy2bzacealylayv2mpgx7wkf54diu6vqmw5yubdgkauii7q2fb7hvwk4343i] (414300)
>         Height diff:    414300
>         Stage: header sync
>         Height: 414300
>         Elapsed: 765.267091ms

#### Sync wait

Use `sync wait` to constantly output the state of your current chain as an ongoing process:

```bash
lotus sync wait

> Worker: 0; Base: 0; Target: 414300 (diff: 414300)
> State: header sync; Current Epoch: 410769; Todo: 3531
> Validated 0 messages (0 per second)
> ...
````

Use `chain getblock` to check when the last synced block was mined:

```bash
date -d @$(./lotus chain getblock $(./lotus chain head) | jq .Timestamp)

> Mon 24 Aug 2020 06:00:00 PM EDT
```

## Creating a snapshot

A full chain CAR-snapshot can be created `chain export`:

```bash
lotus chain export <filename>
```

To back up a certain number of the most recent state roots, use the `--recent-stateroots` option, along with how many state roots you could like to backup:

```bash
lotus chain export --recent-stateroots=2000 <filename>
```

To create a _pruned_ snapshot and only include blocks directly referenced by the exported state roots, add the `skip-old-msgs` option:

```bash
lotus chain export --recent-stateroots=2000 --skip-old-msgs <filename>
```

## Restoring a custom snapshot

You can restore snapshots by starting the daemon with the `--import-snapshot` option:

```bash
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

It is possible to _prune_ the current chain data used by Lotus to reduce the node's disk footprint by resyncing from a minimal snapshot.

1. Stop the Lotus daemon:

```bash
lotus daemon stop
```

1. Remove the contents of the `datastore/chain/` folder in the Lotus path:

```bash
rm -rf ~/.lotus/datastore/chain/*
```

1. Start the daemon using a [lightweight snapshot](#lightweight-snapshot):

```bash
lotus daemon --import-snapshot https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car
```
