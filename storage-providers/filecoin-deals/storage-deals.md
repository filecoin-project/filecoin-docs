---
description: >-
  This page discusses what storage deals are, and how storage providers can
  prepare for them.
---

# Storage deals

The real purpose of Filecoin is to store humanity’s most important information. As a storage provider, that means accepting storage deals and storing deal sectors with real data in it. As before, those sectors are either 32 GiB or 64 GiB in size and require that the data be prepared as a content archive; that is, as a CAR file..

## Data preparation

Data preparation, which includes packaging files into size appropriate CAR files, is either done by a separate Data Preparer actor, or by storage providers acting as Data Preparers. The latter option is common for new storage providers, as they normally only have a few files that need preparation.

Data preparation can be done in various ways, depending on your use-case. Here are some valuable sources of information:

* The [data-prep-tools repo](https://github.com/filecoin-project/data-prep-tools) has a set of CLI tools for more specific use-cases.
* [Singularity](https://github.com/tech-greedy/singularity) is a command-line tool to put data into CAR files, create [CIDs](../../reference/general/glossary#content-identifier-cid), and even initiate deals with storage providers.

See the following video for a demonstration on Singularity:

{% embed url="https://www.youtube.com/watch?v=1ZjKxkI6-Ic" %}
Xinan Xu's presentation on Singularity
{% endembed %}

## Deal Market

In order for storage providers to accept deals and set their deal terms, they need to install some market software, such as [Boost](https://boost.filecoin.io/). This component interacts with data owners, accepts deals if they meet the configured requirements, gets a copy of the prepared data (CAR files), and puts it through the [sealing pipeline](../architecture/sealing-pipeline.md), after which it is in the state required to be proven to the network.

The storage provider can (and should) keep unsealed data copies available for retrieval requests from the client. It is the same software component, Boost, that is responsible for HTTP retrievals from the client and for setting the price for retrievals.

Many tools and platforms act as a deal making engine in front of Boost. This is the case for [Spade](https://github.com/ribasushi/spade) for instance.
