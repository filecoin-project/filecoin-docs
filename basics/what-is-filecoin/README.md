---
description: >-
  This section offers a detailed overview of Filecoin for developers, serving as a go-to reference for their needs.
---

<meta name="description" content="Introduction to Filecoin." />

# Introduction to Filecoin

Filecoin is a peer-to-peer network that enables reliable, decentralized file storage through built-in economic incentives and cryptographic proofs. Clients, or users, pay any number of storage providers, or data centers, to store the client's data --storage providers then provide cryptographic proofs daily as evidence to the clients that the data is still at the data center.  Storage providers lock a certain amount of Filecoin as collateral --should they fail to provide a proof, their collateral gets burned, serving as a strong deterrent from the data center losing the data. 

Anyone can join Filecoin as a client looking to store their data, or as a storage provider offering storage services. Storage availability and pricing aren’t controlled by any single entity; instead, Filecoin fosters an open market for file storage and retrieval accessible to all.  Clients can review the history of each storage provider, along with their credentials and compliance record, before choosing to store their data with them.

Note that most Filecoin nodes are [IPFS protocol](https://docs.ipfs.tech/) nodes.  IPFS is a open system, a hypermedia protocol, to manage data without a central server that makes use of [content addressing](https://docs.ipfs.tech/concepts/content-addressing/) to provide permanent data references without dependency on specific devices or cloud providers.  A client who knows the content address (CID) of their file can retrieve it from any IPFS node (or Filecoin storage provider) that currently has a copy and is able to serve it.  

Historically, IPFS node operators offered pinning services to the community out of interest and often for free, meaning there was no financial incentive for the IPFS node operators to stay online or keep a given file for a long period of time.  Filecoin solves this issue by introducing an incentive layer (clients pay storage providers for long term data center use) to ensure more reliable long term cold storage.  Since most Filecoin nodes are also IPFS nodes, they can pin a hot copy of the given file to the IPFS node to allow the client to easily retrieve the file later.

Filecoin is used as a storage solution for a range of products, including from Web3-native NFT storage, incentivized permanent storage, and archival traditional Web2 datasets. For instance, [NFT.Storage](https://nft.storage/) leverages Filecoin for NFT content and metadata storage.  Organizations such as the [Shoah Foundation](https://sfi.usc.edu/) and the [Internet Archive](https://archive.org/) use Filecoin for content preservation and backup.

Filecoin is compatible with various data types, including audio and video files. This versatility allows Web3 platforms like [Audius](https://audius.co/) and [Huddle01](https://huddle01.com/) to use Filecoin as a decentralized storage backend for music streaming and video conferencing.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/basics/what-is-filecoin)
