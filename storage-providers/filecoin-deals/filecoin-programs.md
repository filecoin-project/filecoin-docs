---
description: >-
  This page covers the various programs and services that storage providers can
  take part in.
---

# Filecoin programs and tools

Although it is possible to find your own data storage customers with valuable datasets they want to store, and have them verified through KYC ([Know Your Customer](https://en.wikipedia.org/wiki/Know\_your\_customer)) to create verified deals for [Fil+](../../basics/how-storage-works/filecoin-plus.md), there are also programs and platforms that make it easier for storage providers to receive verified deals.

## Web3.storage

[![GitHub Repo stars](https://img.shields.io/github/stars/web3-storage/web3.storage)](https://github.com/web3-storage/web3.storage)
![GitHub last commit](https://img.shields.io/github/last-commit/web3-storage/web3.storage)
[![Docs site](https://img.shields.io/badge/docs-web3.storage-blue)](https://web3.storage/docs/)
![maintenance-status](https://img.shields.io/badge/maintenance-deprecated-red.svg)

[Web3.storage](https://web3.storage/) runs on “Elastic IPFS” as the inbound storage protocol offering scalability, performance and reliability as the platform grows. It guarantees the user (typically developers) that the platform will always serve your data when you need it. In the backend the data is uploaded onto the Filecoin Network for long-term storage.

## Filecoin Green

[![Read the doc](https://img.shields.io/badge/docs-gitbook.io-blue)](https://filecoin-green.gitbook.io/filecoin-green-documentation)
[![Join Slack](https://img.shields.io/badge/join-slack-purple)](https://filecoinproject.slack.com/archives/C02HZ215B7Y)

[Filecoin Green](https://green.filecoin.io) aims to measure the environmental impacts of Filecoin and verifiably drive them below zero, building infrastructure along the way that allows anyone to make transparent and substantive environmental claims. The team maintains the [Filecoin Energy Dashboard](https://filecoin.energy/) and works with storage providers to decarbonize their operations through the [Energy Validation Process](https://filecoin-green.gitbook.io/filecoin-green-documentation/storage-providers-green-guidance-documentation/storage-providers-tiered-sustainability-claims). Connect with the team on Slack at [#fil-green](https://filecoinproject.slack.com/archives/C02HZ215B7Y), or via email at [green@filecoin.org](mailto:green@filecoin.org).

## CO2.Storage

[![GitHub Repo stars](https://img.shields.io/github/stars/protocol/co2-storage)](https://github.com/protocol/co2-storage)
![GitHub last commit](https://img.shields.io/github/last-commit/protocol/co2-storage)
[![Read the doc](https://img.shields.io/badge/docs-gitbook.io-blue)](https://filecoin-green.gitbook.io/filecoin-green-documentation/co2.storage-docs)
[![Join Slack](https://img.shields.io/badge/join-slack-purple)](https://filecoinproject.slack.com/archives/C02HZ215B7Y)

[CO2.Storage](https://co2.storage) is a decentralized storage solution for structured data based on content addressed data schemas. CO2.Storage primarily focuses on structured data for environmental assets, such as Renewable Energy Credits, Carbon Offsets, and geospatial datasets and maps inputs to base data schemas (IPLD DAGs) for off-chain data (like metadata, images, attestation documents, and other assets) to promote the development of standard data schemas for environmental assets. This project is in _alpha_, and while many features can be considered stable, we are waiting until we are feature complete to fully launch. The Filecoin Green team is actively working on this project and welcomes contributions from the community.

## Saturn

[![GitHub Repo stars](https://img.shields.io/github/stars/filecoin-saturn/L1-node)](https://github.com/filecoin-saturn/L1-node)
![GitHub last commit](https://img.shields.io/github/last-commit/filecoin-saturn/L1-node)
[![Read the doc](https://img.shields.io/badge/docs-saturn.tech-blue)](https://doc.saturn.tech)
[![Join Slack](https://img.shields.io/badge/join-Slack-purple)](https://filecoinproject.slack.com/archives/C03DH0BL02E)

A whole new access capability is being launched with [Saturn](https://saturn.tech), which is the world’s first Web3 Content Delivery Network (CDN). Saturn, as a fully distributed CDN, allows clients to access their data via Saturn nodes close to them. Content retrieval times of less than 1 second will open up various new use-cases for Filecoin and create a new market for retrieval providers (L1 Saturn nodes) in which storage providers can also participate.

## Singularity

[![Github Repo stars](https://img.shields.io/github/stars/data-preservation-programs/singularity)](https://github.com/data-preservation-programs/singularity)
![GitHub last commit](https://img.shields.io/github/last-commit/data-preservation-programs/singularity)
[![Read the doc](https://img.shields.io/badge/docs-gitbook.io-blue)](https://data-programs.gitbook.io/singularity)
[![Join Slack](https://img.shields.io/badge/join-Slack-purple)](https://filecoinproject.slack.com/archives/C05JABREATH)

[Singularity](https://singularity.storage) is an end-to-end solution for onboarding datasets to Filecoin storage providers, supporting [PiB-scale data](https://stats.singularity.storage/). It offers modular compatibility with various data preparation and deal-making tools, allowing efficient processing from local or remote storage. Singularity integrates with over 40 storage solutions and introduces inline preparation, which links CAR files to their original data sources, preserving dataset hierarchies. It also supports content distribution and retrieval through multiple protocols and provides push and pull modes for deal making along with robust wallet management features.

## Evergreen

[![GitHub Repo stars](https://img.shields.io/github/stars/data-preservation-programs/spade)](https://github.com/data-preservation-programs/spade)
![GitHub last commit](https://img.shields.io/github/last-commit/data-preservation-programs/spade)
[![Read the doc](https://img.shields.io/badge/docs-README-blue)](https://github.com/data-preservation-programs/spade/blob/master/README.md)
[![Join Slack](https://img.shields.io/badge/join-Slack-purple)](https://filecoinproject.slack.com/archives/C0377FJCG1L)

[Evergreen](https://evergreen.filecoin.io/) extends the [Slingshot](#slingshot) program by aiming to store the open datasets forever. Standard deals have a maximum duration of 540 days, which is not long enough for valuable, open datasets that might need to be stored forever. Evergreen uses [Spade](https://github.com/data-preservation-programs/spade) deal engine that automatically renews deals to extend the lifetime of the dataset on-chain.

## Partner tools and programs

Many other programs and tools exist in the Filecoin community, developed by partners or storage providers. We list some examples below.

### CIDGravity

[![Read the doc](https://img.shields.io/badge/docs-cidgravity.com-blue)](https://docs.cidgravity.com)
[![Join Slack](https://img.shields.io/badge/join-Slack-purple)](https://filecoinproject.slack.com/archives/C04SCAG37FH)

[CIDGravity](https://www.cidgravity.com/) is a software-as-a-service that allows storage providers to handle dynamic pricing and client management towards your solution. It integrates with deal engines such as [Boost](https://boost.filecoin.io).

### Big Data Exchange

Another program that allows storage providers easy access to Fil+ deals is [Big Data Exchange](https://www.bigdataexchange.io/). This platform allows storage providers to bid on datasets they are interested in storing. As a storage provider, you take part in an online auction where you offer FIL to store large data sets. The dataset is explained, together with the technical requirements for the storage provider. The volumes of the datasets offered here are - as the name suggests - big, which can yield big returns in block rewards. That is why, as a storage provider, you might want to bid to store a copy.

Storing real client data means there will be expectations on retrievability of that data. The storage provider can provide the data to the client by keeping unsealed copies of the data and creating an access layer (web or other) for the client. Also Boost-http (see [https://lotus.filecoin.io](https://lotus.filecoin.io) ) provides a way to access data.

### Swan (Filswan)

[![GitHub Org's stars](https://img.shields.io/github/stars/filswan)](https://github.com/filswan)
[![Read the doc](https://img.shields.io/badge/docs-filswan.com-blue)](https://docs.filswan.com/)
[![Join Slack](https://img.shields.io/badge/join-Slack-purple)](https://filecoinproject.slack.com/archives/C04LBAMBDPD)

[Swan](https://www.filswan.com/homepage) is a leading provider of cross-chain cloud computing solutions. Its suite of tools revolutionizes how developers access resources across multiple chains.

Swan Cloud provides decentralized cloud computing solutions for Web3 projects by integrating storage, computing, and payment into one suite.

The Swan Web3 suite includes:

#### Swan Client

[![GitHub Org's stars](https://img.shields.io/github/stars/filswan/go-swan-client)](https://github.com/filswan/go-swan-client)
![GitHub last commit](https://img.shields.io/github/last-commit/filswan/go-swan-client)
[![Read the doc](https://img.shields.io/badge/docs-README-blue)](https://github.com/filswan/go-swan-client/README.md)

Swan-client is an important Web3 toolkit. It provides different tools to help users connect to the Web3 world.

#### Swan Provider

[![Github repo stars](https://img.shields.io/github/stars/filswan/go-swan-provider)](https://github.com/filswan/go-swan-provider)
![GitHub last commit](https://img.shields.io/github/last-commit/filswan/go-swan-provider)
[![Read the doc](https://img.shields.io/badge/docs-README-blue)](https://github.com/filswan/go-swan-provider/README.md)

A golang implementation for Swan Service provider.

#### Multichain Storage

[![Github repo stars](https://img.shields.io/github/stars/filswan/multi-chain-storage)](https://github.com/filswan/multi-chain-storage)
![GitHub last commit](https://img.shields.io/github/last-commit/filswan/multi-chain-storage)
[![Read the doc](https://img.shields.io/badge/docs-README-blue)](https://github.com/filswan/multi-chain-storage/README.md)

[Multichain Storage](https://multichain.storage/home) is a smart-contract-based cross-chain storage gateway integrated with Oracle technology and the Filecoin networks. It accelerates the mass adoption of decentralized storage by bridging multiple blockchain networks.

#### FS3

[![Github repo stars](https://img.shields.io/github/stars/filswan/fs3)](https://github.com/filswan/fs3)
![GitHub last commit](https://img.shields.io/github/last-commit/filswan/fs3)
[![Read the doc](https://img.shields.io/badge/docs-README-blue)](https://github.com/filswan/fs3/README.md)

A high Performance, Kubernetes Native Object Storage.

## Deprecated

Here is a comprehensive list of deprecated tools and projects.

## Filecoin Tracker

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated_04/20/2024-red.svg)

[Filecoin Tracker](https://filecoin-tracker.com/) was deprecated on April 20, 2024.

Here are great existing and working Filecoin dashboards that cover similar topics:

- [Starboard](https://dashboard.starboard.ventures/dashboard)
- [Filecoin Dune Daily Metrics](https://dune.com/kalen/filecoin-daily-metrics)
- [Filecoin Pulse (PoC)](https://filecoinpulse.pages.dev/)

## Slingshot

[![GitHub Repo stars](https://img.shields.io/github/stars/filecoin-project/slingshot)](https://github.com/filecoin-project/slingshot)
![GitHub last commit](https://img.shields.io/github/last-commit/filecoin-project/slingshot)
![maintenance-status](https://img.shields.io/badge/maintenance-deprecated-red.svg)
[![Join Slack](https://img.shields.io/badge/join-Slack-purple)](https://filecoinproject.slack.com/archives/C01AZP8BKRQ)

[Slingshot](https://slingshot.filecoin.io) was a program that united Data clients, Data preparers and storage providers in a community to onboard data and share replicas of publicly valuable [_Open Datasets_](https://datasets.filecoin.io). Rather than providing a web interface like Estuary, Slingshot was a program that provides a workflow and tools for onboarding of large open datasets. The Slingshot Deal Engine provided deals to registered and certified storage providers. The data was prepared and uploaded using a tool called Singularity. The program has [clear requirements of a storage provider](https://slingshot.filecoin.io/requirements#participating-as-a-storage-provider-sp) regarding their capabilities.

See the below video for more information on Slingshot:

{% embed url="https://www.youtube.com/watch?v=14sasiEThig" %}
A overview of the Slingshot project from the Enterprise Storage Provider Accelerator (ESPA).
{% endembed %}

See also:

- [Slingshot v2](https://v2.slingshot.filecoin.io/)
- [Slingshot v3](https://v3.slingshot.filecoin.io/)
- [Slingshot Recovery](https://recovery.slingshot.filecoin.io/)
- https://evergreen.slingshot.filecoin.io/ ⚠️
- https://dashboard.slingshot.filecoin.io/ ⚠️

## Filecoin+

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated-red.svg)

To enhance the Filecoin's utility, [Filecoin Plus](https://filplus.storage/) introduced a social mechanism that incentivizes participants to maximize useful storage. Data owners used DataCap to make deals with storage providers, who benefited from increased block rewards over time. The Filecoin Plus program involved various stakeholders, including root key holders, notaries, data owners, and storage providers, who collaborated to form a governed community.

## Open Panda

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated-red.svg)

[Open Panda](https://openpanda.io/) is a platform for data researchers, analysts, students and enthusiasts to interact with the largest open datasets in the world. Data available through our platform is stored on Filecoin, a decentralized storage network comprised of thousands of independent Storage Providers around the world.

## Data Program

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated-red.svg)

[Data Program](https://dataprograms.org) listed tools, products, and incentive programs designed to drive growth and make data storage on Filecoin more accessible. This list is currently more up-to-date.

## Moonlanding

Moon Landing was designed to ramp up storage providers in the Filecoin network by enabling them to serve verified deals at scale.

See also: https://moon-landing.io/ ⚠️

## Filecoin Dataset Explorer

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated-red.svg)

[Filecoin Dataset Explorer](https://datasets.filecoin.io/) showcased data stored on the Filecoin network between 2020 and 2022, including telemetry, historical archives, Creative Commons media, entertainment archives, scientific research, and machine learning datasets. It highlighted Filecoin's capability to store large datasets redundantly, ensuring availability from multiple Storage Providers worldwide. Each dataset is identified by a unique content identifier (CID). The platform aimed to make diverse datasets accessible to users globally.

See also: [Legacy Explorer](https://legacy.datasets.filecoin.io/)

## Estuary

[![Github repo stars](https://img.shields.io/github/stars/application-research/estuary)](https://github.com/application-research/estuary)
![GitHub last commit](https://img.shields.io/github/last-commit/application-research/estuary)
[![Read the doc](https://img.shields.io/badge/docs-estuary.tech-blue)](https://docs.estuary.tech)
![maintenance-status](https://img.shields.io/badge/maintenance-deprecated-red.svg)

[Estuary](https://docs.estuary.tech/Learn/what-is-estuary) is an open-source software designed for sending public data to the Filecoin network, facilitating data retrieval from anywhere. It integrates IPFS and Filecoin technologies to provide a seamless end-to-end example for data storage and retrieval. When a file is uploaded, Estuary immediately makes multiple storage deals with different providers to ensure redundancy and security. The software automates many aspects of deal making and retrieval, offering tools for managing connections, block storage, and deal tracking. Estuary aims to simplify the use of decentralized storage networks for developers and users.

> **Note ⚠️**   
The [API documentation](https://docs.estuary.tech) is still accessible, but the service may not be running. You can clone the [repository](https://github.com/application-research/estuary) and run your own Estuary node.
