---
title: "Available networks"
description: "The Filecoin network has several different networks for testing, staging, and production purposes."
weight: 10
menu:
    networks:
        parent: "networks-overview"
aliases:
    - /networks
---

This page contains information on the [networks available](#available-networks) for Filecoin.

{{< alert icon="tip" >}}**Looking for Glif nodes?**
The [Glif nodes section](https://lotus.filecoin.io/docs/developers/hosted-lotus/), along with all other Lotus-specific documentation, has moved to [lotus.filecoin.io](https://lotus.filecoin.io/docs/developers/hosted-lotus/)
{{< /alert >}}

## Available networks

There are two networks available for Filecoin:

- [Mainnet](#mainnet), the only production Filecoin network.
- [Calibration](#calibration), the primary testing network for Filecoin.

{{< alert icon="tip" >}}
Check the status of each network and subscribe to updates at [status.filecoin.io](https://status.filecoin.io).
{{< /alert >}}

### Mainnet

Mainnet is the primary Filecoin network. Mainnet began on block 148,888. It supports 32 GiB and 64 GiB sectors.

**Maintainer**: [Protocol Labs](https://protocol.ai)

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

**Resources**:

- [Latest chain snapshot (pruned)](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car)
- [Latest chain snapshot (full)](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/complete_chain_with_finality_stateroots_latest.car)
- [Status page and incidents](https://filecoin.statuspage.io/)
- [Stats dashboard](https://stats.filecoin.io/)
- [Slack Channel for Updates: #fil-mainnet-announcements](https://filecoinproject.slack.com/archives/C019UFEACBT)
- [Slack Channel for Questions: #fil-mainnet](https://filecoinproject.slack.com/archives/C0179RNEMU4)
- [Block explorer: Filfox](https://filfox.io/)
- [Block explorer: Filscan](https://filscan.io/)
- [Block explorer: Filscout](https://filscout.com/)

### Calibration

Calibration network is the most realistic simulation of the Filecoin mainnet:

- Prospective storage providers can experience more realistic sealing performance and hardware requirements due to the use of final proofs constructions and parameters.
- Prospective storage clients can store and retrieve real data on the network. Clients can participate in deal-making workflows and storage + retrieval functionality.
- Same sector size as mainnet. The calibration network supports 32 GiB and 64 GiB sectors.

**Maintainer**: [Protocol Labs](https://protocol.ai)

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
**Resources**:

- [Faucet](https://faucet.calibration.fildev.network/)
- [Stats Dashboard](https://stats.calibration.fildev.network/)
- [Slack Channel for Updates: #fil-net-calibration-announce](https://filecoinproject.slack.com/archives/C01C5PT7ETC)
- [Slack Channel for Questions: #fil-net-calibration-discuss](https://filecoinproject.slack.com/archives/C01D42NNLMS)
- [Block explorer - Filscout for Calibration](https://calibration.filscout.com/en)
- [Block explorer - filscan for Calibration](https://calibration.filscan.io/)

### Deprecated networks

Here is a list of networks that are now deprecated:

| Name | Description | Deprecated on |
| --- | --- | --- |
| Nerpa | A test network with tiny sector sizes. This network was for app developers to test the very basic functionality of their applications before moving over to the calibration testnet. | 2021-08-16 |
