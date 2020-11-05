---
title: 'Lotus: retrieve data'
description: 'This guide will show you how to use Lotus to retrieve data that has been stored on the Filecoin network.'
breadcrumb: 'Retrieve data'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

Data retrieval is achieved by making a _retrieval deal_ with a _retrieval miner_. In this agreement, the client agrees to pay the miner a certain amount for a given piece of data. This payment happens incrementally as data is received, using a [payment channel](../../build/lotus/payment-channels.md). Unlike storage deals, retrieval deals happen off-chain.

Currently, Lotus supports direct retrieval from the storage miners which originally stored the data, although, per the network's specification, it is planned to support independent retrieval miners that are specifically dedicated to that business by making retrieval an efficient, fast and reliable operation. At that point, clients will be able to search the network for all possible providers of their desired data (via the DHT, the chain, or out-of-band aggregators), compare deal terms, and chose the best retrieval option for their needs.

## Overview

To retrieve data from the Filecoin network, a Lotus Node needs to:

1. Perform a retrieval query using the desired _Data CID_ against the miner storing the data.
2. Receive confirmation from the miner that it is holding that data and that it can provide it for a price.
3. Send a deal proposal agreeing with the proposed terms.
4. Receive the data from the miner, verify that it is correct and send incremental payments on the payment channel until the transfer is complete.

Currently the full amount of data must be received, although in the future it will be possible to use IPLD-selectors to pick custom subsets for retrieval.

## Finding data by CID

In order to retrieve some data you will need the **Data CID** that was used to create the storage deal.

You can actually query the client to give you all the miners known to store certain data with:

```sh
lotus client find <Data CID>
```

## Making a retrieval deal

The _retrieval deal_ process is simplified on a simple command:

```sh
lotus client retrieve --miner <miner ID> <Data CID> <outfile>
```

This command takes other optional flags (check `--help`).

If the outfile does not exist it will be created in the Lotus repository directory. This process may take 2 to 10 minutes.

::: warning
If you added a CAR file serializing an IPLD-DAG with a format that cannot be readily turned into a file (i.e. anything non unixfs), pass the `--car` flag and deserialize your DAG manually as needed.
:::
