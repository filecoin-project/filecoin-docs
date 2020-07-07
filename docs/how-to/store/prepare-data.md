---
title: Preparing data
description: Learn how to prepare data for storage.
---

# Preparing data

Depending on the size and structure of your data, you may need to make some formatting adjustments before storing it on Filecoin.

### For files bigger than a sector

When you store data on the Filecoin Network, each file must be smaller than a sector. If an individual file is larger, you’ll have to split it into multiple smaller files first.

How big is a sector? The Filecoin network supports several sector sizes, and storage miners will specify which size(s) they’re offering so you can select the best option for you. Smaller sectors are faster, while larger sectors are more cost-effective. (Testnet supports 2KiB, 8MiB, 512MiB and 32GiB sectors as of March 2, 2020).

### For files within a directory

Each storage deal is for a single file. To store many files within a directory structure in a single storage operation (also known as storage deal), first flatten them into .zip, .car, or another archive file format.

### Flattening block and object data

Block data structures must be serialized into flat string files before importing into Filecoin. For IPLD data, we recommend the [Content Addressible Archive (CAR) format](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md).

### Helpers and utilities

For simple operations, you can use the `split` or `zip` Unix commands. Or, choose a client application that handles data preparation for you, such as the [Starling Storage CLI & REST API](https://github.com/filecoin-project/starling).

Note: See [Very Large Files](./large-files.md) if you plan to store files larger than 1TB.
