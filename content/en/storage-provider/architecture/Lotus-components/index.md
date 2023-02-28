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

Lotus is the reference implementation software solution written by [Protocol Labs](https://protocol.ai) to interact with the Filecoin blockchain. At the very minimum you need the Lotus Client to interact with it but in this section we will cover the other components that are required to set up a Storage Provider.

Although you can find detailed information on how to install and configure Lotus on the [Lotus documentation](https://lotus.filecoin.io), we will cover the main components of Lotus in this section. A good understanding of these components is necessary to understand the subsequent sections on sealing and to understand what it means to build a well balanced Storage Provider architecture.

The following picture shows the major components of Lotus:

![Lotus software components](lotus-components.png)

There are 3 large blocks to understand:
- Lotus Daemon
- Lotus Miner
- Lotus Worker(s)

## Lotus Daemon
The Lotus Daemon is the component that syncs the chain, includes the client and holds the wallets of the Storage Provider. This machine requires public internet reachability for the Storage Provider setup to work.

### Chain
Syncing the chain is a key activity of the daemon. It stays in sync with the other nodes on the blockchain network by syncing the messages. Messages are collected into blocks. Blocks are collected into tipsets. The Lotus Daemon you run receives all the messages on-chain. Because of the size of the chain since its genesis, it is not advised for Storage Providers to sync the entire history. Lightweight snapshots are available for import so that you only import the most recent messages. You would need to sync the entire chain however if you were to run a Blockchain Explorer like [Filfox](https://filfox.info) for instance.

The storage volume on which you sync the chain should be fast storage, at least SSD and preferably NVMe. Slow syncing of the chain can lead to all kinds of unwanted effects in your Storage Provider setup. For instance it can lead to delays in critical messages to be sent on-chain from your Lotus Miner, resulting in faulting of sectors.

Another important consideration is the filesystem size and free space. The Filecoin chain grows every per day, which will eventually fill up any available space. Solutions like [SplitStore](https://lotus.filecoin.io/lotus/configure/splitstore/) and [compacting](https://lotus.filecoin.io/lotus/manage/chain-management/) allow to reduce the storage space used by the chain.

### Wallets
Another key role of the Lotus Daemon is to host the Filecoin wallets that are required to run a Storage Provider setup. As a Storage Provider you will need a minimum of 2 wallets. One is the "owner" wallet, the other is the "worker" wallet.

It is important to note that careful security measures are required to keep your Lotus wallets safe. This includes measures around physical access, network access, software security and making backups (that are also secured). As with any web3 wallet, access to the private key means access to your funds. [Lotus supports Ledger hardware wallets](https://lotus.filecoin.io/lotus/manage/ledger/), which is a recommended method for the owner wallet. You cannot keep the worker or control wallets on a hardware device because Lotus will require frequent access to those wallets. For instance, Lotus requires access to a worker or control wallet (depending on your setup) to send WindowsPoST proofs on-chain.

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

## Lotus Miner
Lotus Miner is the process that coordinates most of the Storage Provider (storage miner) activities. Its main responbilities can be split up into 3:
- Storing the data
- Scheduling jobs
- Proving the stored data


### Storing
As a Storage Provider on the Filecoin network you store sectors. They either contain data or they don't but either way you are storing "sealed sectors" for the capacity you provide to the network. If you are storing data deals you will also need to store "unsealed sectors" because retrievals happen from unsealed sectors.

Lotus Miner traditionally was the component with storage access. This means the miner either has internal disks, direct-attached storage shelves (JBOD's) attached, or talks to Network-Attached-Storage (NAS) or a storage cluster.

Lotus evolved towards a more scalable storage access solution in which workers can also be assigned storage access. This enhancement removes the bottleneck from the Lotus Miner. Low-latency storage access is a critical thing to design for since it can impact the Storage Proving processes.

Run the following command to check the storage configuration for your Lotus Miner instance:

    lotus-miner storage list

This will return your sealed space and your scratch space (cache) if you properly configured your miner by following the steps in the Lotus documentation.

It is extremely important to keep a backup of your sealed sectors, and ideally also of the unsealed sectors. Additionally also backup the *sectorstore.json* file that lives under your storage path. This file is also required to be restored in the event of a failure.
### Scheduling
Another key responsibility of the Lotus Miner is scheduling of tasks. Tasks to be scheduled include those of the [sealing pipeline]({{<relref "sealing-pipeline" >}}) and of the Storage Proving (see below).

To see the jobs being scheduled, run:

    lotus-miner sealing jobs

And to see the workers on which the miner can schedule jobs:

    lotus-miner sealing workers


### Storage Proving
One of the most important roled of the Lotus Miner is the [Storage Proving]({{<relref "storage-proving" >}}). Both WindowPoSt and WinningPoSt processes are usually handled by the Lotus Miner. For scalability and reliability purposes it is now also possible to run these proving processes on dedicated servers (workers) instead of using the Lotus Miner. 

The proving processes require low-latency access to the sealed sectors. The proving challenge requires a GPU to run on. The resulting zkProof will be sent on-chain in a message. There are strict deadlines for those messages to arrive on-chain (30 minutes for WindowPoSt and just 30 seconds for WinningPoSt). It is therefore important to properly size and configure the proving workers (be it on the Lotus Miner or separate) and to make sure there are dedicated wallets set up for these processes. If they would use the general worker wallet there is the risk of message congestion, resulting in delayed message delivery on-chain and potential sector faulting, slashing, or lost block rewards.

Always check if there are upcoming proving deadlines before halting any services for maintenance:

    lotus-miner proving deadlines

## Lotus Worker(s)
The Lotus Worker is the 3rd important component in the Lotus architecture. There can - and most likely will - be multiple workers in a single Storage Provider setup. Assigning designated roles to each worker in the setup allows for scaling out the setup in favor of higher throughput (see [Sealing Rate]({{<relref "sealing-rate">}}) and redundancy.

As mentioned above, the proving tasks can be assigned to designated workers and worker can also get storage access.
The remaining tasks for which workers are responsible, are those of the [Sealing Pipeline]({{<relref "sealing-pipeline">}}) which is discussed in the next section.