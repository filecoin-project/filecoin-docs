---
title: "Filecoin EVM"
description: "The Filecoin EVM (FEVM) is the Ethereum Virtual Machine (EVM) virtualized as a runtime on top of the Filecoin Virtual Machine (FVM)."
lead: "The Filecoin EVM (FEVM) is the Ethereum Virtual Machine (EVM) virtualized as a runtime on top of the Filecoin Virtual Machine (FVM). Before understanding the FEVM you must be familiar with the regular EVM."
draft: false
images: []
type: docs
weight: 30
menu:
  build:
    parent: "build-concepts"
    identifier: "filecoin-evm-1308h1ufshnorsiu"
toc: true
aliases:
    "/fvm/concepts/filecoin-evm/"
---

{{< beta-warning >}}

The Ethereum Virtual Machine is an execution environment initially designed, built for, and run on the Ethereum blockchain. The EVM was revolutionary because, for the first time, any arbitrary code could be deployed to and run on a blockchain. This code inherited all the decentralized properties of the Ethereum blockchain. Before the EVM, a new blockchain had to be created with custom logic and then bootstrapped with validators every time a new type of decentralized application needed to be built.

Code deployed to EVM is typically written in the high-level language Solidity, although other languages, such as Vyper, exist. The high-level Solidity code is compiled to EVM bytecode which is what is actually deployed to and run on the EVM. Due to it being the first virtual machine to run on top of a blockchain, the EVM has developed one of the strongest developer ecosystems in Web3 to date. Today, many different blockchains run their own instance of the EVM to allow developers to easily port their existing applications into the new blockchain's ecosystem.

## Ethereum Virtual Machine

The Filecoin EVM (FEVM) is the Ethereum Virtual Machine virtualized as a runtime on top of the Filecoin Virtual Machine. It will allow developers to port any existing EVM-based smart contracts straight onto the FVM (where we call them actors). FEVM is also completely compatible with any EVM development tools, such as Hardhat, Brownie, and Metamask, making deploying and interacting with EVM-based actors easy! This is because Filecoin nodes offer the Ethereum JSON-RPC API.

FEVM is Milestone 2.1 on the FVM roadmap and will actually be ready before native WASM actors are able to be deployed to the FVM. This is to allow existing smart contract developers, which are largely used to the EVM ecosystem and writing code in Solidity, to quickly begin porting their existing applications and writing new applications on top of the FVM.

## FEVM and native FVM

Once Milestone 2.2 of the FVM roadmap is complete, developers will have the option to deploy actors on either the FEVM or native FVM (or both if they really want to). But which should you choose? The decision can be summed up as such: if you want better performance, write actors that are compiled to WASM and deployed to native FVM. If you are familiar with Solidity and want access to the EVM ecosystem of tools, but don't mind less performance, deploy to the FEVM. See the pros and cons of each below:

| &nbsp; | FVM | FEVM |
| ------ | --- | ---- |
| **Pros** | Native execution speed and performance on Filecoin (i.e., less gas cost per unit of actor code executed).<br><br>Write actors in any language that compiles to WASM 1. | Take advantage of current Solidity and EVM tooling to quickly port or write actors. |
| **Cons** | Tooling is not yet as mature as EVM tooling. | Higher gas fees and lower performance due to the virtualization overhead of the FEVM. |

In both cases, you have access to all the awesome power of the Filecoin blockchain, including storage contracts as a native primitive!

## Conclusion

The FEVM allows current Web3 developers to quickly start writing actors on the Filecoin blockchain while also using all of the tools, software packages, and languages they are used to while also having access to Filecoin storage deals as a native. It will be complete with Milestone 2.1 in the FVM roadmap. Due to the virtualization overhead of the EVM, it will not have the same performance as native actors, which will arrive with Milestone 2.2.
