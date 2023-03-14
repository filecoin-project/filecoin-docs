---
title: "Storage model"
description: "A storage model defines how data is stored within a system. This page covers the basic aspects of Filecoin's storage model."
lead: "A storage model defines how data is stored within a system. This page covers the basic aspects of Filecoin's storage model."
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-what-is-filecoin"
    identifier: "storage-model-edd6d3235797c6805400948d5d82fe88"
weight: 40
toc: true
aliases:
    - "/intro/intro-to-filecoin/storage-model/"
---

The Filecoin storage model consists of three components:

- Providers
- Deals
- Sectors

## Providers

Providers, as the name suggests, provide a service to users of the network. There are two types of provider:

- Storage providers
- Retrieval providers

### Storage providers

Storage providers, often called SPs, are responsible for storing files and data for clients on the network and providing cryptographic proofs to verify storage. The vast majority of providers on the Filecoin network are SPs.

### Retrieval providers

Retrieval providers, often called RPs, are responsible for providing users quick access to their data. They focus on rapid access to data, rather than long-term storage. Most of the time storage providers also provide retrieval access to their users as part of the same system. However, more and more stand-alone RPs are joining the network.

## Deals

In the Filecoin network, SPs and RPs provide their storage or retrieval service to data clients through deals. These deals are negotiated and agreed upon between two parties, and include terms like data size, price, deal duration, and collateral.

The deal-making process happens _off-chain_. Once both parties agree to the terms of a deal, that deal is published _on_chain_ for the rest of the network to see and validate.

## Sectors

Sectors are the basic units of provable storage where storage providers store clients’ data and generate PoSt on behalf of the Filecoin network. Sectors have standard sizes and a lifetime that storage providers can extend before reaching the end of the lifetime. `32 GiB` and `64 GiB` sector sizes are supported.
