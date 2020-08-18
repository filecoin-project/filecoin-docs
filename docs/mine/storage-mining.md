---
title: Storage mining
---

# Storage Mining

Here are instructions to learn how to perform storage mining. For hardware specifications please read [this](https://docs.lotu.sh/en+hardware-mining).

It is useful to [join the Testnet](https://docs.lotu.sh/en+join-testnet) prior to attempting storage mining for the first time.

## Note: Using the Lotus Storage Miner from China

If you are trying to use `lotus-storage-miner` from China. You should set this **environment variable** on your machine.

```sh
IPFS_GATEWAY="https://proof-parameters.s3.cn-south-1.jdcloud-oss.com/ipfs/"
```

## Get started

Please ensure that at least one **BLS address** (starts with `t3`) in your wallet exists with the following command:

```sh
$ lotus wallet list
```

If you do not have a bls address, create a new bls wallet:

```sh
$ lotus wallet new bls
```

Initialize your Lotus node as miner:

```bash
$ lotus-storage-miner init --owner=t3qjqisfrvadkraeqp3jlru4sfayakztcq4rt2mbx2uwflluuxchht6tp4i4q2egvmjodrvr2x76bgrlu3zgkq --sector-size=32GiB

2020-08-18T07:41:23.917-0700    INFO    main    lotus-storage-miner/init.go:110 Initializing lotus storage miner
2020-08-18T07:41:23.917-0700    INFO    main    lotus-storage-miner/init.go:130 Checking proof parameters
2020-08-18T07:41:23.917-0700    INFO    build   go-paramfetch@v0.0.2-0.20200701152213-3e0f0afdc261/paramfetch.go:138    Parameter file /var/tmp/filecoin-proof-parameters/v27-proof-of-spacetime-fallback-merkletree-poseidon_hasher-8-0-0-0170db1f394b35d995252228ee359194b13199d259380541dc529fb0099096b0.vk is ok
2020-08-18T07:41:23.917-0700    INFO    build   go-paramfetch@v0.0.2-0.20200701152213-3e0f0afdc261/paramfetch.go:138    Parameter file /var/tmp/filecoin-proof-parameters/v27-stacked-proof-of-replication-merkletree-poseidon_hasher-8-0-0-sha256_hasher-032d3138d22506ec0082ed72b2dcba18df18477904e35bafee82b3793b06832f.vk is ok

...
```

This process will take about 10 minutes to finish. Eventually it will say something like:

```bash
2020-08-18T07:59:10.475-0700    INFO    badger  v2@v2.0.3/levels.go:888 Got compaction priority: {level:0 score:1.73 dropPrefix:[]}
2020-08-18T07:59:10.478-0700    INFO    main    lotus-storage-miner/init.go:252 Storage miner successfully created, you can now start it with 'lotus-storage-miner run'
```

## Mining

To mine:

```bash
$ lotus-storage-miner run

2020-08-18T08:00:29.590-0700    INFO    main    lotus-storage-miner/run.go:81   Checking full node sync status
Worker 0: Target: [bafy2bzacecrxfiiy2lsb5covivnvrv6nihpihqm7s5mzpw7bjzvhsmzsjuv5e]      State: complete Height: 209461

...
```

If you are downloading **Filecoin Proof Parameters**, the download can take some time.

Get information about your miner:

```sh
$ lotus-storage-miner info
# example: miner id `t0111`
```

**Seal** random data to start producing **PoSts**:

```sh
$ lotus-storage-miner sectors pledge
```

- Warning: On Linux configurations, this command will write data to `$TMPDIR` which is not usually the largest partition. You should point the value to a larger partition if possible.

Get **miner power** and **sector usage**:

```sh
$ lotus state power
# returns total power

$ lotus state power <miner>

$ lotus state sectors <miner>
```

## Performance tuning

### `FIL_PROOFS_MAXIMIZE_CACHING=1` Environment variable

This env var can be used with `lotus-storage-miner`, `lotus-seal-worker`, and `lotus-bench` to make the precommit1 step faster at the cost of some memory use (1x sector size)

### `FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1` Environment variable

This env var can be used with `lotus-storage-miner`, `lotus-seal-worker`, and `lotus-bench` to enable experimental precommit2 GPU acceleration

### Setting multiaddresses

Set multiaddresses for the miner to listen on in a miner's `config.toml` file
(by default, it is located at `~/.lotusminer/config.toml`). The `ListenAddresses` in this file should be interface listen addresses (usually `/ip4/0.0.0.0/tcp/PORT`), and the `AnnounceAddresses` should match the addresses being passed to `set-addrs`.

The addresses passed to `set-addrs` parameter in the commands below should be currently active and dialable; confirm they are before entering them.

Once the config file has been updated, set the on-chain record of the miner's listen addresses:

```
lotus-storage-miner actor set-addrs <multiaddr_1> <multiaddr_2> ... <multiaddr_n>
```

This updates the `MinerInfo` object in the miner's actor, which will be looked up
when a client attempts to make a deal. Any number of addresses can be provided.

Example:

```
$ lotus-storage-miner actor set-addrs /ip4/123.123.73.123/tcp/12345 /ip4/223.223.83.223/tcp/23456
```
