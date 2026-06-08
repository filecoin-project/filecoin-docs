---
description: >-
  Install the Synapse SDK, prepare payments, upload data, and retrieve it from
  Filecoin Onchain Cloud.
---

# Quick start with Synapse SDK

The Synapse SDK is the main developer interface for Filecoin Onchain Cloud. It handles the common application flow: connect a wallet, prepare payment, upload data, and download it later.

This page gives you the shortest path from a JavaScript or TypeScript app to a working FOC storage flow. For deeper guides and the full API reference, use the [FOC documentation](https://docs.filecoin.cloud/developer-guides/synapse).

## Prerequisites

Before you start, make sure you have:

* Node.js installed for local development.
* A Filecoin-compatible wallet.
* FIL for transaction gas. On Calibration testnet, use a [Calibration faucet](../../networks-and-tools/networks/calibration/README.md).
* USDFC for storage payments. Check the [FOC docs](https://docs.filecoin.cloud/getting-started) for current testnet and mainnet funding guidance.

{% hint style="info" %}
The Synapse SDK defaults to Calibration testnet when no `chain` is passed. The snippets below use Calibration so the faucet funds above match the example transactions. To use Mainnet, import `mainnet` from `@filoz/synapse-sdk`, add `chain: mainnet` to `Synapse.create`, and fund the same wallet with Mainnet FIL and USDFC.
{% endhint %}

{% hint style="warning" %}
Keep private keys out of source code, git history, shared terminals, and frontend bundles. The examples below use placeholders. For browser apps, prefer connecting to the user's wallet instead of handling a raw private key.
{% endhint %}

## Install

Install the SDK and its `viem` peer dependency:

```sh
npm install @filoz/synapse-sdk viem
```

Other package managers work too:

```sh
pnpm add @filoz/synapse-sdk viem
yarn add @filoz/synapse-sdk viem
bun add @filoz/synapse-sdk viem
```

The snippets below use top-level `await`, so they assume an ESM TypeScript or JavaScript project. In a CommonJS project, wrap the calls in an `async` function instead.

## Initialize Synapse

For a backend or local script, create an account from a private key that you load from your secret manager or local environment:

```ts
import { Synapse } from "@filoz/synapse-sdk";
import { privateKeyToAccount } from "viem/accounts";

const privateKey = process.env.FOC_PRIVATE_KEY;

if (!privateKey) {
  throw new Error("FOC_PRIVATE_KEY is required");
}

const account = privateKeyToAccount(privateKey as `0x${string}`);

const synapse = Synapse.create({
  account,
  source: "my-app",
});
```

For a browser app, connect to the user's wallet:

```ts
import { Synapse } from "@filoz/synapse-sdk";
import { custom } from "viem";
import "viem/window";

const [address] = await window.ethereum!.request({
  method: "eth_requestAccounts",
});

const synapse = Synapse.create({
  account: address,
  transport: custom(window.ethereum!),
  source: "my-app",
});
```

To switch either snippet to Mainnet, import `mainnet` and pass it to `Synapse.create`:

```ts
import { Synapse, mainnet } from "@filoz/synapse-sdk";

const synapse = Synapse.create({
  account,
  source: "my-app",
  chain: mainnet,
});
```

The `source` value identifies your application in FOC metadata, which helps separate data sets created by different apps using the same wallet.

## Prepare storage payments

FOC storage uses USDFC for storage payments. The `prepare()` call calculates the amount needed for a planned upload and returns a transaction when funding or approval is required.

FOC uploads must be at least 127 bytes. The sample payload below is padded to satisfy that minimum.

```ts
const file = new TextEncoder().encode(
  "Welcome to decentralized storage on Filecoin Onchain Cloud. This example is padded so it satisfies the minimum upload size for this quickstart."
);

const prep = await synapse.storage.prepare({
  dataSize: BigInt(file.byteLength),
});

if (prep.transaction) {
  const { hash } = await prep.transaction.execute();
  console.log(`Account funded and approved: ${hash}`);
}
```

For current rates and payment behavior, check the [FOC pricing and storage-cost documentation](https://docs.filecoin.cloud/).

## Upload data

Upload bytes to FOC storage:

```ts
const { pieceCid, size, complete, copies, failedAttempts } =
  await synapse.storage.upload(file);

console.log(`PieceCID: ${pieceCid}`);
console.log(`Size: ${size} bytes`);
console.log(`Stored on ${copies.length} providers`);

if (!complete) {
  console.warn(`${failedAttempts.length} copy attempt(s) failed`);
}
```

FOC stores data across providers and tracks the data by PieceCID. Keep the PieceCID in your application database so you can retrieve the data later.

## Download data

Download the stored bytes with the PieceCID:

```ts
const bytes = await synapse.storage.download({ pieceCid });
const text = new TextDecoder().decode(bytes);

console.log(text);
```

## Next steps

* Read the full [Synapse SDK guide](https://docs.filecoin.cloud/developer-guides/synapse).
* Learn how FOC works in the [architecture guide](https://docs.filecoin.cloud/core-concepts/architecture).
* Review [storage operations](https://docs.filecoin.cloud/developer-guides/storage/storage-operations) for data set management and lifecycle operations.
* Review [payment operations](https://docs.filecoin.cloud/developer-guides/payments/payment-operations) for funding and payment rails.
* Use [Filecoin Pin](../cookbook/filecoin-pin/README.md) if you want a CLI-oriented pinning workflow.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/filecoin-onchain-cloud/synapse-quickstart)
