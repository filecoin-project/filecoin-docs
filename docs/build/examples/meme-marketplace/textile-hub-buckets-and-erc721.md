---
title: Textile buckets, hub, and erc 721 token interactions
description: This article describes how textile buckets, hub, and erc 721 token interact, with links to further resources.
---

# Textile Hub, Bucket, and ERC 721 token interactions

## Textile Hub

[Textile Hub](https://docs.textile.io/hub/) is a portal where teams and individual developers can access IPFS and _soon_ Filecoin resources easily. The Hub makes it simple to manage and update [Buckets](https://docs.textile.io/hub/buckets/) on IPFS, persist data for your users on IPFS, deploy and scale [Threads databases](https://docs.textile.io/threads/) for your app users, and collaborate on all of it with your team!

You can find more about Textile Hub in their [documentation](https://docs.textile.io/hub/).

## Textile Buckets

If you've used cloud storage, you'll find buckets easy to understand. Buckets perform like cloud services or containers, but, unlike traditional cloud services, buckets are built on open, decentralized protocols including the IPFS and Libp2p. You can serve websites, data, and apps from buckets.

Buckets are packed with useful features, including:

- Explore Buckets on the [Hub gateway](https://docs.textile.io/buckets/#explore-on-the-gateway).
- Render web content in a Bucket on a persistent [website](https://docs.textile.io/buckets/#render-on-a-website).
- Automatically distribute updates [on IPFS using IPNS](https://docs.textile.io/buckets/#render-on-ipfs-gateways).
- Collaboratively manage Buckets as an [organization](https://docs.textile.io/buckets/#organization-buckets).
- Create private Buckets where [app users can store data](https://docs.textile.io/buckets/#app-user-buckets).
- (Soon) Archive Bucket data on Filecoin to ensure long-term security and access to files.

## ERC 721 Token

If you are familiar with [smart contracts](https://blockgeeks.com/guides/smart-contracts/) and [Ethereum](https://ethereum.org/), then you probably know that the [ERC20](https://docs.openzeppelin.com/contracts/2.x/erc20) token standard can be used to create other _fungible_ tokens. A fungible token is a token that is exchangeable for any other token issued, just like a Euro is exchangeable for any other Euro. There is no significance to the picture on the Euro coin that makes it “different” from others. It’s still one Euro. In the same way, fungible tokens are identical to one another.

The Ethereum network also enables the creation of _non-fungible_ _tokens_ (NFT) using a standard called ERC 721. A non-fungible token is more like a baseball card or other collectible item. There may be one original or a limited number of issued originals that are distinguishable from one another. NFTs are used in art, collectibles, or to denote unique assets such as real estate. The sample application creates NFTs that can represent memes, where each meme is an item that can be distinguished from the others.

To create these NFTs, this tutorial uses [smart contracts](https://github.com/OpenZeppelin/openzeppelin-contracts/) written by [OpenZeppelin](https://openzeppelin.com/), an organization that provides tools to write, deploy, and operate decentralized applications.

## Textile Hub, Bucket, and ERC 721 token interactions

The data (memes) will be stored on IPFS using Textile Buckets. The Hub makes it simple to manage and update Buckets on IPFS, persist data for your users on IPFS.

An ERC 721 token will be created for each meme file stored on Textile Buckets, to uniquely identify the meme on a blockchain network.

The following diagram explains the data flow in the application.

![How data flows between Textile Hub, Textile Bucket, and Blockchain network](./images/data-flow.png)

1. The data (meme) is sent from the Frontend to the Textile Hub.
2. Textile Hub stores the data in a Textile Bucket.
3. The CID of the data stored in Textile Bucket is registered on the Blockchain network.

## Resources

- [More on Textile Hub](https://docs.textile.io/hub/)
- [More on Textile Buckets](https://docs.textile.io/buckets/)
- [More on Textile ERC 721](https://docs.openzeppelin.com/contracts/2.x/erc721)

## Start Coding
 → [Starting a blockchain network and deploying contracts
](/build/examples/meme-marketplace/step-1-blockchain-and-contracts-setup/#blockchain-and-smart-contract-setup)
