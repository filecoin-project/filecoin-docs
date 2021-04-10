---
title: Store and retrieve
description: The process of storing and retrieving data using the Filecoin network is slightly different from how most storage platforms work. This tutorial walks you through the whole end-to-end process of keeping your data and then getting it back when you need it! We're going to use Lotus and the command-line in this tutorial.
---

# Store and retrieve 

The process of storing and retrieving data using the Filecoin network is slightly different from how most storage platforms work. This tutorial walks you through the whole end-to-end process of keeping your data and then getting it back when you need it! We're going to use Lotus and the command-line in this tutorial.

The process is split into three main parts: the set-up, storing your data, and retrieving your data. Each section has several sub-processes that we need to follow.

![](./images/end-to-end-process.png)

1. Set up:

    a. Get access to a Lotus full-node.
    a. Start a Lotus lite-node on your local computer.
    a. Get a FIL address.
    a. Sign up to Filecoin+.

1. Store data: 

    a. Package your data.
    a. Import your data into Lotus.
    a. Find a miner through the MinerX program.
    a. Create a storage deal.
    a. Wait for the deal to complete.

1. Retrieve data:

    a. Create a retrieval deal.
    a. Download your data.

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

