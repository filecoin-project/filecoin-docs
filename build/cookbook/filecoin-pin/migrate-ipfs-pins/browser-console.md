---
description: >-
  Run an IPFS-to-Filecoin migration entirely in your browser tab with the hosted
  IPFS2FOC console. No install, and no private key ever enters the page.
---

# Migrate in the browser

The hosted console at [filozone.github.io/ipfs2foc](https://filozone.github.io/ipfs2foc/) runs a migration entirely in your browser tab. Paste your CIDs, get a commitment back for each one, and submit them to storage providers.

Nothing to install, and no private key ever enters the page.

{% hint style="success" %}
**Start here.** This is the right place for a first migration and for most modest inventories. If your run outgrows the tab - small files or a very large list - the [local console guide](local-console.md) covers the step up, and your work carries over.
{% endhint %}

***

## What you need

* **A browser wallet** with FIL for gas and USDFC for storage.
* **A list of CIDs**, pasted in or as a `cids.txt` file.
* **Content that is fetchable from an IPFS gateway.** Support varies by pinning provider - check [Where your content is fetched from](README.md#where-your-content-is-fetched-from) for yours.

***

## Step 1: Load your CIDs

Open [the console](https://filozone.github.io/ipfs2foc/) and paste your CIDs into the input, one per line.

For a larger inventory, drop a `cids.txt` file onto the input instead. One CID per line; blank lines and lines starting with `#` are ignored. The console streams the file through its parser and tells you how many CIDs it accepted and which lines it rejected before anything runs.

A CIDv0 (`Qm…`) and its CIDv1 form count as a single entry. CIDv0 input is normalized to CIDv1 before anything is fetched, so the committed bytes always use one canonical form.

***

## Step 2: Prepare

Press **Prepare**. Nothing is charged and nothing is uploaded at this stage - this is a measurement pass.

For each CID the console retrieves the content block by block, hash-checks every block against its own identifier, builds the canonical archive locally, and computes the piece commitment from that.

That sequence matters for trust. The console never simply hashes whatever a gateway hands back, so a gateway returning an incomplete result produces a loud error on that row instead of a wrong commitment.

{% hint style="info" %}
**Download your run manifest.** The button saves the whole run as JSON - every piece commitment, plus the gateway they were computed against.

Keep it. It is your record of the run, and it is how a run moves to the [local console](local-console.md) later without recomputing anything.
{% endhint %}

***

## Step 3: Submit

Choose how many provider copies to store - two by default, a primary plus an independent secondary - then continue to connect your wallet.

Your browser moves no payload bytes. The primary provider fetches the content itself, the secondary copies from the primary, and each copy lands as a single onchain commit covering every piece in the run. The status table tracks each copy from fetch through to a committed data set.

***

## Step 4: Set up your wallet

Connect your Filecoin Mainnet wallet.

{% hint style="warning" %}
**Deposit a comfortable margin.** Two copies of your data are stored by default. Budget from the cost breakdown and add headroom - if your balance falls short mid-run, submission fails.
{% endhint %}

***

## Step 5: Verify onchain

The status table shows each piece as it was at the moment it committed. The chain keeps moving after that.

**Verify on chain**, next to a data set, reads the current state directly over a public RPC: which pieces the data set actually holds, and whether the provider's latest accepted proof covers everything your run added.

This needs no wallet, no payment setup, and no signing session, so a previous run stays verifiable even before you connect a wallet.

***

## When a run outgrows the tab

The hosted console commits one piece per CID. Two things push you past it:

**Small items.** Storage providers enforce a minimum piece size, typically around 1 MiB padded. Because the hosted flow commits one piece per CID, items below that are refused at submit. The console offers to submit the large ones and hands you a manifest of the remainder. The [local console](local-console.md) groups small items into larger pieces and migrates them properly.

**Scale.** A browser tab is not the place for a very large inventory. The local console uses your machine's cores and disk, keeps state in a file that survives reboots, and keeps submitting after the tab closes.

Your work carries over. A saved manifest imports into a local run with no recomputation, because the console's hasher and the local tool's are pinned byte-identical.

***

## Next steps

* [Migrate with the local console](local-console.md) - when a run outgrows the tab.
* [Migrate from the command line](command-line.md) - the recommended path for any serious migration.
* [About migrating IPFS pins](README.md) - what IPFS2FOC is and how a migration works.
