---
title: "What is Filecoin"
description: "Explore Filecoin, a peer-to-peer network that stores files, with built-in economic incentives to ensure files are stored reliably over time."
menu:
    about:
        parent: "about-filecoin-basics"
weight: 1
aliases:
    - /about-filecoin
---

Filecoin is a peer-to-peer network that stores files, with built-in economic incentives to ensure files are stored reliably over time.

In Filecoin, users pay to store their files on storage providers. Storage providers are computers responsible for storing files and proving they have stored the files correctly over time. Anyone who wants to store their files or get paid for storing other users’ files can join Filecoin. Available storage, and the price of that storage, is not controlled by any single company. Instead, Filecoin facilitates open markets for storing and retrieving files that anyone can participate in.

Filecoin includes a blockchain and native cryptocurrency (FIL). Storage providers earn units of FIL for storing files. Filecoin’s blockchain records transactions to send and receive FIL, along with proofs from storage providers that they are storing their files correctly.

![Diagram showing a four-step process for storing files with Filecoin. First step: User who wants to store a file pays storage provider to store their file. Second step: Miner commits publicly via Filecoin’s blockchain to storing the file. Third step: The network constantly verifies that storage providers are storing files correctly. Fourth step: User pays storage provider to retrieve their file.](what-is-filecoin-diagram.png)

## For users

Filecoin enables users to store their files at hypercompetitive prices and verify that their files are being stored correctly.

Users can choose their preferred trade-off between cost, redundancy, and speed by selecting the storage provider whose storage offer is best suited for their needs. Applications that implement Filecoin can negotiate storage with any storage provider on the network. Unlike centralized storage systems, there is no need to implement a different API for each provider.

At any time, users can verify that their files are being stored correctly by looking at proofs on Filecoin’s blockchain.

{{< alert icon="tip" >}}
[Learn about storage verification at ProtoSchool](https://proto.school/#/verifying-storage-on-filecoin)
{{< /alert >}}

## For storage providers

Filecoin enables storage providers to sell their storage on an open market.

Storage providers are people and organizations that run storage providers, earning Filecoin tokens for doing so. A storage provider could be any internet-connected computer with spare disk space or a dedicated system with lots of storage built specifically for Filecoin. Filecoin’s blockchain rewards storage providers for contributing useful storage to the internet, not for completing wasteful proof-of-work computations.

Once a storage provider implements the Filecoin protocol, they gain access to the entire market of Filecoin users. Providers don’t need to design their own storage API or advertise their offering themselves as this is handled by Filecoin’s protocol and network. Filecoin enables a thriving, decentralized ecosystem of independent storage providers by removing barriers to entry.

See [How providing storage works]({{< relref "how-providing-works" >}}).

## New to web3

If you are new to Filecoin or to the web3 space, welcome! We think you will enjoy getting to learn about some of the core concepts that make [IPFS](https://ipfs.io), [Filecoin](https://filecoin.io), [Powergate](https://github.com/textileio/powergate), and other technologies possible as well as how to use them in your projects and applications.

Web3 is a movement within software development that is turning centralized applications into _decentralized_ protocols. Instead of having a single point of control, applications built on web3 architecture can remove the _middle-man,_ reducing the risk of censorship by big corporations and services vulnerability to denial-of-service attacks. Web3 is a _trustless_ infrastructure that allows users to have ownership and reclaim control over their data.

Web3 is essentially what allows Filecoin to exist by allowing files to be shared between peers.

You can find out more about it in [IPFS and Filecoin section]({{< relref "ipfs-and-filecoin" >}}).

## Vision

- [Long-term Information Structure](http://longnow.org/seminars/02018/aug/06/long-term-info-structure/)
- [What exactly is web3?](https://youtu.be/l44z35vabvA)
- [The next Internet Revolution](https://youtu.be/2RCwZDRwk48)
- [Protocol Labs: Creating New Networks](https://protocol.ai/blog/protocol-labs-creating-new-networks/)
- [a16z Podcast: Getting Applications into People's Hands](https://a16z.com/2017/09/14/networks-protocols-labs-tokens/)
