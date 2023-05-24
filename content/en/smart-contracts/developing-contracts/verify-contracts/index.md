---
title: "Verify a contract"
description: "External Solidity libraries can help developers create their applications quicker by offloading some of the work to already existing smart contracts."
lead: "External Solidity libraries can help developers create their applications quicker by offloading some of the work to already existing smart contracts."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-developing-contracts"
    identifier: "verify-contracts-cff1cc77a90c8bea84857e1139981325"
weight: 460
toc: true
aliases:
    - "/developers/infrastructure/libraries/"
---

## Verify your contract
If you are deploying your FEVM contract to mainnet, we highly recommend verifying your contract, to upkeep security and transparency on the network.
There are a few FEVM-supported explorers that allow you to do this today:


## Using Filfox

### Prerequisites

- Remix
- Access to one of the following contract verification tools.
    - [Filfox](https://filfox.info/en/contract)
    - [Starboard](https://fvm.starboard.ventures/explorer/verifier) 
    - [Beryx](https://beryx.zondax.ch/contract_verifier)

### Procedure

First

1. Open Remix.

1. In the **File Explorer** sidebar tab, under **contracts**, right click on your contract.

1. From the menu, select **generate UM** to flatten `<contract-name>.sol` file and ensure all components and tasks are included. 

    A new contract with the name `<contract-name>_flattened.sol` is generated below your original contract.

1. Ensure that the license and Solidity version in the flattened contract is the same as in your original contract.

1. Click **Save**.

1. Right click on `<contract-name>_flattened.sol`.

1. In the menu, click **Download** to save the file. 

1. Copy the address of your deployed contract. 

1. Navigate to [Filfox](https://filfox.info/en/contract) as an example.

1. In the form, enter the following information:
   - The address of your deployed contract.
   - The compiler version used in 
   - The license type used in

1. Click **Continue** to upload your flattened .sol file. 

1. Click **Verify and Publish**.

   Success! Your contract is now verified.

1. In Filfox's search bar, enter your contract address.

1. Select the **Contract** tab to you can view your contract's source code and ABI.

> You may also view other verified contracts' source code and ABI by heading back to Filfox contract verification page and clicking on 'Verified Contract List'. You can click into contract addresses and follow the steps above, in this section.
