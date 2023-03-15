---
title: "Fund a 0x address"
description: "The FilFowarder is a smart contract that lets users transfer FIL from an Ethereum-based f4 address to a Filecoin address of a different type."
lead: "Filecoin `f4` addresses can be used directly with Ethereum development tools like Metamask, Remix, Hardhat, wallets like Ledger, and supported exchanges. While support for direct transfer to an f4 address is being rolled out more widely, you will need to temporarily transfer your FIL to a wallet that supports `f4` addresses, and then transfer the Fil from that wallet to a `0x`-style address. There are currently multiple options for doing this, which vary based on your situation, and are described on this page."
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

In order to support EVM smart contracts on Filecoin, the f4 address class, which can be mapped back and forth from Ethereum-style 0x addresses, was created. Because it can be mapped directly to 0x prefix addresses, f4 addresses can be used directly with:

- Ethereum development tools like Metamask, Remix and Hardhat
- Wallets like Ledger
- Exchanges, such as [these exchanges](#use-a-supported-exchange)

Currently, most wallets, exchanges and tools are still implementing support for f4 addresses. This means that many wallets and exchanges won’t let you directly transfer FIL to an f4 address. Instead, you have three methods to choose from. The method you select depends on on your specific situation

- If you are sending funds to an account on the Filecoin network created in Metamask, you have two options: 
  - [Use a Glif burner wallet](#use-a-glif-burner-wallet) 
  - [Use a local Lotus lite node and wallet](#use-a-lotus-lite-node-and-wallet)
- If you are using a Ledger hardware wallet, you must [use it with a Glif wallet](#use-a-ledger-hardware-wallet).

## Use a Glif burner wallet

{{< alert >}}
These instructions assume you are sending funds to an account on the Filecoin network created in Metamask.
{{< /alert >}}

In this method, you will create a "burner wallet" using Glif, transfer Fil to the burner wallet, and then transfer Fil from the burner wallet to Metamask.

1. Navigate to [https://wallet.glif.io/](https://wallet.glif.io/).
1. Under **Burner wallets**, click **Create Seed Phase**.
1. Write down your seed phrase somewhere safe. You can also copy or download the seed phrase. You will need it later.
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

## Use a Lotus lite node and wallet

{{< alert >}}
These instructions assume you are sending funds to an account on the Filecoin network created in Metamask.
{{< /alert >}}

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

## Use a Ledger hardware wallet

{{< alert  >}}
Ledger Live does not currently support `0x` or `f4` addresses, so you cannot use it to directly send funds to a `0x` address.
{{< /alert >}}

In this method, you will transfer Fil to a Glif wallet, and then connect your Ledger device to a Glif wallet. This method works becayse Glif currently supports both `0x` and `f4` addresses styles, and can send from an `f1` address to a `0x` address, so you can benefit from Glif's functionality, with your keys remaining on your Ledger hardware wallet.

1. Ensure that the following is true:
   - Your Ledger device is connected to your computer.
   - The Filecoin app is open on your hardware wallet.
   - The Filecoin app display shows **Filecoin ready**.
1. Navigate to [Glif](https://glif.io).
1. At the top of the screen, click **Connect Wallet** 
1. Select **Ledger (Filecoin)**.
1. At the bottom of the screen, click **Send FIL**.
1. Enter the follwing information:
   - The `0x` address you witwishh to send to 
   - The Fil amount to be sent
1. Click **Send**.
1. On your hardware device ,verify and accept the transaction. 
