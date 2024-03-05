---
description: >-
  Wallets provide a way to securely store Filecoin, along with other digital
  assets. These wallets consist of a public and private key, which work similarly
  to a bank account number and password.
---

# Wallets

When someone sends cryptocurrency to your wallet address, the transaction is recorded on the blockchain network, and the funds are added to your wallet balance. Similarly, when you send cryptocurrency from your wallet to someone else’s wallet, the transaction is recorded on the blockchain network, and the funds are deducted from your wallet balance.

There are various types of cryptocurrency wallets, including desktop, mobile, hardware, and web-based wallets, each with its own unique features and levels of security. It’s important to choose a reputable and secure wallet to ensure the safety of your digital assets.

## Compatible wallets

We do not provide technical support for any of these wallets. Please use caution when researching and using the wallets listed below. Wallets that have conducted third-party audits of their open-source code by a reputable security auditor are marked _recommended_ below.

If you are already running your own lotus node, you can also [manage FIL wallets from the command line](https://lotus.filecoin.io/lotus/manage/manage-fil/).

| Name                                                                                           | Description                                                                                                           | Audited |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------- |
| [Ledger](https://support.ledger.com/hc/en-us/articles/4402721277329-Filecoin-FIL?support=true) | A multi-currency hardware wallet. _Recommended._                                                                      | Yes     |
| [Glif web wallet](https://www.glif.io/en?txtype=send)                                                      | Supports sending & receiving FIL. Can be integrated with a Ledger hardware device. _Recommended._                     | Yes     |
| [Trust wallet](https://trustwallet.com/)                                                       | A multi-currency wallet, the official wallet of Binance.                                                                  | Unknown |
| [ImToken](https://token.im/)                                                                   | A multi-currency wallet.                                                                                              | Unknown |
| [MathWallet](https://mathwallet.org/en-us/)                                                    | A multi-currency wallet.                                                                                              | Unknown |
| [FoxWallet](https://foxwallet.com/)                                                            | A multi-currency mobile wallet by [Filfox](https://filfox.info/en).                                                   | Yes     |
| FilSnap MetaMask plugin                                                                        | MetaMask has a plugin system called [Snaps](https://github.com/MetaMask/metamask-snaps-beta/wiki), currently in beta. | Yes      |

### Hot versus cold

A hot wallet refers to any wallet that is permanently connected to the internet. They can be mobile, desktop, or browser-based. Hot wallets make it faster and easier to access digital assets but could be vulnerable to online attacks. Therefore, it is recommended to keep large balances in cold wallets and only use hot wallets to hold funds that need to be accessed frequently.

Cold wallets most commonly refer to hardware wallet devices shaped like a USB stick. They are typically offline and only connected to the internet for transactions. Accessing a cold wallet requires physical possession of the device plus knowledge of the private key, which makes them more resistant to theft. Cold wallets can be less convenient and are most useful for storing larger balances securely.

### Security

Wallets that have gone through an audit have had their codebase checked by a recognized security firm for security vulnerabilities and potential leaks. However, just because a wallet has had an audit does not mean that it’s 100% bug-proof. Be incredibly cautious when using unaudited wallets.

Never share your seed phrase, password, or private keys. Bad actors will often use social engineering tactics such as phishing emails or posing as customer service or tech support to lure users into handing over their private key or seed phrase.

### Add a wallet to our list

If you know of a wallet that supports Filecoin, you can submit a pull request to this page and add it!

* Create an issue in [`filecoin-project/filecoin-docs`](https://github.com/filecoin-project/filecoin-docs) with the name of the wallet and its features.
* If the wallet is a mobile wallet, it must be available on both Android and iOS.
* The wallet must have been audited. The results of this audit must be public.
