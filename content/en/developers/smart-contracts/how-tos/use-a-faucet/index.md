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

1. Open your browser and open MetaMask.
1. Click your account to copy the address to your clipboard:

    ![Copy your MetaMask address to your clipboard.](copy-address-to-clipboard.png)

2. Go to [hyperspace.yoga](https://hyperspace.yoga/#faucet) and scrolldown to the **Faucet** section.
3. Paste your address into the address field, complete the **I am human** captcha, and then click **Send**:

    ![Paste your MetaMask address into the field, complete the captcha, click send.](paste-address-into-field.png)

4. The faucet should give you a link to the transaction. Click it to view your transaction: (Note that after clicking send, the link will appear and slowly fade away.)

    ![Click the link that appears to view the transaction.](link-to-transaction.png)

5. The block explorer will show you the transaction history for your address. After a couple of minutes, you should see 5 `tFIL` transferred to your address.
6. Open MetaMask to confirm that you received the `tFIL`:

    ![Open MetaMask to confirm that you have recieved the funds.](confirm-funds-metamask.png)

7. Done!
