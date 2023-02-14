---
title: "Storage market"
description: "The storage market is the data entry point into the network where storage providers and clients negotiate and publish storage deals on-chain."
lead: "The storage market is the data entry point into the network where storage providers and clients negotiate and publish storage deals on-chain."
draft: false
images: []
type: docs
menu:
  intro:
    parent: "lorem"
    identifier: "storage-market-c110058d70eaf34c5061f8a745ed3c0a"
weight: 50
toc: true
---

## Deal making

The lifecycle for a deal within the storage market contains four distinct phases:

- Discovery: the client identifies potential storage providers (SPs) and asks for their prices.
- Negotiation: once the client has selected an SP both parties agree to the term of the deal.
- Publishing: the deal is published on-chain.
- Handoff: the deal is added into a sector where data storage can be proven by the SP.

## Filecoin plus  

The mission of Filecoin Plus is to maximize the amount of useful storage on the Filecoin network. The aim is to bring more meaningful and valuable data into the Filecoin network by offering verified clients cheap, or even free, storage. This mechanism is designed and operates around datacap, the storage quota allocated to verified clients to store data and boost incentives for storage providers.  

Verified clients can onboard data into Filecoin using datacap, which they apply from community-selected notaries. In return for storing verified storage deals, storage providers receive datacap with a 10x boost to their storage power which eventually increases their block rewards as an incentive.

- Datacap: a Datacap token will be allocated to a verified client to spend in the storage deals carrying a 10x deal quality multiplier.
- Notaries: community-selected notaries govern the program by verifying storage clients and allocating datacap tokens to verified clients.
- Verified clients: clients are active network participants with datacap allocation for their data storage.

## Storage on-ramps

To simplify the process of storing data on the network, there are many storage helpers to provide an easier way to integrate Filecoin storage as well as IPFS into your applications or smart contracts.

Storage helpers provide libraries that abstract Filecoin deal-making into simple, streamlined API calls and storing the data on IPFS to provide more efficient and fast retrieval for your content.

Here are some available storage helpers:

- [boost.filecoin.io](https://boost.filecoin.io/)
- [estuary.tech](https://estuary.tech/)
- [web3.storage](https://web3.storage/)
- [nft.storage](https://nft.storage/)
- [lighthouse.storage](https://www.lighthouse.storage/)
