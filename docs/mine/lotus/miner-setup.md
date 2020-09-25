---
title: 'Lotus Miner: setup a high performance miner'
description: 'This guide describes the necessary steps to configure a Lotus miner for production.'
breadcrumb: 'Miner setup'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

::: warning
Mining will only work if you fully cover the [minimal hardware requirements](../hardware-requirements.md) for the network in which you will mine. As the mining process is very demanding for the machines on several aspects and relies on precise configuration, we strongly recommend Linux systems administration experience before embarking.
:::

[[TOC]]

## Pre-requisites

Before attempting to follow this guide:

- Make sure you meet the [minimal hardware requirements](../hardware-requirements.md).
- Make sure you have followed the instructions to [install the Lotus suite](../../get-started/lotus/installation.md) and make sure you have built Lotus with ["Native Filecoin FFI"](../../get-started/lotus/installation.md#native-filecoin-ffi). Once the installation is complete, `lotus`, `lotus-miner` and `lotus-worker` will be installed.
- Make sure your Lotus Node is running as the miner will communicate with it and cannot work otherwise.
- If you are in China, read the [tips for running in China](tips-running-in-china.md) page first.

::: callout
Be warned: if you decide to skip any of the sections below, things will not work! Read and tread carefully.
:::

## Before starting the miner

### Performance tweaks

It is recommended to set the following environment variables in your environment so that they are defined **every time any of the Lotus applications is launched** (meaning, when the daemons are started):

```sh
# See https://github.com/filecoin-project/bellman
export BELLMAN_CPU_UTILIZATION=0.875

# See https://github.com/filecoin-project/rust-fil-proofs/
export FIL_PROOFS_MAXIMIZE_CACHING=1 # More speed at RAM cost (1x sector-size of RAM - 32 GB).
export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # precommit2 GPU acceleration
export FIL_PROOFS_USE_GPU_TREE_BUILDER=1
```

### Running the miner on a different machine as the Lotus Node

If you opt to run a miner on a different machine as the Lotus Node, set:

```sh
export FULLNODE_API_INFO=<api_token>:/ip4/<lotus_daemon_ip>/tcp/<lotus_daemon_port>/http
```

and **make sure the `ListenAddress` has [remote access enabled](../../build/lotus/enable-remote-api-access.md)**. Instructions on how to obtain a token are [available here](../../build/lotus/api-token-generation.md).

Similarly, `lotus-miner` (as a client application to the Lotus Miner daemon), can talk to a remote miner by setting:

```sh
export MINER_API_INFO="TOKEN:/ip4/<IP>/tcp/<PORT>/http"
```

### Adding the necessary swap

If you have only 128GiB of RAM, you will need to make sure your system provides at least an extra 256GiB of very fast swap (preferably NVMe SSD) or you will be unable to seal sectors:

```sh
sudo fallocate -l 256G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
# show current swap spaces and take note of the current highest priority
swapon --show
# append the following line to /etc/fstab (ensure highest priority) and then reboot
# /swapfile swap swap pri=50 0 0
sudo reboot
# check a 256GB swap file is automatically mounted and has the highest priority
swapon --show
```

### Creating a new BLS wallet

You will need a BLS wallet (`t3...`) for mining. To create it, if you don't have one already, run:

```sh
lotus wallet new bls
```

Next make sure to [send some funds](../../get-started/lotus/send-and-receive-fil.md) to this address so that the miner setup can be completed.

::: tip
Safely [backup your wallets](../../get-started/lotus/send-and-receive-fil.md#exporting-and-importing-a-wallet)!
:::

### Downloading parameters

For the miner to start, it will need to read and verify the Filecoin proof parameters. These can be downloaded in advance (recommended), or otherwise the init process will. Proof parameters consist of several files totalling **over 100GiB**.

We recommend setting a custom location to store parameters and proofs parent cache -created during the first run- with:

```sh
export FIL_PROOFS_PARAMETER_CACHE=/path/to/folder/in/fast/disk
export FIL_PROOFS_PARENT_CACHE=/path/to/folder/in/fast/disk2
```

Parameters are read on every (re)start, so using disks with very fast access, like NVMe drives, will speed up miners and workers (re)boots. When the above variables are not set, things will end up in `/var/tmp/` by default, which **often lacks enough space**.

To download the parameters do:

```sh
# Use sectors supported by the Filecoin network that the miner will join and use.
# lotus-miner fetch-params <sector-size>
lotus-miner fetch-params 32GiB
lotus-miner fetch-params 64GiB
```

You can verify sectors sizes for a network in the [network dashboard](https://networks.filecoin.io). The `FIL_PROOFS_*_CACHE` variables should stay defined not only for download, but also when starting the Lotus miner (or workers).

## Checklist before launch

To summarize all of the above, make sure that:

- A BLS address exists and has some funds so that the miner can be initialized.
- The following environment variables have been defined and will be available for any Lotus miner runs:

  ```
  export LOTUS_MINER_PATH=/path/to/miner/config/storage
  export LOTUS_PATH=/path/to/lotus/node/folder # when using a local node
  export BELLMAN_CPU_UTILIZATION=0.875
  export FIL_PROOFS_MAXIMIZE_CACHING=1
  export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # when having GPU
  export FIL_PROOFS_USE_GPU_TREE_BUILDER=1   # when having GPU
  export FIL_PROOFS_PARAMETER_CACHE=/fast/disk/folder # > 100GiB!
  export FIL_PROOFS_PARENT_CACHE=/fast/disk/folder2   # > 50GiB!
  export TMPDIR=/fast/disk/folder3                    # Used when sealing.
  ```

- Parameters have been prefetched to the cache folders specified above.
- The systems has enough swap and it is active.

## Miner initialization

Before starting your miner for the first time run:

```sh
lotus-miner init --owner=<bls address>  --no-local-storage
```

- The `--no-local-storage` flag is used so that we can later configure [specific locations for storage](custom-storage-layout.md). This is optional but recommended.
- The Lotus Miner configuration folder is created at `~/.lotusminer/` or `$LOTUS_MINER_PATH` if set.

## Connectivity to the miner

Before you start your miner, it is **very important** to configure it so that it is reachable from any peer in the Filecoin network. For this you will need a stable public IP and edit your `~/.lotusminer/config.toml` as follows:

```toml
...
[Libp2p]
  ListenAddresses = ["/ip4/0.0.0.0/tcp/24001"] # choose a fixed port
  AnnounceAddresses = ["/ip4/<YOUR_PUBLIC_IP_ADDRESS>/tcp/24001"] # important!
...
```

Once you start your miner, [make sure you can connect to its public IP/port](connectivity.md).

## Starting the miner

You are now ready to start your Lotus miner:

```sh
lotus-miner run
```

or if you are using the systemd service file:

```sh
systemctl start lotus-miner
```

::: warning
**Do not proceed** from here until you have verified that your miner not only is running, but also [reachable on its public IP address](connectivity.md).
:::

## Publishing the miner addresses

Once the miner is up and running, publish your miner address (which you configured above) on the chain so that other nodes can talk to it directly and make deals:

```sh
lotus-miner actor set-addrs /ip4/<YOUR_PUBLIC_IP_ADDRESS>/tcp/24001
```

## Next steps

Your miner should now be preliminarly setup and running, but **there are still a few more recommended tasks** to be ready for prime-time:

- Setup your [custom storage layout](custom-storage-layout.md) (required if you used `--no-local-storage`).
- Edit the miner [configuration settings](miner-configuration.md) to fit your requirements.
- Learn what is a right moment to [shutdown/restart your miner](miner-lifecycle.md)
- Update `ExpectedSealDuration` with the time it takes your miner to seal a sector: discover it by [running a benchmark](benchmarks.md) or by [pledging a sector](sector-pledging.md) and noting down the time.
- Configure additional [seal workers](seal-workers.md) to increase the miner's capacity to seal sectors.
- Configure a [separate address for WindowPost messages](separate-address-window-post.md).
