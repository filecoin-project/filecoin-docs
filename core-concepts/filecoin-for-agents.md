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

Agents forget. When a session ends, a tool gets swapped, or a vendor shuts down, whatever an agent learned or produced usually disappears with it. Every skill built on Filecoin Cloud (FC) aims to fix that around four ideas:

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

## Pick a surface

There are two entrypoints. Pick the one that matches where your agent runs:

| Entrypoint | Use it when | Install | Page |
| --- | --- | --- | --- |
| Filecoin Skill | Your agent runs a shell, such as Claude Code, Codex, Cursor, or a cloud sandbox, and should store and share files | `npx skills add filecoin-project/agents` | [Filecoin Skill](../agents/filecoin-skill/README.md) |
| MCP server | Your agent can only call remote tools, such as Claude or ChatGPT with connectors. Read-only | `https://mcp.filecoin.io` | [MCP server](../agents/mcp-server.md) |

The Filecoin CLI (`filecoin`) is part of the skill: the agent runs it to store files. In Claude Code and Codex, the Filecoin plugin installs the skill and the MCP server together. To run the CLI from your own scripts, see [Filecoin CLI agent mode](../agents/filecoin-skill/filecoin-cli-agent-mode.md). For more skills, see the [Skills Catalog](../agents/filecoin-skill/skills-catalog/README.md).

In every case, a person owns the wallet and approves what the agent may do, and the agent never holds the wallet key. See [Agent wallets and funding](../agents/agent-wallets-and-funding.md).

## Quickstart

To store a first file, follow the [Quickstart](../getting-started/quickstart.md). To have an agent store files, see [Filecoin Skill](../agents/filecoin-skill/README.md).

## Common questions

**How does an agent verify its data is still stored, instead of just trusting the upload succeeded?**
Storage providers submit proof, on a recurring schedule, that they still hold the data (Proof of Data Possession, or PDP). An agent can query this directly at any time (for example with `filecoin-pin data-set show <DATASET_ID>`) rather than relying on a one-time confirmation.

**Can an AI agent use Filecoin without a human approving each transaction?**
Yes. Once you've funded your account and approved the agent's session key (a one-time step), the agent can store data and pay for it from your deposit. No per-transaction approval is required.

**Does an agent need to hold FIL and USDFC?**
No. You keep FIL (for transaction fees) and USDFC (Filecoin Cloud's storage-payment stablecoin) in your own wallet, and deposit USDFC to pay for storage. The agent uses a session key that can store data but can't move your funds. See [Agent wallets and funding](../agents/agent-wallets-and-funding.md).

**How does an agent authenticate for payments today?**
With a scoped, revocable session key instead of your wallet's private key. The agent runs `filecoin login` (or `filecoin-pin login` for the [`publish` skill](../agents/filecoin-skill/skills-catalog/publish.md)) and sends you a link. You approve the key once from your wallet, and the agent holds only that limited key afterward. See [Agent wallets and funding](../agents/agent-wallets-and-funding.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/agents/filecoin-for-agents)

