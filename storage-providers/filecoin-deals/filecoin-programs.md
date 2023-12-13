---
description: >-
  This page covers the various programs and services that storage providers can
  take part in.
---

# Filecoin programs and tools

Although it is possible to find your own data storage customers with valuable datasets they want to store, and have them verified through KYC ([Know Your Customer](https://en.wikipedia.org/wiki/Know\_your\_customer)) to create verified deals for [Fil+](../../basics/how-storage-works/filecoin-plus.md), there are also programs and platforms that make it easier for storage providers to receive verified deals.

## Web3.storage

[Web3.storage](https://web3.storage/) runs on “Elastic IPFS” as the inbound storage protocol offering scalability, performance and reliability as the platform grows. It guarantees the user (typically developers) that the platform will always serve your data when you need it. In the backend the data is uploaded onto the Filecoin Network for long-term storage.

## Filecoin Green

[Filecoin Green](https://green.filecoin.io) aims to measure the environmental impacts of Filecoin and verifiably drive them below zero, building infrastructure along the way that allows anyone to make transparent and substantive environmental claims. The team maintains the [Filecoin Energy Dashboard](https://filecoin.energy/) and works with storage providers to decarbonize their operations through the [Energy Validation Process](https://filecoin-green.gitbook.io/filecoin-green-documentation/storage-providers-green-guidance-documentation/storage-providers-tiered-sustainability-claims). Connect with the team on Slack at **#fil-green**, or via email at [green@filecoin.org](mailto:green@filecoin.org)

## CO2.Storage

[CO2.Storage](https://co2.storage) is a decentralized storage solution for structured data based on content addressed data schemas. CO2.Storage primarily focuses on structured data for environmental assets, such as Renewable Energy Credits, Carbon Offsets, and geospatial datasets and maps inputs to base data schemas (IPLD DAGs) for off-chain data (like metadata, images, attestation documents, and other assets) to promote the development of standard data schemas for environmental assets. This project is in _alpha_, and while many features can be considered stable, we are waiting until we are feature complete to fully launch. The Filecoin Green team is actively working on this project and welcomes contributions from the community.

## Slingshot

[Slingshot](https://slingshot.filecoin.io) is a program that unites Data clients, Data preparers and storage providers in a community to onboard data and share replicas of publicly valuable [_Open Datasets_](https://datasets.filecoin.io). Rather than providing a web interface like Estuary, Slingshot is a program that provides a workflow and tools for onboarding of large open datasets. The Slingshot Deal Engine provides deals to registered and certified storage providers. The data is prepared and uploaded using a tool called Singularity. The program has [clear requirements of a storage provider](https://slingshot.filecoin.io/requirements#participating-as-a-storage-provider-sp) regarding their capabilities.

See the below video for more information on Slingshot:

{% embed url="https://www.youtube.com/watch?v=14sasiEThig" %}
A overview of the Slingshot project from the Enterprise Storage Provider Accelerator (ESPA).
{% endembed %}

## Evergreen

[Evergreen](https://evergreen.filecoin.io/) extends the Slingshot program by aiming to store the open datasets forever. Standard deals have a maximum duration of 540 days, which is not long enough for valuable, open datasets that might need to be stored forever. Evergreen uses a deal engine ([Spade](https://github.com/ribasushi/spade)) that automatically renews deals to extend the lifetime of the dataset on-chain.

## Saturn

A whole new access capability is being launched with [Saturn](https://saturn.tech), which is the world’s first Web3 Content Delivery Network (CDN). Saturn, as a fully distributed CDN, allows clients to access their data via Saturn nodes close to them. Content retrieval times of less than 1 second will open up various new use-cases for Filecoin and create a new market for retrieval providers (L1 Saturn nodes) in which storage providers can also participate.

## Partner tools and programs

Many other programs and tools exist in the Filecoin community, developed by partners or storage providers. We list some examples below.

### CIDGravity

[CIDGravity](https://www.cidgravity.com/) is a software-as-a-service that allows storage providers to handle dynamic pricing and client management towards your solution. It integrates with deal engines such as [Boost](https://boost.filecoin.io).

### Big Data Exchange

Another program that allows storage providers easy access to Fil+ deals is [Big Data Exchange](https://www.bigdataexchange.io/). This platform allows storage providers to bid on datasets they are interested in storing. As a storage provider, you take part in an online auction where you offer FIL to store large data sets. The dataset is explained, together with the technical requirements for the storage provider. The volumes of the datasets offered here are - as the name suggests - big, which can yield big returns in block rewards. That is why, as a storage provider, you might want to bid to store a copy.

Storing real client data means there will be expectations on retrievability of that data. The storage provider can provide the data to the client by keeping unsealed copies of the data and creating an access layer (web or other) for the client. Also Boost-http (see [https://lotus.filecoin.io](https://lotus.filecoin.io) ) provides a way to access data.

### Filswan

[Filswan](https://www.filswan.com/homepage) is an auctioning platform that matches clients with storage providers.
