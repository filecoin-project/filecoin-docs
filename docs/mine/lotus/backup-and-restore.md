---
title: 'Lotus Miner: Backup and restore'
description: "It's imperative that you frequently backup your Lotus Miner. This page walks you through how to backup your Lotus Miner, and also how to restore your backup."
breadcrumb: 'Backup and restore'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Backup

This process backs-up metadata of the Lotus miner, which is needed to restore the operation. This backup does not include sector data.

1. Create a directory for this backup:

   ```shell
   mkdir -p ~/lotus-backups/2020-11-15
   ```

1. Call `backup` to backup your miner and supply the destination for the `backup.cbor` file:

   ```shell with-output
   lotus-miner backup /root/lotus-backups/2020-11-15/backup.cbor
   ```
   ```
   Success
   ```

   Add the `--offline` backup if your miner is not currently running:

   ```shell with-output
   lotus-miner backup --offline /root/lotus-backups/2020-11-15/backup.cbor
   ```
   ```
   Success
   ```

1. Backup your `config.toml` and `storage.json` files:

   ```shell
   cp ~/.lotusminer/config.toml ~/.lotusminer/storage.json /root/lotus-backups/2020-11-15
   ```

The backup is now complete. Always follow the 3-2-1 rule when storing backups:

> Keep at least three (3) copies of your data, and store two (2) backup copies on different storage media, with one (1) of them located offsite. - [Nakivo, 2017](https://www.nakivo.com/blog/3-2-1-backup-rule-efficient-data-protection-strategy/)

## Restore

1. Copy your `backup.cbor`, `config.toml`, and `storage.json` files to the miner if it is on another computer.
1. Call `restore` to restore your miner from a backup file:

   ```shell with-output
   lotus-miner init restore /root/lotus-backups/2020-11-15/backup.cbor
   ```
   ```
   ...
   2020-11-15T17:53:41.630Z        INFO    main    lotus-storage-miner/init_restore.go:254 Initializing libp2p identity
   2020-11-15T17:53:41.631Z        INFO    main    lotus-storage-miner/init_restore.go:266 Configuring miner actor
   2020-11-15T17:53:41.643Z        INFO    main    lotus-storage-miner/init.go:592 Waiting for message: bafy2bzacea3a7kqp3du5lwhm6xlaawxbz3ae7luefmhlcewljclauit7yexuq
   ```

1. Copy `config.toml` and `storage.json` into `~/.lotusminer`:

   ```shell
   cp lotus-backups/2020-11-15/config.toml lotus-backups/2020-11-15/storage.json .lotusminer
   ```

1. Start your miner:

   ```shell
   lotus-miner run
   ```

The restore is now complete.
