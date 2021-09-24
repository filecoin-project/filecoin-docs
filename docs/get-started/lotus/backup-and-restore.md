---
title: Backup and restore
description: "You can backup your Lotus node. You can then restore this backup if something goes wrong, or you simply wish to move your Lotus node from one computer to another."
---

# Backup and restore

You can backup your Lotus node. You can then restore this backup if something goes wrong, or you simply wish to move your Lotus node from one computer to another.

This backup process is different to that of the [`lotus-miner` backup](../../mine/lotus/backup-and-restore.md). This backup process does not retain any mining information.

## Backup

1. Stop your `lotus` daemon if it is already running.
1. Run `lotus daemon backup`:
    
    ```shell
    lotus backup --offline ~/lotus-backup.cbor
    ```

    ```shell output
    2021-09-24T20:21:03.986Z        INFO    backupds        backupds/datastore.go:75Starting datastore backup
    2021-09-24T20:21:03.987Z        INFO    backupds        backupds/datastore.go:130
    Datastore backup done
    ```

1. Your Lotus daemon data is now backed up into `lotus-backup.cbor`.

## Restore

1. Stop your `lotus` daemon if it is already running.
1. Run `lotus daemon` while using the `--restore` option:

    ```shell
    lotus daemon 2>&1 --restore=offline-backup.cbor
    ```

    ```shell output
    2021-09-24T20:24:51.729Z        INFO    main    lotus/daemon.go:218     lotus repo: /root/.lotus                                                                                              
    2021-09-24T20:24:51.730Z        INFO    paramfetch      go-paramfetch@v0.0.2/paramfetch.go:191  Parameter file /var/tmp/filecoin-proof-parameters/v28-proof-of-spacetime-fallback-merkletree-poseidon_hasher-8-0-0-7d739b8cf60f1b0709eeebee7730e297683552e4b69cab6984ec0285663c5781.vk is ok
    ...
    2021-09-24T20:24:52.296Z        INFO    badger  v2@v2.2007.2/value.go:1178      Replay took: 2.975µs
    2021-09-24T20:24:52.297Z        INFO    backupds        backupds/log.go:125     opening log     {"file": "/root/.lotus/kvlog/metadata/1632514590.log.cbor"}
    ```

1. The `lotus daemon` should continue to run from the block height at which your backup was taken.

