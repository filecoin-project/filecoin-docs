---
title: "Get test tokens"
description: "Test funds are available to developers so they can test their smart contracts and applications within the confines of a test network."
lead: "Test funds are available to developer so that they can test their smart contracts and applications within the confines of a test network. The process for getting test funds differs across test networks. This page covers how to get test funds from the Hyperspace testnet."
draft: false
images: []
type: docs
menu:
  networks:
    parent: "networks-hyperspace"
    identifier: "get-test-tokens-9369a525d52e7f53e5158246e1c0c28c"
weight: 250
toc: true
aliases:
    - "/developers/smart-contracts/how-tos/use-a-faucet/"
    - "/developers/smart-contracts/how-tos/get-test-tokens/"
    - "/fvm/how-tos/use-a-faucet/"
---

MetaMask is one of the easier ways to manage addresses on the Hyperspace testnet. MetaMask uses the `t4` [address type]({{< relref "blockchain#addresses" >}}), which allows developers to create and manage Solidity contracts easily. Follow the [Add to MetaMask guide]({{< relref "/basics/assets/metamask-setup" >}}) if you havn't set up an address in your MetaMask wallet yet.
w

1. In your browser, open MetaMask and copy your address to your clipboard:

    ![Copy your address to your clipboard.](faucet-get-address.png)

1. Go to [hyperspace.yoga](https://hyperspace.yoga) and click **Faucet** from the menu.

    ![Go to the Faucet section of the website.](faucet-click-faucet.png)

1. Paste your address into the address field, complete the **I am human** captcha, and then click **Send**:

    ![Verify you're a human.](faucet-verify.png)

1. The faucet should give you a link to the transaction:

    ![Click on the message link.](faucet-get-message-link.png)

1. The [block](https://docs.filecoin.io/reference/general/glossary/#block) explorer will show you the transaction history for your address. After a couple of minutes, you should see 5 `tFIL` transferred to your address.

    ![Show the message confirmation in a block explorer.](faucet-show-message-confirmation.png)

1. Open MetaMask to confirm that you received the `tFIL`:

    ![MetaMask showing a balance of FIL.](faucet-metamask-with-balance.png)

That's all there is to it! Getting `tFil` is easy!
