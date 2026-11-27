---
description: >-
  Install the Filecoin plugin, which adds the Filecoin skills and the read-only
  MCP server to Claude Code, Codex, Cursor, and other agents in one step.
---

# Filecoin plugin

The Filecoin plugin adds all the [skills](skills.md) and the read-only [MCP server](mcp.md) to your agent in one install. The plugin contains no code. The `filecoin` skill runs the CLI from npm, which needs Node.js 24 or newer.

## Install

Install the plugin with one command, or use your agent's own commands.

{% tabs %}
{% tab title="One command" %}
```sh
npx plugins add filecoin-project/agents
```
{% endtab %}

{% tab title="Claude Code" %}
```sh
claude plugin marketplace add filecoin-project/agents
claude plugin install filecoin@filecoin
```
{% endtab %}

{% tab title="Codex" %}
```sh
codex plugin marketplace add filecoin-project/agents
codex plugin add filecoin@filecoin
```
{% endtab %}
{% endtabs %}

Start a new session. When you ask the agent to store or share a file on Filecoin, it loads the `filecoin` skill. The first `filecoin login` asks you to [approve the agent's key](README.md#approve-the-agents-key).

{% hint style="info" %}
If you already added the MCP server on its own, remove it. Otherwise the agent has two copies of its tools.
{% endhint %}

## Web apps

The Claude, Cursor, and ChatGPT web apps load the plugin from the `filecoin-project/agents` repository on GitHub:

* **Claude.** In [**Customize > Plugins**](https://claude.ai/customize/plugins), select **Add > Add marketplace**. Enter `filecoin-project/agents`, then add the Filecoin plugin.
* **Cursor.** In [**Customize > Marketplace**](https://cursor.com/customize/marketplace), select **Add marketplace > Import from GitHub**. Enter `https://github.com/filecoin-project/agents`, then add the Filecoin plugin.
* **ChatGPT.** A workspace admin can [import the repository as a marketplace](https://learn.chatgpt.com/docs/enterprise/plugin-management). If your workspace has not imported it, add the [MCP server](mcp.md).

## Other agents

The plugin follows the [Agent Plugins](https://agent-plugins.org) format. Other agents that support the format can load the plugin from the repository's [`plugins/filecoin`](https://github.com/filecoin-project/agents/tree/main/plugins/filecoin) directory.

In an agent that doesn't support plugins, install the [skills](skills.md) and the [MCP server](mcp.md#install) separately.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/agents/plugin)
