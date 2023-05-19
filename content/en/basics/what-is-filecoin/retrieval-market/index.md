---
title: "Retrieval market"
description: "The retrieval market refers to negotiating retrieval deals for a provider to serve stored data to a client. In this agreement, the client agrees to pay the retrieval provider a certain amount of FIL for a given piece of data."
lead: "The retrieval market refers to negotiating retrieval deals for a provider to serve stored data to a client. In this agreement, the client agrees to pay the retrieval provider a certain amount of FIL for a given piece of data."
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-what-is-filecoin"
    identifier: "retrieval-market-74f7da553cd0e23c7f431d8e01237b2a"
weight: 60
toc: true
aliases:
    - "/intro/intro-to-filecoin/retrieval-market/"
---

## Basic retrieval  

Currently, Filecoin nodes support direct retrieval from the storage miners who originally stored the data. Clients can directly send retrieval requests to a storage provider to retrieve their data by paying some FIL for retrieval.  

Clients need to provide enough information to the storage provider for the data retrieval request, including:

- Storage provider ID: The ID of the storage provider where the data is stored.
- Payload CID: also called Data CID.
- Address: The address initially used to create the storage deal.

## Saturn

[Saturn](https://saturn.tech/) is a Web3 CDN in Filecoin’s retrieval market which serves the data stored on Filecoin with low latency and at low cost. It consists of independent retrieval providers specifically dedicated to that business, making retrieval an efficient, fast, and reliable operation.
