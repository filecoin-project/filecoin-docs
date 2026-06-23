---
description: >-
  Curio is the current storage-provider operations stack for Filecoin provider
  workflows, including PoRep and PDP paths.
---

# Curio

Curio is the current storage-provider operations stack for Filecoin. It is used to run provider workflows such as sealing, proving, storage, retrieval, and PDP-enabled provider operations.

Use this page as a pointer into the maintained Curio documentation. Installation, configuration, and migration steps change over time, so operational runbooks should stay in the Curio docs rather than being duplicated here.

## Where Curio fits

Curio handles provider operations. A production provider stack can also include:

* [Lotus](lotus.md) for Filecoin node, chain, wallet, actor, and client tooling.
* [Boost](https://boost.filecoin.io/) for PoRep storage deal-making and retrieval services.
* YugabyteDB for Curio cluster state, as described in the Curio setup docs.

For PDP provider workflows, Curio is also part of the current setup path alongside Lotus and YugabyteDB.

## Curio docs

* [Curio docs](https://docs.curiostorage.org/) for the maintained documentation home.
* [Installation](https://docs.curiostorage.org/installation) for binary and package installation.
* [Setup](https://docs.curiostorage.org/setup) for new Curio miners and migration from `lotus-miner`.
* [Configuration](https://docs.curiostorage.org/configuration) for Curio configuration layers.
* [Storage configuration](https://docs.curiostorage.org/storage-configuration) for attaching existing storage.
* [Scaling Curio cluster](https://docs.curiostorage.org/scaling-curio-cluster) for adding nodes, miner IDs, and migrated workers.
* [Enable PDP](https://docs.curiostorage.org/experimental-features/enable-pdp) for PDP provider setup guidance.

## Related Filecoin docs

* [Store with PoRep](../../store-with-porep.md)
* [Store with PDP](../../store-with-pdp.md)
* [About PDP](../../pdp/about.md)
* [Software components](../../architecture/lotus-components.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/storage-providers/nodes/implementations/curio)
