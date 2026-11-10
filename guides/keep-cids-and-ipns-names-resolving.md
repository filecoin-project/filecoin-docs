---
description: >-
  What keeps content stored with Filecoin Pin findable by its CID on IPFS, what can break it, and how to check.
---

# Keep CIDs and IPNS names resolving

**Content stored with Filecoin Pin stays findable by its CID because storage providers announce it to IPNI, the index that IPFS gateways and tools use to find who holds a CID.** Keep those announcements alive and your CIDs keep resolving.

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me check that my Filecoin Pin CIDs still resolve by following this page:
https://docs.filecoin.io/guides/keep-cids-and-ipns-names-resolving.md

1. Use the Calibration testnet until I tell you to use mainnet.
2. Send me any approval or funding link, then wait for me. Never ask me for a private key or seed phrase.
3. Run the steps in order, and check each one worked before you go on.
4. If a step fails, stop and tell me which step and what happened.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* Node.js 24 or newer
* Content stored with Filecoin Pin, and its Root CID. See [Host a static website](host-a-static-website.md)
* The Filecoin Pin CLI: `npm install -g filecoin-pin`
{% endhint %}

## What keeps a CID resolving

* **The data set is live.** Keep your balance funded. If the service ends, the provider removes the data. See [Monitor balance and proofs](../store-data/warm-storage/monitor-balance-and-proofs.md).
* **The piece isn't deleted.** Deleting a piece makes the provider announce that its CIDs are gone. See [Manage data sets](../store-data/warm-storage/manage-data-sets.md).
* **A provider is online.** If a provider stays offline for 7 days, the index drops its CIDs. A second copy with another provider keeps them resolving.

## Step 1: Check a CID

Download it and check every block:

```sh
filecoin-pin get <root-cid> ./check
```

Or ask a gateway:

```sh
curl -sL -o /dev/null -w "%{http_code}\n" "https://trustless-gateway.link/ipfs/<root-cid>"
```

`200` means it resolves.

## Step 2: Keep two copies

Filecoin Pin stores two copies by default. Don't lower it with `--copies` for content that must keep resolving.

## Why a new or changed CID can look missing

The main index, cid.contact, caches answers:

* **Misses are cached for minutes.** Checking a CID before its announcement is processed can make it look missing for a while. Wait for the upload to finish before you check.
* **Hits are cached for hours.** A CID can show a provider for hours after that provider stopped serving it.

## IPNS names

Filecoin Pin doesn't create or update IPNS names. If you use one, point it at the Root CID you stored, and update it each time you store a new version. The CID itself keeps resolving as long as the steps above hold.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| A CID stopped resolving | Check your balance with `filecoin-pin payments status`, and check the data set with `filecoin-pin data-set show <data-set-id>`. See [Monitor balance and proofs](../store-data/warm-storage/monitor-balance-and-proofs.md) |
| A new link returns 404 | Wait a few minutes, then try again |
| No proofs yet | The first proof can take up to 24 hours |

For other errors, see [Errors and troubleshooting](../store-data/resources/errors-and-troubleshooting.md).

## Next steps

* [Migrate pinned data with ipfs2foc](migrate-pinned-data-with-ipfs2foc.md)
* [Monitor balance and proofs](../store-data/warm-storage/monitor-balance-and-proofs.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides/keep-cids-and-ipns-names-resolving)
