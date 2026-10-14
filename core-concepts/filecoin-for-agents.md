---
description: >-
  How AI agents can use Filecoin Cloud (FC) for storage that is
  persistent, portable, open, and verifiable, without a human in
  the loop.
---

# Filecoin for Agents

**AI agents can use Filecoin Cloud (FC) to give their context, artifacts, and records a home that survives the session, the tool, and the vendor: storage that stays portable across agents and frameworks, open with no single point of lock-in, and verifiable end to end.**

This page is a starting point for building agents that use FC. It links out to the CLIs, SDKs, and console you'll actually use, rather than repeating their full documentation here.

## Overview

Agents forget. When a session ends, a tool gets swapped, or a vendor shuts down, whatever an agent learned or produced usually disappears with it. Every skill built on Filecoin Cloud (FC), starting with the `filecoin` skill below, aims to fix that around four ideas:

* **Persistent.** Your agent's context, artifacts, and records survive the session, the tool, and the vendor. Nothing it learns or makes disappears when the window closes.
* **Portable.** Move useful state across agents, models, frameworks, and teammates, including across org boundaries.
* **Open.** Neutral infrastructure with exportable ownership and no lock-in of valuable agent state.
* **Verifiable.** Underneath it all, the retrieved bytes are the written bytes. This isn't the pitch, it's the reason the pitch is credible, and it surfaces where it earns its keep: enterprise audit conversations.

## Filecoin for agentic use cases

A few patterns come up often when agents use FC:

* **Durable agent memory and outputs.** Agents that need to persist state, logs, or generated artifacts (files, datasets, reports) across restarts or across a fleet can pin them to Filecoin and keep a verifiable, addressable record of what they produced and when.
* **Verifiable identity and provenance.** Agents that register a verifiable identity (for example, under [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004)) can back that identity with metadata stored on Filecoin, so other agents or services can verify both who an agent is and that its declared capabilities/data haven't disappeared. See [Filecoin Pin for ERC-8004 Agents](../build/cookbook/filecoin-pin/erc-8004-agent-registration.md) for a full walkthrough.
* **IPFS-compatible by default.** If an agent (or the framework it's built on) already speaks IPFS, adding Filecoin persistence doesn't require new tooling. Content stays addressable by the same Content Identifier (CID).
* **Paying as it goes.** Storage and other services can be funded once and drawn against automatically, instead of a human provisioning and paying upfront for each use.

## Quickstart: store your data

The `filecoin` agent skill is the main way for an agent to store data on Filecoin. It teaches the agent to run the `filecoin` CLI, which stores a file or folder, returns a link to share, and downloads and verifies it again. The agent gets a scoped session key that you approve from your wallet, and it never holds your wallet key.

In Claude Code, install the filecoin plugin, which adds the skill and a read-only MCP server:

```sh
claude plugin marketplace add filecoin-project/agents
claude plugin install filecoin@filecoin
```

In any other agent with a shell, install the skill:

```sh
npx skills add filecoin-project/agents
```

Then ask the agent to store or share a file. On its first run, it sends you a link to approve its key and fund storage. The [Filecoin for Agents guide](../build/filecoin-for-agents/README.md) covers the [quickstart](../build/filecoin-for-agents/quickstart.md), [Codex, cloud, browser, and chat agents](../build/filecoin-for-agents/connect-an-agent.md), and the [CLI](../build/filecoin-for-agents/cli.md).

## Additional skills

These skills are for specific workflows on Filecoin, beyond storing and sharing data. Use them when you need what they add.

### Publish with Filecoin Pin

The `publish` skill pins IPFS-compatible content to Filecoin through the [Filecoin Pin CLI](https://github.com/filecoin-project/filecoin-pin), and returns an `inbrowser.link` URL for it. Everything here works whether an agent invokes the skill or you run the CLI directly.

Before you start, make sure you have:

* **An Ethereum-style wallet on Filecoin.** See [Wallets](../networks-and-tools/assets/wallets.md). You'll use it to approve access from a browser, not to hand a key to the agent.
* **FIL in that wallet,** to cover transaction fees.
* **USDFC in that wallet,** to pay for storage. USDFC is Filecoin Cloud's storage-payment stablecoin. 5 USDFC is enough to start.
* **Node.js 24 or later.**

1. **Install the skill and the CLI it drives:**

   ```sh
   npx skills add filecoin-project/filecoin-skills --skill publish
   npm install -g filecoin-pin
   ```

2. **Log in once.** Run `filecoin-pin login` and approve a scoped session key in the Filecoin Cloud console from your wallet. No private key ever touches the agent, and the key can be revoked from the console at any time.

   ```sh
   filecoin-pin login
   ```

3. **Set up payments in the console.** Authorize the Warm Storage Service to spend USDFC and deposit funds into Filecoin Pay, both in the console's Add Service flow, in a single wallet transaction. A session key can't move money, so this step is always a human's.

4. **Ask the agent to publish something.** Say "publish this," "share this file," or "pin this." The agent hands back a link like `https://inbrowser.link/ipfs/<cid>`, first the moment the CID is known, then confirmed once verification passes.

Prefer to drive the CLI directly instead of through the skill? The same `filecoin-pin add`, `filecoin-pin payments setup`, and `filecoin-pin data-set` commands work standalone, including a direct private-key mode. See [Filecoin Pin: Getting Started](../build/cookbook/filecoin-pin/getting-started.md) for that walkthrough.

## Common questions

**How does an agent verify its data is still stored, instead of just trusting the upload succeeded?**
Storage providers submit proof, on a recurring schedule, that they still hold the data (Proof of Data Possession, or PDP). An agent can query this directly at any time (for example with `filecoin-pin data-set show <DATASET_ID>`) rather than relying on a one-time confirmation.

**Can an AI agent use Filecoin without a human approving each transaction?**
Yes. Once an agent's wallet is funded and payment authorization is set up (a one-time step, typically done by a human operator), the agent can store data and pay for it directly. No per-transaction approval is required.

**Does an agent need to hold and manage FIL and USDFC directly?**
Yes, today. An agent's wallet needs FIL (for transaction fees) and USDFC (Filecoin Cloud's storage-payment stablecoin) for payments. Filecoin Pay is where those payments settle; the [Filecoin Pay Console](#filecoin-pay-console) is where a human operator can inspect or adjust what an agent's wallet is authorized to spend.

**How does an agent authenticate for payments today?**
By running `filecoin-pin login` (or using the `publish` skill above, which calls it by default), which pairs the agent with a scoped, revocable session key instead of a raw wallet private key: a human approves a one-time pairing link from their wallet, and the agent holds only that limited key afterward. Direct private-key access still works as a fallback for the CLI; see [Filecoin Pay Console](#filecoin-pay-console) below for where session keys are managed.

## Resources

### filecoin CLI and plugin

The CLI, agent plugin, and skill from the quickstart above, with a read-only REST API and MCP server and a web app for approving agent session keys. This is the starting point for any agent that needs to store and retrieve files or folders.

[Filecoin for Agents guide &rarr;](../build/filecoin-for-agents/README.md)

### Filecoin Pin CLI

A CLI (and JS library, and GitHub Action) for pinning IPFS-compatible content to Filecoin with verifiable, provider-proven persistence. The `publish` skill above uses it.

[Filecoin Pin: Getting Started &rarr;](https://docs.filecoin.cloud/getting-started/filecoin-pin)

### Filecoin Cloud CLI

A community-built CLI (also installable as an agent skill and MCP server) for the broader FC stack: wallet setup, dataset management, and storage-provider queries via the Synapse SDK. Where Filecoin Pin focuses on pinning content, Filecoin Cloud CLI is closer to a general-purpose control surface for FC, and it's built to be driven by an agent directly (`npx skills add FIL-Builders/foc-cli`), not just by a human at a terminal.

[Filecoin Cloud CLI &rarr;](https://docs.filecoin.cloud/resources/community-projects/#FC-cli)

### Filecoin Pay Console

A web console for managing the payment side of FC: connect a wallet to view and manage payment rails, deposits made in USDFC, and the services you've authorized to draw against them. A human operator uses it directly to authorize spending and fund an agent's session; an agent-driven CLI also opens it briefly, for the one-time wallet approval a session-key login requires.

The console is currently in beta and interacts directly with the underlying payment contracts. Verify transaction details before confirming anything.

{% hint style="info" %}
**Session-key login.** Instead of connecting a full wallet, an agent (or the CLI it's driving) can authenticate with a scoped, revocable session key: it opens a one-time pairing link in a browser, a human approves it from their wallet, and the agent receives a key limited to just what it needs. Run this from the [Filecoin Pin CLI](https://github.com/filecoin-project/filecoin-pin) with `filecoin-pin login`, or see [Publish with Filecoin Pin](#publish-with-filecoin-pin) above for the packaged agent skill that uses it by default.
{% endhint %}

[Filecoin Pay Console &rarr;](https://pay.filecoin.cloud/console)

***

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/core-concepts/filecoin-for-agents)

