---
title: 'Lotus: chain snapshots'
description: 'This guide explains how to export and import Lotus chain snapshots.'
breadcrumb: 'Chain snapshots'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} Snapshots are backups of your local Lotus environment. This backup includes your wallet information, transaction data, and any chain data you have collected. We _highly_ recommend creating a snapshot before switching networks. If anything breaks during the switch, you can restore your snapshot and be back up and running quickly. Snapshots are also useful when setting up a new Lotus node. Creating a node from a snapshot can drastically reduce the sync time of that node.

## Create a snapshot

The `chain export` command will export your chain data into `.car` file:

```sh
lotus chain export <filename>
```

## Create a simplified snapshot

You can also create a faster, simpified snapshot using the `lotus-shed` tool. The `--skip-old-msgs` flag will skip messages from before the included stateroots, making the snapshots significantly faster to generate and smaller in filesize. Note: your node must be offline to run this command. Additionally, the simplified snapshot is not suitable for nodes that need to serve more complex chain queries, such as block explorers.

```sh
./lotus-shed export --skip-old-msgs --recent-stateroots=900 <filename>
```

## Restore a snapshot

To import chain data from a `.car` snapshot file, run:

```sh
lotus daemon --import-snapshot <filename>
```

If you do not want the daemon to resume once the snapshot has finished, add the `--halt-after-import` flag to the command:

```bash
lotus daemon --import-snapshot --halt-after-import
```

## Testnet chain snapshots

Snapshots for the Lotus testnet created every 6 hours are available for download [here](https://very-temporary-spacerace-chain-snapshot.s3.amazonaws.com/Spacerace_pruned_stateroots_snapshot_latest.car).


