---
title: 'Lotus: send and receive FIL'
description: 'This guide will show you how to create and manage a Lotus wallet and how to use it to send some Filecoin to a different address. Each node can have multiple addresses.'
breadcrumb: 'Send and receive ⨎'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

To receive and send FIL with Lotus, you will need to have a [Lotus node installed and running](installation.md).

[[TOC]]

## About Wallet Addresses

When using a wallet, an account is identified by its [address](/about-filecoin/how-filecoin-works.md#addresses). A Filecoin address always starts with the letter `f` and a digit that indicates what type of address it is.

Filecoin accounts have two kinds of address, longer **public key** addresses, and shorter **ID** addresses. Both addresses refer to the same account and can be used to send and receive FIL using a wallet.

#### Public Key Address

A [public key address](/about-filecoin/how-filecoin-works.md#public-key-addresses-f1-and-f3) is derived directly from a cryptographic key. Public key addresses start with the characters `f1` (secp256k1) or `f3` (BLS), depending on the type of encryption key used.

Here's an example of a secp256k1 public key address: `f1abjxfbp274xpdqcpuaykwkfb43omjotacm2p3za`.

Public key addresses are the most common way to refer to Filecoin accounts, and they are supported by hardware wallets like [Ledger](https://ledger.com).

Because a public key address does not depend on any blockchain state, they are considered [robust](/about-filecoin/how-filecoin-works.md#robust-addresses-versus-id-addresses) and are recommended for most use cases involving transfers of FIL, for example, when sending FIL to another user through an exchange.

#### ID Address

ID addresses are a compact and more "human friendly" way to refer to an account than public key addresses. ID addresses always start with the characters `f0`, followed by a sequence of digits, for example: `f033259`.

Every ID address for a Filecoin account has an alternative public key address that corresponds to the same account. You can find the ID address for any public key address by searching for the public key address on [FilFox](https://filfox.info/), a Filecoin block explorer.

Because they are more compact than public key addresses, ID addresses are often used when refering to miners and other long-lived Filecoin [Actors](/about-filecoin/how-filecoin-works.md#actors). As these actors receive a large volume of messages, the compact address can result in meaningful savings in gas fees. A multisig wallet is a type of Actor.

While you can send FIL to an ID address using a wallet, you should first check the details for the account on [FilFox](https://filfox.info/) to see when the account was created, as well as the corresponding public key address. If the address was created very recently (within the [finality period](/reference/glossary.md#finality)) there is a small chance that it could be re-assigned as the network reaches consensus, and the public key address should be used instead.

More information about Addresses can be found in the [How Filecoin works](../../about-filecoin/how-filecoin-works.md#addresses) section.

## Creating a wallet

### Create a BLS wallet

```shell
lotus wallet new bls
```

### Create a secp256k1 wallet

```shell
lotus wallet new
```

### Create a multisig wallet

```shell
lotus msig create address1 address2..
```

This will create a new address and print it. You can distinguish mainnet from testnet addresses because they start with `f` for mainnet and `t` for testnets.

::: warning
The information for the addresses in your wallet is stored in the `~/.lotus/keystore` (or `$LOTUS_PATH/keystore`). Removing these folders will also remove the keys, and you will lose control of any funds in those wallets. We recommend [backing up your wallets](#exporting-and-importing-addresses) as soon as they have been created or using a [hardware wallet](ledger.md).
:::

## Listing addresses

You can create as many addresses as you need. One of them will be the _default address_.

You can see a list of all addresses for your current node:

```shell
lotus wallet list
```

You can see the default address with:

```shell
lotus wallet default
```

If you wish, you can change the default address to a different one:

```shell
lotus wallet set-default <address>
```

## Obtaining FIL

For non-mainnet networks, `FIL` can be obtained from a faucet. A list of faucets is available on the [networks dashboard](https://network.filecoin.io). For mainnet, the easiest is to buy `FIL` from an exchange. Not all exchanges support `FIL`, so do your research before signing up.

Once you have received some `FIL`, use `wallet balance` to check your balance:

```shell
lotus wallet balance
```

Remember that you will only see the latest balance when your daemon is fully synced.

## Sending FIL

Use the `send` command followed by the receiving address and the amount of `FIL` you want to send

```shell with-output
# lotus send <target address> <FIL amount>
lotus send f1zp2... 3
```
```
bafy1...
```

Lotus will output a transaction hash after a successful transaction. You can view details of this transaction using a [Filecoin explorer](https://docs.filecoin.io/get-started/explore-the-network/#block-explorers).

Lotus assumes you want to send `FIL` from the _default address_. To send FIL from a specific address, use `--from` followed by the address you want to send `FIL` from. This address must have been created or imported to your Lotus node.

```shell with-output
# lotus send --from=<sender address> <target address> <FIL amount>
lotus send --from f1zp2... f15zt... 3.141
```
```
bafy2...
```

For advanced sending options:

```shell
lotus send --help
```

### Transaction fees

Every transaction that sends `FIL` pays an additional fee based on its _gas_ usage. Gas and fees are explained in the [How Filecoin Works guide](../../about-filecoin/how-filecoin-works.md). By default, Lotus automatically sets all the necessary values. However, you may want to use the `--gas-feecap` flag in the `send` command to avoid surprises when network congestion is high. For more information about messages and fees, see the [Message Pool guide](../../mine/lotus/message-pool.md) and [Gas fees](../../about-filecoin/how-filecoin-works/#gas-fees) sections.

## Exporting and importing addresses

::: warning
Keep your addresses' private keys safe! Do not share them with anyone! Store them in a secure location!
:::

You can export and re-import a wallet, including a different Lotus node. Use `wallet export` to export an address from a node:

```shell
lotus wallet export <address> > <address>.key
```

Use `wallet import` to import an address into a node:

```shell
lotus wallet import wallet.private
```

and:

### Offline nodes

Each node stores its wallet in `~/.lotus/keystore`:

```
~/.lotus/keystore/
├── MF2XI2...
├── MRSWMYLVNR...
├── NRUWE4BSOA...
├── O5QWY3DFOQWWMM3RNZSXI6TKOJYHQYTMMQZHQNDBNRY...
└── O5QWY3DFOQWWMM3VOBZHAZLCOIZGINLDMRZWWNLMNJS...
```

To export a wallet when a node is offline, copy these files _from_ `~/.lotus/keystore` to another location. To import this wallet, copy these files _into_ `~/.lotus/keystore`. The Lotus node will automatically use these keys when it next starts.
