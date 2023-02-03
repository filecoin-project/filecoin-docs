---
title: "Storage deals and deal sectors"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "storage-deals-854132fc8fcae7442c0095e1087fba58"
weight: 40
toc: true
---

The real purpose of Filecoin is to store humanity's most important information. As a Storage Provider that means you’re accepting storage deals and store deal sectors with real data in it. Those sectors are still (as before) either 32GiB or 64GiB in size and they require the data to be prepared in a certain format, CAR  (content archive). Data preparation is either done by a separate actor in the network, called the Data Preparer, but oftentimes Storage Providers also take this responsibility and act as a Data Preparer themselves.

Data preparation can be done with tools such as [Singularity](https://github.com/tech-greedy/singularity), which is a command-line tool to put data into CAR-files, create CID’s (Content ID, see [IPFS](https://docs.ipfs.tech/concepts/content-addressing/) for more information), and even initiate deals with Storage Providers.

In order for Storage Providers to accept deals and set their deal terms, they need to install a market software called [Boost](https://boost.filecoin.io/). This component interacts with data owners, accepts deals if they meet the configured requirements, gets a copy of the prepared data (CAR-files) and puts it through the [sealing pipeline]({{<relref "sealing-pipeline" >}}). It is sealed data that gets proven by the Filecoin network after all. The Storage Provider can (and should) keep unsealed data copies available for retrieval requests from the client. It is the same software component, Boost, that is responsible for HTTP retrievals from the client and for setting the price for retrievals.
