---
title: "Introduction"
description: "What is the FVM? What problems does it solve? How is it related to the EVM? This page will answer all these questions, and give you a solid introduction to the Filecoin virtual machine."
lead: "The Filecoin Virtual Machine (FVM) enables developers to write and deploy code to run on top of the Filecoin blockchain. The FVM allows developers to write applications using both WASM and Ethereum compatible languages like Solidity. The Ethereum-compatibility comes from the use of the Ethereum Virtual Machine (EVM) runtime attached to the FVM."
weight: 10
menu:
    fvm:
        parent: "fvm-basics"
---

## Filecoin EVM

The Filecoin EVM (FEVM) is the Ethereum Virtual Machine (EVM) virtualized as a runtime on top of the Filecoin Virtual Machine. Before understanding the FEVM you must be familiar with the regular EVM.

The Ethereum Virtual Machine is an execution environment initially designed, built for, and run on the Ethereum blockchain. The EVM was revolutionary, because for the first time, any arbitrary code could be deployed to and run on a blockchain. This code inherited all the decentralized properties of the Ethereum blockchain. Before the EVM a new blockchain had to be created with custom logic and then bootstrapped with validators every time a new type of decentralized application needed to be built.

Code deployed to EVM is typically written in the high level language Solidity, although other languages such as Vyper exist. The high level Solidity code is compiled to EVM bytecode which is what is actually deployed to and run on the EVM. Due to it being the first virtual machine to run on top of a blockchain, the EVM has developed one of the strongest developer ecosystems in Web3 to date. Today, many different blockchains run their own instance of the EVM to allow developers to easily port their existing applications into the new blockchain’s ecosystem.

## Use-cases

Developers will be able to analyze, process, and manage data stored on the Filecoin network without having to download that data first! Everything can be dealt with on the blockchain! This feature opens up a huge array of opportunities for the network:

- Users can perpetually store data by crowdsourcing the funds for storage contracts.
- Developers can create Data DAOs to incentivize the storage and retrieval of specific data sets.
- Researchers can manage extra-large data sets without the hardware costs web2 processes require.
- Storage contracts can be replicated and renewed automatically.
- Other blockchains can directly access data stored on the Filecoin network.
