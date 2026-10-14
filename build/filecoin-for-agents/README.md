---
description: >-
  The filecoin CLI, agent plugin, read-only MCP server, and web app let AI
  agents store files and folders on Filecoin and return links they can share.
---

# Filecoin for Agents

`filecoin` stores files and folders on Filecoin and returns links you can share. People run it in a terminal, and agents run it in a shell. Every command writes one JSON result that an agent can act on.

{% hint style="warning" %}
**Prototype.** `filecoin` and its services are a proof of concept. They run on the Calibration testnet unless you choose mainnet. The source is in [filecoin-project/agents](https://github.com/filecoin-project/agents).
{% endhint %}

This is the main way for an agent to store data on Filecoin. For specific workflows, such as pinning IPFS content with Filecoin Pin, see [Additional skills](../../core-concepts/filecoin-for-agents.md#additional-skills). For why agents use Filecoin at all, see [Filecoin for Agents](../../core-concepts/filecoin-for-agents.md) in Core Concepts.

## Ways to use it

| Tool | What it does | Docs |
| --- | --- | --- |
| CLI | `filecoin put ./site` stores a folder and returns a browser link. `filecoin get` downloads and verifies it. | [CLI](cli.md) |
| Agent plugin and skill | Teaches Claude Code, Codex, and other agents when and how to run `filecoin`. | [Connect an agent](connect-an-agent.md) |
| MCP server | Read-only tools for storage providers, data sets, pieces, payment rails, and session keys. | [API and MCP](api-and-mcp.md) |
| Web app | An explorer for that data, and a wallet dashboard for funding storage and approving keys. | [Web app](web-app.md) |

## How an agent gets access

The agent never holds the wallet key. It gets a session key, which the wallet owner approves in the web app and which cannot move funds. [Connect an agent](connect-an-agent.md) shows the way in for each kind of agent: local, cloud, browser, or chat app.

## Start

* [Quickstart](quickstart.md): install the CLI, log in, and store a file.
* [Connect an agent](connect-an-agent.md): add `filecoin` to Claude, ChatGPT, or another agent.
* [Retrieve and verify](retrieve-and-verify.md): what each retrieval link checks.
* [Source code](https://github.com/filecoin-project/agents) on GitHub.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/filecoin-for-agents)
