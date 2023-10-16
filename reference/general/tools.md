---
description: >-
  This page lists a collection of tools and resources you can use to build on top
  of the Filecoin network using the FVM.
---

# Tools

### Infrastructure libraries

These infrastructure libraries and tools exist to speed up the development of software on top of the Filecoin network.

#### Filecoin signing tools

The [Filecoin signing tools](../general/README.md) provide basic functionality for signing Filecoin transactions in pure JavaScript, WASM and Rust. Currently, the Rust and WASM implementations support:

* Secp256k1
* BLS
* CBOR-JSON serialization of transactions

Support for multisignature transaction signing is currently in progress, and the pure JavaScript implementation is less complete than the Rust and WASM implementations.

#### Filecoin addresses

The _filecoin-address_ library is a JavaScript implementation of the Filecoin address type, and can create new address instances, encode addresses, and decode and validate checksums. For further information, including how to install and use, see the [GitHub repository](https://github.com/glifio/modules/tree/primary/packages/filecoin-address).

### Built-in Native Actors

These are some tools that developers will find useful when dealing with built-in actors.

* [WASM Actors Repo](https://github.com/filecoin-project/builtin-actors)
* [FVM Example Actors](https://github.com/filecoin-project/fvm-example-actors)
* [FVM AssemblyScript SDK](https://github.com/Zondax/fvm-as-sdk) by Zondax
* [FVM TinyGo SDK](https://www.notion.so/Filecoin-Virtual-Machine-FVM-Developer-Resources-94cabfd650184f4b9664bd4974e4d329) by Venus (IPFSForce)
* [FVM High-level Rust SDK](https://github.com/polyphene/fvm-rs-sdk) by Polyphene
* [Tooling by Glif](https://glif.io/)

### Filecoin improvement proposals

Filecoin improvement proposals (FIPs) are a way for the Filecoin community to discuss potential changes and improvements to the Filecoin network.

* [About](https://github.com/filecoin-project/FIPs)
* [Filecoin Slack channel for FIP discussion](https://filecoinproject.slack.com/archives/C01EU76LPCJ)
* [Program Overview & Application](https://airtable.com/shr48kiPOqjwxzX6u)
* [FVM Foundry Cohort Update Recordings](https://www.youtube.com/playlist?list=PL\_0VrY55uV18DBdFIkN0jdBMF8nadVxWQ)
* [FVM Foundry Early Builders F/0 Cohort Showcase - Oct 3 2022](https://drive.google.com/file/d/1JLR45vSNScZX7edz9DxwlpYGnVfGm30Q/view?usp=sharing)
* [FVM Foundry Early Builders F/1 Cohort Kick Off - Oct 5 2022](https://drive.google.com/file/d/1mV0PMunDUvIBqmuNw9VjUJIf4zE4z9LV/view?usp=sharing)
