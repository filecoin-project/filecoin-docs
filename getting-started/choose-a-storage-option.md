---
description: >-
  Compare the ways to store data on Filecoin: Filecoin Cloud warm storage,
  Filecoin Pin, the Filecoin Cold Storage Service, Fil One, and other managed
  services.
---

# Choose a storage option

**Filecoin offers several ways to store data. Pick one by how often you read the data, how much of it you have, and the tools you already use.**

## Compare the options

| Option | Best for | Start here | How you store | Proof | Retrieval | Pricing |
| --- | --- | --- | --- | --- | --- | --- |
| **Filecoin Cloud warm storage** | App data, AI datasets, agent memory, anything you read often | [Quickstart](quickstart.md) | The Filecoin SDK, the `filecoin` CLI, or an agent skill | PDP | Directly from the provider over HTTP, with no egress charge | $2.50 per TiB per month for each copy (2 copies by default), plus $0.12 per data set per month, paid in USDFC |
| **Filecoin Pin** | IPFS content you want to keep, under the same CIDs | [Filecoin Pin](../store-data/tools/filecoin-pin.md) | The Filecoin Pin CLI or GitHub Action | PDP | IPFS tools and HTTP gateways | Same as warm storage: $2.50 per TiB per month for each copy, plus $0.12 per data set per month |
| **Filecoin Cold Storage Service** | Archives and datasets of 1 TiB or more that you rarely read | [Filecoin Cold Storage Service](../store-data/cold-storage/cold-storage-for-archival-data.md) | The PoRep Market CLI, the FCSS client app, or the `fcss-client` agent skill | PoRep and Proof of Spacetime | From the provider's unsealed copy over HTTP, free or paid per piece | From $3 per TiB per month, for a term of 6 months or more |
| **Fil One** | Teams that want S3-compatible storage | [Fil One docs](https://docs.fil.one/) | Any S3 SDK or tool | Integrity proofs from the Filecoin network | The S3 API | $5.99 per TB per month ($5.99 monthly minimum), with no egress fees |
| **Other managed services** | Teams that want a service to handle storage for them | [Managed services](#managed-services) | The service's own app, API, or SDK | Varies by service | Varies by service | Set by each service |

Prices as of October 2026, from [Filecoin Cloud](https://docs.filecoin.cloud/introduction/about/), the [FCSS client app](https://clients.fcss.fidl.tech/#pricing), and [Fil One](https://fil.one/). See [Pricing](../store-data/overview/pricing.md) for current prices.

## How to choose

* **Do you read the data often?** Use warm storage. If you read it rarely and have 1 TiB or more, use cold storage.
* **Is your data already on IPFS?** Use Filecoin Pin to keep your CIDs. See [Migrate from IPFS](paths/migrate-from-ipfs.md).
* **Do your tools already use S3?** Use Fil One.
* **Is the data for an AI agent?** See [Filecoin for Agents](../core-concepts/filecoin-for-agents.md) to connect your agent to warm storage.
* **Would you rather not manage storage yourself?** Use a managed service.

## Managed services

These services store data on Filecoin for you:

* [Fil One](https://fil.one/): S3-compatible object storage backed by Filecoin. See the [Fil One docs](https://docs.fil.one/).
* [Akave](https://www.akave.ai/): a decentralized data lake and object storage layer backed by Filecoin.
* [Lighthouse](https://lighthouse.storage/): permanent, decentralized storage powered by Filecoin.
* [CID Gravity](https://www.cidgravity.com/): a web UI for uploading files to Filecoin and IPFS.

## Make deals directly

To choose storage providers and negotiate deal terms yourself, see [Manual storage deals](../protocol/manual-storage-deals.md). This path needs more setup and an understanding of the Filecoin deal lifecycle.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/getting-started/choose-a-storage-option)
