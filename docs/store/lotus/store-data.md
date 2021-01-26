---
title: 'Lotus: store data'
description: 'This guide will show you how to import and make deals to store data on the Filecoin network using Lotus.'
breadcrumb: 'Store data'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

:::tip
This section covers an "online" data import and is mostly suitable for smaller pieces of content. For "offline" import and data transfer check the [very large files](very-large-files.md) guide, which complements this one with some advanced knowledge.
:::

## Overview

In order to successfully add data to the Filecoin network the following steps need to be completed successfully:

1. Data must be packed into a [CAR file](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md).
2. A storage deal between a miner and a client must be initiated and accepted by the miner.
3. The data must be transferred to the miner.
4. The miner must place the data in a sector, seal it and start submitting proofs to the network.

From that point, a storage deal is live on the network.

## Importing data

To locally import a regular file from your filesystem into Lotus run:

```sh
lotus client import ./your-example-file.txt
```

Upon success, this command will return a _Data CID_. This is a very important piece of information, as it will be used to make deals to both store and retrieve the data in the future.

You can list the data CIDs of the files you locally imported with:

```sh
lotus client local
```

If you need to import a full folder or many files, it is best to _tar_ or _zip_ them up first into a single archive.

## Importing custom DAGs

Advance IPLD users may want to import custom DAGs into Lotus (you may skip this section if that is not you).

The CAR file format allows to serialize any IPLD-DAG (i.e. a IPLD-CBOR). Custom IPLD-DAGs should be encoded in a well-known format (like CBOR) as otherwise Lotus will not know how to interpret them.

::: warning
CAR files must contain the full DAG. Partial DAGs are not supported!
:::

If you built your own CAR file, make sure to import it directly with the `--car` flag.

### Files bigger than a sector

If your file is larger than a sector for the [Filecoin network in use](https://networks.filecoin.io), you will need to split your file into multiple parts first.

Storage miners will specify which size(s) they're offering so you can select the best option for you. Smaller sectors are faster, while larger sectors are more cost-effective.

## Making storage deals

Once the _Data CID_ is known, it is possible to use it to make a storage deal with a miner.

### Find a miner

You can obtain a list of all miners in the network with:

```sh
lotus state list-miners
t0xxxx
t0xxxy
t0xxxz
...
```

### Find the price and conditions

In order to ask for the terms offered by a particular miner, you can run:

```sh
lotus client query-ask <miner>
```

### Make the deal

Once satisfied with the terms, you can proceed to propose a deal to the miner, using the **Data CID** that you obtained during the import. Run:

```sh
lotus client deal
```

This command will interactively ask you for the CID, miner ID and duration in days for the deal. You can also call it with arguments:

```sh
lotus client deal <data CID> <miner> <price> <duration>
```

where the `duration` is expressed in blocks (1 block is equivalent to 30s).

### Securing a deal

Given the network's current speed and stability, users may find that individual deals with miners fail unexpectedly. For this reason, we suggest making up to 10 deals for each [CAR file](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md) you want to store. While this may seem a bit over-kill, it's a simple way to increase the chances of a successful deal and your data being stored. This work-around will become less and less necessary as the network matures.

## Checking deal status

You can list deals with:

```sh
lotus client list-deals
```

Among other things, this will give you information about the current state on your deals, whether they have been published on chain (by the miners) and whether the miners have been slashed for not honoring them.

For a deal to succeed, the miner needs to be correctly configured and running, accept the deal and _seal_ the file correctly. Otherwise, the deal will appear in error state.

You can make deals with multiple miners for the same data.

Once a deal is sucessful and the data is _sealed_, it can be [retrieved](retrieve-data.md).

## Additional tools

[Filecoin.tools](https://filecoin.tools/) also allows you to check the status of your deal

[Starling](https://github.com/filecoin-project/starling) provides a set of utilities to add and monitor content to the Filecoin network, using a running Lotus Node.
