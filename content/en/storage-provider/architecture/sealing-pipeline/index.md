---
title: "Sealing pipeline"
description: "When you provide storage capacity to the Filecoin network (either as Committed Capacity or as Storage Deals), you need to create sealed sectors."
lead: "When you provide storage capacity to the Filecoin network, either as Committed Capacity or Storage Deals, you must create _sealed sectors_. Sealing is required to convert the data sectors into a form which provides cryptographic proof of ongoing storage over time, called _Proof-of-SpaceTime_. The process of sealing sectors is called the _sealing pipeline_, and is important for Storage Providers to understand. The steps of the process, as well as recommendations for storage providers in regards to each step, are described in detail on this page."
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-architecture"
    identifier: "sealing-pipeline-cdb43930e348fa2b1be72028d8ea7fd2"
weight: 420
toc: true
---

Each step in the sealing process has different performance (memory, disk, CPU, GPU, etc) considerations, and fine-tuning is required to align the different steps optimally. For example, storage providers that don't understand the process expected throughput may end up overloading the sealing pipeline, by trying to seal too many sectors at once, or taking on a dataset which is too large for available infrastructure. This can lead to a slower _sealing rate_, which is discussed in greater detail in [Sealing Rate]({{<relref "sealing-rate">}}).
When you provide storage capacity to the Filecoin network (either as Committed Capacity or as Storage Deals), you need to create _sealed sectors_. Sealing is required convert the data sectors into a form which can provide the cryptographic proofs that demonstrate ongoing storage over time (Proof-of-SpaceTime). The process of sealing sectors goes through a series of steps which together form the _sealing pipeline_.

## Overview

The sealing pipeline can be broken into the following steps:

[![sealing tasks](sealing-tasks.png)](sealing-tasks.png)

## 1. AddPiece (AP)

The sealing pipeline begins with _AddPiece_ part (abbreviated as AP), where the pipeline takes a _Piece_ and prepares it into the sealing scratch space for the _PreCommit 1_ task ([PC1]({{<relref "#2-precommit-1-pc1">}})) to take over. In Filecoin, a _Piece_ is data in CAR-file format produced by an [IPLD DAG](https://ipld.io) with a corresponding `PayloadCID` and `PieceCID`. The maximum Piece size is equal to the sector size (32 or 64GiB). If the content is larger than the sector size, it must be split into more than one `PieceCID` during data preparation.

The AddPiece process is not a very intensive process and only uses some CPU cores. It is typically collocated on a server with other worker processes from the sealing pipeline. As PC1 is the next process in the sealing pipeline, running AddPiece on the same server as the PC1 process is a logical architecture.

Consider limiting the AP process to a few cores by using the `taskset` command, where `<xx-xx>` is the range on which cores the process needs to run on:

```shell
taskset -c <xx-xx> lotus-worker run ...
```

## 2. PreCommit 1 (PC1)

_PreCommit 1 (PC1)_ is the most intensive process of the entire sealing pipeline. PC1 is the step in which a sector, regardless of whether it contains data or not, is cryptographically secured. The worker process loads cryptographic parameters from a cache location, which should be stored on enterprise NVMe. These parameters are then used to run PoRep SDR encoding against the sector that was put into the sealing scratch space. This task is single threaded and very CPU intensive, so it requires a CPU with SHA256 extensions. Typical CPUs that meet this requirement include the AMD Epyc Milan/Rome or an Intel Xeon Ice Lake with 32 cores or more.

Using the scratch space, the PC1 task will creates 11 layers of the sector. Storage providers must host scratch space for this on enterprise NVMe. This means that:

- Every sector consumes memory equal to 1+11 times its size on the scratch volume.
- For a 32GiB sector, PC1 requires 384GiB on the scratch volume
- For a 64GiB sector, PC1 requires 768GiB.

In order to seal at a decent rate it, and to make use of all the sealing capacity in a PC1-server, you will run multiple PC1 workers in parallel on a system. More about this in the chapter on [Sealing Rate]({{<relref "sealing-rate">}}). Sealing multiple sectors multiplies the requirements on CPU cores, RAM and scratch space by the amount of sectors done in parallel.

Sealing multiple sectors multiplies the requirements on CPU cores, RAM and scratch space by the amount of sectors done in parallel. In order to achieve a decent sealing rate and make use of all sealing capacity in a PC1 server, storage providers should run multiple PC1 processes in parallel on a system. More information on this can be found in [Sealing Rate]({{<relref "sealing-rate">}}). 

Note that, even on enterprise hardware, the process of sealing a single 32GiB sector takes roughly **3 hours**.

## 3. PreCommit 2 (PC2)

When PC1 has completed on a given sector, the entire scratch space for that sector (384GiB or 768GiB depending on the sector size) is moved over to the _PreCommit 2 (PC2)_ task. This task is typically executed on a different server than the PC1 server because, as it behaves differently. In short, PC2 validates PC1 using the Poseidon hashing algorithm over the Merkle Tree DAG that was created in PC1. 

Where PC1 is CPU-intensive, PC2 is executed on GPU. This task is also notably shorter in duration than PC1, typically 10-20 minutes on a capable GPU. This requires a GPU of 10 GB of memory or more, and 3500+ CUDA cores (or shading units, in the case of NVIDIA). Storage providers can use slower GPUs, but this may create a bottleneck in the sealing pipeline.

For best performance, compile Lotus with CUDA support instead of OpenCL. For further information, see the Lotus [CUDA Setup](https://lotus.filecoin.io/tutorials/lotus-miner/cuda/)

In the case of a [Snap Deal]({{<relref "snap-deals">}}), an existing CC sector is filled with data. In this case, the entire PC1 task does not run again; however, the snapping process employs PC1's `replica-update` and `prove-replica-update` to add the data to the sector. This can be run on the PC2 worker or on a separate worker depending on your sealing pipeline capacity.

When PC2 is complete for a sector, a _precommit_ message is posted on-chain. If batching is configured, Lotus will batch these messages to avoid sending messages to the chain for every single sector. In addition, there is a configurable timeout interval (24 hours by default) after which the message will be sent on-chain. These configuration parameters are found in the `.lotusminer/config.toml` file.

If you want to force the precommit message on-chain (for testing purposes, etc.), run:

```shell
lotus-miner sectors batching precommit --publish-now
```

The sealed sector and its 11 layers are kept on the scratch volume until Commit 2 is complete.
<!-- to be verified with Angelo-->

## 4. WaitSeed

WaitSeed is not an actual task that is executed but it is a step in the pipeline in which the blockchain forces the pipeline to wait for 150 epochs as a built-in security mechanism. With Filecoin's 30 second epochs, this means 75 minutes must elapse between PC2 and the next task, Commit 1 (C1). 

## 5. Commit 1 (C1)

The _Commit 1 (C1)_ phase is an intermediate phase that performs preparation necessary to generate a proof. It is CPU-bound and typically completes in seconds. It is recommended that storage providers run this process on the server where PC2 was run.

## 6. Commit 2 (C2)

The last and final step in the sealing pipeline is _Commit 2 (C2)_. This step involves the creation of a zkSNARK proof. LIke PC2, this task is GPU-bound and is therefore best colocated with the PC2 task.

Finally, the proof is committed on-chain in a message. As with the precommit messages, the commit messages are also batched and held for 24 hours by default before committing on-chain to avoid sending messages for each and every sector. You can again avoid batching/waiting by running:

```shell
lotus-miner sectors batching commit --publish-now
```

Finally, the sealed sector is stored in the miner's long-term storage space, along with unsealed sectors which are required for retrievals (if configured to do so).
