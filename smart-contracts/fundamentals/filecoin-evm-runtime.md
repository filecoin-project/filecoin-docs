---
description: >-
  This page details what exactly EVM compatibility means for the FVM, and any
  other information that Ethereum developers may need to build applications on
  Filecoin.
---

# Filecoin EVM runtime

The Ethereum Virtual Machine is an execution environment initially designed, built for, and run on the Ethereum blockchain. The EVM was revolutionary because, for the first time, any arbitrary code could be deployed to and run on a blockchain. This code inherited all the decentralized properties of the Ethereum blockchain. Before the EVM, a new blockchain had to be created with custom logic and then bootstrapped with validators every time a new type of decentralized application needed to be built.

Code deployed to EVM is typically written in the high-level language Solidity, although other languages, such as Vyper, exist. The high-level Solidity code is compiled to EVM bytecode which is what is actually deployed to and run on the EVM. Due to it being the first virtual machine to run on top of a blockchain, the EVM has developed one of the strongest developer ecosystems in Web3 to date. Today, many different blockchains run their own instance of the EVM to allow developers to easily port their existing applications into the new blockchain’s ecosystem.

## Ethereum Virtual Machine

The Filecoin EVM, often just referred to as _FEVM_, is the Ethereum virtual machine virtualized as a runtime on top of the Filecoin virtual machine. It allows developers to port any existing EVM-based smart contracts straight onto the FVM. The Filecoin EVM runtime is completely compatible with any EVM development tools, such as Hardhat, Brownie, and MetaMask, making deploying and interacting with EVM-based actors easy! This is because Filecoin nodes offer the Ethereum JSON-RPC API.

## Deep dive

For a deeper dive into the concepts discussed on this page, see this presentation Ethereum compatibility of FVM, see:

{% embed url="https://www.youtube.com/watch?v=lgUMVhM3FIM" %}



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/smart-contracts/fundamentals/filecoin-evm-runtime)
