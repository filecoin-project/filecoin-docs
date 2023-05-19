---
title: "Auxiliary services"
description: "As a storage provider, you can set your business apart from the rest by offering additional services to your customers."
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

As a storage provider, you can set your business apart from the rest by offering additional services to your customers. Many new use-cases for the Filecoin network are emerging as new technologies are introduced.

## Saturn

One of the additional services is participation in Saturn retrieval markets. [Saturn](https://saturn.tech) is a Web3 CDN (“content delivery network”), and will [launch in stages in 2023](https://saturn.tech/#roadmap). Saturn aims to be the biggest Web3 CDN, and biggest CDN overall with the introduction of Saturn, data stored on Filecoin is no longer limited to archive or cold storage, but can also be cached into a CDN layer for fast retrieval. Data that needs to be available quickly can then be stored on Filecoin and retrieved through Saturn.
Saturn comes with 2 layers of caching, L1 and L2. L1 nodes typically run in data centers, require high availability and 10 GBs minimum connectivity. The L1 Saturn provider earns FIL through caching and serving data to clients. L2 nodes can be run via an app on desktop hardware.

## FVM

Other new opportunities are emerging since the launch of FVM (Filecoin Virtual Machine) in March 2023. The FVM allows smart contracts to be executed on the Filecoin blockchain. The FVM is Ethereum-compatible (also called the FEVM) and allows for entire new use cases to be developed in the Filecoin ecosystem. Think of on-chain FIL lending as an example, but the opportunities are countless.

## Bacalhau

A next step after the introduction of FVM is [Bacalhau](https://docs.bacalhau.org/)), which will be offering Compute over Data (COD). After the introduction of a compute layer on Filecoin, Bacalhau’s COD promises to run compute jobs over the data where the data resides, at the storage provider. Today, data scientists have to transfer their datasets to compute farms in order for their AI, ML or other data processing activities to run. Bacalhau will allow them to run compute activities on the data where the data is located, thereby removing the expensive requirement to move data around. Storage providers will be able to offer - and get rewarded for - providing compute power to data scientists and other parties who want to execute COD.

## Storage tiering

Another potential service to offer is storage tiers with various performance profiles. For example, storage providers can offer hot/online storage by keeping an additional copy of the unsealed data available for immediate retrieval, as well as the sealed that has been stored on the Filecoin Network.

{{< sp-calls-to-action >}}
