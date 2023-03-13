---
title: "Storage deals"
description: "Learn how to automate storage deals using the FVM."
lead: "Prior to the introduction of the Filecoin Virtual Machine (FVM), the Filecoin networks base storage deal making method required the _client_ (the network participant wanting to store the data) to manually run a node, find a Storage Provider (SP), and complete the storage deal.
With the Filecoin EVM (FEVM), an Ethereum-compatible version of FVM, storage deal making can be automated, enabling dApps to integrate and scale storage deal making in workflows. Two methods, [using a _client contract_](#using-a-client-contract) and [using a _deal bounty contract_](#using-a-deal-bounty-contract), are available for programmatic storage deal making, and are described below."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-developing-contracts"
    identifier: "fvm-storage-deals"
weight: 500
toc: true
---

Using the programmatic storage building blocks provided by the FVM, developers can build: 
- [DataDAOs](https://rfs.fvm.dev/#482335d5b27543b3b0d5e81b995b719d), which implement a main client contract that adds CIDs to store new data through a voting mechanism.
- [Perpetual storage](https://rfs.fvm.dev/#2934f09e0d8c4280a6d9a5c08ffdeee1), which implements client contracts that recycle CIDs from expiring deals into their authorization sets, thereby allowing data to be stored perpetually.

{{< alert >}}
For more FVM use case ideas, see the [Request for Startups](https://rfs.fvm.dev/).
{{< /alert >}}

Descriptions of each method, as well as links to tutorials describing the methods and best practices for programmatic storage deal making, are provided below.

## Using a client contract 

In this method, an FEVM smart contract, refererred to as the _client contract_, represents the client and participates in the deal making flow end-to-end. The client contract interacts with Storage Providers and generates deals on behalf of the client, entirely on-chain. The contract emits a deal proposal, which Storage Providers (SPs) can pick up and activate a storage deal for. The client contract then helps authenticate that the published storage deal is aligned with the client’s initial deal proposal. Before using this method, the following requirements and restrictions should be noted:

- Data preparation is required before initiating the deal proposal from the client contract, as the data preparation outputs several pieces of information that is required for the deal proposal - specifically, a [CAR file](https://spec.filecoin.io/systems/filecoin_files/piece/#:~:text=A%20CAR%20file%20is%20an,provider%20as%20we%20discuss%20later.) link, the CAR file size, the data file size and the [data CID](https://spec.filecoin.io/systems/filecoin_files/piece/). Manual and automated options for the data preparation will be shown in the client contract tutorial. 

- Currently, the client contract only works with SPs running the latest [Boost](https://boost.filecoin.io/) release, [v1.6.0](https://github.com/filecoin-project/boost/releases/tag/v1.6.0) AND who have enabled the FVM dealmaking deature. SPs who meet these requirements will be listening on-chain for client contract deal proposals events to accept. 

For more information, see the tutorial describing this method.

## Using a deal bounty contract 

In this method, an FEVM smart contract, referred to as a _deal bounty contract_, represents the storage proposal from the client, **but does not manage the deal making**. Instead, the contract incentivizes a third party, referred to as a _bounty hunter_, to pass the deal proposal on to the SP and secure the deal on behalf of the client. 

The deal bounty contract:

- Consists of a list of data CIDs pointing to the data to be stored, which the bounty hunter picks up.
- Will hold the deal bounty in escrow on behalf of the client.
- Will pay out the deal bounty to the bounty hunter once a deal is made and the deal ID is returned and validated.
- Will check with the Filecoin built-in storage market actor to confirm whether the supplied deal ID is activated and stores the claimed data.

As with the [client contract method](#using-a-client-contract), data has to be prepared in order to add the data CID to the contract. For more information, see the tutorial describing this method.

## Best practices 

For more information on best practices for programmatic storage deal making, see the [smart contracts best practices guide]({{< relref "best-practices.md#storage-deal-making" >}})