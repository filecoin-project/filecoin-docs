---
title: "Networks"
description: "There are several Filecoin networks available, each of which serves a different purposes. This page covers each network, it's use-case, and how to connect to it."
lead: "There are several Filecoin networks available, each of which serves a different purposes. This page covers each network, it's use-case, and how to connect to it."
draft: false
images: []
type: docs
menu:
  about:
    identifier: "networks-e34de371215ca0fee17bdc522b53aafa"
weight: 280
toc: true
---

## Mainnet

[Mainnet](https://docs.filecoin.io/networks/overview/available-networks/%23mainnet&sa=D&source=editors&ust=1674147484246936&usg=AOvVaw0Q8aXd92roXqWuypwDSBBX) is the live production network that all nodes on the Filecoin network are connected to. It never resets.

## Testnets

Test networks, or testnets, are version of the Filecoin network that attempt to simulate various aspects of the Filecoin mainnet. Since they are for testing they should not be used for production applications or services.

### Calibration

[Calibration](https://docs.filecoin.io/networks/overview/available-networks/%23calibration&sa=D&source=editors&ust=1674147484247293&usg=AOvVaw3My7r2akNWZiA_lEbLJ1Oz) testnet is the most realistic simulation of the mainnet, where prospective storage providers can experience more realistic sealing performance and hardware requirements due to the use of final proofs constructions and parameters, and prospective storage clients can store and retrieve real data on the network. Clients can participate in deal-making workflows and storage/retrieval functionality. It also has the same sector size as the mainnet.

- Public endpoint: [https://api.calibration.node.glif.i](https://api.calibration.node.glif.io/rpc/v0&sa=D&source=editors&ust=1674147484247708&usg=AOvVaw0u9YCwkFdJnzp1luGEZZkD)[o/rpc/v0](https://api.calibration.node.glif.io/rpc/v0&sa=D&source=editors&ust=1674147484247892&usg=AOvVaw2v0ZpCMofN-_N5NwsBcari)
- Blockchain explorer: [https://calibration.filscan.io/](https://calibration.filscan.io/&sa=D&source=editors&ust=1674147484248185&usg=AOvVaw2w0Cy2DSs63TApLDFw9WSz)
- Faucet: [https://faucet.calibration.fildev.network/](https://faucet.calibration.fildev.network/&sa=D&source=editors&ust=1674147484248498&usg=AOvVaw0cFTrKRBvrfbwhOCK-ahK1)

### Hyperspace

[Hyperspace](https://github.com/filecoin-project/testnet-hyperspace&sa=D&source=editors&ust=1674147484248855&usg=AOvVaw3kD1WYwLJUd72HvXfXWenE) testnet is the main pre-production developer testnet which is more stable and reliable. The Hyperspace testnet is a pre-production developer-focused testnet. It resets only in the event of irrecoverable damage. Developers are welcome to build and test their toolings, applications, and smart contracts on this network.

- Public endpoint: [https://api.hyperspace.node.glif.io/rpc/v0](https://api.hyperspace.node.glif.io/rpc/v0&sa=D&source=editors&ust=1674147484249267&usg=AOvVaw2gjuhQr6h9sqGSqDj8uMot)
- Blockchain explorer: [https://explorer.glif.io/?network=hyperspace](https://explorer.glif.io/?network%3Dhyperspace&sa=D&source=editors&ust=1674147484249567&usg=AOvVaw17jVoHPJNDo3Bh-N2OKsTz)
- Faucet: [https://hyperspace.filtest.network/#faucet](https://hyperspace.filtest.network/%23faucet&sa=D&source=editors&ust=1674147484249928&usg=AOvVaw1D2yPJG-nhAEyLV0yi9E27)

### Wallaby

[Wallaby](https://github.com/filecoin-project/testnet-wallaby/&sa=D&source=editors&ust=1674147484250250&usg=AOvVaw020jTMXQdGqzyw-rMVExTA) testnet is a bleeding-edge test network for the programmability features being developed for the FVM. You can deploy EVM-compatible smart contracts to Wallaby. Wallaby is reset every week, making it unsuitable for long-term testing of applications. The purpose of Wallaby is to allow developers to quickly poke and prod at any new features released within the latest development builds of the FVM. The Wallaby test is intended to be used by: the FVM engineering team to test FEVM releases and updates, early builders from the community to test EVM smart contract deployment on FVM, and to deploy native FVM actors.

You can find [Wallaby-specific documentation](http://kb.factor8.dev/docs/filecoin/testnets/wallaby&sa=D&source=editors&ust=1674147484250612&usg=AOvVaw1oYhw9JpWeLrlhI7ZoqtHB) here.

- Public endpoint: [https://wallaby.node.glif.io/rpc/v0](https://wallaby.node.glif.io/rpc/v0&sa=D&source=editors&ust=1674147484250892&usg=AOvVaw0kR0Yy732gPgCek-6k-QqM)
- Blockchain explorer: [https://wallaby.filfox.info/en](https://wallaby.filfox.info/en&sa=D&source=editors&ust=1674147484251220&usg=AOvVaw2pcwlDyfIvWdC5yhVi1D16)
- Faucet:  [https://wallaby.network/#faucet](https://wallaby.network/%23faucet&sa=D&source=editors&ust=1674147484251572&usg=AOvVaw1r3dXEaUXlCD51OmZWjk8e)

Filecoin has several block explorers that allow you to view individual transactions and messages across the Filecoin network. Here are some block explorers that support the FVM testnets:

- [Glif](https://explorer.glif.io/actor/?network%3Dwallaby&sa=D&source=editors&ust=1674147484251988&usg=AOvVaw2eM9oifMb-ITf0zGE4ysr5)
- [Filexplorer](https://explorer.filmine.io/&sa=D&source=editors&ust=1674147484252325&usg=AOvVaw2NVjQ5fJjCO3wv0NxHV1Vu)

There are many dev tools available for developing on Filecoin. Some example libraries are:

- [Filecoin.sol](https://docs.zondax.ch/fevm/filecoin-solidity/&sa=D&source=editors&ust=1674147484252707&usg=AOvVaw1G1AHhwFGOY8imXshSHVE3): in the context of the Filecoin EVM, a Solidity library is required to allow Solidity smart contracts to seamlessly call methods on Filecoin built-in actors, as well as to access Filecoin specific syscalls idiomatically.
- [F](https://github.com/Zondax/filecoin-signing-tools&sa=D&source=editors&ust=1674147484253062&usg=AOvVaw1fKrsLLihJyUHzatkMXcxH)[ilecoin-signing-tools](https://github.com/Zondax/filecoin-signing-tools&sa=D&source=editors&ust=1674147484253223&usg=AOvVaw2H7_vj_D0KT3uTZLh2UB2E): it is a JSON RPC library for creating signed messages in the Filecoin network.
