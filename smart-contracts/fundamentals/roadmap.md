---
description: >-
  The FVM project has come a long way in an incredibly short amount of time.
  This is the roadmap for FVM features for the Filecoin network.
---

# Roadmap

## Goal

The goal of the FVM project is to add general programmability to the Filecoin blockchain. Doing so will give developers all kinds of creative options, including:

* Orchestrating storage.
* Creating L2 networks on top of the Filecoin blockchain.
* Providing new incentive structures for providers and users.
* Frequently verifying that providers are storing data correctly.
* Automatically finding which storage providers are storing what data.
* Many more data-based applications.

Filecoin was the first network deploying programmability, post-genesis, to ensure that layer 0 of the Filecoin blockchain was stable and fully functional. Due to the large amounts of capital already secured within the Filecoin network, the development of the FVM needs to be careful and gradual.

## Roadmap

The FVM roadmap is split into three initiatives:

* Milestone 1: Initialize the project and allow built-in actors to run on the FVM.
* Milestone 2: Enable the deployment of Ethereum virtual machine (EVM) compatible smart contracts onto the FVM. Also, allow developers to create and deploy their own native actors to the FVM.
* Milestone 3: Continue to enhance programmability on FVM.

### ✅ Milestone 0

**✅ Lotus mainnet canaries with FVM support**

_Completed in February 2022_

The reference FVM implementation has been integrated into a fork of Lotus (the Filecoin reference client). A fleet of canary nodes have been launched on mainnet, running WASM-compiled built-in actors on the FVM. The canaries are monitored for consensus faults and to gather telemetry. This milestone is a testing milestone that’s critical to collect raw execution data to feed into the overhaul of the gas model, in preparation for user-programmability. It implies no network upgrade.

### ✅ Milestone 0.5

**✅ Ability to run FVM node and sync mainnet**

_Completed in March 2022_

Any node operator can sync the Filecoin Mainnet using the FVM and Rust built-in actors, integrated in Lotus, Venus, Forest, and Fuhon implementations. It implies no network upgrade.

### ✅ Milestone 1

**✅ Introduction of non-programmable WASM-based FVM**

_Completed in May 2022_

Mainnet will atomically switch from the current legacy virtual machines to the WASM-based reference FVM. A new gas model will be activated that accounts for actual WASM execution costs. Only Rust built-in actors will be supported at this time. This milestone requires a network upgrade.

**✅ Network Version 17 (nv17): Initial protocol refactors for programmability**

_Completed in November 2022_

An initial set of protocol refactors targeting built-in actors, including the ability to introduce new storage markets via user-defined smart contracts.

### ✅ Milestone 2.1

**✅ Ability to deploy EVM contracts to mainnet (FEVM)**

_Completed in March 2023_

The Filecoin network will become user-programmable for the first time. Developers will be able to deploy smart contracts written in Solidity or Yul, and compiled to EVM. Smart contracts will be able to access Filecoin functionality by invoking built-in actors. Existing Ethereum tooling will be compatible with Filecoin. This milestone requires a network upgrade.

**✅ Hyperspace testnet goes live**

_Completed on January 16th 2023_

A new stable developer testnet called Hyperspace will be launched as the pre-production testnet. The community is invited to participate in heavy functional, technical, and security testing. Incentives and bounties will be available for developers and security researchers.

**✅ FEVM goes live on mainnet**

_Completed on March 14th 2023_

The Filecoin EVM runtime is deployed on Filecoin mainnet via the [Filecoin nv18 Hygge upgrade](https://github.com/filecoin-project/community/discussions/74?sort=new#discussioncomment-4313888).

### 🔄 Milestone 2.2

**🔄 Ability to deploy Wasm actors to mainnet**

_To complete midway through 2023_

Developers will be able to deploy custom smart contracts written in Rust, AssemblyScript, or Go, and compiled to WASM bytecode. SDKs, tutorials, and other developer materials will be generally available. This milestone requires a network upgrade.

### 🔮 Milestone 3+

**🔮 Further incremental protocol refactors to enhance programmability**

_To complete in 2023_

A series of additional incremental protocol upgrades (besides nv17) to move system functionality from privileged space to user space. The result will be a lighter and less opinionated base Filecoin protocol, where storage markets, deal-making, incentives, etc. are extensible, modular, and highly customizable through user-deployed actors. Enhanced programming features such as user-provided cron, asynchronous call patterns, and more will start to be developed at this stage.
