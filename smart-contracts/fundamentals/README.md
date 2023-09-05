---
description: >-
  Learn about the various tools and options for adding Filecoin storage to
  software applications, smart contracts, and workflows.
---

# Fundamentals

## Develop on Filecoin

Filecoin combines the benefits of content-addressed data leveraged by IPFS with blockchain-powered storage guarantees. The network offers robust and resilient distributed storage at massively lower cost compared to current centralized alternatives.

Developers choose Filecoin because it:

* is the world’s largest distributed storage network, without centralized servers or authority
* offers on-chain proofs to verify and authenticate data
* is highly compatible with [IPFS](https://ipfs.tech/) and content addressing
* is the only decentralized storage network with petabyte-scale capacity
* stores data at extremely low cost (and keeps it that way for the long term)

## Filecoin and IPFS

How do Filecoin and IPFS work together? They are complementary protocols for storing and sharing data in the distributed web. Both systems are open-source and share many building blocks, including content addressing (CIDs) and network protocols (libp2p).

IPFS does not include built-in mechanisms to incentivize the storage of data for other people. To persist IPFS data, you must either run your own IPFS node or pay a provider.

This is where Filecoin comes in. Filecoin adds an incentive layer to content-addressed data. Storage deals are recorded on-chain, and providers must submit proofs of storage to the network over time. Payments, penalties, and block rewards are all enforced by the decentralized protocol.

Filecoin and IPFS are designed as separate layers to give developers more choice and modularity, but many tools are available for combining their benefits. This diagram illustrates how these tools (often called storage helpers) provide developer-friendly APIs for storing on IPFS, Filecoin, or both.

![Web3-Enabled Architecture by Filecoin](https://docs.filecoin.io/smart-contracts/fundamentals/overview/web3-architecture\_hu3e83233343686501f76831d055c9ac40\_1659851\_2856x0\_resize\_q75\_h2\_box\_3.webp)

## Filecoin and smart contracts

You can improve speed and reduce gas fees by storing smart contract data on Filecoin. With Filecoin, the data itself is stored off-chain, but is used to generate verifiable CIDs and storage proofs that are recorded on the Filecoin chain and can be included in your smart contracts. This design pairs well with multiple smart contract networks such as Ethereum, Polygon, Avalanche, Solana, and more. Your smart contract only needs to include the compact content ids.

## Get started

Let’s get building. Choose one of the following APIs. These are all storage helpers, or tools and services that abstract Filecoin’s robust deal making processes into simple, streamlined API calls.

* [Chainsafe Storage API](https://docs.storage.chainsafe.io/) - for projects needing S3 compatibility
* [Estuary](https://estuary.tech/) - for larger-scale applications and public data
* [NFT.storage](https://nft.storage/) - for NFT data
* [Web3.storage](https://web3.storage/) - for general application data

Examples:

* [Polygon tutorial](https://nftschool.dev/tutorial/mint-nftstorage-polygon/) on NFTschool.dev
* [Flow tutorial](https://nftschool.dev/tutorial/flow-nft-marketplace/) on NFTschool.dev
* [Avalanche tutorial](https://nftschool.dev/tutorial/avax-nft/) on NFTschool.dev
* [Using IPFS & Filecoin on Harmony](https://docs.harmony.one/home/developers/tutorials/ipfs-filecoin)

## Additional resources

* [Filecoin integrations for Web3 infrastructure](https://www.youtube.com/watch?v=Q0oe6i7d1u4) (video)
* [What is an IPFS Pinning Service?](https://medium.com/pinata/what-is-an-ipfs-pinning-service-f6ed4cd7e475) (Pinata explainer)
* [IPFS documentation: Persistence, permanence and pinning](https://docs.ipfs.tech/concepts/persistence/)
* [Developing on Filecoin](https://www.youtube.com/watch?v=aGCpq0Xf-w8) (video)
* Textile tools: [video](https://www.youtube.com/watch?v=IZ8M9m9\_uJY) and [blog post](https://blog.textile.io/developer-tools-for-filecoin-ipfs-web/)
* [Building decentralized apps using Fleek’s Space daemon](https://www.youtube.com/watch?v=pWJ5fty-7mA) (video)
