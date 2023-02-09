---
title: "Use a faucet"
description: "Faucets can send you some test FIL so that you can explore and experiment with a Filecoin testnet without having to pay for anything. There are two faucets available, one for the Builder testnet (buildernet) and the Hyperspace testnet."
lead: "Faucets can send you some test FIL so that you can explore and experiment with a Filecoin testnet without having to pay for anything. There are two faucets available, one for the Builder testnet (buildernet) and the Hyperspace testnet."
menu:
    developers:
        parent: "developers-how-tos"
type: docs
weight: 40
draft: false
images: []
aliases:
    - "/developers/smart-contracts/how-tos/use-a-faucet/"
    - "/fvm/how-tos/use-a-faucet/"
---

{{< beta-warning >}}

## Prerequisites

Before we begin, you must have an address on the Hyperspace testnet. Follow the [Add to MetaMask guide]({{< relref "add-to-metamask" >}}) if you don't have one yet.

## Hyperspace testnet

1. In your browser, open MetaMask and copy your address to your clipboard:

    ![Copy your address to your clipboard.](faucet-get-address.png)

1. Go to [hyperspace.yoga](https://hyperspace.yoga) and click **Faucet** from the menu.

    ![Go to the Faucet section of the website.](faucet-click-faucet.png)

1. Paste your address into the address field, complete the **I am human** captcha, and then click **Send**:

    ![Verify you're a human.](faucet-verify.png)

1. The faucet should give you a link to the transaction:

    ![Click on the message link.](faucet-get-message-link.png)

1. The block explorer will show you the transaction history for your address. After a couple of minutes, you should see 5 `tFIL` transferred to your address.

    ![Show the message confirmation in a block explorer.](faucet-show-message-confirmation.png)

1. Open MetaMask to confirm that you received the `tFIL`:

    ![MetaMask showing a balance of FIL.](faucet-metamask-with-balance.png)

That's all there is to it! Getting `tFil` is easy!
