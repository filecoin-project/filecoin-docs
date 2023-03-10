---
title: "Filecoin Plus programs"
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
    identifier: "fil-plus-programs-4b56249ff18e9e82e6306a59b575d97e"
weight: 60
toc: true
---

Although it is possible to find your own data storage customers with valuable datasets they want to store, and have them verified through KYC ([Know Your Customer](https://en.wikipedia.org/wiki/Know_your_customer)) to create verified deals for Filecoin Plus <!--TODO STEF link -->, there are also programs and platforms that make it easier for Storage Providers to receive verified deals.

### Estuary

 **[Estuary](http://estuary.tech)**. Estuary is a service on the internet (but you can also your own estuary node) that enables clients to upload  data to the Filecoin Network via a web interface (and API). As a client you can upload data which will later be aggregated into a deal that gets sealed and proven on-chain. Estuary does the data collection and data preparation part of the workflow, and then hands off the sealing and long-term storing of the deals to Storage Providers. As a Storage Provider, you can choose to accept deals from Estuary. In order to receive deals from Estuary, a Storage Provider must sign up on the Estuary website. The Storage Provider is required to store sealed and unsealed copies of the data, and to enable retrievals from the unsealed copies for free. <!-- TODO STEF what are the parameters for the types of deals and data that Estuary supports? sizes etc-->

### Web3.storage

**[web3.storage](http://web3.storage)**. Web3.storage runs on “Elastic IPFS” as the inbound storage protocol offering scalability, performance and reliability as the platform grows. It guarantees the user (typically developers) that the platform will always serve your data when you need it. In the backend the data is uploaded onto the Filecoin Network for long-term storage.

### Slingshot

**[Slingshot](https://slingshot.filecoin.io)** is a program that unites Data Clients, Data Preparers and Storage Providers in a community to onboard data and share replicas of publicly valuable [_Open Datasets_](https://datasets.filecoin.io). Rather than providing a web interface like Estuary, Slingshot is a program that provides a workflow and tools for onboarding of large open datasets. The Slingshot Deal Engine provides deals to registered and certified Storage Providers. The data is prepared and uploaded using a tool called Singularity. The program has clear expectations of a Storage Provider regarding their capabilities. <!-- TODO STEF and they are?-->

### Evergreen

**[Evergreen](https://evergreen.filecoin.io/)** extends the Slingshot program by aiming to store the open datasets forever. Standard deals have a maximum duration of 540 days which is not long enough for valuable, open datasets that might need to be stored forever. Evergreen uses a deal engine (**[Spade](https://github.com/ribasushi/spade)**) that automatically extends the lifetime of the dataset on-chain. It makes sure the data gets stored at a Storage Provider in the network. <!-- TODO STEF wait how does spade relate to boost?-->

### Moon Landing

**[Moon Landing](https://moon-landing.io)** is a program related to Slingshot and Evergreen. Moon Landing aims to provide assistance for new Storage Providers to enter the Slingshot program. They provide technical assistance as well as establishing contacts with other Storage Providers. Participants in the Moon Landing program are matched with other Storage Providers in a capsule. The intent is to grow communities of Storage Providers that can learn from each other and can share data replicas with each other.

### Big Data Exchange

Another program that allows Storage Providers easy access to Fil+ deals is **[Big Data Exchange](https://bigd.exchange)**. This platform allows Storage Providers to bid on datasets they are interested in storing. As a Storage Provider you take part in an online auction where you offer FIL to store large data sets. The dataset is explained, together with the technical requirements for the Storage Provider. The volumes of the datasets offered here are - as the name suggests - big, which can yield big returns in block rewards. That is why as a Storage Provider you might want to bid to store a copy. <!-- TODO STEF wait so I'm supposed to charge for data storage but also bid to store data for free? How does that work>? How big are these BDE sets-->

Storing real clients' data means there will be expectations on retrievability of that data. The Storage Provider can provide the data to the client by keeping unsealed copies of the data and creating an access layer (web or other) for the client. Also Boost-http (part of Lotus, see [https://lotus.filecoin.io](https://lotus.filecoin.io) ) provides a way to access data. <!-- TODO STEF BOOST is not part of lotus-->

### Saturn

A whole new access capability is being launched with **[Saturn](https://strn.network)**, which is the world’s first web3 Content Delivery Network (CDN). Saturn, as a fully distributed CDN, allows clients to access their data via Saturn nodes close to them. Content retrievals of <1s in latency will open up various new use-cases for Filecoin and create a new market for retrieval providers (L1 Saturn nodes) in which Storage Providers can also participate.

Many other programs and tools exist in the Filecoin community, developed by companies or Storage Providers.

### CIDGravity

**[CIDGravity](https://www.cidgravity.com/)** for instance is a software-as-a-service that allows Storage Providers to handle dynamic pricing and client management towards your solution. <!-- TODO STEF sounds like a markets or deals engine? how does it relate to boost and spade?-->

### Filswan

**[Filswan](https://www.filswan.com/homepage)** is - much like Big Data Exchange - an auctioning platform that matches clients with Storage Providers.
