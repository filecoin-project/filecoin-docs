---
title: Meme Marketplace Overview
description: A brief description of the Meme Marketplace Example.
---

# Meme Marketplace Overview

In this tutorial, we will build a [meme marketplace](https://github.com/filecoin-shipyard/meme-marketplace) using [Textile Hub](https://docs.textile.io/hub/), which is a [Filecoin-backed IPFS Pinning Service](../../filecoin-pinning-services/), and Ethereum ERC 721 standard.

You will be able to upload memes to Textile Hub using a dashboard and register the memes with ERC 721 Non-fungible tokens, which will help anyone to uniquely identify the memes and their owners in a decentralized way!

After completing this tutorial, you will be able to:

1. Write and deploy an ERC 721 standard contract to create and issue Non-fungible tokens (NFTs).
2. Use javascript libraries to connect to remote Textile Hub to add and retrieve data from Textile Buckets.
3. Use javascript libraries to connect to ethereum blockchain to interact with the deployed smart contract.

The app you’ll build in the tutorial includes three pages:

1. Login page to authenticate with an authentication server to access Textile Hub.
2. Create a Meme page that uses Textile Hub to upload meme images to the Textile Bucket, and then creates a token for the uploaded meme on the local Ethereum blockchain.
3. Marketplace page listing details of all the memes by fetching data from the blockchain and Textile Bucket.

Here is a sneak-peek of how the final application will look:

@[youtube](https://youtu.be/UaTr0JSg4ZQ)

To complete the application, you’ll need the following repositories:

- [Repository](https://github.com/filecoin-shipyard/meme-nft-token) for ERC 721 smart contract.
- [Repository](https://github.com/filecoin-shipyard/meme-marketplace/tree/master/hub-browser-auth-app) for the authentication server.
- [Repository](https://github.com/filecoin-shipyard/meme-marketplace/tree/master/marketplace) for meme marketplace app.

The high-level overview of the application architecture:

- Textile Hub is hosted on a remote server.
- The ERC 721 token smart contract resides on a local (private) blockchain network.
- A Textile Hub authentication server runs locally.
- Your browser application interacts with the remote Textile hub server, local authentication server, the blockchain network for storing memes, and creating NFTs.

![Meme marketplace app architecture showing how the react app, authentication server, and remote hub APIs work together](./images/app-arch.png)

Before diving into the tutorial for this sample application, the following section provides an understanding of Textile Hub and ERC 721 standard token contract.
