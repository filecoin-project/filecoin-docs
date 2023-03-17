---
title: "Transfer FIL"
description: "Because Filecoin and Etheruem have different address types, the process for transferring FIL between addresses in the Filecoin network varies. This page explains the processes available and when they should be used."
lead: "Because Filecoin and Etheruem have different address types, the process for transferring FIL between addresses in the Filecoin network varies. This page explains the processes available and when they should be used."
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

The process by which you transfer FIL will vary depending on whether you are sending from [an Eth-style (`0x`) account](#ethereum-style-account) or [a Filecoin-style (`f1`, `f2`, `f3`) account](#filecoin-style-account).

## Ethereum-style account

The exact process to send FIL from a Filecoin Ethereum-style (`0x`) account on the Filecoin network depends on the destination. If your destination is:

- **Another Ethereum-style (`0x`) address**, you have two options:

  - Simply open your Ethereum wallet and use its transfer function. It doesn’t matter if the destination is an account or a smart contract. You can follow the [standard MetaMask instructions](https://support.metamask.io/hc/en-us/articles/360015488931-How-to-send-tokens-from-your-MetaMask-wallet).
  - Use one of the [supported exchanges](#exchanges-that-support-0x).


  </br>


- **A Filecoin-style (`f1`, `f2`, `f3`) address**, check out the [FilFowarder]({{< relref "/smart-contracts/wallets/filforwader" >}}) article we put together.

## Filecoin-style account

The exact process to send FIL from a Filecoin-style (`f1`, `f2`, `f3`)  account on the Filecoin network depends on the destination. If your destination is:

- **Another Filecoin-style (`f1`, `f2`, `f3`) address**, use a Filecoin wallet, such as [Glif](https://glif.io) or [Ledger Live](https://www.ledger.com/ledger-live). Just enter the f-style address and make the transfer as per the wallet instructions.

- **An Ethereum-style (`0x`) address**, you can:
  - Use one of the methods described in [Transfer Fil to a 0x address]({{< relref "fil-to-zero-x" >}}) based on your specific situation.
  - Use one of the [supported exchanges](#exchanges-that-support-0x).

## Exchanges that support 0x

If you are funding a Filecoin Ethereum-style (`0x`) account from an exchange, you must use one that supports this account type account. The following exchanges support withdrawing directly to Filecoin Ethereum-style addresses:

{{< alert  >}}
Any exchange that trades Filecoin, but is not listed below, can only send FIL directly to an `f3` address.
{{< /alert >}}

  - [Anchorage](https://www.anchorage.com/)
  - [Bittrex](https://bittrex.com/)
  - [Btcturk](https://www.btcturk.com/)
  - [Kraken](https://www.kraken.com/)
