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
There are reasons why you would want or need to seal faster. One of those reasons is customer expectations. When you take on a customer deal, often times there are requirements about sealing the dataset of a certain size within a certain time window. If you are a starting Storage Provider with 2.5TiB/day in sealing capacity you cannot take on a deal of 2PiB that needs to be on-chain in 1 month. At least, you could not do it with your own sealing infrastructure. [Sealing-as-a-Service]({{<relref "sealing-as-a-service">}}) could help you over this barrier.

## Balancing the sealing pipeline
### Bottlenecks
When building your infrastructure there will always be a bottleneck. It is the art of balancing a sealing pipeline well to have the bottleneck where you expect it to be. Ideally you should design your systems so that PC1 is your bottleneck. That means all your other components are matched to the capacity you have to perform PC1. With PC1 being the most resource intensive task in the pipeline it makes most sense to architect a solution around this bottleneck. Knowing exactly how much sealing capacity you can get from your PC1 server(s) is vital to match the rest of your infrastructure to this throughput.

> Assuming you obtain maximum hardware utilization from your PC1 server of 15 sectors in parallel. That would mean:

> 15 sectors x 32GiB / 5 hours PC1 runtime x 24 hours = 2.25TiB /day

### Parallel sectors
A first way of increasing your sealing capacity on the hardware you have is by adding additional workers. You can run multiple instances of PC1 on a single server, or multiple instances of PC2. It just takes another `lotus-worker`process to run on the server with the correct tasks assigned.

Do keep the limits of your systems in mind when doing so. Every PC1 worker takes 64GiB of memory (GiB, not GB!) so a system with 1TiB of memory will theoretically go to 16 parallel PC1-workers. In practice you will likely cap this at 15 because of the difference in GiB and GB, and because of the memory required for the operating system.
Other limiting factors are the CPU and the available sealing scratch space.

### Grouping similar tasks
AP + PC1
PC 2 + C1 + C2

Another rule of thumb is to have 2 PC2 workers per PC1 worker in your setup.
<!-- Check with Angelo why, if PC1 is at 2.25TiB/day then following that formula, 1 PC2 would be:
15 sectors x 32GiB / 0.3 hours PC2 runtime x 24 hours = 37.5 TiB/day
-->

### Scaling out
Scaling the Storage Provider setup would mean adding additional storage and expanding the sealing capacity.

---

The introduction of a completely new concept, [Sealing-as-a-Service]({{<relref "sealing-as-a-service">}}), changes a lot of the requirements for Storage Providers.

