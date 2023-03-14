---
title: "FVM native"
description: "FVM native refers to user-defined native actors, written specifically for the FVM runtime. This is separate from FVM built-in native actors, which refer to built-in actors on the Filecoin network."
lead: "FVM native refers to user-defined native actors, written specifically for the FVM runtime. This is separate from FVM built-in native actors, which refer to built-in actors on the Filecoin network."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-fundamentals"
    identifier: "fvm-native-15fc137eb28d8a027268b96272cbe9fd"
weight: 130
toc: true
---

Users have the ability to write native user-defined actors in any programming language that compiles to Wasm. However, language-specific overheads (e.g. runtime, garbage collection, stdlibs, etc.) may lead to oversized Wasm bytecode and execution overheads, translating to higher gas costs. This is exemplified by the current FVM user-defined foreign runtime actors, in the Filecoin EVM.

## Mainnet

FVM native is not yet available on the Filecoin mainnet but can be used in a local dev net ([setup guide here](https://lotus.filecoin.io/lotus/developers/local-network/). For development with native actors, Rust is the recommended language for optimal performance. There are currently [Rust](https://github.com/polyphene/fvm-rs-sdk), [AssemblyScript](https://docs.zondax.ch/filecoin-virtual-machine/fvm-as-sdk) and [TinyGo](https://github.com/ipfs-force-community/go-fvm-sdk) SDKs available for native actor development. Exploration of other languages is something we encourage the community to pursue.

## SDKs

[FVM AssemblyScript SDK by Zondax](https://github.com/Zondax/fvm-as-sdk): This SDK compiles a variant of TypeScript (a typed superset of JavaScript) to WebAssembly using Binaryen to give developers low-level control over their code.

[FVM TinyGo SDK by Venus (IPFSForce)](https://www.notion.so/Filecoin-Virtual-Machine-FVM-Developer-Resources-94cabfd650184f4b9664bd4974e4d329): This SDK helps developers build actors for the FVM in TinyGo. It provides developers with tooling to build actors while exposing useful structures and needed functions.

[FVM High-level Rust SDK](https://github.com/polyphene/fvm-rs-sdk) by Polyphene: This SDK helps developers build actors for the FVM in Rust. It provides developers with tooling to build actors while exposing useful structures and needed functions. It also serves procedural macros to generate glue code for state management and actor's interface definition.
