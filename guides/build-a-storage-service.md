---
description: >-
  What a storage service needs, and how to build its storage backend on Filecoin Cloud with the Filecoin SDK.
---

# Build a storage service

**A storage service is more than storage: it needs accounts, billing, a frontend, support, and monitoring around it.** This guide lists those parts, then covers one of them in depth: the storage backend, which stores your customers' files on Filecoin Cloud with the Filecoin SDK.

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me build the storage backend for my storage service on Filecoin Cloud by following this page:
https://docs.filecoin.io/guides/build-a-storage-service.md

1. Use the Calibration testnet until I tell you to use mainnet.
2. Send me any approval or funding link, then wait for me. Never ask me for a private key or seed phrase.
3. Run the steps in order, and check each one worked before you go on.
4. If a step fails, stop and tell me which step and what happened.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* Node.js 24 or newer
* A backend service that can run TypeScript or JavaScript
* A wallet with FIL for transaction fees and USDFC for storage. See [Networks and tokens](#networks-and-tokens)
{% endhint %}

## What a storage service needs

Plan these parts before you build. Filecoin Cloud is the storage layer; you build or choose the rest:

| Part | What it covers | Examples |
| --- | --- | --- |
| Business | Pricing, terms of service, privacy policy, and support | Your own policies and help desk |
| Accounts and billing | Sign-up, login, plans, and charging customers | An auth provider, and a billing tool or [Filecoin Pay](charge-your-customers-with-filecoin-pay.md) |
| Frontend | The web or mobile app your customers use | A React or Next.js app |
| API | Takes files from the frontend and passes them to storage | Your own server or serverless functions |
| Storage backend | Stores, serves, and deletes files | **This guide:** the Filecoin SDK |
| Operations | Errors, balance alerts, and uptime | Your monitoring and alerting tools |

How the parts connect: a customer uploads a file in your frontend. The frontend sends it to your API. Your API checks the customer's account, then stores the file with the Filecoin SDK and saves the result in your database.

## Choose a billing model

Decide who pays Filecoin Cloud: you or each customer.

|  | You pay | Each customer pays |
| --- | --- | --- |
| Wallet | One platform wallet | Each customer's own wallet |
| Funding | You fund one Filecoin Pay account | Customers fund their own |
| How your app uploads | With your platform wallet | With a session key each customer approves |
| You bill customers | Your own way, or with Filecoin Pay | Not needed for storage |

## Networks and tokens

The Filecoin SDK works on mainnet and the Calibration testnet. Choose one when you set it up. Calibration is for testing only. Don't keep anything there that you need.

| Network | FIL, for transaction fees | USDFC, for storage |
| --- | --- | --- |
| Calibration testnet | Free from the [Calibration faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html) | Free from the [tUSDFC faucet](https://forest-explorer.chainsafe.dev/faucet/calibnet_usdfc) |
| Mainnet | Buy on an exchange, or bridge with [Squid Router](https://app.squidrouter.com) | Swap with [Squid Router](https://app.squidrouter.com), or mint on [usdfc.net](https://app.usdfc.net) |

## Fund your account

Storage is paid from a USDFC deposit in Filecoin Pay. See [Fund storage](../store-data/warm-storage/fund-storage.md) for how to deposit with the SDK, the Filecoin CLI, or the console. If an upload costs more than your balance, it fails. Monitor your balance and alert before it runs out: see [Monitor balance and proofs](../store-data/warm-storage/monitor-balance-and-proofs.md).

## Step 1: Set up the SDK

See [Filecoin SDK](../store-data/tools/filecoin-sdk.md). On a server, use a session key, not the wallet key: it can store and delete data but can't move funds. See [Delegate access with session keys](../store-data/warm-storage/delegate-access-with-session-keys.md).

## Step 2: Keep each customer's files together

Tag uploads with metadata. Uploads with the same metadata go into the same data sets:

```ts
await synapse.storage.upload(data, {
  metadata: { customer: "cust-42" },
  pieceMetadata: { filename: "invoice.pdf" },
})
```

Each data set has a monthly fee, per copy. One data set per customer is simple, but costs that fee for every customer. Grouping customers costs less. See [Pricing](../store-data/overview/pricing.md).

Limits: 10 metadata pairs per data set, 5 per file. Keys can be up to 32 characters, values up to 128.

## Step 3: Track uploads in your database

Save each upload's PieceCID, data set IDs, and the customer it belongs to. You need them to serve, check, and delete files.

## Step 4: Serve, delete, and monitor

* **Serve:** `synapse.storage.download({ pieceCid })` checks the bytes. See [Retrieve data](../store-data/warm-storage/retrieve-data.md).
* **Delete:** see [Manage data sets](../store-data/warm-storage/manage-data-sets.md).
* **Monitor** your balance and alert before it runs out. See [Monitor balance and proofs](../store-data/warm-storage/monitor-balance-and-proofs.md).

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Not enough USDFC | The upload stops and shows how to add funds. Deposit, then run the command again. See [Fund storage](../store-data/warm-storage/fund-storage.md) |
| A new link returns 404 | Wait a few minutes, then try again |
| No proofs yet | The first proof can take up to 24 hours |

For other errors, see [Errors and troubleshooting](../store-data/resources/errors-and-troubleshooting.md).

## Next steps

* [Charge your customers with Filecoin Pay](charge-your-customers-with-filecoin-pay.md)
* [Select providers by region](select-providers-by-region.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides/build-a-storage-service)
