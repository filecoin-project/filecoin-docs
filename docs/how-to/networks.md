---
title: Connect to a network
sidebarDepth: 0
description: Learn about the various networks and their connection instructions.
---

# Connect to a network

Filecoin has several networks for various testing, benchmarking, and optimization needs. This page describes the available networks, their key characteristics, and usage instructions.

| Network | Purpose | Sector Sizes | Stability |
|---|---|---|---|
| [Testnet](#testnet) | Evaluate Filecoin at a meaningful scale. | 32GiB, 64GiB | High |
| [Calibration Devnet](#calibration-devnet) | For miners to prepare for the Space Race (*recommended for most miners*) | 512MiB, 32GiB, 64GiB | Moderate |
| [Nerpa Devnet](#nerpa-devnet) | For developers building apps, with small sector sizes and reduced proofs parameters. Sealing time is ~15-20 minutes. (*recommended for most developers*) | 512MiB | Moderate |
| [Walrus Devnet](#walrus-devnet) | For developers testing large storage deals only | 32GiB, 64GiB | High |
| [Butterfly Devnet](#butterfly-devnet) | For core implementers testing new code. (*frequent resets and not recommended for most users*) | 512MiB, 32GiB, 64GiB | Low |

### Connection Instructions

To connect to any of these networks:

1. Choose the network that best suits your needs. As of July 22, we recommend [calibration](#calibration-devnet) for most miners and [nerpa](#nerpa-devnet) for most developers. 
2. Delete any existing local Lotus repository, if one is present.
3. Build Lotus from the **branch** and **tag** listed for each network (example: `ntwk-nerpa`, [`tag ntwk-nerpa-7.7.0`](https://github.com/filecoin-project/lotus/tree/ntwk-nerpa-7.7.0)).
4. When you run `lotus daemon` on the build you've created from the listed branch, you should automatically be connected to the proper bootstrap nodes.
5. Storage developers: There should be a few **dedicated storage miners** on each devnet that are configured to accept storage deals. While there are currently no uptime guarantees on these auto-accepting miners, if you are having trouble finding a miner to accept your storage deal, please ping the [Filecoin Slack](https://filecoin.io/slack) channel listed in each network's details section.

------

## Testnet
Testnet is the primary live testing network before Mainnet launch. Here, we evaluate Filecoin at meaningful scale via testing, benchmarking, and optimizations.

Testnet is the most realistic simulation of the Filecoin mainnet to date:

- Prospective storage miners can experience more realistic sealing performance and hardware requirements due to the use of near-final proofs constructions and parameters
- Prospective storage clients can store and retrieve real data on the testnet. Clients can participate in deal-making workflows and storage + retrieval functionality.
- As planned for mainnet, the minimum sector size on testnet is 32 GB.  and 64 GB sectors are also available.

> Testnet is the network of record for the [Filecoin Space Race](https://filecoin.io/blog/getting-ready-testnet-incentives/), a 3-week incentivized mining competition taking place in August 2020. 

#### Testnet Details
|Description  | Details |
| --- | --- |
|Sector Sizes | 32GiB, 64GiB |
|Branch | `master` |
|Tag | n/a |
|Next expected reset | Aug 3, 2020 |

#### Testnet Resources
|Description  | Details |
| --- | --- |
|Faucet | https://faucet.testnet.filecoin.io/ |
|Stats dashboard | https://stats.testnet.filecoin.io/ |
|Block explorers | [Filscan](https://filscan.io/)<br />[Filscout](https://filscout.io/)<br />[Filplorer](https://filplorer.com/)<br />[1475 Explorer](https://1475ipfs.com/#/blockBrowser)<br />[Filfox](https://filfox.io/)|
|[Slack](https://filecoin.io/slack) channel | #fil-testnet |

------

## Devnets

Several developer networks (also called devnets) are available with various configurations and performance characteristics. The recommended networks for most users are [calibration](#calibration-devnet) (for miners) and [nerpa](#nerpa-devnet) (for developers). 

### Calibration Devnet

Calibration is an up-to-date devnet, best for miners preparing for the [Space Race](https://filecoin.io/blog/getting-ready-testnet-incentives/) mining competition. Miners can practice in real competition conditions and see how their performance influences hypothetical competition standings. 

#### Calibration Devnet Details

| Description         | Details                                                      |
| ------------------- | ------------------------------------------------------------ |
| Sector Sizes        | 512MiB, 32GiB, 64GiB                                         |
| Branch              | `ntwk-calibration`                                           |
| Tag                 | [`ntwk-calibration-7.29.0`](https://github.com/filecoin-project/lotus/tree/ntwk-calibration-7.29.0) |
| Details page        | [calibration.fildev.network](http://www.calibration.fildev.network/) |
| Next expected reset | July 28, 2020, with frequent resets through Aug 3. See Slack channels below for reset announcements. |

#### Calibration Devnet Resources

| Description                                 | Details                                                      |
| ------------------------------------------- | ------------------------------------------------------------ |
| Faucet                                      | https://faucet.calibration.fildev.network/                   |
| Stats dashboard                             | https://stats.calibration.fildev.network/                    |
| Block explorers                             | https://calibration.filfox.io/ <br />https://calibration.filscan.io/ |
| [Slack](https://filecoin.io/slack) channels | [#fil-net-calibration](https://filecoinproject.slack.com/archives/C017CCH1MHB) <br /> [#space-race](https://filecoinproject.slack.com/archives/C0179RNEMU4) |

### Nerpa Devnet
Nerpa is a long-lived devnet, **best for developers building storage apps**. Nerpa uses small sectors and reduced proofs parameters, so sealing is much faster than in the full Testnet version. The name comes from [a species of seal](https://en.wikipedia.org/wiki/Baikal_seal), one of the smallest true seals. 

#### Nerpa Devnet Details

|Description  | Details |
| --- | --- |
|Sector Sizes | 512MiB |
|Branch | `ntwk-nerpa` |
|Tag | [`tag ntwk-nerpa-7.7.0`](https://github.com/filecoin-project/lotus/tree/ntwk-nerpa-7.7.0) |
|Details page | [nerpa.fildev.network](http://www.nerpa.fildev.network/) |
|Next expected reset | July 23, 2020 |

#### Nerpa Devnet Resources

| Description                                | Details                                                      |
| ------------------------------------------ | ------------------------------------------------------------ |
| Faucet                                     | https://faucet.nerpa.fildev.network/                         |
| Stats dashboard                            | https://stats.nerpa.fildev.network/                          |
| Block explorers                            | n/a                                                          |
| [Slack](https://filecoin.io/slack) channel | [#fil-net-nerpa](https://filecoinproject.slack.com/archives/C016VJSJNTH) |

### Walrus Devnet

Walrus is a long-running devnet featuring large sector sizes and higher stability, but sometimes out-of-date code. Resets are only performed with plenty of notice to active users. Usage is only recommended if you are a storage developer testing large-scale deals.

Details coming soon.

### Butterfly Devnet

Butterfly is a devnet that features the absolute latest changes, and is considered unstable. **Usage is not recommended** unless you are actively developing or investigating bugs in the core implementations.

#### Butterfly Devnet Details

| Description         | Details                                                      |
| ------------------- | ------------------------------------------------------------ |
| Sector Sizes        | 512MiB, 32GiB, 64GiB                                         |
| Branch              | `ntwk-butterfly`                                             |
| Tag                 | [`ntwk-butterfly-7.20.0`](https://github.com/filecoin-project/lotus/tree/ntwk-butterfly-7.19-1.0) |
| Details page        | [butterfly.fildev.network](http://www.butterfly.fildev.network/) |
| Next expected reset | July 23, 2020, with very frequent resets and limited notice. |

#### Butterfly Devnet Resources

| Description                                | Details                                                      |
| ------------------------------------------ | ------------------------------------------------------------ |
| Faucet                                     | https://faucet.butterfly.fildev.network/                         |
| Stats dashboard                            | https://stats.butterfly.fildev.network/                          |
| Block explorers                            | n/a                                                          |
| [Slack](https://filecoin.io/slack) channel | [#fil-net-butterfly](https://filecoinproject.slack.com/archives/C017AB80CTC) |

