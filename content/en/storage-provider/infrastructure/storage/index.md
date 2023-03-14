---
title: "Storage"
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
    identifier: "storage-b9f7d2afbe8e2577b69c451bdfd4e0ad"
weight: 141
toc: true
---

On this system we store 1PiB of sealed sectors and 1PiB of unsealed sectors (for fast retrieval), however the I/O behavior on sealed sectors is very different from the I/O behavior on unsealed sectors.
When [storage-proving]({{<relref "storage-proving">}}) happens only a very small portion of the data is read by WindowPoST. A large Storage Provider will have many sectors in multiple partitions for which WindowPoST requires fast access to the disks. This is unusual I/O behavior for any storage system.

The unsealed copies are used for fast retrieval of the data towards the customer. Large datasets in chunks of 32GiB (or 64GiB depending on the configured sector size) are read. In order to avoid different tasks competing for read I/O on disk it is recommended to create separated disk pools with their own VDEVs (when using ZFS) for sealed and unsealed copies.

Write access towards the storage also requires your attention. Depending how your storage array is connected (SAS or Ethernet) you will have different transfer speeds towards the sealed storage path. At a sealing capacity of 6 TiB/day you will effectively be writing 12 TiB/day towards the storage (6 TiB sealed, 6 TiB unsealed copies). Both your storage layout and your network need to be able to handle this.

If this 12 TiB were equally spread across the 24hrs of a day, this would already require 1.14 Gbps.

> 12 TiB * 1024 / 24 hr / 3600 sec * 8 = 1.14 Gbps

The sealing pipeline produces 32 GiB sectors (64 GiB depending on your configured sector size) which are writte to the storage. If you configured _batching_ of the commit messages (to reduce total gas fees) then you will write multiple sectors towards disk at once.

A minimum network bandwidth of 10 Gbps is recommended and write cache at the storage layer will be beneficial too.
