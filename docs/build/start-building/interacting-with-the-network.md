---
title: Interacting with the network
description: Learn how to interface with the Filecoin network.
---

# Interacting with the network

This page outlines various options for connecting to local and remote test networks while building and operating your service or application.

Each Filecoin-based service or application will need to use at least one Filecoin node that maintains consensus. All interactions with the network must flow through an up-to-date node: sending and receiving market deals, sending and receiving data, and more.

You can run this node yourself or choose a hosted option. Running your own node offers more decentralized control, but it requires non-trivial time and resources. Choosing a hosted node makes it easier to get started quickly, but you’ll need to trust the hosting provider.

---

## Mainnet

Filecoin mainnet has not yet launched and the FIL token does not yet exist. The network is and always will be open for anyone to access and join without restriction, and the Filecoin Project codebase is free and open-source. Anyone can install the software, connect to the network, and explore Filecoin.

Filecoin mainnet launch is currently planned for Q3 2020. Visit the [Filecoin blog](https://filecoin.io/blog/) for updates and the [current Gantt chart](https://app.instagantt.com/shared/s/1152992274307505/latest).

---

## Testnet

_the primary live testnet before mainnet launch_

The Filecoin testnet is a live, longer-running community test network. Filecoin is under active development and the testnet is being used for a period of significant testing, benchmarking, and optimizations. The purpose of the testnet is to evaluate Filecoin at meaningful scale before mainnet and to fix any issues that may arise.

> Note: If you're a storage application developer who would like accelerated storage deal lifecycles you may want to try a **Devnet** with smaller minimum sectors below.

The testnet is the most realistic simulation of the Filecoin mainnet to date:

- Prospective storage miners can experience more realistic sealing performance and hardware requirements due to the use of near-final proofs constructions and parameters
- Prospective storage clients can store and retrieve real data on the testnet. Clients can participate in deal-making workflows and storage + retrieval functionality.
- As planned for mainnet, the minimum sector size on testnet is 32 GB and 64 GB sectors are also available.

Currently, the Filecoin testnet operates with the [lotus Filecoin implementation](https://lotu.sh). You can use the `master` branch of lotus to join the current live testnet.

To tap the faucet, see the dashboard or search a block explorer for testnet:

- testnet Faucet: https://faucet.testnet.filecoin.io/
- testnet Stats Dashboard: https://stats.testnet.filecoin.io/
- testnet Block Explorers: See [block explorers on the Resources wiki](https://github.com/filecoin-project/docs/wiki#block-explorers)
- For updates see: [#fil-testnet](https://filecoinproject.slack.com/archives/C0144HM4AM7) (in Filecoin Slack)
- For lotus questions see: [#fil-lotus](https://filecoinproject.slack.com/archives/CPFTWMY7N) and for general help: [#fil-help](https://filecoinproject.slack.com/archives/CEGN061C5)

### Filecoin Space Race competition

The testnet will be used for the [Filecoin Testnet Incentives Program](https://filecoin.io/blog/getting-ready-testnet-incentives/) - nicknamed the _Filecoin Space Race_, a 3-week competition period that will begin in early August. This collaborative competition is intended to stress-test the network, encourage participation all over the world, and help miners get ready to run the world’s biggest decentralized storage network.

In this competition, miners will compete to onboard as much storage capacity as possible to the network. The top 100 miners globally, as well as the top 50 miners from each continent, will earn Filecoin rewards based on how much storage they and the network achieve during the competition period.

### Running hosted endpoints

To support wallets and hosted API endpoint services, devops scripts are available for running a remote lotus JSON RPC API endpoint as a scalable cluster of nodes. Remote storage API endpoints however, do not yet exist: currently node keys are required to execute storage deals.

- [Lotus Docker Image](https://github.com/openworklabs/filecoin-docker) for a simple Lotus node Docker container\*
- [Filecoin Chart](https://github.com/openworklabs/filecoin-chart) for more complex Lotus node architectures managed with Kubernetes

To use a remote node on a server, you will need to set up a reverse proxy (using an Nginx or Caddy server, for example). Also see the [lotus docs on using JWT](https://lotu.sh/en+api#curl-authorization-157570). The lotus JSON RPC API requires [permissions](https://github.com/filecoin-project/lotus/blob/master/api/apistruct/struct.go#L34) for write and admin methods.

### Hosted nodes for testnet

The Filecoin project has a limited number of dedicated, up-to-date nodes (synced with the latest Testnet chain) available to developers actively building storage services or applications. They are intended to jump-start development instead of waiting for your own node to sync, and not for production usage. To request a dedicated hosted node, please email [filecoin-collabs@protocol.ai](mailto:filecoin-collabs@protocol.ai?subject=Requesting20%a20%hosted20%node).

## Running a Local network

Here are some ways to spin up a mock version of the Filecoin network on your own machine(s), for quick testing and development:

- [Simple local devnet for lotus](https://lotu.sh/en+setup-local-dev-net)
- [Containerized devnet using mocked sectorbuilder](https://github.com/textileio/lotus-devnet) (aka mocked mining)
- [Additional containers & virtualization scripts](https://github.com/filecoin-project/docs/wiki#containers--virtualization)

## Running Powergate

You can also run an IPFS node + Filecoin lotus node via Powergate ([more info about Powergate](https://docs.filecoin.io/build/tools/powergate.md)) which enables using IPFS for hot storage and retrieval. For dapp developers who want some of the details of Filecoin's storage market abstracted as a convenience, Powergate also offers a storage deal agent, multi-tenant wallets mapped to the node's key (required to execute storage deals), automated deal renewal and other additional features.

Powergate is open source ([Github](https://github.com/textileio/powergate)) or you can request [managed Powergate instances from Textile](https://blog.textile.io/announcing-managed-powergate-instances-enterprise-filecoin-and-ipfs/) running on a devnet or testnet.

---

## Devnets

You can see the latest information about active devnets at the [Filecoin Network Information page](https://network.filecoin.io). In addition to the testnet, there is currently one developer network available to try out: the Nerpa Devnet, which is recommended for small-scale testing for developers building applications.

### Nerpa Devnet

_best for small-scale testing for app developers_

A long-lived devnet for developers building storage apps. We call this network the Nerpa Devnet (the 'nerpa' is a species of seal, and one of the smallest true seals). It features 512MB sectors (in addition to 32GB and 64GB sectors) and reduced proofs parameters, so sealing is much faster than in the full Testnet version.

To connect to the [Nerpa Devnet](http://www.nerpa.fildev.network/):

1. Delete any existing local Lotus repository, if one is present.
2. Build and run Lotus from branch `ntwk-nerpa`, [`tag ntwk-nerpa-7.7.0`](https://github.com/filecoin-project/lotus/tree/ntwk-nerpa-7.7.0). When you run `lotus daemon` on the build from this branch, you should automatically be connected to the proper bootstrappers.
3. There should be a few **dedicated storage miners** on the network that are configured to accept storage deals. If you are having trouble finding a miner to accept your storage deal, please ping for support in the #fil-storage-dev channel on the [Filecoin slack](https://filecoin.io/slack).

> **NOTICE:** At the moment, there are no guarantees on uptime for any of the auto-accepting miners. If one has gone offline or become unresponsive, please let us know in the same channel on Filecoin Slack.

To tap the faucet or see dashboard for Nerpa:

- Nerpa Devnet Faucet (to obtain mock FIL): https://faucet.nerpa.fildev.network/
- Nerpa Stats Dashboard: https://stats.nerpa.fildev.network/
See more Nerpa Devnet information here: https://network.filecoin.io/#nerpa
- For updates see: [#fil-net-nerpa](https://filecoinproject.slack.com/archives/C016VJSJNTH) (in Filecoin Slack)

### Calibration Devnet

_best for Miners preparing for the Space Race competition_

The Filecoin Space Race Calibration Period is a 2-week period where miners can practice in real competition conditions and see how their performance influences hypothetical testnet incentives competition standings. This takes place on the Calibration Devnet.

> Note: As issues are discovered this Devnet will be regularly reset to the latest code during this calibration window. Stay tuned in the Slack channels below for reset announcements.

To connect to the [Calibration Devnet](http://www.calibration.fildev.network/):

1. Delete any existing local Lotus repository, if one is present.
2. Build and run Lotus from branch `ntwk-calibration`. When you run `lotus daemon` on the build from this branch, you should automatically be connected to the proper bootstrappers.

To tap the faucet or see dashboard for the Calibration Devnet:

- Calibration Devnet Faucet: https://faucet.calibration.fildev.network/
- Calibration Stats Dashboard: https://stats.calibration.fildev.network/
- Calibration Block Explorers:
  - https://calibration.filfox.io/
  - https://calibration.filscan.io/
- Other Calibration Devnet info: http://www.calibration.fildev.network/
- For updates see: [#fil-net-calibration](https://filecoinproject.slack.com/archives/C017CCH1MHB) and [#space-race](https://filecoinproject.slack.com/archives/C0179RNEMU4) (in Filecoin Slack)
