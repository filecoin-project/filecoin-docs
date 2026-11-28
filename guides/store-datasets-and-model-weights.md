---
description: >-
  Store a training dataset or a set of model weights on Filecoin with the Filecoin CLI, check the cost first, and download a verified copy later.
---

# Store datasets and model weights

**Store a dataset folder or model weight files with the Filecoin CLI, and download a checked copy at any time.** Each upload returns an ID and a link to share.

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me store a dataset or model weights on Filecoin by following this page:
https://docs.filecoin.io/guides/store-datasets-and-model-weights.md

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
* Files of 127 bytes to 63.5 GiB each. A folder counts as one upload
{% endhint %}

## Networks and tokens

The Filecoin CLI uses the Calibration testnet by default. Add `--network mainnet` to use mainnet. Calibration is for testing only. Don't keep anything there that you need.

| Network | FIL, for transaction fees | USDFC, for storage |
| --- | --- | --- |
| Calibration testnet | Free from the [Calibration faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html) | Free from the [tUSDFC faucet](https://forest-explorer.chainsafe.dev/faucet/calibnet_usdfc) |
| Mainnet | Buy on an exchange, or bridge with [Squid Router](https://app.squidrouter.com) | Swap with [Squid Router](https://app.squidrouter.com), or mint on [usdfc.net](https://app.usdfc.net) |

## Install and log in

```sh
npm install -g filecoin
filecoin login
```

`login` prints a link. Open it, connect your wallet, and approve the session key. The key can store data but can't move your funds.

## Fund your account

Storage is paid from a USDFC deposit in Filecoin Pay. About 5 USDFC is enough to start. Check your balance:

```sh
filecoin status
```

If your balance is low, the output includes a link to add funds. If an upload costs more than your balance, it stops with `insufficient_funds` and the same link. See [Fund storage](../store-data/warm-storage/fund-storage.md).

## Step 1: Check the size and cost

```sh
filecoin put ./my-dataset --dry-run
```

This shows the size, provider, and cost, and stores nothing. If the cost is more than your balance, add funds first. See [Fund storage](../store-data/warm-storage/fund-storage.md).

Split files larger than 63.5 GiB first. Many model releases already ship as shard files, so upload each shard. For 1 TiB or more that you rarely read, see [Archive large datasets](archive-large-datasets.md).

## Step 2: Upload

```sh
filecoin put ./my-dataset                          # a folder
filecoin put ./weights/model-00001.safetensors     # one file
```

A folder is packed into one CAR file. Dotfiles are skipped, and symlinks aren't allowed. Each upload returns a `res_` reference, `urls.browser` (a link to share), and `urls.piece` (the exact stored bytes). Save each reference and PieceCID with your project.

## Step 3: Resume an interrupted upload

```sh
filecoin operations ls --incomplete
filecoin operations resume op_…
```

A resumed upload never stores or charges twice. If the source changed, it stops with `source_changed`. Start a new `put`.

## Step 4: Check it worked

```sh
filecoin ls
filecoin inspect res_… --check
```

## Step 5: Download a verified copy

```sh
filecoin get res_… --output ./restored
```

`get` checks every byte against the PieceCID and unpacks folders. If anything doesn't match, it keeps nothing.

## Keep it private

The Filecoin CLI stores files as they are, so anyone with the ID can download them. To encrypt, use Filecoin Pin instead. It encrypts on your machine before uploading:

```sh
npm install -g filecoin-pin
filecoin-pin login --scopes createDataSet,addPieces,encrypt
filecoin-pin add ./my-dataset --encrypt
```

An encrypted upload holds up to about 1 GiB, so this suits small datasets. You can also encrypt files yourself before you run `filecoin put`. See [Security, privacy and data location](../store-data/overview/security-privacy-and-data-location.md).

## Good to know

* **One copy.** The Filecoin CLI stores each upload with one provider. The Filecoin SDK stores two by default. See [Filecoin SDK](../store-data/tools/filecoin-sdk.md).
* **Keep it funded.** Files stay stored while your balance pays for them. See [Monitor balance and proofs](../store-data/warm-storage/monitor-balance-and-proofs.md).
* **Agents** with the [Filecoin Skill](../agents/filecoin-skill/README.md) run the same commands.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Not enough USDFC | The upload stops and shows how to add funds. Deposit, then run the command again. See [Fund storage](../store-data/warm-storage/fund-storage.md) |
| A new link returns 404 | Wait a few minutes, then try again |
| No proofs yet | The first proof can take up to 24 hours |
| `source_changed` | The files changed during an upload. Run a new `filecoin put` |

For other errors, see [Errors and troubleshooting](../store-data/resources/errors-and-troubleshooting.md).

## Next steps

* [Upload data](../store-data/warm-storage/upload-data.md)
* [Pricing](../store-data/overview/pricing.md)
* [Keep verifiable agent records](keep-verifiable-agent-records.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides/store-datasets-and-model-weights)
