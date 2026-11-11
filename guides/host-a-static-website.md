---
description: >-
  Upload a static site's build folder to Filecoin and open it at an IPFS link, with the Filecoin Pin CLI.
---

# Host a static website

**Upload your site's build folder with Filecoin Pin, and open it at `https://inbrowser.link/ipfs/<root-cid>`.** This works for static sites only: there's no server to run code.

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me host my static website on Filecoin by following this page:
https://docs.filecoin.io/guides/host-a-static-website.md

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
* A site that builds to a folder of static files, such as `dist` or `build`
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
filecoin-pin login
```

`login` prints a link. Open it, connect your wallet, and approve the session key. The key can store data but can't move your funds.

## Fund your account

Storage is paid from a USDFC deposit in Filecoin Pay. About 5 USDFC is enough to start.

In the [Filecoin Pay Console](https://pay.filecoin.cloud/console), use **Add Service** to approve Warm Storage and deposit USDFC in one transaction. Check your balance at any time:

```sh
filecoin-pin payments status
```

If an upload costs more than your balance, it stops and shows a link to add funds. See [Fund storage](../store-data/warm-storage/fund-storage.md).

## Step 1: Build the site

```sh
npm run build
```

Upload the folder, not a zip. A folder keeps its structure, so every file has its own link.

## Step 2: Upload the folder

```sh
filecoin-pin add ./dist
```

The output includes the **Root CID**. The site is stored with two providers.

## Step 3: Open the site

```
https://inbrowser.link/ipfs/<root-cid>
https://inbrowser.link/ipfs/<root-cid>/about.html
```

Any IPFS gateway also works. A new link can take a few minutes to start working.

## Step 4: Publish updates

A CID is made from the content, so every new build gets a new Root CID and a new link. To keep one address that always points to the latest build, point an ENS name at the newest CID. See the [Filecoin Pin + ENS demo](https://github.com/FIL-Builders/filecoin-pin-ens-demo).

To upload on every push, see [Pin a website with GitHub Actions](pin-a-website-with-github-actions.md).

## Use an agent instead

With the [`publish` skill](../agents/filecoin-skill/skills-catalog/publish.md) installed, ask: "publish ./dist". The agent returns the same `inbrowser.link` link.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Not enough USDFC | The upload stops and shows how to add funds. Deposit, then run the command again. See [Fund storage](../store-data/warm-storage/fund-storage.md) |
| A new link returns 404 | Wait a few minutes, then try again |
| No proofs yet | The first proof can take up to 24 hours |

For other errors, see [Errors and troubleshooting](../store-data/resources/errors-and-troubleshooting.md).

## Next steps

* [Pin a website with GitHub Actions](pin-a-website-with-github-actions.md)
* [Keep CIDs and IPNS names resolving](keep-cids-and-ipns-names-resolving.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides/host-a-static-website)
