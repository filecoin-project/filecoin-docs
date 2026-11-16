---
description: >-
  Seal and store clients' large datasets through the Filecoin Cold Storage
  Service (FCSS), and get paid in USDFC.
---

# Provide archival storage (FCSS)

**Archival storage is sealed storage of client datasets, usually 1 TiB and up.** It runs through the **Filecoin Cold Storage Service (FCSS)**, part of Filecoin Cloud. You don't need to find clients: the PoRep Market matches them to you. The data is sealed into your sectors, so it also counts toward your storage power and block rewards.

## How it works

1. A client proposes a deal on the PoRep Market with its terms: how long, the price, how often the data must be downloadable, and how fast.
2. The market matches the deal to an offer you publish.
3. You download the data, seal it, and keep a copy ready to download.
4. While the deal runs, Filecoin Pay pays you in USDFC based on how well you meet its terms.

## Tools you'll use

| Tool | What it does |
| --- | --- |
| Curio storage market | Takes the deal data, seals it and serves downloads |
| [PoRep Market](https://github.com/fidlabs/porep-market) | Matches client deals to provider offers |
| [PoRep Market CLI](https://github.com/fidlabs/filecoin-porep-market-tooling) | Registers your miner, publishes offers, downloads deal data and withdraws payments |
| [FCSS provider directory](https://peertopool.fidl.tech/directory) | Lists approved providers |
| [`sp-proxy`](https://github.com/fidlabs/large-paid-retrievals#for-storage-providers) | Optional. Charges clients for downloads |

## Before you start

* A running sealing cluster with Curio's storage market on, reachable at `https://<your-domain>` from outside. See [Build a sealing cluster](build-a-sealing-cluster.md), Steps 1 to 10.
* Disk for a ready-to-download copy of client data.
* Bandwidth to download large datasets, often many TiB, and to serve downloads.
* Python 3.10 or newer and `aria2` (`sudo apt install aria2`) on the machine that downloads deal data.

FCSS runs on **Mainnet only**. Test your cluster on Calibration Testnet first, then join FCSS with your Mainnet miner.

## Step 1: Register and pass KYC

Register your organization at [peertopool.fidl.tech](https://peertopool.fidl.tech/): your name, server locations, miner IDs, and the client regions you accept. Finish the identity check (KYC) it emails you. Once approved, you're listed in the FCSS provider directory. The CLI can't register your miner until this is done.

## Step 2: Create a controller wallet

Don't use your owner or worker wallet. Create a separate wallet, fund it with a little FIL for gas, and add it as a control address of each miner you'll use. The market checks this to confirm you may act for the miner.

```sh
lotus wallet new delegated
```

See [Control addresses](https://lotus.filecoin.io/storage-providers/operate/addresses/#control-addresses) for how to add it to your miner.

## Step 3: Install the PoRep Market CLI

```sh
git clone https://github.com/fidlabs/filecoin-porep-market-tooling
cd filecoin-porep-market-tooling
python3 -m pip install -r requirements.txt
cp .env.mainnet .env
chmod 600 .env
```

Export the controller wallet's private key:

```sh
lotus wallet export <controller-address> | xxd -r -p | jq -r '.PrivateKey' | base64 -d | xxd -p -c 32 | sed 's/^/0x/'
```

In `.env`, set `SP_PRIVATE_KEY` to that key (with the `0x` prefix, not the wallet address) and set `SP_ORGANIZATION`.

## Step 4: Register your miner and publish an offer

Register each miner with the space you'll give FCSS and the address that receives payments:

```sh
python3 ./porep_tooling_cli.py sp register-sp <f0-miner-id> --available-capacity <capacity> --payee-address <payee-address>
```

Then publish an offer. It sets which deals the market may match to you: deal size, length, your lowest price per TiB per month, and the download speed, delay and reliability you promise. Run `sp register-offer --help` for every option. Deals last at least 6 months and use 32 GiB sectors only.

Check what you published with `sp get-sps` and `sp get-offers`.

## Step 5: Onboard deals

List the deals matched to you, then download and seal one:

```sh
python3 ./porep_tooling_cli.py sp get-deals ACCEPTED
python3 ./porep_tooling_cli.py sp onboard-data <deal-id> --output-dir /mnt/fcss-downloads --port 443 --claim-allocations curio
```

`onboard-data` downloads every piece of the deal and hands each one to Curio to seal. Track progress with `sp get-allocations <deal-id>` and `sp get-claims`.

## Step 6: Serve downloads

Keep a ready-to-download copy of every FCSS piece. Curio serves it at `https://<your-domain>/piece/<pieceCid>`. FCSS measures your download reliability, speed and delay against each deal's terms, and your pay depends on them.

To charge for downloads, put `sp-proxy` in front of Curio. It quotes a price per piece and takes payment through Filecoin Pay before it serves the data. Private deals are served only to the client and the wallets it allows.

## Step 7: Get paid

Payments for each deal build up in Filecoin Pay and settle to your payee address. Check and withdraw them:

```sh
python3 ./porep_tooling_cli.py sp get-filecoinpay-account
python3 ./porep_tooling_cli.py sp withdraw-from-filecoinpay --help
```

## Keep it running

* Onboard newly matched deals quickly.
* Test downloads from outside your network. Your pay depends on them.
* Keep your offered space current with `sp register-sp` and `sp set-offer-active`.
* Follow the day-two checklist in [Build a sealing cluster](build-a-sealing-cluster.md#day-two-checklist).

## Next steps

* [Payouts and withdrawals](payouts-and-withdrawals.md)
* [Monitor proofs and faults](monitor-proofs-and-faults.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/provide-storage/provide-archival-storage)
