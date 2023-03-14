---
title: "Transfer Fil to a 0x address"
description: "The FilFowarder is a smart contract that lets users transfer FIL from an Ethereum-based f4 address to a Filecoin address of a different type."
lead: "Filecoin f4 addresses can be used directly with Ethereum development tools and wallets like Metamask, Remix, Hardhat and more. While support for direct transfer to an f4 address is being rolled out more widely, you will need to temporarily transfer your FIL to a wallet that supports f4 addresses, and then transfer the Fil from that wallet to a 0x-style address. There are currently two options for doing this, each of which are described on this page."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-wallets"
    identifier: "fil-to-0x"
weight: 600
toc: true
---

In order to support EVM smart contracts on Filecoin, the f4 address class, which can be mapped back and forth from Ethereum-style 0x addresses, was created. Because it can be mapped directly to 0x prefix addresses, f4 addresses can be used directly with Ethereum development tools and wallets like Metamask, Remix, Hardhat and more. Currently, most wallets and exchanges only support f1 or f3 addresses, and are still implementing support for f4 addresses. This means that many wallets and exchanges won’t let you directly transfer FIL to an f4 address. Instead, you'll either need to [use a Glif burner wallet](#use-a-glif-burner-wallet) or [use a local Lotus lite node and wallet](#use-a-local-lotus-lite-node-and-wallet). Before using either method, make sure you understand the [prerequisites](#prerequisites).

## Prerequisites

These instructions assume you are sending funds to an account on the Filecoin network created in Metamask.

## Use a Glif burner wallet

In this method, you will create a "burner wallet" using Glif, transfer Fil to the burner wallet, and then transfer Fil from the burner wallet to Metamask.

1. Navigate to [https://wallet.glif.io/](https://wallet.glif.io/).
1. Under **Burner wallets**, click **Create Seed Phase**.
1. Write down your seed phrase somewhere safe. You can also copy or download the seed phrase. You will need it later.*
1. Click **I've recorded my seed phrase**.
1. Using your seed phrase, enter the missing words in the blank text fields.
1. Click **Next**.
1. Click **Next** again.
1. In the upper left corner of your wallet dashboard, click on the double squares icon next to your address to copy it.
1. Record this address. You will need it later.
1. From your main wallet account or exchange, transfer some funds to this address.
1. From Metamask, copy your 0x address.
1. Once the funds appear in the burner wallet, click on **Send**.
1. Enter the necessary information into the text fields:
   - In the **Recipient** field, enter your 0x style address. GLIF automatically converts it to an f4 address.
   - In the **Amount** field, enter the amount of Fil to send.
   - In **Params**, add optional Base64 parameters. 
1. Click **Review**.
1. Once you've reviewed, click **Send**.
1. The Fil will arrive in your Metamask wallet shortly.


## Use a local Lotus lite node and wallet

In this method, you will start a Lotus lite node, create a local wallet, transfer Fil to the local wallet, and then transfer Fil from the local wallet to Metamask.

1. Install Lotus using the instructions [here](https://lotus.filecoin.io/tutorials/lotus/store-and-retrieve/set-up/).
1. Start the Lotus lite node with the following command: 

   ```shell
   FULLNODE_API_INFO=wss://api.chain.love lotus daemon --lite
   ```

1. Open a second terminal window.
1. In the new terminal window, create a new wallet: 

   ```shell
   lotus wallet new
   ```

   The returned address is the address of this new wallet
1. From your exchange or other wallet, send your FIL to the wallet address generated in the previous step.
1. When your Fil arrives, check the wallet balance using the following command: 

   ```shell
   lotus wallet list
   ```

1. Convert your 0x address into an f4 address by navigating to [https://explorer.glif.io/](https://explorer.glif.io/).
1. Using the f4 address (`<f4-address>`) generated in the previous step, send the funds from your Lotus wallet to Metamask with the following command: 

    ```shell
    lotus send --from <f4-address> \ f410fkdpudftnfumrq33rw3vivd4rbfrqaetsbepkz7a 3
    ```

1. The Fil will arrive in your Metamask wallet shortly.
