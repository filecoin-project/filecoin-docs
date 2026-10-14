---
description: >-
  Give a local, cloud, browser, or chat agent access to Filecoin storage
  through the filecoin plugin, agent skill, CLI, WebMCP tools, or MCP server.
---

# Connect an agent

Pick the way in that matches what your agent can do. In every case, a person owns the wallet and approves what the agent may do, and the agent never holds the wallet key.

| Agent | What it can do | Way in |
| --- | --- | --- |
| Local agent, such as Claude Code, Codex, or Cursor | Run a shell, keep files, and open pages for you | [Plugin, or CLI and agent skill](#local-agents) |
| Cloud agent, such as a coding agent in a hosted sandbox | Run a shell, but its files are gone when the session ends | [CLI with a key from secrets](#cloud-agents) |
| Browser agent | Read and use web pages in the browser that holds your wallet | [The web app's WebMCP tools](#browser-agents) |
| Chat app with connectors, such as Claude or ChatGPT | Call remote tools | [MCP server](#mcp-server), read-only |

[Retrieve and verify](retrieve-and-verify.md) compares what each way can store, retrieve, and check.

## Local agents

In Claude Code and Codex, install the filecoin plugin. It adds the agent skill and the read-only [MCP server](#mcp-server) in one step.

{% tabs %}
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

The plugin follows the [Agent Plugins](https://agent-plugins.org) format, so other agents that support it can load it from the repository's [`plugins/filecoin`](https://github.com/filecoin-project/agents/tree/main/plugins/filecoin) directory.

In other agents, install the agent skill. It tells the agent when to use `filecoin`, the workflow, and the rules, and points it to the CLI's own help, which always matches the installed version:

```sh
npx skills add filecoin-project/agents
```

The agent runs the CLI with `npx -y filecoin`, which needs Node.js 24 or newer. To install it instead, run `npm install -g filecoin`. Then `filecoin skills install` installs the copy of the skill that matches the installed CLI.

The first `filecoin login` asks you to [approve the agent's key](#approve-the-agents-key).

## Cloud agents

A cloud agent has a shell, so it uses the same skill and CLI as a local agent. It has no browser to open for you, and its disk is gone when the session ends. `filecoin login` saves the session key on that disk, so each session would ask you to approve a new key.

Give the agent a key that outlives the session instead:

1. On the web app's [session keys page](https://pay.filecoin.io/dashboard/session-keys), generate a session key, authorize it, and export it.
2. In the agent's environment settings, add the key as the secret `FILECOIN_SESSION_KEY`, and your wallet address as `FILECOIN_ROOT_ADDRESS`.

`filecoin` then skips `filecoin login`, and `filecoin status` confirms the key works. The key cannot move funds, and it expires. Revoke it on the same page to stop the agent.

{% hint style="danger" %}
Never paste the session key into a chat. Store it only as a secret in the agent's environment.
{% endhint %}

`filecoin ls` and `filecoin operations` read a local database, which a new session starts without. [Find stored content](retrieve-and-verify.md#find-stored-content) shows how to look it up by wallet.

## Browser agents

The [web app](web-app.md) registers [WebMCP](https://webmachinelearning.github.io/webmcp/) tools. A browser agent can prepare a setup request without building a URL, and read the account, its data sets and pieces, and its session keys. The tools never sign anything, and they describe themselves to the agent. [WebMCP tools](web-app.md#webmcp-tools) lists them. WebMCP is an early preview that works in Chrome 149 and later. Without it, the agent opens a [setup link](web-app.md#setup-links).

A browser agent cannot run the CLI. You can store files from the dashboard's upload page while it watches, and a folder's link verifies in the browser.

## MCP server

The MCP server gives any agent read-only tools for storage providers, data sets, pieces, Filecoin Pay rails, and session keys, on mainnet and Calibration. It uses Streamable HTTP and needs no authentication. It cannot store or delete content.

```text
https://mcp.filecoin.io
```

The [filecoin plugin](#local-agents) adds it in Claude Code and Codex. To add the server alone, [add-mcp](https://github.com/neon-solutions/add-mcp) writes it into the configuration of Claude Code, Codex, Cursor, VS Code, and about 20 other agents:

```sh
npx -y add-mcp https://mcp.filecoin.io
```

It asks which agents to configure, and adds the server to the current project. Add `-g` to add it for your user instead.

Claude Code and Codex also add it with their own commands:

```sh
claude mcp add --transport http filecoin-api https://mcp.filecoin.io
codex mcp add filecoin-api --url https://mcp.filecoin.io
```

In the Claude and ChatGPT apps, add the URL as a custom connector. [API and MCP](api-and-mcp.md#mcp-server) lists the tools.

## Approve the agent's key

The agent never holds the wallet key. It gets a session key instead, and the wallet owner approves it:

1. The agent runs `filecoin login`. It gets a `login_pending` error with an approval link, and relays the link to you.
2. You open the link, connect your wallet, and review the request on the web app's setup page. Approve the session key, the Warm Storage approval, and a USDFC deposit if the page asks for them.
3. The agent runs `filecoin login --check` to confirm, then `filecoin put`. `--check` never makes a new key, so it can't replace the one you approved.

When the account runs low, `filecoin status` and `filecoin put` return `insufficient_funds` with a prefilled funding link for you. To stop the agent, revoke its key on the web app's [session keys page](https://pay.filecoin.io/dashboard/session-keys).

## Docs for agents

These docs are published in formats agents can read directly:

| Path | Contents |
| --- | --- |
| [`/llms.txt`](https://docs.filecoin.io/llms.txt) | An index of every page on docs.filecoin.io in Markdown, from [llmstxt.org](https://llmstxt.org) |
| [`/llms-full.txt`](https://docs.filecoin.io/llms-full.txt) | Every page in one Markdown file |
| [`/sitemap.xml`](https://docs.filecoin.io/sitemap.xml) | Every page |
| `https://docs.filecoin.io/~gitbook/mcp` | An MCP server that searches and reads these docs, described at [`/.well-known/mcp/server-card.json`](https://docs.filecoin.io/.well-known/mcp/server-card.json). This is separate from the read-only [Filecoin MCP server](#mcp-server) |

Every page also has a Markdown version. Add `.md` to the path, such as [`/build/filecoin-for-agents/cli.md`](https://docs.filecoin.io/build/filecoin-for-agents/cli.md), or send `Accept: text/markdown`.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/filecoin-for-agents/connect-an-agent)
