---
description: >-
  The Filecoin Cold Storage Service (FCSS) preserves large datasets as sealed,
  verifiable copies with storage providers, under deals with service-level
  terms that the client sets.
keywords: "Filecoin cold storage, FCSS, archival storage, PoRep Market, data preservation, Singularity, paid retrievals"
---

# Filecoin Cold Storage Service

The Filecoin Cold Storage Service (FCSS) is the cold storage service of [Filecoin Onchain Cloud](README.md), next to the Filecoin Warm Storage Service (FWSS). It gives clients verifiable, off-site preservation for datasets of 1 TiB and up.

Each dataset is stored as sealed copies with separate storage providers. The client sets the terms of each deal: how long the data is kept, the price, and the service levels the provider must meet for retrievability, bandwidth, latency, and IPNI indexing. Providers prove the data with Proof of Replication (PoRep) and Proof of Spacetime, and are paid in USDFC through Filecoin Pay only while they meet those terms.

## When to use FCSS

FCSS is a good fit when you need:

* **Long-term preservation** of a large dataset, such as research data, media archives, or enterprise backups, that is read rarely.
* **Several independent copies.** FCSS stores two copies with two separate providers by default.
* **Enforceable service levels** written into an on-chain deal, not a vendor's promise.
* **Control over access.** A deal is either public, so anyone can retrieve the data, or private, so only the client and the wallets it authorizes can.

For data that applications read often, use the [Filecoin Warm Storage Service](README.md#choose-a-service) instead.

## How it works

1. **Prepare the dataset.** [Singularity](https://github.com/data-preservation-programs/singularity) packs the raw files into CAR files. Each CAR file is a piece with a PieceCID. A manifest lists every piece in the dataset.
2. **Publish the pieces.** The client uploads the pieces and the manifest to storage it controls, such as an S3, Cloudflare R2, or Google Cloud Storage bucket, so providers can download them. The client's machine can then go offline.
3. **Propose a deal.** The client proposes a deal on the [PoRep Market](https://github.com/fidlabs/porep-market) with the manifest URL and the deal terms. The market matches the deal to a provider offer that meets those terms and reserves the provider's capacity.
4. **Fund the deal.** Once a provider accepts, the client creates the deal's payment rail in Filecoin Pay, deposits USDFC, and allocates DataCap for the data.
5. **Store and prove.** The provider downloads the pieces, seals them into 32 GiB sectors, and claims the allocations. The deal becomes active, and payments start.
6. **Get paid on service levels.** An oracle records each provider's service-level indicators on chain. When the payment rail settles, the deal's validator pays the provider according to how well it met the deal's terms.

DataCap is how the PoRep Market checks that a deal's data is stored today. When [FIP-0118](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0118.md) retires DataCap, new deals move to its replacement, and existing deals keep the mechanism they started with.

## Tools

FCSS has the same kinds of tools as warm storage, for clients, agents, and providers:

| Tool | What it does |
| --- | --- |
| [PoRep Market CLI](https://github.com/fidlabs/filecoin-porep-market-tooling) | Command-line deal making for clients, and onboarding and offer management for providers |
| [FCSS client app](https://TODO-FCSS-CLIENT-UI) | A web app for clients to propose, fund, and track deals |
| [`fcss-client` agent skill](https://github.com/fidlabs/agent-skills/tree/main/fcss-client) | Takes an AI agent from raw data to active deals: it runs Singularity in Docker, prepares and uploads the dataset, and proposes and funds the deals |
| [Dataset dashboards](https://TODO-FCSS-DATASET-DASHBOARDS) | Review each dataset's deals, providers, and storage status |
| SLA dashboards | Track each provider's service levels against the deal terms. Coming soon |
| [Paid retrievals](https://github.com/fidlabs/large-paid-retrievals) | A retrieval client for dataset consumers, and a proxy that lets providers charge per piece through Filecoin Pay |
| [Repairs](https://TODO-FCSS-REPAIRS) | Restores a lost copy of a dataset with a new provider. Fully automated, and triggered manually for now |
| [Provider registration](https://peertopool.fidl.tech/) | Provider sign-up with KYC, and the public [directory of FCSS providers](https://peertopool.fidl.tech/directory) |

## Store a dataset

{% hint style="warning" %}
**FCSS runs on Filecoin mainnet.** Proposing a deal, allocating DataCap, and depositing USDFC all spend real FIL and USDFC.
{% endhint %}

You need:

* A dataset of 1 TiB or more.
* A bucket you control that can serve the pieces publicly, such as AWS S3, Cloudflare R2, Google Cloud Storage, or another S3-compatible service.
* A wallet with FIL for gas and USDFC to pay for storage. A Lotus wallet keeps the private key out of the tooling.

{% tabs %}
{% tab title="AI agent" %}
The `fcss-client` skill needs only Docker, Docker Compose, git, Python 3.10 or newer, curl, and jq. It installs Singularity, the PoRep Market CLI, and rclone on its own. Add it to your agent, then ask the agent to store your dataset on Filecoin cold storage:

```sh
npx skills add fidlabs/agent-skills --skill fcss-client
```

The agent prepares and uploads the dataset, shows you the cost of the deals, and proposes them only after you agree. It never asks for your private key: you configure the wallet yourself.
{% endtab %}

{% tab title="CLI" %}
Prepare the dataset with Singularity and publish the pieces and manifest first. Then install the [PoRep Market CLI](https://github.com/fidlabs/filecoin-porep-market-tooling), which needs Python 3.10 or newer:

```sh
git clone https://github.com/fidlabs/filecoin-porep-market-tooling
cd filecoin-porep-market-tooling
python3 -m pip install -r requirements.txt
cp .env.mainnet .env
```

Set your wallet in `.env`, then propose a deal, initialize its payment rail, and allocate DataCap:

```sh
python3 ./porep_tooling_cli.py client propose-deal <manifest-url> \
  --price-per-tib-per-month <usdfc> --duration-months <months> \
  --retrievability-pct <pct> --bandwidth-mbps <mbps> --latency-ms <ms> \
  --indexing-pct <pct> --deal-type <public|private>
python3 ./porep_tooling_cli.py client init-deal <deal-id>
python3 ./porep_tooling_cli.py client make-allocations <deal-id>
```

Every transaction asks you to confirm before it is sent. Repeat for a second copy with another provider.
{% endtab %}

{% tab title="Web app" %}
Open the [FCSS client app](https://TODO-FCSS-CLIENT-UI), connect your wallet, and follow the steps to propose and fund a deal for your published manifest.
{% endtab %}
{% endtabs %}

## Retrieve a dataset

Providers serve FCSS data from an unsealed copy over HTTP, one piece at a time. A piece can be free or paid:

* A free piece downloads directly.
* A paid piece returns `402 Payment Required` with a price in USDFC. The client pays once per piece through Filecoin Pay, then downloads it.

[`retrieval-client`](https://github.com/fidlabs/large-paid-retrievals#for-dataset-consumers) finds the providers that store each piece, compares their prices, pays when needed, and downloads the CAR files. Repeat `--cid` for several pieces:

```sh
retrieval-client fetch --filpay-private-key-file ./client.key --cid <pieceCid> --out-dir ./downloads
```

Add `--dry-run` to see the prices without paying. Anyone can retrieve a public deal's data. Only the client can retrieve a private deal's data, unless it signs a retrieval voucher for another wallet with `client sign-retrieval-voucher`.

## Monitor and repair

* **Deals and datasets.** `client get-deals` in the CLI, or the [dataset dashboards](https://TODO-FCSS-DATASET-DASHBOARDS), show each deal's state and providers.
* **Service levels.** Each deal's payments already depend on the provider's service levels. SLA dashboards that show them over time are coming soon.
* **Repairs.** If a provider loses a copy, a repair restores it with a new provider. Repairs are fully automated, and are triggered manually for now.

## Provide cold storage

FCSS deals are sealed PoRep deals, so FCSS providers run a PoRep sealing cluster. See [Path D of the storage provider quickstart](../../storage-providers/agent-quickstart.md#path-d) to register, publish offers, and take FCSS deals.

## Learn more

* [PoRep Market contracts](https://github.com/fidlabs/porep-market): deal lifecycle, provider registry, and payment validation
* [PoRep Market CLI](https://github.com/fidlabs/filecoin-porep-market-tooling): client and provider workflows
* [`fcss-client` skill](https://github.com/fidlabs/agent-skills/tree/main/fcss-client)
* [Paid retrievals](https://github.com/fidlabs/large-paid-retrievals): protocol, pricing, and the provider proxy
* [Singularity](https://github.com/data-preservation-programs/singularity): data preparation

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/filecoin-onchain-cloud/fcss)
