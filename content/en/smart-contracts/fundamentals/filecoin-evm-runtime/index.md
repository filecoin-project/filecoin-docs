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
aliases:
    - "/developers/smart-contracts/concepts/filecoin-evm/"
---

The Ethereum Virtual Machine is an execution environment initially designed, built for, and run on the Ethereum blockchain. The EVM was revolutionary because, for the first time, any arbitrary code could be deployed to and run on a blockchain. This code inherited all the decentralized properties of the Ethereum blockchain. Before the EVM, a new blockchain had to be created with custom logic and then bootstrapped with validators every time a new type of decentralized application needed to be built.

Code deployed to EVM is typically written in the high-level language Solidity, although other languages, such as Vyper, exist. The high-level Solidity code is compiled to EVM bytecode which is what is actually deployed to and run on the EVM. Due to it being the first virtual machine to run on top of a blockchain, the EVM has developed one of the strongest developer ecosystems in Web3 to date. Today, many different blockchains run their own instance of the EVM to allow developers to easily port their existing applications into the new blockchain's ecosystem.

## Ethereum Virtual Machine

The Filecoin EVM, often just refered to as _FEVM_, is the Ethereum virtual machine virtualized as a runtime on top of the Filecoin virtual machine. It allows developers to port any existing EVM-based smart contracts straight onto the FVM. The Filecoin EVM runtime is completely compatible with any EVM development tools, such as Hardhat, Brownie, and Metamask, making deploying and interacting with EVM-based actors easy! This is because Filecoin nodes offer the Ethereum JSON-RPC API.

## FEVM and native FVM

Once [Milestone 2.2 of the FVM roadmap]({{< relref "roadmap" >}}) is complete, developers will have the option to deploy actors on either the FEVM or native FVM, or both if they really want to. But which should you choose? The decision can be summed up as such: if you want better performance, write actors that are compiled to WASM and deployed to native FVM. If you are familiar with Solidity and want access to the EVM ecosystem of tools, but don't mind less performance, deploy to the FEVM. See the pros and cons of each below:

| &nbsp; | FVM | FEVM |
| ------ | --- | ---- |
| **Pros** | Native execution speed and performance on Filecoin (i.e., less gas cost per unit of actor code executed).<br><br>Write actors in any language that compiles to WASM 1. | Take advantage of current Solidity and EVM tooling to quickly port or write actors. |
| **Cons** | Tooling is not yet as mature as EVM tooling. | Higher gas fees and lower performance due to the virtualization overhead of the FEVM. |

In both cases, you have access to all the awesome power of the Filecoin blockchain, including storage contracts as a native primitive!

## Deep dive

For a deeper dive into the concepts discussed on this page, see this presentation by [@truckerfling]('https://twitter.com/truckerfling') on Ethereum compatibility of FVM:

{{< youtube "lgUMVhM3FIM" >}}
