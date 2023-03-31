---
title: "Sealing rate"
description: ""
lead: "The Sealing Pipeline section explained the various tasks involved in the sealing pipeline in the context of Storage Provider requirements. The rate at which storage providers complete this process is measured in TiB/day or PiB/day, and is referred to as _Sealing Rate_, or _Sealing Capacity_. This page describes considerations and advice for storage providers in regards to sealing rate."
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-architecture"
    identifier: "sealing-rate-7a3ff70165fcdc96149903585e0b327c"
weight: 130
toc: true
---

For more information on the steps involved in sealing sectors, see the [Sealing Pipeline]({{<relref "sealing-pipeline">}}).

## Cost 
When setting up their business, Storage Providers must determine how fast they should seal, and thus how much sealing hardware they should buy. In other words, cost is an important factor in determining a stroage providers sealing rate. For example, suppose you have an initial storage capacity of 100TiB, which would account for 1PiB QAP if all the sectors contain Fil+ verified deals. If your sealing capacity is 2.5TiB/day, you would seal your full 100TiB in 40 days. Is it worth investing in double the sealing capacity to fill your storage in just 20 days? It might be if you are planning to grow way beyond 100TiB, to 1PiB raw and beyond. This is an example of the sort of cost considerations storage providers must factor in tuning sealing rate.

## Customer expectations
A common reason that a storage provider may want or need a faster sealing rate is customer expectations. When you take on a customer deal, there are often requirements to seal a dataset of a certain size within a certain time window. If you are a new storage provider with 2.5TiB/day in sealing capacity, you cannot take on a deal of 2PiB that needs to be on-chain in 1 month; at the very least, you could not take deal using your own sealing infrastructure. Instead, you can use [Sealing-as-a-service]({{<relref "sealing-as-a-service">}}), which can help you scale your sealing capabilities.

## Balancing the sealing pipeline
### Bottlenecks
When building your infrastructure there will always be a bottleneck. The art of balancing a sealing pipeline well means having the bottleneck where you expect it to be. Ideally you should design your systems so that PC1 is your bottleneck. That means all your other components are matched to the capacity you have to perform PC1. With PC1 being the most resource intensive task in the pipeline it makes most sense to architect a solution around this bottleneck. Knowing exactly how much sealing capacity you can get from your PC1 server(s) is vital so you can match the rest of your infrastructure to this throughput.

> Assuming you obtain maximum hardware utilization from your PC1 server of 15 sectors in parallel. That would mean:

> 15 sectors x 32GiB / 3 hours PC1 runtime x 24 hours / 1024 = 3.75TiB /day

<!--
### Parallel sectors
A way of increasing your sealing capacity on the hardware you have is by adding additional workers to the same system. You can run multiple instances of PC1 on a single server, or multiple instances of PC2. It just takes another `lotus-worker`process to run on the server with the correct tasks assigned.

Do keep the limits of your systems in mind when doing so. Every PC1 worker takes 64GiB of memory (GiB, not GB!) so a system with 1TiB of memory will theoretically go to 16 parallel PC1-workers. In practice you will likely cap this at 15 because of the difference in GiB and GB, and because of the memory required for the operating system.
Other limiting factors are the CPU cores and the available sealing scratch space.

-->
### Grouping similar tasks
The process `lotus-worker` can run all the various tasks of the sealing pipeline. It comes down to configuration to say which tasks a given worker should do. Because some tasks are similar in behavior and others are insignificant in resource consumption, it makes sense to group some tasks together on the same worker.

A common grouping is AP + PC1 on a worker. The AddPiece essentially prepares the data for the PC1 task.
If you have dedicated hardware for PC2, your sealing scratch content will move to that other server. If you are grouping PC1 and PC2 on the same server, you don't have the sealing scratch copied but you will need a larger NVMe volume because the sectors will sit there longer. Eventually you would run out of sealing scratch space and not be able to start sealing additional sectors.

The fact that PC1 is CPU-bound and PC2 is GPU-bound is another good reason to separate those tasks out on their dedicated hardware, if you are planning for a certain scale. Because C2 is again GPU-bound is makes sense to have PC2, C1 and C2 colocated on the same worker.
PC 2 + C1 + C2

<!-- the below might need some further research & rewording -->
Another rule of thumb is to have 2 PC2 workers per PC1 worker in your setup. After PC2 there is a WaitSeed phase which locks the scratch space for a sector until we continue through to C1 and C2. In order to be able to keep on sealing sectors in PC1, you need enough capacity on PC2.
<!--  -->

### Scaling out
Scaling the Storage Provider setup would mean adding additional storage and expanding the sealing capacity. In essence your sealing capacity scales linearly with the hardware you add to it. If your current setup allows for a sealing rate of 3 TiB/day, doubling the workers could bring you to 6 TiB/day. This requires all components of your infrastructure to be able to handle this additional throught. Take a closer look at your network and storage throughput for this.

The introduction of a completely new concept, [Sealing-as-a-Service]({{<relref "sealing-as-a-service">}}), changes a lot of the requirements for Storage Providers.

