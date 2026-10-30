---
description: >-
  Filecoin Cloud is a programmable storage, retrieval and payments stack on
  Filecoin: warm storage proven with PDP, cold storage proven with PoRep, paid
  in USDFC through Filecoin Pay.
---

# Filecoin Cloud

**Filecoin Cloud is a storage service built on Filecoin.** Independent storage providers keep your data, and they must prove onchain, again and again, that they still have it. You pay in USDFC, a stablecoin, and providers are paid only for storage they prove.

## What you get

* **Warm storage** for data you read often. Providers keep it ready to download over HTTPS and prove they have it with Proof of Data Possession (PDP). The Filecoin SDK keeps two copies, with two different providers, by default.
* **Cold storage** for large datasets you rarely read but must keep. Providers seal the data and prove it with Proof of Replication (PoRep).
* **Payments with Filecoin Pay.** You deposit funds once. Filecoin Pay pays providers over time, while they keep proving.
* **A record anyone can check.** Every proof and every payment is recorded onchain.
* **Fast retrieval.** Download your data over HTTPS by its PieceCID. The CLI and SDK check that the bytes match what you stored.

## Warm or cold storage?

|  | Warm storage | Cold storage |
| --- | --- | --- |
| Best for | App data, media, agent files, anything you read often | Archives, research and company datasets, backups, from 1 TiB |
| How it's proven | PDP: providers answer random checks onchain | PoRep: providers seal a unique copy and prove it every day |
| Copies | One or more; the SDK default is two | One or more, your choice |
| Getting data back | Fast, over HTTPS | From the provider's unsealed copy |
| Start with | [Upload data](warm-storage/upload-data.md) | [Cold storage for archival data](cold-storage/cold-storage-for-archival-data.md) |

Not sure which one you need? See [Choose a storage option](../getting-started/choose-a-storage-option.md).

## Ways to use it

| Use case | Tool |
| --- | --- |
| Have an AI agent, such as Claude Code or Codex, store and fetch files for you | Agents |
| Store files from a terminal or a script | [Filecoin CLI](tools/filecoin-cli.md) |
| Build storage into a JavaScript or TypeScript app | [Filecoin SDK](tools/filecoin-sdk.md) |
| Keep IPFS content on Filecoin under the same CIDs | [Filecoin Pin](tools/filecoin-pin.md) |
| Use a ready-made service, such as S3-compatible storage | [Storage onramps](tools/storage-onramps.md) |

## How it compares with traditional cloud storage

|  | Traditional cloud | Filecoin Cloud |
| --- | --- | --- |
| Who controls the data | The provider | You |
| How you know it's stored | You trust the provider | Providers prove it onchain |
| What you can check | The provider's own reports | Every proof and payment, onchain |
| How you build on it | The provider's API | Open smart contracts |
| How you pay | Fixed plans | Pay as you go, only for proven storage |
| Lock-in | High | None: you choose your providers |

## Next steps

* [Quickstart](../getting-started/quickstart.md): store your first file.
* [How it works](overview/how-it-works.md): the parts of Filecoin Cloud and how they fit.
* [Pricing](overview/pricing.md): what storage costs.
* [Fund storage](warm-storage/fund-storage.md): set up payment before you upload.

For planned maintenance and contract upgrades, subscribe to the [Filecoin Cloud status page](https://status.filecoin.cloud).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data)
