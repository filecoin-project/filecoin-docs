---
title: Prepare Data
description: Learn how to prepare data for storage.
---

# Prepare Data

Depending on the size and structure of your data, you may need to make some formatting adjustments before storing it on Filecoin.

**For files bigger than a sector**
When you store data on the Filecoin Network, each file must be smaller than a sector. If an individual file is larger, you’ll have to split it into multiple smaller files first.

How big is a sector? The Filecoin network supports several sector sizes, and storage miners will specify which size(s) they’re offering so you can select the best option for you. Smaller sectors are faster, while larger sectors are more cost-effective. (Testnet supports 2KiB, 8MiB, 512MiB and 32GiB sectors as of March 2, 2020).

**For files within a directory**
Each storage deal is for a single file. To store many files within a directory structure, first flatten them into .zip, .car, or another archive file format.

**For IPLD data**
Block data structures like IPLD must be serialized into flat string files. We recommend the CAR format. (Add car files reference)

**Helpers and utilities**
For simple operations, you can use the `split` or `zip` Unix commands. (Insert reference to documentation.) Or, choose a client application that handles data preparation for you, such as Starling Storage CLI & REST API, or [hide until future] Filecoin Desktop.

Note: See Very Large Files if you plan to store files larger than 1TB.
