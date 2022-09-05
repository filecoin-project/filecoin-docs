---
title: "FIL token"
description: "FIL is the native token of the Filecoin network. This page explains how to acquire, store, and use FIL tokens."
menu:
    about:
        parent: "about-filecoin-assets"
weight: 60
---

## Wallets

`FIL` is the native token of the Filecoin network. FIL tokens are used as an economic incentive to ensure data is stored reliably over time.

Wallets provide a way to securely store digital assets. Here are some wallets with FIL support that you might consider.

Note: If you are already running your own lotus node, you can also [manage FIL wallets from the command line](https://lotus.filecoin.io/lotus/manage/manage-fil/).

We do not provide technical support for any of these wallets.

 Name                                           | Description                                                                                                                          | Audited |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [Filfox wallet](https://wallet.filfox.info/en) | A browser-based wallet.                                                                                                              | Unknown |
| FilSnap MetaMask plugin                        | MetaMask has a plugin system called [Snaps](https://github.com/MetaMask/metamask-snaps-beta/wiki). This system is currently in beta. | No      |
| [FilWallet](https://filwallet.co) | A FIL-focused crypto wallet, available on Android and iOS. | Unknown |
| [FoxWallet](https://foxwallet.com/)            | A multi-currency mobile wallet by Filfox.                                                                                             | Yes     |
| [Glif web wallet](https://wallet.glif.io)                                | Supports sending & receiving FIL. Can be integrated with a Ledger hardware device.                                                   | Yes     |
| [ImToken](https://token.im/)                   | A multi-currency wallet.                                                                                                             | Unknown |
| [MathWallet](https://mathwallet.org/en-us/)    | A multi-currency wallet.                                                                                                             | Unknown |
| [Trust wallet](https://trustwallet.com/)                                   | A multi-currency wallet. This is the official wallet of Binance.                                                                     | Unknown |

### Hot versus cold

Hot wallet refers to any wallet which is permanently connected to the internet. They can be mobile, desktop, or browser based. Hot wallets make it faster and easier to access digital access, but being could be vulnerable to online attacks. Therefore, it is recommended to keep large balances in cold wallets and only use hot wallets to hold funds you need to access frequently.

Cold wallets most commonly refer to hardware wallet devices shaped like a USB stick. They are typically offline, and only connected to the internet for transactions. Accessing a cold wallet typically requires physical possession of the device plus knowledge of the private key, which makes them more resistant to loss via theft. Cold wallets can be less convenient, and are most useful for storing larger balances securely. 

### Security

Wallets that have gone through an audit have had their codebase checked by a recognized security firm for security vulnerabilities and potential leaks. However, just because a wallet has had an audit does not mean that it’s 100% bug-proof. Be incredibly cautious when using unaudited wallets.

Never share your seed phrase, password, or private keys. Bad actors will often use social engineering tactics such as phishing emails or posing as customer service or tech support to lure users into handing over their private key or seed phrase.

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

## Denominations of Filecoin

Much like how a US penny represents a fraction of a US dollar, there are many ways to represent value using Filecoin. This is because some actions on the Filecoin network require substantially less value than 1 whole `FIL`. The different denominations of `FIL` you may see referenced across the ecosystem are:

| Name     | Decimal             |
| -------- | ------------------- |
| FIL      | 1                   |
| milliFIL | 1,000                |
| microFIL | 1,000,000             |
| nanoFIL  | 1,000,000,000          |
| picoFIL  | 1,000,000,000,000       |
| femtoFIL | 1,000,000,000,000,000    |
| attoFIL  | 1,000,000,000,000,000,000 |
