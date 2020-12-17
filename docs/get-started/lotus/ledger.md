---
title: 'Ledger wallet support'
description: 'Lotus supports using a Ledger hardware wallet as a backend for FIL transfers.'
breadcrumb: 'Ledger wallet'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}. The Ledger Hardware Filecoin integration does not currently support BLS addresses, only `secp256k1`. BLS support is on the project roadmap and will be added soon. To set up your Ledger device, follow the steps below.

## Setup your Ledger device

1. Install [Ledger Live](https://www.ledger.com/start/) and follow the instructions to set up your device. Linux users may need to add the [necessary udev rules](https://support.ledger.com/hc/en-us/articles/115005165269-Fix-connection-issues).
1. Enable **Developer mode** in the Ledger live settings:

   ![ledger-enable-dev-mode](../images/ledger.png)

1. You should now be able to search and install the **Filecoin** app in the **Manager** section of Ledger Live.


## Ledger Wallet UI Options

You can either use the [browser-based Glif wallet](#glif-wallet) or manually manage your funds using the [Lotus node and Ledger integration](#lotus).

### Glif Wallet

Filecoin is not accessible directly through the Ledger Live application. However, you can use your Ledger hardware with the Glif wallet at [glif.io](https://glif.io). Glif is an open-source Filecoin wallet you can use in the browser. It uses the [Filecoin Ledger integration library](https://github.com/Zondax/ledger-filecoin/), which has been security audited by a third-party.

### Lotus

You can use a Filecoin Lotus node with Ledger hardware to manage your funds.

#### Add your Ledger to a Lotus node

Make sure you fully trust the Lotus node you are connecting to.

1. In the [Lotus configuration](configuration-and-advanced-usage.md) (`~/.lotus/config.toml`), add `EnableLedger = true` into to `[Wallet]` section:

   ```toml
   [Wallet]
     EnableLedger = true
   ```

1. Unlock your Ledger device. 
1. Open the Filecoin app on your Ledger device and keep it connected to your computer.
1. Use `wallet new secp256k1-ledger` to create a Ledger-backed wallet:

   ```sh
   lotus wallet new secp256k1-ledger
   ```

   You will have to confirm creation on your Ledger device.

   ::: tip
   `lotus wallet new secp256k1-ledger` will provide a new Ledger-backed key whenever called. When called on a different Lotus node or in one that has been reset, the same keys will be generated as they are based on the Ledger device master key.
   :::

1. From this point, any [FIL send operation](send-and-receive-fil.md) from a Ledger wallet will have to be approved on the Ledger device. Make sure it is connected, unlocked, and running the Filecoin app.

::: tip
The `lotus-shed` application provides additional Ledger functionality, like listing the keys in the device and providing information about them.
:::
