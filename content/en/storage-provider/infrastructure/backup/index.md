---
title: "Backup / DR"
description: "It is crucial to have a backup of any production system. It is even more crucial to be able to restore from a backup."
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

It is crucial to have a backup of any production system. It is even more crucial to be able to restore from a backup. These concepts are very applicable to a Filecoin Storage Provider because not only are you storing customer data for which you have (on-chain) contracts, you also pledged a large amount of collateral for that data. 

If you are unable to restore your Lotus miner and start proving your storage on-chain, you will be losing a lot of money. If you are unable to come back online in 6 weeks, you are losing **all** of your collateral, which will most likely lead to bankruptcy. 

As such it matters less what kind of backup you have, as long as you are able to restore from it fast.

## HA versus DR
It is a common misconception to assume you are covered against any type of failure by implementing a highly available (HA) setup. HA will protect against unplanned unavailability in many cases, such as a system failure. It will **not** protect you against data corruption, data loss, ransomware, or a complete disaster at the datacenter level.

Backups and (tested) restores are the basis for a DR (disaster recovery) plan and should be a major point of attention for any Filecoin Storage Provider, regardless of your size of operation.

## RTO and RPO
When planning for backup and recovery, the terms RPO and RTO are important concepts to know about.

- **Recovery Time Objective (RTO)** means the time it takes to recover a certain application or dataset in the event of a failure. Fast recovery means a shorter RTO (typically measured in hours/minutes/seconds). Enterprises plan for very short RTO's when downtime is not accepted by their business. Application and filesystem snapshots typically provide the lowest possible RTO.

- **Recovery Point Objective (RPO)** means the last known backup from where you can recover. A shorter RPO means the time between the last backup and the failure is short. Enterprises plan for very short RPO's for systems and data that changes very often (like databases). Synchronous replication of systems and data typically provides the lowest possible RPO.
### RPO/RTO for Storage Providers
Although RPO zero and RTO zero are what everyone wishes to have, it is not affordable. DR planning means compromises and if you are a Storage Provider you need to consider cost versus RPO.

RTO is typically not much of a concern for Storage Providers. The most critical parts to recover are your sealed storage and your wallets. Wallet addresses typically don't change so the only thing to worry about is your sealed storage. With storage level snapshots (ZFS snapshots for instance) you can reduce your RTO to almost zero.

With RTO out of the way, RPO is the only remaining concern. Although synchronous replication together with snapshots can bring RPO to (nearly) zero, that is not a cost-efficient solution. Asynchronous replication of sealed storage is the most viable option if you are running at small to medium scale. Once you grow beyond 10PB of storage, even replicating the data will become an expensive solution. 

In such cases you might want to look into _storage cluster_ solutions with built-in redundancy. Very large Storage Providers will operate Ceph-clusters or other solutions with built-in _erasure coding_. Although this does more become a HA-setup than a DR-setup, at scale it becomes the only economically viable option. 

Running a storage cluster comes with its own operational challenges though, which does not make this a good fit for small to medium setups.

### RPO/RTO for customers
<!-- I feel the suddent introduction of "customers" breaks the flow of this document -->
Both Storage Providers and data owners (customers) should look at RPO and RTO options. As a customer you have the advantage of having multiple copies of your data stored (and proven) across multiple Storage Providers. In the event of data loss of one such providers, at least 5 (or more) other providers have integral copies of your data from which you can retrieve.

RTO for data owners is a matter of how fast the Storage Provider(s) can provide you the data. 
- Do your Storage Providers offer "fast retrieval" of the data through unsealed copies? If not the unsealing process (of multiple hours) must be calculated into the RTO.
- Do your Storage Providers offer retrieval through Saturn (the Web3 CDN) for ultra fast retrieval?
- Do your Storage Providers pin your data on IPFS, additionally to storing it on Filecoin?

RPO for data owners is less of a concern, especially once the data is sealed. The Filecoin blockchain will enforce availability and durability of the data being stored, once it is sealed. It is therefore important, as a data owner, to know how fast your Storage Provider can prove the data on-chain.

## Backup techniques

- A first level of protection comes from ZFS (if you are using ZFS as the filesystem for your storage). Having ZFS snapshots available protects you against human error that caused data loss, and potentially even against ransomware. Other filesystems typically also have a way to make snapshots, albeit not as efficient as ZFS.

- A second level of defense comes from a dedicated backup system. Not only should you have backup storage (on a different storage array than the original data), you also need to have a backup server that can at a minimum run Lotus daemon, Lotus miner and 1 WindowPoST worker (note: this requires a GPU). With that you can sync the chain, offer retrievals and prove your storage on-chain.

- An alternative technique to having a dedicated backup system and copy is to have a storage cluster. This still requires a backup system to run the Lotus daemon, Lotus miner and PoST worker on. Implementing a storage cluster is usually only done for large-scale deployments as it comes with additional operational tasks.

To be completely safe you should host your backup system (server + storage) in a different datacenter than your primary system.