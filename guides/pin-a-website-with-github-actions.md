---
description: >-
  Upload your website's build output to Filecoin on every push or pull request with the Filecoin Pin Upload Action.
---

# Pin a website with GitHub Actions

**The Filecoin Pin Upload Action packs a folder, such as your site's `dist`, and uploads it to Filecoin from CI.** Each run returns an IPFS Root CID you can open in any IPFS gateway.

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me add the Filecoin Pin Upload Action to my repository by following this page:
https://docs.filecoin.io/guides/pin-a-website-with-github-actions.md

1. Use the Calibration testnet until I tell you to use mainnet.
2. I'll add the wallet key as a repository secret myself. Never ask me to paste a private key or seed phrase.
3. Run the steps in order, and check each one worked before you go on.
4. If a step fails, stop and tell me which step and what happened.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* A GitHub repository that builds a static site
* A wallet with FIL for transaction fees and USDFC for storage. See [Networks and tokens](#networks-and-tokens)
* The wallet's private key saved as a repository secret named `FILECOIN_WALLET_KEY`. Use a wallet only for this, without other funds
{% endhint %}

## Networks and tokens

The action uses mainnet by default. To test, set `network: calibration`. Calibration is for testing only. Don't keep anything there that you need.

| Network | FIL, for transaction fees | USDFC, for storage |
| --- | --- | --- |
| Calibration testnet | Free from the [Calibration faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html) | Free from the [tUSDFC faucet](https://forest-explorer.chainsafe.dev/faucet/calibnet_usdfc) |
| Mainnet | Buy on an exchange, or bridge with [Squid Router](https://app.squidrouter.com) | Swap with [Squid Router](https://app.squidrouter.com), or mint on [usdfc.net](https://app.usdfc.net) |

## Fund your account

Storage is paid from a USDFC deposit in Filecoin Pay. About 5 USDFC is enough to start.

In the [Filecoin Pay Console](https://pay.filecoin.cloud/console), use **Add Service** to approve Warm Storage and deposit USDFC in one transaction. Or let the action top up for you: set `minRunwayDays`, and it deposits from the wallet when the balance drops below that many days. Without it, the action makes no deposits.

If an upload costs more than your balance, the job fails. See [Fund storage](../store-data/warm-storage/fund-storage.md).

## Step 1: Add the build workflow

This workflow builds the site and saves it as an artifact. It never sees the wallet key. Save it as `.github/workflows/build.yml`:

```yaml
name: Build PR Content
on:
  pull_request:
    types: [opened, synchronize, reopened]
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.event.pull_request.head.sha || github.sha }}
      - name: Build
        run: npm ci && npm run build   # your build command
      - uses: actions/upload-artifact@v4
        with:
          name: site-dist
          path: dist
          retention-days: 1
```

## Step 2: Add the upload workflow

This workflow runs after the build, downloads the artifact, and uploads it. Save it as `.github/workflows/upload-to-filecoin.yml`:

```yaml
name: Upload to Filecoin
on:
  workflow_run:
    workflows: ["Build PR Content"]
    types: [completed]
jobs:
  upload:
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: ubuntu-latest
    permissions:
      contents: read
      actions: read
      checks: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with:
          name: site-dist
          path: dist
          github-token: ${{ github.token }}
          repository: ${{ github.event.workflow_run.repository.full_name }}
          run-id: ${{ github.event.workflow_run.id }}
      - uses: filecoin-project/filecoin-pin/upload-action@v2.3.0
        with:
          path: dist
          walletPrivateKey: ${{ secrets.FILECOIN_WALLET_KEY }}
          network: mainnet
          minRunwayDays: "30"
          maxBalance: "0.25"
```

* `minRunwayDays`: the action tops up your Filecoin Pay balance to cover at least this many days of storage.
* `maxBalance`: the most USDFC the action will ever deposit up to. Set it whenever you set `minRunwayDays`.

Keep both values in the workflow file. The upload workflow runs from `main`, so a pull request can't change them.

## Step 3: Check it worked

Open a pull request. The action:

* adds a check and a PR comment with the IPFS Root CID, data set ID, piece CID, and a preview link
* publishes `upload.car` and `context.json` as run artifacts

Open the site at `https://inbrowser.link/ipfs/<root-cid>`, or in any IPFS gateway.

## Options

| Input | What it does |
| --- | --- |
| `network` | `mainnet` (default) or `calibration` for testing |
| `dryRun` | Runs everything except the upload |
| `dataSetIds` | Adds the upload to existing data sets instead of a new one |
| `path` ending in `.car` | Uploads a CAR you built yourself, as is |

Outputs: `ipfsRootCid`, `dataSetId`, `pieceCid`, `providerId`, `providerName`, `carPath`, `uploadStatus`. See the full list in [action.yml](https://github.com/filecoin-project/filecoin-pin/blob/master/upload-action/action.yml).

## Limits and security

* Pull requests from forks are blocked, so outside contributors can't spend your funds.
* Pin the action to a release tag, such as `@v2.3.0`, or a commit SHA. Avoid `@master` in production.
* Never use `pull_request_target`. Protect `main` with required reviews.
* For one-person or fully trusted repositories, a single workflow that builds and uploads also works. See [single-workflow](https://github.com/filecoin-project/filecoin-pin/tree/master/upload-action/examples/single-workflow).

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Not enough USDFC | The job fails. Deposit in the Filecoin Pay Console, or add USDFC to the wallet, then re-run the job. See [Fund storage](../store-data/warm-storage/fund-storage.md) |
| A new link returns 404 | Wait a few minutes, then try again |
| No proofs yet | The first proof can take up to 24 hours |

For other errors, see [Errors and troubleshooting](../store-data/resources/errors-and-troubleshooting.md).

## Next steps

* [Host a static website](host-a-static-website.md)
* [Monitor balance and proofs](../store-data/warm-storage/monitor-balance-and-proofs.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides/pin-a-website-with-github-actions)
