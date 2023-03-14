---
title: "Libraries"
description: "Libraries, software development kits (SDKs), API clients and tools exist to speed up the development of software on top of the Filecoin network. The available assets are listed on this page."
lead: "Libraries, software development kits (SDKs), API clients and tools exist to speed up the development of software on top of the Filecoin network. The available assets are listed on this page."
draft: false
images: []
type: docs
menu:
  developers:
    identifier: "libraries-c53694e3311ab167496470d05062d7d9"
weight: 230
toc: true
aliases:
    - "/build/tools/signing-libraries/"
---

{{< beta-warning >}}

## Filecoin.solidity

{{< alert >}}
The Filecoin Solidity project is [currently in beta](https://docs.zondax.ch/fevm/filecoin-solidity#disclaimer-%EF%B8%8F%EF%B8%8F).
{{< /alert >}}

_Filecoin.solidity_ is a set of libraries that allows Solidity smart contracts to seamlessly call built-in actors methods. **Not all built-in actors and methods are supported - for a complete list, see the [actors and methods supported](https://docs.zondax.ch/fevm/filecoin-solidity/api/#actors-and-methods-supported). For further information, including information on how to use the package, see the [official documentation](https://docs.zondax.ch/fevm/filecoin-solidity/) and the [GitHub repository](https://github.com/Zondax/filecoin-solidity).

## Filecoin signing tools

The [Filecoin signing tools](https://github.com/Zondax/filecoin-signing-tools) provide basic functionality for signing Filecoin transactions in pure JavaScript, WASM and Rust. Currently, the Rust and WASM implementations support:

- Secp256k1
- BLS
- CBOR-JSON serialization of transactions

Support for multisignature transaction signing is currently in progress, and the pure JavaScript implementation is less complete than the Rust and WASM implementations. Learn more in the [official documentation](https://docs.zondax.ch/filecoin-signing-tools/).

## filecoin-address

The _filecoin-address_ library is a JavaScript implementation of the Filecoin address type, and can create new address instances, encode addresses, and decode and validate checksums. For further information, including how to install and use, see the [GitHub repository](https://github.com/glifio/modules/tree/primary/packages/filecoin-address).