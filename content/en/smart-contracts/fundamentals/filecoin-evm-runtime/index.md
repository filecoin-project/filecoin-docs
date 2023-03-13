---
title: "Filecoin EVM runtime"
description: "The Filecoin Virtual Machine (FVM) contains an Ethereum Virtual Machine (EVM) runtime, allowing Ethereum and Solidity developers to run their contracts on the FVM with little to no modifications. This page details what exactly this EVM compatibility means, and any other information that Ethereum developers may need to build applications on the FVM."
lead: "The FVM contains an Ethereum Virtual Machine (EVM) runtime, allowing Ethereum and Solidity developers to run their contracts on the FVM with little to no modifications. This page details what exactly this EVM compatibility means, and any other information that Ethereum developers may need to build applications on the FVM."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-fundamentals"
    identifier: "filecoin-evm-runtime-932a1ced1a966c0e7849ec231bb47424"
weight: 140
toc: true
---

The Filecoin EVM is the Ethereum Virtual Machine (EVM) virtualized as a runtime on top of the Filecoin Virtual Machine (FVM). It allows developers to port existing Solidity smart contracts straight onto the FVM, where they are deployed and referred to as actors). This is achieved by compiling the Solidity code to EVM bytecode and deploying it as an FVM actor, to the Filecoin network.

FEVM is also completely compatible with all EVM development tools, such as Hardhat, Foundry, Metamask and more, making deploying and interacting with EVM-based actors easy.

- EVM runtime compiles to WASM, which allows the FVM to emulate EVM bytecode and support EVM as a foreign runtime.
- The new F4 addressing class allows an imported EVM to be addressed in the Filecoin network via it's Ethereum address.
- Familiar EVM tooling, like MetaMask, Hardhart, Remix and more, can interact with Lotus nodes via the Ethereum JSON-RPC API.
- An imported EVM can interact with the FVM, providing access to Filecoin-specific features, like built-in actors.

So, for developers, _EVM compatibility_ means that their existing Solidity smart contracts (with support for other EVM-compatible languages planned in later upgrades) can be ported into an EVM virtualized as a runtime on top of the Filecoin Virtual Machine, called the _Filecoin Ethereum Virtual Machine (FEVM)_. Through the FEVM, developers can create, test and deploy smart contracts using languages, concepts and tools that they are already familiar with, and enjoy the rich functionality of the Filecoin network at the same time.

## Contraints

However, there are a number of tradeoffs that should be considered when choosing whether to deploy a smart contract onto the FEVM or the FVM:

- Due to the virtualization overhead, contracts on the FEVM have higher gas fees and lower performance than FVM native contracts.
- FVM-specific tooling is not yet as mature as Ethereum-native tooling.

For a deeper dive into the concepts discussed on this page, see this presentation by [@truckerfling]('https://twitter.com/truckerfling') on Ethereum compatibility of FVM:

{{< youtube "lgUMVhM3FIM" >}}
