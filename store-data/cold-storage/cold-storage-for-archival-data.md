---
description: >-
  The Filecoin Cold Storage Service (FCSS) keeps large datasets, from 1 TiB,
  for the long term.
---

# Cold storage for archival data

**The Filecoin Cold Storage Service (FCSS) keeps large datasets, from 1 TiB, for the long term.** Each dataset is stored as sealed copies with separate storage providers, under a deal whose terms you set: how long, what price, and how quickly data must be retrievable. Providers are paid in USDFC only while they meet those terms.

## When to use it

Use cold storage when you need:

* **Long-term storage** of a large dataset that you rarely read, such as research data, media archives or backups.
* **Service levels you can enforce,** written into an onchain deal rather than a vendor's promise.
* **Control over access.** A deal is either public, so anyone can retrieve the data, or private, so only you and the wallets you approve can.

For data your app reads often, use [warm storage](../warm-storage/upload-data.md).

## How it works

1. **Prepare the dataset.** Pack your files into CAR files, called pieces, with a manifest that lists them. The FCSS client app and the `fcss-client` agent skill do this for you.
2. **Publish the pieces.** Upload the pieces and the manifest to storage you control, such as an S3, Cloudflare R2 or Google Cloud Storage bucket, so providers can download them.
3. **Propose a deal.** Propose a deal on the [PoRep Market](https://github.com/fidlabs/porep-market) with your terms. The market matches it to providers that meet them.
4. **Fund the deal.** Deposit USDFC in Filecoin Pay, and allocate DataCap for the data.
5. **Providers store and prove.** Each provider downloads the pieces, seals them, and proves every day that it still stores them. Payments start.
6. **Providers are paid on service levels.** The better a provider meets your terms, the more of its payment it receives.

## Store a dataset

Cold storage runs on Filecoin mainnet, so every step spends real FIL and USDFC.

You need:

* A dataset of 1 TiB or more.
* A bucket you control that can serve the pieces publicly (S3 or S3-compatible).
* A wallet with FIL for gas and USDFC for storage.

### Agent

Add the `fcss-client` skill to your agent, then ask it to archive your dataset on Filecoin:

```sh
npx skills add fidlabs/agent-skills --skill fcss-client
```

The agent prepares and uploads the dataset, shows you the cost, and proposes deals only after you agree. It never asks for your private key: you set up the wallet yourself. The skill needs Docker, Docker Compose, git, Python 3.10 or newer, curl and jq.

### CLI

Prepare the dataset and publish its pieces and manifest, following the data preparation guide in the [FCSS client app](https://clients.fcss.fidl.tech). Then install the [PoRep Market CLI](https://github.com/fidlabs/filecoin-porep-market-tooling) (Python 3.10 or newer):

```sh
git clone https://github.com/fidlabs/filecoin-porep-market-tooling
cd filecoin-porep-market-tooling
python3 -m pip install -r requirements.txt
cp .env.mainnet .env
```

Set your wallet in `.env`, then propose a deal, set up its payment, and allocate DataCap:

```sh
python3 ./porep_tooling_cli.py client propose-deal <manifest-url> \
  --price-per-tib-per-month <usdfc> --duration-months <months> \
  --retrievability-pct <pct> --bandwidth-mbps <mbps> --latency-ms <ms> \
  --indexing-pct <pct> --deal-type <public|private>
python3 ./porep_tooling_cli.py client init-deal <deal-id>
python3 ./porep_tooling_cli.py client make-allocations <deal-id>
```

The CLI asks you to confirm each transaction. `client get-deals` shows your deals; only `ACTIVE` means the data is stored.

### Web app

1. Create an account in the [FCSS client app](https://clients.fcss.fidl.tech/signup) and verify your identity.
2. Prepare your dataset and publish its manifest, following the app's guide.
3. Review the size and price, then approve the deal from your wallet.
4. Follow deal status and proofs from your dashboard.

## Retrieve a dataset

Providers serve your data over HTTP, one piece at a time. A piece is free or paid:

* A free piece downloads directly.
* A paid piece shows a price in USDFC. You pay once per piece through Filecoin Pay, then download it.

[`retrieval-client`](https://github.com/fidlabs/large-paid-retrievals#for-dataset-consumers) finds the providers, compares prices, pays when needed, and downloads:

```sh
retrieval-client fetch --filpay-private-key-file ./client.key --cid <pieceCid> --out-dir ./downloads
```

Add `--dry-run` to see prices without paying.

## Monitor and repair

* **Deals:** check status and proofs in the client app, the [dataset dashboards](https://status.fcss.fidl.tech), or with `client get-deals`.
* **Repairs:** if a provider stops delivering, start a repair from the client app or the CLI. It moves your dataset to a new provider automatically.

## Pricing

See [Pricing](../overview/pricing.md) and the [FCSS client app](https://clients.fcss.fidl.tech/#pricing).

## Manual storage deals

To make Filecoin storage deals directly, without the PoRep Market, see [Manual storage deals](../../protocol/manual-storage-deals.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/cold-storage/cold-storage-for-archival-data)
