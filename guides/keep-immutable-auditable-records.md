---
description: >-
  Store company records on Filecoin so you can later prove they haven't changed and are still stored, with an onchain trail of proofs and payments.
---

# Keep immutable, auditable records

**Store records such as contracts, logs, or reports on Filecoin.** Each record gets a CID made from its content, so any change is detectable. Storage proofs and payments are recorded onchain, giving auditors a trail they can check without trusting you.

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me store our records on Filecoin so they can be audited by following this page:
https://docs.filecoin.io/guides/keep-immutable-auditable-records.md

1. Use the Calibration testnet until I tell you to use mainnet.
2. Send me any approval or funding link, then wait for me. Never ask me for a private key or seed phrase.
3. Run the steps in order, and check each one worked before you go on.
4. If a step fails, stop and tell me which step and what happened.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* Node.js 24 or newer
* A wallet with FIL for transaction fees and USDFC for storage. See [Networks and tokens](#networks-and-tokens)
{% endhint %}

## Networks and tokens

Filecoin Pin uses mainnet by default. To test, add `--network calibration` to `filecoin-pin login`; later commands use the same network. Calibration is for testing only. Don't keep anything there that you need.

| Network | FIL, for transaction fees | USDFC, for storage |
| --- | --- | --- |
| Calibration testnet | Free from the [Calibration faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html) | Free from the [tUSDFC faucet](https://forest-explorer.chainsafe.dev/faucet/calibnet_usdfc) |
| Mainnet | Buy on an exchange, or bridge with [Squid Router](https://app.squidrouter.com) | Swap with [Squid Router](https://app.squidrouter.com), or mint on [usdfc.net](https://app.usdfc.net) |

## Install and log in

```sh
npm install -g filecoin-pin
filecoin-pin login --scopes createDataSet,addPieces,encrypt
```

`login` prints a link. Open it, connect your wallet, and approve the session key. The `encrypt` scope lets the key encrypt uploads. The key can store data but can't move your funds.

## Fund your account

Storage is paid from a USDFC deposit in Filecoin Pay. About 5 USDFC is enough to start.

In the [Filecoin Pay Console](https://pay.filecoin.cloud/console), use **Add Service** to approve Warm Storage and deposit USDFC in one transaction. Check your balance at any time:

```sh
filecoin-pin payments status
```

If an upload costs more than your balance, it stops and shows a link to add funds. See [Fund storage](../store-data/warm-storage/fund-storage.md).

## Step 1: Store the records, encrypted

```sh
filecoin-pin add ./records-2026-q3 --encrypt
```

Only encrypted bytes leave your machine. Only your wallet, and session keys you grant, can decrypt them. An encrypted upload holds up to about 1 GiB.

## Step 2: Log what you stored

From the output, save the **Root CID**, **Piece CID**, and **data set ID** in your records system, with the date and what the upload contains. That log is what you hand an auditor.

## Step 3: Prove a record hasn't changed

```sh
filecoin-pin get <root-cid> ./audit
```

`get` checks every block against the CID and decrypts with your key. If anything was altered, the download is rejected.

## Step 4: Prove it's still stored

* **CLI:** `filecoin-pin data-set show <data-set-id>` shows the data set's status and pieces.
* **Browser:** look up the Piece CID or data set in [PDP Explorer](https://pdp.filecoin.cloud) to see each proof.

## Step 5: Show the payment trail

Look up your wallet in [Filecoin Pay Explorer](https://pay.filecoin.cloud) to see what was paid to each provider, and when.

## Good to know

* **Keep it funded.** Records stay stored while your balance pays for them. See [Monitor balance and proofs](../store-data/warm-storage/monitor-balance-and-proofs.md).
* **Large, rarely read archives** may fit cold storage better. See [Archive large datasets](archive-large-datasets.md).

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Not enough USDFC | The upload stops and shows how to add funds. Deposit, then run the command again. See [Fund storage](../store-data/warm-storage/fund-storage.md) |
| A new link returns 404 | Wait a few minutes, then try again |
| No proofs yet | The first proof can take up to 24 hours |

For other errors, see [Errors and troubleshooting](../store-data/resources/errors-and-troubleshooting.md).

## Next steps

* [Security, privacy and data location](../store-data/overview/security-privacy-and-data-location.md)
* [Reliability and proofs](../store-data/overview/reliability-and-proofs.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides/keep-immutable-auditable-records)
