---
title: "Auxiliary services"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-filecoin-deals"
    identifier: "auxiliary-services-323aae388a7394a36f9f37703b235bf6"
weight: 360
toc: true
---

As a Storage Provider, you can set your business apart from the rest by offering additional services to your customers. Many new use-cases for the Filecoin network are emerging as new technologies are introduced.

## Saturn

One of the additional services is participation in retrieval markets with Saturn. [Saturn](https://strn.network) is a web3 CDN (“content delivery network”) which is [launching in stages in 2023](https://strn.network/#roadmap). It’s a first-of-a-kind decentralized CDN, not only aiming to be the biggest web3 CDN, but also the biggest CDN altogether. With the introduction of Saturn, data stored on Filecoin can no longer just be archive data or cold storage but can now be cached into a CDN layer for fast retrieval. Data that needs to be available quickly can then be stored on Filecoin and retrieved through Saturn.

Saturn comes with 2 layers of caching, L1 and L2. <!--TODO STEF can we define the differences a little more here?--> Specifically, the L1 nodes are most interesting for Storage Providers. These require enterprise hardware to be allocated and a 10Gbps internet connection to be available. The L1 provider earns FIL through caching and serving data to clients.

## FVM

Other new opportunities are emerging with the launch <!--TODO STEF when? --> of FVM (Filecoin Virtual Machine). The FVM allows smart contracts to be executed on the Filecoin blockchain. The FVM is Ethereum-compatible (also called the FEVM) and allows for entire new use cases to be developed in the Filecoin ecosystem. Think of on-chain FIL lending as an example, but the opportunities are countless.

## Bacalhau

A next step after the introduction of FVM is [Bacalhau](https://docs.bacalhau.org/)), which will be offering Compute over Data (COD). After the introduction of a compute layer on Filecoin, Bacalhau’s COD promises to run compute jobs over the data where the data resides, at the Storage Provider. Today, data scientists have to transer their datasets to compute farms in order for their AI, ML or other data processing activities to run. Bacalhau will allow them to run compute activities on the data, in situ, thereby removing the expensive requirement to move data around. Storage Providers will be able to offer - and get rewarded for - providing compute power to data scientists and other parties who want to execute COD.

## Storage tiering

Another potential service to offer is storage tiers with various performance profiles. For example, Storage Providers can offer hot/online storage by keeping the unsealed <!-- TODO STEF have we explained sealing yet? link --> data available for hot retrieval, for a premium.
