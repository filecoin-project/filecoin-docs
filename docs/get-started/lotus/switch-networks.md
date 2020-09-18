---
title: 'Lotus: switch networks'
description: There may be times where you need to swtich to a different Filecoin network, or need to reconnect to a network after a network reset. This guide will show you how to switch between different Filecoin networks with Lotus.
breadcrumb: Switch networks
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Shutdown running Lotus daemons

Shutdown any Lotus daemons that are currently running. This includes `lotus` and potentially `lotus-miner` and `lotus-worker` daemons.

::: warning
If you are running a miner, see the [instructions to safely stop a miner](../../mine/lotus/miner-lifecycle.md).
:::

## Move your data (optional)

If you plan to return to your current network, you may want to keep its data around. These are the configuration folders for the different Lotus applications:

- `~/.lotus` (or `$LOTUS_PATH`)
- `~/.lotusminer` (or `$LOTUS_MINER_PATH`)
- `~/.lotusworker` (or `$LOTUS_WORKER_PATH`)

::: tip
Alternatively, you can also [export your wallets](send-and-receive-fil.md) and [export the chain](chain-snapshots.md) for later re-import.
:::

You can either make a backup of those folders or set their respective environment variables so that next time you start Lotus it picks up a different location in your file system.

## Rebuild and install Lotus on the right branch

Find which Lotus branch or release corresponds to the desired network in the [Networks dashboard](https://networks.filecoin.io).

Follow the [installation instructions](./installation.md) and install lotus from the right branch/release. To check it out with git you have to run:

```sh
git checkout <branch or release>
```

## Start the Lotus daemon

Start the Lotus daemons normally. It will start running on the network for which it was built.

::: warning
Make sure to not mix configuration folders between Lotus builds for different networks or for a network that has been reset as things will break badly.
:::
