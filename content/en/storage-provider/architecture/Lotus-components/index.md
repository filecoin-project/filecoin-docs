---
title: "Lotus components"
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
    identifier: "Lotus-components-eaf8e84a4d869e8377258acc4e25f684"
weight: 110
toc: true
---

Lotus is the software reference implementation written by [Protocol Labs](https://protocol.ai) to interact with the Filecoin blockchain. At the very minimum, you need the Lotus client to interact with it, but in this section we will cover the other components that are required to set up a Storage Provider.

Although you can find detailed information on how to install and configure Lotus on the [Lotus documentation](https://lotus.filecoin.io), we will cover the main components of Lotus in this section. A good understanding of these components is necessary to understand the subsequent sections on sealing and to understand what it means to build a well-balanced Storage Provider architecture.

The following picture shows the major components of Lotus:

[![Lotus software components](lotus-components.png)](lotus-components.png)

There are 3 large blocks to understand:
- Lotus daemon
- Lotus miner
- Lotus worker(s)

## Lotus daemon
The Lotus daemon is the component that syncs the chain, includes the client and holds the wallets of the Storage Provider. This machine running the Lotus daemon requires continuously available public internet reachability for the Storage Provider to function. You can review connectivity requirements on the connectivity page within the [lotus documents](https://lotus.filecoin.io/storage-providers/setup/initialize/#connectivity-to-the-storage-provider). 

### Chain
Syncing the chain is a key activity of the daemon. It stays in sync with the other nodes on the blockchain network by syncing messages. Messages are collected into [blocks](https://docs.filecoin.io/reference/general/glossary/#block). Blocks are collected into [tipsets](https://docs.filecoin.io/reference/general/glossary/#tipset). The Lotus daemon you run receives all the messages on-chain. Because of the growth in size of the chain since its genesis, it is not advised for Storage Providers to sync the entire history. Lightweight snapshots are available for import so that you only import the most recent messages. However, you would need to sync the entire chain if you were to run a Blockchain Explorer like [Filfox](https://filfox.info), for instance.

The storage volume on which you keep the synced chain data should be fast storage, at least SSD and preferably NVMe. Slow syncing of the chain can lead to all kinds of unwanted effects in your Storage Provider setup. For instance, it can lead to delays in critical messages to be sent on-chain from your Lotus miner, resulting in faulting of sectors. Faulty sectors will result in slashing over time, which has a direct financial impact on the storage provider. Further information on on slashing can be found in the [lotus economics page](https://lotus.filecoin.io/storage-providers/get-started/economics/#storage-fault-slashing). 

Another important consideration is the filesystem size and available free space. The Filecoin chain grows every day<!--TODO STEF by how much, currently, and how big is it?-->, which will eventually fill up any available space. Solutions like [SplitStore](https://lotus.filecoin.io/lotus/configure/splitstore/) and [compacting](https://lotus.filecoin.io/lotus/manage/chain-management/) reduce the storage space used by the chain <!--TODO STEF by what %-->.

### Wallets
Another key role of the Lotus Daemon is to host the Filecoin wallets that are required to run a Storage Provider setup. As a Storage Provider you will need a minimum of 2 wallets. One is the "owner" wallet, the other is the "worker" wallet. A 3rd type of wallet, the "control" wallets will be required to scale your operations in a production environment.

It is important to note that careful security measures are required to keep your Lotus wallets safe. This includes physical access, network access, software security and making backups (that are also secured). As with any crypto wallet, access to the private key means access to your funds. Lotus supports [Ledger hardware wallets](https://lotus.filecoin.io/lotus/manage/ledger/), which is recommended for the owner wallet (and potentially for the terminate wallet). You cannot keep the worker or control  wallets on a hardware device because Lotus requires frequent access to those types of wallets. For instance, Lotus requires access to a worker or control wallet (depending on your setup) to send WindowsPoST proofs on-chain.

In essence, Lotus will create a **multisig wallet** if you choose to integrate your Ledger device. One signer of the multisig would be Lotus, the other signer would be your Ledger device. For more information and a demonstration of this, see the following video:
{{< youtube "u_S5F6WyBAU" >}}

Type the following command to see your wallets and corresponding funds on them:

    lotus wallet list

It is good practice to use a 3rd type of wallets though: control wallets.
Five different control wallets can be created:
- PoST wallet
- PreCommit wallet
- Commit wallet
- Publish Storage Deals wallet
- Terminate wallet

PoST is by far the most important wallet to split off from the main "worker" wallet for reasons explained in the below Storage Proving paragraph.


## Lotus miner
Lotus miner is the process that coordinates most of the Storage Provider (storage miner) activities. Its main responsibilities can be split up into 3:
- Storing the data
- Scheduling jobs
- Proving the stored data


### Storing sectors and data
As a Storage Provider on the Filecoin network you store sectors. They either contain data or not, but either way you are storing "sealed sectors" for the capacity you provide to the network. If you are storing data deals you will also need to store "unsealed sectors" because retrievals happen from unsealed sectors.

Originally, the Lotus miner was the component with storage access. This means the miner hardware either has internal disks, direct-attached storage shelves (e.g. [JBODs](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures#JBOD)), Network-Attached-Storage (NAS), or a storage cluster.

More recently, Lotus has added a more scalable storage access solution in which workers can also be assigned storage access. This removes the bottleneck from the Lotus miner. Low-latency storage access is critical because of the impact on Storage Proving processes.

Run the following command to check the storage configuration for your Lotus miner instance:

    lotus-miner storage list

This will return your _sealed space_ and your _scratch space_ (cache) if you have properly configured your miner by following the steps in the [Lotus documentation](https://lotus.filecoin.io/storage-providers/operate/custom-storage-layout/).

It is extremely important to keep a backup of your sealed sectors, and ideally also of the unsealed sectors. Additionally also backup the *sectorstore.json* file that lives under your storage path. This file is also required to be restored in the event of a failure.You can read more about the sectorstore.json file in the [lotus docs](https://lotus.filecoin.io/storage-providers/seal-workers/seal-workers/#sector-storage-groups).
### Scheduling
Another key responsibility of the Lotus Miner is scheduling of tasks. Tasks to be scheduled include those of the [sealing pipeline]({{<relref "sealing-pipeline" >}}) and of the Storage Proving (see below).

To see the jobs being scheduled, run:

    lotus-miner sealing jobs

And to see the workers on which the miner can schedule jobs:

    lotus-miner sealing workers


### Storage proving
One of the most important roled of the Lotus miner is the [Storage proving]({{<relref "storage-proving" >}}). Both [WindowPoSt](https://docs.filecoin.io/reference/general/glossary/#window-proof-of-spacetime-windowpost) and [WinningPoSt](https://docs.filecoin.io/reference/general/glossary/#winning-proof-of-spacetime-winningpost) processes are usually handled by the Lotus miner. For scalability and reliability purposes it is now also possible to run these proving processes on dedicated servers (workers) instead of using the Lotus miner. 

The proving processes require low-latency access to the sealed sectors. The proving challenge requires a GPU to run on. The resulting zkProof will be sent to the chain in a message. There are strict deadlines for those messages to arrive on-chain (30 minutes for WindowPoSt and just 30 seconds for WinningPoSt). It is therefore important to properly size and configure the proving workers (be it on the Lotus miner <!--TODO STEF this whole section mixes names for software processes and hardware instances a lot - suggest reviewing the whole thing to disambiguate-->or separate) and to make sure there are dedicated wallets set up for these processes. If they use the general worker wallet there is the risk of message congestion, resulting in delayed message delivery on-chain and potential sector faulting, slashing, or lost block rewards.

Always check if there are upcoming proving deadlines before halting any services for maintenance. Foe a detailed process, please refer to the [lotus maintentience](https://lotus.filecoin.io/storage-providers/operate/maintenance/) documents. 

    lotus-miner proving deadlines

## Lotus worker(s)
The Lotus worker is the 3rd important software component in the Lotus architecture. There can be - and most likely will be - multiple workers in a single Storage Provider setup. Assigning designated roles to each worker in the setup allows for scaling the setup for higher throughput (see [Sealing Rate]({{<relref "sealing-rate">}}) and redundancy.

As mentioned above, the proving tasks can be assigned to designated workers and worker can also get storage access.
The remaining worker tasks are running [Sealing Pipeline]({{<relref "sealing-pipeline">}}) which is discussed in the next section.