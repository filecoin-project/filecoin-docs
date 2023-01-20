---
title: "Backup and restore"
description: "How to backup and restore Filecoin Boost"
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "backup-and-restore-91547be36206b6e14d2c40c829266cc5"
weight: 80
toc: true
---

## Backup

1. Shutdown `boostd` before taking a backup
2. Take a backup using the command line

```
boostd backup <backup directory>
```

Boost backup does not include dagstore and user can copy dagstore directory to a backup location manually. Dagstore can be re-initialized if there is no backup.


## Restore

1. Make sure to use the `--boost-repo` command line flag if you wish to restore to a custom location. Otherwise, it will be restored to `~/.boost` directory, by default.
2. Restore the boost repo using the command line.

```
boostd restore <backup directory>
```


Once restore is complete, dagstore can be manually copied inside the boost repo to restore it.

