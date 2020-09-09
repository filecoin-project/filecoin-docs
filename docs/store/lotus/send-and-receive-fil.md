---
title: 'Lotus: send and receive FIL'
description: 'This guide will show you how to create and manage a Lotus wallet and how to use it to send some Filecoin to a different address.'
breadcrumb: 'Send and receive FIL'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

In order to receive and send FIL with Lotus you will need to have installed the program and be running the Lotus daemon.

## Creating a wallet

```bash
lotus wallet new bls
```

This will print your Filecoin address.

Your wallet information is stored in the `~/.lotus/keystore` (or `$LOTUS_PATH/keystore`). For instructions on export/import, see below.

You can create multiple wallets and list them with:

```bash
lotus wallet list
```

## Obtaining FIL

FIL can be obtained either by using one of the Faucets (available for the test networks) or by buying it from an exchange supporting FIL trading (once mainnet has launched).

Once you have received some FIL you can check your balance with:

```bash
lotus wallet balance
```

Remember that your will only see the latest balance when your daemon is fully synced to the chain.

## Sending FIL

Sending some FIL can be achieved by running:

```bash
lotus wallet send <address> <amount>
```

Make sure to check `lotus wallet send --help` for additional options.

## Exporting and importing a wallet

You can export and re-import a wallet with:

```bash
lotus wallet export <address> > wallet.private
```

and:

```bash
lotus wallet import wallet.private
```

Keep your wallet's private key safe!
