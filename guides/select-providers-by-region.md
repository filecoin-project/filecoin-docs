---
description: >-
  Find storage providers by the location they list and store your copies only with them, using the Filecoin Pin CLI or the Filecoin SDK.
---

# Select providers by region

**By default, providers are picked for you. To keep copies in a region, list providers with their location and upload to the ones you choose.**

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me store my data only with providers in a region I choose by following this page:
https://docs.filecoin.io/guides/select-providers-by-region.md

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

## Step 1: List providers and their locations

```sh
filecoin-pin provider ls
```

The table shows each provider's ID, name, location, and service URL. Add `--endorsed` to list only endorsed providers.

Each provider sets its own location when it registers, for example `us-east` or `C=DE;ST=Bavaria;L=Nuremberg`.

## Step 2: Check a provider

```sh
filecoin-pin provider show <id>   # details, including location and price
filecoin-pin provider ping <id>   # is it reachable?
```

## Step 3: Upload to those providers

Each provider you name gets one copy.

**CLI:**

```sh
filecoin-pin add ./data --provider-id 4 --provider-id 9
```

Or set `PROVIDER_IDS=4,9`. In GitHub Actions, set `PROVIDER_IDS` in the step's `env`.

**SDK:**

```ts
await synapse.storage.upload(data, { providerIds: [4n, 9n] })
```

## Step 4: Check where it landed

```sh
filecoin-pin data-set show <data-set-id>
```

The output lists the provider and its location.

## Good to know

* **Uploads can fail** if a provider you name is offline. With automatic selection, the SDK retries other providers. With named providers, it doesn't.
* **Don't combine** provider IDs with data set IDs. Choose one.
* **Location** is set by the provider. See [Security, privacy and data location](../store-data/overview/security-privacy-and-data-location.md).

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Not enough USDFC | The upload stops and shows how to add funds. Deposit, then run the command again. See [Fund storage](../store-data/warm-storage/fund-storage.md) |
| A new link returns 404 | Wait a few minutes, then try again |
| No proofs yet | The first proof can take up to 24 hours |
| An upload to a named provider fails | Run `filecoin-pin provider ping <id>`. If it's down, pick another provider |

For other errors, see [Errors and troubleshooting](../store-data/resources/errors-and-troubleshooting.md).

## Next steps

* [Build a storage service](build-a-storage-service.md)
* [Security, privacy and data location](../store-data/overview/security-privacy-and-data-location.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides/select-providers-by-region)
