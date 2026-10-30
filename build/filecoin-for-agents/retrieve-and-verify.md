---
description: >-
  The links filecoin put returns, what each retrieval path verifies, and how
  to find stored content by wallet.
---

# Retrieve and verify

Everything `filecoin` stores has a PieceCID, and a folder also has a root CID:

* The **PieceCID** (`bafkzcib…`) identifies the exact stored bytes. The storage provider proves on chain that it still holds them.
* The **root CID** identifies a folder on IPFS. `filecoin` packs a folder into a UnixFS CAR, and the PieceCID covers that CAR.

`filecoin put` returns two links on the API's [`/get/{cid}` route](api-and-mcp.md#retrieval), which redirects to a provider that stores the content:

* `urls.browser` is the link to share. A browser renders a file straight from the provider, and opens a folder through [inbrowser.link](https://inbrowser.link).
* `urls.piece` returns the exact stored bytes.

The API finds providers through its indexer, so a new piece link returns `404` until the indexer has the piece. `filecoin inspect <ref> --check` reports when the piece link answers.

While the commit confirms, `filecoin put` prints an early browser link to stderr. When an agent runs it, or stderr is not a terminal, the line reads `filecoin: link: <url>`. In a terminal, it shows as `link: <url>` on the status line:

* **A file's early link** works as soon as the provider has the piece. It names the provider, so the API can redirect before its indexer catches up.
* **A folder's early link** comes once the commit is sent. It starts working shortly after, when the provider has indexed the folder and announced it to IPFS.

## What each way checks

| Way | Who can use it | Gets | Checks |
| --- | --- | --- | --- |
| `filecoin get <ref>` | Agents with a shell, and people | A file, or the folder, extracted | The bytes against the PieceCID, and for a folder the root CID. On a mismatch it keeps nothing and fails with `verification_failed` |
| `filecoin get <PieceCID>` | Agents with a shell, and people | When the PieceCID has no matching local resource record, it returns stored bytes as one file. For a folder, that is the CAR. If the CLI already knows the piece represents a folder, it extracts the folder even when called with its PieceCID. | The bytes against the PieceCID |
| A folder's `urls.browser` | Browser agents, and people | The folder, rendered | Each block, in the browser |
| A file's `urls.browser`, or `urls.piece` | Anything that speaks HTTP | The bytes | Nothing |

Use `filecoin get` when the content must be intact. When you hand over a link that checks nothing, say so.

## Find stored content

`filecoin ls` lists what this machine stored. The list lives in a local database, so a new machine, or a cloud sandbox that was reset, starts empty. The content is still on Filecoin, under the wallet that paid for it:

* Over MCP, `list_pieces` with the wallet as `owner`. Over HTTP, `GET /{network}/pieces?owner=<wallet>` on the API.
* In a browser, [PDP Explorer](https://pdp.filecoin.cloud) looks up a data set ID, provider ID, or PieceCID that you already have.

Each piece comes with a retrieval link. `filecoin get <PieceCID>` downloads and checks one with the same wallet's session key.

## Store without the CLI

The MCP server and the REST API cannot store anything. To store content, use the CLI, or build on the [Synapse SDK](../filecoin-onchain-cloud/synapse-quickstart.md).

For more on how retrieval works on Filecoin, see [How Filecoin works](../../getting-started/how-filecoin-works.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/filecoin-for-agents/retrieve-and-verify)
