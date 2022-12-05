---
title: "Quickstart"
description: "In this quickstart tutorial we'll walk through how to deploy your first smart-contract to the Filecoin network. We're going to install a browser-based wallet called Metamask, create a new wallet address, supply some test currency to that wallet, and then use a browser-based development environment called Remix to deploy a smart contract to the Filecoin network."
lead: "In this quickstart tutorial we'll walk through how to deploy your first smart-contract to the Filecoin network. We're going to install a browser-based wallet called Metamask, create a new wallet address, supply some test currency to that wallet, and then use a browser-based development environment called Remix to deploy a smart contract to the Filecoin network."
weight: 5
menu:
    fvm:
        parent: "fvm-basics"
aliases:
    - /fvm/how-tos
---

{{< beta-warning >}}

This tutorial assumes that you have some familiarity with web3, but you haven't hear of, or haven't yet used, the Filecoin network. However, you don't need to have developed smart-contracts in the past, as we're going to step through things from start to finish.

## Introducing the Filecoin virtual machine

The Filecoin virtual machine is (FVM) technology that allows developers to run code on the Filecoin network. The FVM has a number of different virtual machines that can run on-top of it. The baselayer is called WebAssemby (WASM), and then ontop of that is the Ethereum virtual machine (EVM) compatible layer. This tutorial is going to focus on deploying a smart contract to the Filecoin network using this EVM compatible layer.

## Create a wallet

Before we can interact with the Filecoin network, we need funds. But before we can get any funds, we need to where to put them! So we're going to be using MetaMask. MetaMask is a crypocurrency wallet that lives in your browser, which makes it really easy for users to interact with web3-based sites.

1. Open your browser and visit the [MetaMask website](https://metamask.io/).
1. Install the wallet by clicking the **Download for** button. MetaMask is available for Brave, Chrome, Edge, Firefox, and Opera.
1. Once MetaMask is installed, it will open a **Get started** window. 
1. Follow the promts until you are asked if you are **New to MetaMask**.
1. Because you don't yet have an account on the Filecoin network select **Create a wallet**.
1. Enter a secure password. You will use this password every time you want to open this wallet in this browser.
1. Click **Next** until you get to the **Secret Recovery Phrase** window. Read the information about what this _recovery phrase_ is on this page.
1. Once you've followed the instructions and saved your recovery phrase, click **Next**.
1. Confirm that you saved the recovery phrase correctly by clicking on the words in order.
1. Once you've done that, you should have your account set up!

## Switch networks
