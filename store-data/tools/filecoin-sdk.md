---
description: >-
  The Filecoin SDK is a TypeScript library for Node.js and the browser that
  funds, uploads, retrieves and manages Filecoin Cloud storage; it ships as a
  high-level SDK, a low-level core, and React hooks.
---

# Filecoin SDK

**The Filecoin SDK is a TypeScript library for storing data on Filecoin Cloud from your app.** It runs in Node.js and in the browser, and handles funding, uploads, downloads and data sets for you.

## Pick a package

| Package | Use it for | npm |
| --- | --- | --- |
| Filecoin SDK | Most apps. One `Synapse` class handles payments, storage, providers and session keys. | `@filoz/synapse-sdk` |
| Filecoin SDK for React | React apps. Hooks for payments and storage, built on Wagmi and TanStack Query. | `@filoz/synapse-react` |
| Filecoin SDK Core | Full control. Low-level building blocks for contracts, providers and PieceCIDs. | `@filoz/synapse-core` |

Start with the Filecoin SDK unless you have a reason not to. The other two packages share the same core.

## Install

```sh
npm install @filoz/synapse-sdk viem
```

`viem` is required and installed separately.

In the browser, if your site sets a Content-Security-Policy, allow `'wasm-unsafe-eval'`. The SDK uses WebAssembly to calculate PieceCIDs, and uploads fail without it.

## Connect

```ts
import { Synapse, mainnet } from "@filoz/synapse-sdk"
import { privateKeyToAccount } from "viem/accounts"

const synapse = Synapse.create({
  account: privateKeyToAccount(process.env.PRIVATE_KEY),
  source: "my-app",   // names your app in the data set metadata
  chain: mainnet,     // leave out to use the Calibration testnet
})
```

In the browser, connect the user's wallet instead of a private key.

## What you can do

| Task | Guide |
| --- | --- |
| Deposit funds and approve storage | [Fund storage](../warm-storage/fund-storage.md) |
| Upload files | [Upload data](../warm-storage/upload-data.md) |
| Download and check files | [Retrieve data](../warm-storage/retrieve-data.md) |
| List, delete and end data sets | [Manage data sets](../warm-storage/manage-data-sets.md) |
| Check your balance | [Monitor balance and proofs](../warm-storage/monitor-balance-and-proofs.md) |
| Let an app or agent act for a wallet | [Delegate access with session keys](../warm-storage/delegate-access-with-session-keys.md) |

## Limits

| Limit | Value |
| --- | --- |
| Upload size | 127 bytes to about 63.5 GiB |
| Data set metadata | Up to 10 key-value pairs |
| File (piece) metadata | Up to 5 key-value pairs |
| Metadata keys and values | Keys up to 32 characters, values up to 128 |

## Reference

* Filecoin SDK reference: every class and method.
* [Source on GitHub](https://github.com/FilOzone/synapse-sdk).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/tools/filecoin-sdk)
