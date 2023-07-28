---
description: >-
  Due to the nature of Filecoin and Ethereum having different address types in
  the Filecoin network, the process for transfering FIL between addresses can be
  a bit nuanced.
---

# Transfer FIL

After FVM launched, a new Ethereum-compatible address type (`f410` address) was introduced to the Filecoin network. This new `f410` address can be converted into Ethereum-style addresses start with `0x` so that it could be used in any Ethereum-compatible toolings or dApps. Filecoin addresses start with `f` so we will use `f` address in this tutorial. And Ethereum-style addresses start with `0x` so we will use `0x` address in this tutorial.

There are four paths for transferring FIL tokens across the Filecoin network depending on which address type you are transferring from and to.

|                        | From an `0x` address                                                                                                | From a `f` address                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **To an `0x` address** | [`0x` => `0x` address](https://docs.filecoin.io/basics/assets/transfer-fil/#eth-style-address-to-eth-style-address) | [`f` =>`0x` address](https://docs.filecoin.io/basics/assets/transfer-fil/#filecoin-to-eth-style-address) |
| **To a `f` address**   | [`0x` => `f` address](https://docs.filecoin.io/basics/assets/transfer-fil/#eth-style-address-to-filecoin)           | [`f` => `f` address](https://docs.filecoin.io/basics/assets/transfer-fil/#filecoin-to-filecoin)          |

{% hint style="warning" %}
**ASSETS ON THE FILECOIN NETWORK ARE NOT AVAILABLE ON ANY OTHER NETWORK.**\
\
Remember that Filecoin is fully compatible with Ethereum tools, like wallets. But that doesn’t mean you’re using the Ethereum network. These instructions transfer assets only within the Filecoin network. [Learn how to configure your Ethereum wallet on the Filecoin network](https://docs.filecoin.io/basics/assets/metamask-setup/).
{% endhint %}

## 0x => 0x address

If you want to transfer FIL tokens from one `f4` address to another `f4` address using their corresponding `0x` addresses, you need to understand how to convert between `f4` and `0x` address.

* If you have `f4` address, you can convert it to `0x` address using [Beryx Address converter](https://beryx.zondax.ch/address\_converter).
* If you have `0x` address, you can directly search it on [Filfox Explorer](https://filfox.info/en) which will show `0x` address and corresponding `f4` address.

Apart from that, you just need to follow the standard process using your preferred Ethereum-compatible wallet, like MetaMask, MethWallet, etc. For instance, [MetaMask has a simple guide](https://support.metamask.io/hc/en-us/articles/360015488931-How-to-send-tokens-from-your-MetaMask-wallet) for how to send Ethereum from one account to another.

## 0x => f address

If you want to transfer FIL tokens from Ethereum style `0x` address to other Filecoin address type, like `f1` or `f3` address, fellow the steps in [FilForwarder](https://docs.filecoin.io/smart-contracts/filecoin-evm-runtime/filforwader/) tutorial .

## f => 0x address

Most wallets and exchanges currently support Filecoin `f1` or `f3` addresses, and many of them already fully support `f4` and `0x` address, includes [OKX](https://www.okx.com/markets/prices/filecoin-fil), [Kraken](https://www.kraken.com/), [Btcturk](https://www.btcturk.com/), etc. But there are some exchanges are still implementing the support for `f4` addresses. If your preferred wallets and exchanges won’t let you directly transfer FIL to an `f4` or Ethereum-style `0x` address, We recommend filing a support issue with the exchange to help accelerate the support of `f4` addresses.

The process for sending FIL from a Filecoin `f` address to an Ethereum-style `0x` address depends on the wallet or exchanged you use.

### Ledger device

Currently, Ledger Live has not supported `0x` or `f4` addresses yet, so you cannot directly use it to send FIL token to a `0x` or `f4` address. However, you can connect your Ledger device to the [Glif.io](https://www.glif.io/s) wallet and transfer FIL from a Filecoin `f1/f3` address to an Ethereum-style `0x` address. This method is more secure than the [Hot wallet](https://docs.filecoin.io/basics/assets/transfer-fil/#hot-wallet) method detailed below since your private keys never leave your Ledger device.

In this method, you will connect your Ledger device to the [Glif.io](https://www.glif.io/) website and send FIL from your `f` address on the Ledger to an Ethereum-style `0x` address.

1.  Ensure your Ledger device is connected to your computer, then log in to the Ledger Live dashboard and update your Ledger device’s Filecoin app to version `0.22.9`.\


    ![Ledger Live](https://docs.filecoin.io/basics/assets/transfer-fil/ledgerLive\_hu2a4e0fb1de61884a5bd5c4e4971ba817\_136642\_1000x0\_resize\_q75\_h2\_box\_3.webp)
2. Make sure Filecoin app is open on your Ledger wallet. Your Ledger should display **Filecoin ready**.
3.  Go to [Glif](https://glif.io) and click **Connect Wallet**.\


    ![Connect Wallet](https://docs.filecoin.io/basics/assets/transfer-fil/connectWallet\_hu5059cdeebd3ff5e4211dd876895c1e2a\_307203\_1000x0\_resize\_q75\_h2\_box\_3.webp)
4.  Select **Ledger (Filecoin)** and unlock your Ledger device, selecting the Filecoin application.\


    ![Choose Ledger(Filecoin)](https://docs.filecoin.io/basics/assets/transfer-fil/LedgerFilecoin\_huce9876b12b253c146286eb111369708b\_287011\_1000x0\_resize\_q75\_h2\_box\_3.webp)
5.  Once connected, you should see the details of your Filecoin account stored on your Ledger. Click **Send FIL**.\


    ![Send FIL](https://docs.filecoin.io/basics/assets/transfer-fil/sendFIL\_huba2822ca70a37641c4d623de30d9d397\_315407\_1000x0\_resize\_q75\_h2\_box\_3.webp)
6.  Enter the `0x` address you wish to send to. Glif will automatically convert the `0x` address into an `f4` address.\


    ![Transfer details](https://docs.filecoin.io/basics/assets/transfer-fil/sendDetail\_hu5e488c638eb865c3a47aa7708f1d8ff4\_260489\_1000x0\_resize\_q75\_h2\_box\_3.webp)
7. Enter the amount of FIL you want to send. Click **Send**.
8. Verify the information is correct and accept the transaction on your hardware device.
9. The transferred FIL will show up at the Eth-style `0x` address once this transaction is finalized on-chain which will take 60 - 90 seconds.
10. You can check the status of this transfer by clicking the transaction ID link.\


    ![Transaction Detail on Filfox](https://docs.filecoin.io/basics/assets/transfer-fil/transactionDetail\_hu9c0eccad97a4373b04bf45989c9c1fb2\_40552\_1400x0\_resize\_q75\_h2\_box\_3.webp)

You can also follow this [Guide: How to transfer FIL from Ledger to MetaMask (0x)](https://blog.filecointldr.io/guide-how-to-transfer-fil-from-ledger-to-metamask-0x-9760f869b28e).

### Hot wallet

A hot wallet is a cryptocurrency wallet that is always connected to the internet. They allow you to store, send, and receive tokens. Because hot wallets are always connected to the internet, they tend to be somewhat more vulnerable to hacks and theft than cold storage methods. However, they a generally easier to use than cold wallets and do not require any specific hardware like a Ledger device.

If you want to transfer your FIL tokens from `f1\f3` to `0x` address, but the wallet or exchange you are using does not support `f4` and `0x` style address. Then you can create a _burner wallet_ using Glif, transfer FIL to the burner wallet, and then transfer FIL from the burner wallet to `0x` address on MetaMask.

1.  Navigate to [https://wallet.glif.io/](https://wallet.glif.io/). Create a **Burner wallets**.\


    ![Create burner wallet](https://docs.filecoin.io/basics/assets/transfer-fil/burnerWallet\_hu079724c22f01c8e62902f132b6909a71\_275053\_1000x0\_resize\_q75\_h2\_box\_3.webp)
2.  Click **Create Seed Phase**. Write down your seed phrase somewhere safe. You can also copy or download the seed phrase. You will need it later.\


    ![Seed phase](https://docs.filecoin.io/basics/assets/transfer-fil/seedPhase\_hu428f1ff0680d270c88184bb48614e57f\_201345\_1000x0\_resize\_q75\_h2\_box\_3.webp)
3. Click **I’ve recorded my seed phrase**. Using your seed phrase, enter the missing words in the blank text fields.
4. Click **Next**, and then **Connect**. The burner wallet is created
5.  In the upper left corner of your wallet dashboard, click on the double squares icon next to your address to copy it. Record this address. You will need it later.\


    ![Copy the wallet address](https://docs.filecoin.io/basics/assets/transfer-fil/walletAddress\_hue27f6969c1e7add97ff304f9025250e6\_316503\_1000x0\_resize\_q75\_h2\_box\_3.webp)
6. From your main wallet account or exchange, transfer your FIL token to this address.
7. Connect to MetaMask, copy your `0x` address.
8.  Once the funds appear in the burner wallet, click on **Send FIL**.\


    ![Send FIL](https://docs.filecoin.io/basics/assets/transfer-fil/sendFIL\_huba2822ca70a37641c4d623de30d9d397\_315407\_1000x0\_resize\_q75\_h2\_box\_3.webp)
9.  Enter the necessary information into the text fields:

    * In the **Recipient** field, enter your `0x` style address. GLIF automatically converts it to an `f4` address.
    * In the **Amount** field, enter the amount of FIL to send. Make sure you have enough FIL to cover the GAS cost.\


    ![Fill out send detail](https://docs.filecoin.io/basics/assets/transfer-fil/sendDetail\_hu5e488c638eb865c3a47aa7708f1d8ff4\_260489\_1000x0\_resize\_q75\_h2\_box\_3.webp)
10. Click **Send**. The FIL will arrive in your MetaMask wallet shortly.

### Exchange

If you are transferring FIL from any exchange to your `0x` address on MetaMask, make sure the exchange supports withdrawing FIL to `0x` or `f410` address. If not, you will need extra steps to withdraw FIL token to your `0x` address. Let’s take Coinbase as an example, you can follow the this [Guide: How to transfer FIL from Coinbase to a Metamask Wallet (0x)](https://filecointldr.io/article/guide-how-to-transfer-fil-from-coinbase-to-a-metamask-wallet-0x).

## f to f address <a href="#f-to-f-address" id="f-to-f-address"></a>

There are no special steps or requirements for sending Filecoin from one Filecoin-style address to another on the Filecoin network.
