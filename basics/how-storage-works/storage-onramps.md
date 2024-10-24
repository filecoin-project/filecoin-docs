---
description: >-
  Storage on-ramps and helpers are APIs and services that abstract Filecoin
  dealmaking into simple, streamlined API calls.
---

# Storage onramps

Here’s how they work: Developers use APIs or libraries to send data to storage helpers. Behind the scenes, storage helpers receive the data and handle the underlying processes to store it in a reliable and decentralized storage way by saving it [IPFS](https://ipfs.tech) nodes, making deals with Filecoin storage providers – or both. You can use the same APIs or other tools to retrieve data quickly.

Storage helpers are available for NFTs (non-fungible tokens) or general data. If you are storing NFTs, check out [Storing NFTs](storage-onramps.md#storing-nfts). For general data, skip to [General data storage](storage-onramps.md#general-data-storage).

#### Storing NFTs

* [The NFT.Storage flagship product](https://nft.storage/nft-storage-flagship-product) focuses on the enduring preservation of NFTs with a low one-time fee per. First mint your NFTs, then send us the NFT data that we preserve in endowment-backed long-term Filecoin storage. As an NFT.Storage user, you support our platform when you choose Pinata and Lighthouse for hot storage and [use our referral links here](https://nft.storage/blog/announcing-our-new-partnerships-with-pinata-and-lighthouse), helping to sustain our valuable public goods. Your NFTs will also be included in the NFT Token Checker, a tool for block explorers, marketplaces and wallets to show verification that NFT collections, tokens, and CIDs are preserved by NFT.Storage.
* [NFT.Storage Classic](https://nft.storage/nft-storage-classic) is a free service that provides hot data storage on the decentralized Filecoin network with fast retrieval through IPFS. As of June 30, 2024, we have officially decommissioned NFT.Storage Classic uploads, however retrieval of existing data remains operational. For NFT data already uploaded through NFT.Storage Classic, the NFT.Storage Gateway makes the data retrievable on block explorers, marketplaces and dapps.

#### General data storage

* [Chainsafe Storage API](https://docs.storage.chainsafe.io) is an underlayer to Chainsafe’s encrypted IPFS & Filecoin file storage system. It offers S3-compatible bucket-style APIs for easy migration of data. As of September 2022, it’s the only storage helper with built-in encryption.
* [Web3.Storage](https://web3.storage/docs) is a fast and open developer platform for [storing and interacting with data](https://blog.web3.storage/). Upload any data and Web3.Storage will ensure it ends up on a decentralized set of IPFS and Filecoin storage providers. There are JavaScript and Go libraries for the API, as well as a no-code web uploader. Free and paid plans are available.
