---
description: >-
  Retrieval is how users fetch content from Filecoin storage providers, IPFS, and Filecoin-backed storage services.
---

# Retrieval

Retrieval means fetching stored data back from Filecoin. The right retrieval path depends on how the data was stored, which identifiers you have, and whether you want a managed service API or direct storage-provider retrieval.

Use this page as a starting point. For implementation details, see the [How retrieval works](../../store-on-filecoin/how-retrieval-works/README.md) section.

## Common retrieval paths

### Retrieve from Filecoin Onchain Cloud

Use the [Filecoin Onchain Cloud retrieval docs](https://docs.filecoin.cloud/core-concepts/retrieval/) when your data was stored through Filecoin Onchain Cloud or the Synapse SDK. Those docs cover the current FOC retrieval paths, SDK flows, and service-specific options.

### Retrieve from Fil One

[Fil One](https://docs.fil.one/) is an S3-compatible object storage service backed by Filecoin. If your data is stored in Fil One, retrieve it with the same S3-compatible tools, SDKs, or application paths you use for object storage.

### Retrieve directly from Filecoin storage providers

Use direct storage-provider retrieval when your data was stored through direct deal making or another provider-specific workflow and you need to fetch it from the providers that hold it.

Direct retrieval usually starts with either a PieceCID or an IPFS CID:

- For a PieceCID, use Filecoin deal, sector, storage-service, or provider metadata to identify a provider that stores the piece, then retrieve from the provider's HTTP `/piece/{pieceCid}` endpoint when available.
- For an IPFS CID, use content routing such as the [InterPlanetary Network Indexer](https://cid.contact/) to find providers that advertised the CID. Some providers expose an `/ipfs/{cid}` endpoint for IPFS-style retrieval.

Use [Lassie](https://github.com/filecoin-project/lassie) for CID-based retrieval from Filecoin and IPFS. Lassie can discover providers for advertised CID content and fetch it with `lassie fetch <CID>`, or run as an HTTP daemon for `/ipfs/{cid}` requests. For whole-piece retrieval by PieceCID, use a provider or service path that supports `/piece`.

## Where to go next

- [Filecoin Onchain Cloud retrieval](https://docs.filecoin.cloud/core-concepts/retrieval/) covers retrieval for data stored through Filecoin Onchain Cloud.
- [Fil One docs](https://docs.fil.one/) cover retrieval through S3-compatible object storage APIs.
- [Basic retrieval](../../store-on-filecoin/how-retrieval-works/basic-retrieval.md) covers fetching CID-addressed data with Lassie.
- [Serving retrievals](../../store-on-filecoin/how-retrieval-works/serving-retrievals.md) explains provider advertisements, IPNI, and retrieval protocols.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/getting-started/what-is-filecoin/retrieval)
