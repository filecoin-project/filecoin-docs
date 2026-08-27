---
description: >-
  Run the IPFS2FOC console against a daemon on your own machine - it groups small
  files into valid pieces, keeps state locally, and keeps working after you close
  the tab.
---

# Migrate with the local console

`ipfs2foc serve` runs the same console as the hosted site, backed by a daemon on your own machine. It computes commitments using your cores and disk, groups small files into valid pieces, keeps its state in a local database, and - once you grant it a signing session - keeps working after you close the tab.

The browser becomes a control panel rather than the engine.

{% hint style="info" %}
**Start with the** [**hosted console**](browser-console.md) **if you have not already.** This guide is the step up from it.
{% endhint %}

***

## When to move here

Four reasons, in rough order of how often they come up.

**Small items.** Storage providers enforce a minimum piece size, typically around 1 MiB padded. The hosted console commits one piece per CID, so anything below that gets refused. The local daemon groups small items into larger combined pieces that clear the minimum. For many inventories this is the only reason needed.

**Scale.** Commitments are computed by your machine rather than a browser tab that has to stay open. State lives in a database file, so a run survives reboots and resumes where it stopped.

**Long submissions.** The daemon drives the work for hours without a browser. Extending your signing session in the console keeps a running submission going, because the daemon re-checks the grant onchain.

**Combined pieces.** Once small items have been grouped, those pieces have to be served from disk. That is something the daemon does and the hosted path cannot.

***

## Step 1: Start the daemon

```bash
ipfs2foc serve --db migrate.db
```

Requires Node.js 24 or newer. Install with `npm install -g ipfs2foc`.

The daemon prints the console URL on start - open `http://localhost:4321`. It owns one migration database, `./migrate.db` by default.

The console detects which backend it is talking to when it loads. Served from your daemon it shows the local control panel; on the hosted site it falls back to the in-browser flow. One app, two backends.

{% hint style="warning" %}
**The default network is mainnet.** Pass `--network calibration` to rehearse on the testnet first. The selected network is printed at startup, and the console refuses to sign against a wallet on a different chain.
{% endhint %}

***

## Step 2: Bring your hosted run across

If you already prepared CIDs in the [hosted console](browser-console.md), import the manifest you downloaded instead of starting over:

```bash
ipfs2foc import-manifest manifest.json --db migrate.db
```

Nothing is recomputed. The console's hasher and the local tool's are pinned byte-identical, so the import records those commitments as finished work and leaves the database exactly as a fresh local run would have.

Three rules protect you: the manifest's network must match the one you are running, a piece already recorded with a different commitment refuses the whole import, and re-importing the same file changes nothing.

The handoff works in the other direction too - `ipfs2foc export --db migrate.db --out manifest.json` writes your prepared pieces back out in the same format.

Starting fresh instead? Paste your CIDs into the console, or drop a `cids.txt` file, exactly as you would on the hosted site.

***

## Step 3: Prepare

Press **Start**. The console shows counts, pieces, and failures as they update, and you can pause, resume, and retry from the same panel.

Small items are grouped into combined pieces automatically during this stage, which is the thing the hosted console cannot do.

***

## Step 4: Grant a signing session

The Signing panel connects a browser wallet and grants a session key: one wallet transaction authorizing a temporary key for creating data sets and adding pieces, and nothing else, for a window you choose between 24 hours and 7 days.

The key is handed to the daemon, which verifies the grant onchain and keeps it in the migration database, so restarting the daemon does not mean granting again.

Three controls cover its whole life:

* **Extend** re-authorizes the same key for a new window, in one wallet transaction. A running submission picks up the new expiry from the chain and continues. The daemon stops issuing new authorizations in the final hour before expiry, and the console warns you well before that.
* **Revoke** ends the authorization onchain, then deletes both copies of the key.
* **Send to daemon** re-sends the browser's copy if the daemon lost its own - after a fresh database, for example. No wallet transaction needed.

Your wallet needs the same one-time payment setup as the hosted flow: USDFC deposited into Filecoin Pay, and the storage service approved as a payments operator. The panel reports both and links the setup.

For exactly what the session key can and cannot do, and where each copy lives, see [SECURITY.md](https://github.com/FilOzone/ipfs2foc/blob/main/SECURITY.md).

***

## Step 5: Submit

Providers fetch your pieces from an address the daemon serves, so that address has to be reachable from the public internet. Enable that path explicitly:

```bash
ipfs2foc serve --db migrate.db --ingress cloudflared --legacy-pull
```

`--ingress cloudflared` opens a tunnel for you and self-checks it. If you front the port yourself - a reverse proxy, or your own tunnel - pass `--public-base https://<your-host>` instead.

{% hint style="warning" %}
**No public address available?** Many home and office networks cannot provide one. In that case, submit from the command line instead, which pushes your data to providers directly and needs no public address at all:

`ipfs2foc upload --cids cids.txt --car-store ./cars --db migrate.db`

It works against the same `migrate.db`, so you can still use the console as a dashboard alongside it. See [Migrate from the command line](command-line.md).
{% endhint %}

The console's _pieces_ indicator shows the public address and whether it is currently answering. The daemon re-checks every minute, and again the moment you press Submit, because a dead tunnel makes provider fetches fail silently.

With pieces prepared, the Submit panel takes a data set ID and starts the run. Progress appears in the Aggregates table. No data set yet? The panel creates one from a provider ID, signed by the same session - and data set IDs are reusable across runs.

The Submit button stays disabled until its prerequisites hold, and a refusal names the missing one: a signing session, a reachable piece address, or a previous job still running.

***

## Step 6: Confirm

Reconcile your local database against what is actually onchain:

```bash
ipfs2foc report --db migrate.db --data-set-id <your-data-set-id>
```

The line that matters is the CID count. When committed equals your total and failed is zero, your migration succeeded.

{% hint style="info" %}
**A "not yet proven" warning here is expected.** Committing your data onchain and _proving_ it is stored are separate events. Providers prove possession on a recurring schedule, and the first proof after your migration can be a couple of hours away. The command also exits non-zero while that is pending.

If the CID count reads fully committed with zero failures, you are done. Run it again later and the warning clears.
{% endhint %}

This is also how you reconcile pieces that the hosted console's onchain check lists as not found: an item migrated through the local grouping path lives onchain under its combined piece's commitment rather than its own, and `report` resolves that against your local database.

***

## If something is interrupted

A run interrupted by anything - daemon restart, session expiry, provider error - resumes from the database on the next Submit. Nothing is signed or added twice.

***

## Next steps

Once your existing pins are migrated, you are finished with this tool. It is a one-time move, not an ongoing service.

**Use** [**Filecoin Pin**](../README.md) **for everything you upload from now on.**

* [Migrate in the browser](browser-console.md) - the hosted console.
* [Migrate from the command line](command-line.md) - the recommended path for any serious migration.
* [About migrating IPFS pins](README.md) - what IPFS2FOC is and how a migration works.
* [IPFS2FOC on GitHub](https://github.com/FilOzone/ipfs2foc) - full command reference.
