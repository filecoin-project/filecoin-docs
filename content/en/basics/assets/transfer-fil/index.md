---
title: "Transfer FIL"
description: "Due to the nature of Filecoin and Etheruem having different address types in the Filecoin network, the process for transfering FIL between addresses can be a bit nuanced. This page explains the process for transferring FIL."
lead: "Due to the nature of Filecoin and Etheruem having different address types in the Filecoin network, the process for transfering FIL between addresses can be a bit nuanced. This page explains the process for transferring FIL."
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-assets"
    identifier: "transfer-fil-64e3212081d842e80c9baad9801a9e8d"
weight: 540
toc: true
aliases:
    - "/smart-contracts/wallets/transfer-fil/"
    - "/smart-contracts/wallets/fil-to-zero-x/"
---


Etheruem-style addresses start with `0x`. Filecoin addresses start with `f`. There are four paths for transferring funds across the Filecoin network depending on which address type you are transferring from and to:

|   | From an Eth-style address | From a Filecoin address |
| --- | --- | --- |
| **To an Eth-style address** | [Ethereum → Ethereum](#eth-style-address--eth-style-address) | [Filecoin → Ethereum](#filecoin--eth-style-address) |
| **To a Filecoin address** | [Ethereum → Filecoin](#eth-style-address--filecoin) | [Filecoin → Filecoin](#filecoin--filecoin) |

{{< alert >}}
⚠️ **ASSETS ON THE FILECOIN NETWORK ARE NOT AVAILABLE ON ANY OTHER NETWORK**.<hr>Remember that Filecoin is fully compatible with Ethereum tools, like wallets. But that doesn’t mean you’re using the Ethereum network. These instructions transfer assets only within the Filecoin network. [Learn how to configure your Ethereum wallet on the Filecoin network]({{< relref "/smart-contracts/wallets/metamask" >}}).
{{< /alert >}}
<!-- Use the form below to find out which type of transfer you should use: -->

<!-- {{< filecoin-transfer >}} -->

## Eth-style address → Eth-style address

There are no special steps or requirements for sending Filecoin from one Eth-style address to another on the Filecoin network. Follow the standard process for your wallet. [MetaMask has a simple guide](https://support.metamask.io/hc/en-us/articles/360015488931-How-to-send-tokens-from-your-MetaMask-wallet) for how to send Ethereum from one account to another.

## Eth-style address → Filecoin

Use the [FilForwarder process]({{< relref "/smart-contracts/wallets/filforwader" >}}).

## Filecoin → Eth-style address

Currently, most wallets and exchanges only support `f1` or `f3` addresses. The majority of exchanges are still implementing support for `f4` addresses. This means that many wallets and exchanges won’t let you directly transfer FIL to an `f4` address. The process for sending FIL from a Filecoin address to an Ethereum address depends on the kind of wallet you have.

### Ledger device

Currently, Ledger Live does not support `0x` or `f4` addresses, so you cannot use it to directly send funds to a `0x` address. However, you can connect your Ledger device to the Glif.io wallet and transfer FIL from a Filecoin address to an Etheruem-style `0x` address. This method is more secure than the [Hot wallet](#hot-wallet) method detailed below since your private keys never leave your Ledger device.

In this method, you will connect your Ledger device to the Glif.io website app and use the app to send FIL from your Ledger to an Eth-style address.

1. Log in to the Ledger Live dashboard and update your Ledger device’s Filecoin app to version `0.22.9`:
1. Ensure your Ledger device is connected to your computer and the Filecoin app is open on your hardware wallet. Your Ledger should display **Filecoin ready**:
1. Go to [Glif](https://glif.io) and click **Connect Wallet**:
1. Select **Ledger (Filecoin)** and unlock your Ledger device, selecting the Filecoin application:
1. Once connected, you should see the details of your Filecoin account stored on your Ledger:
1. Click **Send FIL**.
1. Enter the Eth-style `0x` address you wish to send to. Glif will automatically convert the `0x` address into an `f4` address.
1. Enter the amount of FIL you want to send.
1. Click **Send**.
1. Verify the information is correct and accept the transaction on your hardware device.
1. You can check the status of this transfer by clicking the transaction ID link:
1. The transferred FIL will take around two minutes to show up at the Eth-style `0x` address.

### Hot wallet

A hot wallet is a cryptocurrency wallet that is always connected to the internet. They allow you to store, send, and receive tokens. Because hot wallets are always connected to the internet, they tend to be somewhat more vulnerable to hacks and theft than cold storage methods. However, they a generally easier to use than cold wallets and do not require any specific hardware like a Ledger device.

In this method, you will create a _burner wallet_ using Glif, transfer FIL to the burner wallet, and then transfer FIL from the burner wallet to Metamask.

1. Navigate to [https://wallet.glif.io/](https://wallet.glif.io/).
1. Under **Burner wallets**, click **Create Seed Phase**.
1. Write down your seed phrase somewhere safe. You can also copy or download the seed phrase. You will need it later.
1. Click **I've recorded my seed phrase**.
1. Using your seed phrase, enter the missing words in the blank text fields.
1. Click **Next**.
1. Click **Next** again.
1. In the upper left corner of your wallet dashboard, click on the double squares icon next to your address to copy it.
1. Record this address. You will need it later.
1. From your main wallet account or exchange, transfer some funds to this address.
1. From Metamask, copy your 0x address.
1. Once the funds appear in the burner wallet, click on **Send**.
1. Enter the necessary information into the text fields:
   - In the **Recipient** field, enter your 0x style address. GLIF automatically converts it to an f4 address.
   - In the **Amount** field, enter the amount of Fil to send.
   - In **Params**, add optional Base64 parameters. 
1. Click **Review**.
1. Once you've reviewed, click **Send**.
1. The Fil will arrive in your Metamask wallet shortly.

## Filecoin → Filecoin

There are no special steps or requirements for sending Filecoin from one Filecoin-style address to another on the Filecoin network.
