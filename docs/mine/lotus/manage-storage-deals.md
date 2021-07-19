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

```shell
lotus-miner storage-deals selection reject --online --offline
```

The commands above will automatically update the values in the `config.toml` file for offline and online deals, according to the flags used above.

You can verify the current status with:

```shell
lotus-miner storage-deals selection list
```

To _re-enable_ storage deals, run:

```shell
$ lotus-miner storage-deals selection reset
$ # Verify that they have been enabled
$ lotus-miner storage-deals selection list
considering online storage deals: true
considering offline storage deals: true
```

The values above affect new deals. Ongoing deals will still have to be honored.

## Setting the asking price

One of the most important aspects of accepting new deals will be the miners' conditions and price. Incoming deals are evaluated on these conditions and automatically accepted or rejected by Lotus miners.

Storage prices, and other conditions, are set with the `lotus-miner storage-deals set-ask` command. For example:

```shell
lotus-miner storage-deals set-ask \
    --price 0.0000001 \
    --verified-price 0.0000001  \
    --min-piece-size 56KiB \
    --max-piece-size 32GB
```

The above command sets the price for deals to `0.0000001 FIL` (`100 nanoFIL`) per GiB, per epoch. This means, a client will have to pay `100 nanoFIL` every 30 seconds for each GiB stored. If the client wants 5GiB stored over the course of a week, the total price will be: `5GiB * 100nanoFIL/GiB_Epoch * 20160 Epochs = 10080 microFIL`.

The command also serves to set the minimum and maximum deal sizes. Be sure to check `lotus-miner storage-deals set-ask --help` to see all options.

You can display the miner's current ask price with:

```shell
lotus-miner storage-deals get-ask
```

Lotus clients can request the miner price as well with:

```shell
lotus client query-ask <minerID>
```

## Listing current deals

Current deals and their current state can be found by running:

```shell
lotus-miner storage-deals list -v
```

The list displays:

- When the deal was created.
- The DataCID that is being stored.
- The wallet address of the client that submitted it.
- The size and the duration in epochs (30 seconds per epoch).

## Deals that are pending publishing

To list the deals waiting in your publish queue:

```shell
lotus-miner storage-deals pending-publish
```

You can publish the deals whenever you want with the `--publish-now` option:

```shell
lotus-miner storage-deals pending-publish --publish-now
```

The miner's default configuration is set to batch multiple deals and publish the message to a maximum of 8 deals per hour. You can change the `PublishMsgPeriod` and `MaxDealsPerPublishMsg` in your [configuration file](miner-configuration.md#publishing-several-deals-in-one-message).

## Blocking storage deals by PieceCID

The Lotus Miner provides internal tooling to import a PieceCID-blocklist:

```shell
lotus-miner storage-deals set-blocklist blocklist-file.txt
```

The `blocklist-file.txt` should contain a list of CIDs, each on a separate line. The current blocklist can be checked with:

```shell
lotus-miner storage-deals get-blocklist
```

To reset and clear the blocklist, run:

```shell
lotus-miner storage-deals reset-blocklist
```

## Grouping deals in the same sector

A delay between the moment the deals are received and the start of the sealing of the sector that contains the data allows miners to include multiple deals per sector when space permits it. A higher number of deals per sector allows a more efficient operation since it will require less sealing and proving operations.

The delay can be set using the `WaitDealsDelay` option in the `[Sealing]` section of the [configuration](miner-configuration.md).

## Offline storage deals

When the amount of data to be transmitted is [very large](../../store/lotus/very-large-files.md#deals-with-offline-data-transfer), it may be more effective to ship some hard drives directly to the miner and complete the deal in an **offline** fashion.

In this case, the miner will have to import the storage deal data manually with the following command:

```shell
lotus-miner storage-deals import-data <dealCid> <filePath>
```

### Offline deal workflow

This is the _general_ process for how an offline storage deal works:

1. The storage provider must have `considering offline storage deals` set to `true`.
1. The storage provider and the client clarify key aspects of the storage deal. They must come to an agreement on:
a. How large the storage payload is.
a. Duration of the deal.
a. The price to the client for storage of the data.
a. Whether it is a verified deal or not.
a. The start epoch for the deal.
a. When the data should be ready for download.
a. Estimated/minimum download speed.
1. The client provides a way to transfer the storage payload, usually using a URL link. However, in cases where the storage payload is quite large, it may be optimal for the client to physically send the storage provider hard drives containing the data. The storage provider must decide where to temporarily store the data. This can be on a slower HDD array.
a. The client must send the data as `.car` files and must generate the CID of each `.car` file _before_ sending the data to the storage provider.
b. The client must share the CIDs of each `.car` file with the storage provider.
1. If the files were compressed by the client to send over the internet, the storage provider must decompress the data. At this point, the storage provider may need to adjust the deal price to suit any changes in data size.
1. This client sends a deal proposal. This can be viewed by the storage provider by running `lotus-miner storage-deals list`. The deal will have the `WaitingForData` status.
1. - The storage provder imports each deal using `lotus-miner storage-deals import-data <dealCid> <carFilePath>`.

    :::tip
    Each import can take between 5 to 20 minutes. Sometimes the command will look like it has stalled. Be patient.
    :::

1. The imported deal will go through the normal process `Empty` → `AP` → `WaitDeal` until `WaitDeal`, the sector expires, or is manually pushed. The storage provider still pays the publish and sealing message fees.
1. If the storage provider changed the storage price for this specific deal, they must revert to their normal price after imports are done.
1. Once the deal finishes sealing and has the `active` status, the storage provider can delete the original `.car` files. If the sector does not fully seal and turn `active`, the storage provider must create a new dealCid to retry using the same `.car` file. Storage providers cannot reuse a failed dealCid.

This is just the _general_ workflow for arranging an offline storage deal. Individual workflows may be different from storage provider to storage provider, and client to client.

