---
title: Networks
sidebarDepth: 0
description: Aside from mainnet, Filecoin runs several networks for testing and experimenting
---

# Filecoin networks

Filecoin has several networks for various testing, benchmarking, and optimization needs. This page provides an overview and pointers for each network.

## Network dashboard

::: callout
The [Filecoin Network Dashboard](https://network.filecoin.io/) lists current existing networks and includes the latest information for each network, including:

- Block sizes
- Links to faucets
- Links to stats dashboards
- Lotus version to use
  :::

| Network                        | Purpose                                                                                                                                                  | Sector Sizes         | Stability                      |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------ |
| [Testnet](#testnet)            | Evaluate Filecoin at a meaningful scale. (_recommended for most miners_)                                                                                 | 32GiB, 64GiB         | Moderate (ongoing Space Race!) |
| [Nerpa Devnet](#nerpa-devnet)  | For developers building apps, with small sector sizes and reduced proofs parameters. Sealing time is ~15-20 minutes. (_recommended for most developers_) | 512MiB               | Moderate                       |
| [Butterfly](#butterfly-devnet) | For core implementers testing new code. (_recommended for most developers_)                                                                              | 512MiB, 32GiB, 64GiB | Low (frequent resets)          |

### Connection Instructions

Instructions on how to join each of these networks depends on the software that you are using:

- [Instructions for Lotus](/get-started/lotus/switch-networks)

---

## Testnet

Testnet is the primary live testing network before Mainnet launch. Here, we evaluate Filecoin at meaningful scale via testing, benchmarking, and optimizations.

Testnet is the most realistic simulation of the Filecoin mainnet to date:

- Prospective storage miners can experience more realistic sealing performance and hardware requirements due to the use of near-final proofs constructions and parameters
- Prospective storage clients can store and retrieve real data on the testnet. Clients can participate in deal-making workflows and storage + retrieval functionality.
- As planned for mainnet, testnet supports 32 GiB and 64 GiB sectors.

Testnet is the network of record for the [Filecoin Space Race](https://filecoin.io/blog/getting-ready-testnet-incentives/), a 3-week incentivized mining competition that began at 22:00 UTC on Monday, 24 August 2020 with a network reset.

| Description                                | Details                                                                                                                                                                                                   |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Details                                    | [https://network.filecoin.io/#testnet](https://network.filecoin.io/#testnet)                                                                                                                              |
| Block explorers                            | [Filscan](https://filscan.io/)<br />[Filscout](https://filscout.io/)<br />[Filplorer](https://filplorer.com/)<br />[1475 Explorer](https://1475ipfs.com/#/blockBrowser)<br />[Filfox](https://filfox.io/) |
| [Slack](https://filecoin.io/slack) channel | #fil-testnet                                                                                                                                                                                              |

### Testnet Faucet Notes

The faucet issues small amounts of mock FIL to jump-start testing. Here is how it works:

- To fairly distribute FIL to all users, you’ll need to log in with a Github account at least 1 year old.
- You can get a one time initial balance transfer of 100 FIL to any address to initialize your node.
- Additional notes for miners:
  - To make collateral management easier for the Space Race, the Filecoin team is running a bot that reimburses 103% of `PreCommitSector` and `ProveCommitSector` messages (i.e., miners’ collateral payments). This means your miner can continue operating indefinitely once it’s received a small amount of initial funds.
  - Previously, miners could request additional FIL transfers to miner addresses. This caused significant inflation and unrealistic gas fees, and is disabled as of 8 Sept 2020.

---

## Devnets

Several developer networks (also called devnets) are available with various configurations and performance characteristics.

### Nerpa Devnet

Nerpa is a long-lived devnet, **best for developers building storage apps**. Nerpa uses small sectors and reduced proofs parameters, so sealing is much faster than in the full Testnet version. The name comes from [a species of seal](https://en.wikipedia.org/wiki/Baikal_seal), one of the smallest true seals.

| Description                                | Details                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------ |
| Sector Sizes                               | 512MiB                                                                   |
| Details page                               | [https://network.filecoin.io/#nerpa](https://network.filecoin.io/#nerpa) |
| Next expected reset                        | Last reset Aug 17, 2020. Next reset TBD.                                 |
| Block explorers                            | n/a                                                                      |
| [Slack](https://filecoin.io/slack) channel | [#fil-net-nerpa](https://filecoinproject.slack.com/archives/C016VJSJNTH) |

### Butterfly Devnet

This network is for core developers testing new code. It is reset often.

| Description                                | Details                                                                          |
| ------------------------------------------ | -------------------------------------------------------------------------------- |
| Sector Sizes                               | 512MiB, 32GiB, 64GiB                                                             |
| Details page                               | [https://network.filecoin.io/#butterfly](https://network.filecoin.io/#butterfly) |
| Next expected reset                        | TBD.                                                                             |
| Block explorers                            | n/a                                                                              |
| [Slack](https://filecoin.io/slack) channel | `#fil-net-butterfly`                                                             |
