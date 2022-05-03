---
title: "Managing assets"
description: "Many interactions with the Filecoin network require FIL to process. This page explains the different denominations of FIL, how to store it, and how to aquire it."
menu:
    about:
        parent: "about-filecoin-assets"
weight: 60
---

## Wallets

Wallets allow you to manage your assets without having to meet the [relatively high specifications required to run a Lotus node]({{< relref "set-up" >}}) for Filecoin. Here are some wallets that you might consider.

{{< alert icon="warning" >}}
**Unaudited Wallets**

We do not support any of these wallets. We recommend that you use an audited wallet that comes with hardware-wallet integration, such as Glif web wallet. Wallets that _have_ gone through an audit have had their codebase checked by a recognized security firm for security vulnerabilities and potential leaks. However, just because a wallet has had an audit does not mean that it's 100% bug-proof. Be incredibly cautious when using unaudited wallets.
{{< /alert >}}

 Name                                           | Description                                                                                                                          | Audited |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [Filfox wallet](https://wallet.filfox.info/en) | A browser-based wallet.                                                                                                              | Unknown |
| FilSnap MetaMask plugin                        | MetaMask has a plugin system called [Snaps](https://github.com/MetaMask/metamask-snaps-beta/wiki). This system is currently in beta. | No      |
| [FoxWallet](https://foxwallet.com/)            | A multi-currency mobile wallet by Filfox.                                                                                             | Yes     |
| [Glif web wallet](https://wallet.glif.io)                                | Supports sending & receiving FIL. Can be integrated with a Ledger hardware device.                                                   | Yes     |
| [ImToken](https://token.im/)                   | A multi-currency wallet.                                                                                                             | Unknown |
| [MathWallet](https://mathwallet.org/en-us/)    | A multi-currency wallet.                                                                                                             | Unknown |
| [Trust wallet](https://trustwallet.com/)                                   | A multi-currency wallet. This is the official wallet of Binance.                                                                     | Unknown |

### Add a wallet to our list

If you have created a wallet, here's how to add it to our list:

- Create an issue in [Filecoin Docs](https://github.com/filecoin-project/filecoin-docs) with the name of the wallet and its features.
- If the wallet is a mobile wallet, it must be available on both Android and iOS.
- The wallet must have been audited. The results of this audit must be public.

## Exchanges

A cryptocurrency exchange, or simply just _exchange_, is a service that lets you swap cash for cryptocurrency, cryptocurrency for cash, or even one cryptocurrency for another cryptocurrency. They work similarly to currency exchanges that you find at airports, where you can swap your home currency for one of the countries you are traveling to. If you have purchased cryptocurrency before, you have likely used an exchange before.

There are many exchanges that allow users to buy, sell, and trade FIL. Websites like [coinmarketcap.com](https://coinmarketcap.com/currencies/filecoin/markets/) keep track of which exchanges support which cryptocurrencies. You can use these lists to help decide which exchange to use.

![Coinmarketcap show a list of exchanges that support FIL.](coinmarketcap-exchanges.png)

Once you have found an exchange you want to use, you will have to create an account with that exchange. Many exchanges have strict verification and Know-Your-Customer (KYC) processes in place, so it may take a few days to create your account. However, most large exchanges can verify your information in a few minutes.

Purchasing cryptocurrency varies from exchange to exchange, but the process is usually something like this:

1. Add funds to your exchange account in your local currency (USD, EUR, YEN, etc.).
1. Exchange your local currency for FIL at a set price.

### Send FIL from your exchange

Once you have FIL in your exchange account, you should be able to send some to the public [address]({{< relref "set-up" >}}) you made with your Lotus node. Again, the process for this is different for every exchange, but in general, it goes something like:

1. Submit a withdrawal request with the exchange, including:
    - How much FIL you would like to withdraw.
    - Where you want the FIL to be sent to. This value should be the public address `f16mwi...` you made with your Lotus node.
1. Wait for the withdrawal to finish.

Some exchanges place a limit on how much you can withdraw at once. The exchange may also place a time-lock on your withdrawal.

It may take a few minutes for your FIL to show up in your Lotus address. If you do not see the FIL in your Lotus address 30 minutes after the withdrawal is complete from your exchange, get in touch with your exchange's support team for help.

## Denominations of Filecoin

Much like how a US penny represents a fraction of a US dollar, there are many ways to represent value using Filecoin. This is because some actions on the Filecoin network require substantially less value than 1 whole `FIL`. The different denominations of `FIL` are:

| Name     | Decimal             |
| -------- | ------------------- |
| FIL      | 1                   |
| milliFIL | 1000                |
| microFIL | 1000000             |
| nanoFIL  | 1000000000          |
| picoFIL  | 1000000000000       |
| femtoFIL | 1000000000000000    |
| attoFIL  | 1000000000000000000 |
