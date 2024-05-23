---
description: >-
  This page covers the various programs and services that storage providers can
  take part in.
---

# Filecoin programs and tools

Although it is possible to find your own data storage customers with valuable datasets they want to store, and have them verified through KYC ([Know Your Customer](https://en.wikipedia.org/wiki/Know\_your\_customer)) to create verified deals for [Fil+](../../basics/how-storage-works/filecoin-plus.md), there are also programs and platforms that make it easier for storage providers to receive verified deals.

## [Web3.storage](https://web3.storage/)

[![GitHub Repo stars](https://img.shields.io/github/stars/web3-storage/web3.storage)](https://github.com/web3-storage/web3.storage)
[![GitHub last commit](https://img.shields.io/github/last-commit/web3-storage/web3.storage)](https://github.com/web3-storage/web3.storage/graphs/commit-activity)
[![Docs site](https://img.shields.io/badge/docs-web3.storage-blue)](https://web3.storage/docs/)

Web3.storage runs on “Elastic IPFS” as the inbound storage protocol offering scalability, performance and reliability as the platform grows. It guarantees the user (typically developers) that the platform will always serve your data when you need it. In the backend the data is uploaded onto the Filecoin Network for long-term storage.

## [Filecoin Green](https://green.filecoin.io)

[![Read the doc](https://img.shields.io/badge/docs-gitbook.io-blue)](https://filecoin-green.gitbook.io/filecoin-green-documentation)
[![Join Slack](https://img.shields.io/badge/join-slack-purple)](https://filecoinproject.slack.com/archives/C02HZ215B7Y)

Filecoin Green aims to measure the environmental impacts of Filecoin and verifiably drive them below zero, building infrastructure along the way that allows anyone to make transparent and substantive environmental claims. The team maintains the [Filecoin Energy Dashboard](https://filecoin.energy/) and works with storage providers to decarbonize their operations through the [Energy Validation Process](https://filecoin-green.gitbook.io/filecoin-green-documentation/storage-providers-green-guidance-documentation/storage-providers-tiered-sustainability-claims). Connect with the team on Slack at [#fil-green](https://filecoinproject.slack.com/archives/C02HZ215B7Y), or via email at [green@filecoin.org](mailto:green@filecoin.org).

## [Saturn](https://saturn.tech)

[![GitHub Repo stars](https://img.shields.io/github/stars/filecoin-saturn/L1-node)](https://github.com/filecoin-saturn/L1-node)
![GitHub last commit](https://img.shields.io/github/last-commit/filecoin-saturn/L1-node)
[![Read the doc](https://img.shields.io/badge/docs-saturn.tech-blue)](https://doc.saturn.tech)
[![Join Slack](https://img.shields.io/badge/join-Slack-purple)](https://filecoinproject.slack.com/archives/C03DH0BL02E)

A whole new access capability is being launched with Saturn, which is the world’s first Web3 Content Delivery Network (CDN). Saturn, as a fully distributed CDN, allows clients to access their data via Saturn nodes close to them. Content retrieval times of less than 1 second will open up various new use-cases for Filecoin and create a new market for retrieval providers (L1 Saturn nodes) in which storage providers can also participate.

## [Spade](https://github.com/data-preservation-programs/spade)

[![GitHub Repo stars](https://img.shields.io/github/stars/data-preservation-programs/spade)](https://github.com/data-preservation-programs/spade)
[![GitHub last commit](https://img.shields.io/github/last-commit/data-preservation-programs/spade)](https://github.com/data-preservation-programs/spade/graphs/commit-activity)
[![Read the doc](https://img.shields.io/badge/docs-README-blue)](https://github.com/data-preservation-programs/spade/blob/master/README.md)
[![Join Slack](https://img.shields.io/badge/join-Slack-purple)](https://filecoinproject.slack.com/archives/C0377FJCG1L)

Spade automates the process of renewing storage deals on the Filecoin network, ensuring the longevity of data stored on the blockchain. This is particularly useful for datasets that need to be preserved for extended periods, far beyond the standard deal duration. By using Spade, organizations and individuals can manage and maintain their data storage deals more efficiently, guaranteeing that valuable data remains accessible and secure over time.

## [Singularity](https://github.com/data-preservation-programs/singularity)

[![Github Repo stars](https://img.shields.io/github/stars/data-preservation-programs/singularity)](https://github.com/data-preservation-programs/singularity)
[![GitHub last commit](https://img.shields.io/github/last-commit/data-preservation-programs/singularity)](https://github.com/data-preservation-programs/spade/graphs/commit-activity)
[![Read the doc](https://img.shields.io/badge/docs-gitbook.io-blue)](https://data-programs.gitbook.io/singularity)
[![Join Slack](https://img.shields.io/badge/join-Slack-purple)](https://filecoinproject.slack.com/archives/C05JABREATH)

Singularity is an end-to-end solution for onboarding datasets to Filecoin storage providers, supporting [PiB-scale data](https://stats.singularity.storage/). It offers modular compatibility with various data preparation and deal-making tools, allowing efficient processing from local or remote storage. Singularity integrates with over 40 storage solutions and introduces inline preparation, which links CAR files to their original data sources, preserving dataset hierarchies. It also supports content distribution and retrieval through multiple protocols and provides push and pull modes for deal making along with robust wallet management features.

## Partner tools and programs

Many other programs and tools exist in the Filecoin community, developed by partners or storage providers. We list some examples below.

### [CIDGravity](https://www.cidgravity.com/)

[![Read the doc](https://img.shields.io/badge/docs-cidgravity.com-blue)](https://docs.cidgravity.com)
[![Join Slack](https://img.shields.io/badge/join-Slack-purple)](https://filecoinproject.slack.com/archives/C04SCAG37FH)

CIDGravity is a software-as-a-service that allows storage providers to handle dynamic pricing and client management towards your solution. It integrates with deal engines such as [Boost](https://boost.filecoin.io).

### [Big Data Exchange](https://www.bigdataexchange.io/)

Another program that allows storage providers easy access to Fil+ deals is Big Data Exchange. This platform allows storage providers to bid on datasets they are interested in storing. As a storage provider, you take part in an online auction where you offer FIL to store large data sets. The dataset is explained, together with the technical requirements for the storage provider. The volumes of the datasets offered here are - as the name suggests - big, which can yield big returns in block rewards. That is why, as a storage provider, you might want to bid to store a copy.

Storing real client data means there will be expectations on retrievability of that data. The storage provider can provide the data to the client by keeping unsealed copies of the data and creating an access layer (web or other) for the client. Also Boost-http (see [https://lotus.filecoin.io](https://lotus.filecoin.io)) provides a way to access data.

### [Swan (Filswan)](https://github.com/filswan)

[![GitHub Org's stars](https://img.shields.io/github/stars/filswan)](https://github.com/filswan)
[![Read the doc](https://img.shields.io/badge/docs-filswan.com-blue)](https://docs.filswan.com/)
[![Join Slack](https://img.shields.io/badge/join-Slack-purple)](https://filecoinproject.slack.com/archives/C04LBAMBDPD)

Swan is a provider of cross-chain cloud computing solutions. Developers can use its suite of tools to access resources across multiple chains.

Swan Cloud provides decentralized cloud computing solutions for Web3 projects by integrating storage, computing, and payment into one suite.

## Former programs and tools

Here is a comprehensive list of deprecated tools and projects.

### Evergreen

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated_04/2024-red.svg)

Evergreen extended the [Slingshot](#slingshot) program by aiming to store open datasets forever. Standard deals had a maximum duration of 540 days, which was not long enough for valuable, open datasets that might need to be stored forever. Evergreen used the [Spade](#spade) deal engine, which automatically renewed deals to extend the lifetime of the dataset on-chain.

### CO2.Storage

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated_04/2024-red.svg)

CO2.Storage was a decentralized storage solution for structured data based on content-addressed data schemas. CO2.Storage primarily focused on structured data for environmental assets, such as Renewable Energy Credits, Carbon Offsets, and geospatial datasets, and mapped inputs to base data schemas (IPLD DAGs) for off-chain data (like metadata, images, attestation documents, and other assets) to promote the development of standard data schemas for environmental assets. This project was in alpha, and while many features could be considered stable, it was waiting until being feature complete to fully launch. The Filecoin Green team was actively working on this project and welcomed contributions from the community.

### Filecoin Tracker (filecoin-tracker.com)

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated_04/2024-red.svg)

Filecoin Tracker was deprecated on April 20, 2024.

Here are great existing and working Filecoin dashboards that cover similar topics:

- [Starboard](https://dashboard.starboard.ventures/dashboard)
- [Filecoin Dune Daily Metrics](https://dune.com/kalen/filecoin-daily-metrics)
- [Filecoin Pulse (PoC)](https://filecoinpulse.pages.dev/)

### [Slingshot](https://slingshot.filecoin.io)

[![GitHub Repo stars](https://img.shields.io/github/stars/filecoin-project/slingshot)](https://github.com/filecoin-project/slingshot)
![GitHub last commit](https://img.shields.io/github/last-commit/filecoin-project/slingshot)
![maintenance-status](https://img.shields.io/badge/maintenance-deprecated-red.svg)
[![Join Slack](https://img.shields.io/badge/join-Slack-purple)](https://filecoinproject.slack.com/archives/C01AZP8BKRQ)

Slingshot was a program that united Data clients, Data preparers and storage providers in a community to onboard data and share replicas of publicly valuable [_Open Datasets_](https://datasets.filecoin.io). Rather than providing a web interface like Estuary, Slingshot was a program that provides a workflow and tools for onboarding of large open datasets. The Slingshot Deal Engine provided deals to registered and certified storage providers. The data was prepared and uploaded using a tool called [Singularity](#singularity).

### [Open Panda](https://openpanda.io/)

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated-red.svg)

Open Panda was a platform for data researchers, analysts, students, and enthusiasts to interact with the largest open datasets in the world. Data available through the platform was stored on Filecoin, a decentralized storage network comprised of thousands of independent Storage Providers around the world.

### [Dataprograms.org](https://dataprograms.org)

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated_04/2024-red.svg)

dataprograms.org listed tools, products, and incentive programs designed to drive growth and make data storage on Filecoin more accessible. It was discontinued in April 2024.

### Moonlanding

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated_04/2024-red.svg)

Moon Landing was designed to ramp up storage providers in the Filecoin network by enabling them to serve verified deals at scale.

### Filecoin Dataset Explorer (datasets.filecoin.io)

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated_04/2024-red.svg)

Filecoin Dataset Explorer showcased data stored on the Filecoin network between 2020 and 2022, including telemetry, historical archives, Creative Commons media, entertainment archives, scientific research, and machine learning datasets. It highlighted Filecoin's capability to store large datasets redundantly, ensuring availability from multiple Storage Providers worldwide. Each dataset is identified by a unique content identifier (CID). The platform aimed to make diverse datasets accessible to users globally.

See also: Legacy Explorer (legacy.datasets.filecoin.io)

## Estuary (estuary.tech)

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated_07/2023-red.svg)

Estuary was an open-source software designed for sending public data to the Filecoin network, facilitating data retrieval from anywhere. It integrated IPFS and Filecoin technologies to provide a seamless end-to-end example for data storage and retrieval. When a file was uploaded, Estuary immediately made multiple storage deals with different providers to ensure redundancy and security. The software automated many aspects of deal making and retrieval, offering tools for managing connections, block storage, and deal tracking. Estuary aimed to simplify the use of decentralized storage networks for developers and users.

Estuary was discontinued in July 2023, and the website shut down in April 2024.
