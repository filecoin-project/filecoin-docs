---
description: >-
  Spacenet is a Filecoin testnet modified to support Interplanetary Consensus
  (IPC).
---

# Spacenet

**Maintainer**: [ConsensusLab](https://consensuslab.world)

Spacenet is not _just_ another Filecoin testnet. It has been modified to run the high-performance [Trantor BFT consensus](https://github.com/filecoin-project/mir/tree/main/pkg/trantor), implemented atop [Mir](https://github.com/filecoin-project/mir), a framework for implementing distributed protocols. And did we forget to mention Spacenet comes with built-in [Interplanetary Consensus (IPC)](../../basics/interplanetary-consensus/) support?

Spacenet aims to provide developers with a testbed to deploy decentralized applications that can benefit from IPC’s capabilities, particularly the ability to deploy and transact in subnets.

To learn more about what you can do on Spacenet, visit the [Interplanetary Consensus](../../basics/interplanetary-consensus/) section. For instructions on working with Spacenet, visit the [Spacenet repository](https://github.com/consensus-shipyard/spacenet).

## Genesis

* [Spacenet Genesis](https://github.com/consensus-shipyard/lotus/blob/spacenet/build/genesis/spacenet.car)

## Network parameters

* Supported Sector Sizes: `2 KiB` and `8 MiB`
* Consensus Miner Min Power: `2 KiB`
* Epoch Duration Seconds: `15`
* WindowPoSt Proving Period: `2880`
* WindowPoSt Challenge Window: `60`
* WindowPoSt Period Deadlines: `48`
* Pre-Commit Challenge Delay: `10`

## Bootstrap peers

```plaintext
/dns4/bootstrap-1.spacenet.ipc.space/tcp/1347/p2p/12D3KooWBgvwdJfJzi33n3RtesHdXvW16pGqaVgzD2WCijxvwEp1
/dns4/bootstrap-2.spacenet.ipc.space/tcp/1347/p2p/12D3KooW9u5RNjcw5zbkZcWGo2WWwjEbvr1Qz7sTs9GpxNw5xNzC
```

## Resources

* [Spacenet repository](https://github.com/consensus-shipyard/spacenet)
* [Spacenet status page](https://spacenet.statuspage.io/)
* [Contact form](https://docs.google.com/forms/d/1O3\_kHb2WJhil9sqXOxgGGGsqkAA61J1rKMfnb5os5yo/edit)
