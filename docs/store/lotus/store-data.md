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
2. An storage deal between a miner and a client (in this case the running Lotus Node) must be initiated and accepted by the miner.
3. The data must be transferred to the miner.
4. The miner must place the data in a sector, seal it and start submitting proofs to the network.

From that point, an storage deal is live on the network.

## Importing data

To locally import a file into lotus run:

```sh
lotus client import ./your-example-file.txt
```

Upon success, this command will return a _Data CID_. This is a very important piece of information, as it will be used to make deals to both store and retrieve the data in the future.

You can list the data CIDs of the files you locally imported with:

```sh
lotus client local
```

If you need to import a full folder or many files, it is best to _tar_ or _zip_ them up first into a single archive.

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

:::tip
In _testnet_ and during Space Race, most community miners will not accept any deals from random clients (they are prioritizing deals from the deal bot).

Protocol Labs runs some miners with client-whitelisting upon request:

```
t016303
t016304
t016305
t016306
t016309
```

If you want to use these miners please [fill in this Google form](https://forms.gle/f5Vd5kTNYTKrmj1D8) including information from our daemon (`lotus wallet list` and `lotus net id`). You will be contacted via Slack/email when your Lotus Node has been whitelisted.
:::

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

[Starling](https://github.com/filecoin-project/starling) provides a set of utilities to add and monitor content to the Filecoin network, using a running Lotus Node.
