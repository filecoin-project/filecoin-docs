---
description: >-
  The rate at which storage providers complete the sealing pipeline process is
  called the sealing rate sealing capacity. This page describes considerations
  and advice in regards to sealing rate.
---

# Sealing rate

## Cost

When setting up their business, storage providers must determine how fast they should seal and, thus, how much sealing hardware they should buy. In other words, the cost is an important factor in determining a storage provider’s sealing rate. For example, suppose you have an initial storage capacity of 100 TiB, which would account for 1 PiB [QAP](../../reference/general/glossary.md#quality-adjusted-storage-power) if all the sectors contain Filecoin Plus verified deals. If your sealing capacity is 2.5 TiB per day, you will seal your full 100 TiB in 40 days. Is it worth investing in double the sealing capacity to fill your storage in just 20 days? It might be if you are planning to grow way beyond 100 TiB. This is an example of the sort of cost considerations storage providers must factor in when tuning the sealing rate.

## Customer expectations

A common reason that a storage provider may want or need a faster sealing rate is customer expectations. When you take on a customer deal, there are often requirements to seal a dataset of a certain size within a certain time window. If you are a new storage provider with 2.5 TiB per day in sealing capacity, you cannot take on a deal of 2 PiB that needs to be on-chain in 1 month; at the very least, you could not take the deal using your own sealing infrastructure. Instead, you can use a [Sealing-as-a-service provider](sealing-as-a-service.md), which can help you scale your sealing capabilities.

## Balancing the sealing pipeline

When designing their sealing pipeline, storage providers should consider bottlenecks, the grouping of similar tasks, and scaling out.

### Bottlenecks

The art of building a well-balanced sealing pipeline means having the bottlenecks where you expect them to be; any non-trivial piece of infrastructure always contains some kind of bottleneck. Ideally, you should design your systems so that the PC1 process is the bottleneck. By doing this, all other components are matched to the capacity required to perform PC1. With PC1 being the most resource-intensive task in the pipeline, it makes the most sense to architect a solution around this bottleneck. Knowing exactly how much sealing capacity you can get from your PC1 servers is vital so you can match the rest of your infrastructure to this throughput.

Assuming you obtain maximum hardware utilization from your PC1 server to seal 15 sectors in parallel, and PC1 takes 3 hours on your infrastructure, that would mean a sealing rate of 3.75 TiB per day. The calculation is described below:

```plaintext
15 sectors x 32 GiB / 3 hours PC1 runtime x 24 hours / 1024 = 3.75 TiB /day
```

### Grouping similar tasks

While a Lotus worker can run all of the various tasks in the sealing pipeline, different storage provider configurations may split tasks between workers. Because some tasks are similar in behavior and others are insignificant in terms of resource consumption, it makes sense to group like-tasks together on the same worker.

A common grouping is _AddPiece (AP)_ and PreCommit1 (PC1) because AP essentially prepares the data for the PC1 task. If you have dedicated hardware for PreCommit2 (PC2), your scratch content will move to that other server. If you are grouping PC1 and PC2 on the same server, you won’t have the sealing scratch copied, but you will need a larger NVMe volume. Eventually, you may run out of sealing scratch space and not be able to start sealing additional sectors. Consider a very large bandwidth (40Gb or even 100Gb) between the servers that copy over the sealing space.

As PC1 is CPU-bound and PC2 is GPU-bound, this is another good reason to separate those tasks into dedicated hardware, especially if you are planning to scale. Because PC2 is GPU-bound, it makes sense to have PC2, C1, and C2 collocated on the same worker.

Another rule of thumb is to have two PC2 workers for every PC1 worker in your setup. The _WaitSeed_ phase occurs after PC2, which locks the scratch space for a sector until C1 and C2. In order to keep sealing sectors in PC1, PC2 must have sufficient capacity. You can easily host multiple PC2 workers on a single server though, ideally with separate GPU's.

{% hint style="info" %}
You can run multiple lotus-workers on the same GPU by splitting out their`tmp`folders. Give the environment variable `TMPDIR=<folder>`to the lotus-worker.
{% endhint %}

### Scaling out

A storage provider’s sealing capacity scales linearly with the hardware you add to it. For example, if your current setup allows for a sealing rate of 3 TiB per day, doubling the number of workers could bring you to 6 TiB per day. This requires that all components of your infrastructure are able to handle this additional throughput. Using [Sealing-as-a-Service providers](sealing-as-a-service.md) allows you to scale your sealing capacity without adding more hardware.
