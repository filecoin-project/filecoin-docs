---
title: "Ethereum compatibility"
description: "The Filecoin Virtual Machine (FVM) contains an Ethereum Virtual Machine (EVM) runtime, allowing Ethereum and Solidity developers to run their contracts on the FVM with little to no modifications. This page details what exactly this EVM compatibility means, and any other information that Ethereum developers may need to build applications on the FVM."
lead: "The FVM contains an Ethereum Virtual Machine (EVM) runtime, allowing Ethereum and Solidity developers to run their contracts on the FVM with little to no modifications. This page details what exactly this EVM compatibility means, and any other information that Ethereum developers may need to build applications on the FVM."
draft: false
images: []
type: docs
weight: 60
menu:
  build:
    parent: "build-concepts"
    identifier: "etherum-compatibility-1oiubyi2ubtgorsbu"
toc: true
---

{{< beta-warning >}}

In the context of Filecoin and the Filecoin Virtual Machine (FVM), the term _EVM compatibility_ means that, as of the [v18 Hygge network upgrade (scheduled for Mar 2023)](https://github.com/filecoin-project/community/discussions/74?sort=new#discussioncomment-4313888):

- EVM runtime compiles to WASM, which allows the FVM to emulate EVM bytecode and support EVM as a foreign runtime.
- The new F4 addressing class allows an imported EVM to be addressed in the Filecoin network via it's Ethereum address.
- Familiar EVM tooling, like MetaMask, Hardhart, Remix and more, can interact with Lotus nodes via the Ethereum JSON-RPC API.
- An imported EVM can interact with the FVM, providing access to Filecoin-specific features, like built-in actors.

So, for developers, _EVM compatibility_ means that their existing Solidity or Yul smart contracts (with support for other EVM-compatible languages planned in later upgrades) can be ported into an EVM virtualized as a runtime on top of the Filecoin Virtual Machine, called the _Filecoin Ethereum Virtual Machine (FEVM)_. Through the FEVM, developers can create, test and deploy smart contracts using languages, concepts and tools that they are already familiar with, and enjoy the rich functionality of the Filecoin network at the same time. 

However, there are a number of tradeoffs that should be considered when choosing whether to deploy a smart contract onto the FEVM or the FVM:

- Due to the virtualization overhead, contracts on the FEVM have higher gas fees and lower performance than FVM_native contracts.
- FVM-specific tooling is not yet as mature as Ethereum-native tooling.

For a deeper dive into the concepts discussed on this page, see this presentation by [@truckerfling]('https://twitter.com/truckerfling') on Ethereum compatibility of FVM:

{{< youtube "lgUMVhM3FIM" >}}
