---
title: "Storage deals"
description: "The real purpose of Filecoin is to store humanity's most important information. As a Storage Provider that means you’re accepting storage deals."
lead: ""
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-filecoin-deals"
    identifier: "storage-deals-854132fc8fcae7442c0095e1087fba58"
weight: 310
toc: true
---

The real purpose of Filecoin is to store humanity's most important information. As a Storage Provider that means you’re accepting storage deals and store deal sectors with real data in it. Those sectors are still (as before) either 32GiB or 64GiB in size and they require the data to be prepared in a certain format, CAR  (content archive). 

## Data preparation
Data preparation, which includes packaging files into size appropriate car files is either done by a separate actor in the network, called the Data Preparer, but oftentimes Storage Providers also take this responsibility and act as a Data Preparer themselves. It is more common for new storage providers to do this on their own as they normally only have a few files that need preperation. 

Data preparation can be done with tools such as [Singularity](https://github.com/tech-greedy/singularity), which is a command-line tool to put data into CAR-files, create CIDs (Content ID, see [IPFS](https://docs.ipfs.tech/concepts/content-addressing/) for more information), and even initiate deals with Storage Providers.

See the following video for a demonstration on Singularity:
{{< youtube "1ZjKxkI6-Ic" >}}


## Deal Market
In order for Storage Providers to accept deals and set their deal terms, they need to install some market software, such as [Boost](https://boost.filecoin.io/). This component interacts with data owners, accepts deals if they meet the configured requirements, gets a copy of the prepared data (CAR-files) and puts it through the [sealing pipeline]({{<relref "sealing-pipeline" >}}), after which it is in the state required to be proven to the network. 

The Storage Provider can (and should) keep unsealed data copies available for retrieval requests from the client. It is the same software component, Boost, that is responsible for HTTP retrievals from the client and for setting the price for retrievals.
<!-- TODO STEF feels like this section could be expanded. How do the markets work? what are the parameters of a deal? What's a good deal (for the client or for me. Who am I competing with? -->
