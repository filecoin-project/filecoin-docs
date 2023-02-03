---
title: "Auxiliary services"
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
    identifier: "auxiliary-services-323aae388a7394a36f9f37703b235bf6"
weight: 90
toc: true
---

As a Storage Provider you can set your business apart from the rest by offering additional services to your customers. Many new use-cases for the Filecoin network are emerging as new technologies are being introduced.

One of the additional services is to participate in the retrieval markets with Saturn. [Saturn](https://strn.network) is a web3 CDN (“content delivery network”) which is currently being launched. It’s the first-of-a-kind decentralized CDN, not only aiming to be the biggest web3 CDN, but also the biggest CDN altogether. With the introduction of Saturn, data stored on Filecoin should no longer just be archive data or cold storage but can now be cached into a CDN layer for fast retrieval. Data that needs to be available quickly can then be stored on Filecoin and retrieved through Saturn.

Saturn comes with 2 layers of caching, L1 and L2. Specifically the L1 nodes are interesting for Storage Providers. These require enterprise hardware to be allocated and a 10Gbps internet connection to be available. The L1 provider earns FIL tokens through caching and serving caches to clients.

Other new opportunities are emerging with the launch of FVM (Filecoin Virtual Machine). The FVM allows Smart Contracts to be executed on the Filecoin blockchain. The FVM is Ethereum compatible (also called the FEVM) and allows for entire new use-cases to be developed on and around the Filecoin ecosystem. Think of on-chain FIL Lending as an example but the opportunities are countless.

A next step after the introduction of FVM is project [Bacalhau](https://docs.bacalhau.org/)), which will be offering Compute over Data (COD). After the introduction of a compute layer on Filecoin, Bacalhau’s COD promises to run compute jobs over the data where the data lives. Today, data scientists move their datasets to compute farms in order for their AI, ML or other data activities to run. Bacalhau will allow them to run compute activities on the data in situ, thereby removing the cumbersome requirement to move data around. Storage Providers will be able to offer - and get rewarded for - compute power to data scientists and other parties who want to execute COD.

Another more obvious service to offer is varying storage tiers. You could offer hot/online storage by keeping the unsealed data available for hot retrieval for a premium fee.
