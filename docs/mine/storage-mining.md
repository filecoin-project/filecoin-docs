---
title: Storage mining
---

# Storage Mining

Here are instructions to learn how to perform storage mining. For hardware specifications please read [this](https://docs.lotu.sh/en+hardware-mining).

It is useful to [join the Testnet](https://docs.lotu.sh/en+join-testnet) prior to attempting storage mining for the first time.

## Note: Using the Lotus Storage Miner from China

If you are trying to use `lotus-miner` from China. You should set this **environment variable** on your machine.

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
$ lotus-miner init --owner=t3qjqisfrvadkraeqp3jlru4sfayakztcq4rt2mbx2uwflluuxchht6tp4i4q2egvmjodrvr2x76bgrlu3zgkq --sector-size=32GiB

2020-08-18T07:41:23.917-0700    INFO    main    lotus-storage-miner/init.go:110 Initializing lotus storage miner
2020-08-18T07:41:23.917-0700    INFO    main    lotus-storage-miner/init.go:130 Checking proof parameters
2020-08-18T07:41:23.917-0700    INFO    build   go-paramfetch@v0.0.2-0.20200701152213-3e0f0afdc261/paramfetch.go:138    Parameter file /var/tmp/filecoin-proof-parameters/v27-proof-of-spacetime-fallback-merkletree-poseidon_hasher-8-0-0-0170db1f394b35d995252228ee359194b13199d259380541dc529fb0099096b0.vk is ok
2020-08-18T07:41:23.917-0700    INFO    build   go-paramfetch@v0.0.2-0.20200701152213-3e0f0afdc261/paramfetch.go:138    Parameter file /var/tmp/filecoin-proof-parameters/v27-stacked-proof-of-replication-merkletree-poseidon_hasher-8-0-0-sha256_hasher-032d3138d22506ec0082ed72b2dcba18df18477904e35bafee82b3793b06832f.vk is ok

...
```

This process will take about 10 minutes to finish. Eventually it will say something like:

```bash
2020-08-18T07:59:10.475-0700    INFO    badger  v2@v2.0.3/levels.go:888 Got compaction priority: {level:0 score:1.73 dropPrefix:[]}
2020-08-18T07:59:10.478-0700    INFO    main    lotus-storage-miner/init.go:252 Storage miner successfully created, you can now start it with 'lotus-miner run'
```

## Mining

To mine:

```bash
$ lotus-miner run

2020-08-18T08:00:29.590-0700    INFO    main    lotus-storage-miner/run.go:81   Checking full node sync status
Worker 0: Target: [bafy2bzacecrxfiiy2lsb5covivnvrv6nihpihqm7s5mzpw7bjzvhsmzsjuv5e]      State: complete Height: 209461

...
```

If you are downloading **Filecoin Proof Parameters**, the download can take some time.

Get information about your miner:

```sh
$ lotus-miner info
# example: miner id `t0111`
```

**Seal** random data to start producing **PoSts**:

```sh
$ lotus-miner sectors pledge
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

This env var can be used with `lotus-miner`, `lotus-seal-worker`, and `lotus-bench` to make the precommit1 step faster at the cost of some memory use (1x sector size)

### `FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1` Environment variable

This env var can be used with `lotus-miner`, `lotus-seal-worker`, and `lotus-bench` to enable experimental precommit2 GPU acceleration

### Setting multiaddresses

Set multiaddresses for the miner to listen on in a miner's `config.toml` file
(by default, it is located at `~/.lotusminer/config.toml`). The `ListenAddresses` in this file should be interface listen addresses (usually `/ip4/0.0.0.0/tcp/PORT`), and the `AnnounceAddresses` should match the addresses being passed to `set-addrs`.

The addresses passed to `set-addrs` parameter in the commands below should be currently active and dialable; confirm they are before entering them.

Once the config file has been updated, set the on-chain record of the miner's listen addresses:

```
lotus-miner actor set-addrs <multiaddr_1> <multiaddr_2> ... <multiaddr_n>
```

This updates the `MinerInfo` object in the miner's actor, which will be looked up
when a client attempts to make a deal. Any number of addresses can be provided.

Example:

```
$ lotus-miner actor set-addrs /ip4/123.123.73.123/tcp/12345 /ip4/223.223.83.223/tcp/23456
```


## Configuration

### API

Default config:

```toml
[API]
ListenAddress = "/ip4/127.0.0.1/tcp/2345/http" 
RemoteListenAddress = "127.0.0.1:2345"
Timeout = "30s"
```

To make your node accessible over the local area network, you will need to determine your machine's IP on the LAN, and change the `127.0.0.1` in the file to that address.

A more permissive and less secure option is to change it to `0.0.0.0`. This will allow anyone who can connect to your computer on that port to access the [API](https://docs.lotu.sh/en+api). They will still need an auth token.

`RemoteListenAddress` must be set to an address which other nodes on your network will be able to reach.

### Libp2p

Default config:

```toml
ListenAddresses = ["/ip4/0.0.0.0/tcp/0", "/ip6/::/tcp/0"]
AnnounceAddresses = []
NoAnnounceAddresses = []
ConnMgrLow = 150
ConnMgrHigh = 180
ConnMgrGrace = "20s"
```

`AnnounceAddresses` is the address list that you miner can be dialable from other IP addresses in the network. Follow the [guide](https://docs.filecoin.io/mine/connectivity/#manually-setting-an-ip-address) to manually setting an IP address.
On the other hand, `NoAnnounceAddress` is the address list that cannot be dialable from any other public IP address.

Connection manager will start to prune the existing connection if the number of the connection established hits the value set for `ConnMgrHigh` until it hits the value set for `ConnMgrLow`. During the pruning process, the ones that has been connected less then the duration set in `ConnMgrGrace` will be automatically closed.

### Dealmaking

Default config:

```toml
ConsiderOnlineStorageDeals = true
ConsiderOfflineStorageDeals = true
ConsiderOnlineRetrievalDeals = true
ConsiderOfflineRetrievalDeals = true
PieceCidBlocklist = []
ExpectedSealDuration = "12h0m0s"
Filter = ""
```

If you have specific deals that you don't want to store/retrieve, you can block them by adding the cids in `PieceCidBlocklist`.

`ExpectedSealDuration` is an estimate of how long sealing will take, and is used to reject deals whose start epoch might be earlier than the expected completion of sealing.

To filter deals based on certain parameters, modify the `Filter` param. This param should be a shell command that will be run when processing a deal proposal. Deals are accepted if the Filter's exit code is 0. For any other exit code, deals will be rejected. Set `Filter` to `false` to reject all deals and `true` to accept all deals.

### Sealing

Default config:

```toml
MaxWaitDealsSectors = 2
MaxSealingSectors = 0
MaxSealingSectorsForDeals = 0
WaitDealsDelay = "1h0m0s"
```

`MaxWaitDealsSectors` is the upper bound on how many sectors can be waiting for more deals to be packed in it before it begins sealing at any given time. `MaxSealingSectors`/`MaxSealingSectorForDeal` is the the upper bound on how many sectors can be sealing(for deals) at any given time. Note that if the value is set to 0, it means infinity.

`WaitDealsDealy` is the period of time that a newly created sector will wait for more deals to be packed in to before it starts to seal.


###  Storage

Default config:

```toml
ParallelFetchLimit = 10
AllowAddPiece = true
AllowPreCommit1 = true
AllowPreCommit2 = true
AllowCommit = true
AllowUnseal = true
```

`ParallelFetchLimit` is the upper bound on how many sectors can fetch sector data at the same time.

Set the rest of the params to `true` if you want to enable the miner to do the operation, and set the value to `false` to disable.


### Fees

Default config:

```toml
MaxPreCommitGasFee = "0.05 FIL"
MaxCommitGasFee = "0.05 FIL"
MaxWindowPoStGasFee = "50 FIL"
```

These are the max gas fee the miner is willing to pay for a specific operation. Increase the gas fee can accelerate your messages.