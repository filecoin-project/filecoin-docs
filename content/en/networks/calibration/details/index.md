---
title: "Details"
description: "The calibration network is the most realistic testnet simulation of the Filecoin mainnet."
lead: "The calibration network is the most realistic testnet simulation of the Filecoin mainnet."
draft: false
images: []
type: docs
menu:
  networks:
    parent: "networks-calibration"
    identifier: "details-f75237b2d7edd2d77d413de509a99ca4"
weight: 100
toc: true
aliases:
    - "/networks/calibration"
    - "/networks/hyperspace/details/"
    - "/networks/hyperspace/explorers/"
    - "/networks/hyperspace/rpcs/"
    - "/networks/hyperspace/get-test-tokens/"
---

The Calibration testnet is the most realistic simulation of the Filecoin mainnet.

Prospective storage providers can experience more realistic sealing performance and hardware requirements using final proofs constructions and parameters. Storage clients can store and retrieve _real data_ on the network. Clients can also participate in deal-making workflows and storage and retrieval functionality. The sector size on the Calibration testnet is the same as on the Filecoin mainnet; 32 GiB and 64 GiB sectors are supported. This testnet also includes the Filecoin EVM-runtime features found on the Filecoin mainnet.

{{< alert >}}
**Large sector sizes**

A drawback of 32 GiB and 64 GiB sectors is that storage providers generally prefer deals that use a significant amount of the sector. This could cause issues for builders wanting to store less than 4 GiB of data. 

[PiKNiK](https://www.piknik.com/) is running a Boost-enabled storage provider that will listen out for small deals to solve this issue. The PiKNiK SP will attempt to aggregate these deals into 32 GiB sectors. If a deal has yet to be bundled into a 32 GiB sector after 12 hours, then the PiKNiK SP will publish it in whatever state it is in.
{{< /alert >}}

Developers can reference pre-existing deals that are already available on the network. [See the PiKNiK documentation for more details](#). See the [`#fil-net-calibration-discuss` channel in the Filecoin Slack](https://filecoinproject.slack.com/archives/C01D42NNLMS) for support.


**Maintainer**: [Protocol Labs](https://protocol.ai)

## Genesis

- CAR File: `QmY581cXXtNwHweiC69jECupu9EBx274huHjSgxPNv1zAAj`
- Reset Timestamp: `2021-02-19T23:10:00Z`
- Genesis Block CID: `bafy2bzaceapb7hfdkewspic7udnogw4xnhjvhm74xy5snwa24forre5z4s2lm`
- sha1 Digest: `944c0c13172b9f552dfed5dfaffaba95113c8254`

## Network parameters

- Supported Sector Sizes: `32 GiB` and `64 GiB`
- Consensus Miner Min Power: `32 GiB`
- Epoch Duration Seconds: `30`
- Expected Leaders per Epoch: `5`
- WindowPoSt Proving Period: `2880`
- WindowPoSt Challenge Window: `60`
- WindowPoSt Period Deadlines: `48`
- Pre-Commit Challenge Delay: `150`

## Bootstrap peers

```plaintext
/dns4/bootstrap-0.calibration.fildev.network/tcp/1347/p2p/12D3KooWRLZAseMo9h7fRD6ojn6YYDXHsBSavX5YmjBZ9ngtAEec
/dns4/bootstrap-1.calibration.fildev.network/tcp/1347/p2p/12D3KooWJFtDXgZEQMEkjJPSrbfdvh2xfjVKrXeNFG1t8ioJXAzv
/dns4/bootstrap-2.calibration.fildev.network/tcp/1347/p2p/12D3KooWP1uB9Lo7yCA3S17TD4Y5wStP5Nk7Vqh53m8GsFjkyujD
/dns4/bootstrap-3.calibration.fildev.network/tcp/1347/p2p/12D3KooWLrPM4WPK1YRGPCUwndWcDX8GCYgms3DiuofUmxwvhMCn
```

## Snapshots

- [Latest minimal snapshot](https://snapshots.calibrationnet.filops.net/minimal/latest.zst)

## Resources

- [Faucet](https://faucet.calibration.fildev.network/)
- [Stats Dashboard](https://stats.calibration.fildev.network/)
- [Slack Channel for Updates: #fil-network-announcements](https://filecoinproject.slack.com/archives/C01AC6999KQ)
- [Slack Channel for Questions: #fil-help](https://filecoinproject.slack.com/archives/CEGN061C5)
