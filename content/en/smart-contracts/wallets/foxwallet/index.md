---
title: "FoxWallet"
description: "This page explains what FoxWallet is, and how to integrate it into the Filecoin network."
lead: "FoxWallet is a decentralized, multi-chain wallet with full support for Filecoin. It integrates with the Filecoin Ethereum Virtual Machine (FEVM), allowing users to easily transfer FIL to and from the f4 address without manual setup."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-wallets"
    identifier: "foxwallet-267ec13d0fa955434668596c120d0f35"
weight: 320
toc: true
---

FoxWallet uses Filecoin's built-in [FilFowarder]({{< relref "/smart-contracts/wallets/filforwader" >}}), a smart contract that lets users transfer FIL from an Ethereum-based `f4` address to a Filecoin address of a different type, in the backend. This guide shows you how to transfer FIL between the two types of addresses via Foxwallet.

## Setup and configuration
1. [Download FoxWallet](https://foxwallet.com/download) 
1. Open the FoxWallet application.
1. For the purpose of this tutorial, we will save the steps in creating/importorting a wallet in the link [here](https://hc.foxwallet.com/docs/basic/create-wallet)

## Transfer from f1 to f4 
1. In "Me" — "Networks", you can find `Filecoin` and `Filecoin EVM` out there. The `Filecoin` network uses the `f1` address, while `Filecoin EVM` uses the Ethereum-style `0x` address. Select these two networks.

    ![Add Network](add-network.png)

1. Go to the "Wallet" page. Tap the switch icon on the top left corner and choose `Filecoin EVM` network.

    ![Tap Switch Icon](tap-switch-icon.png)![Choose Filecoin EVM](choose-fevm.png)

1. Click `Receive` to get your Ethereum-style `0x` address, copy it.

    ![Copy 0x Address](copy-0x-addr.png)

1. Switch to `Filecoin` network.

    ![Choose Filecoin](choose-fil.png)

1. Click `Send` and paste the `0x` address you just copied in the blank under `To address`. The corresponding `f4` address will be displayed underneath automatically.

    ![Transfer from f1 to f4](transfer-from-f1-to-f4.png)

1. Input the amount of FIL you’d like to transfer and click `Confirm`, check out your account balance later.

## Transfer from f4 to f1
1. Go to the "Wallet" page. Tap the switch icon on the top left corner and choose `Filecoin` network.

    ![Tap Switch Icon](tap-switch-icon.png)![Choose Filecoin](choose-fil.png)

1. Click `Receive` to get your `f1` address, copy it.

    ![Copy f1 Address](copy-f1-addr.png)

1. Switch to `Filecoin EVM` network.

    ![Choose Filecoin EVM](choose-fevm.png)

1. Click `Send` and paste your `f1` address you just copied in the blank under `To address`. 

    ![Transfer from f4 to f1](transfer-from-f4-to-f1.png)

1. Input the amount of FIL you’d like to transfer and click `Confirm`, check out your account balance later.