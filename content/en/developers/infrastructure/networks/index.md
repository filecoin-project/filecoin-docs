---
title: "Networks"
description: "Find out information about which networks are available, what their scheduled uptime is, and how you can connect to each network."
lead: "Find out information about which networks are available, what their scheduled uptime is, and how you can connect to each network."
draft: false
images: []
type: docs
menu:
  developers:
    parent: "lorem"
    identifier: "testnets-72882f7fc2bd635f217195194c89146a"
weight: 100
toc: true
aliases:
    - "/fvm/reference/networks/"
    - "/networks"
    - "/networks/available-networks"
    - "/networks/overview/"
---

## Available networks

Here is a quick summary of networks available for Filecoin development:

| Name | Type | Reset frequency | Faucet |
| ---- | ---- | --------------- | ------ |
| [Mainnet](#mainnet) | Production network | Never | None |
| [Calibnet](#calibration-testnet) | Test network | Rarely | [Available](https://faucet.calibration.fildev.network) |
| [Wallaby](#wallaby-testnet) | Test network | Weekly | [Available](https://wallaby.network/#faucet)

### Mainnet

Mainnet is the live production network for the Filecoin network. FIL has real-world value on this network. Mainnet began on block 148,888 and supports 32 GiB and 64 GiB sectors.

This network is maintained by [Protocol Labs](https://protocol.ai).

#### Genesis

- CAR file: `QmavMCf95w2UMYGD1J5GpHcWBWXR2jTFYmtAkgeroMmpk1`
- Reset timestamp: `2020-08-24T22:00:00Z`
- Genesis block CID: `bafy2bzacecnamqgqmifpluoeldx7zzglxcljo6oja4vrmtj7432rphldpdmm2`
- SHA1 digest: `4782cb42b4b01793b5cd9f593cc3dc87b6d3c7b4`

#### Network parameters

- Supported sector sizes: `32 GiB` and `64 GiB`
- Consensus miner min power: `10 TiB`
- Epoch duration seconds: `30`
- Expected leaders per epoch: `5`
- WindowPoSt proving period: `2880`
- WindowPoSt challenge window: `60`
- WindowPoSt period deadlines: `48`
- Pre-commit challenge delay: `150`

#### Bootstrap peers

You can use the following peers to bootstrap your node to mainnet.

```plaintext
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

#### Resources

- [Latest pruned chain snapshot](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car)
- [Latest full chain snapshot](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/complete_chain_with_finality_stateroots_latest.car)
- [Status page and incidents](https://filecoin.statuspage.io/)
- [Stats dashboard](https://stats.filecoin.io/)
- [Slack channel for updates: `#fil-network-announcements`](https://filecoinproject.slack.com/archives/C01AC6999KQ)
- [Slack Channel for questions: `#fil-help`](https://filecoinproject.slack.com/archives/CEGN061C5)

### Calibration testnet

The calibration test network, often called _Calibnet_, is the most realistic simulation of the Filecoin mainnet. Storage providers can experience more realistic sealing performance and hardware requirements due to the use of final proofs constructions and parameters. Storage clients can store and retrieve real data on the network. Clients can participate in deal-making workflows and storage/retrieval functionality. Calibnet has the same sector size as mainnet, and supports 32 GiB and 64 GiB sectors.

This network is maintained by [Protocol Labs](https://protocol.ai).

#### Genesis

- CAR file: `QmY581cXXtNwHweiC69jECupu9EBx274huHjSgxPNv1zAAj`
- Reset timestamp: `2021-02-19T23:10:00Z`
- Genesis block CID: `bafy2bzaceapb7hfdkewspic7udnogw4xnhjvhm74xy5snwa24forre5z4s2lm`
- SHA1 digest: `944c0c13172b9f552dfed5dfaffaba95113c8254`

#### Network parameters

- Supported Sector Sizes: `32 GiB` and `64 GiB`
- Consensus Miner Min Power: `32 GiB`
- Epoch Duration Seconds: `30`
- Expected Leaders per Epoch: `5`
- WindowPoSt Proving Period: `2880`
- WindowPoSt Challenge Window: `60`
- WindowPoSt Period Deadlines: `48`
- Pre-Commit Challenge Delay: `150`

#### Bootstrap peers

```plaintext
/dns4/bootstrap-0.calibration.fildev.network/tcp/1347/p2p/12D3KooWRLZAseMo9h7fRD6ojn6YYDXHsBSavX5YmjBZ9ngtAEec
/dns4/bootstrap-1.calibration.fildev.network/tcp/1347/p2p/12D3KooWJFtDXgZEQMEkjJPSrbfdvh2xfjVKrXeNFG1t8ioJXAzv
/dns4/bootstrap-2.calibration.fildev.network/tcp/1347/p2p/12D3KooWP1uB9Lo7yCA3S17TD4Y5wStP5Nk7Vqh53m8GsFjkyujD
/dns4/bootstrap-3.calibration.fildev.network/tcp/1347/p2p/12D3KooWLrPM4WPK1YRGPCUwndWcDX8GCYgms3DiuofUmxwvhMCn
```

#### Resources

- [Faucet](https://faucet.calibration.fildev.network/)
- [Stats dashboard](https://stats.calibration.fildev.network/)
- [Slack channel for updates: `#fil-network-announcements`](https://filecoinproject.slack.com/archives/C01AC6999KQ)
- [Slack channel for questions: `#fil-help`](https://filecoinproject.slack.com/archives/CEGN061C5)

### Wallaby testnet

The Wallaby testnet is a _bleeding-edge_ test network for the programmability features being developed for the FVM. You can deploy both WASM actors and EVM-compatible smart contracts to Wallaby. Wallaby is reset every week, making it unsuitable for long-term testing of applications. The purpose of Wallaby is to allow developers to quickly poke and prod at any new features released within the latest development builds of the FVM.

The Wallaby testnet is operated and maintained by [Factor8 Solutions](https://github.com/Factor8Solutions). You can find Wallaby-specific documentation written by Factor8 at [kb.factor8.dev/docs/filecoin/testnets/wallaby](https://kb.factor8.dev/docs/filecoin/testnets/wallaby).

## Deprecated networks

The following networks have been deprecated:

### Nerpanet

The Nerpa test network, often called _Nerpanet_, was designed with tiny sector sizes. This network was for application developers to test the very basic functionality of their applications before moving over to the calibration test network. It was deprecated on 2021-08-16.
