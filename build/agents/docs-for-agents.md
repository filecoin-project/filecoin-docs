---
description: >-
  Read docs.filecoin.io as Markdown, and find the files and the MCP server that
  describe these docs to agents.
---

# Docs for agents

docs.filecoin.io serves every page as Markdown. It also serves files that list its pages, and an MCP server that searches them.

## Markdown versions

Every page has a Markdown version. To get it, add `.md` to the path, such as [`/build/agents/mcp.md`](https://docs.filecoin.io/build/agents/mcp.md), or send `Accept: text/markdown`:

```sh
curl -H 'Accept: text/markdown' https://docs.filecoin.io/build/agents/mcp
```

## Discovery files

| Path | Contents |
| --- | --- |
| [`/llms.txt`](https://docs.filecoin.io/llms.txt) | An index of every page in Markdown, from [llmstxt.org](https://llmstxt.org) |
| [`/llms-full.txt`](https://docs.filecoin.io/llms-full.txt) | Every page in one Markdown file |
| [`/sitemap.xml`](https://docs.filecoin.io/sitemap.xml) | Every page |
| [`/.well-known/mcp/server-card.json`](https://docs.filecoin.io/.well-known/mcp/server-card.json) | The card that describes the docs MCP server |

## Docs MCP server

`https://docs.filecoin.io/~gitbook/mcp` is an MCP server that searches and reads these docs. It is separate from the read-only [Filecoin MCP server](mcp.md), which reads chain data and also offers a `search_docs` tool.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/agents/docs-for-agents)
