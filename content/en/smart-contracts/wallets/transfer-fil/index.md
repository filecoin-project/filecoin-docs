---
title: "Transfer FIL"
description: "Due to the nature of Filecoin and Etheruem having different address types in the Filecoin network, the process for transfering FIL between addresses can be a bit nuanced. This page explains the process for transferring FIL."
lead: "Due to the nature of Filecoin and Etheruem having different address types in the Filecoin network, the process for transfering FIL between addresses can be a bit nuanced. This page explains the process for transferring FIL."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-wallets"
    identifier: "transfer-fil-3ae8c802a628a91d82d01d0949e4b18e"
weight: 100
toc: true
---

## Sending FIL from a Filecoin Eth account

To send FIL from an Eth account, you will need to use an Ethereum wallet such as MetaMask. The exact process depends on the destination. 

To send FIL from an Eth account, connected to the Filecoin network, you will need to use an Ethereum wallet such as MetaMask. The exact process depends on the destination. 

### Sending to another Eth-style (0x) address

Simply open your Ethereum wallet and use its transfer function. It doesn’t matter if the destination is an account or a smart contract. You can follow the [standard MetaMask instructions](https://support.metamask.io/hc/en-us/articles/360015488931-How-to-send-tokens-from-your-MetaMask-wallet).

### Sending to a `f` (Filecoin) address

Check out the [FilFowarder]({{< relref "/smart-contracts/wallets/filforwader" >}}) article we put together.

## Funding a Filecoin Eth account

### From an exchange

The following exchanges support withdrawing directly to Filecoin Eth accounts:

- Anchorage
- Bittrex
- Btcturk
- Coinbase
- Gemini
- Huobi
- Kraken

### From another Eth account

The process is exactly the same as [Sending to another Eth-style (0x) address](#sending-fil-from-a-filecoin-eth-account), just in reverse!
