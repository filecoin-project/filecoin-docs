---
title: Store and retrieve
description: The process of storing and retrieving data using the Filecoin network is slightly different from how most storage platforms work. This tutorial walks you through the whole end-to-end process of keeping your data and then getting it back when you need it! We're going to use Lotus and the command-line in this tutorial.
---

# Store and retrieve 

The process of storing and retrieving data using the Filecoin network is slightly different from how most storage platforms work. This tutorial walks you through the whole end-to-end process of keeping your data and then getting it back when you need it! We're going to use Lotus and the command-line in this tutorial.

The process is split into three main parts: the set-up, storing your data and retrieving your data. Each section has several sub-processes that we need to follow.

![End-to-end process for storing and retrieving data.](./images/end-to-end-process.png)

| Section | Sub-tasks |
| --- | --- |
| Set up | 1. Get access to a Lotus full-node.<br> 2. Start a Lotus lite-node on your local computer.<br> 3. Get a FIL address.<br> 4. Sign up for Filecoin Plus. |
| Store data | 1. Package your data.<br> 2. Import your data into Lotus.<br> 3. Find a miner through the MinerX program.<br> 4. Create a storage deal.<br> 5. Wait for the deal to complete. |
| Retrieve data | 1. Create a retrieval deal.<br> 2. Download your data.|

It will take about an hour to complete this tutorial. While there aren't too many steps involved, there's a bit of waiting around for the network to process your requests.

:::warning
This tutorial uses the Filecoin mainnet. Everything you'll see over the next hour is happening on a production network with other users storing and retieving data. But don't worry, this tutorial won't cost you anything! It's just important to know that you'll be dealing with real miners, real data, and real transactions.
:::

## Take notes

There are a few things to remember throughout this tutorial, such as Miner IDs and addresses. There is a table at the end of each section showing the information you should record:

| Variable | Description | Example |
| --- | --- | --- |
| Miner ID | The unique identifier for each miner. | `f01000`

## Terms and phrases

This tutorial contains some words and phrases that you might not be familiar with. Refer back to this table if you encounter something you don't understand:

| Word | Definition |
| --- | --- |
| Address | A string of letters and numbers that other users can send FIL to. |
| Wallet | A collection of addresses. Think of each wallet as a folder and each address as a single file in that folder. |
| Filecoin (upper-case `F`) | The network that transactions and storage deals take place on. |
| filecoin (lower-case `f`) | The cryptocurrency that the Filecoin network runs on. |
| FIL | The shorthand representation of the filecoin cryptocurrency. |
| Private key | A string of letters and numbers that programs use to interact with the Filecoin network. Keep your private key safe, and don't share it with anyone. |
| [Block explorer](../../get-started/explore-the-network/#block-explorers) | A service, usually a website, that lets you view details of a blockchain such as transactions, deals, and addresses. |
| Deal | An agreement between two computers about what to do with some data. |
| Storage deal | An agreement between a miner and a client about what data to store, how long for, and how much the miner can charge for storage. |
| Retrieval deal | An agreement between a miner and a client about how much the miner can charge to send data to a client. |

## Next steps

Before we can manage data on the Filecoin network, we need to set up things like a Lotus node and a Filecoin wallet. [Head to the set-up section to start gathering your resources →](set-up)

