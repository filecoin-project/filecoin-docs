---
title: "Details"
description: "The Hyperspace testnet is a pre-production developer-focused test network for the Filecoin network."
lead: "The Hyperspace testnet is a pre-production developer focused testnet. This network is designed for developers to build and test their toolings, applications, smart contracts, and actors on a public network. Developers should consider the Hyperspace testnet stable as it will only be reset under catastrophic circumstances."
draft: false
images: []
type: docs
menu:
  networks:
    parent: "networks-hyperspace"
    identifier: "details-99ac2d1ae70dd2547ed5bd79734d237f"
weight: 210
toc: true
aliases:
    - "/networks/hyperspace"
    - "/developers/infrastructure/networks/"
---

Supports `512 MiB`, `32 GiB`, and `64 GiB` sectors.

**Maintainer:** [@f8-fil-ops](https://github.com/f8-fil-ops)

## Genesis

- CAR File: `Qmbu9g75GMjbokCNHPQPXAyKZoY8NqVYtkY4PQT7Zvp2T6`
- Reset Timestamp: `2023-01-16T6:00:00Z`
- Genesis Block CID: `bafy2bzacebqfpeylmrl4h3pq4ofbdj2bfbw2i45fuy6qm4wxcyebpsxhrpqhu`
- sha1 Digest: `52d82b6fcad138a726477152ff2543a91f2b83f8`

## Network parameters

- Supported Sector Sizes: `512 MiB` and `32 GiB` and `64 GiB`
- Consensus Miner Min Power: `16 GiB`
- Epoch Duration Seconds: `30`
- Expected Leaders per Epoch: `5`
- WindowPoSt Proving Period: `2880`
- WindowPoSt Challenge Window: `60`
- WindowPoSt Period Deadlines: `48`
- Pre-Commit Challenge Delay: `10`

## Bootstrap peers

```plaintext
/dns4/de0.bootstrap.hyperspace.yoga/tcp/31000/p2p/12D3KooWRiwg6EHAJMR5w3DZTgpS5W4ncWPSVP2Mr1o4ey1RYSQo
/dns4/de1.bootstrap.hyperspace.yoga/tcp/31000/p2p/12D3KooWM9HZsp1bh5jNu2m9FBSbkKSeSWUPPuDBQiiMfPDBAK3U
/dns4/au0.bootstrap.hyperspace.yoga/tcp/31000/p2p/12D3KooWLup1gTdG9ipt3bSUyPCmM4CT86p9nNe12oqrCX8Zo8Na
/dns4/ca0.bootstrap.hyperspace.yoga/tcp/31000/p2p/12D3KooWNJ4evKioh6gexD4fyvyeFecNtp2oTEPTyp3jtSQ3pWaP
/dns4/sg0.bootstrap.hyperspace.yoga/tcp/31000/p2p/12D3KooWCENec46HHByaJKzbjSqz9TqVdSxSAdi9FKNwdMvfw3vp
```

## Snapshots

- [Latest chain snapshot (pruned)](https://snapshots.hyperspace.yoga/hyperspace-latest-pruned.car)
- [Latest chain snapshot (full)](https://snapshots.hyperspace.yoga/hyperspace-latest-full.car)

## FVM release

- [FVM M2.1 Carbonado.2 (rr11)](https://github.com/filecoin-project/ref-fvm/issues/1371)
- Lotus commit: [2a3989e4bd446b7f6ccee52ad6387b937072cf7f](https://github.com/filecoin-project/lotus/commit/2a3989e4bd446b7f6ccee52ad6387b937072cf7f)
- [List of FVM releases](https://github.com/filecoin-project/ref-fvm/issues/692)

#### Faucets

- [Beryx by Zondax](https://beryx.zondax.ch/faucet)
- [Hyperspace.yoga](https://hyperspace.yoga/#faucet)

    - The faucet currently emits 5 tFIL per request with a max of 5 requests / wallet (to prevent draining attacks). If you are setting up a storage provider you may need more tFIL than this. Reach out to on [#fil-net-hyperspace-discuss](https://filecoinproject.slack.com/archives/C04JEJB82RY) for assistance.

## Resources

- [Chain index](https://beryx.zondax.ch/)
- [CID Checker](https://hyperspace.filecoin.tools/)
- [Data cap request form](https://hyperspace.yoga/#notary)
- [Hyperspace specific docs](https://kb.factor8.io/en/docs/filecoin/testnets/hyperspace)
- [Network status](https://status.filecoin.io/)
- [Reputation systems](https://hyperspace.filrep.io)
- Slack Channel for Updates: [#fil-net-hyperspace-discuss](https://filecoinproject.slack.com/archives/C04JEJB82RY)
- [Storage providers auto-accepting storage deals and simulating faults](https://kb.factor8.io/en/docs/filecoin/testnets/hyperspace/support-miners)
