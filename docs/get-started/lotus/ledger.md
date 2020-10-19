---
title: 'Ledger wallet support'
description: 'Lotus supports using a Ledger hardware wallet as a backend for FIL transfers.'
breadcrumb: 'Ledger wallet'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}. To setup your Ledger device and Lotus follow the steps below.

## Setup your ledger device

1. Obtain a [Ledger Nano S/X device](https://www.ledger.com/).

1. Install [Ledger Live](https://www.ledger.com/start/) and follow the instructions to setup your device. In Linux systems, make sure you have added the [necessary udev rules as explained here](https://support.ledger.com/hc/en-us/articles/115005165269-Fix-connection-issues).

1. Enable **developer mode** in the Ledger live settings:

   ![ledger-enable-dev-mode](../images/ledger.png)

1. You should now be able to search and install the **Filecoin** app in the _manager_ section of the application.

## Setup Lotus

1. In the [Lotus configuration](configuration-and-advanced-usage.md) (`~/.lotus/config.toml`), add or edit the `[Wallet]` section as follows:

   ```toml
   [Wallet]
     EnableLedger = true
   ```

1. Unlock your Ledger device, open the Filecoin app in your Ledger device and keep it connected to your USB port.

1. Create a ledger-backed wallet in Lotus with:

   ```sh
   lotus wallet new secp256k1-ledger
   ```

   You will have to confirm creation on your Ledger device.

   ::: tip
   `lotus wallet new secp256k1-ledger` will provide a new Ledger-backed key every time when called. When called on a different Lotus node, or in one that has been reset, the same keys will be generated as they are based in the Ledger device master key.
   :::

1. From this point, any [FIL send operation](send-and-receive-fil.md) from a Ledger wallet will have to be approved (signed) on the Ledger device. Make sure it is connected, unlocked, and running the Filecoin app then.

::: tip
The `lotus-shed` application provides additional Ledger functionality, like listing the keys in the device and providing information about them.
:::
