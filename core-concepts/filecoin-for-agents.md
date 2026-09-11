---
description: >-
  How AI agents can use Filecoin Cloud (FC) for durable, verifiable
  storage and programmable payments, without a human in the loop.
---

# Filecoin for Agents

**AI agents can use Filecoin Cloud (FC), a programmable storage, retrieval, and payments platform built on Filecoin, to store data with proof it persists and pay for storage and services on programmable payment rails, authenticating with a wallet instead of a human-managed account.**

This page is a starting point for building agents that use FC. It links out to the CLIs, SDKs, and console you'll actually use, rather than repeating their full documentation here.

## Overview

Three things matter most to an agent using FC:

* **Wallet-native access.** An agent authenticates with a private key, not a username, password, or credit card. There's no account-creation flow a human has to complete on the agent's behalf.
* **Verifiable persistence.** Storage providers prove, on a recurring basis, that they still hold an agent's data (a mechanism called Proof of Data Possession, or PDP). An agent (or the system supervising it) can check this independently rather than trusting a provider's word.
* **Programmable payments.** Filecoin Pay settles storage and service payments on programmable payment rails, so an agent can fund, top up, and pay for what it uses without a manual billing cycle.

## Filecoin for agentic use cases

A few patterns come up often when agents use FC:

* **Durable agent memory and outputs.** Agents that need to persist state, logs, or generated artifacts (files, datasets, reports) across restarts or across a fleet can pin them to Filecoin and keep a verifiable, addressable record of what they produced and when.
* **Machine-to-machine payments.** Instead of a human provisioning and paying for storage upfront, an agent can deposit funds into Filecoin Pay and draw against them as it stores and retrieves data, or pays for other services.
* **Verifiable identity and provenance.** Agents that register a verifiable identity (for example, under [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004)) can back that identity with metadata stored on Filecoin, so other agents or services can verify both who an agent is and that its declared capabilities/data haven't disappeared. See [Filecoin Pin for ERC-8004 Agents](../build/cookbook/filecoin-pin/erc-8004-agent-registration.md) for a full walkthrough.
* **IPFS-compatible by default.** If an agent (or the framework it's built on) already speaks IPFS, adding Filecoin persistence doesn't require new tooling. Content stays addressable by the same Content Identifier (CID).

## Quickstart: pin an artifact

The fastest way to see this working end to end is to pin a file, the way an agent would pin an artifact it just produced. This uses the [Filecoin Pin CLI](https://github.com/filecoin-project/filecoin-pin), which any agent (or the process running it) can call directly.

{% hint style="info" %}
**Agent-native workflow coming soon.** A packaged agent skill for pinning artifacts, so an agent can do this as a tool call instead of shelling out to the CLI, is in the works. This section will be updated with that flow once it ships; the CLI steps below work today and won't change underneath it.
{% endhint %}

Before you start, make sure you have:

* **An Ethereum-style wallet on Filecoin.** See [Wallets](../networks-and-tools/assets/wallets.md).
* **FIL in that wallet,** to cover transaction fees.
* **USDFC in that wallet,** to pay for storage. USDFC is Filecoin Cloud's storage-payment stablecoin.
* **Node.js 24 or later.**

1. **Install the CLI:**

   ```sh
   npm install -g filecoin-pin@latest
   ```

2. **Connect a wallet.** Export a private key as an environment variable; the CLI never stores it. See the wallet setup steps in [Filecoin Pin: Getting Started](../build/cookbook/filecoin-pin/getting-started.md) for the safe way to do this.

3. **Set up payments.** Authorize storage spending and deposit USDFC so providers can be paid:

   ```sh
   filecoin-pin payments setup
   ```

4. **Pin the artifact:**

   ```sh
   filecoin-pin add ./path/to/artifact
   ```

   The CLI packs the file, selects storage providers, stores it redundantly, and returns a Root CID you (or the agent) can use to retrieve it from any IPFS-compatible tool or gateway.

5. **Verify it's still there.** Any time later, check the live proof status instead of trusting a cached "it worked" from step 4:

   ```sh
   filecoin-pin data-set list
   filecoin-pin data-set show <DATASET_ID>
   ```

For the full walkthrough, including wallet setup, funding, and what each step returns, see [Filecoin Pin: Getting Started](../build/cookbook/filecoin-pin/getting-started.md).

## Common questions

**Can an AI agent use Filecoin without a human approving each transaction?**
Yes. Once an agent's wallet is funded and payment authorization is set up (a one-time step, typically done by a human operator), the agent can store data and pay for it directly. No per-transaction approval is required.

**How does an agent verify its data is still stored, instead of just trusting the upload succeeded?**
Storage providers submit proof, on a recurring schedule, that they still hold the data (Proof of Data Possession, or PDP). An agent can query this directly at any time (for example with `filecoin-pin data-set show <DATASET_ID>`) rather than relying on a one-time confirmation.

**Does an agent need to hold and manage FIL and USDFC directly?**
Yes, today. An agent's wallet needs FIL (for transaction fees) and USDFC (Filecoin Cloud's storage-payment stablecoin) for payments. Filecoin Pay is where those payments settle; the [Filecoin Pay Console](#filecoin-pay-console) is where a human operator can inspect or adjust what an agent's wallet is authorized to spend.

**How does an agent authenticate for payments today?**
By holding a wallet private key directly, the same credential used in the Quickstart above. A scoped, revocable session-key login (so an agent can be authorized for just what it needs, without holding full wallet access) is planned for the Pay Console; see the disclaimer under [Filecoin Pay Console](#filecoin-pay-console) below.

## Resources

### Filecoin Pin CLI

A CLI (and JS library, and GitHub Action) for pinning IPFS-compatible content to Filecoin with verifiable, provider-proven persistence. This is what the quickstart above uses, and it's the right starting point for any agent that just needs to store and retrieve files or datasets.

[Filecoin Pin: Getting Started &rarr;](https://docs.filecoin.cloud/getting-started/)

### Filecoin Cloud CLI

A community-built CLI (also installable as an agent skill and MCP server) for the broader FC stack: wallet setup, dataset management, and storage-provider queries via the Synapse SDK. Where Filecoin Pin focuses on pinning content, Filecoin Cloud CLI is closer to a general-purpose control surface for FC, and it's built to be driven by an agent directly (`npx skills add FIL-Builders/FC-cli`), not just by a human at a terminal.

[Filecoin Cloud CLI &rarr;](https://docs.filecoin.cloud/resources/community-projects/#FC-cli)

### Filecoin Pay Console

A web console for managing the payment side of FC: connect a wallet to view and manage payment rails, deposits made in USDFC, and the services you've authorized to draw against them. It's most useful for a human operator who wants to inspect or adjust what an agent's wallet is authorized to spend, rather than something an agent calls directly.

The console is currently in beta and interacts directly with the underlying payment contracts. Verify transaction details before confirming anything.

{% hint style="info" %}
**Session-key login (coming soon).** A scoped, revocable session-key pairing flow, so an agent can be authorized for just what it needs without handing over full wallet access, is in development for this console. This section will be updated once it ships.
{% endhint %}

[Filecoin Pay Console &rarr;](https://pay.filecoin.cloud/console)

***

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/core-concepts/filecoin-for-agents)

