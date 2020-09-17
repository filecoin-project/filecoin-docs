---
title: 'Lotus: switch networks'
description: There may be times, particularly when testing, where you wish to swtich to a different Filecoin network, or need to reconnect to a testing network after a network reset. This guide will show you how to switch between different Filecoin networks with Lotus.
breadcrumb: Switch networks
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

As we mentioned in the [installation guide](installation.md), Lotus is compiled to operate on a single network and the information in the configuration folder corresponds to that network.

We have several ways to make Lotus run on a different network:

[[TOC]]

## Approach 1: Clean, re-build and re-install

The first approach is the simplest. In this approach you remove all the data related to the network you were running on before and launch a Lotus binary built to run on the new one:

1. Shutdown the running Lotus daemon
2. Remove the `~/.lotus` (or `$LOTUS_PATH`) folder
3. Rebuild and install Lotus on the right branch or release (as defined in the [Networks dashboard](https://networks.filecoin.io).
4. Start the Lotus daemon again and let it sync to the new network

Be aware that this deletes everything from the old network, including wallets.

## Approach 2: Install and run on a different \$LOTUS_PATH

In this approach you keep all the data from the old network where it was, and instead set `$LOTUS_PATH` to a new, clean location so that Lotus will use it. This allows you to keep the old data in place, and eventually run again on the old network.

1. Shutdown the running Lotus daemon
2. Rebuild and install Lotus on the right branch or release (as defined in the [Networks dashboard](https://networks.filecoin.io).
3. Set `LOTUS_PATH` to a new location. i.e. `export LOTUS_PATH=~/.lotus2` (for example)
4. Start the Lotus daemon again and let it sync to the new network

## Backing up Lotus data

If you wish to backup Lotus data, you can also move your `~/.lotus` (or `$LOTUS_PATH`) folder somewhere else (though this might take time if it is very large).

Another alternative is to [export your wallets](send-and-receive-fil.md) and also [export the chain](chain-snapshots.md) for later re-import, if needed, on a newly installed Lotus Node.
