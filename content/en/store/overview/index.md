---
title: "Start storing"
description: "Start storing data on the Filecoin network."
menu:
    store:
        parent: "store-overview"
weight: 1
aliases:
    - /store
---

Storing data on Filecoin lets users harness the power of a distributed network and an open market served by thousands of different storage providers.

{{< alert icon="tip" >}}**Looking for Lotus?**
Lotus documentation has moved to [lotus.filecoin.io](https://lotus.filecoin.io)
{{< /alert >}}

## Get started

Users can use the following software solutions to store data on the Filecoin network:

### Apps

The following applications allow you to store data on the Filecoin network with no technical setup:

- [ChainSafe Files](https://files.chainsafe.io/) provides decentralized cloud storage with end-to-end encryption in a Dropbox-like interface. Check out the [blog post by ChainSafe](https://medium.com/chainsafe-systems/introducing-chainsafe-files-3eedabdec922) for a quick overview of the service.
- [Estuary](https://estuary.tech) allows uploading and storing content on the Filecoin network directly from your browser, command line, and API.
- [Space Storage](https://space.storage/) by Fleek is an open-source, user-controlled, encrypted file storage and sharing platform using IPFS and Filecoin, tied to Ethereum accounts or common web OAuth options.
- [Web3.Storage](https://web3.storage) is an IPFS pinning service and Filecoin storage platform built-in-one. Upload files to Web3.Storage and access them instantly, safe in the knowledge that your data is securely backed up using the Filecoin network.

### Filecoin Node Client

- [Lotus](https://lotus.filecoin.io) imports data and performs deals on the chain using its daemon and CLI. Lotus users get full control of the deals, the chosen providers, and the wallets used to pay. Make sure you are familiar with Lotus and have it installed and running.

### Digital Preservation

- [Starling]({{< relref "starling.md" >}}) uses Lotus to simplify decentralized storage for digital _preservationists_ and archivists.

### Video

- [File.video](https://file.video/) provides decentralized video hosting using decentralized transcoding using the [LivePeer](https://livepeer.org/) network.

## Additional resources

There are additional storage solutions that you should not miss. While they have a focus on developers, some of them have simple CLI interfaces that simplify their usage:

- [Fleek](https://fleek.co) provides easy hosting and storage solutions on IPFS and their [SpaceDaemon](https://docs.fleek.co/space-daemon/overview/) and upcoming Space SDK use Filecoin.
- [Pinata](https://pinata.cloud/) is an IPFS pinning service that will soon include Filecoin in its portfolio.
- [Powergate](https://github.com/textileio/powergate) a multitiered storage solution that stores data with [IPFS and Filecoin]({{< relref "about-filecoin/ipfs-and-filecoin" >}}). It can be used [self-hosted]({{< relref "/build/powergate" >}}).
- [Textile Buckets]({{< relref "/build/textile-buckets" >}}) provide S3-like storage using IPFS with Filecoin-backed archival and has an easy-to-use CLI.
