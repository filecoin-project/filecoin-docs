---
title: "Lotus components"
description: "Lotus is the software reference implementation written by Protocol Labs to interact with the Filecoin blockchain."
lead: "Lotus is the reference implementation for the Filecoin network written in Go and maintained by [Protocol Labs](https://protocol.ai). Understanding the components of Lotus is necessary in understanding subsequent sections on sealing, and what it means to build well-balanced storage provider architecture."
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-architecture"
    identifier: "lotus-components-eaf8e84a4d869e8377258acc4e25f684"
weight: 410
toc: true
---

The diagram below shows the major components of Lotus:

[![Lotus software components](lotus-components.png)](lotus-components.png)

The following components are the most important to understand:

- [Lotus daemon]({{< relref "#lotus-daemon" >}})
- [Lotus miner]({{< relref "#lotus-miner" >}})
- [Lotus worker]({{< relref "#lotus-worker" >}})

## Lotus daemon

The daemon is a key Lotus component that does the following:

- Syncs the chain
- Holds the wallets of the storage provider

The machine running the Lotus daemon must be connected to the public internet for the storage provider to function. See the [Lotus documentation](https://lotus.filecoin.io/storage-providers/setup/initialize/#connectivity-to-the-storage-provider) for more in-depth information on connectivity requirements.

### Syncing the chain

Syncing the chain is a key role of the daemon. It communicates with the other nodes on the network by sending messages, which are, in turn, collected into [blocks](https://docs.filecoin.io/reference/general/glossary/#block). These blocks are then collected into [tipsets](https://docs.filecoin.io/reference/general/glossary/#tipset). Your Lotus daemon receives the messages on-chain, enabling you to maintain consensus about the state of the Filecoin network with all the other participants.

Due to the growth in the size of the chain since its genesis, it is not advised for storage providers to sync the entire history of the network. Instead, providers should use the available [lightweight snapshots](https://lotus.filecoin.io/kb/chain-snapshots/) to import the most recent messages. One exception in which a provider would need to sync the entire chain would be to run a blockchain explorer.

Synced chain data should be stored on an SSD; however, faster NVMe drives are strongly recommended. A slow chain sync can lead to delays in critical messages being sent on-chain from your Lotus miner, resulting in the faulting of sectors and the slashing of collateral.

Another important consideration is the size of the file system and available free space. Because the Filecoin chain grows as much as 50GB a day, any available space will eventually fill up. It is up to storage providers to manage the size of the chain on disk and prune it as needed. Solutions like [SplitStore](https://lotus.filecoin.io/lotus/configure/splitstore/) (enabled by default) and [compacting](https://lotus.filecoin.io/lotus/manage/chain-management/#compacting-the-chain-data) reduce the storage space used by the chain. Compacting involves replacing the built-up chain data with a recent lightweight snapshot.

### Holding wallets

Another key role of the Lotus daemon is to host the Filecoin wallets that are required to run a storage provider (SP). As an SP, you will need a minimum of 2 wallets: an _owner wallet_ and a _worker wallet_. A third wallet called the [_control_ wallet]({{< relref "#control-wallets" >}}) is required to scale your operations in a production environment.

To keep wallets safe, providers should consider physical access, network access, software security, and secure backups. As with any cryptocurrency wallet, access to the private key means access to your funds. Lotus supports [Ledger hardware wallets](https://lotus.filecoin.io/lotus/manage/ledger/), the use of which is recommended. The worker and control wallets can not be kept on a hardware device because Lotus requires frequent access to those types of wallets. For instance, Lotus may require access to a worker or control wallet to send {{< tooltip "WindowPoSt" >}} proofs on-chain.

{{< alert "info" >}}
For information on how to view wallets and their funds, see [Helpful commands]({{< relref "#view-wallets-and-funds" >}}). For information and instructions on integrating your Ledger device with Lotus, see the following video:
{{< /alert >}}

{{< youtube "u_S5F6WyBAU" >}}

#### Control wallets

Control wallets are required to scale your operations in a production environment. In production, only using the general worker wallet increases the risk of message congestion, which can result in delayed message delivery on-chain and potential sector faulting, slashing, or lost block rewards. It is recommended that providers create wallets for each subprocess. There are five different types of control wallets a storage provider can create:

- PoSt wallet
- PreCommit wallet
- Commit wallet
- Publish storage deals wallet
- Terminate wallet

## Lotus miner

The Lotus miner, often referred to using the daemon naming syntax `lotus-miner`, is the process that coordinates most of the storage provider activities. It has 3 main responsibilities:

- Storing sectors and data
- Scheduling jobs
- Proving the stored data

### Storing sectors and data

Storage Providers on the Filecoin network store sectors. There are two types of sectors that a provider may store:

- Sealed sectors: these sectors may or may not actually contain data, but they provide capacity to the network, for which the provider is rewarded.
- Unsealed sectors: used when storing data deals, as retrievals happen from unsealed sectors.

Originally, `lotus-miner` was the component with storage access. This resulted in `lotus-miner` hardware using internal disks, directly attached storage shelves like [JBODs](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures#JBOD), Network-Attached-Storage (NAS), or a storage cluster. However, this design introduced a bottleneck on the Lotus miner.

More recently, Lotus has added a more scalable storage access solution in which workers can also be assigned storage access. This removes the bottleneck from the Lotus miner. Low-latency storage access is critical because of the impact on storage-proving processes.

{{< alert "info" >}}
For information on how to check the storage configuration for your Lotus miner instance, see [Helpful commands]({{< relref "#check-storage-configuration" >}}).
{{< /alert >}}

Keeping a backup of your sealed sectors, the cache directory, and any unsealed sectors is crucial. Additionally, you should keep a backup of the `sectorstore.json` file that lives under your storage path. The `sectorestore.json` file is required to restore your system in the event of a failure. You can read more about the `sectorstore.json` file in the [lotus docs](https://lotus.filecoin.io/storage-providers/seal-workers/seal-workers/#sector-storage-groups).

It is also imperative to have at least a daily backup of your `lotus-miner` state. Backups can be made with:

```shell
lotus-miner backup 
```

{{< alert "info" >}}
For information on how to back up Lotus miner state, see [Helpful commands]({{< relref "#backup-lotus-miner-state" >}}).
{{< /alert >}}

The `sectorstore.json` file, which lives under your storage path, is also required for restoration in the event of a failure. You can read more about the file in the [Lotus docs](https://lotus.filecoin.io/storage-providers/seal-workers/seal-workers/#sector-storage-groups).

## Scheduling jobs

Another key responsibility of the Lotus Miner is the scheduling of jobs for the [sealing pipeline]({{< relref "sealing-pipeline" >}}) and storage proving.

{{< alert "info" >}}
For information on how to view scheduled jobs, see [View scheduled jobs]({{< relref "#view-scheduled-jobs" >}}). For information on how to see the workers on which the miner can schedule jobs, see [View available workers]({{< relref "#view-available-workers" >}}).
{{< /alert >}}

### Storage proving

One of the most important roles of `lotus-miner` is the [Storage proving]({{<relref "storage-proving" >}}). Both [WindowPoSt](https://docs.filecoin.io/reference/general/glossary/#window-proof-of-spacetime-windowpost) and [WinningPoSt](https://docs.filecoin.io/reference/general/glossary/#winning-proof-of-spacetime-winningpost) processes are usually handled by the `lotus-miner` process. For scalability and reliability purposes it is now also possible to run these proving processes on dedicated servers (proving workers) instead of using the Lotus miner.

The proving processes require low-latency access to sealed sectors. The proving challenge requires a GPU to run on. The resulting `zkProof` will be sent to the chain in a message. Messages must arrive within 30 minutes for WindowPoSt, and 30 seconds for WinningPoSt. It is extremely important that providers properly size and configure the proving workers, whether they are using just the Lotus miner or separate workers. Additionally, dedicated wallets, described in [Control wallets]({{< relref "#control-wallets" >}}), should be set up for these processes.

Always check if there are upcoming proving deadlines before halting any services for maintenance. For detailed instructions, refer to the [Lotus maintenance guide](https://lotus.filecoin.io/storage-providers/operate/maintenance/).

{{< alert "info" >}}
For information on how to check if there are upcoming proving deadlines, see [Helpful commands]({{< relref "#view-proving-deadlines" >}}).
{{< /alert >}}

## Lotus worker

The Lotus worker is another important component of the Lotus architecture. There can be - and most likely will be - multiple workers in a single storage provider setup. Assigning specific roles to each worker enables higher throughput, [sealing rate]({{<relref "sealing-rate">}}), and improved redundancy.

As mentioned above, proving tasks can be assigned to dedicated workers, and workers can also get storage access.
The remaining worker tasks encompass running a [sealing pipeline]({{<relref "sealing-pipeline">}}), which is discussed in the next section.

## Helpful commands

The following commands can help storage providers with their setup.

### Backup Lotus miner state

It is imperative to have at least one daily backup of your Lotus miner state. Backups can be made using the following command:

```shell
lotus-miner backup
```

### View wallets and funds

You can use the following command to view wallets and their funds:

```shell
lotus wallet list
```

### Check storage configuration

Run the following command to check the storage configuration for your Lotus miner instance:

```shell
lotus-miner storage list
```

This command return information on your _sealed space_ and your _scratch space_, otherwise known as a cache. These spaces are only available if you have properly configured your Lotus miner by following the steps described in the [Lotus documentation](https://lotus.filecoin.io/storage-providers/operate/custom-storage-layout/).

### View scheduled jobs

To view the scheduled sealing jobs, run the following:

```shell
lotus-miner sealing jobs
```

### View available workers

To see the workers on which the miner can schedule jobs, run:

```shell
lotus-miner sealing workers
```

### View proving deadlines

To check if there are upcoming proving deadlines, run the following:

```shell
lotus-miner proving deadlines
```

{{< sp-calls-to-action >}}
