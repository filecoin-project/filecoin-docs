---
title: "Networks"
description: "Find out information about which networks are available, what their scheduled uptime is, and how you can connect to each network."
lead: "Find out information about which networks are available, what their scheduled uptime is, and how you can connect to each network."
draft: false
images: []
type: docs
menu:
  developers:
    parent: "lorem"
    identifier: "testnets-72882f7fc2bd635f217195194c89146a"
weight: 100
toc: true
aliases:
    - "/fvm/reference/networks/"
    - "/networks"
    - "/networks/available-networks"
    - "/networks/overview/"
---

{{< beta-warning >}}

## Available networks

Here is a quick summary of networks available for Filecoin development:

| Name | Type | Reset frequency | Faucet |
| ---- | ---- | --------------- | ------ |
| [Mainnet](#mainnet) | Live production network | Never | None |
| [Builder testnet (buildernet)](#mainnet) | Testnet | Only in the event of irrecoverable damage. | [`faucet.calibration.fildev.network`](https://faucet.calibration.fildev.network/) |
| [Wallaby testnet](#wallaby-testnet) | Testnet | Weekly | [`wallaby.network#faucet`](https://wallaby.network/#faucet)

### Mainnet

Mainnet is the live production network that all nodes on the Filecoin network are connected to.

### Wallaby testnet

The Wallaby testnet is a _bleeding-edge_ test network for the programmability features being developed for the FVM. You can deploy both WASM actors and EVM-compatible smart contracts to Wallaby. Wallaby is reset every week, making it unsuitable for long-term testing of applications. The purpose of Wallaby is to allow developers to quickly poke and prod at any new features released within the latest development builds of the FVM.

The Wallaby test is intended to be used by:

- The FVM engineering team to test FEVM releases and updates.
- Early builders from the community to test EVM smart contract deployment on FVM.
- Early builders deploying native FVM actors.

The Wallaby testnet is operated and maintained by [Factor8 Solutions](https://github.com/Factor8Solutions). You can find Wallaby-specific documentation written by Factor8 at [kb.factor8.dev/docs/filecoin/testnets/wallaby](https://kb.factor8.dev/docs/filecoin/testnets/wallaby).
