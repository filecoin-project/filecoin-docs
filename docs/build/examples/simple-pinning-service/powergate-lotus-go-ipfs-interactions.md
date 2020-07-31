---
title: powergate, lotus, and go-ipfs interactions
description: This article describes how powergate interacts with lotus and go-ipfs nodes in general, with links to further resources.
---

# Powergate and Its Interactions with Lotus and go-ipfs

Both Lotus and IPFS have several implementations for development in different environments, such as Go, JavaScript, Rust, etc. This tutorial focuses on the Go implementation.

- [go-ipfs](https://github.com/ipfs/go-ipfs) is a Go implementation of the [IPFS protocol](https://ipfs.io/).
- [Lotus](https://github.com/filecoin-project/lotus) is a Go implementation of the Filecoin protocol.

There are several [protocol implementations](../../core-products/protocol-implementations.md) for Lotus, including implementations in other languages such as Rust ([forest](https://github.com/chainsafe/forest) implementation) and C++ ([fuhon](https://github.com/filecoin-project/cpp-filecoin) implementation). The core Lotus node runs the blockchain system, makes storage and retrieval deals, performs data transfers, supports block producer logic, and syncs and validates the chain. Lotus also provides a separate process for storage mining. Filecoin storage miners contribute to the network by producing sector commitments and _Proofs-of-Spacetime_ to prove they have been correctly storing storage client data. You can read more about the [interactions between storage miners and storage clients](../../../introduction/what-is-filecoin).

[go-ipfs](https://github.com/ipfs/go-ipfs) is a Go implementation of the [IPFS protocol](https://ipfs.io). There are also several IPFS implementations, including [js-ipfs](https://github.com/ipfs/js-ipfs).

[Powergate](https://docs.textile.io/powergate/) is a collection of libraries, modules, and configurations that can be used independently, and composed together to integrate Filecoin into your application or storage system. While developers can use the Lotus implementation, using Powergate makes it much easier and faster to develop applications on Filecoin.

Each Powergate instance can manage multiple users. Each user has access to a Filecoin File System (FFS). Each user’s data is safe in your FFS and no one can access the user’s data without their permission.

As storing files on Filecoin network (via FFS) involves paying the storing party in FIL (filecoin currency), every user needs a wallet to safely store the FILs. Each user can create multiple wallets within their FFS.

The diagram below illustrates how Powergate manages different FFS & wallets.

![Diagram of a Powergate instance managing multiple FFS; each FFS controller by a user, and each FFS can manage multiple wallet addresses](./images/powergate.png)

Benefits of using the Powergate include (from [Textile’s documentation](https://docs.textile.io/powergate/)):

- Ensure data stored on Filecoin is available on the IPFS network easily.
- Handle long-term storage deal management, including automated renew and repair.
- Make use of network indices to improve miner selection and deal creation.
- Manage Filecoin wallet addresses for one or many users.
- Easily configure, connect, and deploy Powergate, [Lotus](https://lotu.sh/), and [IPFS](https://ipfs.io/) together.

## Resources

- [More on lotus](https://lotu.sh/)
- [More on go-ipfs](https://docs.ipfs.io)
- [More on powergate](https://docs.textile.io/powergate/)
