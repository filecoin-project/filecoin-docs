---
description: >-
  Reference-only archive for legacy programmatic storage workflows that are no
  longer the recommended path.
---

# Legacy programmatic storage (deprecated)

{% hint style="danger" %}
**DEPRECATED - DO NOT USE**

These workflows are retained for historical/reference context only.

**Use instead:** [PDP (Proof of Data Possession)](../../storage-providers/pdp/README.md) and [Modern storage patterns](../../reference/general/modern-storage-patterns.md)
{% endhint %}

## Why this page exists

Earlier Filecoin programmatic-storage docs centered on Deal Client and RaaS-style flows. Those patterns are now deprecated and should not be used as primary guidance for new integrations.

## Legacy workflow pages retained for reference

* [Aggregated deal-making](aggregated-deal-making.md)
* [Direct deal-making](direct-deal-making.md)
* [Cross-Chain Data Bridge (CCDB)](ccdb.md)
* [Data replication, renewal and repair (RaaS)](raas.md)
* [RaaS interfaces](raas-interfaces.md)

## Migration guidance

When migrating from any legacy page above:

1. Start with [PDP (Proof of Data Possession)](../../storage-providers/pdp/README.md).
2. Use [Modern storage patterns](../../reference/general/modern-storage-patterns.md) for stable replacement guidance.
3. If you need managed ingestion flows, review [Storage onramps](../../basics/how-storage-works/storage-onramps.md).
