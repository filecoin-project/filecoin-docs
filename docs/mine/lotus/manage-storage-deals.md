---
title: 'Lotus Miner: manage storage deals'
description: 'This guide describes the different workflows and options that Lotus miners can use to manage storage deals.'
breadcrumb: 'Manage storage deals'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

During the lifetime of a miner, Filecoin network clients will query the storage _price-ask_ advertised by the miner and initiate deals. Deals go through several phases:

1. Data transfer (for online deals) or data import (for offline deals)
2. Sealing sector with deal data (miner)
3. Proving (every 24 hours)

The following sections provide insights into the different ways Lotus can be used to manage several parts of the storage-deal process.

## Enabling and disabling deals

There are two ways to enable and disable new storage deals in the miner. Either:

- Edit the `[DealMaking]` options in the [miner configuration file](miner-configuration.md) and [restarting the miner](miner-lifecycle.md).
- Using the `lotus-miner storage-deals selection` commands.

Since restarting the miner is a delicate operation, it is best to let Lotus handle things by using the `lotus-miner storage-deals selection` commands.

To disable storage deals, run:

```sh
lotus-miner storage-deals selection reject --online --offline
```

The commands above will automatically update the values in the `config.toml` file for offline and online deals, according to the flags used above.

You can verify the current status with:

```sh
lotus-miner storage-deals selection list
```

To _re-enable_ storage deals, run:

```sh
$ lotus-miner storage-deals selection reset
$ # Verify that they have been enabled
$ lotus-miner storage-deals selection list
considering online storage deals: true
considering offline storage deals: true
```

Note that the values above affect to new deals. Ongoing deals will still have to be honored.

## Setting the ask price

One of the most important aspects of accepting new deals will be the miners' conditions and price. Incoming deals are evaluated on these conditions and automatically accepted or rejected by Lotus miners.

Storage prices, and other conditions, are set with the `lotus-miner storage-deals set-ask` command. For example:

```sh
lotus-miner storage-deals set-ask \
  --price 0.0000001 \
  --verified-price 0.0000001  \
  --min-piece-size 56KiB \
  --max-piece-size 32GB
```

The above command sets the price for deals to `0.0000001 FIL` (`100 nanoFIL`) per GiB, per epoch. This means, a client will have to pay `100 nanoFIL` every 30 seconds for each GiB stored. If the client wants 5GiB stored over the course of a week, the total price will be: `5GiB * 100nanoFIL/GiB_Epoch * 20160 Epochs = 10080 microFIL`.

The command also serves to set the minimum and maximum deal sizes. Be sure to check `lotus-miner storage-deals set-ask --help` to see all options.

You can display the miner's current ask price with:

```sh
lotus-miner storage-deals get-ask
```

Lotus clients can request the miner price as well with:

```sh
lotus client query-ask <minerID>
```

## Listing current deals

Current deals and their current state can be found by running:

```sh
lotus-miner storage-deals list -v
```

The list displays:

- When the deal was created.
- The DataCID that is being stored.
- The wallet address of client that submitted it.
- The size and the duration in epochs (30 seconds per epoch).

## Blocking storage deals by PieceCID

The Lotus Miner provides internal tooling to import a PieceCID-blocklist:

```sh
lotus-miner storage-deals set-blocklist blocklist-file.txt
```

The `blocklist-file.txt` should contain a list of CIDs, each on a separate line. The current blocklist can be checked with:

```sh
lotus-miner storage-deals get-blocklist
```

To reset and clear the blocklist, run:

```sh
lotus-miner storage-deals reset-blocklist
```

## Grouping deals in the same sector

A delay between the moment the deals are received and the start of the sealing of the sector that contains the data allows miners to include multiple deals per sector, when space permits it. A higher number of deals per sector allows a more efficient operation since it will require less sealing and proving operations.

The delay can be set using the `WaitDealsDelay` option in the `[Sealing]` section of the [configuration](miner-configuration.md).

## Offline storage deals

When the amount of data to be transmitted is [very large](../../store/lotus/very-large-files.md#deals-with-offline-data-transfer), it may be more effective to ship some hard-drives directly to the miner and complete the deal in an **offline** fashion.

In this case, the miner will have to import the storage deal data manually with the following command:

```sh
lotus-miner deals import-data <dealCid> <filePath>
```
