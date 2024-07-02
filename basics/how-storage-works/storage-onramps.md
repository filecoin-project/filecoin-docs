---
description: >-
  Storage on-ramps and helpers are APIs and services that abstract Filecoin
  dealmaking into simple, streamlined API calls.
---

# Storage on-ramps

Here’s how they work: Developers use APIs or libraries to send data to storage helpers. Behind the scenes, storage helpers receive the data and handle the underlying processes to store it in a reliable and decentralized storage way by saving it [IPFS](https://ipfs.tech) nodes, making deals with Filecoin storage providers – or both. You can use the same APIs or other tools to retrieve data quickly.

Storage helpers are available for NFTs (non-fungible tokens) or general data. If you are storing NFTs, check out [Storing NFTs](storage-onramps.md#storing-nfts). For general data, skip to [General data storage](storage-onramps.md#general-data-storage).

#### Storing NFTs

* [NFT.Storage](https://nft.storage/) offers a low-cost, easy-to-use solution to preserve your NFTs, ensuring verifiable long-term storage powered by smart contracts and backed by a soon-to-be on-chain endowment for ultimate transparency. As of 30 June 2024, no new uploads to NFT.Storage Classic (including NFTUp) will be accepted, but existing data remains safe and accessible via the NFT.Storage Gateway, stored in decentralized long-term Filecoin storage.

Check out the new version of NFT.Storage: First, mint your NFTs, then send us the NFT data—metadata and imagery CIDs, blockchain(s) minted on, contract address, and token IDs. We store these in long-term Filecoin storage. Note that you need to upload the data to IPFS separately. We recommend using Pinata or Lighthouse with our referral links to support NFT.Storage: https://nft.storage/blog/announcing-our-new-partnerships-with-pinata-and-lighthouse.

#### General data storage

* [Chainsafe Storage API](https://docs.storage.chainsafe.io) is an underlayer to Chainsafe’s encrypted IPFS & Filecoin file storage system. It offers S3-compatible bucket-style APIs for easy migration of data. As of September 2022, it’s the only storage helper with built-in encryption.
* [Web3.Storage](https://web3.storage/docs) is a fast and open developer platform for [storing and interacting with data](https://blog.web3.storage/). Upload any data and Web3.Storage will ensure it ends up on a decentralized set of IPFS and Filecoin storage providers. There are JavaScript and Go libraries for the API, as well as a no-code web uploader. Free and paid plans are available.
