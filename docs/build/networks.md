---
title: Networks
description: Filecoin has various options for connecting to local and remote test networks. This section covers which networks are available and how to connect to them.
---

# Networks

Filecoin nodes collect and store information about transactions happening across the network. To interact with the Filecoin network, applications must pass their requests through a Filecoin node. This section covers the different networks available and how to connect to them. There are three types of networks available for Filecoin:

| Name    | Description                                                                                                                                                                                                                                                                                                                   |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mainnet | The main production network. Transactions and `FIL` on this network have real-world value. This network will never be reset.                                                                                                                                                                                                  |
| Testnet | Test networks Intended for developers to test their applications in an environment similar to the production mainnet. Transactions and `FIL` have no value on this network. `FIL` can be obtained for free using a [network faucet](#faucet). This network will be periodically reset, deleting any information stored on it. |
| Devnet  | Developer networks miner and developers to test their setups and tweet their configurations quickly. Devnets are designed to be quick and do not accurately reflect the speed, transaction value, or storage capacity of the production mainnet. Transactions and `FIL` have no value on devnets.                             |

## Mainnet

The main network (mainnet) is the single production network for Filecoin. Filecoin mainnet has not yet launched, and the `FIL` token does not yet exist. The network is, and always will be, open for anyone to access and join without restriction. The Filecoin Project codebase is free and open-source, meaning anyone can install the software to connect to the network and explore Filecoin. The Filecoin mainnet launch is currently planned for Q3 2020. Visit the [Filecoin blog](https://filecoin.io/blog/) for updates and the [current Gantt chart](https://app.instagantt.com/shared/s/1152992274307505/latest).

## Testnet

Test networks (testnets) are simulated copies of how the mainnet functions, with the intention of being as similar to real-world conditions as possible. The Filecoin testnet is a long-running community test network. Filecoin is under active development, and the testnet is being used for a period of significant testing, benchmarking, and optimizations. The purpose of the testnet is to evaluate Filecoin at scale before mainnet and to fix any issues that may arise.

The testnet is the most realistic simulation of the Filecoin mainnet to date. Prospective storage miners can experience more realistic sealing performance and hardware requirements due to the use of near-final proofs, constructions, and parameters. Prospective storage clients can store and retrieve real data on the testnet. Clients can participate in deal-making workflows and storage/retrieval functionality. The minimum sector size on the testnet is 32 GB. 64 GB sectors are also available.

Network stats are available for the Filecoin testnet at [`stats.testnet.filecoin.io`](https://stats.testnet.filecoin.io/d/z6FtI92Zz/chain?orgId=1&refresh=45s&from=now-30m&to=now&kiosk).

### Faucet

Testnet faucets disperse free `FIL` to test transactions within applications. This `FIL` has no value and cannot be traded for other cryptocurrencies. The faucet is available at [`faucet.testnet.filecoin.io`](https://faucet.testnet.filecoin.io/).

### Space Race

The Filecoin Space Race is a competition spanning three weeks intended to stress-test the network, encourage participation all over the world, and help miners get ready to run the world’s biggest decentralized storage network. Miners will compete to onboard as much storage capacity as possible to the network. The top 100 miners globally, as well as the top 50 miners from each continent, will earn Filecoin rewards based on how much storage they and the network achieve during the competition period.

## Devnets

Developer networks (devnets) are designed to simulate the Filecoin workflow but are not accurate in terms of time, computing cost, and real-world financial cost. They are solely intended to help developers and miners test their applications and configurations quickly. There are three devnets available:

| Name               | Recommended users                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| Nerpa              | For app developers wanting to test their logic against the Filecoin workflow.                        |
| Butterfly          | For miners interested in testing out new Lotus features. This devnet is reset more often than Nerpa. |
| Calibration devnet | For miners to practice Space Race testing.                                                           |

### Nerpa Devnet

A long-lived devnet for developers building storage applications. The name comes from the [nerpa seal](https://en.wikipedia.org/wiki/Baikal_seal), one of the smallest species of seal in the world. It features 512MB, 32GB, and 64GB sectors and reduced proofs, parameters. These features make sealing much faster than in the testnet.

#### Connect to Nerpa

To connect to the [Nerpa devnet](http://www.nerpa.fildev.network/):

1. Delete any existing local Lotus repository.
2. Build and run Lotus from branch `ntwk-nerpa`. When you run `lotus daemon` on the build from this branch, you should automatically be connected to the proper bootstrappers.
3. There should be a few **dedicated storage miners** on the network that are configured to accept storage deals. If you are having trouble finding a miner to accept your storage deal, request support in the `#fil-storage-dev` channel in the [Filecoin Slack](https://filecoin.io/slack).

#### Further Nerpa information

| Information | Link                                                                  |
| ----------- | --------------------------------------------------------------------- |
| Faucet      | [`faucet.nerpa.fildev.network`](https://faucet.nerpa.fildev.network/) |
| Dashboard   | [`stats.nerpa.fildev.network`](https://nerpa.fildev.network/)         |
| Basic info  | [`nerpa.fildev.network`](http://www.nerpa.fildev.network/)            |

For updates see [#fil-net-nerpa](https://filecoinproject.slack.com/archives/C017CCH1MHB) in the Filecoin Slack.

### Butterfly devnet

A devnet for miners, specifically to test net Lotus configurations. The Butterfly devnet is similar to the Nerpa devnet but resets much more often.

#### Connect to Butterfly

To connect to the [Butterfly devnet](http://www.butterfly.fildev.network/):

1. Delete any existing local Lotus repository.
2. Build and run Lotus from branch `ntwk-butterfly`. When you run `lotus daemon` on the build from this branch, you should automatically be connected to the proper bootstrappers.
3. There should be a few **dedicated storage miners** on the network that are configured to accept storage deals. If you are having trouble finding a miner to accept your storage deal, request support in the `#fil-storage-dev` channel in the [Filecoin Slack](https://filecoin.io/slack).

#### Further Butterfly information

| Information | Link                                                                          |
| ----------- | ----------------------------------------------------------------------------- |
| Faucet      | [`faucet.butterfly.fildev.network`](https://faucet.butterfly.fildev.network/) |
| Dashboard   | [`stats.butterfly.fildev.network`](https://butterfly.fildev.network/)         |
| Basic info  | [`butterfly.fildev.network`](http://www.butterfly.fildev.network/)            |

For updates see [#fil-net-butterfly](https://filecoinproject.slack.com/archives/C017CCH1MHB) in the Filecoin Slack.

### Calibration devnet

The Filecoin Space Race Calibration Period is a three-week period where miners can practice in real competition conditions and see how their performance influences hypothetical testnet incentives competition standings. This takes place on the Calibration devnet. As issues are discovered, this Devnet will be regularly reset to the latest code during this calibration window. Stay tuned in the Slack channels below for reset announcements.

#### Connect to Calibration devnet

To connect to the [Calibration Devnet](http://www.calibration.fildev.network/):

1. Delete any existing local Lotus repository, if one is present.
2. Build and run Lotus from branch `ntwk-calibration`. When you run `lotus daemon` on the build from this branch, you should automatically be connected to the proper bootstrappers.

#### Further Calibration information

| Information     | Link                                                                                   |
| --------------- | -------------------------------------------------------------------------------------- |
| Faucet          | [`faucet.calibration.fildev.network`](https://faucet.calibration.fildev.network/)      |
| Dashboard       | [`stats.calibration.fildev.network`](https://calibration.fildev.network/)              |
| Basic info      | [`calibration.fildev.network`](http://www.calibration.fildev.network/)                 |
| Block explorers | [Filfox](https://calibration.filfox.io/)<br>[Filscan](https://calibration.filscan.io/) |

For updates see [#fil-net-calibration](https://filecoinproject.slack.com/archives/C017CCH1MHB) and [#space-race](https://filecoinproject.slack.com/archives/C0179RNEMU4) in the Filecoin Slack.

## Local networks

There are several ways to spin up a _mock_ version of the Filecoin network on your own machine for quick testing and development:

- [Simple local devnet for Lotus](https://lotu.sh/en+setup-local-dev-net)
- [Containerized devnet using mocked sectorbuilder](https://github.com/textileio/lotus-devnet) (aka mocked mining)
- [Additional containers & virtualization scripts](https://github.com/filecoin-project/docs/wiki#containers--virtualization)
