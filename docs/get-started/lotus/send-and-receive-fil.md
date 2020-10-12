---
title: 'Lotus: send and receive FIL'
description: 'This guide will show you how to create and manage a Lotus wallet and how to use it to send some Filecoin to a different address.'
breadcrumb: 'Send and receive ⨎'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

In order to receive and send FIL with Lotus you will need to have [installed and be running a Lotus Node](installation.md).

[[TOC]]

## Creating a wallet

```bash
lotus wallet new bls
```

This will print your Filecoin address.

::: tip
Your wallet information is stored in the `~/.lotus/keystore` (or `$LOTUS_PATH/keystore`). For instructions on export/import, see below.
:::

## Listing wallets

You can create as many wallets as you need. One of them, will be the _default wallet_. You can list all wallets with:

You can create multiple wallets and list them with:

```bash
lotus wallet list
```

You can see the default wallet with:

```bash
lotus wallet default
```

If you wish, you can change the default wallet to a different one:

```bash
lotus wallet set-default <address>
```

## Obtaining FIL

FIL for non-mainnet networks can usually be obtained by using one of the Faucets (check URLs in the [Networks dashboard](https://networks.filecoin.io). For mainnet, the easiest is to buy FIL from an exchange supporting FIL-trading.

Once you have received some FIL, you can check your balance with:

```bash
lotus wallet balance
```

Remember that your will only see the latest balance when your daemon is fully synced to the current tip of the chain.

## Sending FIL

Send FIL from the _default wallet_ by running:

```bash
lotus send <target address> <amount>
```

To send FIL from a specific wallet:

```bash
lotus send --from=<sender address> <target address> <amount>
```

:::tip
Make sure to check `lotus send --help` for advanced options, like setting a limit to the price of fees.
:::

Every transaction sending FIL pays an additional fee based on its _gas_ usage. Gas and fees are explained in the [How Filecoin Works guide](../../about-filecoin/how-filecoin-works.md). By default, Lotus automatically sets all the necessary values, but you may want to use the `--gas-feecap` flag in the `send` command to avoid surprises when network congestion is high. For more information about messages, see the [Message Pool guide](../../mine/lotus/message-pool.md).

## Exporting and importing a wallet

::: warning
Keep your wallets' private keys safe!
:::

You can export and re-import a wallet, potentially to a different Lotus node, with:

```bash
lotus wallet export <address> > wallet.private
```

and:

```bash
lotus wallet import wallet.private
```

::: tip
If one of the nodes is offline, copying the files in `~/.lotus/keystore` directly should also work.
:::
