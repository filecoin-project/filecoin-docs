---
title: "NFT storage"
details: "NFT.Storage is a long-term storage service designed for off-chain NFT data like metadata, images, and other assets up to 31GiB in size per individual upload. Data is content addressed using IPFS, meaning the URI pointing to a piece of data is completely unique to that data."
lead: "NFT.Storage is a long-term storage service designed for off-chain NFT data like metadata, images, and other assets up to 31GiB in size per individual upload. Data is content addressed using IPFS, meaning the URI pointing to a piece of data `ipfs://…` is completely unique to that data. IPFS URLs and CIDs can be used in NFTs and metadata to ensure the NFT forever actually refers to the intended data eliminating things like rug pulls, and making it trustlessly verifiable what content an NFT is associated with."
draft: false
images: []
type: docs
menu:
  developers:
    parent: "lorem"
    identifier: "nft-storage-0e432d45af71a4ed5d5784c956fbb49e"
weight: 100
toc: true
---

{{< beta-warning >}}

![The NFT.Storage homepage.](nft-storage-homepage.png)

NFT.Storage stores many copies of uploaded data on the public IPFS network in two primary ways: in dedicated IPFS servers managed by NFT.Storage, and decentralized on Filecoin. Since IPFS is a standard used by many different storage services, it's easy to redundantly store data uploaded to NFT.Storage on any other IPFS-compatible storage solution from pinning services, to your local IPFS node, to other storage networks like Arweave or Storj. And as time goes on, NFT.Storage will increasingly decentralize itself as a public good!

Check out the NFT.Storage documentation for [how to get started](https://nft.storage/docs/)
