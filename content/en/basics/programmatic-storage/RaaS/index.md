---
title: "RaaS"
description: "This page introduces RaaS, which refers to replication, renew and repair of storage deals."
lead: "RaaS refers to replication, renew and repair of storage deals. It is a feature of programmatic storage on Filecoin, enabled by FVM."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "basics-programmatic-storage"
    identifier: "RaaS"
weight: 120
toc: true
---

## Introduction

Introduction

What does it mean to replicate, renew, or repair data storage deals through a Filecoin smart contract? 

- RaaS refers to replication, renewal and repair as a service, for data stored in storage deals on Filecoin: 

- Replication refers to the option to store a user-defined number of replicas of your data.

- Renewal refers to the option to automatically observe on-chain storage deals until the expiry of their deal term, and automatically renew the deal.

- Repair refers to the automatic observation of storage deals, to ensure they are not in a faulted sector. If they are, these workers repair them automatically.

The motivation behind RaaS is to enable perpetual data storage on Filecoin. 

“As a service" refers to the opportunity to provide these RaaS features as services, to incentivize clients to use them and/or storage platforms to enable them. These are a part of the Filecoin programmable storage market with FVM.

## RaaS modules

There are two ways available to use with RaaS, for different purposes - the self-hosted RaaS where the Client runs all components and aggregator-hosted RaaS, which refers to a fully hosted RaaS service that is provided to the Client by aggregators.

At the RaaS, any contract or storage platform that has the metadata of the stored data, can request the RaaS node to perform its functions. However, the RaaS node has to be self-hosted in order to function. Storage platforms have the opportunity to build an aggregator-hosted RaaS node, to provide hosted replication, renewal, and repair services to clients. 

A RaaS node, which monitors deals done through aggregators on Filecoin, will take action if replication, renew, or repair requirements are not observed.  

Note that RaaS nodes are only able to monitor deals from aggregators, since the nodes listen to the SubmitAggregatorRequest event in order to pick these deals up.

Here is a brief outline of the RaaS process:

1. An Aggregator sends a CID to the RaaS node, requesting for replication, renewal and/or repair as needed.

2. The RaaS smart contracts maintains the information of deals created by the RaaS, including deal_id and miner_id.

3. The RaaS node periodically checks the deal status on the Filecoin network, by interacting with the RaaS` smart contract.

4. If the deal requires replication, renewal and/or repair, the RaaS node resubmit deals to aggregators  and requests the aggregator to make a new deal. 

Read more about the interfaces and how to build with them [here].
