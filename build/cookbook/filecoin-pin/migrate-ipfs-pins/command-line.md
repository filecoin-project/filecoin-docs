---
description: >-
  Migrate your IPFS pins to Filecoin Onchain Cloud from the terminal with the
  ipfs2foc CLI. The recommended path for any serious migration.
---

# Migrate from the command line

The `ipfs2foc` CLI migrates your pins in a single command. It handles files of any size, scales to large inventories, and requires nothing about your machine to be reachable from the internet.

This is the recommended path for any serious migration.

{% hint style="info" %}
**`ipfs2foc` is a bridge.** This migration logic is actively being moved into a native `filecoin-pin migrate` subcommand. Everything on this page works today, but once that subcommand lands it becomes the supported path, and migrating will be one command inside the [Filecoin Pin](../README.md) tool you already use for new uploads.
{% endhint %}

***

## What you need

* **Node.js 24 or newer.** Check with `node --version`.
* **A wallet** with FIL for gas and USDFC for storage. You will export its private key, so use one kept for this purpose.
* **A list of CIDs** to migrate.
* **Content that is fetchable from an IPFS gateway.** Support varies by pinning provider - check [Where your content is fetched from](README.md#where-your-content-is-fetched-from) for yours.

The walkthrough below takes one CID end to end on Filecoin Mainnet. By the end you'll have measured a piece, uploaded it, committed it onchain, and confirmed it with `report`.

***

## Step 1: Install

```bash
npm install -g ipfs2foc
```

Confirm the install:

```bash
npm ls -g ipfs2foc
```

{% hint style="success" %}
You should see `ipfs2foc@0.8.1` or later.
{% endhint %}

***

## Step 2: Set your signing key

Export the private key of a Filecoin wallet funded with FIL and USDFC on Filecoin Mainnet. The key must be `0x` followed by 64 hex characters:

```bash
export PRIVATE_KEY=0x<your-private-key>
```

Verify the format. This must print `66`:

```bash
echo ${#PRIVATE_KEY}
```

{% hint style="danger" %}
**This one key does everything.** It signs every transaction in the migration and authorizes spending from your deposited balance. Use a dedicated wallet funded with roughly what the migration needs. Never use a wallet holding significant funds, and never paste this key into a web page.
{% endhint %}

Keep this terminal open for the rest of the guide - the variable is lost when you close it.

***

## Step 3: Check your gateway

Before spending anything, confirm a gateway serves your content in the verifiable form the migration requires. Pick any one CID from your list:

```bash
ipfs2foc probe <cid> --gateway https://trustless-gateway.link
```

{% hint style="success" %}
A working gateway returns a line beginning `OK` and ending `deterministic`:

```
OK   https://trustless-gateway.link — CAR 663286 bytes, sha256 86c15ec1…, deterministic
```
{% endhint %}

{% hint style="warning" %}
**Seeing `FAIL` or `fetch failed`? Try a different gateway before assuming your content is at fault.** Public gateways are not reachable from every network. Try your own pinning provider's gateway instead:

`ipfs2foc probe <cid> --gateway https://gateway.pinata.cloud`
{% endhint %}

Whichever gateway returns `OK` is the one to use - pass it with `--gateway` on every command below. For what `WARN` and `FAIL` each mean, and the gateway to use for your provider, see [Where your content is fetched from](README.md#where-your-content-is-fetched-from).

***

## Step 4: Fund your account

Two currencies do two different jobs. **FIL** pays gas on your own transactions. **USDFC** pays storage providers.

Confirm you have a sufficient balance before going further:

```bash
npx filecoin-pin@latest payments status
```

You should see a positive USDFC balance with approvals in place.

{% hint style="warning" %}
**Deposit a comfortable margin.** If your balance or allowance falls short, the migration fails at the commit stage, and the error may not tell you how much more is needed.
{% endhint %}

***

## Step 5: Build your CID list

One CID per line in a plain text file. Blank lines and lines beginning with `#` are ignored:

```bash
cat > cids.txt <<'END'
# my site assets
bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku
END
```

***

## Step 6: Migrate

One command runs the whole migration:

```bash
ipfs2foc upload --cids cids.txt --car-store ./cars --db migrate.db \
  --gateway https://trustless-gateway.link
```

| Flag          | Purpose                                                                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--cids`      | Your list of CIDs.                                                                                                                                                               |
| `--car-store` | **Required.** A working directory where content is staged. Files are deleted as each piece is confirmed, so it stays near 1 GiB rather than growing to the size of your migration. |
| `--db`        | Progress file, so an interrupted run resumes instead of restarting.                                                                                                              |
| `--gateway`   | The gateway you validated in step 3.                                                                                                                                             |

{% hint style="danger" %}
**Do not press Ctrl+C.** Interrupting between upload and onchain confirmation can leave a piece in an unconfirmed state needing manual recovery. If the run seems stuck, let it time out.
{% endhint %}

### What you'll see

The run reads and measures your content, packs it, then uploads and commits.

{% hint style="success" %}
You should see something like:

```
registered 1 CID(s) from cids.txt
packed 1 multi-root CAR(s) under ./cars
direct upload to 2 provider(s): primary 4 (https://…), secondary 12 (https://…)
parked bafkzcib… (647.74 KiB) on primary 4 in 18.7s
parked bafkzcib… on secondary 12 (pulled from primary)
flush [batch] provider 4: committing 1 piece(s)
committed 1 piece(s) on provider 4 (data set 25983)
direct upload finished in 2m 1s: 647.74 KiB stored
```
{% endhint %}

It finishes with a JSON summary of the run.

To store a single copy instead of two - cheaper, less redundant - add `--copies 1`.

***

## Step 7: Confirm it landed

Reconcile your local record against what is actually onchain:

```bash
ipfs2foc report --db migrate.db --data-set-id <your-data-set-id>
```

The line that matters is the CID count.

{% hint style="success" %}
You should see something like:

```
CIDs: 1/1 committed on chain, 0 pending, 0 failed, 0 oversized
```
{% endhint %}

**When committed equals your total and failed is zero, your migration succeeded.**

{% hint style="info" %}
**A "not yet proven" warning here is expected.** Committing your data onchain and _proving_ it is stored are two separate events. Providers prove possession on a recurring schedule, and the first proof after your migration can be up to a couple of hours away. The command also exits with a non-zero code while that is pending.

If your CID count reads fully committed with zero failures, you are done. Run the same command again later and the warning clears.
{% endhint %}

***

## Step 8: Verify retrieval

The whole point is that nothing about retrieval changes. Fetch one of your CIDs the way you always have:

```bash
curl -sL -o /dev/null -w "%{http_code}\n" \
  "https://trustless-gateway.link/ipfs/<your-cid>"
```

`200` means your content still resolves by its original CID.

***

## Now switch to Filecoin Pin

Your existing pins are on Filecoin Onchain Cloud, and this migration is a one-time job.

**From here, use Filecoin Pin for everything new.** IPFS2FOC is built for moving a backlog, not for day-to-day uploads. [Filecoin Pin](../README.md) is the ongoing workflow: it pins new content, gives the same verifiable Filecoin persistence, and works with the standard IPFS tooling you already use.

***

## Related

* [About migrating IPFS pins](README.md) - what IPFS2FOC is and how a migration works.
