---
description: >-
  Step-by-step guide for verifying smart contracts on the Filecoin network
  using the Filfox explorer's web interface.
---

# Contract Verification with Filfox

The following guide walks you through the process of contract verification using the [Filfox Contract Verification](https://filfox.info/en/contract) page.

## Prerequisites

- A deployed smart contract on Filecoin mainnet or Calibration testnet
- Your contract source code, either as a flattened `.sol` file or the source files requested by the Filfox form
- The deployed contract address
- The Solidity compiler version used for deployment
- The license, optimization settings, optimizer runs, EVM version, and `viaIR` setting used for deployment
- Constructor arguments, if the contract was deployed with any and the form prompts for them

## Step-by-Step Verification Process

### Step 1: Prepare Your Contract Source Code

1. **Open Remix IDE** if you are preparing a flattened source file for upload:

![](../../.gitbook/assets/smart-contracts-developing-contracts-verify-a-contract-remix.jpg)

2. **Flatten your contract:**
   - In the **File Explorer** sidebar, under **contracts**, right-click on your contract
   - Select **Flatten** from the menu
   - This creates a `<contract-name>_flattened.sol` file with all dependencies included

3. **Verify contract details:**
   - Ensure the license and Solidity version match your original contract
   - Click **Save** to save the flattened contract

4. **Download the flattened contract:**
   - Right-click on `<contract-name>_flattened.sol`
   - Select **Download** to save the file locally

5. **Gather required information:**
   - Contract deployment address
   - Contract license type (if any)
   - Solidity compiler version used for deployment
   - Optimization settings, optimizer runs, EVM version, and `viaIR` setting
   - Constructor arguments, if your contract constructor used arguments

### Step 2: Submit for Verification

6. **Access Filfox verification page:**
   - For Filecoin mainnet, navigate to the [Filfox Contract Verification](https://filfox.info/en/contract) page. Mainnet uses chain ID `314`.
   - For Calibration testnet, navigate to the [Calibration Filfox Contract Verification](https://calibration.filfox.info/en/contract) page. Calibration uses chain ID `314159`.
7. **Fill in contract information:**
   - Enter your contract's deployment address
   - Select the appropriate license type
   - Choose the compiler version used for deployment
   - Match any prompted compiler and constructor settings to the original deployment

![](../../.gitbook/assets/smart-contracts-developing-contracts-verify-a-contract-filfox.jpg)

8. **Upload source code:**
   - Click **Continue** to proceed
   - Click **Select .sol files**
   - Choose your flattened `.sol` file
   - Click **Verify and Publish** to submit

### Step 3: Verification Complete

Once submitted, Filfox will process your verification request. Upon successful verification, you'll see a success message confirming your contract is now verified.

![](../../.gitbook/assets/smart-contracts-developing-contracts-verify-a-contract-success.jpg)

## Viewing Your Verified Contract

1. **Navigate to your contract:**
   - Enter your contract address in the [Filfox search bar](https://filfox.info/)
   - This will take you to your contract's page

![](../../.gitbook/assets/smart-contracts-developing-contracts-verify-a-contract-contract-tab.jpg)

2. **View verification status:**
   - Scroll down and select the **Contract** tab
   - Look for the **Contract Source Code Verified** banner
   - Your contract's source code and ABI will now be publicly visible

3. **Explore verified contracts:**
   - Browse [other verified contracts on Filfox](https://filfox.info/en/fevm/verified-contracts)
   - Learn from verified contract examples in the ecosystem

![](../../.gitbook/assets/smart-contracts-developing-contracts-verify-a-contract-verified-contract-list.jpg)
