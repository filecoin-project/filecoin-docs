---
title: "Storage Helpers"
description: "Storage helpers are APIs and services that abstract Filecoin dealmaking into simple, streamlined API calls."
menu:
    build:
        parent: "build-get-started"
---

Storage helpers are the simplest way to integrate Filecoin storage into your application or smart contract. They provide APIs, services, or SDKs to abstract and automate the storage deal process.

Here’s how they work: Developers use SDKs or APIs to send data to storage helpers. Behind the scenes, storage helpers receive the files, and upload data to IPFS nodes, make deals with Filecoin storage providers, or both. You can use the same APIs or other tools to retrieve data quickly.

Storage helpers are available for NFTs or general data. If you are storing NFTs, check out [NFT.Storage](https://nft.storage/). For general application data, skip to [General application data](#general-application-data).

### Storing NFTs

- [NFT.Storage](https://nft.storage/) offers free, long-term storage for your NFT metadata and assets. Its uses CIDs so you can create truly immutable NFTs and avoid rug pulls. Data uploads of up to 31 GiB per file are possible. NFT.Storage has a Javascript library, HTTP API, and browser-based uploader. There are also clients in Go, Java, PHP, Python, Ruby, and Rust automatically generated via OpenAPI.

### General application data

- [Chainsafe Storage API](https://docs.storage.chainsafe.io) is an underlayer to Chainsafe's encrypted IPFS & Filecoin file storage system. It offers S3-compatible bucket style APIs for easy migration of data. As of September 2022, it's the only storage helper with built-in encryption.

- [Web3.Storage](https://web3.storage/docs) is a fast, open, and free service for decentralized web storage. Upload any data, and it will end up on a decentralized set of IPFS and Filecoin storage providers. There are JavaScript and Go libraries for the API, as well as a web uploader.

- [Estuary](https://docs.estuary.tech) is a free, decentralized data storage service for IPFS and Filecoin. Users can store and retrieve content quickly, and have their data backed up with proposition receipts and successful deal receipts. Estuary’s API adheres to the IPFS Pinning Services API Spec. You can use Estuary via its HTTP API or rclone syncer. Note: Estuary is in alpha mode. Users wanting to store meaningful public data can apply for an API token.

### Advanced tools

The following tools offer more customization and configuration options. You can choose specific individual storage providers, customize pricing, and more. Note that you may have to manage storage deals individually, including designing your own redundancy plans, keeping track of expiring deals, and renewing them and more.

- [Textile Powergate](https://docs.textile.io/powergate/) combines IPFS and Filecoin nodes directly, and offers advanced configuration options such as miner selection, replication factor, deal renewal, and repair. It includes JavaScript and Go libraries, and administrative APIs to create and manage users.
