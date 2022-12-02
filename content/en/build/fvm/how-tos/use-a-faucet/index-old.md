---
title: "Use a faucet"
description: "Faucets can send you some test FIL so that you can explore and experiment with a Filecoin testnet without having to pay for anything. There are two faucets available, one for the Builder testnet (buildernet) and the Wallaby testnet."
lead: "Faucets can send you some test FIL so that you can explore and experiment with a Filecoin testnet without having to pay for anything. There are two faucets available, one for the Builder testnet (buildernet) and the Wallaby testnet."
menu:
    fvm:
        parent: "fvm-how-tos"
---

{{< beta-warning >}}

## Prerequisites

Before we begin, you must have an address on the Wallaby testnet. Follow the [Add to MetaMask guide]({{< relref "add-to-metamask" >}}) if you don't have one yet.

<!-- ## Builder testnet (buildernet) -->
<!-- 1. Lorem. -->
<!-- 1. Ipsum. -->

## Wallaby testnet

1. Open your browser and open MetaMask.
1. Click your account to copy the address to your clipboard:

    ![Select your account in MetaMask.](select-account-in-metamask.png)

1. Go to [`wallaby.network#faucet`](https://wallaby.network/#faucet).
1. Paste your address into the address field, complete the **I am human** captcha, and then click **Send**:

    ![Click the send button in MetaMask.](click-send.png)

1. The faucet should give you a link to the transaction. Click it to view your transaction:

    ![Click the transaction link on the faucet.](transaction-link.png)

1. The block explorer will show you the transaction history for your address. After a couple of minutes, you should see 5000 `tFIL` transferred to your address.
1. Open MetaMask to confirm that you received the `tFIL`:

    ![View your funds in MetaMask.](metamask-with-funds.png)

1. Done!
