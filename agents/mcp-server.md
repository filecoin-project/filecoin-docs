---
description: >-
  Connect an agent to the read-only Filecoin MCP server to look up storage
  providers, data sets, files, payments, and session keys.
---

# MCP server

**The Filecoin MCP server lets an agent look up Filecoin data: storage providers, data sets, files, payments, and session keys.** It's read-only, so it can't store or delete anything. To store data, use the [Filecoin Skill](filecoin-skill/README.md).

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Connect yourself to the Filecoin MCP server by following this page:
https://docs.filecoin.io/agents/mcp-server.md

1. Add the server at https://mcp.filecoin.io. It needs no sign-in.
2. Use `get_status` to check the connection.
3. Use the Calibration testnet unless I ask about mainnet.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* An agent or app that supports remote MCP servers, such as Claude Code, Codex, Cursor, Claude, or ChatGPT
{% endhint %}

## Connect it

The server is at `https://mcp.filecoin.io` and needs no sign-in. The [Filecoin plugin](filecoin-skill/README.md#install) adds it in Claude Code and Codex. To add it on its own:

{% tabs %}
{% tab title="Claude Code" %}
```sh
claude mcp add --transport http filecoin-api https://mcp.filecoin.io
```
{% endtab %}

{% tab title="Codex" %}
```sh
codex mcp add filecoin-api --url https://mcp.filecoin.io
```
{% endtab %}

{% tab title="Other agents" %}
```sh
npx -y add-mcp https://mcp.filecoin.io
```

[add-mcp](https://github.com/neon-solutions/add-mcp) adds the server to Cursor, VS Code, and about 20 other agents. Add `-g` to add it for your user instead of the current project.
{% endtab %}

{% tab title="Claude and ChatGPT apps" %}
Add `https://mcp.filecoin.io` as a custom connector.
{% endtab %}
{% endtabs %}

## Tools

| Tool | Looks up | Network |
| --- | --- | --- |
| `get_status` | The latest block the server has read | `mainnet` or `calibration` |
| `list_providers`, `get_provider` | Storage providers | `mainnet` or `calibration` |
| `list_data_sets`, `get_data_set` | Data sets | `mainnet` or `calibration` |
| `list_data_set_pieces`, `get_piece`, `list_pieces` | Files | `mainnet` or `calibration` |
| `list_rails`, `get_rail`, `list_rail_settlements` | Filecoin Pay payments | `mainnet` or `calibration` |
| `list_session_keys`, `list_session_key_events` | Session keys | `mainnet` or `calibration` |
| `search_docs` | These docs. Takes a `query` | N/A |

## Notes

* The data can lag slightly behind the chain.
* The same data is available as a REST API at [api.filecoin.io](https://api.filecoin.io/docs).
* The server allows 60 requests a minute from each IP address. Over the limit, it returns `429` with a `Retry-After` header.

## Docs MCP server

To search and read these docs, add `https://docs.filecoin.io/~gitbook/mcp`. See [llms.txt and markdown docs](llms-txt.md).

For MCP servers built by the community, see [Additional resources](../store-data/resources/additional-resources.md#community-tools).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/agents/mcp-server)
