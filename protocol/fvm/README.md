---
description: >-
  The Filecoin Virtual Machine (FVM) runs smart contracts that can use Filecoin
  storage. What it is, what runs on it and where to start building.
---

# Filecoin Virtual Machine

**The Filecoin Virtual Machine (FVM) is the runtime that executes code on the Filecoin chain. It lets smart contracts read and act on Filecoin's own storage features, such as storage deals, storage providers and FIL, alongside ordinary contract logic.**

## What the FVM is

Filecoin's storage and retrieval are the base layer of the chain. The FVM sits on top and adds programmability. It is a WebAssembly (WASM) runtime that executes _actors_, which are the chain's units of code and state. See [Actors](../concepts/actors.md).

Two kinds of actors run on it:

* **Built-in actors** are the network's own code, such as the Market, Miner and Power actors. They run the storage market, storage proving and consensus.
* **Smart contracts** are the actors you write. In practice you write them in Solidity, or any language that compiles to EVM bytecode, and deploy them to the [Filecoin EVM runtime](filecoin-evm-runtime.md).

Because contracts run on the same chain as the storage market, they can call the built-in actors. A contract can check a deal, pay a storage provider, or read a provider's power, then act on the result. See [Filecoin.sol](filecoin.sol.md).

## What you can build

Use the FVM to build smart storage services: contracts that handle storage deals, payments and proofs for users, so that they never deal with providers directly. Filecoin Onchain Cloud (FOC) is built this way.

To build your own, start with [Build a storage service](../../guides/build-a-storage-service.md).

Any Ethereum contract can also run on Filecoin unchanged in most cases, because of the EVM runtime. See [Differences from Ethereum](filecoin-evm-runtime.md#differences-from-ethereum).

## Start building

* [ERC-20 quickstart](erc-20-quickstart.md): deploy your first contract to the [Calibration](../networks/calibration.md) testnet.
* [Filecoin EVM runtime](filecoin-evm-runtime.md): what EVM compatibility means, and where Filecoin differs.
* [Gas](gas.md) and [Precompiles](precompiles.md): the costs and Filecoin-specific calls your contract can use.
* [Filecoin.sol](filecoin.sol.md): call built-in actors from Solidity.
* [Contract verification](contract-verification.md): publish your source code on a block explorer.
* [ref-fvm](https://github.com/filecoin-project/ref-fvm): the reference implementation of the FVM.

## Related pages

* [FVM advanced](advanced/README.md): tools and services for FVM developers.
* [Real-world assets reference architecture](cookbooks/rwa-reference-architecture.md): a reference design for tokenized real-world assets.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm)
