---
title: 'Lotus Miner: seal workers'
description: 'The Lotus seal worker is a separate application that can be used to offload some of the heaviest processing task from the Lotus Miners. This guide explains how to setup one or several Lotus seal workers.'
breadcrumb: 'Seal workers'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

The sealing process automatically runs in the **Lotus Miner** process, but you can use the Worker on another machine communicating over a fast network to free up resources on the machine running the mining process.

[[TOC]]

## Installation

The `lotus-worker` application should have been built and installed along with the others when following the [installation guide](../../get-started/lotus/installation.md). For simplicity, we recommend following the same procedure in the machines that will run the Lotus Workers (even if the Lotus miner and the Lotus daemon are not used there).

## Setting up the Miner

### Choosing a data directory for the worker

The Lotus Worker stores all the necessary data in the `~/.lotusworker` folder. You can customize that by setting the `$LOTUS_WORKER_PATH` environment variable. It is recommended to put this folder on a NVMe SSD so that it gets faster disk performance.

### Allow external connections to the miner API

Set `ListenAddress` and `RemoteListenAddress` to the IP of a non-local interface (or `0.0.0.0`) as [documented here](miner-configuration.md#api-section). [Check connectivity to the RemoteListenAddress](connectivity.md) from the worker machine.

### Create an authentication token

```sh
lotus-miner auth api-info --perm admin
```

The Lotus Workers will need this token to connect to the miner. For more info check the [API docs](../../build/lotus/api-token-generation.md).

### Connect the Lotus Workers

On each machine that will run the `lotus-worker` application you will need to define the following _environment variable_:

```sh
export MINER_API_INFO:<TOKEN>:/ip4/<miner_api_address>/tcp/<port>`
```

::: tip
Remember to set the [`IPFS_GATEWAY` variable when running from China](tips-running-in-china.md)
:::

Once that is done, you can run the Worker with:

```sh
lotus-worker run
```

::: tip
If you are **running multiple workers on the same host**, you will need to specify the `--listen` flag and ensure each worker is on a different port.
:::

On your Lotus miner, check that the workers are correctly connected:

```sh
lotus-miner sealing workers
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

## Running locally for manually managing process priority

You can also run the _Lotus Worker_ on the same machine as your _Lotus Miner_, so you can manually manage the process priority.

To do so you have to first **disable all seal task types** in the [miner configuration](miner-configuration.md#storage-section). This is important to prevent conflicts between the two processes:

```toml
[Storage]
  AllowPreCommit1 = false
  AllowPreCommit2 = false
  AllowCommit = false
  AllowUnseal = false
```

Note that, if you do this, you do not need to open up the miner API and it can stay listening on the local interface.
