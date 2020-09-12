---
title: 'Lotus: chain snapshots'
description: 'This guide explains how to export and import Lotus chain snapshots.'
breadcrumb: 'Chain snapshots'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} Snapshots are backups of your local Lotus environment. This backup includes your wallet information, transaction data, and any chain data you have collected so far. We _highly_ recommend creating a snapshot before switching networks. If anything breaks during the switch, you can restore your snapshot and be back up and running quickly. Snapshots can also be used to set up a new Lotus node. Creating a node from a snapshot can drastically reduce the sync time of that node.

## Create a snapshot

The `chain export` command will export your chain data into ` .car` file:

```sh
lotus chain export <file>
```

## Restore a snapshot

To import chain data from a `.car` snapshot file, run:

```sh
lotus daemon --import-snapshot
```

If you do not want the daemon to resume once the snapshot has been restored, add the `--halt-alter-import` flag to the command:

```bash
lotus daemon --import-snapshot --halt-after-import
```
