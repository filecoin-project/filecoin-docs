---
title: "Metamask"
description: "This page explains what MetaMask is, and how to integrate it into the Filecoin network."
lead: "MetaMask is a popular cryptocurrency wallet and browser extension that allows users to interact with the Ethereum blockchain. The Filecoin EVM-runtime allows Filecoin users to user the MetaMask wallet on the Filecoin network. This guide shows you how to integrate FIL into MetaMask."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-wallets"
    identifier: "metamask-582f6bb878fee29349ce0adec7039227"
weight: 300
toc: true
aliases:
    - "/smart-contracts/wallets/"
    - "/about/assets/fil-token/"
    - "/about/assets/wrapped-filecoin/"
---

MetaMask can be downloaded as a browser extension for Google Chrome, Mozilla Firefox, Opera, and Brave browsers. It acts as a bridge between the user's web browser and a blockchain network, allowing users to interact with dApps without having to run a {{< tooltip "full node" >}}. In addition to its wallet functionality, MetaMask also offers users a secure way to store and manage their private keys.

## Configure MetaMask

MetaMask is an Ethereum-based application, so it does not natively support Filecoin. However, it can be configured to use the Filecoin network fairly simply. This process is the same for mainnet, Hyperspace testnet, Calibration testnet, and a local testnet. In this guide we're going to connect MetaMask to the Filecoin Hyperspace testnet.

1. Go to [chainlist.org](https://chainlist.org/).
1. Enter `Filecoin` into the search bar. If you would like to connect to a testnet, enable the **Testnets** toggle:

    ![Search for Filecoin testnets in Chainlist.](chainlist-search-for-filecoin-testnets.png)

1. Scroll down to find the network that you want to connect to:

    ![Find the Hyperspace testnet.](chainlist-select-hyperspace.png)

1. In MetaMask, click **Next**.

    ![Click next in MetaMask.](chainlist-connect-with-metamask.png)

1. Click **Connect**:

    ![Click connect in MetaMask.](chainlist-click-connect-in-metamask.png)

1. Click **Approve** when prompted to _Allow this site to add a network_:

    ![Approve the new network in MetaMask](chainlist-approve-new-network.png)

1. Click **Switch network** when prompted by MetaMask:

    ![Switch networks in MetaMask.](chainlist-switch-network.png)

1. Open MetaMask from the browser extensions tab:

    ![Open MetaMask from the browser extensions tab.](chainlist-open-metamask.png)

1. You should see the Filecoin Hyperspace testnet listed at the top:

    ![MetaMask on the Filecoin Hyperspace testnet.](chainlist-hyperspace-added.png)

### Manual process

If you can't or don't want to use Chainlist, you can add the Hyperspace network to your MetaMask manually.

1. Open your browser and open the MetaMask plugin. If you haven't opened the MetaMask plugin before, you'll be prompted to create a new wallet. Follow the prompts to create a wallet.
1. Click the user circle and select **Settings**:

    ![Click Settings from within MetaMask](manual-show-settings.jpg)

1. Select **Networks**.
1. Click **Add a network**.
1. Scroll down and click **Add a network manually**.
1. Enter the following information based on the network you want to connect to:

    | Network name | New RPC URL | Chain ID | Currency symbol |
    | --- | --- | --- | --- |
    | Mainnet | `https://api.node.glif.io/rpc/v1` | `314` | `tFIL` | 
    | Calibnet|  `https://api.calibnet.node.glif.io/rpc/v1` | `314159` | `tFIL` | 
    | Hyperspace | `https://api.hyperspace.node.glif.io/rpc/v1` | `3141` | `tFIL` | 
    | Local testnet | `http://localhost:1234/rpc/v1` | `31415926` | `tFIL` | 

1. Pick one of the following block explorers, and enter the URL into the **Block explorer (optional)** field:

    | Network | URL |
    | ------- | --- |
    | Mainnet | Filscan: `https://filscan.io` <br> Glif: `https://explorer.glif.io/` |
    | Calibration | Filscan: `https://calibration.filscan.io/` <br> Glif: `https://explorer.glif.io/?network=calibrationnet` |
    | Hyperspace | Filscan: `https://hyperspace.filscan.io/` <br> Glif: `https://explorer.glif.io/?network=hyperspace` |
    | Local testnet | Unfortunately there's currently no option for running a block explorer for a local network. |

1. Review the values in the fields and click **Save**.
1. The Hyperspace testnet should now be shown in your MetaMask window.
1. Done!
