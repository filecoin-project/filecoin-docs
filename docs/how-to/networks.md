---
title: Network information
sidebarDepth: 0
description: Learn about the various networks and their connection instructions.
---

# Network information

Filecoin has several networks for various testing, benchmarking, and optimization needs. This page describes the available networks, their key characteristics, and usage instructions.

| Network | Purpose | Sector Sizes | Stability |
|---|---|---|---|
| [Testnet](#testnet) | Evaluate Filecoin at a meaningful scale. (*recommended for most miners*) | 32GiB, 64GiB | High |
| [Calibration Devnet](#calibration-devnet) | For miners to prepare for the Space Race | 512MiB, 32GiB, 64GiB | Moderate |
| [Nerpa Devnet](#nerpa-devnet) | For developers building apps, with small sector sizes and reduced proofs parameters. Sealing time is ~15-20 minutes. (*recommended for most developers*) | 512MiB | Moderate |
| [Walrus Devnet](#walrus-devnet) | For developers testing large storage deals only | 32GiB, 64GiB | High |
| [Butterfly Devnet](#butterfly-devnet) | For core implementers testing new code. (*frequent resets and not recommended for most users*) | 512MiB, 32GiB, 64GiB | Low |

### Connection Instructions

To connect to any of these networks:

1. Choose the network that best suits your needs. As of Aug 24, we recommend [testnet](#testnet) for most miners and [nerpa](#nerpa-devnet) for most developers. 
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
- As planned for mainnet, testnet supports 32 GiB and 64 GiB sectors.

Testnet is the network of record for the [Filecoin Space Race](https://filecoin.io/blog/getting-ready-testnet-incentives/), a 3-week incentivized mining competition that will begin at 22:00 UTC on Monday, 24 August 2020. The network will be reset at this time.

#### Testnet Details
|Description  | Details |
| --- | --- |
|Sector Sizes | 32GiB, 64GiB |
|Branch | `master` |
|Tag | [`v0.5.6`](https://github.com/filecoin-project/lotus/releases/tag/v0.5.6) |
|Next expected reset | Aug 24, 2020 at 22:00:00 UTC |

#### Testnet Resources
|Description  | Details |
| --- | --- |
|Faucet | https://spacerace.faucet.glif.io  |
|Stats dashboard | https://stats.testnet.filecoin.io/ |
|Block explorers | [Filscan](https://filscan.io/)<br />[Filscout](https://filscout.io/)<br />[Filplorer](https://filplorer.com/)<br />[1475 Explorer](https://1475ipfs.com/#/blockBrowser)<br />[Filfox](https://filfox.io/)|
|[Slack](https://filecoin.io/slack) channel | #fil-testnet |

#### Testnet Faucet Notes
The faucet issues small amounts of mock FIL to jump-start testing. Previous faucet designs let a few bad actors spam and abuse the network, or pay massive, unrealistic transaction and gas fees instead of setting fees properly. Here is how the Testnet faucet works:

* To fairly distribute FIL to all users, you’ll need to log in with a Github account at least 48 hours old.
* You can get a one time initial balance transfer of 100 FIL to any address to initialize your node.
* Additional notes for miners:
  * Miners can additionally use the faucet to send 1,000 FIL to a miner address once, and an additional 200 FIL every 24 hours. This should be enough to seal more 500 sectors in parallel.
  * To make collateral management easier for the Space Race, the Filecoin team is running a bot that reimburses 103% of `PreCommitSector` and `ProveCommitSector` messages (i.e., miners’ collateral payments). This means your miner can continue operating indefinitely once it’s received a small amount of initial funds.
  * Very large miners may need additional collateral. To do so, you should have multiple team members use the faucet. 
  * To preserve fairness, the Filecoin team *will not* be able to provide additional funds to any miners. Use your testnet FIL carefully! Accounts that abuse the faucet (for example, by sending far more FIL than is needed to a miner) may be suspended.

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
| Tag                 | [`ntwk-calibration-8.13.1`](https://github.com/filecoin-project/lotus/tree/ntwk-calibration-8.13.1) |
| Details page        | [calibration.json](https://github.com/filecoin-project/network-info/blob/master/networks/calibration.json) |
| Next expected reset | Frequent resets until competition begins. See Slack channels below for reset announcements. |

#### Calibration Devnet Resources

| Description                                 | Details                                                      |
| ------------------------------------------- | ------------------------------------------------------------ |
| Faucet                                      | https://faucet.calibration.fildev.network/                   |
| Stats dashboard                             | https://stats.calibration.fildev.network/                    |
| Block explorers                             | https://calibration.filfox.io/ <br />https://calibration.filscan.io/ |
| [Slack](https://filecoin.io/slack) channels | [#fil-net-calibration](https://filecoinproject.slack.com/archives/C017CCH1MHB) <br /> [#space-race](https://filecoinproject.slack.com/archives/C0179RNEMU4) |

#### Calibration Faucet Notes
The faucet issues small amounts of mock FIL to jump-start devnets and testnets. Previous faucet designs let a few bad actors spam and abuse the network, or pay massive, unrealistic transaction and gas fees instead of setting fees properly. Here is how the calibration faucet works:

* To fairly distribute FIL to all users, you'll need to log in with a Github account at least 48 hours old.
* You can get a one time initial balance transfer of 5000 FIL to any address, to initialize your miner and pledge some sectors. (This amount should be good for about 500 32GiB sectors.)
* Generally, you should use block rewards to pledge additional sectors.
* However, once you have a miner with at least one sector, you can use the faucet to send additional FIL to that miner every 4 hours. The amount of FIL is proportional to the rate of storage growth for the miner over the last 24h. For every GiB of power, you will receive 0.5 FIL (or minimum of 2000 FIL).
* The goal is to create a minimal “proof of work” for the faucet. We’re hoping this faucet design will create more realistic conditions compared to how Filecoin will work at mainnet. If you have suggestions on how to improve the faucet while still meeting the anti-spam goals described there, we’re all ears!

### Nerpa Devnet
Nerpa is a long-lived devnet, **best for developers building storage apps**. Nerpa uses small sectors and reduced proofs parameters, so sealing is much faster than in the full Testnet version. The name comes from [a species of seal](https://en.wikipedia.org/wiki/Baikal_seal), one of the smallest true seals. 

#### Nerpa Devnet Details

|Description  | Details |
| --- | --- |
|Sector Sizes | 512MiB |
|Branch | `ntwk-nerpa` |
|Tag | `ntwk-nerpa-8.17.0` |
|Details page | https://network.filecoin.io/ |
|Next expected reset | Last reset Aug 17, 2020. Next reset TBD. |

#### Nerpa Devnet Resources

| Description                                | Details                                                      |
| ------------------------------------------ | ------------------------------------------------------------ |
| Faucet                                     | https://faucet.nerpa.fildev.network/                         |
| Stats dashboard                            | https://stats.nerpa.interplanetary.dev/                      |
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

