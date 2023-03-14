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

## Sending FIL from a Filecoin Eth-style (0x) account

To send FIL from an Eth-style (0x) account, on the Filecoin network, you will need to use an Ethereum wallet such as MetaMask. The exact process depends on the destination. 

### Sending to another Eth-style (0x) address

Simply open your Ethereum wallet and use its transfer function. It doesn’t matter if the destination is an account or a smart contract. You can follow the [standard MetaMask instructions](https://support.metamask.io/hc/en-us/articles/360015488931-How-to-send-tokens-from-your-MetaMask-wallet).

### Sending to a Filecoin-style (`f1`, `f2`, `f3`) address

Check out the [FilFowarder]({{< relref "/smart-contracts/wallets/filforwader" >}}) article we put together.

## Sending FIL from a Filecoin-style (`f1`, `f2`, `f3`) account

### Sending to another Filecoin-style (`f1`, `f2`, `f3`) address

Use a Filecoin wallet, such as [Glif](https://glif.io) or [Ledger Live](https://www.ledger.com/ledger-live). Just enter the f-style address and make the transfer as per the wallet instructions.

### Sending to an Eth-style (0x) address

#### Using a Ledger hardware wallet

NOTE: Currently Ledger Live does not support `0x` or `f4` addresses, so you cannot use it to directly send funds to a `0x` address.

Glif wallet supports both address styles, and can send from an `f1` address to a `0x` address. So you can connect your Ledger device to a Glif wallet. You get the benefit of Glif's functionality, with your keys remaining on your Ledger hardware wallet.

1. Ensure your Ledger device is connected to your computer and the Filecoin app is open on your hardware wallet and it says "Filecoin ready"
2. Go to [Glif](https://glif.io) and click "Connect Wallet" at the top of the screen
3. Select "Ledger (Filecoin)"
4. Click "Send FIL" at the bottom of the screen
5. Enter the `0x` address you with to send to and the amount
6. Click send
7. Verify and accept the transaction on your hardware device

#### Using a Glif 'burner' wallet

Burner wallets are intended for temporary use, and keys are generated in your browser. This is less secure than a hardware wallet, but very useful for small transfers of FIL

1. Go to [Glif](https://glif.io) and click "Connect Wallet" at the top of the screen
2. Select "Burner Wallet"
3. You can import a seed phrase, or private key, or select "Create seed phrase" to create a new wallet
4. Follow the instructions to create the wallet, noting down the seed phrase is you are creating a new one
5. Click "Send FIL" at the bottom of the screen
6. Enter the `0x` address you with to send to and the amount
7. Click send
8. Verify and accept the transaction on your hardware device
 

## Funding a Filecoin Eth account

### From an exchange that supports Filecoin Eth-style (0x) accounts

The following exchanges support withdrawing directly to Filecoin Eth-style (0x) addresses:

- Anchorage
- Bittrex
- Btcturk
- Coinbase
- Gemini
- Huobi
- Kraken

### From a cold wallet or exchange that does not yet support Filecoin Eth-style (0x) accounts

If your exchange or wallet does not yet support Filecoin Eth-style (0x) addresses, then you will need to create a new wallet to "relay" the funds through. You can create a Glif "Burner" wallet or use Glif wallet with a Ledger device as described above. 

### From another Eth account

The process is exactly the same as [Sending to another Eth-style (0x) address](#sending-fil-from-a-filecoin-eth-account), just in reverse!
