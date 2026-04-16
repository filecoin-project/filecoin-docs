---
description: >-
  Legacy content preserved for historical reference. These tools and workflows
  have been superseded by modern Filecoin storage and development patterns.
---

# Legacy content

{% hint style="warning" %}
The content on this page describes tools, workflows, and projects that are **no longer actively maintained**. It is preserved for historical reference only.

For current guidance, see [Upload to Filecoin](../../getting-started/how-storage-works/upload-to-filecoin.md), [PDP](../../storage-providers/pdp/README.md), or [Build on Filecoin](../../build/getting-started.md).
{% endhint %}

## Smart contracts

### RaaS (Renew, Repair, Replicate as a Service)

RaaS was a smart-contract-based approach to automating storage deal renewal, repair, and replication on Filecoin. It supported both self-hosted and aggregator-hosted (via Lighthouse) architectures.

**Key resources:**

* [RaaS Starter Kit](https://github.com/filecoin-project/raas-starter-kit)
* [Lighthouse documentation](https://docs.lighthouse.storage/)

### Aggregated deal-making

A workflow for bundling many small data pieces into larger Filecoin deals using data aggregation and Proof of Data Segment Inclusion (PoDSI).

**Key resources:**

* [FRC-0058 — Proof of Data Segment Inclusion](https://github.com/filecoin-project/FIPs/blob/master/FRCs/frc-0058.md#proof-of-data-segment-inclusion)
* [Data segment specs discussion](https://github.com/filecoin-project/FIPs/discussions/512)
* [Filecoin Data Tools](https://github.com/application-research/fevm-data-segment)

### Cross-Chain Data Bridge (CCDB)

CCDB enabled EVM-compatible chains (Avalanche, Base, etc.) to initiate Filecoin storage deals via cross-chain messaging through Axelar.

**Key resources:**

* [onramp-contracts](https://github.com/FIL-Builders/onramp-contracts/)
* [xChainClient](https://github.com/FIL-Builders/xchainClient)
* [dataBridgeDemo](https://github.com/FIL-Builders/dataBridgeDemo)
* [Architecture deep-dive (Medium)](https://medium.com/@filoz/under-the-hood-architecture-and-prototype-of-cross-chain-data-storage-6f8ba2c480d6)

### Client contract tutorial

A tutorial on creating storage deals programmatically via FVM smart contracts using the deal-making starter kit.

**Key resources:**

* [FVM deal-making kit](https://github.com/filecoin-project/fvm-starter-kit-deal-making)
* [ETHGlobal walkthrough (YouTube)](https://www.youtube.com/watch?v=27EV3gQGY9k)

## Projects

### Saturn

Saturn was a Web3 CDN in the Filecoin retrieval market, enabling fast content delivery from Filecoin storage providers. The project is no longer active.

For current retrieval guidance, see [Basic retrieval](../../getting-started/how-retrieval-works/basic-retrieval.md) and [Serving retrievals](../../getting-started/how-retrieval-works/serving-retrievals.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/reference/general/legacy-content)
