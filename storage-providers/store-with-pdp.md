---
description: >-
  Use Proof of Data Possession storage when you need application-level storage
  verification for Filecoin Onchain Cloud workflows.
---

# Store with PDP

Use the PDP path when you need application-level verification that a provider still holds data, without requiring clients to re-download that data. PDP is the verification layer used by Filecoin Onchain Cloud.

PDP provider setup currently uses Lotus, YugabyteDB, and Curio. The Curio documentation marks PDP as an alpha feature under active development, so treat this as the path for testing and current FOC-aligned provider work rather than a replacement for every PoRep provider workflow.

## Software path

PDP provider deployments use:

* [Curio](nodes/implementations/curio.md) for the provider runtime.
* [Lotus](nodes/implementations/lotus.md) for Filecoin node and chain operations.
* [PDP setup guidance](pdp/install-and-run-pdp.md) for the current local setup flow.
* [Filecoin Onchain Cloud](../build/filecoin-onchain-cloud/README.md) for the application-facing storage stack that uses PDP.

## What to read next

* [About PDP](pdp/about.md) for the protocol overview.
* [Install and run PDP](pdp/install-and-run-pdp.md) for setup steps.
* [Curio](nodes/implementations/curio.md) for links to Curio installation, setup, configuration, and migration docs.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/storage-providers/store-with-pdp)
