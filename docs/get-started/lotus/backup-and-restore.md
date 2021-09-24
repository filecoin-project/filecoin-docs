---
title: Backup and restore
description: "You can backup your Lotus node. You can then restore this backup if something goes wrong, or you simply wish to move your Lotus node from one computer to another."
---

:::warning
This backup process is different to that of the [`lotus-miner` backup](../../mine/lotus/backup-and-restore.md). This backup process does not retain any mining information.
:::

## Backup

1. Stop your `lotus` daemon if it is already running.
1. Run `lotus daemon backup`:
    
    ```shell
    lotus backup --offline ~/lotus-backup.cbor
    ```

## Restore

1. Stop your `lotus` daemon if it is already running.
1. Run `lotus restore`:

    ```shell
    lotus restore --offline ~/lotus-backup.cbor
    ```


