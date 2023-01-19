---
title: "Add to MetaMask"
description: "MetaMask is a popular browser extension that allows users to interact with blockchain applications. This guide shows you how to integrate FIL into MetaMask using the Wallaby testnet."
lead: "MetaMask is a popular browser extension that allows users to interact with blockchain applications. This guide shows you how to integrate FIL into MetaMask using the Wallaby testnet."
menu:
    developers:
        parent: "developers-how-tos"
type: docs
weight: 40
draft: false
images: []
aliases:
    - "/fvm/how-tos/add-to-metamask/"
---

{{< beta-warning >}}

## Simple method

The easiest way to add a Filecoin testnet to your MetaMask is by using the pre-configured options at chainlist.org.

1. Go to [chainlist.org](https://chainlist.org/).
1. Enable the **Testnets** toggle and enter `Filecoin` into the search bar.
    
    ![](chainlist-select-test-networks.png)

1. Scroll down to find the **Filecoin -- Wallaby** testnet:

    ![](chainlist-filecoin-wallaby.png)

1. In MetaMask click **Next** and then **Continue** when prompted to connect Chainlist.org to MetaMask:

    ![](chainlist-connect-with-metamask.png)

1. Back on the Chainlist.org page, click the **Filecoin -- Wallaby** testnet connect button again.
1. In MetaMask click **Approve** when prompted to _Allow this site to add a network_:

    ![](chainlist-allow-site-to-add-a-network.png)

1. Click **Switch network** when prompted by MetaMask:

    ![](chainlist-switch-network.png)

1. Open MetaMask, and you should see that you're now on the Filecoin Wallaby testnet:

    ![](chainlist-complete.png)

1. Done!

## Manual process

If you can't or don't want to use Chainlist, you can add the Wallaby network to your MetaMask manually.

### Prerequisities

Before we get started, you'll need the following:

- A [Chromium-based browser](https://en.wikipedia.org/wiki/Chromium_web_browser#Browsers_based_on_Chromium), or [Firefox](https://www.mozilla.org/en-CA/firefox/products/).
- A browser with [MetaMask](https://metamask.io/) installed.

### Steps

The process for integrating Filecoin into MetaMask is fairly simple but has some very specific variables that you must copy exactly.

1. Open your browser and open the MetaMask plugin:

    ![MetaMask home.](metamask-home.png)

    If you haven't opened the MetaMask plugin before, you'll be prompted to create a new wallet. Follow the prompts to create a wallet.
1. If you haven't already, change your view to **Expanded view**:

    ![MetaMask in expanded view mode.](expand-view.png)

1. Click the user circle and select **Settings**:

    ![MetaMask user dropdown.](select-settings.png)

1. Select **Networks**.

    ![MetaMask menu with Networks highlighted.](networks-tab.png)

1. Click **Add a network**:

    ![](add-a-network.png)

1. Scroll down and click **Add a network manually**:

    ![](add-a-network-manually.png)

1. Enter the following information into the fields:

    | Field | Value |
    | --- | --- |
    | Network name | `Filecoin Wallaby` |
    | New RPC URL | `https://api.hyperspace.node.glif.io/rpc/v1` |
    | Chain ID | `31415` |
    | Currency symbol | `tFIL` |

1. Pick one of the following block explorers, and enter the URL into the **Block explorer (optional)** field:

    - Glif Explorer: `https://explorer.glif.io/?network=wallaby`
    - Filscan: `https://explorer.glif.io/?network=wallaby`

1. Review the values in the fields and click **Save**:

    ![](entering-network-options.png)

1. The Wallaby testnet should now be shown in your MetaMask window:

    ![](wallaby-network-added.png)

1. Done!

## Next steps

You can now add funds to this wallet by using the [Wallaby testnet faucet]({{< relref "use-a-faucet" >}}).
