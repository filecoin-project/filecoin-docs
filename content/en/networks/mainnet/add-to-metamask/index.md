---
title: "Add to metamask"
description: "MetaMask is a popular browser extension that allows users to interact with blockchain applications. This guide shows you how to integrate FIL into MetaMask using the Filecoin mainnet."
lead: "MetaMask is a popular browser extension that allows users to interact with blockchain applications. This guide shows you how to integrate FIL into MetaMask using the Filecoin mainnet."
draft: false
images: []
type: docs
menu:
  networks:
    parent: "networks-mainnet"
    identifier: "add-to-metamask-8d08023a42c4ca9a30d79bdac27e7fb2"
weight: 140
toc: true
aliases:
    - "/fvm/how-tos/add-to-metamask/"
    - "/developers/smart-contracts/how-tos/add-to-metamask/"
---

## Simple method

The easiest way to add a Filecoin testnet to your MetaMask is by using the pre-configured options at chainlist.org.

1. Go to [chainlist.org](https://chainlist.org/).
1. Enter `Filecoin` into the search bar.
1. Scroll down to find the **Filecoin** network.
1. In MetaMask click **Next**.
1. Click **Connect**.
1. Click **Approve** when prompted to _Allow this site to add a network_.
1. Click **Switch network** when prompted by MetaMask.
1. Open MetaMask from the browser extensions tab.
1. You should see _Filecoin_ listed at the top.

## Manual process

If you can't or don't want to use Chainlist, you can add the Filecoin network to your MetaMask manually.

### Prerequisites

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
    | Network name | `Filecoin` |
    | New RPC URL | `https://api.node.glif.io/rpc/v1` |
    | Chain ID | `314` |
    | Currency symbol | `FIL` |

7. Pick one a [block explorers]({{< relref "/networks/mainnet/explorers" >}}), and enter the URL into the **Block explorer (optional)** field.
8. Review the values in the fields and click **Save**.
9.  The Filecoin network should now be shown in your MetaMask window.
10. Done!
