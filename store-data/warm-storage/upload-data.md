---
description: >-
  Upload a file or folder to Filecoin Cloud warm storage and get back a
  PieceCID and retrieval links; the SDK stores two copies on separate
  providers by default.
---

# Upload data

**Upload a file or folder with one command or one SDK call.** You get back a PieceCID, an ID made from the content, and links to download it. From then on, providers prove in every proving period that they still have it.

## Before you start

* Your account is funded and the Warm Storage service is approved. See [Fund storage](fund-storage.md).
* Each upload must be between 127 bytes and 63.5 GiB. A larger file isn't split for you: the upload is refused. Split it into smaller parts first. Each part becomes its own piece, and the parts can all go in the same data set.

## Upload

{% tabs %}
{% tab title="Agent" %}
1. Install the Filecoin plugin or skill in your agent. See [Agents](../../core-concepts/filecoin-for-agents.md).
2. Ask the agent to store a file or folder, for example: "Store `./report.pdf` on Filecoin."
3. The agent runs `filecoin put` and gives you two links: one to share and one for the exact stored bytes.
{% endtab %}

{% tab title="CLI" %}
```sh
filecoin put ./report.pdf          # a file, stored byte for byte
filecoin put ./site                # a folder, packed into one CAR file
filecoin put ./site --dry-run      # shows size, provider and cost; stores nothing
```

`put` returns `urls.browser`, the link to share, and `urls.piece`, the exact stored bytes. Folders skip dotfiles and can't contain symlinks.
{% endtab %}

{% tab title="SDK" %}
```ts
const data = new TextEncoder().encode("Hello, Filecoin!")

const { pieceCid, copies, complete } = await synapse.storage.upload(data)

console.log("PieceCID:", pieceCid.toString())
console.log("Stored with", copies.length, "providers")
if (!complete) console.warn("Not all copies were stored")
```
{% endtab %}
{% endtabs %}

## Check the result

A successful upload gives you:

* **The PieceCID.** Save it. You need it to retrieve the data.
* **Retrieval links** (CLI), or one entry per copy with its provider and data set (SDK).

In the SDK, `upload()` succeeds if at least one copy is stored. Always check `complete`: it is `true` only when every copy you asked for was stored. If a copy fails, the SDK tries up to five other providers before giving up.

## Choose how many copies

The SDK stores two copies by default, with two different providers. Ask for more for important data, or one for data you can easily recreate:

```ts
await synapse.storage.upload(data, { copies: 3 })
```

The CLI stores one copy, with one provider.

## Keep uploads together

Add the same metadata to related uploads, and the SDK puts them in the same data sets. This saves the cost of creating new data sets:

```ts
await synapse.storage.upload(data, {
  metadata: { Application: "My App" },
  pieceMetadata: { filename: "hello.txt" },
})
```

## If an upload is interrupted

* **CLI:** every `put` is saved as an operation before it changes anything. Resume it, and it won't store or charge twice:

  ```sh
  filecoin operations ls --incomplete
  filecoin operations resume op_…
  ```
* **SDK:** `upload()` throws only when no copy was stored. Catch the error and try again.

## Next steps

* [Retrieve data](retrieve-data.md).
* [Manage data sets](manage-data-sets.md).
* To upload many files, or control each step, see the [Filecoin SDK reference](../../reference/filecoin-sdk/README.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/warm-storage/upload-data)
