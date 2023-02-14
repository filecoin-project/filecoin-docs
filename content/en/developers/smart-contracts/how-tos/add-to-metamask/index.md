---
title: "Add to MetaMask"
description: "MetaMask is a popular browser extension that allows users to interact with blockchain applications. This guide shows you how to integrate FIL into MetaMask using the Hyperspace testnet."
lead: "MetaMask is a popular browser extension that allows users to interact with blockchain applications. This guide shows you how to integrate FIL into MetaMask using the Hyperspace testnet."
menu:
    developers:
        parent: "developers-how-tos"
type: docs
weight: 40
draft: false
images: []
aliases:
    - "/fvm/how-tos/add-to-metamask/"
    - "/developers/smart-contracts/how-tos/add-to-metamask/"
---

{{< beta-warning >}}

This page assumes that you already have [MetaMask installed](https://metamask.io/) in your browser.

## Simple method

The easiest way to add a Filecoin testnet to your MetaMask is by using the pre-configured options at chainlist.org.

1. Go to [chainlist.org](https://chainlist.org/).
1. Enable the **Testnets** toggle and enter `Filecoin` into the search bar.

    ![Search for Filecoin testnets in Chainlist.](chainlist-search-for-filecoin-testnets.png)

1. Scroll down to find the **Filecoin -- Hyperspace** testnet:

    ![Find the Hyperspace testnet.](chainlist-select-hyperspace.png)

1. In MetaMask click **Next**.

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

## Manual process

If you can't or don't want to use Chainlist, you can add the Hyperspace network to your MetaMask manually.

### Prerequisities

Before we get started, you'll need the following:

- A [Chromium-based browser](https://en.wikipedia.org/wiki/Chromium_web_browser#Browsers_based_on_Chromium), or [Firefox](https://www.mozilla.org/en-CA/firefox/products/).
- A browser with [MetaMask](https://metamask.io/) installed.

### Steps

The process for integrating Filecoin into MetaMask is fairly simple but has some very specific variables that you must copy exactly.

1. Open your browser and open the MetaMask plugin. If you haven't opened the MetaMask plugin before, you'll be prompted to create a new wallet. Follow the prompts to create a wallet.
2. Click the user circle and select **Settings**:

    ![Click Settings from within MetaMask](manual-show-settings.jpg)

3. Select **Networks**.
4. Click **Add a network**.
5. Scroll down and click **Add a network manually**.
6. Enter the following information into the fields:

    | Field | Value |
    | --- | --- |
    | Network name | `Filecoin Hyperspace testnet` |
    | New RPC URL | `https://api.hyperspace.node.glif.io/rpc/v1` |
    | Chain ID | `3141` |
    | Currency symbol | `tFIL` |

7. Pick one of the following block explorers, and enter the URL into the **Block explorer (optional)** field:

    - Glif Explorer: `https://explorer.glif.io/?network=hyperspace`
    - Filscan: `https://hyperspace.filscan.io/`

8. Review the values in the fields and click **Save**.
9.  The Hyperspace testnet should now be shown in your MetaMask window.
10. Done!

## Next steps

You can now add funds to this wallet by using the [Hyperspace testnet faucet]({{< relref "use-a-faucet" >}}).
