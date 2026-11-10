---
description: >-
  Archive a dataset of 1 TiB or more with the Filecoin Cold Storage Service: choose your terms, store, monitor, and retrieve.
---

# Archive large datasets

**Archive a large dataset that you rarely read with the Filecoin Cold Storage Service (FCSS).** You set the deal terms, providers store sealed copies, and they're paid only while they meet those terms.

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me archive a large dataset with Filecoin cold storage by following this page:
https://docs.filecoin.io/guides/archive-large-datasets.md

1. This guide runs on mainnet and spends real tokens. Tell me the cost before each paid step.
2. Send me any approval or funding link, then wait for me. Never ask me for a private key or seed phrase.
3. Run the steps in order, and check each one worked before you go on.
4. If a step fails, stop and tell me which step and what happened.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* A dataset of 1 TiB or more
* A bucket you control that can serve files publicly, such as S3, Cloudflare R2, or Google Cloud Storage
* A wallet on mainnet with FIL and USDFC. See [Networks and tokens](#networks-and-tokens)
{% endhint %}

## Networks and tokens

FCSS runs on mainnet only. Every step spends real tokens. Calibration is for testing only. Don't keep anything there that you need.

| Network | FIL, for transaction fees | USDFC, for storage |
| --- | --- | --- |
| Calibration testnet | Free from the [Calibration faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html) | Free from the [tUSDFC faucet](https://forest-explorer.chainsafe.dev/faucet/calibnet_usdfc) |
| Mainnet | Buy on an exchange, or bridge with [Squid Router](https://app.squidrouter.com) | Swap with [Squid Router](https://app.squidrouter.com), or mint on [usdfc.net](https://app.usdfc.net) |

## Fund your account

FCSS deals are paid in USDFC through Filecoin Pay. How you deposit depends on the way you store: the client app, the agent skill, or the CLI. See [Cold storage for archival data](../store-data/cold-storage/cold-storage-for-archival-data.md).

## Step 1: Decide your terms

| Term | What you choose |
| --- | --- |
| Duration | 6 months or more |
| Price | Per TiB per month |
| Retrievability, bandwidth, latency | The service levels providers must meet |
| IPNI indexing | Whether the data is findable by CID |
| Access | Public, or private to you and wallets you approve |

See [Pricing](../store-data/overview/pricing.md) for cold storage prices.

## Step 2: Store the dataset

Pick one way, then follow its steps in [Cold storage for archival data](../store-data/cold-storage/cold-storage-for-archival-data.md):

| Way | Best for |
| --- | --- |
| [FCSS client app](https://clients.fcss.fidl.tech) | A guided web flow |
| `fcss-client` agent skill | Letting an AI agent prepare, upload, and propose the deals |
| PoRep Market CLI | Scripting and full control of deal terms |

Only the `ACTIVE` deal state means the data is stored.

## Step 3: Monitor

Check deal status and proofs in the client app, on the [dataset dashboards](https://status.fcss.fidl.tech), or with `client get-deals` in the CLI.

If a provider stops delivering, start a repair from the client app or the CLI. It moves the dataset to a new provider automatically.

## Step 4: Retrieve

```sh
retrieval-client fetch --filpay-private-key-file ./client.key --cid <pieceCid> --out-dir ./downloads
```

Pieces are free or paid. Add `--dry-run` to see prices first. With the client app, one full-dataset retrieval a year is free.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| A deal isn't `ACTIVE` | Wait for the provider to seal and prove it. Check its state with `client get-deals` |
| A provider stops meeting its terms | Start a repair from the client app or the CLI |

For other errors, see [Cold storage for archival data](../store-data/cold-storage/cold-storage-for-archival-data.md).

## Next steps

* [Cold storage for archival data](../store-data/cold-storage/cold-storage-for-archival-data.md)
* [Keep immutable, auditable records](keep-immutable-auditable-records.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides/archive-large-datasets)
