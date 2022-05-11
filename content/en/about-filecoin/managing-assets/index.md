---
title: "FIL token"
description: "Many interactions with the Filecoin network require FIL to process. Additionally, participants in hackathons may receive FIL as payment for bounties and prizes. This page explains the different denominations of FIL, how to store it, and how to acquire it."
menu:
    about:
        parent: "about-filecoin-assets"
weight: 60
---

## Wallets

<!--TODO: request out to Johnny to verify what goes in relref for the link in this section-->
Wallets provide a way to securely store digital assets. `FIL` is a native token, meaning it runs on its own blockchain and is not compatible with all wallets out of the box. [Wrapped FIL]{{< relref "wrapped-filecoin" >}} allows the token to interact with other blockchains if desired.

### Custodial vs. non-custodial

A custodial wallet is one which is hosted by an exchange. These wallets can come with a greater sense of security as the exchange holds the private keys. Many will also provide insurance to help recover funds lost to fraud, similar to centralized stock or bank accounts. The tradeoff is assets in custodial wallets can be frozen or seized by the associated exchange. Most custodial wallets also have KYC (Know Your Customer) requirements which require users to verify their identity in order to use the service.

With non-custodial wallets, the user holds their own private key and has total control over the movement of assets. Non-custodial wallet users are also solely responsible for securing their assets. Protecting private keys and seed phrases is extremely important to prevent fraudulent access to assets. Most non-custodial wallets do not have KYC requirements and allow users to maintain anonymity.

### Hot vs. cold

Hot wallet refers to any wallet which is permanently connected to the internet. They can be mobile, desktop, or browser based. Hot wallets make it faster and easier to access digital access, but being could be vulnerable to online attacks. Therefore, it is recommended to keep large balances in cold wallets and only use hot wallets to hold funds you need to access frequently.

Cold wallet most commonly refers to hardware wallet devices. Accessing a cold wallet typically requires physical possession of the device plus knowledge of the private key which makes them more resistant to loss via theft. Transaction signing happens within the device itself and private keys are never exposed to the network. Cold wallets can take longer to access and are most useful for storing larger balances securely. 

### Security

Wallets that have gone through an audit have had their codebase checked by a recognized security firm for security vulnerabilities and potential leaks. However, just because a wallet has had an audit does not mean that it’s 100% bug-proof. Be incredibly cautious when using unaudited wallets.

Never share your seed phrase, password, or private keys. Bad actors will often use social engineering tactics such as phishing emails or posing as customer service or tech support to lure users into handing over their private key or seed phrase.

Wallets allow you to manage your assets without having to meet the [relatively high specifications required to run a Lotus node]({{< relref "set-up" >}}) for Filecoin. Here are some wallets that you might consider.

We do not provide support for any of these wallets. We recommend that you use an audited wallet that comes with hardware-wallet integration, such as Glif web wallet.


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
| milliFIL | 1000                |
| microFIL | 1000000             |
| nanoFIL  | 1000000000          |
| picoFIL  | 1000000000000       |
| femtoFIL | 1000000000000000    |
| attoFIL  | 1000000000000000000 |
