---
description: >-
  Read docs.filecoin.io as Markdown: llms.txt, llms-full.txt, a .md version
  of every page, and an MCP server that searches the docs.
---

# llms.txt and markdown docs

**Every page on docs.filecoin.io is available as Markdown, so agents can read the docs directly.**

| Path | Contents |
| --- | --- |
| [`/llms.txt`](https://docs.filecoin.io/llms.txt) | A list of every page, with links to their Markdown versions |
| [`/llms-full.txt`](https://docs.filecoin.io/llms-full.txt) | Every page in one file |
| [`/sitemap.xml`](https://docs.filecoin.io/sitemap.xml) | Every page, for crawlers |
| `https://docs.filecoin.io/~gitbook/mcp` | An MCP server that searches and reads these docs |

To get one page as Markdown, add `.md` to its URL, such as [`/getting-started/quickstart.md`](https://docs.filecoin.io/getting-started/quickstart.md), or request it with an `Accept: text/markdown` header.

To look up Filecoin data, such as providers and data sets, use the [Filecoin MCP server](mcp-server.md) instead.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/agents/llms-txt)
