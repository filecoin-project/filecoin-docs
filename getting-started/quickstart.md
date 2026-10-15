---
description: >-
  Start storing data on Filecoin in minutes. Set up and fund your account,
  create a session key, and upload with the tool you prefer.
---

# Quickstart

**Storing data on Filecoin takes three steps: fund your account, create a session key, and connect the tool you want to store data with.**

You'll need an email or Google account, or a wallet you already use, plus a payment card, USDC, or USDFC to add funds.

## 1. Set up and fund your account

1. **Open the console.** Go to [pay.filecoin.cloud/console](https://pay.filecoin.cloud/console?utm_source=docs&utm_medium=quickstart&utm_campaign=relaunch&foc_ref=docs-quickstart).
2. **Sign in.** New to crypto? Continue with email or Google, and the console creates a Filecoin Pay wallet for you. Already use MetaMask or another wallet? Connect it instead.
3. **Add funds.** Select **Add funds** and choose a method:
   * **Buy USDC with card:** buy USDC on Base, then swap and deposit it into Filecoin Pay.
   * **Swap to USDFC:** pay USDC from another chain and deposit the resulting USDFC.
   * **Deposit token:** deposit USDFC you already hold on Filecoin.
4. **Add the storage service.** Select **Deposit and Add Service**, choose **Filecoin Warm Storage**, enter a deposit amount, and confirm in your wallet. Funds stay in your account, and the service bills them as you use it. If you already deposited in step 3, leave the amount empty.

> Your wallet also needs a little FIL for transaction fees. Buying with a card or swapping to USDFC adds 0.05 FIL by default. If you deposit USDFC you already hold, the console shows how much FIL to add and lets you add it.

## 2. Create a session key

A session key lets a tool upload data for you without holding your wallet key. It can't move your funds.

1. Open [Session keys](https://pay.filecoin.cloud/console/session-keys) in the console and select **+ New session key**.
2. Select the scopes **Create data set** and **Add pieces**, and pick an expiration (30 days by default).
3. Select **Create session key** and confirm in your wallet.
4. Copy the key or select **Download .env**. The key is shown only once, so save it before you close the dialog.

You can revoke a key on the same page at any time.

## 3. Start storing data

Pick the tool that fits how you work, then use your session key to connect it.

* **[CLI](https://github.com/filecoin-project/filecoin-pin):** store files from your terminal with Filecoin Pin.
* **[SDK](https://docs.filecoin.cloud/getting-started/):** build storage into your app with the Synapse SDK.
* **[Agent skill](../core-concepts/filecoin-for-agents.md):** let your AI agent store files for you.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/getting-started/quickstart)
