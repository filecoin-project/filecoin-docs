---
title: "Snap deals"
description: "Snap Deals are a way to convert Committed Capacity sectors (that store no real data) into data sectors to be used for storing actual data."
lead: ""
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-filecoin-deals"
    identifier: "snap-deals-434704aca7c26b7a1bf09d0a92f4c1ff"
weight: 340
toc: true
---

Snap Deals are a way to convert Committed Capacity sectors (that store no real data) into data sectors to be used for storing actual data and potentially FIL+ data. Instead of destroying a previously sealed sector and recreating a new sector that needs to be sealed, Snap Deals allow data to be ingested into CC-sectors without the requirement of re-sealing the sector.

## Why would you do snap deals?

There are two main reasons why a storage provider could be doing Snap Deals, also known as _“snapping up their sectors”_ in the Filecoin community:

- The first reason is that the 10x storage power on the same volume of data stored is a strong incentive to upgrade to verified deals for those storage providers who started out on CC-sectors and wish to upgrade to verified deals with Filecoin Plus.
- The second reason applies to storage providers who decide to start sealing CC-sectors, but later then fill them with verified deals. When you start as a storage provider or when you expand your storage capacity, it might be a good idea to fill your capacity with CC-sectors in the absence of verified deals. Not only do you start earning block rewards over that capacity, but more importantly, you can plan the sealing throughput, and balance your load over the available hardware. If your [sealing rate]({{<relref "sealing-rate" >}}) is 3 TiB/day, it makes no sense to feed 5 TiB/day into the pipeline. This creates congestion and possibly negative performance. If you are sealing 3 TiB/day for 33 days in a row, you end up with 99 TiB of sealed sectors that were sealed evenly and consistently. If you then take on a 99 TiB verified deal (accounting for 1 PiB QAP), the only thing required is to snap up the sectors.

Snapping up sectors with snap deals puts a lot less stress on the storage provider’s infrastructure. The only task that is executed from the [sealing pipeline]({{<relref "sealing-pipeline" >}}) is the replica-update and prove-replica-update phase, which is similar to the PC2 process. The CPU-intensive PreCommit 1 phase is not required in this process.

Do not forget to provide the collateral funds when snapping up a verified deal. The same volume requires more collateral when it counts as FIL+ data, namely 10x the collateral compared to raw storage power.

{{< sp-calls-to-action >}}
