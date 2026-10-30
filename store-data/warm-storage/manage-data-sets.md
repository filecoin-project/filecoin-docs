---
description: >-
  List your data sets and their pieces, add data to an existing data set,
  remove pieces, or end the service for a data set, from an agent, the CLI or
  the SDK.
---

# Manage data sets

**A data set is the group of your files that one provider keeps for you.** Each copy of your data lives in its own data set. You can see what's in your data sets, add more files to them, delete files, or end a data set when you no longer need it.

## See your data sets

### Agent

Ask your agent what you have stored. Agents with a shell run `filecoin ls` and `filecoin inspect`. Agents that use the read-only MCP server call `list_data_sets`, `get_data_set` and `list_data_set_pieces`.

### CLI

```sh
filecoin ls                     # what you stored from this machine
filecoin ls --all               # also shows files waiting to be removed
filecoin inspect res_… --check  # details, and whether the link works
```

### SDK

```ts
const dataSets = await synapse.storage.findDataSets()
for (const ds of dataSets) {
  console.log(ds.pdpVerifierDataSetId, { live: ds.isLive, metadata: ds.metadata })
}

// List the files (pieces) in one data set
const context = await synapse.storage.createContext({ dataSetId: 1n })
for await (const piece of context.getPieces()) {
  console.log(piece.pieceCid.toString())
}
```

## Add files to a data set you already have

Creating a data set costs a small fee, so reuse the ones you have. In the SDK, give related uploads the same `metadata` and they go into the same data sets. See [Upload data](upload-data.md).

## What a data set costs

Each data set has a flat fee of $0.12 a month for the proving service, whatever its size, plus storage at $2.50 per TiB per month. The fee isn't split by size: a data set holding one small file pays the full $0.12. It is charged only while the data set holds files. To keep costs down, put related files in the same data set. See [Pricing](../overview/pricing.md).

## Delete a file

Deleting a file asks the provider to remove it. Billing for it stops, and the provider stops proving it. You can't undo a delete.

### Agent

Ask your agent to delete the file. It runs `filecoin delete … --yes`.

### CLI

```sh
filecoin delete res_… --yes
```

The file's state becomes `removal_pending` until the provider removes it. Without `--yes`, the CLI asks you to confirm.

### SDK

```ts
const context = await synapse.storage.createContext({ dataSetId: 1n })
await context.deletePiece({ piece: "bafkzcib…" })
```

## End a data set

Ending a data set stops its service and its payments. The provider may then delete all of its data. **This can't be undone.**

```ts
const result = await synapse.storage.terminateService({ dataSetId: 42n })
console.log("Service ends at epoch", result.endEpoch)
```

There are two ways to end a data set:

|  | Through the provider (default) | On your own (`skipProvider: true`) |
| --- | --- | --- |
| Who sends the transaction | The provider, with your signed approval | You |
| When service stops | Right away | At the end of the lockup, about 30 days |
| Cost | A small fee in USDFC | Gas in FIL |
| Use when | Normally | The provider is offline, or your account can't settle in full |

## Next steps

* [Monitor balance and proofs](monitor-balance-and-proofs.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/warm-storage/manage-data-sets)
