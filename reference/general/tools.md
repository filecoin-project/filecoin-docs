---
description: >-
  This page lists a collection of tools and resources you can use to build on
  top of the Filecoin network using the FVM.
---

# Tools

### Infrastructure libraries

These infrastructure libraries and tools exist to speed up the development of software on top of the Filecoin network.

#### Filecoin Javascript Standard Library

> Connect apps to the Filecoin blockchain with iso-filecoin.

##### Features

- Lightweight, performant and type-safe
- Support for RPC, Signature, Address, Token, Chain, Wallet and more.
- React hooks and context to easily integrate Filecoin wallets
- Wallet adapters for Ledger Filecoin App, MetaMask Filecoin Wallet, and more.

##### Packages

- [iso-filecoin](https://github.com/hugomrdias/filecoin/tree/main/packages/iso-filecoin) - Core package
- [iso-filecoin-react](https://github.com/hugomrdias/filecoin/tree/main/packages/iso-filecoin-react) - React hooks and context
- [iso-filecoin-wallets](https://github.com/hugomrdias/filecoin/tree/main/packages/iso-filecoin-wallets) - Wallet adapters

##### Resources

- [Documentation](https://filecoin.hugomrdias.dev/)

#### ⨎ Filsnap

> A MetaMask [Snap](https://snaps.metamask.io/snap/npm/filsnap/) to add Filecoin support to the MetaMask extension.

##### Features

- Enables dapps access to Filecoin accounts using Metamask.
- Manage Filecoin accounts, check balance, address, export private key and more.
- Send and receive FIL from native and FEVM addresses.
- Sign Filecoin messages and arbitrary data.
- Send Filecoin messages and estimate gas fees.
- Filecoin insights for FEVM transaction/signature requests.

##### Resources

- [Companion App](https://filsnap.dev/)
- [Documentation](https://filecoin-project.github.io/filsnap/)

##### Packages

- [filsnap](https://github.com/filecoin-project/filsnap/tree/master/packages/snap) - Filecoin snap for Metamask
- [filsnap-adapter](https://github.com/filecoin-project/filsnap/tree/master/packages/adapter) - Adapter to interact with Filsnap from a dapp
- [filsnap-adapter-react](https://github.com/filecoin-project/filsnap/tree/master/packages/adapter-react) - React hooks to interact with Filsnap from a dapp

#### Filecoin addresses

The _filecoin-address_ library is a JavaScript implementation of the Filecoin address type, and can create new address instances, encode addresses, and decode and validate checksums. For further information, including how to install and use, see the [GitHub repository](https://github.com/glifio/modules/tree/primary/packages/filecoin-address).

### Built-in Native Actors

These are some tools that developers will find useful when dealing with built-in actors.

* [WASM Actors Repo](https://github.com/filecoin-project/builtin-actors)
* [FVM Example Actors](https://github.com/filecoin-project/fvm-example-actors)
* [FVM AssemblyScript SDK](https://github.com/Zondax/fvm-as-sdk) by Zondax
* [FVM TinyGo SDK](https://www.notion.so/Filecoin-Virtual-Machine-FVM-Developer-Resources-94cabfd650184f4b9664bd4974e4d329) by Venus (IPFSForce)
* [FVM High-level Rust SDK](https://github.com/polyphene/fvm-rs-sdk) by Polyphene
* [Tooling by Glif](https://glif.io/en)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/reference/general/tools)
