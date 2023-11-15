---
description: >-
  Storage on-ramps and helpers are APIs and services that abstract Filecoin
  dealmaking into simple, streamlined API calls.
---

# Storage on-ramps

Here’s how they work: Developers use APIs or libraries to send data to storage helpers. Behind the scenes, storage helpers receive the data and handle the underlying processes to store it in a reliable and decentralized storage way by saving it [IPFS](https://ipfs.tech) nodes, making deals with Filecoin storage providers – or both. You can use the same APIs or other tools to retrieve data quickly.

Storage helpers are available for NFTs (non-fungible tokens) or general data. If you are storing NFTs, check out [Storing NFTs](storage-onramps.md#storing-nfts). For general data, skip to [General data storage](storage-onramps.md#general-data-storage).

#### Storing NFTs

* [NFT.Storage](https://nft.storage/) offers free, long-term storage for your NFT metadata and assets. It uses CIDs (content identifiers) so you can create truly immutable NFTs and avoid situations where files are accidentally (also known as “rug pulls”). Data uploads of up to 31 GiB per file are possible. NFT.Storage has a JavaScript library, HTTP API, and a browser-based uploader. There are also clients in Go, Java, PHP, Python, Ruby, and Rust automatically generated via OpenAPI.

#### General data storage

* [Chainsafe Storage API](https://docs.storage.chainsafe.io) is an underlayer to Chainsafe’s encrypted IPFS & Filecoin file storage system. It offers S3-compatible bucket-style APIs for easy migration of data. As of September 2022, it’s the only storage helper with built-in encryption.
* [Web3.Storage](https://web3.storage/docs) is a fast and open developer platform for [storing and interacting with data](https://blog.web3.storage/). Upload any data and Web3.Storage will ensure it ends up on a decentralized set of IPFS and Filecoin storage providers. There are JavaScript and Go libraries for the API, as well as a no-code web uploader. Free and paid plans are available.

#### Advanced tools

The following tools offer more customization and configuration options. You can choose specific individual storage providers, customized pricing, and more. Note that you may have to manage storage deals individually, including designing your own redundancy plans, keeping track of expiring deals, renewing them, and more.

* [Textile Powergate](https://docs.textile.io/powergate/) combines IPFS and Filecoin nodes directly and offers advanced configuration options such as miner selection, replication factor, deal renewal, and repair. It includes JavaScript and Go libraries and administrative APIs to create and manage users.
