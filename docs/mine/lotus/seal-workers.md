---
title: 'Lotus Miner: seal workers'
description: 'The Lotus seal worker is a separate application that can be used to offload part of all phases in the sealing process to a separate machine or process. This guide explains how to setup one or several Lotus seal workers.'
breadcrumb: 'Seal workers'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

While the **Lotus Miner** can run every of the sealing phases itself (and is configured to do so by default), Lotus workers allow to create a _sealing pipeline_ that can improve resource utilization and free the main miner from CPU-intensive tasks so that it can focus on performing and submitting _WindowPoSTs_ and _WinningPoSTs_ to the chain.

[[TOC]]

## Resource allocation in workers

Each **Lotus Worker** can run multiple tasks, depending on your hardware resources. Each slot is called a _window_. The final number is determined by the number of available cores and the requirements of the sealing phase allocated to it. That means that a single worker on a 8-core CPU with a single GPU will run at most:

- 2 _PreCommit1_ tasks (using 1 core each)
- 1 _PreCommit2_ task (using all available cores)
- 1 _Commit_ task (using all available cores or using the GPU)
- 2 _Unseal_ tasks (using 1 core each)

If the worker process has only 1 available CPU-core (because of CPU-affinity configuration or `GOMAXPROCS=1`), then it will only be able to run 1 _PreCommit1_ task as there are no resources available to utilize its second _window_.

Note that, at all moments, the miner controls the total number of sectors that can be sealing at the same time via `MaxSealingSectors` and/or `MaxSealingSectorsForDeals` in the Miner's `config.toml`.

All of the above serves to setup custom _sealing pipelines_ where available hardware can be utilized in the most performant fashion, for example, by having co-located workers on a single machine to perform _PreCommit1_ only, and then having a dedicated GPU worker for the _PreCommit2_ and _Commit_ phases on a different hardware, leaving the miner to do the rest of the operations. The final setup will depend on the available hardware and its specifications.

::: callout
Remember during sealing, significant amounts of data are moved/copied across workers, so good network connectivity among them is a must.
:::

## Installation

The `lotus-worker` application should have been built and installed along with the others when following the [installation guide](../../get-started/lotus/installation.md). For simplicity, we recommend following the same procedure in the machines that will run the Lotus Workers (even if the Lotus miner and the Lotus daemon are not used there).

## Setting up the Miner

The Lotus miner needs to be ready to accept API connections from workers.

### Allow external connections to the miner API

Set `ListenAddress` and `RemoteListenAddress` to the IP of a non-local interface (or `0.0.0.0`) as [documented here](miner-configuration.md#api-section). [Check connectivity to the RemoteListenAddress](connectivity.md) from the worker machine.

### Obtain an authentication token

```sh
lotus-miner auth api-info --perm admin
```

The Lotus Workers will need this token to connect to the miner. For more info check the [API docs](../../build/lotus/api-tokens.md). Write down the output so that you can use it in the next step.

### Configuring the miner sealing capabilities

The Lotus Miner is itself a worker and will contribute to sealing operations like any other worker. Depending on what phases of the sealing process you would like your workers to perform, you may choose to configure which ones the miner will directly perform. This is done in the `Storage` section of the miner's `config.toml`:

```toml
[Storage]
  AllowAddPiece = true
  AllowPreCommit1 = true
  AllowPreCommit2 = true
  AllowCommit = true
  AllowUnseal = true
```

If you want to fully delegate any of these operations to workers, set them to `false`.

## Launching Lotus workers

### Environment variables

Ensure that workers have access to the following environment variables when they run. These are similar to those used by the Miner daemon ([explained in the setup guide](miner-setup.md):

```
# MINER_API_INFO as obtained before
export TMPDIR=/fast/disk/folder3                    # used when sealing
export MINER_API_INFO:<TOKEN>:/ip4/<miner_api_address>/tcp/<port>/http`
export BELLMAN_CPU_UTILIZATION=0.875      # optimal value depends on exact hardware
export FIL_PROOFS_MAXIMIZE_CACHING=1
export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # when GPU is available
export FIL_PROOFS_USE_GPU_TREE_BUILDER=1   # when GPU is available
export FIL_PROOFS_PARAMETER_CACHE=/fast/disk/folder # > 100GiB!
export FIL_PROOFS_PARENT_CACHE=/fast/disk/folder2   # > 50GiB!

# The following increases speed of PreCommit1 at the cost of using a full
# CPU core-complex rather than a single core. Should be used with CPU affinities set!
# See https://github.com/filecoin-project/rust-fil-proofs/ and the
# "Worker co-location" section below.
export FIL_PROOFS_USE_MULTICORE_SDR=1
```

::: tip
Remember to set the [`IPFS_GATEWAY` variable when running from China](tips-running-in-china.md)
:::

### Run the worker

```sh
lotus-worker run <flags>
```

The above command will start the worker. Depending on the operations that you want the worker to perform and the hardware that it is running on, you will want to specify for which sealing phases the worker will make itself available:

```
   --addpiece                    enable addpiece (default: true)
   --precommit1                  enable precommit1 (32G sectors: 1 core, 128GiB Memory) (default: true)
   --unseal                      enable unsealing (32G sectors: 1 core, 128GiB Memory) (default: true)
   --precommit2                  enable precommit2 (32G sectors: all cores, 96GiB Memory) (default: true)
   --commit                      enable commit (32G sectors: all cores or GPUs, 128GiB Memory + 64GiB swap) (default: true)
```

::: tip
If you are **running multiple workers on the same host**, you will need to specify the `--listen` flag and ensure each worker is on a different port.
:::

Once the worker is running, it should connect to the Lotus miner. You can verify this with:

```sh
$ lotus-miner sealing workers
Worker 0, host computer
        CPU:  [                                                                ] 0 core(s) in use
        RAM:  [||||||||||||||||||                                              ] 28% 18.1 GiB/62.7 GiB
        VMEM: [||||||||||||||||||                                              ] 28% 18.1 GiB/62.7 GiB
        GPU: GeForce RTX 2080, not used

Worker 1, host othercomputer
        CPU:  [                                                                ] 0 core(s) in use
        RAM:  [||||||||||||||                                                  ] 23% 14 GiB/62.7 GiB
        VMEM: [||||||||||||||                                                  ] 23% 14 GiB/62.7 GiB
        GPU: GeForce RTX 2080, not used
```

### Miner and worker co-location

You can run the _Lotus Worker_ on the same machine as the _Lotus Miner_. This can be helpful to manage priorities between processes or better allocate available CPUs for each task. To avoid conflicts, we recommend that the enabled sealing phases in the worker(s) and the miner **do not overlap**.

Additionally, be mindful of the local resources used by the sealing process (particularly CPU). WindowPoSTs are CPU intensive and need to be submitted by the miner regularly. If a miner is performing other CPU-bound sealing operations in parallel, it may fail to submit the WindowPoSTs in time, thus [losing collateral](../slashing.md) in the process. For this reason, we recommend careful allocation of CPU cores available and sealing phases to miner and workers.

Note that if you co-locate miner and worker(s), you do not need to open up the miner API and it can stay listening on the local interface.

### Worker co-location for PreCommit1

Since some operations are bound to a single CPU-core or core-complex (namely _PreCommit1_), it is possible to run multiple workers on a single machine in order to maximize CPU utilization.

For example, to run a _PreCommit1_ worker in a way that it does not conflict with others, do:

```sh
# Use a unique storage location for each worker
export LOTUS_WORKER_PATH=/path/to/worker/storage/N
# Replace X with a different port for each worker.
lotus-worker run --listen 0.0.0.0:X --addpiece=false --precommit1=true --unseal=true --precommit2=false --commit=false
```

By default, the _PreCommit1_ base will _use a single CPU core_. This means that several worker processes can use remaining cores and perform the work in parallel for this phase, as long as there is enough memory available for all of them to run.

Alternatively, it is also possible to speed up _PreCommit1_ by setting `FIL_PROOFS_USE_MULTICORE_SDR=1`. This enables [optimizations to memory access](https://github.com/filecoin-project/rust-fil-proofs/), but each worker will need access to a full CPU core-complex (usually 4 adjacent cores). This reduces the number of workers that could run in parallel, but allows them to be faster and saves the memory footprint of running additional processes.

In both cases, whether using the single-core or the multicore _PreCommit1_ worker, the process should be restricted to the use of a **single CPU** or a **single, full core-complex** respectivly. This can be achieved with `taskset`:

```sh
# Restrict to single core number 0
taskset -c 0 <worker_pid | command>
# Restrict to a single core complex (example)
# Check your CPU model documentation to verify how many
# core complexes it has and how many cores in each:
taskset -c 0,1,2,3 <worker_pid | command>
```

It is also possible to set [_CPU affinity_ with systemd](https://www.freedesktop.org/software/systemd/man/systemd-system.conf.html):

```
# workerN.service
...
CPUAffinity=C1,C2... # Specify the core number that this worker will use.
...
```

Finally, remember that `MaxSealingSectors` and/or `MaxSealingSectorsForDeals` in the Miner's `config.toml` affect how many sectors can be sealing at the same time, so they should be set as needed and accordingly to the worker configuration.
