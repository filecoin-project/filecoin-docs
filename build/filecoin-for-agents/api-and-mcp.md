---
description: >-
  A read-only REST API and MCP server for Filecoin storage providers, data
  sets, pieces, Filecoin Pay rails, and session keys.
---

# API and MCP

The [API](https://api.filecoin.io) serves read-only Filecoin data: storage providers, data sets, pieces, Filecoin Pay rails, and session keys. It reads from an indexer of the Filecoin chain, so its data trails the chain. `/health` reports the latest indexed block. It cannot store, delete, or sign anything.

The interactive reference is at [`/docs`](https://api.filecoin.io/docs), and the OpenAPI 3.1 document is at [`/openapi.json`](https://api.filecoin.io/openapi.json).

## Routes

`GET /openapi.json` lists every route and its filters. The [MCP server](#mcp-server) has its own host, `https://mcp.filecoin.io`. `GET /health` reports the latest indexed block per network, and [`GET /get/{cid}`](#retrieval) redirects to where content can be retrieved. Every data route starts with the network, `/calibration/...` or `/mainnet/...`, and reads one of: indexer status, storage providers, data sets and their pieces, pieces by owner or PieceCID, Filecoin Pay rails and their settlements, and session keys and their history.

Conventions:

* **Owner** is the address that pays for a data set.
* **Big numbers**, such as IDs, amounts, and epochs, are decimal strings.
* **Pagination** uses `limit` (1 to 200, default 50) and an opaque `cursor`. Each response looks like `{ data, nextCursor }`.
* **Errors** look like `{ error: { code, message } }`.
* **Operation IDs**, such as `listDataSets` and `retrieve`, name every operation in the OpenAPI document, for function calling and generated clients.

## Retrieval

`GET /get/{cid}?network=mainnet&browser=false` redirects to where the content can be fetched. It never proxies the bytes. `network` defaults to `mainnet`.

| CID | `browser` | Redirect |
| --- | --- | --- |
| PieceCID v2 (`bafkzcib…`) | `false` or absent | The provider's `/piece/{cid}` |
| PieceCID v2 (`bafkzcib…`) | `true` | `https://inbrowser.link/ipfs/{root}` when the piece is a folder, otherwise the provider's `/piece/{cid}` |
| Other CID (IPFS content) | `false` or absent | The provider's `/ipfs/{cid}` |
| Other CID (IPFS content) | `true` | `https://inbrowser.link/ipfs/{cid}` |

`provider={id}` names a provider to redirect to when the indexer has no copy yet. It covers the time between a provider receiving a piece and the indexer seeing the commit. An indexed copy always wins over it. `filecoin put` adds it to the early links it prints before the commit confirms.

Legacy v1 PieceCIDs (`baga…`) and strings that aren't CIDs return `400`. If no live copy exists and no `provider` applies, the response is `404`. When several providers store the content, the route prefers endorsed providers, then approved ones, then the oldest copy.

## MCP server

The MCP server at `https://mcp.filecoin.io` offers one read-only tool for each data route. Each tool requires a `network` argument.

| Tool | Reads |
| --- | --- |
| `get_status` | Indexer progress |
| `list_providers`, `get_provider` | Storage providers |
| `list_data_sets`, `get_data_set` | Data sets |
| `list_data_set_pieces`, `get_piece`, `list_pieces` | Pieces |
| `list_rails`, `get_rail`, `list_rail_settlements` | Filecoin Pay rails and settlements |
| `list_session_keys`, `list_session_key_events` | Session keys and their history |

[Connect an agent](connect-an-agent.md#mcp-server) shows how to add it to an agent.

## Limits

* **Rate limits.** 120 requests a minute per IP for the REST API, and 60 for MCP. Over the limit, requests get `429` with `Retry-After`.
* **Caching.** Data reads are not cached by browsers, so every read returns the latest indexed data.
* **No authentication.** Every route is public and read-only.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/filecoin-for-agents/api-and-mcp)
