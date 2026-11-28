---
description: >-
  Move content you already pinned on IPFS to Filecoin with ipfs2foc, keeping every CID unchanged.
---

# Migrate pinned data with ipfs2foc

**`ipfs2foc` copies content you already pinned on IPFS, from Pinata, Storacha, or any public gateway, to Filecoin storage providers.** Your CIDs don't change, so every existing link keeps working. It's a one-time move: after it, use [Filecoin Pin](../store-data/tools/filecoin-pin.md) for all new data to be stored.

To check a CID list and estimate the cost before you install anything, use [IPFS to Filecoin](https://filecoin.cloud/ipfs2filecoin).

{% hint style="info" %}
`ipfs2foc` is being folded into Filecoin Pin as a `filecoin-pin migrate` command. Until that ships, use the steps below.
{% endhint %}

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me migrate my pinned IPFS content to Filecoin by following this page:
https://docs.filecoin.io/guides/migrate-pinned-data-with-ipfs2foc.md

1. This guide runs on mainnet and spends real tokens. Tell me the cost before each paid step.
2. I'll set `PRIVATE_KEY` in your environment myself. Never ask me to paste a private key or seed phrase.
3. Run the steps in order, and check each one worked before you go on.
4. If a step fails, stop and tell me which step and what happened.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* Node.js 24 or newer
* The Filecoin Pin CLI, for payments: `npm install -g filecoin-pin`
* A wallet only for this migration, with FIL for transaction fees and USDFC for storage. You'll export its private key, so don't use a wallet that holds other funds
* A list of the CIDs to migrate
* A gateway that serves your content in a verifiable form. See [Step 3](#step-3-check-your-gateway)
{% endhint %}

## Networks and tokens

`ipfs2foc` uses mainnet by default. To test, add `--network calibration`. Calibration is for testing only. Don't keep anything there that you need.

| Network | FIL, for transaction fees | USDFC, for storage |
| --- | --- | --- |
| Calibration testnet | Free from the [Calibration faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html) | Free from the [tUSDFC faucet](https://forest-explorer.chainsafe.dev/faucet/calibnet_usdfc) |
| Mainnet | Buy on an exchange, or bridge with [Squid Router](https://app.squidrouter.com) | Swap with [Squid Router](https://app.squidrouter.com), or mint on [usdfc.net](https://app.usdfc.net) |

## Fund your account

Storage is paid from a USDFC deposit in Filecoin Pay. About 5 USDFC is enough to start. With your key set, approve Warm Storage and deposit USDFC, then check your balance:

```sh
export PRIVATE_KEY=0x...   # never commit this
filecoin-pin payments setup --auto
filecoin-pin payments status
```

If an upload costs more than your balance, it stops before it stores anything. Deposit more, then run the command again. See [Fund storage](../store-data/warm-storage/fund-storage.md).

## Step 1: Install

```sh
npm install -g ipfs2foc
npm ls -g ipfs2foc   # expect 0.8.1 or later
```

## Step 2: Set your key

```sh
export PRIVATE_KEY=0x<your-private-key>
echo ${#PRIVATE_KEY}   # must print 66
```

This key signs every transaction and spends from your deposit. Keep the terminal open: the variable is lost when you close it.

## Step 3: Check your gateway

Test one CID before you spend anything:

```sh
ipfs2foc probe <cid> --gateway https://trustless-gateway.link
```

| Result | Meaning |
| --- | --- |
| `OK … deterministic` | Use this gateway for every command below |
| `WARN` | The content isn't verifiable from this gateway. Pick another |
| `FAIL` | The request didn't complete. Try another gateway before blaming the content |

Which gateway to use:

| Where your pins are | Gateway for `--gateway` | Works? |
| --- | --- | --- |
| Pinata | `https://gateway.pinata.cloud` | Yes |
| Public IPFS network | `https://trustless-gateway.link` | Yes (default) |
| Filebase | `https://<bucket>.myfilebase.com` | Depends on the bucket. Probe first |
| Storj | A gateway-MT share link | Only raw or trustless share links |
| nft.storage (classic) | `https://nftstorage.link` | Mixed. Probe first |
| web3.storage (w3up) | None | No. Serve the CIDs from a gateway you control |
| Your own Kubo node | Your HTTPS host | Yes, with valid TLS and `Gateway.DeserializedResponses` set to `false` |

To check a whole list: `ipfs2foc analyze --cids cids.txt --gateway <url>`.

## Step 4: List your CIDs

One CID per line. Blank lines and lines starting with `#` are ignored:

```sh
cat > cids.txt <<'END'
# my site assets
bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku
END
```

## Step 5: Migrate

```sh
ipfs2foc upload --cids cids.txt --car-store ./cars --db migrate.db \
  --gateway https://trustless-gateway.link
```

| Flag | Purpose |
| --- | --- |
| `--cids` | Your CID list |
| `--car-store` | Required. A staging folder. Files are deleted as each piece is confirmed, so it stays near 1 GiB |
| `--db` | A progress file, so an interrupted run resumes |
| `--gateway` | The gateway from Step 3 |
| `--copies 1` | Optional. One copy instead of the default two: cheaper, less redundant |

The tool reads each CID, packs many small objects into larger pieces (onchain fees scale with pieces, not CIDs), uploads to two providers, and commits onchain. It ends with a JSON summary that includes your data set IDs.

{% hint style="warning" %}
**Don't press Ctrl+C.** Stopping between upload and onchain confirmation can leave a piece that needs manual recovery. If a run seems stuck, let it time out.
{% endhint %}

## Step 6: Confirm it landed

```sh
ipfs2foc report --db migrate.db --data-set-id <data-set-id>
```

Look for:

```
CIDs: 1/1 committed on chain, 0 pending, 0 failed, 0 oversized
```

Committed equal to your total, with zero failed, means it worked. A "not yet proven" warning is normal: run `report` again later and it clears.

## Step 7: Check retrieval

Fetch a CID the way you always have:

```sh
curl -sL -o /dev/null -w "%{http_code}\n" "https://trustless-gateway.link/ipfs/<cid>"
```

`200` means it still resolves by its original CID.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Not enough USDFC | The run fails at the commit stage, and the error may not say how much more you need. Deposit more, then run `ipfs2foc upload` again. Finished CIDs are skipped. See [Fund storage](../store-data/warm-storage/fund-storage.md) |
| A new link returns 404 | Wait a few minutes, then try again |
| No proofs yet | The first proof can take up to 24 hours |

For other errors, see [Errors and troubleshooting](../store-data/resources/errors-and-troubleshooting.md).

## Next steps

* [Filecoin Pin](../store-data/tools/filecoin-pin.md): for all new data to be stored
* [Keep CIDs and IPNS names resolving](keep-cids-and-ipns-names-resolving.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides/migrate-pinned-data-with-ipfs2foc)
