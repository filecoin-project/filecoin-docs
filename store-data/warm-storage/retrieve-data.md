---
description: >-
  Retrieve data from Filecoin Cloud by PieceCID over HTTPS from the storage
  provider; use `filecoin get` or the SDK's download to verify the bytes
  match.
---

# Retrieve data

**To get your data back, ask for it by its PieceCID.** The CLI and SDK download it from a provider over HTTPS and check that the bytes match the PieceCID. A plain download link is faster to share but checks nothing.

## Retrieve

### Agent

Ask your agent for the file by its PieceCID, or by the reference it saved when it stored the file. The agent runs `filecoin get` and tells you whether the check passed.

Agents without a shell, such as chat apps, can't download files. They can still look up your stored pieces and give you their links through the read-only MCP server.

### CLI

```sh
filecoin get res_… --output ./copy     # by the reference from filecoin put
filecoin get bafkzcib… --output ./copy # or by PieceCID
```

`get` checks the bytes against the PieceCID, and unpacks folders. If the check fails, it keeps nothing and returns an error.

### SDK

```ts
const bytes = await synapse.storage.download({ pieceCid })
```

The SDK finds which of your providers has the piece, downloads from the first one that answers, and checks the bytes against the PieceCID.

## Share a link

`filecoin put` returns two links:

* `urls.browser`: the link to share. A browser shows a file directly, and opens a folder through [inbrowser.link](https://inbrowser.link).
* `urls.piece`: the exact stored bytes.

Both go through `api.filecoin.io/get/{cid}`, which sends you to a provider that has the content. A new upload's link can return "404 Not Found" for a short time, until the network has indexed it. `filecoin inspect res_… --check` tells you when the link works.

## What each way checks

| Method | Retrieves | Checks the bytes? |
| --- | --- | --- |
| `filecoin get` | The file, or the folder unpacked | Yes, against the PieceCID (and the root CID for folders) |
| SDK `download()` | The bytes | Yes, against the PieceCID |
| A folder's `urls.browser` | The folder, in a browser | Yes, block by block in the browser |
| A file's `urls.browser`, or `urls.piece` | The bytes | No |

When the content must be exactly right, use `filecoin get` or the SDK. If you hand someone a link that checks nothing, tell them.

## Retrieve over IPFS

Folders stored with the CLI, and content stored with Filecoin Pin, also have a root CID. Any IPFS tool or gateway can fetch them by that CID. See [Filecoin and IPFS](../../getting-started/how-storage-works/filecoin-and-ipfs.md).

## Find what you stored

* `filecoin ls` lists what you stored from this machine. A new machine starts with an empty list, but your data is still on Filecoin.
* To list everything your wallet stored, use the MCP tool `list_pieces` with your wallet as `owner`, or `GET /{network}/pieces?owner=<wallet>` on [api.filecoin.io](https://api.filecoin.io/docs).
* To look up one data set, provider or PieceCID, use [PDP Explorer](https://pdp.filecoin.cloud).

## Next steps

* [Manage data sets](manage-data-sets.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/warm-storage/retrieve-data)
