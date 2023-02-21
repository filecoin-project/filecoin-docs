---
title: "Sealing rate"
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
    identifier: "sealing-rate-7a3ff70165fcdc96149903585e0b327c"
weight: 130
toc: true
---

{{< beta-warning >}}
The previous section explained the various tasks involved in the sealing pipeline. For a Storage Provider to fill up your available capacity with sealed sectors, the rate at which you can seal is measured in TiB/day or PiB/day. This rate is referred to as the Sealing Rate, or Sealing Capacity.

## Cost vs. capacity
An important consideration to define the desired sealing capacity is cost. Starting Storage Providers ask themselves how fast they should seal, and thus how much sealing hardware they should buy. Let's assume you are starting with a storage capacity of 100TiB, which would account for 1PiB QAP if all the sectors contain Fil+ verified deals. If your sealing capacity is 2.5TiB/day, you would seal your full 100TiB in just 40 days. Is it worth investing in double the sealing capacity to fill your storage in just 20 days? It might be if you are planning to grow way beyond 100TiB, to 1PiB raw and beyond.

## Customer expectations
Sealing a dataset of a certain within a certain time window.

## Bottlenecks
There will always be a bottleneck, and ideally you should design your systems so that PC1 is your bottleneck.
## Parallel sectors
Adding additional workers.

Colocating worker processes on a server.

2 PC2 workers per PC1 worker.

## Grouping similar tasks
AP + PC1
PC 2 + C1 + C2

## Scaling out
Scaling the Storage Provider setup would mean adding additional storage and expanding the sealing capacity.

---

The introduction of a completely new concept, [Sealing-as-a-Service]({{<relref "sealing-as-a-service">}}), changes a lot of the requirements for Storage Providers.

