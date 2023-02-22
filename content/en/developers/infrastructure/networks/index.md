---
title: "Networks"
description: "Find out information about which networks are available, what their scheduled uptime is, and how you can connect to each network."
lead: "The Filecoin network has several different networks for testing, staging, and production purposes. This page contains information on the [networks available](#available-networks) for Filecoin."
draft: false
images: []
type: docs
menu:
  developers:
    identifier: "testnets-72882f7fc2bd635f217195194c89146a"
weight: 250
toc: true
aliases:
    - "/fvm/reference/networks/"
    - "/networks"
    - "/networks/available-networks"
    - "/networks/overview/"
---

## Available networks

There are several networks available for Filecoin:

- [Mainnet](#mainnet), the only production Filecoin network.
- [Calibration](#calibration), a test network for storage providers to test their node configuration.
- [Hyperspace](#hyperspace), the primary test network for smart-contract and actor developers.

{{< alert  >}}
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

**Resources**:

- [Latest chain snapshot (pruned)](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car)
- [Latest chain snapshot (full)](https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/complete_chain_with_finality_stateroots_latest.car)
- [Status page and incidents](https://filecoin.statuspage.io/)
- [Stats dashboard](https://stats.filecoin.io/)
- [Slack Channel for Updates: #fil-network-announcements](https://filecoinproject.slack.com/archives/C01AC6999KQ)
- [Slack Channel for Questions: #fil-help](https://filecoinproject.slack.com/archives/CEGN061C5)
- [Block explorer: Filfox](https://filfox.io/)
- [Block explorer: Filscan](https://filscan.io/)
- [Block explorer: Filscout](https://filscout.com/)
- [Message and CID search: Glif Explorer](https://explorer.glif.io/)

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

```plaintext
/dns4/bootstrap-0.calibration.fildev.network/tcp/1347/p2p/12D3KooWRLZAseMo9h7fRD6ojn6YYDXHsBSavX5YmjBZ9ngtAEec
/dns4/bootstrap-1.calibration.fildev.network/tcp/1347/p2p/12D3KooWJFtDXgZEQMEkjJPSrbfdvh2xfjVKrXeNFG1t8ioJXAzv
/dns4/bootstrap-2.calibration.fildev.network/tcp/1347/p2p/12D3KooWP1uB9Lo7yCA3S17TD4Y5wStP5Nk7Vqh53m8GsFjkyujD
/dns4/bootstrap-3.calibration.fildev.network/tcp/1347/p2p/12D3KooWLrPM4WPK1YRGPCUwndWcDX8GCYgms3DiuofUmxwvhMCn
```

**Resources**:

- [Faucet](https://faucet.calibration.fildev.network/)
- [Stats Dashboard](https://stats.calibration.fildev.network/)
- [Slack Channel for Updates: #fil-network-announcements](https://filecoinproject.slack.com/archives/C01AC6999KQ)
- [Slack Channel for Questions: #fil-help](https://filecoinproject.slack.com/archives/CEGN061C5)
- [Block explorer - Filscout for Calibration](https://calibration.filscout.com/en)
- [Block explorer - filscan for Calibration](https://calibration.filscan.io/)

### Hyperspace

The Hyperspace testnet is a pre-production developer focused testnet. This network is designed for developers to build and test their toolings, applications, smart contracts, and actors on a public network. Developers should consider the Hyperspace testnet stable as it will only be reset under catastrophic circumstances.

Supports `512 MiB`, `32 GiB`, and `64 GiB` sectors.

**Maintainer:** [@f8-fil-ops](https://github.com/f8-fil-ops)

#### Genesis

- CAR File: `Qmbu9g75GMjbokCNHPQPXAyKZoY8NqVYtkY4PQT7Zvp2T6`
- Reset Timestamp: `2023-01-16T6:00:00Z`
- Genesis Block CID: `bafy2bzacebqfpeylmrl4h3pq4ofbdj2bfbw2i45fuy6qm4wxcyebpsxhrpqhu`
- sha1 Digest: `52d82b6fcad138a726477152ff2543a91f2b83f8`

#### Network parameters

- Supported Sector Sizes: `512 MiB` and `32 GiB` and `64 GiB`
- Consensus Miner Min Power: `16 GiB`
- Epoch Duration Seconds: `30`
- Expected Leaders per Epoch: `5`
- WindowPoSt Proving Period: `2880`
- WindowPoSt Challenge Window: `60`
- WindowPoSt Period Deadlines: `48`
- Pre-Commit Challenge Delay: `10`

#### Bootstrap peers

```plaintext
/dns4/de0.bootstrap.hyperspace.yoga/tcp/31000/p2p/12D3KooWRiwg6EHAJMR5w3DZTgpS5W4ncWPSVP2Mr1o4ey1RYSQo
/dns4/de1.bootstrap.hyperspace.yoga/tcp/31000/p2p/12D3KooWM9HZsp1bh5jNu2m9FBSbkKSeSWUPPuDBQiiMfPDBAK3U
/dns4/au0.bootstrap.hyperspace.yoga/tcp/31000/p2p/12D3KooWLup1gTdG9ipt3bSUyPCmM4CT86p9nNe12oqrCX8Zo8Na
/dns4/ca0.bootstrap.hyperspace.yoga/tcp/31000/p2p/12D3KooWNJ4evKioh6gexD4fyvyeFecNtp2oTEPTyp3jtSQ3pWaP
/dns4/sg0.bootstrap.hyperspace.yoga/tcp/31000/p2p/12D3KooWCENec46HHByaJKzbjSqz9TqVdSxSAdi9FKNwdMvfw3vp
```

#### Snapshots

- [Latest chain snapshot (pruned)](https://snapshots.hyperspace.yoga/hyperspace-latest-pruned.car)
- [Latest chain snapshot (full)](https://snapshots.hyperspace.yoga/hyperspace-latest-full.car)

#### FVM release

- [FVM M2.1 Carbonado.2 (rr11)](https://github.com/filecoin-project/ref-fvm/issues/1371)
- Lotus commit: [2a3989e4bd446b7f6ccee52ad6387b937072cf7f](https://github.com/filecoin-project/lotus/commit/2a3989e4bd446b7f6ccee52ad6387b937072cf7f)
- [List of FVM releases](https://github.com/filecoin-project/ref-fvm/issues/692)

#### Faucets

- [Beryx by Zondax](https://beryx.zondax.ch/faucet)
- [Hyperspace.yoga](https://hyperspace.yoga/#faucet)

    - The faucet currently emits 5 tFIL per request with a max of 5 requests / wallet (to prevent draining attacks). If you are setting up a storage provider you may need more tFIL than this. Reach out to on [#fil-net-hyperspace-discuss](https://filecoinproject.slack.com/archives/C04JEJB82RY) for assistance.


#### Block Explorers

- [Beryx](https://beryx.zondax.ch)
- [Filfox](https://hyperspace.filfox.info/en)
- [Filscan](https://hyperspace.filscan.io/)
- [Glif Explorer](https://explorer.glif.io/?network=hyperspace)
- [Starboard](https://fvm.starboard.ventures/)

#### Public RPC Endpoints

These endpoints are limited to all read-only Filecoin JSON RPC API calls and `MPoolPush` for sending preemptively signed messages.

##### [Glif](https://glif.io)

- HTTPS: `https://api.hyperspace.node.glif.io/rpc/v1`
- WebSockets: `wss://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1`
- Lotus lite-node command: `FULLNODE_API_INFO=wss://wss.hyperspace.node.glif.io/apigw/lotus lotus daemon --lite`

##### [ChainStack](https://chainstack.com/labs/#filecoin)

- HTTPS: `https://filecoin-hyperspace.chainstacklabs.com/rpc/v0`
- WebSockets: `wss://ws-filecoin-hyperspace.chainstacklabs.com/rpc/v0`

##### [Ankr](https://ankr.com)

- HTTPS: `https://rpc.ankr.com/filecoin_testnet`
- [Ankr documentation](https://www.ankr.com/docs/rpc-service/chains/chains-list/#filecoin)

#### Resources

- [Chain index](https://beryx.zondax.ch/)
- [CID Checker](https://hyperspace.filecoin.tools/)
- [Data cap request form](https://hyperspace.yoga/#notary)
- [Hyperspace specific docs](https://kb.factor8.io/en/docs/filecoin/testnets/hyperspace)
- [Network status](https://status.filecoin.io/)
- [Reputation systems](https://hyperspace.filrep.io)
- Slack Channel for Updates: [#fil-net-hyperspace-discuss](https://filecoinproject.slack.com/archives/C04JEJB82RY)
- [Storage providers auto-accepting storage deals and simulating faults](https://kb.factor8.io/en/docs/filecoin/testnets/hyperspace/support-miners)

## Deprecated networks

The following networks have been deprecated:

### Nerpanet

The Nerpa test network, often called _Nerpanet_, was designed with tiny sector sizes. This network was for application developers to test the very basic functionality of their applications before moving over to the calibration test network. It was deprecated on 2021-08-16.

### Wallaby

The Wallaby test network, often just called _Wallaby_, was designed for internal Filecoin developers to test new features before rolling them out to the Hyperspace testnet, and then onto Mainnet. Wallaby was designed to be reset every week. It was deprecated on 2023-02-07.
