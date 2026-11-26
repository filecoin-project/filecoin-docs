---
description: >-
  The Filecoin SDK storage methods: upload, download, data sets, costs and ending storage.
---

# Filecoin SDK storage operations

**The main Filecoin SDK (`@filoz/synapse-sdk`) handles provider choice, copies, data sets and payments for you.** Storage methods live on `synapse.storage`.

For step-by-step guides, see [Upload data](../../store-data/warm-storage/upload-data.md), [Retrieve data](../../store-data/warm-storage/retrieve-data.md) and [Manage data sets](../../store-data/warm-storage/manage-data-sets.md).

## Set up

```bash
npm install @filoz/synapse-sdk viem
```

```ts
import { Synapse, mainnet } from "@filoz/synapse-sdk"
import { privateKeyToAccount } from "viem/accounts"

const synapse = Synapse.create({
  account: privateKeyToAccount("0x..."),
  source: "my-app",
  chain: mainnet, // default is Calibration Testnet
})
```

## Example: upload and download

```ts
const { pieceCid, size, copies } = await synapse.storage.upload(data)
const bytes = await synapse.storage.download({ pieceCid })
```

`upload()` stores 2 copies with 2 different providers by default. Set `copies` to change this.

## Terms

* **Data set:** a group of pieces stored with one provider. It has one payment rail, and its pieces are proven together.
* **PieceCID:** the ID of your data, made from its content. It starts with `bafkzcib`.
* **Metadata:** labels you add. Up to 10 per data set and 3 per piece.
* **Storage context:** a link to one provider and one data set. `upload()` makes these for you. Make them yourself when you need to pick a provider or data set.

## `synapse.storage` methods

| Method | What it does |
| --- | --- |
| `upload(data, options?)` | Upload data and store the copies. Returns `pieceCid`, `size`, `copies` |
| `download({ pieceCid })` | Download a piece from any provider that has it |
| `downloadStream({ pieceCid })` | Same, as a stream, for large files |
| `findDataSets()` | List your data sets |
| `createContext(options?)` | Get one storage context |
| `createContexts(options?)` | Get one storage context per copy |
| `getUploadCosts(options)` | Cost, deposit needed and approval state for an upload |
| `prepare(options)` | Get your account ready (deposit and approval) before an upload |
| `getStorageInfo()` | Prices, providers and network settings |
| `terminateService({ dataSetId })` | End storage for a data set |

## Storage context methods

| Method | What it does |
| --- | --- |
| `upload(data)` | Upload to this provider and data set |
| `store(data)` | Upload to the provider without adding it onchain yet |
| `pull(options)` | Ask this provider to copy pieces from another provider |
| `commit(options)` | Add stored pieces to the data set onchain |
| `download({ pieceCid })`, `downloadStream(...)` | Download from this provider only |
| `getPieces()` | List the pieces in the data set |
| `pieceStatus({ pieceCid })` | Check a piece's status |
| `deletePiece({ piece })`, `deletePieces({ pieces })` | Delete pieces. This can't be undone |
| `getProviderInfo()` | This provider's details |
| `terminate()` | End storage for this data set |

## Ending storage

Ending storage can't be undone. After it ends, the provider can delete the data.

|  | Through the provider (default) | Onchain yourself (`skipProvider: true`) |
| --- | --- | --- |
| Who sends it | The provider, with your signature | You |
| When it ends | Right away | At the end of the lockup period, about 30 days |
| Cost | A small fee in USDFC | Gas in FIL |
| Needs | Provider online, enough balance to pay what you owe | A wallet with FIL |

```ts
await synapse.storage.terminateService({ dataSetId: 42n })
await synapse.storage.terminateService({ dataSetId: 42n, skipProvider: true })
```

Every method, with its inputs and outputs: [Filecoin SDK API](https://docs.filecoin.cloud/reference/filoz/synapse-sdk/toc/).

## Next steps

* [Filecoin SDK Core](README.md): the low-level functions the SDK is built on.
* [Filecoin SDK session keys](session-keys.md): sign storage actions without a wallet popup.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/reference/filecoin-sdk/storage-operations)
