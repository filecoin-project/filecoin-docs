---
title: "Backup / DR"
description: ""
lead: "A backup strategy is only as good as the last successful restore."
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "backup-4aa043edbcfcc235ab3cb13503f2603d"
weight: 143
toc: true
---

{{<beta-warning>}}
It is crucial to have a backup of any production system. It is even more crucial to be able to restore from a backup. These concepts are very applicable to a Filecoin Storage Provider because not only are you storing customer data for which you have (on-chain) contracts, you also pledged a large amount of collateral for that data. If you are unable to restore your Lotus miner and start proving your storage on-chain, you will be losing a lot of money. If you are unable to come back online in 6 weeks, you are losing **all** of your collateral, which will most likely lead to bankruptcy. As such it matters less what kind of backup you have, as long as you are able to restore from it fast.

A first level of protection comes from ZFS (if you are using ZFS as the filesystem for your storage). Having ZFS snapshots available protects you against human error that caused data loss, and potentially even against ransomware.

A second level of defense comes from a dedicated backup system. Not only should you have backup storage (on a different storage array than the original data), you also need to have a backup server that can at a minimum run Lotus daemon, Lotus miner and 1 WindowPoST worker (note: this requires a GPU). With that you can sync the chain, offer retrievals and prove your storage on-chain.

To be completely safe you should host your backup system (server + storage) in a different datacenter than your primary system.