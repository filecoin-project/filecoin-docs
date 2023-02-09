---
title: "Networks"
description: "There are several Filecoin networks available, each of which serves a different purposes. This page covers each network, it's use-case, and how to connect to it."
lead: "There are several Filecoin networks available, each of which serves a different purposes. This page covers each network, it's use-case, and how to connect to it."
draft: false
images: []
type: docs
menu:
  intro:
    parent: "lorem"
    identifier: "network-6dbd9740092466c18c550116228cf5ec"
weight: 90
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
