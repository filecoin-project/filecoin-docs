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

## Common questions

**How does an agent verify its data is still stored, instead of just trusting the upload succeeded?**
Storage providers prove on chain, on a recurring schedule, that they still hold the data (Proof of Data Possession, or PDP). To check the bytes themselves, the agent runs `filecoin get`, which downloads the content and verifies it against its PieceCID. See [Retrieve and verify](../build/filecoin-for-agents/retrieve-and-verify.md).

**Can an AI agent use Filecoin without a human approving each transaction?**
Yes. The wallet owner approves the agent's session key once, together with the Warm Storage approval and a USDFC deposit. After that, the agent stores and removes content with no per-transaction approval. The owner is needed again only when the account runs low on funds or the key expires, and `filecoin` then gives the agent a link to send them.

**Does an agent need to hold and manage FIL and USDFC directly?**
No. The agent holds only a session key, which signs storage requests but can't move funds. The wallet owner keeps FIL for the fees of their approval and deposit transactions, and deposits USDFC into Filecoin Pay to pay for storage.

**How does an agent authenticate?**
The agent runs `filecoin login`, which makes a session key on the agent's machine and returns an approval link. The wallet owner opens the link, connects their wallet, and approves the key. A cloud agent, whose disk is gone when the session ends, reads an approved key from the `FILECOIN_SESSION_KEY` and `FILECOIN_ROOT_ADDRESS` secrets instead. See [Connect an agent](../build/filecoin-for-agents/connect-an-agent.md).

## Resources

### filecoin CLI and plugin

The CLI, agent plugin, and skill from the quickstart above, with a read-only REST API and MCP server. This is the starting point for any agent that needs to store and retrieve files or folders.

[Filecoin for Agents guide &rarr;](../build/filecoin-for-agents/README.md)

### Filecoin Pin CLI

A CLI (and JS library, and GitHub Action) for pinning IPFS-compatible content to Filecoin with verifiable, provider-proven persistence.

[Filecoin Pin: Getting Started &rarr;](https://docs.filecoin.cloud/getting-started/filecoin-pin)

### Filecoin Cloud CLI

A community-built CLI (also installable as an agent skill and MCP server) for the broader FC stack: wallet setup, dataset management, and storage-provider queries via the Synapse SDK. Where Filecoin Pin focuses on pinning content, Filecoin Cloud CLI is closer to a general-purpose control surface for FC, and it's built to be driven by an agent directly (`npx skills add FIL-Builders/foc-cli`), not just by a human at a terminal.

[Filecoin Cloud CLI &rarr;](https://docs.filecoin.cloud/resources/community-projects/#FC-cli)

### Filecoin Pay Console

A web console for managing the payment side of FC: connect a wallet to view and manage payment rails, deposits made in USDFC, and the services you've authorized to draw against them. A human operator uses it to authorize spending and manage deposits.

The console is currently in beta and interacts directly with the underlying payment contracts. Verify transaction details before confirming anything.

[Filecoin Pay Console &rarr;](https://pay.filecoin.io/console)

***

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/core-concepts/filecoin-for-agents)

