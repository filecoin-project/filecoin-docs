---
description: >-
  The calibration network is the most realistic testnet simulation of the
  Filecoin mainnet.
---

# Calibration

Prospective storage providers can experience more realistic sealing performance and hardware requirements using final proofs constructions and parameters. Storage clients can store and retrieve _real data_ on the network. Clients can also participate in deal-making workflows and storage and retrieval functionality. The sector size on the Calibration testnet is the same as on the Filecoin mainnet; 32 GiB and 64 GiB sectors are supported. This testnet also includes the Filecoin EVM-runtime features found on the Filecoin mainnet.

Developers can reference pre-existing deals that are already available on the network. See the [`#fil-net-calibration-discuss` channel in the Filecoin Slack](https://filecoinproject.slack.com/archives/C01D42NNLMS) for support.

**Maintainer**: [Protocol Labs](https://protocol.ai/)

## Genesis <a href="#genesis" id="genesis"></a>

* CAR File: `QmbHZuVjgtxvgtcE5H3FpE1ywEyawYmZcbx4Eh47WZ7YF8`
* Reset Timestamp: `1667326380` (`2022-11-01T18:13:00Z`)
* Genesis Block CID: `bafy2bzacecyaggy24wol5ruvs6qm73gjibs2l2iyhcqmvi7r7a4ph7zx3yqd4`
* SHA-1 Digest: `f9004d1266e0b023a018eb2fe6bb403cb8204df4`

## Network parameters <a href="#network-parameters" id="network-parameters"></a>

* Supported Sector Sizes: `32 GiB` and `64 GiB`
* Consensus Miner Min Power: `32 GiB`
* Epoch Duration Seconds: `30`
* Expected Leaders per Epoch: `5`
* WindowPoSt Proving Period: `2880`
* WindowPoSt Challenge Window: `60`
* WindowPoSt Period Deadlines: `48`
* Pre-Commit Challenge Delay: `150`

## Bootstrap peers <a href="#bootstrap-peers" id="bootstrap-peers"></a>

```
/dns4/bootstrap-0.calibration.fildev.network/tcp/1347/p2p/12D3KooWCi2w8U4DDB9xqrejb5KYHaQv2iA2AJJ6uzG3iQxNLBMy
/dns4/bootstrap-1.calibration.fildev.network/tcp/1347/p2p/12D3KooWDTayrBojBn9jWNNUih4nNQQBGJD7Zo3gQCKgBkUsS6dp
/dns4/bootstrap-2.calibration.fildev.network/tcp/1347/p2p/12D3KooWNRxTHUn8bf7jz1KEUPMc2dMgGfa4f8ZJTsquVSn3vHCG
/dns4/bootstrap-3.calibration.fildev.network/tcp/1347/p2p/12D3KooWFWUqE9jgXvcKHWieYs9nhyp6NF4ftwLGAHm4sCv73jjK
```

## Snapshots <a href="#snapshots" id="snapshots"></a>

* [Latest minimal snapshot](https://snapshots.calibrationnet.filops.net/minimal/latest.zst)

## Active storage providers <a href="#active-storage-providers" id="active-storage-providers"></a>

The following storage providers are running on the Calibration testnet.

### [PiKNiK](https://github.com/benjaminh83/fvm-calib-deal-miners) <a href="#piknikhttpsgithubcombenjaminh83fvm-calib-deal-miners" id="piknikhttpsgithubcombenjaminh83fvm-calib-deal-miners"></a>

* **t017840**: Every deal accepted by this SP will be aggregated into 32 GiB sectors, which is the minimum size for calibration network. This miner has a preset sealing capacity of 2x 32 GiB sectors per day, defined as sectors in waitdeals will be flushed every 12 hours. [More information](https://github.com/benjaminh83/fvm-calib-deal-miners)

## Resources <a href="#resources" id="resources"></a>

* [Faucet](https://faucet.calibration.fildev.network/)
* [DataCap allocation](https://faucet.calibration.fildev.network/)
* [Stats Dashboard](https://stats.calibration.fildev.network/)
* [Slack Channel for Updates: #fil-network-announcements](https://filecoinproject.slack.com/archives/C01AC6999KQ)
* [Slack Channel for Questions: #fil-help](https://filecoinproject.slack.com/archives/CEGN061C5)
* [Latest lightweight snapshot](https://forest.chainsafe.io/calibnet/snapshot-latest) generated with [Forest](http://github.com/ChainSafe/forest) by [ChainSafe](https://chainsafe.io/)
