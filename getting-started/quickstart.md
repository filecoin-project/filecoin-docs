---
description: >-
  Set up and fund your Filecoin Pay account in the console, then start storing
  data with the CLI, the SDK, or an agent skill.
---

# Quickstart

**Storing data on Filecoin takes two steps: set up and fund your account in the Filecoin Pay console, then connect the tool you want to store data with.**

## 1. Set up and fund your account

1. **Open the console.** Go to [pay.filecoin.cloud/console](https://pay.filecoin.cloud/console?utm_source=docs&utm_medium=quickstart&utm_campaign=relaunch).
2. **Sign in.** New to crypto? Continue with email or Google, and the console creates a Filecoin Pay wallet for you. Already use MetaMask or another wallet? Connect it instead.
3. **Add funds.** Select **Add funds** and choose a method:
   * **Buy USDC with card:** buy USDC on Base, then swap and deposit it into Filecoin Pay.
   * **Swap to USDFC:** pay USDC from another chain and deposit the resulting USDFC.
   * **Deposit token:** deposit USDFC you already hold on Filecoin.
4. **Add the storage service.** Select **Deposit and Add Service**, choose **Filecoin Warm Storage**, enter a deposit amount, and confirm in your wallet. Funds stay in your account, and the service bills them as you use it. If you already deposited in step 3, leave the amount empty.

> Your wallet also needs a little FIL for transaction fees. If it's short, the console shows how much to add and lets you add it.

## 2. Start storing data

Pick a tool. Each one connects to your account with a session key, so it can upload without holding your wallet key. You can create and revoke keys on the console's [Session keys](https://pay.filecoin.cloud/console/session-keys) page.

* **[CLI](https://github.com/filecoin-project/filecoin-pin):** store files from your terminal with Filecoin Pin.
* **[SDK](https://docs.filecoin.cloud/getting-started/):** build storage into your app with the Synapse SDK.
* **[Agent skill](../core-concepts/filecoin-for-agents.md):** let your AI agent store files for you.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/getting-started/quickstart)
