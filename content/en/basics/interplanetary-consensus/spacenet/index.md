---
title: "Spacenet"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-interplanetary-consensus"
    identifier: "spacenet-d97d99df45d49ad6a91987651ec2ea40"
weight: 110
toc: true
---

- [Spacenet Faucet](https://spacenet.consensus.ninja)
- [Spacenet Genesis](https://github.com/consensus-shipyard/lotus/blob/spacenet/build/genesis/spacenet.car)
- [Spacenet Bootstraps](https://github.com/consensus-shipyard/lotus/blob/spacenet/build/bootstrap/spacenet.pi)
- [Contact form](https://docs.google.com/forms/d/1O3_kHb2WJhil9sqXOxgGGGsqkAA61J1rKMfnb5os5yo/edit)
- [Spacenet status page](https://spacenet.statuspage.io/)

## Why Spacenet?
Spacenet is not _yet another_ Filecoin testnet. Its consensus layer has been modified to integrate [Mir](https://github.com/filecoin-project/mir), a distributed protocol implementation framework. The current version of Spacenet runs an implementation of the [Trantor BFT consensus](https://hackmd.io/P59lk4hnSBKN5ki5OblSFg) over Mir. And did we forget to mention Spacenet comes with [Interplanetary Consensus (IPC)](https://ipc.space/) support?

Spacenet aims to provide developers with a testbed to deploy their FVM use cases and innovate with new Web3 applications that can benefit from operating in subnets. It is also a way for us to test our consensus innovations with real applications and real users. Developers will be able to deploy their own subnets from Spacenet while maintaining the ability to seamlessly interact with state and applications in the original network, from which they have otherwise become independent.

{{< alert icon="🎬️" >}}In the meantime, to learn more about IPC you can read [the design reference](https://github.com/consensus-shipyard/IPC-design-reference-spec/raw/main/main.pdf) and/or watch this (slightly outdated) talk 👇️{{< /alert >}}

{{< youtube bD1LDVc2lMQ >}}

## SLA of the network
Spacenet is an experimental network. We aim to have it constantly running, but some hiccups may appear along the way. If you are looking to rely on Spacenet for your applications, you should expect:
- Unplanned (and potentially long-lasting) downtime while we investigate bugs.
- Complete restarts of the network and loss of part or all stored state. In case of serious issues, it may be necessary to restart the network from a previous checkpoint, or completely restart from genesis.
- Bugs and rough edges to be fixed and polished along the way.

Announcements about new releases and status updates about the network are given in the **#spacenet** channel of the [Filecoin Slack](https://filecoin.io/slack) and through this repo. You can also ping us there or open an issue in this repo if you encounter a bug or some other issue with the network. You can also direct your requests through [this form](https://docs.google.com/forms/d/1O3_kHb2WJhil9sqXOxgGGGsqkAA61J1rKMfnb5os5yo/edit).

## Getting started for users
Spacenet is a Filecoin testnet, and as such it is supposed to do (almost) everything that the [Filecoin network supports](https://lotus.filecoin.io/tutorials/lotus/store-and-retrieve/set-up/):
- Send FIL between addresses
- Create multisig accounts
- Create [payment channels](https://lotus.filecoin.io/tutorials/lotus/payment-channels/)
- Deploy [FVM compatible contracts](https://docs.filecoin.io/smart-contracts/fundamentals/the-filecoin-virtual-machine/)
- Deploy [IPC subnets](https://github.com/consensus-shipyard/ipc-agent) 

That being said, as the consensus layer is no longer storage-dependent, Spacenet has limited support for storage-related features. In particular, we have stripped out some of the functionalities of the lotus miner. While you deploy a lotus-miner over Spacenet to onboard storage to the network and perform deals, lotus-miners are not allowed to propose and validate blocks anymore (this is handled by Mir-Trantor validators).

{{< alert icon="⚠️" >}}Support for storage-specific features in Spacenet is limited.{{< /alert >}}

### Getting Spacenet FIL
In order to fund your account with Spacenet FIL we provide a faucet at [https://spacenet.consensus.ninja](https://spacenet.consensus.ninja). Getting FIL is as simple as inputting your address in the textbox and clicking the button.
- The per-request allowance given by the faucet is of 10 FIL.
- There is a daily maximum of 20 FIL per address.
- And we have also limited the maximum amount of funds that the faucet can withdraw daily.
  If, for some reason, you require more Spacenet FIL for your application, feel free to drop us a message in the #spacenet Slack channel, via consensuslab@protocol.ai to increase your allowance, or fill-in a request in [this form](https://docs.google.com/forms/d/1O3_kHb2WJhil9sqXOxgGGGsqkAA61J1rKMfnb5os5yo/edit).
  ![Spacenet Faucet](spacenet-faucet.png)

## Getting started for developers
You can run a full-node and connect it to Spacenet by running eudico (a fork of lotus that is able to run several consensus algorithms):
- Cloning the modified lotus implementation (eudico) for Spacenet:
```
git clone https://github.com/consensus-shipyard/lotus

// The default (and latest stable) branch for the network is `spacenet`
git checkout spacenet
```
- Installing lotus and running all dependencies as described in the `README` of the [repo](https://github.com/consensus-shipyard/lotus)
- Once you have all `lotus` dependencies installed you can run the following command to compile `eudico` with Spacenet support.
```
make spacenet
```
- With that, you are ready to run your spacenet daemon and connect to the network by connecting to any its bootstrap nodes.
```
./eudico mir daemon --bootstrap=true
```
Eudico in Spacenet supports every lotus command supported in mainnet, so you'll be able to configure your Spacenet full-node at will (by exposing a different API port, running Lotus lite, etc.). More info available in [Lotus' docs](https://lotus.filecoin.io/lotus/get-started/what-is-lotus/).

### Using Eudico Lite for Spacenet
The Spacenet blockchain is growing fast in size! If you are looking to tinker a bit with the network and get some Spacenet FIL, but you are not planning to extensively use the network to the extent of running your own full-node, we have provided a read endpoint so you can interace with Spacenet through an Eudico Lite node.

To connect to Spacenet through a Eudico Lite you need to configure `FULLNODE_API_INFO` to point to the following peer with the following `API_KEY`:
```
FULLNODE_API_INFO=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIl19.w1-vwONiteLN0VlD9ccNujoPBXoFjkJJRyYva0SHah4:/ip4/52.29.194.50/tcp/1234 ./eudico mir daemon --lite
```
To test that the connection has been successful you can try to create a new wallet and send some funds from the faucet. More info about Lotus/Eudico Lite can be found  [here](https://lotus.filecoin.io/lotus/install/lotus-lite/)

{{< alert icon="📓" >}}We are only providing read access through our current Eudico Lite endpoint, if you would like to have write or admin access to a Spacenet full-node to test the network without having to sync your own node get in touch through this [Contact form](https://docs.google.com/forms/d/1O3_kHb2WJhil9sqXOxgGGGsqkAA61J1rKMfnb5os5yo/edit) or in FIL Slack's #spacenet.{{< /alert >}}

In future versions of Spacenet, we will provide periodic snapshot to help developers sync their full-nodes in a tractable amount of time. You can follow the progress of this feature in the [following issue](https://github.com/consensus-shipyard/spacenet/issues/18)

## Getting started with  IPC

Spacenet now features support for IPC subnets. You're able to create, join, and leave subnets, to operate as a subnet validator, and to issue transactions and deploy smart contracts in subnets.

The instuctions in the [IPC Agent](https://github.com/consensus-shipyard/ipc-agent) repository will guide you through the deployment of an IPC subnet under Spacenet.

## Getting started for validators

{{< alert icon="⚠️" >}}Support for external validators coming soon! Track the work in [the following issue](https://github.com/consensus-shipyard/lotus/issues/21). If you are interested in becoming a validator let us know through [this form](https://docs.google.com/forms/d/1O3_kHb2WJhil9sqXOxgGGGsqkAA61J1rKMfnb5os5yo).{{< /alert >}}

Spacenet is currently run by a committee of 4 validators owned by CL. We don't accept externally owned validators during this initial testing phase, until the network deployment is stabilized, but support for reconfiguration and external validators will be added soon.