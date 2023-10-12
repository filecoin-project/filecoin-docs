---
title: "Storage onramps"
description: "Storage on-ramps and helpers are APIs and services that abstract Filecoin dealmaking into simple, streamlined API calls. They are the simplest way to integrate Filecoin storage into your application or smart contract."
lead: "Storage on-ramps and helpers are APIs and services that abstract Filecoin dealmaking into simple, streamlined API calls. They are the simplest way to integrate Filecoin storage into your application or smart contract."
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-how-storage-works"
    identifier: "storage-onramps-a18c421e5c544ae641f5f01545078431"
weight: 100
toc: true
aliases:
    - "/developers/storage-helpers/overview/"
    - "/developers/storage-helpers/ceramic/"
    - "/developers/storage-helpers/estuary/"
    - "/developers/storage-helpers/nft-storage/"
    - "/developers/storage-helpers/starling/"
    - "/developers/storage-helpers/web3-storage/"
    - "/store/"
    - "/store/tools/"
    - "/store/tools/estuary/"
---

Here’s how they work: Developers use APIs or libraries to send data to storage helpers. Behind the scenes, storage helpers receive the data and handle the underlying processes to store it in a reliable and decentralized storage way, by saving it [IPFS](https://ipfs.tech) nodes, making deals with Filecoin storage providers -- or both. You can use the same APIs or other tools to retrieve data quickly.

Storage helpers are available for NFTs (non-fungible tokens) or general data. If you are storing NFTs, check out [Storing NFTs](#storing-nfts). For general data, skip to [General data storage](#general-data-storage).

### Storing NFTs

- [NFT.Storage](https://nft.storage/) offers free, long-term storage for your NFT metadata and assets. It uses CIDs (content identifiers) so you can create truly immutable NFTs and avoid situations where files are accidentally  (also known as "rug pulls"). Data uploads of up to 31 GiB per file are possible. NFT.Storage has a JavaScript library, HTTP API, and browser-based uploader. There are also clients in Go, Java, PHP, Python, Ruby, and Rust automatically generated via OpenAPI.

### General data storage

- [Chainsafe Storage API](https://docs.storage.chainsafe.io) is an underlayer to Chainsafe's encrypted IPFS & Filecoin file storage system. It offers S3-compatible bucket style APIs for easy migration of data. As of September 2022, it's the only storage helper with built-in encryption.

- [Estuary](https://docs.estuary.tech) is a free, decentralized data storage service for IPFS and Filecoin. Users can store and retrieve content quickly, and have their data backed up with proposition receipts and successful deal receipts. Estuary’s API adheres to the IPFS Pinning Services API Spec. You can use Estuary via its HTTP API or rclone tool for syncing. Note: Estuary is in alpha mode. Users wanting to store meaningful public data can apply for an API token.

- [Web3.Storage](https://web3.storage/docs) is a fast and open developer platform for [storing and interacting with data](https://blog.web3.storage/posts/say-hello-to-the-data-layer-1-3-intro-to-web3-storage). Upload any data, and Web3.Storage will ensure it ends up on a decentralized set of IPFS and Filecoin storage providers. There are JavaScript and Go libraries for the API, as well as a no-code web uploader. Free and paid plans are available.

### Advanced tools

The following tools offer more customization and configuration options. You can choose specific individual storage providers, customize pricing, and more. Note that you may have to manage storage deals individually, including designing your own redundancy plans, keeping track of expiring deals, and renewing them and more.

- [Textile Powergate](https://docs.textile.io/powergate/) combines IPFS and Filecoin nodes directly, and offers advanced configuration options such as miner selection, replication factor, deal renewal, and repair. It includes JavaScript and Go libraries, and administrative APIs to create and manage users.
