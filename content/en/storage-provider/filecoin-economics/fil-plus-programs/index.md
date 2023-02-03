---
title: "Fil plus programs"
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

Onboarding real client data is where the focus is nowadays, both for Filecoin and for Storage Providers. Although it is possible to find your own customers and datasets and have them verified through KYC to become a verified deal, there are also programs that help Storage Providers to receive (copies of) verified data.

One of those programs is **Estuary** ([http://estuary.tech](http://estuary.tech)) . Estuary is a public service on the internet (but can also be run as your own node) to upload data. As a client you can upload data which will later be aggregated into a deal that gets sealed and proven on-chain. Estuary does the data collection and data preparation part of the workflow and then hands off the sealing and long-term storing of the deals to Storage Providers. As a Storage Provider you can choose to accept deals from Estuary.  In order to receive deals from Estuary, a Storage Provider must sign up on the Estuary website. The Storage Provider is required to store sealed and unsealed copies of the data, and to enable retrievals from the unsealed copies for free.

Similar to Estuary there is **web3.storage** ([http://web3.storage](http://web3.storage)). Web3.storage runs on “Elastic IPFS” as the inbound storage protocol offering scalability, performance and reliability as the platform grows. It guarantees the user (typically developers) that the platform will always serve your data when you need it. In the backend the data is pushed towards Filecoin for long-term storage and cryptographic proofs.

**Slingshot** ([https://slingshot.filecoin.io](https://slingshot.filecoin.io)) is a program that unites Data Clients, Data Preparers and Storage Providers in a community to onboard data and share replicas of so-called “Open Datasets”. Rather than providing a web interface like Estuary does, Slingshot is a program that provides a workflow and tools for onboarding of large open datasets. The Slingshot Deal Engine provides deals to registered and certified Storage Providers. The data is prepared and uploaded by a tool called Singularity. The program has clear expectations of a Storage Provider regarding their capabilities.

**Evergreen** ([https://evergreen.filecoin.io](https://evergreen.filecoin.io/)) extends the Slingshot program by aiming to store the open datasets forever. Standard deals have a maximum duration of 540 days which is not long enough for valuable, open datasets that might need to be stored forever. Evergreen uses a deal engine (**[Spade](https://github.com/ribasushi/spade)**) that automatically extends the lifetime of the dataset on-chain. It makes sure the data gets stored at a Storage Provider in the network.

**Moon Landing** ([https://moon-landing.io](https://moon-landing.io)) is a program related to Slingshot and Evergreen. Moon Landing aims to provide assistance for new Storage Providers to enter the Slingshot program. They provide technical assistance as well as establishing contacts with other Storage Providers. Participants in the Moon Landing program are matched with other Storage Providers in a capsule. The intent is to grow communities of Storage Providers that can learn from each other and can share data replicas with each other.

Another program that allows Storage Providers easy access to Fil+ deals is **Big Data Exchange** ([https://bigd.exchange](https://bigd.exchange)). This platform allows Storage Providers to bid on datasets they are interested in storing. As a Storage Provider you take part in an online auction where you offer FIL to store large data sets. The dataset is explained, together with the technical requirements for the Storage Provider. The volumes of the datasets offered here are - as the name suggests - big, which can yield big returns in block rewards. That is why as a Storage Provider you might want to bid to store a copy.

As mentioned before, storing real client’s data means there will be expectations on retrievability of that data. The Storage Provider can provide the data to the client by keeping unsealed copies of the data and creating an access layer (web or other) for the client. Also Boost-http (part of Lotus, see [https://lotus.filecoin.io](https://lotus.filecoin.io) ) provides a way to access data.

A whole new access capability is being launched with **Saturn** ([https://strn.network](https://strn.network)), which is the world’s first web3 CDN. With Saturn being a distributed CDN (content delivery network) it will allow clients to access their data via Saturn nodes close to them. Content retrievals of <1s in latency will open up various new use-cases for Filecoin and create a new market for retrieval providers (L1 Saturn nodes) in which Storage Providers can also participate.

Other programs and tools exist in the Filecoin community, developed by companies or Storage Providers.

**CIDGravity** ([https://www.cidgravity.com/](https://www.cidgravity.com/)) for instance is a software-as-a-service that allows Storage Providers to handle dynamic pricing and client management towards your solution.

**Filswan** ([https://www.filswan.com/](https://www.filswan.com/homepage)) is - much like Big Data Exchange - an auctioning platform that matches clients with Storage Providers.
