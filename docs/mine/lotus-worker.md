---
title: Lotus worker
---

# Lotus Worker

The **Lotus Worker** is an extra process that can offload heavy processing tasks from your **Lotus Storage Miner**. The sealing process automatically runs in the **Lotus Storage Miner** process, but you can use the Seal Worker on another machine communicating over a fast network to free up resources on the machine running the mining process, as well as expand your mining operation to multiple rigs.

## Note: Using the Lotus Seal from China

If you are trying to use `lotus-worker` from China. You should set this **environment variable** on your machine:

```sh
IPFS_GATEWAY="https://proof-parameters.s3.cn-south-1.jdcloud-oss.com/ipfs/"
```

## Get Started

Make sure that the `lotus-worker` is compiled and installed by running:

```sh
make lotus-worker
```

## Setting up the Storage Miner

First, you will need to ensure your `lotus-miner`'s API is accessible over the network.

To do this, open up `~/.lotusminer/config.toml` (Or if you manually set `LOTUS_STORAGE_PATH`, look under that directory) and look for the API field.

Default config:

```toml
[API]
ListenAddress = "/ip4/127.0.0.1/tcp/2345/http"
RemoteListenAddress = "127.0.0.1:2345"
```

To make your node accessible over the local area network, you will need to determine your machines IP on the LAN, and change the `127.0.0.1` in the file to that address.

A more permissive and less secure option is to change it to `0.0.0.0`. This will allow anyone who can connect to your computer on that port to access the [API](https://docs.lotu.sh/en+api). They will still need an auth token.

`RemoteListenAddress` must be set to an address which other nodes on your network will be able to reach.

Next, you will need to [create an authentication token](https://docs.lotu.sh/en+api-scripting-support#generate-a-jwt-46). All Lotus APIs require authentication tokens to ensure your processes are as secure against attackers attempting to make unauthenticated requests to them.

### Setting up the Lotus Worker

On the machine that will run `lotus-worker`, set the `STORAGE_API_INFO` environment variable to `TOKEN:STORAGE_NODE_MULTIADDR`. Where `TOKEN` is the token we created above, and `STORAGE_NODE_MULTIADDR` is the `multiaddr` of the **Lotus Storage Miner** API that was set in `config.toml`.

Generally, you will want the worker to be sealing on fast (NVMe) SSDs. By default, the worker will store its data on `~/.lotusworker`. You can modify this with the `LOTUS_WORKER_PATH` environment variable.

### Starting the Lotus Worker

Once you have set up the lotus worker, run:

```sh
lotus-seal-worker run
```

To check that the **Lotus Worker** is connected to your **Lotus Storage Miner**, run `lotus-miner workers list` and check that the remote worker count has increased.

```sh
why@computer ~/lotus> lotus-miner workers list
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

## Enabling GPU acceleration on the worker

Many sealing tasks will be sped up _substantially_ using GPUs. At present, `lotus-worker` only works with NVIDIA GPUs.

You will need to install the appropriate GPU drivers for your distribution. This may require a system reboot. You will also need to set environment variables [enabling GPU acceleration](https://docs.filecoin.io/mine/storage-mining/#performance-tuning).

### Pipelining

You can control which tasks are executed by each worker through command line arguments.

Different tasks require different system resources, and you may improve performance by purpose building machines for each specific task.

The available arguments are `--addpiece`, `--precommit1`, `--unseal`, `--precommit2`, and `--commit`. The default setting for each stage is _true_.

### Running locally for manually managing process priority

You can also run the **Lotus Worker** on the same machine as your **Lotus Storage Miner**, so you can manually manage the process priority; such as with `nice` and `ionice`.

To do so you have to first **disable all seal task types** in the miner config. This is important to prevent conflicts between the two processes.

You can then run the storage miner on your local-loopback interface;

```sh
lotus-worker run --address 127.0.0.1:2345
```
