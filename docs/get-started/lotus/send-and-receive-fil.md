---
title: 'Lotus: send and receive FIL'
description: 'This guide will show you how to create and manage a Lotus wallet and how to use it to send some Filecoin to a different address. Each node can have multiple addresses.'
breadcrumb: 'Send and receive ⨎'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

To receive and send FIL with Lotus, you will need to have a [Lotus node installed and running](installation.md).

[[TOC]]

## Creating a wallet

### Create a BLS wallet

```bash
lotus wallet new bls
```

### Create a secp256k1 wallet

```bash
lotus wallet new
```

### Create a multisig wallet

```bash
lotus msig create address1 address2..
```

This will create a new address and print it. You can distinguish mainnet from testnet addresses because they start with `f` for mainnet and `t` for testnets.

::: warning
The information for the addresses in your wallet is stored in the `~/.lotus/keystore` (or `$LOTUS_PATH/keystore`). Removing these folders will also remove the keys, and you will lose control of any funds in those wallets. We recommend [backing up your wallets](#exporting-and-importing-addresses) as soon as they have been created or using a [hardware wallet](ledger.md).
:::

## Listing addresses

You can create as many addresses as you need. One of them will be the _default address_.

You can see a list of all addresses for your current node:

```bash
lotus wallet list
```

You can see the default address with:

```bash
lotus wallet default
```

If you wish, you can change the default address to a different one:

```bash
lotus wallet set-default <address>
```

## Obtaining FIL

For non-mainnet networks, `FIL` can be obtained from a faucet. A list of faucets is available on the [networks dashboard](https://networks.filecoin.io). For mainnet, the easiest is to buy `FIL` from an exchange. Not all exchanges support `FIL`, so do your research before signing up.

Once you have received some `FIL`, use `wallet balance` to check your balance:

```bash
lotus wallet balance
```

Remember that you will only see the latest balance when your daemon is fully synced.

## Sending FIL

Send FIL from the _default addresss_ by running:

```bash
lotus send <target address> <FIL amount>
```

To send FIL from a specific address:

```bash
lotus send --from=<sender address> <target address> <FIL amount>
```

For advanced sending options:

```bash
lotus send --help
```

Every transaction that sends `FIL` pays an additional fee based on its _gas_ usage. Gas and fees are explained in the [How Filecoin Works guide](../../about-filecoin/how-filecoin-works.md). By default, Lotus automatically sets all the necessary values. However, you may want to use the `--gas-feecap` flag in the `send` command to avoid surprises when network congestion is high. For more information about messages and fees, see the [Message Pool guide](../../mine/lotus/message-pool.md) and [Gas fees](../../about-filecoin/how-filecoin-works/#gas-fees) sections.

## Exporting and importing addresses

::: warning
Keep your addresses' private keys safe! Do not share them with anyone! Store them in a secure location!
:::

You can export and re-import a wallet, including a different Lotus node. Use `wallet export` to export an address from a node:

```bash
lotus wallet export <address> > <address>.key
```

Use `wallet import` to import an address into a node:

```bash
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
