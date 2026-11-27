---
description: >-
  Add the read-only Filecoin MCP server to a chat app, an editor, or an agent,
  and see the tools it offers.
---

# MCP server

The MCP server gives any agent read-only tools for storage providers, data sets, pieces, Filecoin Pay rails, and session keys, on mainnet and Calibration. It uses Streamable HTTP and needs no authentication. It cannot store or delete content.

## Install

```text
https://mcp.filecoin.io
```

<a href="https://claude.ai/customize/connectors?modal=add-custom-connector&#x26;connectorName=Filecoin&#x26;connectorUrl=https%3A%2F%2Fmcp.filecoin.io" class="button primary" data-icon="claude">Add to Claude</a> <a href="cursor://anysphere.cursor-deeplink/mcp/install?name=filecoin&#x26;config=eyJ1cmwiOiJodHRwczovL21jcC5maWxlY29pbi5pbyJ9" class="button secondary">Add to Cursor</a> <a href="vscode:mcp/install?%7B%22name%22%3A%22filecoin%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.filecoin.io%22%7D" class="button secondary">Add to VS Code</a>

Each button opens the app with the server filled in. The app adds the server after you confirm. The Claude button opens claude.ai. The Cursor and VS Code buttons need the app on your computer.

The [Filecoin plugin](plugin.md) adds the server in Claude Code, Codex, and Cursor, together with the [skills](skills.md). To add the server alone, run a command:

{% tabs %}
{% tab title="Claude Code" %}
```sh
claude mcp add --transport http filecoin https://mcp.filecoin.io
```
{% endtab %}

{% tab title="Codex" %}
```sh
codex mcp add filecoin --url https://mcp.filecoin.io
```
{% endtab %}

{% tab title="Other agents" %}
```sh
npx -y add-mcp https://mcp.filecoin.io
```

[add-mcp](https://github.com/neon-solutions/add-mcp) writes the server into the configuration of Claude Code, Codex, Cursor, VS Code, and about 20 other agents. It asks which agents to configure, and adds the server to the current project. To add the server for your user instead, add `-g`.
{% endtab %}
{% endtabs %}

In ChatGPT and other apps without an install link, add the URL as a custom connector in the app's settings.

## Tools

The server offers one read-only tool for each [API](api.md) data route, plus `search_docs`. Each data tool requires a `network` argument.

| Tool | Reads |
| --- | --- |
| `get_status` | Indexer progress |
| `list_providers`, `get_provider` | Storage providers |
| `list_data_sets`, `get_data_set` | Data sets |
| `list_data_set_pieces`, `get_piece`, `list_pieces` | Pieces |
| `list_rails`, `get_rail`, `list_rail_settlements` | Filecoin Pay rails and settlements |
| `list_session_keys`, `list_session_key_events` | Session keys and their history |
| `search_docs` | Page excerpts from docs.filecoin.io that match a `query`. Takes `query`, not `network` |

The server allows 60 requests a minute per IP. [Limits](api.md#limits) describes the response over the limit.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/agents/mcp)
