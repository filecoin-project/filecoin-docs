---
title: Networks 
description: The Filecoin network has several different networks for testing, staging, and production purposes.
---

#  Networks

This page contains information on the [networks available](#available-networks) for Filecoin, along with [performance criteria and maintenance guidelines](#network-performance).

## Available networks

There are two networks available for Filecoin:

- [Mainnet](#mainnet), the only production Filecoin network.
- [Calibration](#calibration), the primary testing network for Filecoin. 

### Mainnet

Mainnet is the primary Filecoin network. Mainnet began on block 148,888. It supports 32 GiB and 64 GiB sectors.

**Maintainer**: Protocol Labs

**Resources**:

- [Latest chain snapshot (pruned)](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car)
- [Latest chain snapshot (full)](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/complete_chain_with_finality_stateroots_latest.car)
- [Status page and incidents](https://filecoin.statuspage.io/)
- [Stats dashboard](https://stats.filecoin.io/)
- [Slack Channel for Updates: #fil-mainnet-announcements](https://filecoinproject.slack.com/archives/C019UFEACBT)
- [Slack Channel for Questions: #fil-mainnet](https://filecoinproject.slack.com/archives/C0179RNEMU4)
- [Block explorer: 1475 Explorer](https://1475ipfs.com/#/blockBrowser)
- [Block explorer: Filfox](https://filfox.io/)
- [Block explorer: Filplorer](https://filplorer.com/)
- [Block explorer: Filscan](https://filscan.io/)
- [Block explorer: Filscout](https://filscout.io/)

**Genesis**:

- CAR File: `QmavMCf95w2UMYGD1J5GpHcWBWXR2jTFYmtAkgeroMmpk1`
- Reset Timestamp: `2020-08-24T22:00:00Z`
- Genesis Block CID: `bafy2bzacecnamqgqmifpluoeldx7zzglxcljo6oja4vrmtj7432rphldpdmm2`
- sha1 Digest: `4782cb42b4b01793b5cd9f593cc3dc87b6d3c7b4`

**Network parameters**:

- Supported Sector Sizes: `32 GiB` and `64 GiB`
- Consensus Miner Min Power: `10 TiB`
- Epoch Duration Seconds: `30`
- Expected Leaders per Epoch: `5`
- WindowPoSt Proving Period: `2880`
- WindowPoSt Challenge Window: `60`
- WindowPoSt Period Deadlines: `48`
- Pre-Commit Challenge Delay: `150`

**Bootstrap peers**:

```
/dns4/bootstrap-0.mainnet.filops.net/tcp/1347/p2p/12D3KooWCVe8MmsEMes2FzgTpt9fXtmCY7wrq91GRiaC8PHSCCBj
/dns4/bootstrap-1.mainnet.filops.net/tcp/1347/p2p/12D3KooWCwevHg1yLCvktf2nvLu7L9894mcrJR4MsBCcm4syShVc
/dns4/bootstrap-2.mainnet.filops.net/tcp/1347/p2p/12D3KooWEWVwHGn2yR36gKLozmb4YjDJGerotAPGxmdWZx2nxMC4
/dns4/bootstrap-3.mainnet.filops.net/tcp/1347/p2p/12D3KooWKhgq8c7NQ9iGjbyK7v7phXvG6492HQfiDaGHLHLQjk7R
/dns4/bootstrap-4.mainnet.filops.net/tcp/1347/p2p/12D3KooWL6PsFNPhYftrJzGgF5U18hFoaVhfGk7xwzD8yVrHJ3Uc
/dns4/bootstrap-5.mainnet.filops.net/tcp/1347/p2p/12D3KooWLFynvDQiUpXoHroV1YxKHhPJgysQGH2k3ZGwtWzR4dFH
/dns4/bootstrap-6.mainnet.filops.net/tcp/1347/p2p/12D3KooWP5MwCiqdMETF9ub1P3MbCvQCcfconnYHbWg6sUJcDRQQ
/dns4/bootstrap-7.mainnet.filops.net/tcp/1347/p2p/12D3KooWRs3aY1p3juFjPy8gPN95PEQChm2QKGUCAdcDCC4EBMKf
/dns4/bootstrap-8.mainnet.filops.net/tcp/1347/p2p/12D3KooWScFR7385LTyR4zU1bYdzSiiAb5rnNABfVahPvVSzyTkR
/dns4/lotus-bootstrap.ipfsforce.com/tcp/41778/p2p/12D3KooWGhufNmZHF3sv48aQeS13ng5XVJZ9E6qy2Ms4VzqeUsHk
/dns4/bootstrap-0.starpool.in/tcp/12757/p2p/12D3KooWGHpBMeZbestVEWkfdnC9u7p6uFHXL1n7m1ZBqsEmiUzz
/dns4/bootstrap-1.starpool.in/tcp/12757/p2p/12D3KooWQZrGH1PxSNZPum99M1zNvjNFM33d1AAu5DcvdHptuU7u
/dns4/node.glif.io/tcp/1235/p2p/12D3KooWBF8cpp65hp2u9LK5mh19x67ftAam84z9LsfaquTDSBpt
/dns4/bootstrap-0.ipfsmain.cn/tcp/34721/p2p/12D3KooWQnwEGNqcM2nAcPtRR9rAX8Hrg4k9kJLCHoTR5chJfz6d
/dns4/bootstrap-1.ipfsmain.cn/tcp/34723/p2p/12D3KooWMKxMkD5DMpSWsW7dBddKxKT7L2GgbNuckz9otxvkvByP
```

### Calibration

Calibration network is the most realistic simulation of the Filecoin mainnet:

- Prospective storage miners can experience more realistic sealing performance and hardware requirements due to the use of final proofs constructions and parameters.
- Prospective storage clients can store and retrieve real data on the network. Clients can participate in deal-making workflows and storage + retrieval functionality.
- Same sector size as mainnet. The calibration network supports 32 GiB and 64 GiB sectors.

**Maintainer**: Protocol Labs

**Resources**:

- [Faucet](https://faucet.calibration.fildev.network/)
- [Stats Dashboard](https://stats.calibration.fildev.network/)
- [Slack Channel for Updates: #fil-net-calibration-announce](https://filecoinproject.slack.com/archives/C01C5PT7ETC)
- [Slack Channel for Questions: #fil-net-calibration-discuss](https://filecoinproject.slack.com/archives/C01D42NNLMS)
- [Block explorer - Filscout for Calibration](https://calibration.filscout.com/en)
- [Block explorer - filscan for Calibration](https://calibration.filscan.io/)

**Genesis**:

- CAR File: `QmY581cXXtNwHweiC69jECupu9EBx274huHjSgxPNv1zAAj`
- Reset Timestamp: `2021-02-19T23:10:00Z`
- Genesis Block CID: `bafy2bzaceapb7hfdkewspic7udnogw4xnhjvhm74xy5snwa24forre5z4s2lm`
- sha1 Digest: `944c0c13172b9f552dfed5dfaffaba95113c8254`

**Network parameters**:

- Supported Sector Sizes: `32 GiB` and `64 GiB`
- Consensus Miner Min Power: `32 GiB`
- Epoch Duration Seconds: `30`
- Expected Leaders per Epoch: `5`
- WindowPoSt Proving Period: `2880`
- WindowPoSt Challenge Window: `60`
- WindowPoSt Period Deadlines: `48`
- Pre-Commit Challenge Delay: `150`

**Bootstrap peers**:

```
/dns4/bootstrap-0.calibration.fildev.network/tcp/1347/p2p/12D3KooWRLZAseMo9h7fRD6ojn6YYDXHsBSavX5YmjBZ9ngtAEec
/dns4/bootstrap-1.calibration.fildev.network/tcp/1347/p2p/12D3KooWJFtDXgZEQMEkjJPSrbfdvh2xfjVKrXeNFG1t8ioJXAzv
/dns4/bootstrap-2.calibration.fildev.network/tcp/1347/p2p/12D3KooWP1uB9Lo7yCA3S17TD4Y5wStP5Nk7Vqh53m8GsFjkyujD
/dns4/bootstrap-3.calibration.fildev.network/tcp/1347/p2p/12D3KooWLrPM4WPK1YRGPCUwndWcDX8GCYgms3DiuofUmxwvhMCn
```

### Deprecated networks

Here is a list of networks that are now deprecated:

| Name | Description | Deprecated on |
| --- | --- | --- |
| Nerpa | A test network with tiny sector sizes. This network was for app developers to test the very basic functionality of their applications before moving over to the calibration testnet. | 2021-09-16 |

## Network performance

The Filecoin Network is a decentralized storage market and network that provides data persistence via a decentralized protocol and publicly verifiable storage proofs on a blockchain. Current Filecoin network performance is primarily determined by security parameters and Filecoin's [proof constructions](https://spec.filecoin.io/#algorithms__pos).

It is highly non-trivial to provide highly reliable benchmarks for Filecoin network performance. However, as you begin interacting with Filecoin, you can use these heuristics to understand general Filecoin network performance and how it fits your use case.

### Financial transfers

A message that requires [transferring FIL](../get-started/lotus/send-and-receive-fil.md#sending-fil) is often extremely fast, and will take on average ~1 blocktime (or around 30 seconds) to be reflected on-chain. We consider 120 blocks (1 hour) a conservative number of confirmations for high-value transfers.

### Data storage

The Filecoin [data storage protocol](../store/lotus/store-data.md) has a few key components once a deal is proposed and accepted:

1. Funding the storage market actor: This process takes ~1-2 minutes and ensures that both the client and the miner have funds and collateral to pay for the deal.

2. Data transfer: This portion of the deal flow involves the client's node sending the relevant data to the mining node. The data transfer rate varies widely, depending on the client and the miner's network and disk bandwidths. Usually, the network speed between client and miner will be the critical determining factor.

3. Deal shows up on-chain: once the miner receives the data, they verify it to make sure it matches the deal parameters, and then they publish the deal on the chain.

4. Sector sealing: Once the deal shows up on-chain, the miner must still complete [generating a Proof-of-Replication and sealing the sector](https://spec.filecoin.io/#systems__filecoin_mining__sector__adding_storage). This process is currently estimated to take ~1.5hours for a 32 GB sector on a machine that meets these [minimum hardware requirements for mining](../mine/hardware-requirements.md#general-hardware-requirements).

For most storage clients, the most important metric is the time it takes from deal acceptance to deal appearance on-chain. This metric is the sum of steps (1) to (3) above. Based on current high-level benchmarks, these steps are estimated to take around ~5-10 minutes for a 1 MiB file.

### Data retrieval

There are two methods by which one can directly [retrieve data](../store/lotus/retrieve-data.md#overview) from the Filecoin network:

- **Fast retrieval**: By default, some Filecoin clients, like lotus, enable storage miners to store an unsealed copy of the stored data in addition to a sealed copy. The sealed copy is necessary for the ongoing storage proofs that a miner must submit, while the unsealed copy can be used for quicker retrievals of the data from the storage miner. While this is a valuable feature, there is no guarantee that all miners are storing extra unsealed copies of the stored data, as this is not a verifiable part of the protocol. In lotus, this feature is called _fast-retrieval_.
- **Retrieval after unsealing**: Because of the Filecoin protocol’s design, storage miners are essentially cryptographically guaranteed to store client data in its sealed format. Therefore, if the storage miner doesn’t have an unsealed copy of the data stored, they will have to unseal the sealed data first (i.e., decoding the encoded data) and then serve it back up to the requester (i.e., the retrieval client).

In both methods, the data retrieval process after a retrieval deal is accepted includes:

1. **Funding the payment channel for retrieval**: Similar to the storage deal payment channel funding above, except for data retrieval. The timing estimates for payment channel creation and funding are roughly the same as noted above.

2. **Unsealing (if needed)**: The miner unseals (decodes) the data so that the requester can read it. Sealing and unsealing are symmetric processes, which means they take roughly the same amount of time in either direction. Thus, the unsealing step is estimated to take around as long as the sealing step listed above, or around ~3hours for a 32 GiB sector on a machine running minimum hardware requirements.

3. **Data transfer**: The miner begins transferring the data back to the data requester. This is also transferred back at a rate similar to the original data transfer rate, which depends on several factors.

Because of the various steps involved in the data retrieval process, Filecoin storage currently meets similar performance bars as traditional _warm_ or _cold_ storage. To get performance that is similar to other hot storage solutions, most users utilize Filecoin with a caching layer such as IPFS. These hybrid and multi-tiered storage solutions use IPFS for hot storage and Filecoin for affordable, frequent, and versioned backups. Some example hybrid storage products include [Powergate](../build/powergate.md) and [Textile Buckets](../build/filecoin-pinning-services.md).

