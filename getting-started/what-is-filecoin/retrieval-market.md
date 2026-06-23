---
description: >-
  Retrieval is how users fetch content from Filecoin storage providers, IPFS,
  and Filecoin-based storage services.
---

# Retrieval

Retrieval means fetching stored data back by its content identifier. In
Filecoin, that usually starts with a CID or PieceCID and then routes to a
storage provider, IPFS peer, gateway, or managed storage service that can serve
the content.

Filecoin retrieval is no longer best described as a single retrieval market. The
right path depends on how the data was stored, whether it was advertised for
public discovery, and whether you want to use a managed API or retrieve directly
from the network.

## Common retrieval paths

### Retrieve by CID with Lassie

[Lassie](https://github.com/filecoin-project/lassie) is a retrieval client for
IPFS and Filecoin. It can find providers for a CID and fetch the content over
the available retrieval protocols.

Use this path when you have a CID and want a network-native way to fetch the
data:

```shell
lassie fetch <CID>
```

See [Basic retrieval](../how-retrieval-works/basic-retrieval.md) for
installation and CLI examples.

### Retrieve public data through IPNI and provider protocols

When data is made publicly discoverable, storage providers can advertise it to
the [InterPlanetary Network Indexer](https://cid.contact/). IPNI maps CIDs to
providers and the transfer protocols they support. Clients can then retrieve
from a provider over protocols such as Bitswap, Graphsync, or HTTP, depending on
how the provider is configured.

See [Serving retrievals](../how-retrieval-works/serving-retrievals.md) for the
provider discovery and retrieval flow.

### Retrieve through IPFS

Filecoin and IPFS both use content addressing, so Filecoin-stored content can
often be retrieved through IPFS paths when a provider, gateway, or peer is
serving the CID. This is useful for IPFS-native applications and for content
that should be broadly addressable by CID.

### Retrieve from Filecoin Onchain Cloud

[Filecoin Onchain Cloud retrieval](https://docs.filecoin.cloud/core-concepts/retrieval/)
provides managed retrieval paths for data stored through Filecoin Onchain Cloud.
It supports direct storage-provider HTTP retrieval, Filecoin Beam CDN retrieval
for lower-latency reads, and IPFS retrieval paths for IPFS-native use cases.

Use this path when your application stores data through Filecoin Onchain Cloud or
the Synapse SDK and wants managed retrieval, payment, and service-provider
routing.

### Retrieve from Fil One

[Fil One](https://docs.fil.one/) is an S3-compatible object storage service
backed by Filecoin. If your data is stored in Fil One, retrieve it through the
same S3-compatible tools, SDKs, or application paths you use for object storage.

Use this path when you want Filecoin-backed storage and retrieval behind an
S3-compatible API rather than direct CID-level retrieval.

### Retrieve directly from a storage provider

Direct provider retrieval is useful when you know which provider holds the data
or you are working with a direct storage-provider workflow. You generally need
the content identifier and enough deal or provider context to ask the provider
for the stored payload.

## Where to go next

- [Basic retrieval](../how-retrieval-works/basic-retrieval.md) covers fetching
  data with Lassie.
- [Serving retrievals](../how-retrieval-works/serving-retrievals.md) explains
  provider advertisements, IPNI, and retrieval protocols.
- [Filecoin Onchain Cloud retrieval](https://docs.filecoin.cloud/core-concepts/retrieval/)
  covers retrieval for data stored through Filecoin Onchain Cloud.
- [Fil One docs](https://docs.fil.one/) cover retrieval through S3-compatible
  object storage APIs.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/getting-started/what-is-filecoin/retrieval-market)
