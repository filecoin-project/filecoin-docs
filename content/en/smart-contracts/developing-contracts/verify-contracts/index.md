---
title: "Verify a contract"
description: "Before deploying a contract to Mainnet, we recommend that you verify your contract. This page lists various Filecoin Ethereum Virtual Machine (FEVM) explorers with verification tools, and provides a tutorial on how to verify a contract using Filfox."
lead: "Before deploying a contract to Mainnet, we recommend that you verify your contract. This page lists various Filecoin Ethereum Virtual Machine (FEVM) explorers with verification tools, and provides a tutorial on how to verify a contract using Filfox."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-developing-contracts"
    identifier: "verify-contracts-cff1cc77a90c8bea84857e1139981325"
weight: 495
toc: true
aliases:
    - "/developers/infrastructure/libraries/"
---

## Verification tools

The following FEVM-compatible chain explorers offer contract verification tools. For more information, click the appropriate link below.

- [Filfox](https://filfox.info/en/contract)
- [Starboard](https://fvm.starboard.ventures/explorer/verifier) 
- [Beryx](https://beryx.zondax.ch/contract_verifier)

## Verification tutorial with Filfox

The following guide walks you through the process of contract verification using the [Filfox](https://filfox.info/en/contract) explorer.

### Prerequisites

- A smart contract (`.sol` file)
- [Remix](https://remix.ethereum.org/)
- Access to one of the [verification tools](#verification-tools)

### Procedure

1. Open Remix.

1. In the **File Explorer** sidebar tab, under **contracts**, right click on the contract you want to verify.

1. From the menu, select **generate UML** to flatten the `<contract-name>.sol` file and ensure that all components and tasks are included. 

    A new contract with the name `<contract-name>_flattened.sol` is generated below your original contract.

1. Ensure that the license and Solidity version in the flattened contract is the same as in your original contract.

1. Click **Save**.

1. Right click on `<contract-name>_flattened.sol`.

1. In the menu, click **Download** to save the file. 

1. Note the following information, as you will need it later:

    - The address of your deployed contract

    - The contract license type (if any)

    - The Solidity compiler version


1. Navigate to [Filfox](https://filfox.info/en/contract).

1. In the form, enter the information noted previously for the deployed contract you would like to verify:

    - The address 

    - The license type

    - The compiler version

1. Click **Continue**.

1. Click **Select *.sol files**.

1. Select your flattened `.sol` file.

1. Click **Verify and Publish**.

   Success! Your contract is now verified. 

1. To view your verified contract:

    1. Enter the address of the contract in the [Filfox search bar](https://filfox.info/).

    1. Scroll down the contract page and select the **Contract** tab.

       A **Contract Source Code Verified** banner is displayed, along with contract information and source code. You can also [view other verified contracts on Filfox](https://filfox.info/en/stats/verified-contracts).
