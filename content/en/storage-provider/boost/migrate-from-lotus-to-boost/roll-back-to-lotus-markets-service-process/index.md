---
title: "Roll back to Lotus markets service process"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "roll-back-to-lotus-markets-service-process-a32903b5bed6882cef3e99a7a625c856"
weight: 30
toc: true
---

<!-- STEF this page probably needs to go away or be updated to explain that Lotus Markets is being deprecated-->
{{< alert  >}}
Before you begin migration from Lotus markets service process to Boost, make sure you have a backup of your Lotus repository, by following the [Lotus documentation](https://lotus.filecoin.io/storage-providers/operate/backup-and-restore/)

You can also do a full backup of the Lotus markets repository directory.
{{< /alert  >}}

1. If you haven't made any legacy deals with Boost:
   1. Stop `boostd`
   2. Run your `lotus-miner` `markets` service process as you previously did.

2. If you have made new legacy deals with Boost, and want to migrate them back:
   1. Stop `boostd`
   2. Copy the `dagstore` directory from the Boost repository to the Lotus Markets repository.
   3. Export Boost deals datastore keys/values:
      `lotus-shed market export-datastore --repo <repo> --backup-dir <backup-dir>`
      
      `Wrote backup file to <backup-dir>/markets.datastore.backup`

   4. Import the exported deals datastore keys/values from Boost to Lotus Markets

      `lotus-shed market import-datastore --repo <repo> --backup-path <backup-path>`
   
      `Completed importing from backup file <backup-path>`
