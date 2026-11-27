---
description: >-
  The read-only API for Filecoin storage providers, data sets, pieces,
  Filecoin Pay rails, and session keys, and its retrieval route.
---

# API

The [API](https://api.filecoin.io) serves read-only Filecoin data: storage providers, data sets, pieces, Filecoin Pay rails, and session keys. It reads from an indexer of the Filecoin chain, so the newest blocks appear only after the indexer reads them. `/health` reports the latest indexed block. The API cannot store, delete, or sign anything.

The interactive reference is at [`/docs`](https://api.filecoin.io/docs), and the OpenAPI 3.1 document is at [`/openapi.json`](https://api.filecoin.io/openapi.json).

To call the API from TypeScript, install [`@filecoin-project/api-client`](https://www.npmjs.com/package/@filecoin-project/api-client) from npm. Its types come from the OpenAPI document, and it runs in any runtime that has `fetch`.

## Routes

`GET /openapi.json` lists every route and its filters. These routes have no network in the path:

* `GET /health` reports the latest indexed block for each network.
* [`GET /get/{cid}`](#retrieval) redirects to where content can be retrieved.
* `POST /mcp` is the [MCP server](mcp.md).

Every data route starts with the API version and the network, `/v1/calibration/...` or `/v1/mainnet/...`. The data routes read these resources:

* Indexer status.
* Storage providers.
* Data sets and their pieces.
* Pieces by owner or by PieceCID.
* Filecoin Pay rails and their settlements.
* Session keys and their history.

The API uses these conventions:

* **Owner** is the address that pays for a data set.
* **Big numbers**, such as IDs, amounts, and epochs, are decimal strings.
* **Pagination** uses `limit` and an opaque `cursor`. `limit` is from 1 to 200, and the default is 50. Each response has the shape `{ data, nextCursor }`.
* **Errors** have the shape `{ error: { code, message } }`.
* **Operation IDs**, such as `listDataSets` and `retrieve`, name every operation in the OpenAPI document. Function calling and generated clients use them.

## Versioning

The data routes carry their version in the path, `/v1`. `/get/{cid}`, `/health`, and the MCP server have no version.

New routes, new optional parameters, and new response fields can appear in v1 without notice. Ignore fields that your client doesn't know.

A breaking change, such as a removed or renamed field, ships under `/v2`. v1 then keeps working for at least six months. During that time, v1 responses send a `Deprecation` header, defined in [RFC 9745](https://www.rfc-editor.org/rfc/rfc9745). They also send a `Sunset` header, defined in [RFC 8594](https://www.rfc-editor.org/rfc/rfc8594), with the date when v1 can stop working. No route is deprecated now.

## Retrieval

`GET /get/{cid}?network=mainnet&browser=false` redirects to where the content can be fetched. It never proxies the bytes. `network` defaults to `mainnet`.

| CID | `browser` | Redirect |
| --- | --- | --- |
| PieceCID v2, starting with `bafkzcib` | `false` or absent | The provider's `/piece/{cid}` |
| PieceCID v2, starting with `bafkzcib` | `true` | `https://inbrowser.link/ipfs/{root}` when the piece is a folder, otherwise the provider's `/piece/{cid}` |
| Other CID, for IPFS content | `false` or absent | The provider's `/ipfs/{cid}`, for a folder root or for any file or block inside it |
| Other CID, for IPFS content | `true` | `https://inbrowser.link/ipfs/{cid}` |

`provider={id}` names a provider to redirect to when the indexer has no copy yet. It covers the time between a provider receiving a piece and the indexer seeing the commit. An indexed copy always takes precedence over `provider`. `filecoin put` adds `provider` to the early links it prints before the commit confirms.

When neither the indexer nor `provider` has the CID, the route looks it up in [IPNI](https://cid.contact). It then redirects to a provider that serves the content over HTTPS. That provider can be outside Filecoin. The `X-Source` header says where the answer came from: `index`, `hint`, or `ipni`.

The route returns these errors:

* `400` for a legacy v1 PieceCID, which starts with `baga`, or for a string that isn't a CID.
* `404` when no source has the CID.
* `502` when the indexer has no copy and the IPNI lookup fails.

When several providers store the content, the route prefers endorsed providers, then approved providers, then the oldest copy.

## Limits

* **Rate limits.** The API allows 120 requests a minute per IP, and the MCP server allows 60. Responses send the limit in a `RateLimit-Policy` header, such as `"api";q=120;w=60`. Over the limit, requests get `429` with a `Retry-After` header.
* **Caching.** Browsers do not cache data reads. The API can reuse a query result for up to 5 seconds, so a read can be up to 5 seconds behind the indexer.
* **No authentication.** Every route is public and read-only.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/agents/api)
