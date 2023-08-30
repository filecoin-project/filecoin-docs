---
title: "RaaS"
description: "RaaS refers to replication, renew and repair of storage deals. It is a feature of programmatic storage on Filecoin, enabled by FVM."
lead: "RaaS refers to replication, renew and repair of storage deals. It is a feature of programmatic storage on Filecoin, enabled by FVM."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-fundamentals"
    identifier: "RaaS"
weight: 110
toc: true
aliases:

---

## Introduction

What does it mean to replicate, renew, or repair data storage deals through a Filecoin smart contract? RaaS refers to replication, renewal and repair as a service, for data stored in storage deals on Filecoin: 

- Replication refers to the option to store a user-defined number of replicas of your data.

- Renewal refers to the option to automatically observe on-chain storage deals until the expiry of their deal term, and automatically renew the deal.

- Repair refers to the automatic observation of storage deals, to ensure they are not in a faulted sector. If they are, these workers repair them automatically.

- “As a service" refers to the opportunity to provide these RaaS features as services, to incentivize clients to use them and/or storage platforms to enable them. These are a part of the Filecoin programmable storage market with FVM.

The motivation behind RaaS is to enable perpetual data storage on Filecoin, where deals and the data inside are perpetually maintained and stored. 

## Interfaces

There are two interfaces available to use with RaaS, for different purposes - the base interface (self-hosted RaaS) and full interface (hosted RaaS). 

The base interface refers to a self-hosted RaaS service, where the Client runs all components. The full interface refers to a fully hosted RaaS service that is provided to the Client.

At the base interface, any contract or storage platform that has the metadata of the stored data, can request the RaaS node to perform its functions. However, the RaaS node has to be self-hosted in order to function. Storage platforms have the opportunity to build a full interface, with the RaaS node, to provide hosted replication, renewal and repair services to clients. 

A RaaS node, which monitors deals done through aggregators on Filecoin, will take action if replication, renew, or repair requirements are not observed.  Note that RaaS nodes are only able to monitor deals from aggregators, since the nodes listen to the SubmitAggregatorRequest event in order to pick these deals up.

Here is a brief outline of the RaaS process:

1. An Aggregator sends a CID to the RaaS node, requesting for replication, renewal and/or repair as needed.

2. The RaaS smart contracts maintains the information of deals created by the RaaS, including deal_id and miner_id.

3. The RaaS node checks the deal status on the Filecoin network, by interacting with the RaaS` smart contract.

4. If the deal requires replication, renewal and/or repair, the RaaS node fetches data from the given deal ID (and provided data CID) and requests the aggregator to make a new deal. 

Read more about the interfaces and how to build with them here.
