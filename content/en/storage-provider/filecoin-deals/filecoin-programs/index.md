---
title: "Filecoin programs"
description: "It is possible to find your own data storage customers with valuable datasets they want to store, and have them verified through KYC for programs like Filecoin Plus"
lead: ""
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-filecoin-deals"
    identifier: "filecoin-programs-4b56249ff18e9e82e6306a59b575d97e"
weight: 330
toc: true
---

Although it is possible to find your own data storage customers with valuable datasets they want to store, and have them verified through KYC ([Know Your Customer](https://en.wikipedia.org/wiki/Know_your_customer)) to create verified deals for [Filecoin Plus](https://docs.filecoin.io/basics/how-storage-works/filecoin-plus/#), there are also programs and platforms that make it easier for storage providers to receive verified deals.

## Estuary

 **[Estuary](http://estuary.tech)**. Estuary is a service on the internet (but you can also host your own estuary node) that enables clients to upload data to the Filecoin Network via a web interface (and API).Estuary supports a maximum file size of 32 GB, has no limit on total upload size, and while in the alpha phase, its free! As a client you can upload data which will later be aggregated into a deal that gets sealed and proven on-chain. Estuary does the data collection and data preparation part of the workflow, and then hands off the sealing and long-term storing of the deals to storage providers. As a storage provider, you can choose to accept deals from Estuary. In order to receive deals from Estuary, a storage provider must sign up on the Estuary website. The storage provider is required to store sealed and unsealed copies of the data, and to enable retrievals from the unsealed copies for free.

## Web3.storage

**[web3.storage](http://web3.storage)**. Web3.storage runs on “Elastic IPFS” as the inbound storage protocol offering scalability, performance and reliability as the platform grows. It guarantees the user (typically developers) that the platform will always serve your data when you need it. In the backend the data is uploaded onto the Filecoin Network for long-term storage.

## Filecoin Green

**[Filecoin Green](https://green.filecoin.io)**. Filecoin Green aims to measure the environmental impacts of Filecoin and verifiably drive them below zero, building infrastructure along the way that allows anyone to make transparent and substantive environmental claims. The team maintains the [Filecoin Energy Dashboard](https://filecoin.energy/) and works with storage providers to decarbonize their operations through the [Energy Validation Process](https://filecoin-green.gitbook.io/filecoin-green-documentation/storage-providers-green-guidance-documentation/storage-providers-tiered-sustainability-claims). Connect with the team on Slack at **#fil-green**, or via email at [green@filecoin.org](mailto:green@filecoin.org)

## CO2.Storage

**[CO2.Storage](https://co2.storage)**. CO2.Storage is a decentralized storage solution for structured data based on content addressed data schemas. CO2.Storage primarily focuses on structured data for environmental assets, such as Renewable Energy Credits, Carbon Offsets, and geospatial datasets and maps inputs to base data schemas (IPLD DAGs) for off-chain data (like metadata, images, attestation documents, and other assets) to promote the development of standard data schemas for environmental assets. This project is in _alpha_, and while many features can be considered stable, we are waiting until we are feature complete to fully launch. The Filecoin Green team is actively working on this project and welcomes contributions from the community.

## Slingshot

**[Slingshot](https://slingshot.filecoin.io)** is a program that unites Data clients, Data preparers and storage providers in a community to onboard data and share replicas of publicly valuable [_Open Datasets_](https://datasets.filecoin.io). Rather than providing a web interface like Estuary, Slingshot is a program that provides a workflow and tools for onboarding of large open datasets. The Slingshot Deal Engine provides deals to registered and certified storage providers. The data is prepared and uploaded using a tool called Singularity. The program has [clear requirements of a storage provider](https://slingshot.filecoin.io/requirements#participating-as-a-storage-provider-sp) regarding their capabilities.

See the below video for more information on Slingshot:
{{<youtube "14sasiEThig">}}

## Evergreen

**[Evergreen](https://evergreen.filecoin.io/)** extends the Slingshot program by aiming to store the open datasets forever. Standard deals have a maximum duration of 540 days, which is not long enough for valuable, open datasets that might need to be stored forever. Evergreen uses a deal engine (**[Spade](https://github.com/ribasushi/spade)**) that automatically renews deals to extend the lifetime of the dataset on-chain.

## Moon Landing

**[Moon Landing](https://moon-landing.io)** is a program related to Slingshot and Evergreen. Moon Landing aims to provide assistance for new storage providers to enter the Slingshot program. They provide technical assistance as well as establishing contacts with other storage providers. Participants in the Moon Landing program are matched with other storage providers in a capsule. The intent is to grow communities of storage providers that can learn from each other and can share data replicas with each other.

## Saturn

A whole new access capability is being launched with **[Saturn](https://saturn.tech)**, which is the world’s first Web3 Content Delivery Network (CDN). Saturn, as a fully distributed CDN, allows clients to access their data via Saturn nodes close to them. Content retrieval times of less than 1 second will open up various new use-cases for Filecoin and create a new market for retrieval providers (L1 Saturn nodes) in which storage providers can also participate.

## Partner tools and programs

Many other programs and tools exist in the Filecoin community, developed by partners or storage providers. We list some examples below.

### CIDGravity

**[CIDGravity](https://www.cidgravity.com/)** for instance is a software-as-a-service that allows storage providers to handle dynamic pricing and client management towards your solution. It integrates with deal engines such as [Boost](https://boost.filecoin.io).

### Big Data Exchange

Another program that allows storage providers easy access to Fil+ deals is **[Big Data Exchange](https://bigd.exchange.io)**. This platform allows storage providers to bid on datasets they are interested in storing. As a storage provider, you take part in an online auction where you offer FIL to store large data sets. The dataset is explained, together with the technical requirements for the storage provider. The volumes of the datasets offered here are - as the name suggests - big, which can yield big returns in block rewards. That is why, as a storage provider, you might want to bid to store a copy.

Storing real client data means there will be expectations on retrievability of that data. The storage provider can provide the data to the client by keeping unsealed copies of the data and creating an access layer (web or other) for the client. Also Boost-http (see [https://lotus.filecoin.io](https://lotus.filecoin.io) ) provides a way to access data.

### Filswan

**[Filswan](https://www.filswan.com/homepage)** is - much like Big Data Exchange - an auctioning platform that matches clients with storage providers.

{{< sp-calls-to-action >}}
<!--REVIEWED!-->