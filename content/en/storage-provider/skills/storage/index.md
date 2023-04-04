---
title: "Storage"
description: "Storage skills might seem the most obvious skill requirement to run a storage provider. Filecoin requires an end-to-end skillset for running a 24/7 application."
lead: ""
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-skills"
    identifier: "storage-7a9fdaa672cf6167e7e2990566ec2dbb"
weight: 640
toc: true
---

Storage is a critical component of running a successful storage provider in the Filecoin network. While it may seem obvious that having strong storage skills is important, Filecoin requires a unique end-to-end skill set to run a 24/7 application.

[Storage proving]({{< relref "storage-proving">}}) requires atypical read-behavior from a storage system. This means that the storage administrator must be able to design for this behavior and analyze the storage system accordingly.

In addition, it is important for storage providers to understand the importance of reliable and efficient storage. Filecoin is designed to incentivize storage providers to keep data safe and secure, and as such, the storage system must be able to maintain high levels of reliability and availability.

Storage providers need to be able to implement and maintain storage infrastructure that meets the needs of clients who require large amounts of storage space. This requires knowledge of various storage technologies, as well as the ability to troubleshoot issues that may arise.

Overall, storage is a critical aspect of the Filecoin network and storage providers must have the necessary skills and knowledge to provide high-quality storage services to clients.

## ZFS

Zettabyte File System (ZFS) is a combined file system and logical volume manager that provides advanced features such as pooled storage, data integrity verification and automatic repair, and data compression. It is a popular choice among storage providers due to its reliability, scalability, and performance.

Configuring ZFS requires knowledge and skills that go beyond the basics of traditional file systems. As a storage provider you need to understand how ZFS manages data, including how it distributes data across disks and how it handles data redundancy and data protection. You must also know how to configure ZFS for optimal performance and how to troubleshoot issues that may arise with ZFS.

In addition to configuring ZFS, storage providers must also be able to manage the disks and other hardware used for storage. This includes selecting and purchasing appropriate hardware, installing and configuring disks and disk controllers, and monitoring disk health and performance.

Having the knowledge and skills to configure ZFS is crucial as a storage providers, as it enables you to provide reliable and high-performance storage services to your clients. Without this expertise, you may struggle to deliver the level of service that your clients expect, which could lead to decreased customer satisfaction and loss of business.

### RAIDZ2

ZFS is a combined file system and volume manager, designed to work efficiently on large-scale storage systems. One of the unique features of ZFS is its built-in support for various types of RAID configurations, which makes it an ideal choice for data storage in a Filecoin network.

As a storage provider, it is crucial to have knowledge and skills in configuring ZFS. This includes understanding how to create virtual devices (VDEVs), which are the building blocks of ZFS storage pools. A VDEV can be thought of as a group of physical devices, such as hard disks, solid-state drives, or even virtual disks, that are used to store data.

In addition, storage providers must also understand how wide VDEVs should ideally be, and how to create storage pools with a specific RAID protection level. RAID is a method of protecting data by distributing it across multiple disks in a way that allows for redundancy and fault tolerance. ZFS has its own types of RAID, known as RAID-Z, which come in different levels of protection.

For example, `RAIDZ2` is a configuration that provides double parity, meaning that two disks can fail simultaneously without data loss. As a storage provider, it is important to understand how to create storage pools with the appropriate level of RAID protection to ensure data durability.

Finally, creating datasets is another important aspect of ZFS configuration. Datasets are logical partitions within a ZFS storage pool that can have their own settings and attributes, such as compression, encryption, and quota. As a storage provider, it is necessary to understand how to create datasets to effectively manage storage and optimize performance.

### Snapshots and replication

ZFS provides built-in protection for data in the form of snapshots. Snapshots are read-only copies of a ZFS file system at a particular point in time. By taking regular snapshots, you can protect your data against accidental deletions, file corruption, or other disasters.

To ensure that your data is fully protected, it is important to configure a snapshot rotation schema. This means defining a schedule for taking snapshots and retaining them for a specified period of time. For example, you might take hourly snapshots and retain them for 24 hours, and then take daily snapshots and retain them for a week.

In addition to snapshots, ZFS also allows you to replicate them to another system running ZFS. This can be useful for creating backups or for replicating data to a remote site for disaster recovery purposes. ZFS replication works by sending incremental changes to the destination system, which ensures that only the changes are sent over the network, rather than the entire dataset. This can significantly reduce the amount of data that needs to be transferred and can help minimize network bandwidth usage.

## Performance analysis

As a storage provider, it is crucial to be able to troubleshoot and resolve any performance issues that may arise. This requires a deep understanding of the underlying storage system and the ability to use Linux performance analytic tools such as `iostat`. These tools can help identify potential bottlenecks in the storage system, such as high disk utilization or slow response times.

In addition to troubleshooting, you must also be able to optimize the performance of your storage system. One way to improve performance is by implementing an NVMe write-cache. NVMe is a protocol designed specifically for solid-state drives, which can greatly improve the speed of write operations. By adding an NVMe write-cache to the storage system, you can reduce the latency of write operations and improve overall system performance.

Read-cache on the other hand is typically not useful in the context of Filecoin. This is because sealed sectors are read very randomly, and unsealed sectors will typically not be read twice. Therefore, storing data in a read-cache would be redundant and add unnecessary overhead to the system.
