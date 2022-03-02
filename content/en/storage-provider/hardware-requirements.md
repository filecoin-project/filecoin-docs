---
title: "Hardware requirements"
description: "Minimum hardware requirements for providing storage to the Filecoin network."
menu:
    storageprovider:
        parent: "storage-provider-hardware"
---

The hardware requirements for providing storage are tied to the computational resources needed to _seal_ a sector and generating regular _Proof of Spacetime_ for every sealed sector (_WindowPoSt_).

The Filecoin network requires storage providers to run computationally expensive operations. The cost of these operations depends on which network the storage provider is running; some testnets use a smaller sector size to increase the speeds of transactions artificially. For reference, the requirements listed below correspond to **32GiB sectors**, as used by mainnet and some testnets.

Different Filecoin Miner implementations may distribute sealing tasks differently, for example, using additional workers apart from the Miner. The following are _general_ requirements assuming all the storage provider operations are performed by the same machine. Resources needed by each operation are detailed later below. For a concrete example of hardware type and usage, see the [storage provider architectures](https://lotus.filecoin.io/docs/storage-providers/mining-architectures/).

## General hardware requirements

### CPU

A storage provider will need an **8+ core CPU**.

We strongly recommend a CPU model with support for _Intel SHA Extensions_: AMD since Zen microarchitecture, or Intel since Ice Lake. Lack of SHA Extensions results in a very significant slow down.

### RAM

**128 GiB of RAM** are needed at the very least. This **should** be complemented with **256 GiB of swap on a very fast NVMe SSD** storage medium.

### GPU

A powerful GPU is **recommended** as it can significantly speed up SNARK computations. See below for operations which can take advantange of GPU presence.

The [authoritative list of supported GPUs](https://github.com/filecoin-project/bellman#supported--tested-cards) is in the [Bellman repository](https://github.com/filecoin-project/bellman#supported--tested-cards).

Additional GPU models need to be enabled manually ([instructions for Lotus](https://lotus.filecoin.io/docs/storage-providers/overview/)).

{{< alert icon="warning" >}}
Mixing AMD and Nvidia GPUs in the same machine is known to cause issues with OpenCL and should be avoided.
{{< /alert >}}

### Disk

Performance of Miner operations can be heavily affected by slow disks. For example, a 32GiB expands to ~480GiB during the sealing process. Filecoin network parameters are over 100GiB and need to be read and verified during Miner start. As mentioned above, lack of RAM needs to be addressed with a fast swap drive or file.

For this reasons, a minimal amount of 1TiB NVMe-based disk space for cache storage is recommended. This disk should be used to store data during the sealing process, to cache Filecoin parameters and serve as general temporal storage location.

Additional hard drives for the final storage of "sealed sectors", the Lotus chain etc. will be needed as well.

## Specific operation requirements

As mentioned, the Miners have to perform operations of different nature which differ in how they use CPU and GPU resources. The following table shows how resources are utilized depending on the sealing phase or proof calculation being run:

| Operation                  | CPU used                       | GPU used | Memory (32Gib sectors) | Notes                                                                                                                                                                                                                                       |
| -------------------------- | ------------------------------ | -------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sealing: preCommit phase 1 | Yes (1 core or 1 core-complex) | No       | 128GiB                 | PoRep SDR encoding. Not amenable to parallelization. Core usage depends on value of [`FIL_PROOFS_USE_MULTICORE_SDR`](https://github.com/filecoin-project/rust-fil-proofs/). |
| Sealing: preCommit phase 2 | Yes (when no GPU, all cores)   | Yes      | 128GiB                 | Merkle tree generation using the Poseidon hashing algorithm. Slower with just CPUs.                                                                                                                                                         |
| Sealing: commit phase 1    | Yes (all cores)                | No       | -                      |                                                                                                                                                                                                                                             |
| Sealing: commit phase 2    | Yes (when no GPU, all cores)   | Yes      | ~ 192GiB               | Slow with just CPUs.                                                                                                                                                                                                                        |
| Unsealing                  | Yes (1 core)                   | No       | 128GiB                 |                                                                                                                                                                                                                                             |
| Proving _WindowPoSt_       | Yes (all cores, when no GPU)   | Yes      | -                      | _WindowPoSts_ must be submitted in 30 minute windows. When no GPU available, the more CPU cores the faster                                                                                                                                  |
| Proving _WinningPoSt_      | Yes                            | No       | -                      | _WinningPoSt_ is a less intensive computation. Must be completed in a 25 seconds window.                                                                                                                                                    |

Note that the [Lotus](https://lotus.filecoin.io) implementation allows to configure and delegate specific sealing phases to [Lotus workers](https://lotus.filecoin.io/docs/storage-providers/seal-workers/).

## About hardware requirements

The above requirements will not increase in the presumable future, and money spent on hardware should provide users with many years of reliable service, paying for themselves several times over.
